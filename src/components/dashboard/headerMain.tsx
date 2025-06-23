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
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 sm:px-6 md:px-8 lg:px-10 flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
      <div className="flex items-center">
        <Image
          src="/coin/text.png"
          alt="Logo"
          width={80}
          height={80}
          className="w-24 sm:w-28 md:w-32 h-auto object-contain"
        />
      </div>
      <div className="flex justify-between items-center h-16">
        {/* Logo/Brand */}

        {/* Wallet Section */}
        <div className="flex items-center space-x-4">
          {/* Current Network Display - Show when connected */}
          {/* {account && currentChainId && (
            <div
              className={`px-3 py-2 rounded-lg text-xs font-medium ${
                isCorrectNetwork
                  ? "bg-green-500/20 text-green-300"
                  : "bg-orange-500/20 text-orange-300"
              }`}
            >
              {getNetworkName(currentChainId)}
            </div>
          )} */}

          {/* Error Message - Show when there's an error */}
          {/* {error && (
            <div className="bg-red-500/20 text-red-300 px-3 py-2 rounded-lg text-sm max-w-xs truncate">
              {error}
            </div>
          )} */}

          {/* MetaMask Not Installed Warning */}
          {!isInstalled && (
            <div className="bg-yellow-500/20 text-yellow-300 px-3 py-2 rounded-lg text-sm">
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

          {/* Network Buttons - Show only when connected but on wrong network */}
          {/* {showNetworkButtons && ( */}
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
          {/* )} */}

          {/* Mobile Network Buttons - Show only when connected but on wrong network */}
          {showNetworkButtons && (
            <div className="md:hidden">
              <div className="flex flex-col space-y-1">
                <button
                  onClick={addBSCNetwork}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-2 py-1 rounded transition-colors"
                >
                  BSC Testnet
                </button>
                <button
                  onClick={addNetwork}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-2 py-1 rounded transition-colors"
                >
                  Areal Net
                </button>
              </div>
            </div>
          )}

          {/* Connect/Disconnect Wallet Button */}
          <button
            onClick={connect}
            disabled={!isInstalled || isConnecting}
            className={`${getButtonColor()} text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative`}
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
      </div>

      {/* Mobile Error Message - Show below header on mobile */}
      {/* {error && (
        <div className="md:hidden bg-red-500/20 text-red-300 px-4 py-2 text-sm border-t border-gray-700">
          ⚠️ {error}
        </div>
      )} */}

      {/* Mobile Network Warning - Show below header when on wrong network */}
      {/* {showNetworkButtons && (
        <div className="md:hidden bg-orange-500/20 text-orange-300 px-4 py-2 text-sm border-t border-gray-700">
          ⚠️ Please switch to BSC Testnet for transactions
        </div>
      )} */}
    </header>
  );
};

export default HeaderMain;
