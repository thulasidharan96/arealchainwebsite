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
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No valid token found",
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

    // Make request to external API with auth token
    const apiResponse = await fetch(`${baseUrl}user/referral/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    let responseData;
    try {
      responseData = await apiResponse.json();
    } catch (jsonError) {
      console.error("Failed to parse API response as JSON:", jsonError);
      return res.status(500).json({
        success: false,
        message: "Invalid response from server",
      });
    }

    console.log("External API response:", {
      status: apiResponse.status,
      data: responseData,
    });

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
      // Error case but we got a response
      return res.status(apiResponse.status).json({
        success: false,
        message:
          responseData.message ||
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
