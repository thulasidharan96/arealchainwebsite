interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalRewards: number;
  pendingRewards: number;
  referralCode: string;
  influencerCode: string;
  level: number;
  commissionRate: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
  let responseData;

  try {
    responseData = await response.json();
  } catch (jsonError) {
    responseData = {
      success: false,
      message: `Request failed with status: ${response.status}`,
    };
  }

  if (!response.ok) {
    return {
      success: false,
      message: responseData.message || `HTTP error! status: ${response.status}`,
      data: responseData,
    };
  }

  return {
    success: responseData.success !== false,
    message: responseData.message || "Success",
    data: responseData,
  };
};

export const getReferralStats = async (): Promise<ApiResponse> => {
  try {
    const timestamp = Date.now();
    const response = await fetch(`/api/referral/stats?t=${timestamp}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error("Referral stats service error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to connect to server",
    };
  }
};
