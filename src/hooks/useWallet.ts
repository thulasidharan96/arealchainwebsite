import { useAccount, useBalance, useDisconnect } from "wagmi";

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  return { address, isConnected, balance, disconnect };
};
