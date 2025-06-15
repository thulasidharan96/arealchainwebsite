import React, { useState } from "react";
import {
  Home,
  Grid3X3,
  ArrowRightLeft,
  Waves,
  CircleDot,
  MoreHorizontal,
} from "lucide-react";
import LayoutMain from "@/src/components/dashboard/layoutMain";
// import { useAuth } from "react-oidc-context";
import { useWallet } from "@/src/hooks/useWallet";
import KYCForm from "@/src/components/KYCFORM";

const dashboard = () => {
  // const auth = useAuth();

  // if (auth.isLoading) return <p>Loading...</p>;
  // if (auth.error) return <p>Error: {auth.error.message}</p>;
  // if (!auth.isAuthenticated)
  //   return <button onClick={() => auth.signinRedirect()}>Login</button>;
  const [activeTab, setActiveTab] = useState("chakra-pool");
  const { address, balance } = useWallet();

  const sidebarItems = [
    { id: "home", icon: Home, label: "Home", active: false },
    { id: "overview", icon: Grid3X3, label: "My Overview", active: false },
    { id: "bridge", icon: ArrowRightLeft, label: "Bridge", active: false },
    { id: "stake", icon: CircleDot, label: "Stake", active: false },
    { id: "swap", icon: ArrowRightLeft, label: "Swap", active: false },
    { id: "liquidity", icon: Waves, label: "Liquidity Pools", active: false },
    { id: "chakra-pool", icon: CircleDot, label: "Chakra Pool", active: true },
    { id: "more", icon: MoreHorizontal, label: "More", active: false },
  ];

  return (
    <LayoutMain>
      <div className="overflow-auto">
        <div>Welcome to the Dashboard!</div>
        {/* <div className="p-4">
          <h1 className="text-xl font-bold mb-2">Dashboard</h1>
          <p>Address: {address}</p>
          <p>
            Balance: {balance?.formatted} {balance?.symbol}
          </p>
        </div> */}
        <KYCForm />
      </div>
    </LayoutMain>
  );
};

export default dashboard;
