import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;

  if (!token || !channelId) {
    console.error(
      "❌ Missing DISCORD_BOT_TOKEN or DISCORD_CHANNEL_ID in .env.local"
    );
    return res.status(500).json({ error: "Server config error" });
  }

  try {
    const discordRes = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages?limit=10`,
      {
        headers: {
          Authorization: `Bot ${token}`,
        },
      }
    );

    const raw = await discordRes.text();
    // console.log("📥 Discord raw response:", raw);

    if (!discordRes.ok) {
      console.error("❌ Discord API failed:", discordRes.status, raw);
      return res
        .status(500)
        .json({ error: "Failed to fetch Discord messages" });
    }

    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
      console.error("❌ Unexpected response format:", data);
      return res.status(500).json({ error: "Unexpected response format" });
    }

    const messages = data.map((msg: any) => ({
      content: msg.content,
      createdAt: msg.timestamp,
      url: msg.attachments?.[0]?.url || null,
    }));

    return res.status(200).json(messages);
  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
