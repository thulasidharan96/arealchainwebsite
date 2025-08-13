interface ForgotPasswordData {
  userIdentity: string;
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
    responseData = {
      success: false,
      message: `Request failed with status: ${response.status}`,
    };
  }

  if (!response.ok) {
    return {
      success: false,
      message: responseData.message || `HTTP error! status: ${response.status}`,
      data: responseData,
    };
  }

  return {
    success: responseData.success !== false,
    message: responseData.message || "Success",
    data: responseData,
  };
};

export const forgotPassword = async (
  userIdentity: string
): Promise<ApiResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!baseUrl) {
      throw new Error("API base URL not configured");
    }

    const response = await fetch(`${baseUrl}user/precheck/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userIdentity,
      }),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error("Forgot password service error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to connect to server",
    };
  }
};

interface ResetPasswordData {
  userIdentity: string;
  verifyCode: string;
  newPassword: string;
  confirmPassword: string;
}

export const resetPassword = async (
  data: ResetPasswordData
): Promise<ApiResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!baseUrl) {
      throw new Error("API base URL not configured");
    }

    const response = await fetch(`${baseUrl}user/precheck/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userIdentity: data.userIdentity,
        verifyCode: data.verifyCode,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error("Reset password service error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to connect to server",
    };
  }
};
