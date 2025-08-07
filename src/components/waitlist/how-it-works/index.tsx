import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "@/src/components/layout";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HowItWorksPage = () => {
  const router = useRouter();
  const [hoveredCompetitor, setHoveredCompetitor] = useState<string | null>(
    null
  );
  const [animatedStats, setAnimatedStats] = useState({
    properties: 0,
    volume: 0,
    investors: 0,
    returns: 0,
  });
  const [currentVisibleStep, setCurrentVisibleStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- REVAMPED INVESTMENT SIMULATOR STATE ---
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [simulatorStep, setSimulatorStep] = useState(0); // 0: Idle, 1: Selected, 2: Tokenizing, 3: Complete
  const [generatedTokens, setGeneratedTokens] = useState(0);
  const [draggedProperty, setDraggedProperty] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Refs for animations
  const heroRef = useRef<HTMLElement>(null);
  const interactiveTimelineRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const diagonalSectionRef = useRef<HTMLElement>(null);
  const matrixRef = useRef<HTMLElement>(null);
  const simulatorRef = useRef<HTMLElement>(null);
  const floatingElementsRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<HTMLDivElement[]>([]);

  // Data (Arrays like processSteps, competitorMatrix, etc. remain the same)
  const processSteps = [
    {
      id: 1,
      title: "Property Discovery",
      subtitle: "AI-Powered Selection",
      description:
        "Our advanced AI algorithms scan global real estate markets, analyzing over 50+ data points including location analytics, demographic trends, rental yields, and future development plans to identify premium investment opportunities.",
      details: [
        "Market analysis across 25+ countries",
        "AI prediction models with 94% accuracy",
        "Real-time price optimization",
        "Risk assessment algorithms",
      ],
      icon: "🏢",
      color: "from-blue-500 via-purple-500 to-pink-500",
      bgPattern:
        "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
    },
    {
      id: 2,
      title: "Blockchain Tokenization",
      subtitle: "Smart Contract Magic",
      description:
        "Each property undergoes our proprietary tokenization process, creating ERC-20 compatible tokens with embedded smart contracts that automatically handle ownership, dividends, and governance rights.",
      details: [
        "Instant token creation (< 5 minutes)",
        "Gas-optimized smart contracts",
        "Multi-signature security",
        "Automated compliance checks",
      ],
      icon: "⛓️",
      color: "from-green-500 via-teal-500 to-blue-500",
      bgPattern:
        "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
    },
    {
      id: 3,
      title: "Fractionalization Engine",
      subtitle: "Democratizing Ownership",
      description:
        "Our unique fractionalization technology splits property ownership into micro-shares, enabling investments from $1 while maintaining full legal ownership rights and proportional returns.",
      details: [
        "Minimum investment: $1",
        "Flexible share structures",
        "Real-time ownership tracking",
        "Instant liquidity mechanisms",
      ],
      icon: "🔗",
      color: "from-yellow-500 via-orange-500 to-red-500",
      bgPattern:
        "radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
    },
    {
      id: 4,
      title: "Investment Execution",
      subtitle: "Seamless Onboarding",
      description:
        "Multi-currency support allows investments in BTC, ETH, USDC, and AREAL tokens. Our streamlined KYC process ensures compliance while maintaining user privacy through zero-knowledge proofs.",
      details: [
        "15+ supported cryptocurrencies",
        "Zero-knowledge KYC",
        "Instant settlement",
        "Cross-chain compatibility",
      ],
      icon: "💰",
      color: "from-purple-500 via-indigo-500 to-blue-500",
      bgPattern:
        "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
    },
    {
      id: 5,
      title: "Yield Distribution",
      subtitle: "Automated Returns",
      description:
        "Smart contracts automatically distribute rental income, capital appreciation, and special dividends to token holders. Track your portfolio performance in real-time with detailed analytics.",
      details: [
        "Monthly automated payouts",
        "Real-time yield tracking",
        "Tax-optimized distributions",
        "Compound interest options",
      ],
      icon: "📈",
      color: "from-green-400 via-blue-500 to-purple-600",
      bgPattern:
        "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
    },
    {
      id: 6,
      title: "Secondary Trading",
      subtitle: "Instant Liquidity",
      description:
        "Trade your property tokens on our integrated DEX or external exchanges. Advanced market-making algorithms ensure tight spreads and instant execution for maximum liquidity.",
      details: [
        "24/7 trading availability",
        "Advanced order types",
        "Cross-platform liquidity",
        "MEV protection",
      ],
      icon: "🔄",
      color: "from-red-500 via-pink-500 to-purple-500",
      bgPattern:
        "radial-gradient(circle at 30% 70%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)",
    },
  ];

  const competitorMatrix = [
    {
      name: "ArealChain",
      logo: "🏆",
      minInvestment: "$1",
      fees: "0.5%",
      liquidity: "Instant",
      properties: "Global",
      blockchain: "Layer-1",
      governance: "Full DAO",
      yields: "8-15%",
      isArealChain: true,
    },
    {
      name: "RealT",
      logo: "🏠",
      minInvestment: "$50",
      fees: "2-3%",
      liquidity: "Limited",
      properties: "US Only",
      blockchain: "Ethereum",
      governance: "None",
      yields: "6-12%",
      isArealChain: false,
    },
    {
      name: "Lofty AI",
      logo: "🤖",
      minInvestment: "$50",
      fees: "2.5%",
      liquidity: "Daily",
      properties: "US Only",
      blockchain: "Algorand",
      governance: "Limited",
      yields: "5-10%",
      isArealChain: false,
    },
    {
      name: "Fundrise",
      logo: "💼",
      minInvestment: "$500",
      fees: "1-3%",
      liquidity: "Quarterly",
      properties: "US Only",
      blockchain: "None",
      governance: "None",
      yields: "4-8%",
      isArealChain: false,
    },
    {
      name: "Polymath",
      logo: "⚡",
      minInvestment: "$1000",
      fees: "3-5%",
      liquidity: "Complex",
      properties: "Limited",
      blockchain: "Multiple",
      governance: "Token",
      yields: "Variable",
      isArealChain: false,
    },
  ];

  const floatingElements = [
    { id: 1, x: 10, y: 20, size: 60, delay: 0, icon: "🏠" },
    { id: 2, x: 85, y: 15, size: 40, delay: 1, icon: "⛓️" },
    { id: 3, x: 15, y: 70, size: 50, delay: 2, icon: "💎" },
    { id: 4, x: 80, y: 75, size: 35, delay: 3, icon: "🚀" },
    { id: 5, x: 50, y: 10, size: 45, delay: 4, icon: "💰" },
    { id: 6, x: 25, y: 45, size: 55, delay: 5, icon: "📈" },
  ];

  const simulatorProperties = [
    {
      id: 1,
      name: "Manhattan Tower",
      location: "New York, USA",
      value: 2500000,
      image: "/api/placeholder/300/200",
      yield: 12.5,
      type: "Commercial",
      tokens: 2500000,
      minInvestment: 50,
      risk: "Low",
      features: ["Prime Location", "High Yield", "Stable Income"],
    },
    {
      id: 2,
      name: "Dubai Marina Complex",
      location: "Dubai, UAE",
      value: 1800000,
      image: "/api/placeholder/300/200",
      yield: 15.2,
      type: "Residential",
      tokens: 1800000,
      minInvestment: 25,
      risk: "Medium",
      features: ["Luxury Amenities", "Growing Market", "Tax Benefits"],
    },
    {
      id: 3,
      name: "London Office Hub",
      location: "London, UK",
      value: 3200000,
      image: "/api/placeholder/300/200",
      yield: 10.8,
      type: "Commercial",
      tokens: 3200000,
      minInvestment: 100,
      risk: "Low",
      features: ["Financial District", "AAA Tenants", "Long-term Lease"],
    },
    {
      id: 4,
      name: "Singapore Retail Space",
      location: "Singapore",
      value: 1200000,
      image: "/api/placeholder/300/200",
      yield: 18.5,
      type: "Retail",
      tokens: 1200000,
      minInvestment: 20,
      risk: "High",
      features: ["High Traffic", "Tourist Area", "Growth Potential"],
    },
  ];

  // --- REVAMPED SIMULATOR FUNCTIONS ---
  const handleDragStart = (property: any) => {
    setDraggedProperty(property);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (property: any) => {
    if (simulatorStep > 0) return; // Prevent changing property mid-simulation
    setSelectedProperty(property);
    setSimulatorStep(1);
    setIsDragging(false);
    setDraggedProperty(null);

    // Animate the property card into the scene
    gsap.fromTo(
      ".tokenization-core",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" }
    );
  };

  const startTokenization = () => {
    if (!selectedProperty) return;
    setSimulatorStep(2);

    const coreTl = gsap.timeline();
    coreTl
      .to(".tokenization-core", {
        scale: 1.2,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(".tokenization-core", {
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });

    const tokenContainer = document.getElementById("token-container");
    if (!tokenContainer) return;

    const tokensToAnimate = 50; // Number of visual particles
    const targetTokens = Math.floor(investmentAmount);

    for (let i = 0; i < tokensToAnimate; i++) {
      const particle = document.createElement("div");
      particle.className = "token-particle";
      tokenContainer.appendChild(particle);

      const simRect = simulatorRef.current?.getBoundingClientRect();
      const startX = simRect
        ? simRect.left + simRect.width / 2
        : window.innerWidth / 2;
      const startY = simRect
        ? simRect.top + simRect.height / 2 - 200
        : window.innerHeight / 2;

      gsap.set(particle, { x: startX, y: startY, opacity: 1 });

      gsap.to(particle, {
        x: `random(0, ${window.innerWidth})`,
        y: `random(0, ${window.innerHeight})`,
        scale: "random(0.5, 1.5)",
        opacity: 0,
        duration: "random(1.5, 2.5)",
        ease: "power3.out",
        delay: i * 0.04,
        onComplete: () => {
          particle.remove();
        },
      });
    }

    gsap.to(
      { value: 0 },
      {
        value: targetTokens,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function () {
          setGeneratedTokens(Math.floor(this.targets()[0].value));
        },
        onComplete: () => {
          setSimulatorStep(3);
          setGeneratedTokens(targetTokens);
        },
      }
    );
  };

  const resetSimulator = () => {
    setSimulatorStep(0);
    setSelectedProperty(null);
    setInvestmentAmount(1000);
    setGeneratedTokens(0);
  };

  // --- Main useEffect for page animations ---
  useEffect(() => {
    const statInterval = setInterval(() => {
      setAnimatedStats((prev) => ({
        properties: Math.min(prev.properties + 7, 450),
        volume: Math.min(prev.volume + 13, 850),
        investors: Math.min(prev.investors + 201, 12500),
        returns: Math.min(prev.returns + 0.2, 15.7),
      }));
    }, 50);

    setTimeout(() => clearInterval(statInterval), 2000);

    gsap.set(".floating-element", { willChange: "transform" });
    gsap.to(".floating-element", {
      y: "random(-15, 15)",
      x: "random(-8, 8)",
      rotation: "random(-3, 3)",
      duration: "random(4, 8)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.8,
    });

    if (timelineContainerRef.current) {
      const steps = stepsRefs.current;
      const container = timelineContainerRef.current;
      gsap.set(steps, {
        opacity: 0,
        scale: 0.9,
        x: -50,
        willChange: "transform, opacity",
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }
        },
      });

      steps.forEach((step, index) => {
        if (step) {
          ScrollTrigger.create({
            trigger: step,
            start: "top 85%",
            end: "bottom 25%",
            onEnter: () => {
              setCurrentVisibleStep(index);
              gsap.to(step, {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
              });
            },
            onLeave: () => {
              gsap.to(step, {
                opacity: 0.4,
                scale: 0.95,
                x: -25,
                duration: 0.5,
                ease: "power2.in",
              });
            },
            onEnterBack: () => {
              setCurrentVisibleStep(index);
              gsap.to(step, {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 0.1,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(step, {
                opacity: 0,
                scale: 0.9,
                x: -50,
                duration: 0.4,
                ease: "power2.in",
              });
            },
          });
        }
      });
    }

    const matrixRows = document.querySelectorAll(".matrix-row");
    gsap.set(matrixRows, { opacity: 0, x: -50 });
    ScrollTrigger.create({
      trigger: matrixRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(matrixRows, {
          opacity: 1,
          x: 0,
          duration: 0.1,
          stagger: 0.1,
          ease: "power2.out",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      clearInterval(statInterval);
    };
  }, []);

  return (
    <Layout>
      <>
        <Head>
          <title>
            How ArealChain Works | The Future of Real Estate Investment
          </title>
          <meta
            name="description"
            content="Experience the revolutionary 6-step process that transforms real estate into liquid digital assets. Interactive timeline, live comparisons, and real-time simulations."
          />
        </Head>

        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className="floating-element absolute opacity-10"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                fontSize: `${element.size}px`,
              }}
            >
              {element.icon}
            </div>
          ))}
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center bg-gradient-to-r from-[#F4B448]/20 to-purple-500/20 border border-[#F4B448]/30 rounded-full px-6 py-3">
                <span className="animate-pulse mr-2">🚀</span>
                <span className="text-[#F4B448] font-bold uppercase tracking-wide text-sm">
                  Revolutionary Technology
                </span>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-[#F4B448] to-purple-400 bg-clip-text text-transparent animate-pulse">
                The Magic
              </span>
              <br />
              <span className="text-white">Behind</span>
              <br />
              <span className="bg-gradient-to-r from-[#F4B448] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ArealChain
              </span>
            </h1>

            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Watch real estate transform into liquid digital gold through our
              <span className="text-[#F4B448] font-bold">
                {" "}
                interactive 6-step process
              </span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  label: "Properties Tokenized",
                  value: animatedStats.properties,
                  suffix: "+",
                },
                {
                  label: "Volume Traded",
                  value: animatedStats.volume,
                  prefix: "$",
                  suffix: "M+",
                },
                {
                  label: "Active Investors",
                  value: animatedStats.investors,
                  suffix: "+",
                  formatter: (v: number) => v.toLocaleString(),
                },
                {
                  label: "Avg Annual Return",
                  value: animatedStats.returns,
                  suffix: "%",
                  decimals: 1,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm border border-[#F4B448]/20 rounded-xl p-4"
                >
                  <div className="text-3xl font-bold text-[#F4B448]">
                    {stat.prefix}
                    {stat.formatter
                      ? stat.formatter(Math.floor(stat.value))
                      : Math.floor(stat.value).toLocaleString()}
                    {stat.decimals &&
                      `.${(stat.value % 1)
                        .toFixed(stat.decimals)
                        .substring(2)}`}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("interactive-timeline")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group bg-gradient-to-r from-[#F4B448] to-yellow-500 hover:from-yellow-500 hover:to-[#F4B448] text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-500 transform hover:scale-110 hover:rotate-1"
              >
                <span className="mr-2">🎯</span>
                Experience the Magic
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
              <button
                onClick={() => router.push("/areal-suite")}
                className="border-2 border-[#F4B448] text-[#F4B448] hover:bg-[#F4B448] hover:text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
              >
                Explore Ecosystem
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Timeline Section */}
        <section
          id="interactive-timeline"
          ref={interactiveTimelineRef}
          className="py-20 px-4 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                <span className="bg-gradient-to-r from-[#F4B448] to-purple-400 bg-clip-text text-transparent">
                  Scroll-Triggered
                </span>{" "}
                Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Scroll down to watch each step magically appear and reveal the
                secrets of real estate tokenization
              </p>

              <div className="relative mx-auto w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
                <div
                  ref={progressBarRef}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#F4B448] to-purple-500 transform origin-left transition-transform duration-300"
                  style={{ transform: `scaleX(${scrollProgress})` }}
                ></div>
              </div>

              <div className="text-sm text-gray-400">
                Step {currentVisibleStep + 1} of {processSteps.length} •{" "}
                {Math.round(scrollProgress * 100)}% Complete
              </div>
            </div>

            <div ref={timelineContainerRef} className="space-y-32">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    if (el) stepsRefs.current[index] = el;
                  }}
                  className="step-container relative opacity-0"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl font-black text-white mr-4 shadow-2xl`}
                      >
                        {step.id}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                        <p className="text-[#F4B448]">{step.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-6xl opacity-30">{step.icon}</div>
                  </div>

                  <div
                    className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${step.color} p-1 shadow-2xl`}
                  >
                    <div className="bg-gray-900/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                      <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                          <p className="text-gray-300 text-lg leading-relaxed">
                            {step.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {step.details.map((detail, idx) => (
                              <div
                                key={idx}
                                className="step-detail flex items-center bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#F4B448]/50 transition-all duration-300"
                              >
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                  <span className="text-white text-sm font-bold">
                                    ✓
                                  </span>
                                </div>
                                <span className="text-gray-300 font-medium">
                                  {detail}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="relative">
                          <div
                            className="relative transform-gpu"
                            style={{ perspective: "1000px" }}
                          >
                            <div
                              className="w-full h-80 rounded-3xl border-2 border-white/20 flex items-center justify-center relative overflow-hidden shadow-2xl transition-transform duration-700 hover:[transform:rotateY(-12deg)]"
                              style={{
                                background: `${step.bgPattern}, linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 100%)`,
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20"></div>
                              <div className="relative z-10 text-9xl filter drop-shadow-2xl animate-pulse">
                                {step.icon}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < processSteps.length - 1 && (
                    <div className="flex justify-center mt-16">
                      <div className="w-px h-16 bg-gradient-to-b from-[#F4B448] to-purple-500 opacity-50"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-20 p-8 bg-gradient-to-r from-[#F4B448]/10 to-purple-500/10 rounded-3xl border border-[#F4B448]/30">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Journey Complete!
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                You've unlocked the secrets of real estate tokenization. Ready
                to start your investment journey?
              </p>
              <button
                onClick={() => router.push("/signup")}
                className="bg-gradient-to-r from-[#F4B448] to-yellow-500 hover:from-yellow-500 hover:to-[#F4B448] text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-110"
              >
                Begin Your Investment Journey
              </button>
            </div>
          </div>
        </section>

        {/* --- THIS IS THE NEW FUTURISTIC SIMULATOR --- */}
        <section
          ref={simulatorRef}
          className="py-20 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-repeat opacity-5"></div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-6">
                <span className="bg-gradient-to-r from-[#F4B448] to-purple-400 bg-clip-text text-transparent">
                  ArealChain Holo-Simulator
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Experience the future of investment. Drag a property onto the
                holo-stage and witness the magic of live tokenization.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Property Selection Panel */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-[#F4B448]/20 h-full">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="text-2xl mr-3">🏢</span> Available Assets
                  </h3>
                  <div className="space-y-4">
                    {simulatorProperties.map((property) => (
                      <div
                        key={property.id}
                        className={`property-card cursor-grab active:cursor-grabbing bg-gray-800/80 rounded-2xl p-4 border-2 transition-all duration-300 hover:scale-105 hover:border-[#F4B448] hover:shadow-lg hover:shadow-[#F4B448]/20 ${
                          isDragging && draggedProperty?.id === property.id
                            ? "opacity-30 scale-95"
                            : ""
                        } ${
                          selectedProperty?.id === property.id
                            ? "border-[#F4B448] bg-[#F4B448]/10"
                            : "border-gray-700"
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(property)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handleDrop(property)}
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#F4B448] to-yellow-500 rounded-lg flex items-center justify-center text-xl shadow-inner shadow-black/20">
                            🏢
                          </div>
                          <div className="ml-3 flex-1">
                            <h4 className="text-white font-bold text-sm">
                              {property.name}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {property.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Simulator Panel */}
              <div className="lg:col-span-3">
                <div
                  className="relative bg-black/50 backdrop-blur-md rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-900/20 min-h-[600px] p-8 flex flex-col justify-between overflow-hidden"
                  style={{ perspective: "1000px" }}
                >
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3)_0%,transparent_70%)] animate-pulse"></div>
                    <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                    <div className="scan-line absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-[#F4B448]/80 to-transparent"></div>
                  </div>

                  <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
                    {!selectedProperty && (
                      <div
                        className={`drop-zone text-center transition-all duration-500 ${
                          isDragging ? "scale-110" : "scale-100"
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedProperty) handleDrop(draggedProperty);
                        }}
                      >
                        <div
                          className={`holo-projector relative w-48 h-48 transition-all duration-300 ${
                            isDragging ? "animate-pulse" : ""
                          }`}
                        >
                          <div className="holo-grid top"></div>
                          <div className="holo-grid bottom"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-300 mt-8">
                          Awaiting Asset Selection
                        </h3>
                        <p className="text-gray-500">
                          Drag a property onto the holo-projector
                        </p>
                      </div>
                    )}

                    {selectedProperty && (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="tokenization-core relative w-48 h-48 my-8 flex items-center justify-center">
                          {simulatorStep === 2 && (
                            <div className="absolute text-8xl animate-[spin_10s_linear_infinite]">
                              ⛓️
                            </div>
                          )}
                          {(simulatorStep > 2 || simulatorStep === 1) && (
                            <div className="absolute text-8xl animate-pulse">
                              💎
                            </div>
                          )}
                          <div className="w-full h-full border-4 border-[#F4B448] rounded-full absolute animate-[spin_20s_linear_infinite]"></div>
                          <div className="w-[120%] h-[120%] border-2 border-purple-500 rounded-full absolute animate-[spin_30s_linear_infinite_reverse]"></div>
                        </div>

                        <div className="text-center">
                          <h3 className="text-3xl font-bold text-white">
                            {selectedProperty.name}
                          </h3>
                          <p className="text-[#F4B448] mb-2">
                            {selectedProperty.location}
                          </p>
                          {simulatorStep > 1 && (
                            <p className="text-3xl font-bold text-white">
                              {generatedTokens.toLocaleString()} Tokens
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 mt-auto">
                    {selectedProperty && (
                      <div className="grid md:grid-cols-2 gap-6 bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">
                            💰 Set Investment
                          </h4>
                          <input
                            type="range"
                            min={selectedProperty.minInvestment}
                            max="50000"
                            value={investmentAmount}
                            onChange={(e) =>
                              setInvestmentAmount(Number(e.target.value))
                            }
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            disabled={simulatorStep >= 2}
                            style={{
                              backgroundSize: `${
                                selectedProperty
                                  ? ((investmentAmount -
                                      selectedProperty.minInvestment) /
                                      (50000 -
                                        selectedProperty.minInvestment)) *
                                    100
                                  : 0
                              }% 100%`,
                            }}
                          />
                          <div className="text-center mt-2">
                            <span className="text-3xl font-bold text-[#F4B448]">
                              ${investmentAmount.toLocaleString()}
                            </span>
                            <span className="text-gray-400 ml-2">USD</span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">
                                Tokens to Generate:
                              </span>
                              <span className="text-purple-400 font-bold">
                                {Math.floor(investmentAmount).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">
                                Est. Annual Return:
                              </span>
                              <span className="text-green-400 font-bold">
                                $
                                {Math.floor(
                                  investmentAmount *
                                    (selectedProperty.yield / 100)
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="w-full mt-4">
                            {simulatorStep < 2 && (
                              <button
                                onClick={startTokenization}
                                className="w-full bg-gradient-to-r from-[#F4B448] to-yellow-500 hover:from-yellow-500 hover:to-[#F4B448] text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={
                                  investmentAmount <
                                  selectedProperty.minInvestment
                                }
                              >
                                🚀 Initiate Tokenization
                              </button>
                            )}
                            {simulatorStep === 2 && (
                              <div className="w-full text-center py-3 px-6 rounded-xl bg-purple-500/20 text-purple-300">
                                ⚡ Tokenization in Progress...
                              </div>
                            )}
                            {simulatorStep > 2 && (
                              <div className="flex gap-4">
                                <button
                                  onClick={resetSimulator}
                                  className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                                >
                                  Reset
                                </button>
                                <button
                                  onClick={() => router.push("/invest")}
                                  className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300"
                                >
                                  Invest Now
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    id="token-container"
                    className="absolute inset-0 z-20 pointer-events-none"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- End of new simulator section --- */}

        {/* The rest of the page remains */}
        <section ref={matrixRef} className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-6">
                <span className="text-[#F4B448]">Interactive</span> Platform
                Matrix
              </h2>
              <p className="text-xl text-gray-300">
                Hover to explore detailed comparisons
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1024px] bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-[#F4B448] to-yellow-500">
                    <th className="p-4 text-black font-bold text-left">
                      Platform
                    </th>
                    <th className="p-4 text-black font-bold">Min Investment</th>
                    <th className="p-4 text-black font-bold">Fees</th>
                    <th className="p-4 text-black font-bold">Liquidity</th>
                    <th className="p-4 text-black font-bold">Coverage</th>
                    <th className="p-4 text-black font-bold">Blockchain</th>
                    <th className="p-4 text-black font-bold">Governance</th>
                    <th className="p-4 text-black font-bold">Yields</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorMatrix.map((platform) => (
                    <tr
                      key={platform.name}
                      className={`matrix-row border-b border-gray-700 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer ${
                        platform.isArealChain
                          ? "bg-gradient-to-r from-[#F4B448]/10 to-purple-500/10"
                          : ""
                      }`}
                      onMouseEnter={() => setHoveredCompetitor(platform.name)}
                      onMouseLeave={() => setHoveredCompetitor(null)}
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{platform.logo}</span>
                          <span
                            className={`font-bold ${
                              platform.isArealChain
                                ? "text-[#F4B448]"
                                : "text-white"
                            }`}
                          >
                            {platform.name}
                          </span>
                          {platform.isArealChain && (
                            <span className="ml-2 text-xs bg-[#F4B448] text-black px-2 py-1 rounded-full">
                              WINNER
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className={`p-4 text-center font-semibold ${
                          platform.isArealChain
                            ? "text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        {platform.minInvestment}
                      </td>
                      <td
                        className={`p-4 text-center font-semibold ${
                          platform.isArealChain
                            ? "text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        {platform.fees}
                      </td>
                      <td
                        className={`p-4 text-center font-semibold ${
                          platform.isArealChain
                            ? "text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        {platform.liquidity}
                      </td>
                      <td
                        className={`p-4 text-center font-semibold ${
                          platform.isArealChain
                            ? "text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        {platform.properties}
                      </td>
                      <td
                        className={`p-4 text-center font-semibold ${
                          platform.isArealChain
                            ? "text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        {platform.blockchain}
                      </td>
                      <td
                        className={`p-4 text-center font-semibold ${
                          platform.isArealChain
                            ? "text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        {platform.governance}
                      </td>
                      <td
                        className={`p-4 text-center font-semibold ${
                          platform.isArealChain
                            ? "text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        {platform.yields}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hoveredCompetitor && (
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-[#F4B448]/30">
                <h3 className="text-xl font-bold text-[#F4B448] mb-2">
                  Why{" "}
                  {hoveredCompetitor === "ArealChain"
                    ? "we lead"
                    : `${hoveredCompetitor} falls short`}
                </h3>
                <p className="text-gray-300">
                  {hoveredCompetitor === "ArealChain"
                    ? "ArealChain combines the best of all platforms while eliminating their limitations through our revolutionary Layer-1 blockchain technology."
                    : `${hoveredCompetitor} struggles with geographical limitations, high fees, and poor liquidity compared to ArealChain's global, low-cost, instant solution.`}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Custom styles for animations and complex elements */}
        <style jsx>{`
          @keyframes scan {
            0% {
              transform: translateY(-10%);
            }
            100% {
              transform: translateY(100vh);
            }
          }
          .scan-line {
            animation: scan 8s linear infinite;
            animation-delay: -4s;
          }
          .holo-projector {
            transform-style: preserve-3d;
            animation: rotate-holo 25s infinite linear;
          }
          .holo-grid {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid #f4b448;
            border-radius: 50%;
            box-shadow: 0 0 15px #f4b448, inset 0 0 15px #f4b448;
          }
          .holo-grid.top {
            transform: rotateX(80deg);
          }
          .holo-grid.bottom {
            transform: rotateX(-80deg);
            opacity: 0.5;
          }
          @keyframes rotate-holo {
            from {
              transform: rotateY(0deg) rotateX(10deg);
            }
            to {
              transform: rotateY(360deg) rotateX(10deg);
            }
          }
          .slider {
            -webkit-appearance: none;
            appearance: none;
            background: linear-gradient(to right, #f4b448 0%, #fcd34d 100%);
            background-repeat: no-repeat;
          }
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #f4b448;
            cursor: pointer;
            border: 4px solid #111827;
            box-shadow: 0 0 10px #f4b448;
          }
          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #f4b448;
            cursor: pointer;
            border: 4px solid #111827;
            box-shadow: 0 0 10px #f4b448;
          }
          .token-particle {
            position: fixed;
            width: 10px;
            height: 10px;
            background: #f4b448;
            border-radius: 50%;
            box-shadow: 0 0 10px #f4b448;
            z-index: 9999;
          }
        `}</style>
      </>
    </Layout>
  );
};

export default HowItWorksPage;
