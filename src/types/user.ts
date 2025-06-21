export type KycDetails = {
  name: string;
  country: string;
  idProof: string;
  frontImage: string;
  backImage: string;
};

export type UserDetail = {
  userUid: string;
  userType: string;
  username: string;
  email: string;
  country: string;
  level: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLoginBy: {
    from: string;
    val: string;
    time: string;
  };
  status: {
    user: {
      active: number;
      date: string;
    };
    kyc: {
      status: number;
      details?: KycDetails;
      submitDate?: string;
    };
  };
};

export type ApiResponse = {
  status: boolean;
  data: {
    userDetail: UserDetail;
    kycStatus: number;
  };
};
