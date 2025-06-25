import { useState, useEffect } from "react";
import { checkMetaMaskInstalled } from "../lib/metamask";
import { toast } from "sonner";

export const useMetaMask = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);

  const desiredNetworkId = 97;

  // Fix environment variable type conversion and add fallbacks
  const usdtDecimal = parseInt(process.env.NEXT_PUBLIC_USDT_DECIMAL || "18");
  const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;

  useEffect(() => {
    setIsInstalled(checkMetaMaskInstalled());
    checkInitialConnection();
  }, []);

  // Check if user is already connected on page load
  const checkInitialConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await checkNetwork();
        }
      } catch (err) {
        console.log("Failed to check initial connection:", err);
      }
    }
  };

  // Check current network
  const checkNetwork = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const networkId = parseInt(chainId, 16);
        setCurrentChainId(networkId);

        const isCorrect = networkId === desiredNetworkId;
        setIsCorrectNetwork(isCorrect);

        if (!isCorrect && account) {
          setError(
            `Please switch to BSC Testnet (Chain ID: ${desiredNetworkId})`
          );
        } else if (isCorrect && account) {
          setError(null);
        }

        return isCorrect;
      } catch (err) {
        console.log("Failed to check network:", err);
        return false;
      }
    }
    return false;
  };

  // Listen for account and network changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setError(null);
          checkNetwork();
          toast.success("Wallet connected successfully!");
        } else {
          setAccount(null);
          setCurrentChainId(null);
          setIsCorrectNetwork(false);
          setError("Please connect your wallet");
          toast.info("Wallet disconnected");
        }
      };

      const handleChainChanged = (chainId: string) => {
        const networkId = parseInt(chainId, 16);
        setCurrentChainId(networkId);

        const isCorrect = networkId === desiredNetworkId;
        setIsCorrectNetwork(isCorrect);

        if (isCorrect && account) {
          setError(null);
          toast.success("Connected to BSC Testnet!");
        } else if (!isCorrect && account) {
          setError(
            `Please switch to BSC Testnet (Chain ID: ${desiredNetworkId})`
          );
          toast.error("Wrong network! Please switch to BSC Testnet");
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [account, desiredNetworkId]);

  const connect = async () => {
    // If already connected, disconnect
    if (account) {
      disconnect();
      return;
    }

    if (!isInstalled) {
      const errorMsg =
        "MetaMask is not installed. Please install MetaMask to continue.";
      setError(errorMsg);
      toast.error(errorMsg);
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
        // Check if MetaMask is unlocked
        if (
          window.ethereum._metamask &&
          typeof window.ethereum._metamask.isUnlocked === "function"
        ) {
          const isUnlocked = await window.ethereum._metamask.isUnlocked();
          if (!isUnlocked) {
            const errorMsg = "Please unlock your MetaMask wallet to continue.";
            setError(errorMsg);
            toast.error(errorMsg);
            setIsConnecting(false);
            return false;
          }
        }

        // Request accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await checkNetwork();
          toast.success("Wallet connected successfully!");
          return true;
        } else {
          const errorMsg =
            "No accounts found. Please ensure your wallet is set up.";
          setError(errorMsg);
          toast.error(errorMsg);
          return false;
        }
      } else {
        const errorMsg = "MetaMask is not available on this browser.";
        setError(errorMsg);
        toast.error(errorMsg);
        return false;
      }
    } catch (err: any) {
      console.log(err);
      let errorMsg = "Failed to connect to MetaMask. Please try again.";

      if (err.code === 4001) {
        errorMsg = "Connection rejected. Please accept the connection request.";
      } else if (err.code === -32603) {
        errorMsg =
          "No active wallet found. Please log in to your wallet and try again.";
      }

      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      // Clear local state first
      setAccount(null);
      setCurrentChainId(null);
      setIsCorrectNetwork(false);
      setError(null);

      // Method 1: Request permission revocation (if supported)
      if (
        typeof window !== "undefined" &&
        window.ethereum &&
        typeof window.ethereum.request === "function"
      ) {
        try {
          // This will revoke the dapp's permissions
          await window.ethereum.request({
            method: "wallet_revokePermissions",
            params: [
              {
                eth_accounts: {},
              },
            ],
          });
        } catch (revokeError) {
          // wallet_revokePermissions might not be supported by all wallets
          console.log("Permission revocation not supported:", revokeError);

          // Method 2: Alternative approach - request accounts with empty array
          try {
            await window.ethereum.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }],
            });
          } catch (permissionError) {
            console.log("Permission request failed:", permissionError);
          }
        }
      }

      toast.success("Wallet disconnected successfully");
      return true;
    } catch (error) {
      console.error("Error during disconnect:", error);
      // Still show success since local state was cleared
      toast.success("Wallet disconnected locally");
      return true;
    }
  };

  // FIXED: Enhanced USDT balance checking function
  const checkUSDTBalance = async () => {
    // console.log("🔍 Starting USDT balance check...");

    // Validate environment variables first
    if (!usdtContractAddress) {
      const errorMsg = "USDT contract address is not configured.";
      // console.error("❌ Environment Error:", errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
      return 0;
    }

    if (!account) {
      const errorMsg = "Please connect your wallet first.";
      // console.error("❌ Account Error:", errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
      return 0;
    }

    if (!isCorrectNetwork) {
      const errorMsg = "Please switch to BSC Testnet to check balance.";
      // console.error("❌ Network Error:", errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
      return 0;
    }

    try {
      // console.log("📋 Balance check params:", {
      //   account,
      //   usdtContractAddress,
      //   usdtDecimal,
      //   currentChainId,
      //   isCorrectNetwork,
      // });

      // Validate account format
      if (!account.startsWith("0x") || account.length !== 42) {
        throw new Error("Invalid account address format");
      }

      // Validate contract address format
      if (
        !usdtContractAddress.startsWith("0x") ||
        usdtContractAddress.length !== 42
      ) {
        throw new Error("Invalid USDT contract address format");
      }

      const userAddress = account.toLowerCase();
      const balanceOfFunctionABI = "70a08231"; // balanceOf(address)

      // Remove 0x prefix and pad to 64 characters
      const paddedAddress = userAddress.replace("0x", "").padStart(64, "0");

      const data = `0x${balanceOfFunctionABI}${paddedAddress}`;

      // console.log("🔧 Constructed call data:", {
      //   userAddress,
      //   paddedAddress,
      //   data,
      //   dataLength: data.length,
      // });

      // Make the RPC call with additional error handling
      const callParams = {
        to: usdtContractAddress.toLowerCase(),
        data: data,
      };

      // console.log("📞 Making eth_call with params:", callParams);

      const result = await window.ethereum.request({
        method: "eth_call",
        params: [callParams, "latest"],
      });

      // console.log("✅ Raw result from eth_call:", result);

      if (!result || result === "0x") {
        // console.log("⚠️ Empty result, assuming zero balance");
        return 0;
      }

      // Convert hex result to decimal
      let balanceInSmallestUnit;
      try {
        balanceInSmallestUnit = BigInt(result).toString();
      } catch (conversionError) {
        // console.error("❌ BigInt conversion error:", conversionError);
        throw new Error("Failed to convert balance result");
      }

      const balanceInUSDT =
        Number(balanceInSmallestUnit) / Math.pow(10, usdtDecimal);

      // console.log("💰 Balance calculation:", {
      //   result,
      //   balanceInSmallestUnit,
      //   usdtDecimal,
      //   balanceInUSDT,
      // });

      return balanceInUSDT;
    } catch (err: any) {
      // console.error("❌ USDT Balance Error Details:", {
      //   error: err,
      //   code: err.code,
      //   message: err.message,
      //   data: err.data,
      //   account,
      //   usdtContractAddress,
      //   currentChainId,
      // });

      let errorMsg = "Failed to check USDT balance.";

      // Handle specific error codes
      switch (err.code) {
        case -32603:
          errorMsg =
            "RPC internal error. The network might be congested or the contract address is invalid.";
          break;
        case -32602:
          errorMsg = "Invalid parameters. Please check your wallet connection.";
          break;
        case -32601:
          errorMsg =
            "Method not found. Your wallet might not support this call.";
          break;
        case 4001:
          errorMsg = "Request rejected by user.";
          break;
        default:
          if (err.message) {
            errorMsg = `Balance check failed: ${err.message}`;
          }
      }

      setError(errorMsg);
      toast.error(errorMsg);
      return 0;
    }
  };

  // Function to send USDT to admin address
  const sendUSDTToAdmin = async (adminAddress: string, amountInUSDT: any) => {
    console.log("sendUSDTToAdmin");
    if (!account) {
      const errorMsg = "Please connect your wallet first.";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (!isCorrectNetwork) {
      const errorMsg = "Please switch to BSC Testnet to make transactions.";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    setError(null);

    try {
      const balance = await checkUSDTBalance();
      if (balance < amountInUSDT) {
        const errorMsg = `Insufficient USDT balance. You have ${balance.toFixed(
          2
        )} USDT, but need ${amountInUSDT} USDT.`;
        setError(errorMsg);
        toast.error(errorMsg);
        return false;
      }

      const amountInSmallestUnit = BigInt(
        Math.floor(amountInUSDT * Math.pow(10, usdtDecimal))
      ).toString();
      const transferFunctionABI = "a9059cbb";
      const paddedAdminAddress = adminAddress
        .replace("0x", "")
        .padStart(64, "0");
      const paddedAmount = BigInt(amountInSmallestUnit)
        .toString(16)
        .padStart(64, "0");

      if (!/^[0-9a-fA-F]+$/.test(paddedAmount)) {
        const errorMsg =
          "Invalid amount encoding. Amount must be a valid hex string.";
        setError(errorMsg);
        toast.error(errorMsg);
        return false;
      }

      const data = transferFunctionABI + paddedAdminAddress + paddedAmount;
      console.log("data (without 0x):", data);

      if (!/^[0-9a-fA-F]+$/.test(data)) {
        const errorMsg =
          "Invalid transaction data. Data must be a valid hex string.";
        setError(errorMsg);
        toast.error(errorMsg);
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
      // toast.success("Transaction sent successfully!");
      return txHash;
    } catch (err: any) {
      console.log(err);
      let errorMsg = "Failed to send USDT. Please try again.";

      if (err.code === 4001) {
        errorMsg = "Transaction rejected by user.";
      } else if (err.code === -32000) {
        errorMsg = "Insufficient funds or gas for the transaction.";
      } else if (err.code === -32603) {
        errorMsg = "Transaction failed. Please check your network connection.";
      }

      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    }
  };

  const buyTokenExt = async (amountToSendInUSDT: any) => {
    console.log("buyTokenExt");
    const adminAddress: string | undefined =
      process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

    console.log("before sendUSDTToAdmin", { account });

    if (!account) {
      const errorMsg = "Please connect your wallet first.";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (!isCorrectNetwork) {
      const errorMsg = "Please switch to BSC Testnet to buy tokens.";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (!adminAddress) {
      const errorMsg = "Admin address is not defined.";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    // Send USDT
    const txHash = await sendUSDTToAdmin(adminAddress!, amountToSendInUSDT);
    if (txHash) {
      console.log(`Successfully sent ${amountToSendInUSDT} USDT to admin`);
      return txHash;
    }
    return false;
  };

  const addNetwork = async () => {
    if (!window.ethereum) {
      const errorMsg = "MetaMask is not available";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x2501", // 9473 in hexadecimal
            chainName: "Areal Mainnet",
            nativeCurrency: {
              name: "Areal",
              symbol: "ARL",
              decimals: 18,
            },
            rpcUrls: ["https://d2fys1j6b8bnjm.cloudfront.net/"],
            blockExplorerUrls: [],
          },
        ],
      });

      setError(null);
      toast.success("Areal Network added successfully!");
      console.log("Areal Network added successfully");
    } catch (err: any) {
      console.log("Add network error:", err);
      let errorMsg = "Failed to add network. Please try again.";

      if (err.code === 4001) {
        errorMsg = "User rejected adding network";
      } else if (err.code === -32602) {
        errorMsg = "Invalid network parameters";
      }

      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const addBSCNetwork = async () => {
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
              chainId: "0x61", // 97 in hexadecimal
              chainName: "Binance Smart Chain Testnet",
              nativeCurrency: {
                name: "Binance Coin",
                symbol: "tBNB",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              blockExplorerUrls: ["https://testnet.bscscan.com"],
            },
          ],
        });
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
    currentChainId,
    isCorrectNetwork,
    connect,
    disconnect,
    buyTokenExt,
    checkUSDTBalance,
    addNetwork,
    addBSCNetwork,
    checkNetwork,
  };
};
