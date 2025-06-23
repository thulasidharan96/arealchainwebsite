import { useMutation } from "@tanstack/react-query";
import {
  postBuyTokenDetails,
  BuyTokenResponse,
  getTokenPrice,
} from "@/src/services/buyTokenService";

export const useBuyTokenSubmission = () => {
  return useMutation<BuyTokenResponse, Error, FormData>({
    mutationFn: postBuyTokenDetails,
    onError: (error: Error) => {
      console.error("BuyToken Error:", error.message);
    },
  });
};

export const UseTokenPrice = () => {
  return useMutation<BuyTokenResponse, Error, FormData>({
    mutationFn: getTokenPrice,
    onError: (error: Error) => {
      console.error("TokenPrice Error:", error);
    },
  });
};
