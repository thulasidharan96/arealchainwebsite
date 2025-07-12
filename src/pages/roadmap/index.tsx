"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react";
import { CheckCircle2, Loader2, Circle, Zap, Star } from "lucide-react";
import Layout from "@/src/components/layout";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { FloatingParticles } from "@/src/components/FloatingParticles";

// GSAP imports (these would normally be from CDN)
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

interface Milestone {
  quarter: string;
  status: "completed" | "in-progress" | "upcoming";
  title: string;
  description: string;
  features?: string[]; // Added back features as per original roadmapData structure
}

const roadmapData: Milestone[] = [
  {
    quarter: "Q3 2023",
    status: "completed",
    title: "Blockchain Architecture & Consensus Mechanism Development",
    description:
      "Development of a robust PoS consensus mechanism, modular architecture, and interoperability for seamless asset transfer.",
    features: ["PoS Consensus", "Interoperability", "Modular Architecture"],
  },
  {
    quarter: "Q4 2023",
    status: "completed",
    title: "Smart Contract & Tokenization Protocol Development",
    description:
      "Advanced smart contracts with ERC-721, ERC-1155, and ERC-20 standards; Oracle integration for real-world asset pricing.",
    features: ["ERC Standards", "Asset-backed Tokens", "Oracle Integration"],
  },
  {
    quarter: "Q1 2024",
    status: "completed",
    title: "Private Investor Funding Secured",
    description:
      "Series A funding round closed to expand technical infrastructure and developer ecosystem.",
    features: [
      "Series A Funding",
      "Infrastructure Expansion",
      "Developer Ecosystem",
    ],
  },
  {
    quarter: "Q2 2024",
    status: "completed",
    title: "Governance Framework & DAO Design",
    description:
      "DAO integration with smart governance contracts to manage staking, voting, and proposals.",
    features: ["DAO Integration", "Smart Governance", "Staking Mechanisms"],
  },
  {
    quarter: "Q3 2024",
    status: "completed",
    title: "Testnet Launch (V1.0)",
    description:
      "Launch of Areal Chain Testnet with PoS validators, real asset tokenization trials, and cross-chain IBC support.",
    features: ["Testnet V1.0", "PoS Validators", "Cross-chain IBC"],
  },
  {
    quarter: "Q3 2024",
    status: "completed",
    title: "Institutional Onboarding & Strategic Partnerships",
    description:
      "Partnerships secured with real estate developers and DeFi protocols for RWA adoption.",
    features: [
      "Institutional Partnerships",
      "DeFi Integration",
      "RWA Adoption",
    ],
  },
  {
    quarter: "Q4 2024",
    status: "in-progress",
    title: "Enhanced Asset Class Expansion",
    description:
      "Expansion into luxury, IP, metals, and carbon credits. Launch of Areal NFT Marketplace and ArealPay.",
    features: ["Asset Class Expansion", "NFT Marketplace", "ArealPay Launch"],
  },
  {
    quarter: "Q4 2024",
    status: "in-progress",
    title: "Governance and DAO Model Rollout",
    description:
      "Deployment of DAO model with automated KYC/AML and full regulatory compliance.",
    features: ["DAO Rollout", "Regulatory Compliance", "Automated KYC/AML"],
  },
  {
    quarter: "Q1 2025",
    status: "upcoming",
    title: "Public Platform Launch (V1.0)",
    description:
      "Launch of Areal Chain Mainnet with sharding and dynamic fee structures.",
    features: ["Mainnet Launch", "Sharding", "Gasless Transactions"],
  },
  {
    quarter: "Q1 2025",
    status: "upcoming",
    title: "First Real-World Asset (RWA) Tokenization",
    description:
      "Initial tokenization and trading of real estate and commodity-backed assets.",
    features: ["First RWA", "Token Trading", "Commodity Backing"],
  },
  {
    quarter: "Q2 2025",
    status: "upcoming",
    title: "ArealPay Integration for Tokenized Transactions",
    description:
      "Deployment of ArealPay with escrow, fiat conversion, and smart contract settlements.",
    features: ["Escrow Services", "Fiat Integration", "Smart Settlements"],
  },
  {
    quarter: "Q3 2025",
    status: "upcoming",
    title: "Decentralized Identity (DID) Integration",
    description:
      "Launch of DID system with zk-SNARKs, privacy compliance, and multi-sig wallets.",
    features: ["DID Protocol", "zk-SNARKs Privacy", "Multi-sig Wallets"],
  },
  {
    quarter: "Q4 2025",
    status: "upcoming",
    title: "Web3 Asset Management & UI Revamp",
    description:
      "Decentralized Web3 interface for asset management with analytics and improved UI/UX.",
    features: ["Web3 Tools", "Asset Analytics", "UI/UX Overhaul"],
  },
  {
    quarter: "Q1 2026",
    status: "upcoming",
    title: "AI & ML Integration for Asset Valuation",
    description:
      "AI-driven valuation models and NLP-powered smart contracts for ease of access.",
    features: ["AI Valuation", "ML Predictions", "NLP Contracts"],
  },
  {
    quarter: "Q2 2026",
    status: "upcoming",
    title: "Real-Time Cross-Chain Asset Transfer",
    description:
      "Optimized atomic swaps, bridges, and liquidity pools across major blockchain ecosystems.",
    features: ["Atomic Swaps", "Blockchain Bridges", "Cross-chain Liquidity"],
  },
  {
    quarter: "Q3 2026",
    status: "upcoming",
    title: "Tokenization of Carbon Credits & Water Rights",
    description:
      "Marketplace launch for environmental assets with ESG compliance and partner collaboration.",
    features: ["Carbon Credits", "Water Rights", "ESG Integration"],
  },
  {
    quarter: "Q4 2026",
    status: "upcoming",
    title: "Universal Areal Identity (uID) for Global Compliance",
    description:
      "Launch of uID for global KYC/AML sync, Layer 2 scaling, and multi-currency support.",
    features: ["uID Launch", "Layer 2 Scaling", "Multi-currency Support"],
  },
];


