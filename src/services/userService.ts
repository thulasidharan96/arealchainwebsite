import api from "../pages/api/api";

type ApiResponse = {
  status: boolean;
  data: {
    userDetail: any; // Your UserDetail type
    kycStatus: number;
  };
};

export const fetchUserDetails = async (): Promise<ApiResponse> => {
  const response = await api("user/profile/details");

  if (response.status < 200 || response.status >= 300) {
    throw new Error("Failed to fetch user details");
  }

  // Return the full response data structure
  return response.data;
};
