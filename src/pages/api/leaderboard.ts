// pages/api/leaderboard.ts

import type { NextApiRequest, NextApiResponse } from "next";
// ✨ CHANGE: Import the shared type definition
import type { LeaderboardEntry } from "@/src/types";

// Define the expected structure of the API response, now using the shared type
interface ApiResponse {
  success: boolean;
  message: string;
  data?: LeaderboardEntry[] | any; // Use LeaderboardEntry[] for type safety
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // 1. Only allow GET requests (Good Practice)
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    // 2. Get the base URL from environment variables (Robust)
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

    if (!baseUrl) {
      console.error("Server Configuration Error: API_BASE_URL is not set.");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    // 3. Build the full URL to the backend service
    const apiUrl = `${baseUrl}user/referral/leaderboard`;

    // 4. Call the backend API (Proxying the request)
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "NextJS-App-Public-Proxy", 
      },
    });
    // 5. Handle non-JSON responses gracefully (Excellent Error Handling)
    const rawText = await apiResponse.text();
    let parsedData: any = {};
    try {
      parsedData = rawText ? JSON.parse(rawText) : {};
    } catch (e) {
      console.error("Upstream API did not return valid JSON:", rawText);
      return res.status(502).json({
        // 502 Bad Gateway is appropriate
        success: false,
        message: "Invalid response format from the server.",
      });
    }

    // 6. If the upstream request was successful, forward the data
    if (apiResponse.ok) {
      // Set caching headers for public data (Great for performance)
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=900"
      );

      // ✨ FIX: Ensure data is always an array for consistent frontend handling
      const responseData = Array.isArray(parsedData.data)
        ? parsedData.data
        : Array.isArray(parsedData)
        ? parsedData
        : [];

      return res.status(200).json({
        success: true,
        message: parsedData.message || "Leaderboard fetched successfully",
        data: responseData,
      });
    }

    // 7. If the backend returned a specific error, forward it
    return res.status(apiResponse.status).json({
      success: false,
      message: parsedData.message || "Failed to fetch leaderboard",
      data: parsedData.data,
    });
  } catch (error: any) {
    console.error("Leaderboard API route error:", error);

    // Handle specific network errors like the service being down (Very Robust)
    if (error.cause?.code === "ECONNREFUSED") {
      return res.status(503).json({
        // 503 Service Unavailable
        success: false,
        message:
          "Leaderboard service is temporarily unavailable. Please try again later.",
      });
    }

    // Fallback for any other unexpected errors
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
}
