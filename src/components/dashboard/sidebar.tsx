// components/Sidebar.tsx
"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Grid3X3,
  ArrowRightLeft,
  Coins,
  Waves,
  CircleDot,
  MoreHorizontal,
} from "lucide-react";

interface SidebarItem {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    { id: "home", icon: Home, label: "Home", href: "/dashboard" },
    { id: "overview", icon: Grid3X3, label: "My Overview", href: "/overview" },
    { id: "bridge", icon: ArrowRightLeft, label: "Bridge", href: "/bridge" },
    { id: "stake", icon: CircleDot, label: "Stake", href: "/stake" },
    { id: "swap", icon: ArrowRightLeft, label: "Swap", href: "/swap" },
    {
      id: "liquidity",
      icon: Waves,
      label: "Liquidity Pools",
      href: "/liquidity",
    },
    {
      id: "chakra-pool",
      icon: CircleDot,
      label: "Chakra Pool",
      href: "/chakra-pool",
    },
    { id: "more", icon: MoreHorizontal, label: "More", href: "/more" },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="w-25 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
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
      </nav>
    </div>
  );
};

export default Sidebar;