const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-green-400",
    bgColor: "bg-green-500",
    cardBorder: "border-green-500/30",
    cardBg: "bg-green-500/10",
    shadow: "shadow-green-500/20",
  },
  "in-progress": {
    icon: Loader2,
    color: "text-[#F4B448]",
    bgColor: "bg-[#F4B448]",
    cardBorder: "border-[#F4B448]/30",
    cardBg: "bg-[#F4B448]/10",
    shadow: "shadow-[#F4B448]/20",
  },
  upcoming: {
    icon: Circle,
    color: "text-gray-500",
    bgColor: "bg-gray-500",
    cardBorder: "border-gray-500/30",
    cardBg: "bg-gray-500/10",
    shadow: "shadow-gray-500/20",
  },
};

interface GSAPAnimatedComponentProps {
  gsapLoaded: boolean;
}

const MilestoneCard = ({ milestone }: { milestone: Milestone }) => {
  const config = statusConfig[milestone.status];
  return (
    <div
      className={cn(
        "p-6 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-2 w-72 h-fit",
        config.cardBorder,
        config.cardBg,
        `hover:shadow-lg ${config.shadow}`
      )}
    >
      <p className="text-sm font-semibold text-gray-400 mb-2">
        {milestone.quarter}
      </p>
      <h3 className={cn("font-bold text-white mb-2 text-lg", config.color)}>
        {milestone.title}
      </h3>
      <p className="text-sm text-gray-300 leading-relaxed">
        {milestone.description}
      </p>
    </div>
  );
};

