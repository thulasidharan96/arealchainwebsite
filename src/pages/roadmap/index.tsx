import Layout from "@/src/components/layout";
import {
  CheckCircle2,
  Loader2,
  Circle,
  Zap,
  Award,
  Users,
  Mic,
  Rocket,
  Banknote,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react";

interface Milestone {
  quarter: string;
  status: "completed" | "in-progress" | "upcoming";
  title: string;
  description: string;
}

// New Roadmap Data based on your requirements
const roadmapData: Milestone[] = [
  {
    quarter: "Q3 2023",
    status: "completed",
    title: "Research & Development",
    description:
      "One year intensive R&D phase initiated to build the foundational technology for tokenizing real-world assets.",
  },
  {
    quarter: "Q4 2023",
    status: "completed",
    title: "Conceptualization & Prototyping",
    description:
      "Core concepts refined and a functional prototype developed to validate our innovative approach.",
  },
  {
    quarter: "Q1 2024",
    status: "completed",
    title: "Private Investor Funding Secured",
    description:
      "Successfully closed a significant funding round from key private investors, securing our development runway.",
  },
  {
    quarter: "Q2 2024",
    status: "completed",
    title: "Board of Directors Established",
    description:
      "Assembled a comprehensive board of directors with deep expertise in real estate, finance, and blockchain.",
  },
  {
    quarter: "Q3 2024",
    status: "completed",
    title: "Featured in Major News Channels",
    description:
      "Gained significant media traction, with features in several prominent financial and tech news outlets.",
  },
  {
    quarter: "Q3 2024",
    status: "completed",
    title: "Showcased at Crypto Expo Dubai",
    description:
      "Successfully presented Areal's vision and technology at one of the world's leading crypto events, generating high interest.",
  },
  {
    quarter: "Q4 2024",
    status: "in-progress",
    title: "Platform Alpha Launch",
    description:
      "Rolling out an exclusive alpha version of the platform to our early investors and partners for feedback.",
  },
  {
    quarter: "Q4 2024",
    status: "in-progress",
    title: "Global Marketing Campaign Kick-off",
    description:
      "Initiating a multi-channel marketing campaign to build global awareness ahead of our public launch.",
  },
  {
    quarter: "Q1 2025",
    status: "upcoming",
    title: "Public Platform Launch (V1.0)",
    description:
      "The official public launch of the Areal platform, opening up real-world asset tokenization to everyone.",
  },
  {
    quarter: "Q1 2025",
    status: "upcoming",
    title: "First RWA Listing",
    description:
      "Onboarding and listing the very first tokenized real-world asset on the Areal platform.",
  },
  {
    quarter: "Q2 2025",
    status: "upcoming",
    title: "Areal Marketplace Launch",
    description:
      "Introducing a secondary marketplace for the peer-to-peer trading of tokenized assets, boosting liquidity.",
  },
  {
    quarter: "Q2 2025",
    status: "upcoming",
    title: "ArealPay Integration",
    description:
      "Launch of our native payment solution to streamline transactions within the ecosystem.",
  },
  {
    quarter: "Q3 2025",
    status: "upcoming",
    title: "Mobile App Release (iOS & Android)",
    description:
      "Bringing the full power of the Areal platform to your fingertips with dedicated mobile applications.",
  },
  {
    quarter: "Q4 2025",
    status: "upcoming",
    title: "Expansion into New Asset Classes",
    description:
      "Expanding beyond real estate to include tokenization of other valuable real-world assets like art and commodities.",
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

export default function Roadmap() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const onWheel = (e: globalThis.WheelEvent) => {
      if (e.deltaY == 0) return;
      e.preventDefault();
      element.scrollTo({
        left: element.scrollLeft + e.deltaY,
        behavior: "auto",
      });
    };

    element.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", onWheel);
    };
  }, []);

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
  };

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

  let milestoneCounter = 0;

  return (
    <Layout>
      <div className="min-h-screen bg-transparent overflow-x-hidden">
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

        <div
          ref={scrollContainerRef}
          className="no-scrollbar w-full overflow-x-auto cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="relative inline-flex items-center h-[600px] py-10 px-20 min-w-full">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 -translate-y-1/2"></div>

            <div className="flex items-center">
              {timelineItems.map((item, index) => {
                if (item.type === "year") {
                  return (
                    <div
                      key={`year-${item.year}`}
                      className="relative flex-shrink-0 w-28 flex flex-col items-center justify-center z-10 mx-4"
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-700 ring-8 ring-gray-900"></div>
                      <div className="absolute top-1/2 -translate-y-[calc(50%+4rem)] bg-[#F4B448] text-black font-bold text-xl px-4 py-1 rounded-lg shadow-lg shadow-[#F4B448]/20">
                        {item.year}
                      </div>
                    </div>
                  );
                }

                milestoneCounter++;
                const milestone = item.data;
                const config = statusConfig[milestone.status];
                const isAbove = milestoneCounter % 2 !== 0;

                return (
                  <div
                    key={`milestone-${index}`}
                    className="relative flex-shrink-0 w-80 h-full flex flex-col items-center"
                  >
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
                    <div
                      className={cn(
                        "absolute",
                        isAbove ? "bottom-1/2 mb-10" : "top-1/2 mt-10"
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

        {/* <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="text-center">
            <div className="bg-gray-900/50 rounded-xl p-12 border border-gray-800">
              <h2 className="text-3xl font-bold text-white mb-6">
                Stay Updated
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Follow our progress and be the first to know about new features,
                partnerships, and milestone achievements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-8 py-3 rounded-lg transition-colors">
                  Subscribe to Updates
                </button>
                <button className="border border-[#F4B448] text-[#F4B448] hover:bg-[#F4B448] hover:text-black font-semibold px-8 py-3 rounded-lg transition-colors">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}
