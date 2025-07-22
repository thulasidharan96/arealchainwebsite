"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "../lib/utils";
import CustomButton from "./custom-button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const arealSuiteItems = [
    { name: "About  ", href: "/areal-suite" },
    { name: "Launchpad", href: "/areal-suite/launchpad" },
    { name: "Areal Marketplace", href: "/areal-suite/marketplace" },
    { name: "Areal TaaS", href: "/areal-suite/taas" },
    { name: "ArealPay", href: "/areal-suite/pay" },
    { name: "Areal Mortgage", href: "/areal-suite/mortgage" },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return router.pathname === path;
    }
    return router.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#171717]/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Logo1.avif"
              alt="Areal Logo"
              width={150}
              height={150}
              priority
              sizes="(max-width: 768px) 40px, 50px"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/", true)
                  ? "text-[#F4B448]"
                  : "text-gray-300 hover:text-[#F4B448]"
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center text-sm font-medium transition-colors outline-none",
                  isActive("/areal-suite")
                    ? "text-[#F4B448]"
                    : "text-gray-300 hover:text-[#F4B448]"
                )}
              >
                Areal Suite
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
                {arealSuiteItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className="hover:!bg-[#F4B448]/20 hover:!text-[#F4B448] focus:!bg-[#F4B448]/20 focus:!text-[#F4B448] cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/company"
              className={`text-sm font-medium transition-colors ${
                isActive("/company")
                  ? "text-[#F4B448]"
                  : "text-gray-300 hover:text-[#F4B448]"
              }`}
            >
              Company
            </Link>
            <Link
              href="/roadmap"
              className={`text-sm font-medium transition-colors ${
                isActive("/roadmap")
                  ? "text-[#F4B448]"
                  : "text-gray-300 hover:text-[#F4B448]"
              }`}
            >
              Roadmap
            </Link>
            <Link
              href="/whitepaper"
              className={`text-sm font-medium transition-colors ${
                isActive("/whitepaper")
                  ? "text-[#F4B448]"
                  : "text-gray-300 hover:text-[#F4B448]"
              }`}
            >
              Whitepaper
            </Link>
            <Link
              href="/announcement"
              className={`text-sm font-medium transition-colors ${
                isActive("/announcement")
                  ? "text-[#F4B448]"
                  : "text-gray-300 hover:text-[#F4B448]"
              }`}
            >
              Announcements
            </Link>
            <Link
              href="/vip-member"
              className={`text-sm font-medium transition-colors ${
                isActive("/vip-member")
                  ? "text-[#F4B448]"
                  : "text-gray-300 hover:text-[#F4B448]"
              }`}
            >
              VIP Member
            </Link>
            {/* <Link
              href="/blog"
              className={`text-sm font-medium transition-colors ${
                isActive("/blog")
                  ? "text-[#F4B448]"
                  : "text-gray-300 hover:text-[#F4B448]"
              }`}
            >
              Blog
            </Link> */}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => router.push("/login")}
              className="text-black font-semibold px-6 py-2 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Login →
            </Button>
            {/* <CustomButton /> */}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-[#F4B448]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-[#F4B448] font-medium"
              >
                Home
              </Link>
              <div>
                <p className="font-medium text-[#F4B448]">Areal Suite</p>
                <div className="flex flex-col space-y-2 mt-2 pl-4">
                  {arealSuiteItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-[#F4B448]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/company"
                className="text-gray-300 hover:text-[#F4B448] font-medium"
              >
                Company
              </Link>
              <Link
                href="/roadmap"
                className="text-gray-300 hover:text-[#F4B448] font-medium"
              >
                Roadmap
              </Link>
              <Link
                href="/vip-member"
                className="text-gray-300 hover:text-[#F4B448] font-medium"
              >
                VIP Member
              </Link>
              {/* <Link
                  href="/blog"
                  className="text-gray-300 hover:text-[#F4B448] font-medium"
                >
                  Blog
                </Link> */}
              <Link
                href="/contact"
                className="text-gray-300 hover:text-[#F4B448] font-medium"
              >
                Contact
              </Link>
              <Button
                onClick={() => router.push("/login")}
                className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold w-fit"
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
