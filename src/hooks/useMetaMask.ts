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
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      if (typeof window !== "undefined" && window.ethereum && typeof window.ethereum.request === "function") {
        // Check the network ID
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const networkId = parseInt(chainId, 16);
        const desiredNetworkId = 97; // Adjust based on your needs : BNB Testnet network ID : 97
        if (networkId !== desiredNetworkId) {
          setError(`Please switch to the correct network (desired network ID: ${desiredNetworkId}). Current network ID: ${networkId}.`);
          setIsConnecting(false);
          return;
        }

        // Check if MetaMask is unlocked
        if (window.ethereum._metamask && typeof window.ethereum._metamask.isUnlocked === "function") {
          const isUnlocked = await window.ethereum._metamask.isUnlocked();
          if (!isUnlocked) {
            setError("Please unlock your MetaMask wallet to continue.");
            setIsConnecting(false);
            return;
          }
        }

        // Request accounts with the correct method
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts", // Correct method name
        });

        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setError("No accounts found. Please ensure your wallet is set up.");
        }
      } else {
        setError("MetaMask is not available on this browser.");
      }
    } catch (err) {
      console.log(err);
      if (err.code === 4001) {
        setError("Please connect your MetaMask wallet to continue.");
      } else if (err.code === -32603) {
        setError("No active wallet found. Please log in to your wallet and try again.");
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
