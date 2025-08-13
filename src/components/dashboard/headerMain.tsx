import React, { useEffect } from "react";
import { useWallet } from "@/src/contexts/WalletContext";
import Image from "next/image";
import { useUserDetails } from "@/src/hooks/useUserDetails";
import { useUserStore } from "@/src/store/useUserStore";

const HeaderMain: React.FC = () => {
  const {
    isInstalled,
    isConnecting,
    error,
    account,
    currentChainId,
    isCorrectNetwork,
    connect,
    addNetwork,
    addBSCNetwork,
  } = useWallet();

  const { setUserDetail, setKycStatus, userDetail, kycStatus } = useUserStore();
  const { data: apiData, isLoading } = useUserDetails();

  useEffect(() => {
    if (apiData?.data?.userDetail) {
      setUserDetail(apiData.data.userDetail);
      setKycStatus(apiData.data.kycStatus);
    }
  }, [apiData, setUserDetail, setKycStatus]);

  // Show network buttons only when:
  // 1. Wallet is connected (account exists)
  // 2. User is on wrong network (not BSC testnet)
  const showNetworkButtons = account && !isCorrectNetwork;

  const getNetworkName = (chainId: number | null) => {
    switch (chainId) {
      case 1:
        return "Ethereum Mainnet";
      case 56:
        return "BSC Mainnet";
      case 97:
        return "BSC Testnet";
      case 137:
        return "Polygon";
      case 9473:
        return "Areal Mainnet";
      default:
        return chainId ? `Unknown Network (${chainId})` : "Unknown";
    }
  };

  const getButtonText = () => {
    if (isConnecting) return "Connecting...";
    if (account) return `${account.slice(0, 6)}...${account.slice(-4)}`;
    return "Connect Wallet";
  };

  const getButtonColor = () => {
    if (account && isCorrectNetwork) {
      return "bg-green-600 hover:bg-green-700"; // Green when connected to correct network
    }
    if (account && !isCorrectNetwork) {
      return "bg-orange-600 hover:bg-orange-700"; // Orange when connected but wrong network
    }
    return "bg-[#F4B448] hover:bg-[#F4B448]/90"; // Default yellow
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between gap-4">
      {/* Logo Section - Added left margin for mobile to avoid hamburger menu */}
      <div className="flex items-center space-x-4 lg:ml-0 ml-12">
        <Image
          src="/coin/text.avif"
          alt="ArealChain"
          width={80}
          height={80}
          className="w-20 h-auto object-contain"
        />
      </div>

      {/* Wallet Section */}
      <div className="flex items-center space-x-3">
        {/* Network Buttons - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex space-x-2">
          <button
            onClick={addBSCNetwork}
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-2 rounded-lg transition-colors font-medium"
            title="Add BSC Testnet (Required for transactions)"
          >
            Add BSC Testnet
          </button>
          <button
            onClick={addNetwork}
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-2 rounded-lg transition-colors font-medium"
            title="Add Areal Network (Optional)"
          >
            Add Areal Network
          </button>
        </div>

        {/* MetaMask Not Installed Warning - Only show on desktop */}
        {!isInstalled && (
          <div className="hidden md:block bg-yellow-500/20 text-yellow-300 px-3 py-2 rounded-lg text-sm">
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Install MetaMask
            </a>
          </div>
        )}

        {/* Connect/Disconnect Wallet Button */}
        <button
          onClick={connect}
          disabled={!isInstalled || isConnecting}
          className={`${getButtonColor()} text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative text-sm`}
          title={
            account
              ? isCorrectNetwork
                ? "Click to disconnect"
                : "Connected to wrong network - Click to disconnect"
              : "Click to connect wallet"
          }
        >
          {/* Connection Status Indicator */}
          {account && (
            <div
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                isCorrectNetwork ? "bg-green-400" : "bg-orange-400"
              }`}
            ></div>
          )}

          {getButtonText()}
        </button>
      </div>
    </header>
  );
};

export default HeaderMain;
