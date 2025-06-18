import { useMutation } from "@tanstack/react-query";
import { postBuyTokenDetails, BuyTokenResponse } from "@/src/services/buyTokenService";

export const useBuyTokenSubmission = () => {
  return useMutation<BuyTokenResponse, Error, FormData>({
    mutationFn: postBuyTokenDetails,
    onError: (error: Error) => {
      console.error("BuyToken Error:", error);
    },
  });
};
