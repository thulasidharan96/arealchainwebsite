// components/Header.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, Wallet } from "lucide-react";
import ConnectButton from "@/src/components/ConnectButton";

interface WalletInfo {
  name: string;
  connected: boolean;
  address?: string;
  balance?: string;
}

const HeaderMain: React.FC = () => {
  const [mantraWallet, setMantraWallet] = useState<WalletInfo>({
    name: "MANTRA Wallet",
    connected: false,
  });

  const [ethWallet, setEthWallet] = useState<WalletInfo>({
    name: "ETH MAINNET",
    connected: false,
  });

  const connectMantraWallet = () => {
    // Simulate wallet connection
    setMantraWallet({
      name: "MANTRA Wallet",
      connected: true,
      address: "0x1234...5678",
      balance: "1,234.56 OM",
    });
  };

  const connectEthWallet = () => {
    // Simulate wallet connection
    setEthWallet({
      name: "ETH MAINNET",
      connected: true,
      address: "0xabcd...efgh",
      balance: "2.34 ETH",
    });
  };

  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">AREAL</h1>
      </div>

      <div className="flex items-center space-x-4">
        <ConnectButton />
        {/* MANTRA Wallet */}
        <button
          onClick={connectMantraWallet}
          className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 transition-colors"
        >
          <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
          <div className="flex flex-col items-start">
            {mantraWallet.connected ? (
              <>
                <span className="text-sm font-medium">
                  {mantraWallet.balance}
                </span>
                <span className="text-xs text-gray-400">
                  {mantraWallet.address}
                </span>
              </>
            ) : (
              <span className="text-sm">Connect Wallet</span>
            )}
          </div>
          {mantraWallet.connected && (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </button>

        {/* ETH MAINNET */}
        <button
          onClick={connectEthWallet}
          className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 transition-colors"
        >
          <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
          <div className="flex flex-col items-start">
            {ethWallet.connected ? (
              <>
                <span className="text-sm font-medium">{ethWallet.balance}</span>
                <span className="text-xs text-gray-400">
                  {ethWallet.address}
                </span>
              </>
            ) : (
              <span className="text-sm">Connect Wallet</span>
            )}
          </div>
          {ethWallet.connected && (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </button>
      </div>
    </header>
  );
};

export default HeaderMain;
