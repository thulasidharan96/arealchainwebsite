// src/services/userService.ts
import type { UserDetail } from "@/src/types/user";
import api from "../pages/api/api";

export const fetchUserDetails = async (): Promise<UserDetail> => {
  const response = await api("user/profile/details");

  if (response.status < 200 || response.status >= 300) {
    throw new Error("Failed to fetch user details");
  }

  return response.data.userDetail;
};
