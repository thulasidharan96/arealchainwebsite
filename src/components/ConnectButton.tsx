"use client";

import { useState, useEffect } from "react";
import { useMetaMask } from "@/src/hooks/useMetaMask";
import { ErrorDialog } from "@/src/components/ErrorDialog"; // adjust the path if needed

export default function YourComponent() {
  const {
    isInstalled,
    isConnecting,
    error,
    account,
    connect,
    addNetwork,
    addBnbTestNetwork,
  } = useMetaMask();

  const [showDialog, setShowDialog] = useState(false);

  // Show dialog when error appears
  useEffect(() => {
    if (error) {
      setShowDialog(true);
    }
  }, [error]);

  return (
    <div className="gap-4 flex flex-row">
      {!isInstalled && (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          <p>MetaMask is not installed. Please install MetaMask to continue.</p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Install MetaMask
          </a>
        </div>
      )}

      {/* Show ErrorDialog if there's an error */}
      {error && (
        <ErrorDialog
          message={error}
          open={showDialog}
          onOpenChange={setShowDialog}
        />
      )}

      {/* Connect Wallet button (optional) */}
      {/* 
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
      */}
      <div>
        <button
          onClick={addNetwork}
          className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-2 rounded-lg mt-4"
        >
          Add Areal Network
        </button>
      </div>
      <div>
        <button
          onClick={addBnbTestNetwork}
          className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-2 rounded-lg mt-4"
        >
          Add BNB Testnet
        </button>
      </div>
    </div>
  );
}
