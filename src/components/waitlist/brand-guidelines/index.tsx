import Layout from "@/src/components/layout";
import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiStar,
  FiShield,
  FiCopy,
  FiCheck,
  FiX,
  FiArrowUpRight,
  FiArrowDownRight,
  FiArrowDown,
  FiArrowUp,
} from "react-icons/fi";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reusable SectionHeader Component
const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="text-center mb-16 md:mb-20">
    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 relative inline-block">
      {title}
      <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-[#efa638] to-[#f8e276] rounded-full" />
    </h2>
    {subtitle && (
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-8">
        {subtitle}
      </p>
    )}
  </div>
);

// Enhanced ColorCard Component
const ColorCard = ({
  hex,
  name,
  description,
  setCursorHover,
}: {
  hex: string;
  name: string;
  description: string;
  setCursorHover: (hover: boolean) => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="color-card group p-6 bg-gray-900/50 rounded-2xl border border-gray-800 transition-all duration-300 hover:border-[#efa638]/50 hover:shadow-[0_0_20px_rgba(239,166,56,0.2)]"
      onMouseEnter={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
    >
      <div
        className="h-48 rounded-xl mb-6 transition-all duration-500"
        style={{
          backgroundColor: hex,
          border: hex === "#ffffff" ? "1px solid #374151" : "none",
        }}
      />
      <div className="space-y-2">
        <h3 className="text-white font-bold text-xl">{name}</h3>
        <div className="flex items-center space-x-2">
          <p className="text-gray-400 font-mono text-sm">{hex}</p>
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-white transition-colors"
          >
            {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
          </button>
        </div>
        <p className="text-[#efa638] text-sm font-medium pt-1">{description}</p>
      </div>
    </div>
  );
};

// Main Brand Guidelines Page Component
const BrandGuidelines: NextPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const ctx = gsap.context(() => {
      // Hero Parallax Animation
      const hero = document.querySelector(".hero-section");
      if (hero) {
        hero.addEventListener("mousemove", (e: any) => {
          gsap.to(".hero-element", {
            x: (i) => (e.clientX / window.innerWidth - 0.5) * (i + 1) * 25,
            y: (i) => (e.clientY / window.innerHeight - 0.5) * (i + 1) * 25,
            ease: "power2.out",
          });
        });
      }

      // Scroll-triggered animations for sections
      const sections = gsap.utils.toArray("section");
      sections.forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, mainRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  const colorPalette = [
    {
      name: "Primary Orange",
      hex: "#efa638",
      description: "Energy & Innovation",
    },
    {
      name: "Primary Yellow",
      hex: "#f8e276",
      description: "Optimism & Growth",
    },
    { name: "Deep Black", hex: "#000000", description: "Elegance & Power" },
    { name: "Pure White", hex: "#ffffff", description: "Clarity & Simplicity" },
  ];

  const ArealLogo = () => (
    <span className="font-bold text-white tracking-widest text-lg md:text-xl">
      AREAL
    </span>
  );

  return (
    <Layout>
      <div
        ref={mainRef}
        className="bg-black text-white overflow-hidden relative"
      >
        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          className={`fixed top-0 left-0 w-3 h-3 bg-[#efa638] rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out ${
            cursorHover ? "scale-150" : ""
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Background Grid Pattern */}
        <div className="fixed inset-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

          {/* Geometric Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="hero-element absolute top-1/4 left-1/4 w-32 h-32 border-2 border-[#efa638]/20" />
            <div className="hero-element absolute bottom-1/4 right-1/4 w-48 h-48 border-t-2 border-r-2 border-[#f8e276]/20" />
            <p className="hero-element absolute top-[20%] right-[15%] font-mono text-gray-700 text-xl">
              Σ(Areal) = ∞
            </p>
            <p className="hero-element absolute bottom-[15%] left-[10%] font-mono text-gray-700">
              01000001 01010010
            </p>
            <p className="hero-element absolute top-[50%] left-[20%] font-mono text-gray-600 text-sm">
              #efa638
            </p>
          </div>

          <div className="relative z-10 text-center px-4">
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-white via-[#f8e276] to-[#efa638] bg-clip-text text-transparent mb-6 hero-element">
              AREAL
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light hero-element">
              Brand Guidelines & Visual Identity
            </p>
            <p className="font-mono text-lg text-[#efa638]/50 hero-element">
              Prepared by digisailor - Digital Marketing Team
            </p>
          </div>
        </section>

        <main className="px-4 md:px-8 py-24 md:py-32 space-y-32 md:space-y-48 relative z-10">
          {/* Brand Identity */}
          <section>
            <SectionHeader title="Brand Identity" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className="bg-gray-900/50 p-8 rounded-3xl h-full flex flex-col justify-center border border-gray-800 transition-all duration-300 hover:border-[#efa638]/50 hover:shadow-[0_0_25px_rgba(239,166,56,0.2)]"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <h3 className="text-4xl font-bold text-white mb-8">
                  Logo Standards
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-6 bg-green-900/20 rounded-2xl border border-green-500/30">
                    <FiCheck className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-green-400 mb-1">DO</p>
                      <p className="text-gray-300">
                        Only use a white logo on a black background for maximum
                        impact and clarity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-6 bg-red-900/20 rounded-2xl border border-red-500/30">
                    <FiX className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-red-400 mb-1">DON'T</p>
                      <p className="text-gray-300">
                        Use any other color for the logo. Do not alter its
                        colors, dimensions, or apply visual effects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-black flex items-center justify-center rounded-3xl h-96 border border-gray-800 transition-all duration-300 hover:border-[#efa638]/50 hover:shadow-[0_0_25px_rgba(239,166,56,0.2)]"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <span className="text-7xl font-bold text-white tracking-widest">
                  AREAL
                </span>
              </div>
            </div>
          </section>

          {/* Logo Placements */}
          <section>
            <SectionHeader
              title="Logo Placements"
              subtitle="For brand consistency and visual balance, place the logo in approved positions only."
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div
                className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 transition-all duration-300 hover:border-[#efa638]/50 hover:shadow-[0_0_25px_rgba(239,166,56,0.2)]"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Corner Placements
                </h3>
                <div className="relative aspect-video bg-black rounded-xl p-4 flex flex-col justify-between border-2 border-dashed border-gray-700">
                  <div className="flex justify-end">
                    <ArealLogo />
                  </div>
                  <div className="flex justify-end">
                    <ArealLogo />
                  </div>
                  <FiArrowUpRight className="absolute top-4 right-24 text-gray-500" />
                  <FiArrowDownRight className="absolute bottom-4 right-24 text-gray-500" />
                </div>
                <p className="mt-6 text-gray-400">
                  Place the logo in the top-right or bottom-right corner for
                  familiarity.
                </p>
              </div>

              <div
                className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 transition-all duration-300 hover:border-[#efa638]/50 hover:shadow-[0_0_25px_rgba(239,166,56,0.2)]"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Centered Placements
                </h3>
                <div className="relative aspect-video bg-black rounded-xl p-4 flex flex-col justify-between items-center border-2 border-dashed border-gray-700">
                  <ArealLogo />
                  <ArealLogo />
                  <FiArrowUp className="absolute top-4 left-1/2 -translate-x-1/2 text-gray-500" />
                  <FiArrowDown className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500" />
                </div>
                <p className="mt-6 text-gray-400">
                  Alternatively, center it at the top or bottom if it suits the
                  design.
                </p>
              </div>
            </div>
          </section>

          {/* Secondary Logo Placement */}
          <section>
            <SectionHeader title="Secondary Logo Placement" />
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-3xl border border-gray-800 transition-all duration-300 hover:border-[#efa638]/50 hover:shadow-[0_0_25px_rgba(239,166,56,0.2)] text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Partner & Co-Branding
              </h3>
              <div className="relative aspect-video bg-black rounded-xl p-4 border-2 border-dashed border-gray-700">
                <div className="absolute top-4 left-4 text-left">
                  <p className="font-bold text-lg text-[#efa638]">te</p>
                  <p className="text-sm text-gray-400">textexpert</p>
                </div>
                <div className="absolute bottom-4 right-4">
                  <ArealLogo />
                </div>
              </div>
              <p className="mt-6 text-gray-400">
                Always use the top-left corner for a secondary logo to ensure
                clear brand hierarchy.
              </p>
            </div>
          </section>

          {/* Abstract Backgrounds */}
          <section>
            <SectionHeader
              title="Abstract Backgrounds"
              subtitle="The Areal logo is designed to stand out on dynamic and abstract visual fields."
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "bg-[url('https://i.imgur.com/uN1m5G1.jpeg')]",
                "bg-[url('https://i.imgur.com/fSoM3Yv.jpeg')]",
                "bg-[url('https://i.imgur.com/gO0x2sX.jpeg')]",
              ].map((bgClass, i) => (
                <div
                  key={i}
                  className={`relative h-80 rounded-3xl bg-cover bg-center border border-gray-800 flex items-center justify-center p-6 ${bgClass} transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,166,56,0.2)]`}
                >
                  <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
                  <div className="relative z-10">
                    <ArealLogo />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Color Palette */}
          <section>
            <SectionHeader
              title="Color Palette"
              subtitle="Our carefully curated colors evoke emotion and reinforce brand recognition across all designs."
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {colorPalette.map((color) => (
                <ColorCard
                  key={color.hex}
                  {...color}
                  setCursorHover={setCursorHover}
                />
              ))}
            </div>
          </section>

          {/* Typography */}
          <section>
            <SectionHeader
              title="Typography"
              subtitle="The Poppins font family is the exclusive typeface for our brand, ensuring a consistent and modern voice."
            />
            <div className="max-w-5xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 space-y-12 border border-gray-800">
              <div className="text-center">
                <p className="font-bold text-5xl md:text-7xl text-white">
                  Poppins Bold
                </p>
                <p className="text-gray-400 mt-2">Used for Titles.</p>
              </div>
              <div className="text-center">
                <p className="font-light text-3xl md:text-4xl text-gray-200">
                  Poppins Light
                </p>
                <p className="text-gray-400 mt-2">Used for Main Content.</p>
              </div>
              <div className="text-center">
                <p className="font-extralight text-2xl md:text-3xl text-gray-300">
                  Poppins Extra Light
                </p>
                <p className="text-gray-400 mt-2">
                  Used for subtitles and secondary text.
                </p>
              </div>
            </div>
          </section>

          {/* Icon System */}
          <section>
            <SectionHeader
              title="Icon System"
              subtitle="Our icon design is clean and modern. Icons must only use our approved brand colors for consistency."
            />
            <div className="max-w-5xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Icon Colors</h3>
                  <p className="text-gray-400">
                    Icons should be monochromatic, using only White, Black, or
                    the primary Orange.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-6 items-center justify-items-center text-center">
                  <div className="space-y-2">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
                      <FiStar size={32} className="text-black" />
                    </div>
                    <p className="text-sm font-mono text-gray-400">#ffffff</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-20 h-20 bg-black border border-gray-700 rounded-2xl flex items-center justify-center">
                      <FiShield size={32} className="text-white" />
                    </div>
                    <p className="text-sm font-mono text-gray-400">#000000</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-20 h-20 bg-[#efa638] rounded-2xl flex items-center justify-center">
                      <FiMapPin size={32} className="text-white" />
                    </div>
                    <p className="text-sm font-mono text-gray-400">#efa638</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sample Mockups */}
          <section>
            <SectionHeader
              title="Sample Mockups"
              subtitle="How the Areal brand comes to life on various materials and merchandise."
            />
            <div
              className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              {/* Using the actual images from the PDF's mockup page */}
              <img
                src="https://i.imgur.com/k4Tk1gU.jpeg"
                alt="Areal T-Shirt Mockup"
                className="w-full h-full object-cover rounded-3xl transition-all duration-300 hover:scale-105"
              />
              <img
                src="https://i.imgur.com/kEaHkQ1.jpeg"
                alt="Areal Mug Mockup"
                className="w-full h-full object-cover rounded-3xl transition-all duration-300 hover:scale-105"
              />
              <img
                src="https://i.imgur.com/s636C89.jpeg"
                alt="Areal Stationery Mockup"
                className="w-full h-full object-cover rounded-3xl transition-all duration-300 hover:scale-105"
              />
            </div>
          </section>

          {/* Design Layout */}
          <section>
            <SectionHeader
              title="Design Layout"
              subtitle="To ensure consistency, all poster designs must adhere to a standard 1:1 aspect ratio and internal padding."
            />
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800">
                <p className="text-gray-400 text-lg">Poster Ratio</p>
                <p className="text-white font-bold text-6xl md:text-8xl my-2">
                  1:1
                </p>
                <p className="text-gray-400 text-lg">Pixel Dimensions</p>
                <p className="text-white font-bold text-4xl md:text-5xl mt-2">
                  2000 &times; 2000 px
                </p>
              </div>
              <div className="relative aspect-square w-full max-w-md mx-auto bg-black rounded-3xl border-2 border-dashed border-gray-700 p-10 flex items-center justify-center text-center">
                <div className="absolute top-4 right-4 text-gray-500 font-mono">
                  36px
                </div>
                <div className="absolute top-4 left-4 text-gray-500 font-mono">
                  36px
                </div>
                <div className="absolute bottom-4 right-4 text-gray-500 font-mono">
                  36px
                </div>
                <div className="absolute bottom-4 left-4 text-gray-500 font-mono">
                  36px
                </div>
                <div className="w-full h-full border-2 border-[#efa638]/30 rounded-xl flex items-center justify-center">
                  <p className="text-gray-400">
                    Content fits within the 36px safe area.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        {/* <footer className="text-center py-20 border-t border-gray-800/50">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-white via-[#f8e276] to-[#efa638] bg-clip-text text-transparent inline-block">
            AREAL
          </h3>
          <p className="text-gray-500 mt-2">Simplicity Meets Security.</p>
          <a
            href="http://www.arealchain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 mt-4 inline-block hover:text-[#efa638] transition-colors"
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            www.arealchain.com
          </a>
        </footer> */}
      </div>
    </Layout>
  );
};

export default BrandGuidelines;
