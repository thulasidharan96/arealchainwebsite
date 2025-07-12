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
    title: "Research & Development",
    description:
      "One year intensive R&D phase initiated to build the foundational technology for tokenizing real-world assets.",
    features: ["Foundational Tech", "Asset Tokenization", "Intensive R&D"],
  },
  {
    quarter: "Q4 2023",
    status: "completed",
    title: "Conceptualization & Prototyping",
    description:
      "Core concepts refined and a functional prototype developed to validate our innovative approach.",
    features: [
      "Core Concepts",
      "Functional Prototype",
      "Innovation Validation",
    ],
  },
  {
    quarter: "Q1 2024",
    status: "completed",
    title: "Private Investor Funding Secured",
    description:
      "Successfully closed a significant funding round from key private investors, securing our development runway.",
    features: ["Private Funding", "Development Runway", "Key Investors"],
  },
  {
    quarter: "Q2 2024",
    status: "completed",
    title: "Board of Directors Established",
    description:
      "Assembled a comprehensive board of directors with deep expertise in real estate, finance, and blockchain.",
    features: [
      "Board Formation",
      "Real Estate Expertise",
      "Blockchain Leadership",
    ],
  },
  {
    quarter: "Q3 2024",
    status: "completed",
    title: "Featured in Major News Channels",
    description:
      "Gained significant media traction, with features in several prominent financial and tech news outlets.",
    features: ["Media Coverage", "Financial News", "Tech Features"],
  },
  {
    quarter: "Q3 2024",
    status: "completed",
    title: "Showcased at Crypto Expo Dubai",
    description:
      "Successfully presented Areal's vision and technology at one of the world's leading crypto events, generating high interest.",
    features: ["Crypto Expo", "Vision Presentation", "High Interest"],
  },
  {
    quarter: "Q4 2024",
    status: "in-progress",
    title: "Platform Alpha Launch",
    description:
      "Rolling out an exclusive alpha version of the platform to our early investors and partners for feedback.",
    features: ["Alpha Release", "Early Access", "Partner Feedback"],
  },
  {
    quarter: "Q4 2024",
    status: "in-progress",
    title: "Global Marketing Campaign Kick-off",
    description:
      "Initiating a multi-channel marketing campaign to build global awareness ahead of our public launch.",
    features: ["Global Campaign", "Multi-channel", "Awareness Building"],
  },
  {
    quarter: "Q1 2025",
    status: "upcoming",
    title: "Public Platform Launch (V1.0)",
    description:
      "The official public launch of the Areal platform, opening up real-world asset tokenization to everyone.",
    features: ["Public Launch", "Global Access", "Tokenization for All"],
  },
  {
    quarter: "Q1 2025",
    status: "upcoming",
    title: "First RWA Listing",
    description:
      "Onboarding and listing the very first tokenized real-world asset on the Areal platform.",
    features: ["First Listing", "Asset Onboarding", "RWA Token"],
  },
  {
    quarter: "Q2 2025",
    status: "upcoming",
    title: "Areal Marketplace Launch",
    description:
      "Introducing a secondary marketplace for the peer-to-peer trading of tokenized assets, boosting liquidity.",
    features: ["Secondary Market", "P2P Trading", "Liquidity Boost"],
  },
  {
    quarter: "Q2 2025",
    status: "upcoming",
    title: "ArealPay Integration",
    description:
      "Launch of our native payment solution to streamline transactions within the ecosystem.",
    features: [
      "Native Payments",
      "Streamlined Transactions",
      "Ecosystem Integration",
    ],
  },
  {
    quarter: "Q3 2025",
    status: "upcoming",
    title: "Mobile App Release (iOS & Android)",
    description:
      "Bringing the full power of the Areal platform to your fingertips with dedicated mobile applications.",
    features: ["Mobile App", "iOS & Android", "Full Platform Access"],
  },
  {
    quarter: "Q4 2025",
    status: "upcoming",
    title: "Expansion into New Asset Classes",
    description:
      "Expanding beyond real estate to include tokenization of other valuable real-world assets like art and commodities.",
    features: ["New Asset Classes", "Art Tokenization", "Commodity Expansion"],
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
