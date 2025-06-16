// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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

interface WalletInfo {
  name: string;
  connected: boolean;
  address?: string;
  balance?: string;
}

const HeaderMain: React.FC = () => {
  const setUserDetail = useUserStore((state) => state.setUserDetail);
  const [mantraWallet, setMantraWallet] = useState<WalletInfo>({
    name: "MANTRA Wallet",
    connected: false,
  });

  const [ethWallet, setEthWallet] = useState<WalletInfo>({
    name: "ETH MAINNET",
    connected: false,
  });

  const connectMantraWallet = () => {
    setMantraWallet({
      name: "MANTRA Wallet",
      connected: true,
      address: "0x1234...5678",
      balance: "1,234.56 OM",
    });
  };

  const connectEthWallet = () => {
    setEthWallet({
      name: "ETH MAINNET",
      connected: true,
      address: "0xabcd...efgh",
      balance: "2.34 ETH",
    });
  };

  const { data: userDetail, isLoading, error } = useUserDetails();
  useEffect(() => {
    if (userDetail) {
      setUserDetail(userDetail);
    }
  }, [userDetail, setUserDetail]);

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

  // Fix: Access the nested userDetail data correctly
  const userData = userDetail;
  const kycStatus = userData?.status?.kyc?.status;
  const kycInfo = kycStatus !== undefined ? getKycLabel(kycStatus) : null;

  return (
    <header className="bg-gray-900 border-gray-800 border-b  px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image src="/coin/text.png" alt="Logo" width={100} height={100} />
      </div>

      <div>
        <div className="flex items-center space-x-4 border-1 border-white">
          {kycInfo && !isLoading && (
            <div className="flex items-center space-x-1">
              {kycInfo.icon}
              <span className={`text-xs ${kycInfo.color}`}>
                KYC: {kycInfo.label}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ConnectButton />
      </div>
    </header>
  );
};

export default HeaderMain;
