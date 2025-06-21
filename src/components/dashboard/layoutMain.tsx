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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex">
      <BlobAnimation />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderMain />
        <main className="flex-1">
          <div className="mx-auto rounded-l-lg">
            {children}
            <Toaster richColors position="top-center" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
