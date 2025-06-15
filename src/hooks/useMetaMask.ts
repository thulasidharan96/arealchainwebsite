import { useState, useEffect } from "react";
import { checkMetaMaskInstalled } from "../lib/metamask";

export const useMetaMask = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    setIsInstalled(checkMetaMaskInstalled());
  }, []);

  const connect = async () => {
    if (!isInstalled) {
      setError(
        "MetaMask is not installed. Please install MetaMask to continue."
      );
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      if (typeof window !== "undefined" && window.ethereum && typeof window.ethereum.request === "function") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        setError("MetaMask is not available on this browser.");
      }
    } catch (err: any) {
      if (err.code === 4001) {
        setError("Please connect your MetaMask wallet to continue.");
      } else {
        setError("Failed to connect to MetaMask. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    isInstalled,
    isConnecting,
    error,
    account,
    connect,
  };
};
