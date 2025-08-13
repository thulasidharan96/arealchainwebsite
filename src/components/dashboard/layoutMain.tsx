// components/Layout.tsx
import React from "react";
import Sidebar from "./sidebar";
import HeaderMain from "./headerMain";
import { BlobAnimation } from "../ui/BlobAnimation";
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Sidebar />
      <BlobAnimation />
      {/* Main content area with proper spacing for fixed sidebar */}
      <div className="lg:ml-20 xl:ml-[74px] flex flex-col min-h-screen">
        <HeaderMain />
        <main className="flex-1">
          <div className="mx-auto p-4" style={{ touchAction: "pan-y" }}>
            {children}
            <Toaster richColors position="top-center" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
