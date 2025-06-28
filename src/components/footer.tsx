import Link from "next/link";
import Image from "next/image";

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
    // { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
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
                src="/Logo1.png"
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
                    className="text-base text-gray-400 hover:text-[#F4B448]"
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
                    className="text-base text-gray-400 hover:text-[#F4B448]"
                  >
                    {link.name}
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
                    className="text-base text-gray-400 hover:text-[#F4B448]"
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
              {TestnetTools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-400 hover:text-[#F4B448]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Areal. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="https://x.com/arealchain"
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
              href="https://discord.com/invite/dcYs5dGM"
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
              href="https://www.instagram.com/arealchain/"
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
