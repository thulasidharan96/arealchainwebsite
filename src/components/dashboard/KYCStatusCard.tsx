import React from "react";
import { useKycStatusLabel } from "@/src/hooks/useKycStatus";
import { CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react"; // Icon set

type Props = {
  kycStatus: number;
};

const kycDescriptions = {
  0: "Your application is submitted. Please wait for approval.",
  1: "Congratulations! Your KYC is verified.",
  2: "Your KYC was rejected. Please try again.",
  3: "You haven't completed your KYC yet.",
};

const statusStyles = {
  0: "border-yellow-500 bg-yellow-900/10 text-yellow-300",
  1: "border-green-500 bg-green-900/10 text-green-300",
  2: "border-red-500 bg-red-900/10 text-red-300",
  3: "border-gray-500 bg-gray-900/10 text-gray-300",
};

const statusIcons = {
  0: <Clock className="w-6 h-6 text-yellow-400" />,
  1: <CheckCircle className="w-6 h-6 text-green-400" />,
  2: <XCircle className="w-6 h-6 text-red-400" />,
  3: <AlertTriangle className="w-6 h-6 text-gray-400" />,
};

const KYCStatusCard: React.FC<Props> = ({ kycStatus }) => {
  const kycLabel = useKycStatusLabel(kycStatus);
  const kycMessage = kycDescriptions[kycStatus as keyof typeof kycDescriptions];
  const statusClass = statusStyles[kycStatus as keyof typeof statusStyles];
  const statusIcon = statusIcons[kycStatus as keyof typeof statusIcons];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className={`border rounded-xl p-6 shadow-xl transition-all duration-500 ease-in-out animate-fadeInUp ${statusClass}`}
      >
        <div className="flex items-center space-x-4 mb-2 justify-center">
          {statusIcon}
          <h3 className="text-xl font-bold">KYC Status: {kycLabel}</h3>
        </div>
        <p className="text-sm flex justify-center">{kycMessage}</p>
      </div>
    </div>
  );
};

export default KYCStatusCard;
