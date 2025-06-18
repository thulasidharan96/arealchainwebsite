import { useMetaMask } from "@/src/hooks/useMetaMask";

export default function YourComponent() {
  const { isInstalled, isConnecting, error, account, connect, addNetwork } = useMetaMask();

  return (
    <div>
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

      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>
      )}

      {/* <button
        onClick={connect}
        disabled={!isInstalled || isConnecting}
        className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting
          ? "Connecting..."
          : account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button> */}

      <button
        onClick={addNetwork}
        className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Areal Network
      </button>
    </div>
  );
}
