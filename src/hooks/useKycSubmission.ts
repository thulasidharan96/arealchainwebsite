import { useMutation } from "@tanstack/react-query";
import { postKycDetails } from "@/src/services/kycService";

export const useKycSubmission = () => {
  return useMutation({
    mutationFn: postKycDetails,
    onError: (error: Error) => {
      console.error("KYC Error:", error);
      return error.message;
    },
  });
};
