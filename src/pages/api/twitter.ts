import type { NextApiRequest, NextApiResponse } from "next";

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const USERNAME = process.env.TWITTER_USERNAME;

// Simple in-memory cache
let cache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!BEARER_TOKEN || !USERNAME) {
    return res.status(500).json({ error: "Missing env variables" });
  }

  // Check cache first
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return res.status(200).json(cache.data);
  }

  try {
    // Step 1: Get user ID
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    if (!userRes.ok) {
      console.error(`Failed to fetch user: ${userRes.status} ${userRes.statusText}`);
      
      // Handle rate limiting specifically
      if (userRes.status === 429) {
        // Return cached data if available, even if stale
        if (cache) {
          console.log("Rate limited, returning stale cache");
          return res.status(200).json(cache.data);
        }
        return res.status(429).json({ 
          error: "Too Many Requests - Rate limit exceeded",
          retryAfter: userRes.headers.get('x-rate-limit-reset') || '900'
        });
      }
      
      return res.status(userRes.status).json({ 
        error: `Failed to fetch user: ${userRes.statusText}` 
      });
    }

    const userData = await userRes.json();
    
    if (userData.errors) {
      console.error("Twitter API user errors:", userData.errors);
      return res.status(400).json({ 
        error: "Twitter API error", 
        details: userData.errors 
      });
    }

    const userId = userData?.data?.id;

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    // Step 2: Get tweets
    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?expansions=attachments.media_keys&media.fields=url,preview_image_url,type&tweet.fields=created_at,text&max_results=5`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    if (!tweetsRes.ok) {
      console.error(`Failed to fetch tweets: ${tweetsRes.status} ${tweetsRes.statusText}`);
      
      // Handle rate limiting specifically
      if (tweetsRes.status === 429) {
        // Return cached data if available, even if stale
        if (cache) {
          console.log("Rate limited on tweets, returning stale cache");
          return res.status(200).json(cache.data);
        }
        return res.status(429).json({ 
          error: "Too Many Requests - Rate limit exceeded",
          retryAfter: tweetsRes.headers.get('x-rate-limit-reset') || '900'
        });
      }
      
      return res.status(tweetsRes.status).json({ 
        error: `Failed to fetch tweets: ${tweetsRes.statusText}` 
      });
    }

    const tweetsData = await tweetsRes.json();
    
    if (tweetsData.errors) {
      console.error("Twitter API tweets errors:", tweetsData.errors);
      return res.status(400).json({ 
        error: "Twitter API error", 
        details: tweetsData.errors 
      });
    }

    // Cache the successful response
    cache = {
      data: tweetsData,
      timestamp: Date.now()
    };
    
    return res.status(200).json(tweetsData);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return res.status(500).json({ 
      error: "Internal server error", 
      message: error instanceof Error ? error.message : "Unknown error" 
    });
  }
}
