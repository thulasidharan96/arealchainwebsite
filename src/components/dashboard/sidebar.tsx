"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, LogOut } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { LogoutModal } from "@/src/components/logoutModel";

interface SidebarItem {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const sidebarItems: SidebarItem[] = [
    { id: "home", icon: Home, label: "Home", href: "/dashboard" },
    { id: "buy", icon: Grid3X3, label: "BUY", href: "/buy" },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout completed");
    // Clear user store, tokens, etc.
    // Redirect to login page
    router.push("/login");
  };

  return (
    <>
      <div className="w-20 lg:w-[74px] py-2 flex flex-col items-center bg-gray-900 border-gray-800 border-2 static overflow-hidden">
        {/* Logo */}
        <div className="mb-4">
          <div className="w-14 h-14 flex items-center justify-center">
            <Image src="/coin/coin.png" alt="Logo" width={100} height={100} />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#F4B448]/40"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs text-center leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors text-gray-400 hover:text-white hover:bg-red-500/40"
          >
            <LogOut size={20} />
            <span className="text-xs text-center leading-tight">Logout</span>
          </button>
        </nav>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;
