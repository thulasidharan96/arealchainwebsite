import React from "react";
import LayoutMain from "@/src/components/dashboard/layoutMain";
import { useUserStore } from "@/src/store/useUserStore";
import KYCForm from "@/src/components/KYCFORM";
import { useKycStatusLabel } from "@/src/hooks/useKycStatus";
import { Button } from "react-day-picker";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const { userDetail, kycStatus } = useUserStore();
  const kycLabel = useKycStatusLabel(kycStatus);

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
      <div className="p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <p className="text-md font-medium">KYC Status: {kycLabel}</p>
        </div>

        {/* Show KYC form only when status is 3 (Not verified) */}
        {(kycStatus === 3 || kycStatus === 2) && (
          <div className="">
            <KYCForm />
          </div>
        )}

        {kycStatus === 1 && (
          <div className="">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/buy")}
            >
              BUY ARL
            </Button>
          </div>
        )}
      </div>
    </LayoutMain>
  );
};
export default Dashboard;
