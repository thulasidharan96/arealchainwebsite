import { useMutation } from "@tanstack/react-query";
import { postKycDetails } from "@/src/services/kycService";

export const useKycSubmission = () => {
  return useMutation({
    mutationFn: postKycDetails,
    onError: (err) => console.error("KYC Error:", err),
  });
};
