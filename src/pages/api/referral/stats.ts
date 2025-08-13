import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    console.log("=== Referral Stats API Debug ===");

    // Method 1: Try getting session first (recommended for client-side requests)
    const session = await getSession({ req });
    console.log("Session data:", {
      hasSession: !!session,
      hasAccessToken: !!(session as any)?.accessToken,
      userEmail: session?.user?.email,
    });

    // Method 2: Get JWT token directly
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      raw: false, // Get decoded token
    });

    console.log("JWT Token data:", {
      hasToken: !!token,
      tokenKeys: token ? Object.keys(token) : [],
      hasAccessToken: !!token?.accessToken,
      email: token?.email,
    });

    // Try to get access token from either method
    let accessToken: string | null = null;

    if (session && (session as any).accessToken) {
      accessToken = (session as any).accessToken;
      console.log("Using access token from session");
    } else if (token?.accessToken) {
      accessToken = token.accessToken as string;
      console.log("Using access token from JWT");
    }

    if (!accessToken) {
      console.error("No access token found in session or JWT");
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No access token found. Please sign in again.",
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      console.error("API_BASE_URL not configured");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Construct the full URL properly
    const apiUrl = `${baseUrl}${
      baseUrl.endsWith("/") ? "" : "/"
    }user/referral/stats`;

    console.log("Making request to:", apiUrl);
    console.log("Access token length:", accessToken.length);
    console.log("Access token preview:", accessToken.substring(0, 20) + "...");

    // Make request to external API with auth token
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "User-Agent": "NextJS-App",
        // Add cache control to prevent caching issues
        "Cache-Control": "no-cache",
      },
    });

    console.log("External API response status:", apiResponse.status);
    console.log("External API response headers:", {
      "content-type": apiResponse.headers.get("content-type"),
      "content-length": apiResponse.headers.get("content-length"),
    });

    let responseData;
    try {
      const responseText = await apiResponse.text();
      console.log("Raw API response:", responseText.substring(0, 500)); // Log first 500 chars

      if (responseText) {
        responseData = JSON.parse(responseText);
      } else {
        responseData = {};
      }
    } catch (jsonError) {
      console.error("Failed to parse API response as JSON:", jsonError);
      return res.status(500).json({
        success: false,
        message: "Invalid response format from server",
      });
    }

    console.log("Parsed response data:", responseData);

    // Handle different response scenarios
    if (apiResponse.ok) {
      // Success case - add cache control headers
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");

      return res.status(200).json({
        success: true,
        message: "Referral stats fetched successfully",
        data: responseData,
      });
    } else {
      // Handle specific error cases
      if (apiResponse.status === 401) {
        console.error(
          "External API returned 401 - Access token might be expired or invalid"
        );
        console.error("Token used:", accessToken.substring(0, 50) + "...");

        return res.status(401).json({
          success: false,
          message:
            "Authentication failed - your session may have expired. Please sign in again.",
          data: responseData,
        });
      } else if (apiResponse.status === 403) {
        console.error("External API returned 403 - Access forbidden");
        return res.status(403).json({
          success: false,
          message: "Access forbidden - insufficient permissions",
          data: responseData,
        });
      } else {
        // Other error cases
        console.error(
          `External API error ${apiResponse.status}:`,
          responseData
        );
        return res.status(apiResponse.status).json({
          success: false,
          message:
            responseData?.message ||
            `Request failed with status: ${apiResponse.status}`,
          data: responseData,
        });
      }
    }
  } catch (error) {
    console.error("Referral stats API error:", error);

    // Handle network errors or other fetch failures
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return res.status(503).json({
        success: false,
        message:
          "Unable to connect to referral service. Please try again later.",
      });
    }

    // Handle JWT/session errors
    if (error instanceof Error && error.message.includes("JWT")) {
      return res.status(401).json({
        success: false,
        message: "Session error - please sign in again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}
