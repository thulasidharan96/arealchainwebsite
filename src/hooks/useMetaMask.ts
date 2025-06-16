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
    console.log({account})
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

  // Function to check USDT balance
  const checkUSDTBalance = async () => {
    if (!account) {
      setError("Please connect your wallet first.");
      return 0;
    }

    try {
      // const usdtContractAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
      const usdtContractAddress = "0xeb7D09A69e9c00F3f65c294C6206F0b26163a38a";

      // ABI for balanceOf function: balanceOf(address)
      const balanceOfFunctionABI = "0x70a08231"; // Function signature hash for balanceOf(address)
      const paddedAddress = account.replace("0x", "").padStart(64, "0");
      const data = balanceOfFunctionABI + paddedAddress;

      const result = await window.ethereum.request({
        method: "eth_call",
        params: [
          {
            to: usdtContractAddress,
            data: `0x${data}`,
          },
          "latest",
        ],
      });

      console.log({result})

      // Convert result from hex to decimal and adjust for 6 decimals
      const balanceInSmallestUnit = BigInt(result).toString();
      const balanceInUSDT = Number(balanceInSmallestUnit) / 10 ** 6;
      return balanceInUSDT;
    } catch (err) {
      console.log(err);
      setError("Failed to check USDT balance. Please try again.");
      return 0;
    }
  };

  // Function to send USDT to admin address
  const sendUSDTToAdmin = async (adminAddress: string, amountInUSDT: any) => {
    console.log("sendUSDTToAdmin")
    if (!account) {
      console.log("Please connect your wallet first")
      setError("Please connect your wallet first.");
      return;
    }
    else {
      console.log("sendUSDTToAdmin else")
    }

    setError(null);

    console.log("before try")

    try {
      console.log("1")
      // Check USDT balance before sending
      const balance = await checkUSDTBalance();
      console.log("balance", balance)
      if (balance < amountInUSDT) {
        setError(`Insufficient USDT balance. You have ${balance} USDT, but need ${amountInUSDT} USDT.`);
        return;
      }
      console.log("2")

      const usdtContractAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";

      // Convert amount to the smallest unit (USDT has 6 decimals)
      const amountInSmallestUnit = (BigInt(Math.floor(amountInUSDT * 10 ** 6))).toString();
      console.log("3")
      // ABI for the transfer function: transfer(address to, uint256 value)

      const transferFunctionABI = "0xa9059cbb";
      const paddedAdminAddress = adminAddress.replace("0x", "").padStart(64, "0");
      console.log("paddedAdminAddress:", paddedAdminAddress);

      const paddedAmount = BigInt(amountInSmallestUnit).toString(16).padStart(64, "0");
      console.log("paddedAmount:", paddedAmount);

      if (!/^[0-9a-fA-F]+$/.test(paddedAmount)) {
        setError("Invalid amount encoding. Amount must be a valid hex string.");
        return;
      }

      const data = transferFunctionABI + paddedAdminAddress + paddedAmount;

      console.log("data (without 0x):", data);

      if (!/^[0-9a-fA-F]+$/.test(data)) {
        setError("Invalid transaction data. Data must be a valid hex string.");
        return;
      }

      const transactionParameters = {
        from: account,
        to: usdtContractAddress,
        value: "0x0",
        data: `0x${data}`,
        chainId: "0x61", // BNB Testnet chain ID (97 in decimal)
      };

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("USDT Transaction sent! Tx Hash:", txHash);
      return txHash;
    } catch (err) {
      console.log(err);
      if (err.code === 4001) {
        setError("Transaction rejected by user.");
      } else if (err.code === -32000) {
        setError("Insufficient funds or gas for the transaction.");
      } else {
        setError("Failed to send USDT. Please try again.");
      }
      return null;
    }
  };

  const buyTokenExt = async (amountInUSDT: any) => {
    console.log("buyTokenExt");
    const adminAddress = "0xD1B60f3663B66Baf8159dB3061d3072Bee8E81a4"; // Replace with the actual admin address
    const amountToSendInUSDT = 10; // Amount in USDT (e.g., 10 USDT)

    console.log("before sendUSDTToAdmin", {account});

     if (!account) {
        console.log("Please connect your wallet first")
        setError("Please connect your wallet first.");
        return;
      }
      else {
        console.log("sendUSDTToAdmin else")
      }

    // Then, send USDT
    const txHash = await sendUSDTToAdmin(adminAddress, amountToSendInUSDT);
    if (txHash) {
      console.log(`Successfully sent ${amountToSendInUSDT} USDT to admin`);
      return txHash;
    }
  }

  return {
    isInstalled,
    isConnecting,
    error,
    account,
    connect,
    buyTokenExt
  };
};
