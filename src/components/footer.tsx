import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const TestnetTools = [
    {
      name: "AREAL Testnet Validator App",
      href: "https://validator.testnet.arealscan.com/blocks",
    },
    {
      name: "AREAL Testnet Delegator App",
      href: "https://delegator.testnet.arealscan.com/blocks",
    },
    {
      name: "AREAL Testnet Explorer",
      href: "https://testnet.arealscan.com/dashboard",
    },
  ];

  const productLinks = [
    { name: "Areal TaaS", href: "/areal-suite/taas" },
    { name: "Areal Mortgage", href: "/areal-suite/mortgage" },
    { name: "Launchpad", href: "/areal-suite/launchpad" },
    { name: "ArealPay", href: "/areal-suite/pay" },
    { name: "Areal Marketplace", href: "/areal-suite/marketplace" },
  ];
  const companyLinks = [
    { name: "About Us", href: "/company" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Partner", href: "/#partners" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ'S", href: "/faqs" },
    { name: "Brand Guidelines", href: "/brand-guidelines" },
  ];
  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-and-conditions" },
  ];

  return (
    <footer className="relative z-50 bg-[#171717] backdrop-blur-md border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/Logo1.avif"
                alt="Areal Logo"
                width={120}
                height={40}
              />
            </Link>
            <p className="text-gray-400 text-sm">
              The Layer-1 Blockchain for tokenizing and democratizing Real World
              Assets.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Products
            </h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#F4B448]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#F4B448]"
                  >
                    {link.name}
                    {link.name === "Brand Guidelines" && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#F4B448]/20 text-[#F4B448] border border-[#F4B448]/30">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#F4B448]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Testnet Viewer
            </h3>
            <ul className="mt-4 space-y-2">
              {TestnetTools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#F4B448]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className="w-full">
          <div className="w-ful mx-auto flex justify-end">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="w-full sm:w-2/3">
                <Label
                  htmlFor="newsletter-email"
                  className="text-white font-medium mb-2 block"
                >
                  Subscribe to Our Newsletter{" "}
                  <span className="text-[#F4B448]">*</span>
                </Label>
                <div className="relative max-w-md">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] rounded-md w-full"
                  />
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <Button className="bg-[#F4B448] hover:bg-[#e0a93a] text-black font-semibold px-6 py-2 mt-2 sm:mt-0 w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="mt-4 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Areal. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="https://x.com/arealnow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">X</span>
              <Image
                src="/socialmedia/x.svg"
                alt="X Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.youtube.com/@ArealChain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">YOUTUBE</span>
              <Image
                src="/socialmedia/youtube.svg"
                alt="X Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://discord.gg/ZgVMbBYy7n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">DISCORD</span>
              <Image
                src="/socialmedia/discord.svg"
                alt="X Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.facebook.com/ArealChain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">FACEBOOK</span>
              <Image
                src="/socialmedia/facebook.svg"
                alt="X Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.instagram.com/arealnow/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">INSTAGRAM</span>
              <Image
                src="/socialmedia/insta.svg"
                alt="X Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/arealchain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">LINKEDIN</span>
              <Image
                src="/socialmedia/linkedin.svg"
                alt="X Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://t.me/arealnow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">TELEGRAM</span>
              <Image
                src="/socialmedia/telegram.svg"
                alt="X Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
