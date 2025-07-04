// pages/api/elite.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const baseUrl = process.env.NEXT_PUBLIC_FORM_API_BASE_URL;

  const { name, email, phone, marketingConsent } = req.body;

  if (!name || !email || !phone || !marketingConsent) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const response = await axios.post(
      `${baseUrl}/elite`,
      { name, email, phone, marketingConsent },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Proxy Error:", error.response?.data || error.message);
    return res
      .status(error.response?.status || 500)
      .json({ message: "Server error. Please try again." });
  }
}
