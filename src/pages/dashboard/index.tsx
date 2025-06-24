import React from "react";
import LayoutMain from "@/src/components/dashboard/layoutMain";
import { useUserStore } from "@/src/store/useUserStore";
import KYCForm from "@/src/components/KYCFORM";
import { useKycStatusLabel } from "@/src/hooks/useKycStatus";
import { useRouter } from "next/router";
import KYCStatusCard from "@/src/components/dashboard/KYCStatusCard";

const kycDescriptions = {
  0: "Your application is submitted. Please wait for admin approval.",
  1: "Congratulations! Your KYC is verified.",
  2: "Your KYC was rejected. Please try again.",
  3: "You haven't completed your KYC yet.",
};

const Dashboard = () => {
  const router = useRouter();
  const { userDetail, kycStatus } = useUserStore();
  const kycLabel = useKycStatusLabel(kycStatus);
  const kycMessage = kycDescriptions[kycStatus as keyof typeof kycDescriptions];

  if (!userDetail || kycStatus === undefined) {
    return (
      <LayoutMain>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <p className="text-gray-500">
              Please wait while we fetch your data.
            </p>
          </div>
        </div>
      </LayoutMain>
    );
  }

  return (
    <LayoutMain>
      <div className="p-4 to-gray-900">
        {/* KYC Status Card */}
        <div className="flex justify-center items-center">
          <KYCStatusCard kycStatus={kycStatus} />
        </div>

        {/* KYC Form (if needed) */}
        {(kycStatus === 3 || kycStatus === 2) && (
          <div className="">
            <KYCForm />
          </div>
        )}

        {/* Wallet Setup Steps (only for Verified KYC) */}
        {kycStatus === 1 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-white shadow-lg space-y-4 text-center">
            <p className="text-lg font-medium text-white">
              Welcome to the AREAL Family!
            </p>
            <p className="text-gray-300">
              Now you're ready to get your ARL Coins. Just follow these quick
              steps:
            </p>
            <div className="text-left">
              <ul className="list-decimal list-inside text-gray-300 space-y-1">
                <li>
                  Add <strong>ARL Network</strong> to your wallet using Add
                  AREAL Network Button
                </li>
                <li>
                  Add <strong>BSC Network</strong> to your wallet using Add BSC
                  Network Button
                </li>
                <li>Start buying ARL coins securely</li>
              </ul>
            </div>
            <div className="flex justify-center pt-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                onClick={() => router.push("/buy")}
              >
                BUY ARL
              </button>
            </div>
          </div>
        )}
      </div>
    </LayoutMain>
  );
};

export default Dashboard;
