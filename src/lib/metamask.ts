export const checkMetaMaskInstalled = () => {
  if (typeof window !== "undefined") {
    return !!window.ethereum?.isMetaMask;
  }
  return false;
};

export const signMessage = async (message: string) => {
  // First check if we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment");
  }

  // Check if MetaMask is installed
  if (!checkMetaMaskInstalled()) {
    throw new Error(
      "MetaMask is not installed. Please install MetaMask to continue."
    );
  }

  try {
    if (!window.ethereum || typeof window.ethereum.request !== "function") {
      throw new Error("MetaMask's Ethereum provider is not available.");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const from = accounts[0];
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, from],
    });

    return signature;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 4001
    ) {
      // User rejected the request
      throw new Error("Please connect your MetaMask wallet to continue.");
    }
    throw error;
  }
};
