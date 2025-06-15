import type { NextApiRequest, NextApiResponse } from "next";

interface SignupRequestBody {
  email: string;
  username: string;
  password: string;
  otp?: string;
}

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

  const { email, username, password, otp } = req.body as SignupRequestBody;

  // Validate required fields
  if (!email || !username || !password) {
    return res.status(400).json({
      success: false,
      message: "Email, username, and password are required",
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

  try {
    // Prepare request body based on whether OTP is provided
    const requestBody = {
      userIdentity: email,
      username,
      password,
      ...(otp && { verifyCode: parseInt(otp) }),
    };

    console.log(
      "Making request to external API:",
      `${baseUrl}user/precheck/register`
    );

    const apiResponse = await fetch(`${baseUrl}user/precheck/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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
      // Success case
      return res.status(200).json({
        success: true,
        message:
          responseData.message ||
          (otp ? "Account created successfully" : "OTP sent successfully"),
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
    console.error("Signup API error:", error);

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
