import type { NextApiRequest, NextApiResponse } from "next";

interface LoginRequestBody {
  email?: string;
  password: string;
  // rememberMe?: boolean;
  step: "credentials";
}

interface OtpVerifyRequestBody {
  userIdentity: string;
  password: string;
  verifyCode: number;
  step: "otp";
}

type RequestBody = LoginRequestBody | OtpVerifyRequestBody;

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const requestBody = req.body as RequestBody;
  const { step } = requestBody;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    console.error("API_BASE_URL not configured");
    return res.status(500).json({
      success: false,
      message: "Server configuration error",
    });
  }

  try {
    if (step === "credentials") {
      // Handle initial credential verification
      const { email, password } = requestBody as LoginRequestBody;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Prepare request body for credential verification
      const apiRequestBody = {
        userIdentity: email,
        password,
        // ...(rememberMe !== undefined && { rememberMe }),
      };

      console.log(
        "Making credential verification request to external API:",
        `${baseUrl}user/precheck/login`
      );

      const apiResponse = await fetch(`${baseUrl}user/precheck/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
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
        // Success case - credentials verified, OTP should be sent
        return res.status(200).json({
          success: true,
          message:
            responseData.message ||
            "Credentials verified. OTP sent to your email.",
          data: responseData,
        });
      } else {
        // Error case but we got a response
        return res.status(apiResponse.status).json({
          success: false,
          message:
            responseData.message ||
            `Credential verification failed with status: ${apiResponse.status}`,
          data: responseData,
        });
      }
    } else if (step === "otp") {
      // Handle OTP verification
      const { userIdentity, password, verifyCode } =
        requestBody as OtpVerifyRequestBody;

      // Validate required fields
      if (!userIdentity || !password || !verifyCode) {
        return res.status(400).json({
          success: false,
          message:
            "User identity, password, and verification code are required",
        });
      }

      // Prepare request body for OTP verification
      const apiRequestBody = {
        userIdentity,
        password,
        verifyCode,
      };

      console.log(
        "Making OTP verification request to external API:",
        `${baseUrl}user/precheck/login`
      );

      const apiResponse = await fetch(`${baseUrl}user/precheck/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
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

      console.log("External API OTP verification response:", {
        status: apiResponse.status,
        data: responseData,
      });

      // Handle different response scenarios
      if (apiResponse.ok) {
        // Success case - login complete
        return res.status(200).json({
          success: true,
          message: responseData.message || "Login successful",
          data: responseData,
        });
      } else {
        // Error case but we got a response
        return res.status(apiResponse.status).json({
          success: false,
          message:
            responseData.message ||
            `OTP verification failed with status: ${apiResponse.status}`,
          data: responseData,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid step parameter. Must be 'credentials' or 'otp'",
      });
    }
  } catch (error) {
    console.error("Login API error:", error);

    // Handle network errors or other fetch failures
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return res.status(503).json({
        success: false,
        message:
          "Unable to connect to authentication service. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}
