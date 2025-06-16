import { apiFormData } from "../pages/api/api";

export interface KycResponse {
  success: boolean;
  message: string;
  isAlreadySubmitted?: boolean;
  status?: string;
  data?: any;
}

export const postKycDetails = async (
  formData: FormData
): Promise<KycResponse> => {
  try {
    const idType = formData.get("idProof") as string;

    const response = await apiFormData.post(
      `user/kyc/verify/request?type=${idType}`,
      formData
    );

    return {
      success: true,
      message: "KYC submitted successfully",
      data: response.data,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to submit KYC details";

    // Handle "already submitted" case as a special success case
    if (errorMessage.includes("Already KYC details submitted")) {
      return {
        success: false,
        message: errorMessage,
        isAlreadySubmitted: true,
        status: error.response?.data?.status || "Waiting for approval",
      };
    }

    // For other errors, still throw
    throw new Error(errorMessage);
  }
};
