import { useMutation } from "@tanstack/react-query";
import { postKycDetails, KycResponse } from "@/src/services/kycService";

export const useKycSubmission = () => {
  return useMutation<KycResponse, Error, FormData>({
    mutationFn: postKycDetails,
    onError: (error: Error) => {
      console.error("KYC Error:", error);
    },
  });
};
