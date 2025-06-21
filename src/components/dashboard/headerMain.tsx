"use client";

import React, { useEffect } from "react";
import ConnectButton from "@/src/components/ConnectButton";
import { useUserDetails } from "@/src/hooks/useUserDetails";
import { useUserStore } from "@/src/store/useUserStore";
import {
  Wallet,
  ShieldCheck,
  Clock,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import Image from "next/image";

const HeaderMain: React.FC = () => {
  const { setUserDetail, setKycStatus, userDetail, kycStatus } = useUserStore();
  const { data: apiData, isLoading, error } = useUserDetails();

  useEffect(() => {
    if (apiData?.data?.userDetail) {
      setUserDetail(apiData.data.userDetail);
      setKycStatus(apiData.data.kycStatus);
    }
  }, [apiData, setUserDetail, setKycStatus]);

  function getKycLabel(status: number) {
    switch (status) {
      case 0:
        return {
          label: "Waiting for approval",
          icon: <Clock size={16} className="text-yellow-400" />,
          color: "text-yellow-400",
        };
      case 1:
        return {
          label: "Verified",
          icon: <ShieldCheck size={16} className="text-green-500" />,
          color: "text-green-500",
        };
      case 2:
        return {
          label: "Rejected",
          icon: <XCircle size={16} className="text-red-500" />,
          color: "text-red-500",
        };
      case 3:
        return {
          label: "Not verified",
          icon: <AlertTriangle size={16} className="text-gray-400" />,
          color: "text-gray-400",
        };
      default:
        return {
          label: "Unknown",
          icon: <AlertTriangle size={16} className="text-gray-400" />,
          color: "text-gray-400",
        };
    }
  }

  const currentKycStatus =
    kycStatus !== undefined ? kycStatus : userDetail?.status?.kyc?.status ?? 3;
  const kycInfo = getKycLabel(currentKycStatus);

  if (error) {
    console.error("Error fetching user details:", error);
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 sm:px-6 md:px-8 lg:px-10 flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image
          src="/coin/text.png"
          alt="Logo"
          width={80}
          height={80}
          className="w-24 sm:w-28 md:w-32 h-auto object-contain"
        />
      </div>

      {/* User Detail & KYC */}
      {/* <div className="hidden sm:flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-white text-sm flex-grow justify-end">
        {!isLoading && userDetail && (
          <>
            <span className="whitespace-nowrap">
              👋 Welcome, {userDetail.username}
            </span>
            <div className="flex items-center space-x-1">
              {kycInfo.icon}
              <span className={`text-xs sm:text-sm ${kycInfo.color}`}>
                KYC: {kycInfo.label}
              </span>
            </div>
          </>
        )}
        {isLoading && <div className="text-gray-400 text-sm">Loading...</div>}
      </div> */}

      {/* Wallet Button */}
      <div className="flex-shrink-0">
        <ConnectButton />
      </div>
    </header>
  );
};

export default HeaderMain;
