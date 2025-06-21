import { useState, useEffect } from "react";
import { checkMetaMaskInstalled } from "../lib/metamask";

export const useMetaMask = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const desiredNetworkId = 97;
  const usdtDecimal = process.env.NEXT_PUBLIC_USDT_DECIMAL;
  const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;

  useEffect(() => {
    setIsInstalled(checkMetaMaskInstalled());
  }, []);

  const connect = async () => {
    console.log({ account });
    if (!isInstalled) {
      setError(
        "MetaMask is not installed. Please install MetaMask to continue."
      );
      return false;
    }

    setIsConnecting(true);
    setError(null);

    try {
      if (
        typeof window !== "undefined" &&
        window.ethereum &&
        typeof window.ethereum.request === "function"
      ) {
        // Check the network ID
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const networkId = parseInt(chainId, 16);
        if (networkId !== desiredNetworkId) {
          setError(
            `Please switch to the correct network (desired network ID: ${desiredNetworkId}). Current network ID: ${networkId}.`
          );
          setIsConnecting(false);
          return false;
        }

        // Check if MetaMask is unlocked
        if (
          window.ethereum._metamask &&
          typeof window.ethereum._metamask.isUnlocked === "function"
        ) {
          const isUnlocked = await window.ethereum._metamask.isUnlocked();
          if (!isUnlocked) {
            setError("Please unlock your MetaMask wallet to continue.");
            setIsConnecting(false);
            return false;
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
        setError(
          "No active wallet found. Please log in to your wallet and try again."
        );
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
      const userAddress = account;
      const balanceOfFunctionABI = "70a08231";
      const paddedAddress = userAddress
        .toLowerCase()
        .replace("0x", "")
        .padStart(64, "0");
      const data = `0x${balanceOfFunctionABI}${paddedAddress}`;

      const result = await window.ethereum.request({
        method: "eth_call",
        params: [
          {
            to: usdtContractAddress,
            data: data,
          },
          "latest",
        ],
      });

      const balanceInSmallestUnit = BigInt(result).toString();
      const balanceInUSDT = Number(balanceInSmallestUnit) / 10 ** usdtDecimal;
      console.log({ result, balanceInSmallestUnit, balanceInUSDT });
      return balanceInUSDT;
    } catch (err) {
      console.log(err);
      setError("Failed to check USDT balance. Please try again.");
      return 0;
    }
  };

  // Function to send USDT to admin address
  const sendUSDTToAdmin = async (adminAddress: string, amountInUSDT: any) => {
    console.log("sendUSDTToAdmin");
    if (!account) {
      console.log("Please connect your wallet first");
      setError("Please connect your wallet first.");
      return false;
    } else {
      console.log("sendUSDTToAdmin else");
    }

    setError(null);

    try {
      const balance = await checkUSDTBalance();
      if (balance < amountInUSDT) {
        setError(
          `Insufficient USDT balance. You have ${balance} USDT, but need ${amountInUSDT} USDT.`
        );
        return false;
      }

      const amountInSmallestUnit = BigInt(
        Math.floor(amountInUSDT * 10 ** usdtDecimal)
      ).toString();
      const transferFunctionABI = "a9059cbb";
      const paddedAdminAddress = adminAddress
        .replace("0x", "")
        .padStart(64, "0");
      const paddedAmount = BigInt(amountInSmallestUnit)
        .toString(16)
        .padStart(64, "0");

      if (!/^[0-9a-fA-F]+$/.test(paddedAmount)) {
        setError("Invalid amount encoding. Amount must be a valid hex string.");
        return false;
      }
      const data = transferFunctionABI + paddedAdminAddress + paddedAmount;
      console.log("data (without 0x):", data);
      if (!/^[0-9a-fA-F]+$/.test(data)) {
        setError("Invalid transaction data. Data must be a valid hex string.");
        return false;
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

  const buyTokenExt = async (amountToSendInUSDT: any) => {
    console.log("buyTokenExt");
    const adminAddress: string | undefined =
      process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

    console.log("before sendUSDTToAdmin", { account });

    if (!account) {
      console.log("Please connect your wallet first");
      setError("Please connect your wallet first.");
      return false;
    } else {
      console.log("sendUSDTToAdmin else");
    }

    if (!adminAddress) {
      setError("Admin address is not defined.");
    }

    // Then, send USDT
    const txHash = await sendUSDTToAdmin(adminAddress!, amountToSendInUSDT);
    if (txHash) {
      console.log(`Successfully sent ${amountToSendInUSDT} USDT to admin`);
      return txHash;
    }
  };

  const addNetwork = async () => {
    try {
      if (
        typeof window !== "undefined" &&
        window.ethereum &&
        typeof window.ethereum.request === "function"
      ) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              // chainId: '9473',
              chainId: "0x2501",
              chainName: "Areal Mainnet",
              nativeCurrency: {
                name: "Areal",
                symbol: "ARL",
                decimals: 18,
              },
              rpcUrls: ["https://d2fys1j6b8bnjm.cloudfront.net/"],
              // blockExplorerUrls: []
            },
          ],
        });
        // await window.ethereum.request({
        //   method: 'wallet_addEthereumChain',
        //   params: [{
        //     // chainId: '8001',
        //     chainId: '0x1F41',
        //     chainName: 'Areal Mainnet',
        //     nativeCurrency: {
        //       name: 'Areal',
        //       symbol: 'ARL',
        //       decimals: 18
        //     },
        //     rpcUrls: ['https://d2vi20sflkgy7k.cloudfront.net/'],
        //     // blockExplorerUrls: []
        //   }]
        // });
        setError("Areal Network added.");
      }
    } catch (err) {
      console.log(err);
      // setError("Network not added.");
    }
  };

  return {
    isInstalled,
    isConnecting,
    error,
    account,
    addNetwork,
    connect,
    buyTokenExt,
  };
};
