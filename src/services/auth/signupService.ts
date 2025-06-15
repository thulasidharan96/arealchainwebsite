interface SignupData {
  email: string;
  username: string;
  password: string;
}

interface VerifyOtpData extends SignupData {
  otp: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
  let responseData;

  try {
    responseData = await response.json();
  } catch (jsonError) {
    // If JSON parsing fails, create a generic response
    responseData = {
      success: false,
      message: `Request failed with status: ${response.status}`,
    };
  }

  // If response is not ok, return error structure but don't throw
  if (!response.ok) {
    return {
      success: false,
      message: responseData.message || `HTTP error! status: ${response.status}`,
      data: responseData,
    };
  }

  // Normalize successful response
  return {
    success: responseData.success !== false, // Default to true if not explicitly false
    message: responseData.message || "Success",
    data: responseData,
  };
};

export const signupUser = async ({
  email,
  username,
  password,
}: SignupData): Promise<ApiResponse> => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error("Signup service error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to connect to server",
    };
  }
};

export const verifyOtp = async ({
  email,
  username,
  password,
  otp,
}: VerifyOtpData): Promise<ApiResponse> => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        otp,
      }),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error("OTP verification service error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to connect to server",
    };
  }
};
