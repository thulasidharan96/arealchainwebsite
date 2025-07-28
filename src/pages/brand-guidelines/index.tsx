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
  FiDownload,
} from "react-icons/fi";
import Image from "next/image";

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
    <Image src="/coin/areal.png" alt="Areal Logo" width={100} height={100} />
  );

  const AbstractBackgrounds = [
    {
      name: "BG1",
      src: "/Backgrounds/bg1.jpg",
      logo: "/Backgrounds/bg1.jpg",
    },
    {
      name: "BG2",
      src: "/Backgrounds/bg2.jpg",
      logo: "/Backgrounds/bg2.jpg",
    },
    {
      name: "BG3",
      src: "/Backgrounds/bg3.jpg",
      logo: "/Backgrounds/bg3.jpg",
    },
    {
      name: "BG4",
      src: "/Backgrounds/bg4.jpg",
      logo: "/Backgrounds/bg4.jpg",
    },
  ];

  return (
    <Layout>
      <div
        ref={mainRef}
        className="bg-black text-white overflow-hidden relative"
      >
        {/* Custom Cursor */}
        {/* <div
          ref={cursorRef}
          className={`fixed top-0 left-0 w-3 h-3 bg-[#efa638] rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out ${
            cursorHover ? "scale-150" : ""
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        /> */}

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
                  <div className="flex justify-start">
                    <span className="text-xs font-light text-white tracking-widest">
                      www.arealchain.com
                    </span>
                  </div>
                  {/* <FiArrowUpRight className="absolute top-4 right-24 text-gray-500" />
                  <FiArrowDownRight className="absolute bottom-4 right-24 text-gray-500" /> */}
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
                  <span className="text-xs font-light text-white tracking-widest">
                    www.arealchain.com
                  </span>
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

          {/* Download Logo Assets */}
          <section>
            <SectionHeader
              title="Download Logo Assets"
              subtitle="Get access to all official Areal logos in high-resolution formats. Use responsibly and in accordance with the brand guidelines."
            />
            <div className="max-w-4xl mx-auto text-center">
              <a
                href="/areal-logo-pack.zip"
                download
                className="inline-flex items-center px-6 py-3 bg-[#efa638] text-black font-bold rounded-xl shadow hover:bg-[#f8e276] transition-all duration-300"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <FiDownload className="mr-2" /> Download Logo Pack (.zip)
              </a>
              <p className="text-sm text-gray-400 mt-4">
                Includes PNG, SVG, and EPS formats — optimized for print and
                digital use.
              </p>
            </div>
          </section>

          {/* Abstract Backgrounds */}
          <section>
            <SectionHeader
              title="Abstract Backgrounds"
              subtitle="The Areal logo is designed to stand out on dynamic and abstract visual fields."
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {AbstractBackgrounds.map((item, i) => (
                <div
                  key={i}
                  className="relative h-80 rounded-3xl border border-gray-800 overflow-hidden group transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,166,56,0.2)]"
                  style={{
                    backgroundImage: `url(${item.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/50 rounded-3xl" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <ArealLogo />
                    <a
                      href={item.logo}
                      download
                      className="mt-4 px-4 py-2 text-sm bg-white/10 text-white border border-white rounded-xl hover:bg-white/20 transition"
                    >
                      Download Logo
                    </a>
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

          {/* Icon Design & Theme */}
          <section>
            <SectionHeader
              title="Icon Design & Theme"
              subtitle="Our icon design is clean and modern with specific categories for different use cases."
            />
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Icon Colors Section */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      Icon Colors
                    </h3>
                    <p className="text-gray-400">
                      Only use these three colors for icons to maintain brand
                      consistency.
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

              {/* Address Icons Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Address Icons
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-[#efa638] rounded-xl flex items-center justify-center">
                        <FiMapPin size={24} className="text-white" />
                      </div>
                      <p className="text-sm text-gray-400">Location</p>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-black"
                        >
                          <path
                            d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Email</p>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-black border border-gray-700 rounded-xl flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-white"
                        >
                          <path
                            d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09536 3.90347 2.12816 3.62476 2.21692 3.36162C2.30568 3.09849 2.44802 2.85669 2.63482 2.65162C2.82162 2.44655 3.04974 2.28271 3.30372 2.17052C3.55771 2.05833 3.83227 2.00026 4.10999 2H7.10999C7.59334 1.99522 8.06307 2.16708 8.43099 2.48353C8.79891 2.79999 9.04085 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Phone</p>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-[#efa638] rounded-xl flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-white"
                        >
                          <path
                            d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Address</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Icons Section */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Social Media Icons
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                        <FiTwitter size={24} className="text-black" />
                      </div>
                      <p className="text-sm text-gray-400">Twitter</p>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-[#efa638] rounded-xl flex items-center justify-center">
                        <FiLinkedin size={24} className="text-white" />
                      </div>
                      <p className="text-sm text-gray-400">LinkedIn</p>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-black border border-gray-700 rounded-xl flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-white"
                        >
                          <path
                            d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Facebook</p>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-black"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M17.5 6.5H17.51"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Instagram</p>
                    </div>
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
              {/* Sample mockup placeholders */}
              <div className="relative h-80 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <Image
                    src="/mockups/t-shirt.png"
                    alt="Sample Mockup"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="relative h-80 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <Image
                    src="/mockups/mug.png"
                    alt="Sample Mockup"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="relative h-80 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <Image
                  src="/mockups/Stationery.png"
                  alt="Sample Mockup"
                  width={300}
                  height={300}
                />
              </div>
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
                <div className="absolute top-4 right-4 text-gray-500 font-mono text-sm">
                  36px
                </div>
                <div className="absolute top-4 left-4 text-gray-500 font-mono text-sm">
                  36px
                </div>
                <div className="absolute bottom-4 right-4 text-gray-500 font-mono text-sm">
                  36px
                </div>
                <div className="absolute bottom-4 left-4 text-gray-500 font-mono text-sm">
                  36px
                </div>
                <div className="w-full h-full border-2 border-[#efa638]/30 rounded-xl flex items-center justify-center">
                  <p className="text-gray-400 text-sm">
                    Content fits within the 36px safe area.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section>
            <SectionHeader
              title="Usage Guidelines"
              subtitle="Essential rules to maintain brand integrity across all applications."
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Brand Voice
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#efa638]/10 rounded-xl border border-[#efa638]/20">
                    <h4 className="font-bold text-[#efa638] mb-2">
                      Professional
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Maintain a professional tone in all communications.
                    </p>
                  </div>
                  <div className="p-4 bg-[#f8e276]/10 rounded-xl border border-[#f8e276]/20">
                    <h4 className="font-bold text-[#f8e276] mb-2">
                      Innovative
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Emphasize cutting-edge technology and forward-thinking
                      solutions.
                    </p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <h4 className="font-bold text-white mb-2">Accessible</h4>
                    <p className="text-gray-300 text-sm">
                      Make complex concepts simple and understandable.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Application Rules
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-sm">
                      Always maintain minimum clear space around the logo
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-sm">
                      Use approved color combinations only
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-sm">
                      Ensure sufficient contrast for readability
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiX className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-sm">
                      Never stretch, skew, or distort the logo
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiX className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-sm">
                      Avoid placing logo on busy backgrounds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default BrandGuidelines;
