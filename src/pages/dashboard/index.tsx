import React from "react";
import LayoutMain from "@/src/components/dashboard/layoutMain";
import { useUserStore } from "@/src/store/useUserStore";
import KYCForm from "@/src/components/KYCFORM";
import { useKycStatusLabel } from "@/src/hooks/useKycStatus";
import { useRouter } from "next/router";
import KYCStatusCard from "@/src/components/dashboard/KYCStatusCard";
import Image from "next/image";

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
      <div className="p-4 to-gray-900 flex flex-col justify-center items-center">
        {/* KYC Status Card */}
        <div className="flex justify-center items-center w-full">
          <KYCStatusCard kycStatus={kycStatus} />
        </div>

        {/* KYC Form (if needed) */}
        {(kycStatus === 3 || kycStatus === 2) && (
          <div className="w-full">
            <KYCForm />
          </div>
        )}

        {/* Wallet Setup Steps (only for Verified KYC) */}
        {kycStatus === 1 && (
          <div className="flex justify-center items-center w-full">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 mt-6 text-white shadow-2xl w-full max-w-xl space-y-6">
              <h2 className="text-2xl font-bold text-green-400 text-center">
                Cheers to Being Part of the Evolution!
              </h2>

              <p className="text-gray-300 text-center">
                You're now KYC verified and ready to start your ARL Coin
                journey. Follow these quick steps:
              </p>

              <div className="bg-gray-700/40 p-4 rounded-lg border border-gray-600">
                <ul className="list-decimal list-inside text-gray-200 space-y-2 text-left">
                  <li>
                    Add{" "}
                    <span className="font-semibold text-white">
                      ARL Network
                    </span>{" "}
                    to your wallet using the "Add AREAL Network" button.
                  </li>
                  <li>
                    Add{" "}
                    <span className="font-semibold text-white">
                      BSC Network
                    </span>{" "}
                    to your wallet using the "Add BSC Network" button.
                  </li>
                  <li>
                    Start buying{" "}
                    <span className="font-semibold text-white">ARL Coins</span>{" "}
                    securely.
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-yellow-700 hover:bg-yellow-800 transition-all duration-300 text-white font-bold py-2 px-4 flex flex-row gap-2 rounded-xl shadow-md"
                  onClick={() => router.push("/buy")}
                >
                  <Image
                    src="/coin/coin.png"
                    alt="Buy ARL"
                    width={20}
                    height={20}
                    className=""
                  />
                  BUY ARL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutMain>
  );
};

export default Dashboard;
