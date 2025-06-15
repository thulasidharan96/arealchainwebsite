// stores/useUserStore.ts
import { create } from "zustand";

type UserDetail = {
  userUid: string;
  userType: string;
  username: string;
  email: string;
  country: string;
  level: number;
  status: {
    user: { active: number; date: string };
    kyc: { status: number };
  };
  lastLoginBy: {
    from: string;
    val: string;
    time: string;
  };
  createdAt: string;
  updatedAt: string;
};

type UserStore = {
  userDetail: UserDetail | null;
  setUserDetail: (data: UserDetail) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userDetail: null,
  setUserDetail: (data) => set({ userDetail: data }),
}));
