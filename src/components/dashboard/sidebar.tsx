"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, LogOut, Menu, X, User } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems: SidebarItem[] = [
    { id: "home", icon: Home, label: "Home", href: "/dashboard" },
    { id: "buy", icon: Grid3X3, label: "BUY", href: "/buy" },
    { id: "profile", icon: User, label: "Profile", href: "/profile" },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout completed");
    // Clear user store, tokens, etc.
    // Redirect to login page
    router.push("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-[9999] p-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors shadow-lg border border-gray-700"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[10]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on desktop, slide-in on mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-20 lg:w-[74px] py-2 flex flex-col items-center bg-gray-900 border-gray-800 border-r-2 z-[9999] transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="mb-6 mt-4 lg:mt-2">
          <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center">
            <Image
              src="/coin/coin.avif"
              alt="Logo"
              width={48}
              height={48}
              className="w-10 h-10 lg:w-12 lg:h-12"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-4 lg:space-y-6 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors w-full min-h-[60px] justify-center ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#F4B448]/40"
                }`}
                style={{ touchAction: "manipulation" }}
              >
                <Icon size={18} />
                <span className="text-xs text-center leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mb-4">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors text-gray-400 hover:text-white hover:bg-red-500/40 w-full min-h-[60px] justify-center"
            style={{ touchAction: "manipulation" }}
          >
            <LogOut size={18} />
            <span className="text-xs text-center leading-tight">Logout</span>
          </button>
        </div>
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
