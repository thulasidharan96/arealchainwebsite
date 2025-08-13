import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

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
    // Get the JWT token from the request
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET, // Ensure secret is passed
    });

    console.log("Token received:", {
      hasToken: !!token,
      tokenKeys: token ? Object.keys(token) : [],
      accessToken: token?.accessToken ? "present" : "missing",
    });

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No valid token found",
      });
    }

    // Check if accessToken exists in the token
    if (!token.accessToken) {
      console.error("No accessToken found in JWT token");
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No access token available",
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

    // Construct the full URL
    const apiUrl = `${baseUrl}${
      baseUrl.endsWith("/") ? "" : "/"
    }user/referral/stats`;

    console.log("Making request to:", apiUrl);
    console.log(
      "Using access token:",
      token.accessToken ? "Token present" : "No token"
    );

    // Make request to external API with auth token
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
        // Add additional headers that might be required
        Accept: "application/json",
        "User-Agent": "NextJS-App",
      },
    });

    console.log("API Response status:", apiResponse.status);
    console.log(
      "API Response headers:",
      Object.fromEntries(apiResponse.headers.entries())
    );

    let responseData;
    try {
      const responseText = await apiResponse.text();
      console.log("Raw response:", responseText);

      // Try to parse as JSON
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (jsonError) {
      console.error("Failed to parse API response as JSON:", jsonError);
      return res.status(500).json({
        success: false,
        message: "Invalid response from server",
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
      // Handle specific unauthorized case
      if (apiResponse.status === 401) {
        console.error(
          "External API returned 401 - token might be expired or invalid"
        );
        return res.status(401).json({
          success: false,
          message: "Authentication failed - please sign in again",
          data: responseData,
        });
      }

      // Other error cases
      return res.status(apiResponse.status).json({
        success: false,
        message:
          responseData?.message ||
          `Request failed with status: ${apiResponse.status}`,
        data: responseData,
      });
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

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}
