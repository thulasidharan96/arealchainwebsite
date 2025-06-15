import { apiFormData } from "../pages/api/api";

export const postKycDetails = async (formData: FormData) => {
  const idType = formData.get("idType") as string;

  const response = await apiFormData.post(
    `user/kyc/verify/request?type=${idType}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};
