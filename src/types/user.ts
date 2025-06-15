// types/user.ts
export type UserDetail = {
  userUid: string;
  userType: string;
  username: string;
  email: string;
  country: string;
  level: number;
  createdAt: string;
  updatedAt: string;
  status: {
    user: { active: number; date: string };
    kyc: { status: number };
  };
  lastLoginBy: {
    from: string;
    val: string;
    time: string;
  };
};
