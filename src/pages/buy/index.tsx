import Layout from "@/src/components/dashboard/layoutMain";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { useWallet } from "@/src/contexts/WalletContext"; // Updated import
import {
  useBuyTokenSubmission,
  UseTokenPrice,
} from "@/src/hooks/useBuyTokenSubmission";
import { toast } from "sonner";
// import { ErrorDialog } from "@/src/components/ErrorDialog";
import { useUserStore } from "@/src/store/useUserStore";
import { useKycStatusLabel } from "@/src/hooks/useKycStatus";

const StatCard = ({
  label,
  value,
  subLabel,
  color = "text-white",
}: {
  label: string;
  value: string;
  subLabel: string;
  color?: string;
}) => (
  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/45">
    <p className="text-gray-400 text-xs lg:text-sm mb-1">{label}</p>
    <p className={`${color} text-lg lg:text-xl font-bold`}>{value}</p>
    <p className="text-gray-500 text-xs">{subLabel}</p>
  </div>
);

const BuyPage = () => {
  const {
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
    data: mutationData,
  } = useBuyTokenSubmission();

  const {
    mutate: fetchTokenPrice,
    data: tokenPriceData,
    isPending: isPriceLoading,
    isError: isPriceError,
    error: tokenPriceError,
  } = UseTokenPrice();

  const { userDetail, kycStatus } = useUserStore();
  const kycLabel = useKycStatusLabel(kycStatus);
  // console.log("kycStatus:", kycStatus);

  // Using wallet context instead of useMetaMask hook
  const {
    isInstalled,
    isConnecting,
    error,
    account,
    connect,
    buyTokenExt,
    checkUSDTBalance,
  } = useWallet();

  const [usdtAmount, setUsdtAmount] = useState("1");
  const [arealAmount, setArealAmount] = useState("4.00");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<number>(0.25);
  const [TokenInfo, setTokenInfo] = useState<any>({});
  const [tokenData, setTokenData] = useState<{
    minted: number;
    sale: number;
    arl: number;
  } | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [usdtBalance, setUsdtBalance] = useState<number | null>(null);

  // New state for enhanced UI
  const [showStats, setShowStats] = useState(true);
  const [animateProgress, setAnimateProgress] = useState(false);

  const handleUsdtAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value: string = e.target.value;
    setUsdtAmount(value);

    const calculatedAreal = (
      parseFloat(value || "0") / (currentPrice || 0.25)
    ).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setArealAmount(calculatedAreal);
  };

  const handleArealAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value: string = e.target.value.replace(/,/g, "");
    const numValue = parseFloat(value || "0");

    const calculatedUsdt = (numValue * (currentPrice || 0.25)).toFixed(2);
    setUsdtAmount(calculatedUsdt);

    setArealAmount(
      numValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  useEffect(() => {
    if (mutationError) {
      setErrorMsg(mutationError.message);
      toast.error(mutationError.message);
    }
  }, [mutationError]);

  useEffect(() => {
    fetchTokenPrice(TokenInfo);
  }, [fetchTokenPrice]);

  useEffect(() => {
    if (tokenPriceError) {
      toast.error("Failed to fetch token price");
    }
  }, [tokenPriceError]);

  useEffect(() => {
    if (error || errorMsg) {
      setMessage(error || errorMsg);
      setShowDialog(true);
    }
  }, [error, errorMsg]);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await checkUSDTBalance();
      console.log("USDT Balance:", balance);
      console.log("Account:", account);
      setUsdtBalance(balance);
    };

    if (account) {
      fetchBalance();
    }
  }, [account, checkUSDTBalance]);

  useEffect(() => {
    if (tokenPriceData?.success && tokenPriceData?.data?.status) {
      const apiData = tokenPriceData.data.data;
      if (
        apiData &&
        apiData.minted !== undefined &&
        apiData.sale !== undefined &&
        apiData.arl !== undefined
      ) {
        const { minted, sale, arl } = apiData;
        setTokenData({ minted, sale, arl });
        setCurrentPrice(arl);
        setAnimateProgress(true);

        if (usdtAmount) {
          const calculatedAreal = (parseFloat(usdtAmount) / arl).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          );
          setArealAmount(calculatedAreal);
        }
      }
    }
    // console.log({ tokenPriceData });
    // console.log({ tokenData });
  }, [tokenPriceData, usdtAmount]);

  const handleBuyNow = async () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (kycStatus !== 1) {
      toast.error("Please complete your KYC first");
      return;
    }

    if (!usdtAmount || parseFloat(usdtAmount) <= 0) {
      toast.error("Please enter a valid USDT amount");
      return;
    }

    setIsLoading(true);

    try {
      const txHash = await buyTokenExt(usdtAmount);
      if (!txHash) {
        toast.error("Transaction failed - no transaction hash received");
        return;
      }

      const payloadData: any = { txHash };

      const result = await mutateAsync(payloadData); // Now returns the BuyTokenResponse

      if (!result.success) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success("Transaction successful");
    } catch (error: any) {
      console.error("Buy Now Error:", error);
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const quickAmounts = [10, 50, 100, 500, 1000];

  const handleQuickAmount = (amount: number) => {
    setUsdtAmount(amount.toString());
    const calculatedAreal = (amount / (currentPrice || 0.25)).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
    setArealAmount(calculatedAreal);
  };

  // Enhanced calculation functions
  const calculateUsdtRaised = () => {
    if (!tokenData) return "0";
    return (tokenData.sale * tokenData.arl).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatTokensSold = () => {
    if (!tokenData) return "0";
    return tokenData.sale.toLocaleString();
  };

  const formatTokensMinted = () => {
    if (!tokenData) return "0";
    return tokenData.minted.toLocaleString();
  };

  const formatTokensAvailable = () => {
    if (!tokenData) return "0";
    return (tokenData.minted - tokenData.sale).toLocaleString();
  };

  const calculateProgress = () => {
    if (!tokenData || tokenData.minted === 0) return 0;
    return Math.round((tokenData.sale / tokenData.minted) * 100);
  };

  const getProgressColor = () => {
    const progress = calculateProgress();
    if (progress < 30) return "from-green-500 to-green-400";
    if (progress < 60) return "from-yellow-500 to-yellow-400";
    if (progress < 80) return "from-orange-500 to-orange-400";
    return "from-red-500 to-red-400";
  };

  return (
    <Layout>
      {/* Top Header - Responsive */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mt-2 mx-2 mb-4">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="text-sm sm:text-base font-medium text-white bg-gray-800/50 rounded-lg px-3 py-2">
              Current Price:{" "}
              <span className="text-green-400 font-bold">
                ${currentPrice.toFixed(4)}
              </span>
            </div>
            <div className="text-sm sm:text-base font-medium text-white bg-gray-800/50 rounded-lg px-3 py-2">
              Available:{" "}
              <span className="text-blue-400 font-bold">
                {tokenData ? formatTokensAvailable() : "Loading..."}
              </span>
            </div>
            <div className="text-sm sm:text-base font-medium text-white bg-gray-800/50 rounded-lg px-3 py-2">
              Wallet Balance:{" "}
              <span className="text-yellow-400 font-bold">
                {usdtBalance !== null
                  ? `${usdtBalance.toFixed(2)} USDT`
                  : "Wallet not connected"}
              </span>
            </div>
          </div>
        </div>

        {/* Connect button moved to header, keeping this for mobile fallback */}
        {/* <div className="w-full sm:w-auto lg:hidden">
          <button
            onClick={connect}
            disabled={!isInstalled || isConnecting}
            className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
          >
            {isConnecting
              ? "Connecting..."
              : account
              ? `${account.slice(0, 6)}...${account.slice(-4)}`
              : "Connect Wallet"}
          </button>
        </div> */}
      </div>

      {/* Main Content - Responsive Grid */}
      <div className="min-h-screen bg-transparent p-2 lg:p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Stats Panel - Hidden on small screens, expandable */}
          <div className="xl:col-span-1 order-1 xl:order-1">
            <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-lg lg:text-xl font-bold text-white">
                  Token Stats
                </h2>
                {/* Live Status */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs lg:text-sm font-medium">
                    Live Data
                  </span>
                </div>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="xl:hidden text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      showStats ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              <div
                className={`space-y-4 lg:space-y-6 ${
                  showStats ? "block" : "hidden xl:block"
                }`}
              >
                {/* Sale Progress */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white text-sm lg:text-base font-medium">
                      Sale Progress
                    </span>
                    <span className="text-[#4ECDC4] text-sm lg:text-base font-bold">
                      {isPriceLoading ? "..." : `${calculateProgress()}%`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 lg:h-4 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor()} h-full rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      style={{
                        width: animateProgress
                          ? `${calculateProgress()}%`
                          : "0%",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <StatCard
                    label="Total Minted"
                    value={isPriceLoading ? "Loading..." : formatTokensMinted()}
                    subLabel="ARL Tokens"
                  />
                  <StatCard
                    label="Tokens Sold"
                    value={isPriceLoading ? "Loading..." : formatTokensSold()}
                    subLabel="ARL Tokens"
                    color="text-[#4ECDC4]"
                  />
                  <StatCard
                    label="USDT Raised"
                    value={
                      isPriceLoading
                        ? "Loading..."
                        : `$${calculateUsdtRaised()}`
                    }
                    subLabel="Total Value"
                    color="text-[#F4B448]"
                  />
                  <StatCard
                    label="Available"
                    value={
                      isPriceLoading ? "Loading..." : formatTokensAvailable()
                    }
                    subLabel="Remaining"
                    color="text-green-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buy Panel - Main */}
          <div className="xl:col-span-2 order-2 xl:order-2">
            <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-gray-700/50 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-6 lg:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full mb-4">
                  <Image
                    src="/coin/coin.avif"
                    alt="Logo"
                    width={64}
                    height={64}
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                </div>
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2">
                  Buy ARL
                </h1>
                <p className="text-[#4ECDC4] text-base lg:text-lg font-semibold mb-1">
                  Before Price Rises
                </p>
              </div>

              {/* Current Rate - Enhanced */}
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8 border border-[#F4B448]/30">
                <div className="text-center">
                  <p className="text-gray-400 text-sm lg:text-base mb-2">
                    Current Rate
                  </p>
                  <p className="text-[#F4B448] text-xl lg:text-2xl xl:text-3xl font-bold">
                    {isPriceLoading ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      `$${currentPrice.toFixed(4)} = 1 ARL`
                    )}
                  </p>
                </div>
              </div>

              {/* Quick Amount Buttons - Responsive */}
              <div className="mb-6 lg:mb-8">
                <p className="text-white text-sm lg:text-base font-semibold mb-3">
                  Quick Select (USDT)
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleQuickAmount(amount)}
                      className="px-3 py-2 lg:px-4 lg:py-3 bg-gray-700 hover:bg-[#F4B448] text-white hover:text-black rounded-lg transition-all duration-200 text-sm lg:text-base font-medium transform hover:scale-105"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Section - Enhanced */}
              <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
                {/* USDT Input */}
                <div>
                  <label className="block text-white text-sm lg:text-base font-semibold mb-2 lg:mb-3">
                    You Pay (USDT)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={usdtAmount}
                      onChange={handleUsdtAmountChange}
                      className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl lg:rounded-2xl py-3 lg:py-4 px-4 lg:px-6 pr-16 lg:pr-20 text-white text-lg lg:text-xl font-semibold focus:outline-none focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/20 transition-all duration-200"
                      placeholder="1.00"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">$</span>
                      </div>
                      <span className="text-white font-bold text-sm lg:text-base">
                        USDT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exchange Icon */}
                {/* <div className="flex justify-center">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#F4B448] rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </div>
                </div> */}

                {/* AREAL Output */}
                <div>
                  <label className="block text-white text-sm lg:text-base font-semibold mb-2 lg:mb-3">
                    You Receive (ARL)
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={arealAmount}
                      onChange={handleArealAmountChange}
                      className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl lg:rounded-2xl py-3 lg:py-4 px-4 lg:px-6 pr-16 lg:pr-20 text-[#4ECDC4] text-lg lg:text-xl font-bold focus:outline-none focus:border-[#F4B448] focus:ring-4 focus:ring-[#F4B448]/20 transition-all duration-200"
                      placeholder="4.00"
                    />
                    <div className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <div className="w-8 h-8 lg:w-8 lg:h-8  rounded-full flex items-center justify-center">
                        <Image
                          src="/coin/coin.avif"
                          alt="Coin"
                          width={24}
                          height={24}
                          className="w-8 h-8 lg:w-8 lg:h-8"
                        />
                      </div>
                      <span className="text-white font-bold text-sm lg:text-base">
                        ARL
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buy Button - Enhanced */}
              <button
                onClick={handleBuyNow}
                disabled={
                  isLoading ||
                  !usdtAmount ||
                  parseFloat(usdtAmount) <= 0 ||
                  isPriceLoading
                }
                className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#F4B448] hover:from-[#4ECDC4]/90 hover:to-[#F4B448]/90 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-bold py-3 lg:py-4 px-6 rounded-xl lg:rounded-2xl text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:shadow-none shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : isPriceLoading ? (
                  <span>Loading Price...</span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>
                      <Image
                        src="/coin/coin.avif"
                        alt="Coin"
                        width={24}
                        height={24}
                        className="w-8 h-8 lg:w-8 lg:h-8"
                      />
                    </span>
                    <span>Buy ARL Now</span>
                  </span>
                )}
              </button>

              {/* Security Info */}
              <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-gray-800/40 rounded-xl lg:rounded-2xl border border-gray-700/30">
                <div className="flex items-center space-x-2 mb-2 lg:mb-3">
                  <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-green-400 text-sm lg:text-base font-semibold">
                    Secure Transaction
                  </p>
                </div>
                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">
                  All transactions are secured by blockchain technology. Your
                  ARL tokens will be automatically distributed to your wallet
                  after confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ErrorDialog
        message={message}
        open={showDialog}
        onOpenChange={setShowDialog}
      /> */}
    </Layout>
  );
};

export default BuyPage;
