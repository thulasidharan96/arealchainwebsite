import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "@/src/services/userService";

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
