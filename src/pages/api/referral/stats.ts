import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import api, { apiJSON } from "@/src/pages/api/api";

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
    // Get session on the server (more reliable in API routes than getSession from "next-auth/react")
    const session = await getServerSession(req, res, authOptions);
    let token: string | undefined = session?.accessToken as string | undefined;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No valid token found",
      });
    }

    // Optional: guard against missing base URL (your axios instance already has it)
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      console.error("API_BASE_URL not configured");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Call your backend using the shared axios instance.
    // We pass the Authorization header explicitly to avoid relying on the interceptor
    // (interceptors that call getSession() can be flaky in API routes).
    const { data: responseData, status } = await apiJSON.get(
      "/user/referral/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Success — add no-cache headers
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return res.status(200).json({
      success: true,
      message: "Referral stats fetched successfully",
      data: responseData,
    });
  } catch (error: any) {
    // Axios error details (status/data) if available
    const status = error?.response?.status as number | undefined;
    const errData = error?.response?.data;

    console.error("Referral stats API error:", {
      status,
      data: errData,
      message: error?.message,
    });

    if (!status) {
      // Network/type errors
      if (
        error instanceof TypeError &&
        String(error.message).includes("fetch")
      ) {
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

    // Upstream responded with an error
    return res.status(status).json({
      success: false,
      message: errData?.message || `Request failed with status: ${status}`,
      data: errData,
    });
  }
}