interface AsteriskAnimationProps extends GSAPAnimatedComponentProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const AsteriskAnimation = ({
  gsapLoaded,
  scrollContainerRef,
}: AsteriskAnimationProps) => {
  const asteriskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsapLoaded || !asteriskRef.current || !scrollContainerRef.current)
      return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const asterisks = gsap.utils.toArray(
      asteriskRef.current.querySelectorAll(".asterisk")
    );

    // Kill any existing ScrollTriggers for asterisks to prevent duplicates
    ScrollTrigger.getAll().forEach((st: any) => {
      if (
        st.trigger === scrollContainerRef.current &&
        st.vars.id === "asterisk-animation"
      ) {
        st.kill();
      }
    });

    gsap.set(asterisks, { opacity: 0, scale: 0 }); // Ensure initial state is hidden

    const tl = gsap.timeline({ paused: true }); // Create a paused timeline
    asterisks.forEach((asterisk: Element, index: number) => {
      tl.to(
        asterisk,
        {
          opacity: 1,
          scale: 1,
          rotation: 360,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        index * 0.05 // Stagger the appearance
      );
    });

    // Create ScrollTrigger to link timeline to horizontal scroll
    const asteriskST = ScrollTrigger.create({
      id: "asterisk-animation", // Give it an ID for easier killing
      trigger: scrollContainerRef.current,
      horizontal: true, // Listen to horizontal scroll
      scrub: true, // Link timeline progress to scroll progress
      start: "left left", // Start when the left edge of the scrollable content hits the left edge of its container
      end: "right right", // End when the right edge of the scrollable content hits the right edge of its container
      animation: tl, // Link this timeline to the ScrollTrigger
      // markers: true, // Uncomment for debugging
    });

    return () => {
      asteriskST.kill(); // Clean up ScrollTrigger on unmount
    };
  }, [gsapLoaded, scrollContainerRef]); // Depend on gsapLoaded and scrollContainerRef

  return (
    <div ref={asteriskRef} className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 20 }).map((_, index) => (
        <Star
          key={index}
          className={`asterisk absolute w-4 h-4 text-amber-400`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function HorizontalRoadmap() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineInnerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Load GSAP and ScrollTrigger
  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window === "undefined") return;

      if (!window.gsap) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.onload = () => {
          const scrollTriggerScript = document.createElement("script");
          scrollTriggerScript.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
          scrollTriggerScript.onload = () => {
            if (window.gsap && window.ScrollTrigger) {
              window.gsap.registerPlugin(window.ScrollTrigger);
              setGsapLoaded(true);
            }
          };
          document.head.appendChild(scrollTriggerScript);
        };
        document.head.appendChild(script);
      } else {
        setGsapLoaded(true);
      }
    };
    loadGSAP();
  }, []);

  // Manual horizontal scrolling using mouse wheel
  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault(); // Prevent vertical page scroll
      element.scrollTo({
        left: element.scrollLeft + e.deltaY,
        behavior: "auto", // or 'smooth' for smoother scroll
      });
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Manual horizontal scrolling using drag
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const ele = scrollContainerRef.current;
    if (!ele) return;
    setIsDragging(true);
    setStartX(e.pageX - ele.offsetLeft);
    setScrollLeft(ele.scrollLeft);
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
      scrollContainerRef.current.style.removeProperty("user-select");
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // multiplier for faster scrolling
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;

    // Update progress line on drag
    updateProgressLine();
  };

  // Update progress line based on scroll position
  const updateProgressLine = () => {
    const scrollContainer = scrollContainerRef.current;
    const progressLine = progressLineRef.current;
    const timelineInner = timelineInnerRef.current;

    if (scrollContainer && progressLine && timelineInner) {
      const scrollWidth =
        timelineInner.scrollWidth - scrollContainer.offsetWidth;
      if (scrollWidth > 0) {
        const scrollProgress = scrollContainer.scrollLeft / scrollWidth;
        progressLine.style.transform = `scaleX(${scrollProgress})`;
      } else {
        progressLine.style.transform = "scaleX(0)"; // No scroll needed, hide progress
      }
    }
  };

  // Effect to update progress line on scroll (for wheel/programmatic scroll)
  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const handleScroll = () => {
      updateProgressLine();
    };

    element.addEventListener("scroll", handleScroll);
    // Initial update
    updateProgressLine();

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  type TimelineItem =
    | { type: "year"; year: string }
    | { type: "milestone"; data: Milestone };

  const timelineItems: TimelineItem[] = [];
  let currentYear: string | null = null;

  roadmapData.forEach((milestone) => {
    const year = milestone.quarter.split(" ")[1];
    if (year !== currentYear) {
      currentYear = year;
      timelineItems.push({ type: "year", year });
    }
    timelineItems.push({ type: "milestone", data: milestone });
  });

  // Calculate dynamic width for the timelineInner to ensure all content fits
  const calculateTimelineInnerWidth = () => {
    let totalWidth = 0;
    timelineItems.forEach((item) => {
      if (item.type === "year") {
        totalWidth += 112 + 32; // w-28 + mx-4 * 2
      } else {
        totalWidth += 320; // w-80
      }
    });
    // Add horizontal padding from the scrollContainerInner
    totalWidth += 2 * 80; // px-20 = 80px on each side

    return `${totalWidth}px`;
  };

  let milestoneCounter = 0;

  return (
    <Layout>
      <div className="min-h-screen bg-transparent overflow-x-hidden">
        <FloatingParticles />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-[#F4B448]/20 text-[#F4B448] border-[#F4B448]/30 hover:bg-[#F4B448]/30 transition-colors">
                <Zap className="w-4 h-4 mr-2" />
                Our Path Forward
              </Badge>
              <h1 className="text-5xl font-bold text-white mb-6">
                Development Roadmap
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Our journey to revolutionize real estate through blockchain
                technology. Use your scroll wheel or drag to explore our
                progress.
              </p>
            </div>
          </div>
        </div>

        {/* Outer container for horizontal scroll (h-screen for visible area) */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar w-full overflow-x-auto cursor-grab relative p-8"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* Asterisk Animation - now receives scrollContainerRef */}
          {scrollContainerRef.current && (
            <AsteriskAnimation
              gsapLoaded={gsapLoaded}
              scrollContainerRef={
                scrollContainerRef as React.RefObject<HTMLDivElement>
              }
            />
          )}

          {/* Main horizontal timeline content - increased height for visibility */}
          <div
            ref={timelineInnerRef}
            className="relative inline-flex items-center h-[650px] py-10 px-20" // Adjusted height and padding
            style={{ width: calculateTimelineInnerWidth() }} // Dynamic width for content
          >
            {/* Horizontal timeline line (static background) */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 -translate-y-1/2">
              {/* Animated progress fill for the global line */}
              <div
                ref={progressLineRef}
                className="h-full bg-gradient-to-r from-green-500 via-[#F4B448] to-gray-500 origin-left scale-x-0 transition-transform duration-75 ease-out"
              />
            </div>

            {/* Individual timeline items (year markers and milestones) */}
            {timelineItems.map((item, index) => {
              if (item.type === "year") {
                return (
                  <div
                    key={`year-${item.year}-${index}`}
                    className="relative flex-shrink-0 w-28 h-full flex flex-col items-center justify-center z-10 mx-4"
                  >
                    {/* Dot on the timeline for the year */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-700 ring-8 ring-gray-900"></div>
                    {/* Year text */}
                    <div className="absolute bottom-[calc(50%+6rem)] bg-[#F4B448] text-black font-bold text-xl px-4 py-1 rounded-lg shadow-lg shadow-[#F4B448]/20">
                      {item.year}
                    </div>
                  </div>
                );
              }

              milestoneCounter++;
              const milestone = item.data;
              const config = statusConfig[milestone.status];
              const isAbove = milestoneCounter % 2 !== 0; // Alternate card position

              return (
                <div
                  key={`milestone-${index}`}
                  className="relative flex-shrink-0 w-80 h-full flex flex-col items-center justify-center"
                >
                  {/* Milestone dot */}
                  <div
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-20 ring-8 ring-gray-900",
                      config.bgColor
                    )}
                  >
                    <config.icon
                      className={cn(
                        "w-5 h-5 text-gray-900",
                        milestone.status === "in-progress" && "animate-spin"
                      )}
                    />
                  </div>
                  {/* Milestone card */}
                  <div
                    className={cn(
                      "absolute",
                      isAbove
                        ? "bottom-[calc(50%+2.5rem)]"
                        : "top-[calc(50%+2.5rem)]" // Adjusted spacing
                    )}
                  >
                    <MilestoneCard milestone={milestone} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
