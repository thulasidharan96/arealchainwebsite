// components/Layout.tsx
import React from "react";
import HeaderMain from "./headerMain";
import Sidebar from "./sidebar";
import { BlobAnimation } from "../ui/BlobAnimation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex">
      <BlobAnimation />
      {/* Fixed Sidebar - full height */}
      <div className="fixed left-0 top-0 h-screen w-[100px] bg-gray-900 border-r border-gray-800">
        <Sidebar />
      </div>

      {/* Main content container */}
      <div className="flex-1 ml-[100px]">
        {/* Fixed header - adjusted width */}
        <div className="fixed top-0 right-0 left-[100px] z-10">
          <HeaderMain />
        </div>

        {/* Scrollable content */}
        <div className="pt-[76px]">
          <main className="h-[calc(100vh-76px)] overflow-y-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
