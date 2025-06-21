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

  console.log("userDetail from store:", userDetail);
  console.log("kycStatus from store:", kycStatus);

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

  // Use the stored kycStatus or fallback to userDetail status
  const currentKycStatus =
    kycStatus !== undefined ? kycStatus : userDetail?.status?.kyc?.status ?? 3;
  const kycInfo = getKycLabel(currentKycStatus);

  if (error) {
    console.error("Error fetching user details:", error);
  }

  return (
    <header className="bg-gray-900 border-gray-800 border-b px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image src="/coin/text.png" alt="Logo" width={100} height={100} />
      </div>

      <div>
        <div className="flex items-center space-x-4">
          {!isLoading && userDetail && (
            <>
              <div className="flex items-center space-x-2 text-white">
                <span className="text-sm">Welcome, {userDetail.username}</span>
              </div>
              <div className="flex items-center space-x-1">
                {kycInfo.icon}
                <span className={`text-xs ${kycInfo.color}`}>
                  KYC: {kycInfo.label}
                </span>
              </div>
            </>
          )}
          {isLoading && <div className="text-gray-400 text-sm">Loading...</div>}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ConnectButton />
      </div>
    </header>
  );
};

export default HeaderMain;
