import { apiFormData } from "../pages/api/api";

export const postKycDetails = async (formData: FormData) => {
  try {
    const idType = formData.get("idType") as string;

    const response = await apiFormData.post(
      `user/kyc/verify/request?type=${idType}`,
      formData
    );

    return response.data;
  } catch (error: any) {
    // Extract error message from response if available
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to submit KYC details";
    throw new Error(errorMessage);
  }
};
