import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/src/lib/auth"; // <- adjust the path to where you export your authOptions

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
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    // 1) Try session cookie (server-side)
    const session = await getServerSession(req, res, authOptions);

    // 2) Try JWT directly (works with `session.strategy = "jwt"`)
    const jwtToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      // cookieName is optional; defaults match your config:
      // cookieName: process.env.NODE_ENV === "production"
      //   ? "__Secure-next-auth.session-token"
      //   : "next-auth.session-token",
    });

    // 3) Try explicit Authorization header (Bearer <token>)
    const headerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : undefined;

    const accessToken =
      (session as any)?.accessToken ||
      (jwtToken as any)?.accessToken ||
      headerToken ||
      null;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No access token found. Please sign in again.",
      });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
    if (!baseUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    // Build safe URL
    const apiUrl = `${baseUrl.replace(/\/+$/, "")}/user/referral/stats`;

    // Call upstream API
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Cache-Control": "no-cache",
        "User-Agent": "NextJS-App",
      },
    });

    const rawText = await apiResponse.text();
    let parsed: any = {};
    try {
      parsed = rawText ? JSON.parse(rawText) : {};
    } catch {
      // If upstream didn’t return JSON, surface a clean error
      return res.status(502).json({
        success: false,
        message: "Invalid response format from server",
      });
    }

    // Pass through status + message cleanly
    if (apiResponse.ok) {
      // Disable caching for sensitive data
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");

      return res.status(200).json({
        success: true,
        message: "Referral stats fetched successfully",
        data: parsed,
      });
    }

    // Specific upstream errors
    if (apiResponse.status === 401) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication failed - your session may have expired. Please sign in again.",
        data: parsed,
      });
    }
    if (apiResponse.status === 403) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden - insufficient permissions",
        data: parsed,
      });
    }

    return res.status(apiResponse.status).json({
      success: false,
      message:
        parsed?.message || `Request failed with status: ${apiResponse.status}`,
      data: parsed,
    });
  } catch (err: any) {
    const msg =
      typeof err?.message === "string" ? err.message : "Internal server error";
    // Network failures (fetch) or JWT parsing issues:
    if (msg.toLowerCase().includes("fetch")) {
      return res.status(503).json({
        success: false,
        message:
          "Unable to connect to referral service. Please try again later.",
      });
    }
    if (msg.toLowerCase().includes("jwt")) {
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
