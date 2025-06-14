import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  ssr: true,
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http("https://mainnet.infura.io/v3/YOUR_INFURA_ID"),
    [sepolia.id]: http("https://sepolia.infura.io/v3/YOUR_INFURA_ID"),
  },
});
