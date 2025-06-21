import { create } from "zustand";
import { persist } from "zustand/middleware";

type KycDetails = {
  name: string;
  country: string;
  idProof: string;
  frontImage: string;
  backImage: string;
};

type UserDetail = {
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
    user: { active: number; date: string };
    kyc: { status: number; details?: KycDetails; submitDate?: string };
  };
};

type UserStore = {
  userDetail: UserDetail | null;
  kycStatus: number;
  setUserDetail: (data: UserDetail) => void;
  setKycStatus: (status: number) => void;
  clearUserData: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userDetail: null,
      kycStatus: 3, // default to "not verified"
      setUserDetail: (data) => set({ userDetail: data }),
      setKycStatus: (status) => set({ kycStatus: status }),
      clearUserData: () => set({ userDetail: null, kycStatus: 3 }),
    }),
    {
      name: "user-storage", // key for localStorage
      partialize: (state) => ({
        userDetail: state.userDetail,
        kycStatus: state.kycStatus,
      }),
    }
  )
);
