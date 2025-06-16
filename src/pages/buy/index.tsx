import Layout from "@/src/components/dashboard/layoutMain";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { useMetaMask } from "@/src/hooks/useMetaMask";

const BuyPage = () => {

  const { isInstalled, isConnecting, error, account, connect, buyTokenExt } = useMetaMask();

  const [usdtAmount, setUsdtAmount] = useState("1");
  const [arealAmount, setArealAmount] = useState("10");
  const [isLoading, setIsLoading] = useState(false);

  // Conversion rate: 1 USDT = 10 AREAL
  const conversionRate = 10;

  const handleUsdtAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value: string = e.target.value;
    setUsdtAmount(value);

    // Calculate AREAL amount based on rate
    const calculatedAreal = (
      parseFloat(value || "0") * conversionRate
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

    // Calculate USDT amount based on AREAL input
    const calculatedUsdt = (numValue / conversionRate).toFixed(2);
    setUsdtAmount(calculatedUsdt);

    setArealAmount(
      numValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    // Simulate transaction processing
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // Here you would integrate with your payment processor
    // alert(
    //   `Purchase initiated: ${usdtAmount} USDT for ${arealAmount} AREAL tokens`
    // );
    const txHash = buyTokenExt(usdtAmount);
    setIsLoading(false);
  };

  const quickAmounts = [10, 50, 100, 500, 1000];

  const handleQuickAmount = (amount: number) => {
    setUsdtAmount(amount.toString());
    const calculatedAreal = (amount * conversionRate).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setArealAmount(calculatedAreal);
  };

  return (
    <Layout>
      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>
      )}
      <button
        onClick={connect}
        disabled={!isInstalled || isConnecting}
        className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting
          ? "Connecting..."
          : account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-lg border border-gray-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
              <Image src="/coin/coin.png" alt="Logo" width={64} height={64} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Buy AREAL</h1>
            <p className="text-[#4ECDC4] text-lg font-semibold mb-1">
              Before Price Rises
            </p>
            <p className="text-white text-xl font-bold">Stage 3 - Presale</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-sm font-medium">Progress</span>
              <span className="text-[#4ECDC4] text-sm font-bold">
                20.82% Sold
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#4ECDC4] to-[#F4B448] h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: "20.82%" }}
              ></div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-1">USDT Raised</p>
              <p className="text-white text-lg font-bold">$3,142,996</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-1">Tokens Sold</p>
              <p className="text-[#4ECDC4] text-lg font-bold">621.7M</p>
            </div>
          </div>

          {/* Current Rate */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-xl p-4 mb-6 border border-[#F4B448]/30">
            <div className="text-center">
              <p className="text-[#F4B448] text-2xl font-bold mb-1">
                1 USDT = 10 AREAL
              </p>
              <p className="text-gray-300 text-sm">
                Next Stage: 1 USDT = 8 AREAL
              </p>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="mb-6">
            <p className="text-white text-sm font-semibold mb-3">
              Quick Select (USDT)
            </p>
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickAmount(amount)}
                  className="px-4 py-2 bg-gray-700 hover:bg-[#F4B448] text-white hover:text-black rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4 mb-8">
            {/* USDT Input */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                You Pay (USDT)
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={usdtAmount}
                  onChange={handleUsdtAmountChange}
                  className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl py-4 px-4 pr-20 text-white text-xl font-semibold focus:outline-none focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/20 transition-all duration-200"
                  placeholder="1.00"
                  min="0"
                  step="0.01"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <span className="text-white font-bold">USDT</span>
                </div>
              </div>
            </div>

            {/* Exchange Icon */}
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-[#F4B448] rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-black"
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
            </div>

            {/* AREAL Output */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                You Receive (AREAL)
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={arealAmount}
                  onChange={handleArealAmountChange}
                  className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl py-4 px-4 pr-20 text-[#4ECDC4] text-xl font-bold focus:outline-none focus:border-[#F4B448] focus:ring-4 focus:ring-[#F4B448]/20 transition-all duration-200"
                  placeholder="10.00"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-[#F4B448] to-[#4ECDC4] rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">A</span>
                  </div>
                  <span className="text-[#4ECDC4] font-bold">AREAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <button
            onClick={handleBuyNow}
            disabled={isLoading || !usdtAmount || parseFloat(usdtAmount) <= 0}
            className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#F4B448] hover:from-[#4ECDC4]/90 hover:to-[#F4B448]/90 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:shadow-none shadow-lg"
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
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>💎</span>
                <span>Buy AREAL Now</span>
              </span>
            )}
          </button>

          {/* Security Info */}
          <div className="mt-6 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <p className="text-green-400 text-sm font-semibold">
                Secure Transaction
              </p>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              All transactions are secured by blockchain technology. Your AREAL
              tokens will be automatically distributed to your wallet after
              confirmation.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyPage;
