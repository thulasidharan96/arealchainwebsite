import React, { createContext, useContext, ReactNode } from "react";
import { useMetaMask } from "@/src/hooks/useMetaMask";

// Define the enhanced context type
interface WalletContextType {
  isInstalled: boolean;
  isConnecting: boolean;
  error: string | null;
  account: string | null;
  currentChainId: number | null;
  isCorrectNetwork: boolean;
  connect: () => Promise<boolean | void>;
  disconnect: () => void;
  buyTokenExt: (amountToSendInUSDT: any) => Promise<string | false>;
  checkUSDTBalance: () => Promise<number>;
  addNetwork: () => Promise<void>;
  addBSCNetwork: () => Promise<void>;
  checkNetwork: () => Promise<boolean>;
}

// Create the context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider component
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const walletState = useMetaMask();

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
