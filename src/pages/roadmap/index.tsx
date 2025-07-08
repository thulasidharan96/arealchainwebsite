import {
  CheckCircle2,
  Loader2,
  Circle,
  Zap,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "@/src/components/layout";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Milestone {
  quarter: string;
  status: "completed" | "in-progress" | "upcoming";
  title: string;
  description: string;
  features?: string[];
}

// Roadmap Data based on the new technical roadmap
const roadmapData: Milestone[] = [
  {
    quarter: "Q3 2023",
    status: "completed",
    title: "Blockchain Architecture & Consensus Mechanism Development",
    description:
      "Development of a robust Proof of Stake (PoS) consensus mechanism optimized for scalability, security, and low energy consumption.",
    features: [
      "PoS Consensus",
      "Scalability Optimization",
      "Energy Efficiency",
    ],
  },
  {
    quarter: "Q4 2023",
    status: "completed",
    title: "Smart Contract & Tokenization Protocol Development",
    description:
      "Design of advanced smart contracts for tokenized asset management, with support for ERC-721, ERC-1155, and ERC-20 token standards.",
    features: ["ERC-721 Support", "ERC-1155 Integration", "Asset Management"],
  },
  {
    quarter: "Q1 2024",
    status: "completed",
    title: "Private Investor Funding Secured",
    description:
      "Completion of a successful Series A funding round to enhance development capacity, focusing on technical infrastructure and developer ecosystem expansion.",
    features: [
      "Series A Complete",
      "Infrastructure Focus",
      "Developer Ecosystem",
    ],
  },
  {
    quarter: "Q2 2024",
    status: "completed",
    title: "Governance Framework & DAO Design",
    description:
      "Decentralized governance (DAO) system integrated into Areal Chain, allowing token holders to vote on critical network upgrades, asset onboarding, and revenue-sharing decisions.",
    features: ["DAO Integration", "Token Voting", "Revenue Sharing"],
  },
  {
    quarter: "Q3 2024",
    status: "in-progress",
    title: "Testnet Launch (V1.0)",
    description:
      "Deployment of Areal Chain's Testnet (v1.0) with active participation from validators and early adopters to test the blockchain protocol and tokenization features.",
    features: ["Testnet Deployment", "Validator Network", "Protocol Testing"],
  },
  {
    quarter: "Q4 2024",
    status: "in-progress",
    title: "Enhanced Asset Class Expansion",
    description:
      "Integrating advanced asset classes into the Areal platform, including luxury assets, intellectual property, precious metals, and carbon credits.",
    features: ["Luxury Assets", "IP Tokenization", "Carbon Credits"],
  },
  {
    quarter: "Q1 2025",
    status: "upcoming",
    title: "Public Platform Launch (V1.0)",
    description:
      "Full-scale Areal Chain Mainnet launch, enabling global asset tokenization with enhanced scalability and cross-chain asset interoperability.",
    features: ["Mainnet Launch", "Global Tokenization", "Cross-chain Support"],
  },
  {
    quarter: "Q2 2025",
    status: "upcoming",
    title: "ArealPay Integration for Tokenized Transactions",
    description:
      "Full deployment of ArealPay to process transactions for real estate and commodity-backed tokens.",
    features: ["Payment Processing", "Real Estate Tokens", "Commodity Backing"],
  },
  {
    quarter: "Q3 2025",
    status: "upcoming",
    title: "Decentralized Identity (DID) Integration",
    description:
      "Implementation of a Decentralized Identity (DID) protocol for KYC/AML compliance without compromising user privacy.",
    features: ["DID Protocol", "KYC/AML Compliance", "Privacy Protection"],
  },
  {
    quarter: "Q4 2025",
    status: "upcoming",
    title: "Web3 Asset Management & User Interface Revamp",
    description:
      "Web3-based platform for decentralized management of tokenized assets, including real-time performance analytics and asset tracking tools.",
    features: ["Web3 Platform", "Performance Analytics", "Asset Tracking"],
  },
  {
    quarter: "Q1 2026",
    status: "upcoming",
    title: "AI & Machine Learning Integration for Asset Valuation",
    description:
      "AI-driven asset valuation models integrated to provide real-time predictions and dynamic pricing for tokenized real-world assets based on machine learning algorithms.",
    features: ["AI Valuation", "Real-time Predictions", "Dynamic Pricing"],
  },
  {
    quarter: "Q3 2026",
    status: "upcoming",
    title: "Tokenization of Carbon Credits & Water Rights",
    description:
      "Launch of a tokenized marketplace for carbon credits and water rights, providing access to sustainable financial products and ESG investment opportunities.",
    features: ["Carbon Marketplace", "Water Rights", "ESG Investment"],
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500",
    cardBorder: "border-emerald-500/30",
    cardBg: "bg-emerald-500/10",
    shadow: "shadow-emerald-500/20",
    glowColor: "shadow-emerald-500/30",
    dotColor: "bg-emerald-500",
    lineColor: "bg-emerald-500/30",
  },
  "in-progress": {
    icon: Loader2,
    color: "text-amber-400",
    bgColor: "bg-amber-500",
    cardBorder: "border-amber-500/30",
    cardBg: "bg-amber-500/10",
    shadow: "shadow-amber-500/20",
    glowColor: "shadow-amber-500/30",
    dotColor: "bg-amber-500",
    lineColor: "bg-amber-500/30",
  },
  upcoming: {
    icon: Circle,
    color: "text-slate-400",
    bgColor: "bg-slate-500",
    cardBorder: "border-slate-500/30",
    cardBg: "bg-slate-500/5",
    shadow: "shadow-slate-500/10",
    glowColor: "shadow-slate-500/20",
    dotColor: "bg-slate-500",
    lineColor: "bg-slate-500/20",
  },
};

const MilestoneCard = ({
  milestone,
  index,
  isLeft,
}: {
  milestone: Milestone;
  index: number;
  isLeft: boolean;
}) => {
  const config = statusConfig[milestone.status];
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: isLeft ? -100 : 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, [isLeft]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative group",
        isLeft ? "mr-8 text-right" : "ml-8 text-left"
      )}
    >
      <motion.div
        className={cn(
          "p-8 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 hover:scale-105 max-w-lg",
          config.cardBorder,
          config.cardBg,
          `hover:shadow-2xl ${config.glowColor}`
        )}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Badge
            className={cn(
              "px-3 py-1 text-xs font-semibold",
              config.cardBorder,
              config.cardBg,
              config.color
            )}
          >
            <Calendar className="w-3 h-3 mr-1" />
            {milestone.quarter}
          </Badge>
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              config.dotColor,
              milestone.status === "in-progress" && "animate-pulse"
            )}
          ></div>
        </div>

        <h3
          className={cn("font-bold text-xl mb-4 leading-tight", config.color)}
        >
          {milestone.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {milestone.description}
        </p>

        {milestone.features && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Target className="w-3 h-3" />
              Key Features
            </div>
            <div className="flex flex-wrap gap-2">
              {milestone.features.map((feature, featureIndex) => (
                <span
                  key={featureIndex}
                  className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-md text-xs text-slate-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const TimelineDot = ({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) => {
  const config = statusConfig[milestone.status];
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: dotRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      dotRef.current,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={cn(
        "relative w-12 h-12 rounded-full flex items-center justify-center z-10 ring-4 ring-slate-900/50",
        config.bgColor,
        `shadow-lg ${config.glowColor}`
      )}
    >
      <config.icon
        className={cn(
          "w-6 h-6 text-slate-900",
          milestone.status === "in-progress" && "animate-spin"
        )}
      />
    </div>
  );
};

export default function VerticalRoadmap() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !progressRef.current) return;

    // Timeline progress animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 20%",
        end: "bottom 80%",
        scrub: 1,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleY: self.progress,
              transformOrigin: "top",
            });
          }
        },
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header Section */}
        <div className="pt-20 pb-12 px-4 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-amber-500/5"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <Badge className="mb-6 bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30 transition-colors">
                <Zap className="w-4 h-4 mr-2" />
                Our Journey Forward
              </Badge>

              <motion.h1
                className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Development Roadmap
              </motion.h1>

              <motion.p
                className="text-slate-400 text-xl max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Revolutionizing real-world asset tokenization through
                cutting-edge blockchain technologies. Our comprehensive roadmap
                showcases the milestones that will shape the future of
                decentralized finance.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative px-4 pb-20 mt-8">
          <div className="max-w-6xl mx-auto">
            <div ref={timelineRef} className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-700/50 -translate-x-1/2"></div>

              {/* Progress Line */}
              <div
                ref={progressRef}
                className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-amber-500 to-slate-500 -translate-x-1/2 origin-top scale-y-0"
              ></div>

              {/* Timeline Items */}
              <div className="space-y-16">
                {roadmapData.map((milestone, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className="relative flex items-center justify-center"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 z-20">
                        <TimelineDot milestone={milestone} index={index} />
                      </div>

                      {/* Content */}
                      <div
                        className={cn(
                          "flex items-center w-full",
                          isLeft ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "w-1/2 flex",
                            isLeft ? "justify-end" : "justify-start"
                          )}
                        >
                          <MilestoneCard
                            milestone={milestone}
                            index={index}
                            isLeft={isLeft}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        {/* <div className="py-16 px-4 bg-slate-900/50 border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-3xl font-bold text-emerald-400">
                  {roadmapData.filter((m) => m.status === "completed").length}
                </div>
                <div className="text-slate-400">Completed Milestones</div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-3xl font-bold text-amber-400">
                  {roadmapData.filter((m) => m.status === "in-progress").length}
                </div>
                <div className="text-slate-400">In Progress</div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-3xl font-bold text-slate-400">
                  {roadmapData.filter((m) => m.status === "upcoming").length}
                </div>
                <div className="text-slate-400">Upcoming</div>
              </motion.div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}
