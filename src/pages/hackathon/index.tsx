import React, { useEffect, useRef, useState } from "react";
import {
  Code,
  Trophy,
  Users,
  Calendar,
  Clock,
  Zap,
  Target,
  Rocket,
  Star,
  Gift,
  ArrowRight,
  Bell,
  Github,
  Twitter,
  Globe,
  ChevronDown,
  Play,
  Pause,
} from "lucide-react";
import Layout from "@/src/components/layout";

const ArealHackathonPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 15,
  });
  const [email, setEmail] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [activeTrack, setActiveTrack] = useState(0);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const tracksRef = useRef(null);
  const prizesRef = useRef(null);
  const timelineRef = useRef(null);
  const sponsorsRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hackathonTracks = [
    {
      title: "Real Estate DeFi",
      description:
        "Build innovative DeFi protocols for real estate investment, lending, and yield farming",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500",
      prize: "$50,000",
      challenges: [
        "Property tokenization",
        "Fractional ownership",
        "Yield farming protocols",
        "Insurance mechanisms",
      ],
    },
    {
      title: "Developer Tooling",
      description:
        "Create tools and SDKs that make building on AREAL easier for developers",
      icon: <Code className="w-8 h-8" />,
      color: "from-blue-400 to-purple-500",
      prize: "$30,000",
      challenges: [
        "Smart contract templates",
        "Testing frameworks",
        "Analytics dashboards",
        "API integrations",
      ],
    },
    {
      title: "User Experience",
      description:
        "Design intuitive interfaces and experiences for real estate blockchain applications",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-400 to-teal-500",
      prize: "$25,000",
      challenges: [
        "Mobile wallets",
        "Property discovery",
        "Investment dashboards",
        "Educational platforms",
      ],
    },
    {
      title: "Wild Card",
      description:
        "Think outside the box and surprise us with innovative uses of blockchain in real estate",
      icon: <Zap className="w-8 h-8" />,
      color: "from-pink-400 to-red-500",
      prize: "$20,000",
      challenges: [
        "VR property tours",
        "AI-powered valuations",
        "IoT integrations",
        "Sustainability tracking",
      ],
    },
  ];

  const timeline = [
    { date: "Jan 15", event: "Registration Opens", status: "upcoming" },
    { date: "Feb 1", event: "Workshops Begin", status: "upcoming" },
    { date: "Feb 15", event: "Hackathon Kickoff", status: "upcoming" },
    { date: "Feb 17", event: "48-Hour Building Phase", status: "upcoming" },
    { date: "Feb 18", event: "Judging & Awards", status: "upcoming" },
  ];

  const sponsors = [
    { name: "VARA", logo: "/Accrediters/vara.png", tier: "Gold" },
    { name: "CERTIK", logo: "/Accrediters/Certik.png", tier: "Gold" },
    {
      name: "TechStars",
      logo: "https://via.placeholder.com/200x100?text=TechStars",
      tier: "Silver",
    },
    {
      name: "Chainlink",
      logo: "https://via.placeholder.com/200x100?text=Chainlink",
      tier: "Silver",
    },
  ];

  const faqs = [
    {
      question: "When will the hackathon take place?",
      answer:
        "The AREAL Hackathon will be a 48-hour event from February 15-17, 2025. Registration opens January 15th.",
    },
    {
      question: "Is this hackathon virtual or in-person?",
      answer:
        "This will be a hybrid event! We'll have physical locations in Dubai, New York, and London, plus full virtual participation options.",
    },
    {
      question: "What's the total prize pool?",
      answer:
        "We're offering over $125,000 in prizes across all tracks, plus additional sponsor prizes and AREAL tokens for all participants.",
    },
    {
      question: "Do I need blockchain experience?",
      answer:
        "Not necessarily! We welcome developers of all levels. We'll provide workshops, mentorship, and resources to help you get started.",
    },
  ];

  const handleEmailSubmit = () => {
    // Handle email subscription
    console.log("Email submitted:", email);
    setEmail("");
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    }, observerOptions);

    [
      heroRef,
      aboutRef,
      tracksRef,
      prizesRef,
      timelineRef,
      sponsorsRef,
      faqRef,
      ctaRef,
    ].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center px-4 py-20"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F4B448]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

            {/* Floating Code Elements */}
            <div className="absolute top-20 left-10 animate-float">
              <div className="text-[#F4B448]/30 text-6xl font-mono">{"</"}</div>
            </div>
            <div className="absolute top-32 right-20 animate-float delay-1000">
              <div className="text-purple-400/30 text-4xl font-mono">
                {"{ }"}
              </div>
            </div>
            <div className="absolute bottom-32 left-20 animate-float delay-2000">
              <div className="text-blue-400/30 text-5xl font-mono">{"[ ]"}</div>
            </div>
            <div className="absolute bottom-20 right-10 animate-float delay-3000">
              <div className="text-green-400/30 text-3xl font-mono">
                {"( )"}
              </div>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto text-center z-10">
            {/* Status Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F4B448]/20 to-orange-500/20 border border-[#F4B448]/30 rounded-full text-[#F4B448] text-lg font-bold mb-8 animate-pulse">
              <div className="w-3 h-3 bg-[#F4B448] rounded-full mr-3 animate-ping"></div>
              COMING SOON
            </div>

            {/* Main Title */}
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-[#F4B448] via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient">
                AREAL
              </span>
              <br />
              <span className="text-white">HACKATHON</span>
              <br />
              {/* <span className="text-4xl md:text-6xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                2025
              </span> */}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              <span className="text-[#F4B448] font-semibold">48 Hours.</span>
              <span className="text-purple-400 font-semibold">
                {" "}
                Unlimited Creativity
              </span>
              <br />
              Build the future of{" "}
              <span className="text-[#F4B448] font-semibold">RWA</span> on
              blockchain.
            </p>

            {/* Countdown Timer */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="group">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-[#F4B448] hover:shadow-2xl hover:shadow-[#F4B448]/25 transition-all duration-300 transform group-hover:scale-105">
                    <div className="text-4xl md:text-5xl font-black text-[#F4B448] mb-2">
                      {value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-gray-400 text-sm font-semibold uppercase">
                      {unit}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="group bg-gradient-to-r from-[#F4B448] via-orange-500 to-red-500 hover:from-red-500 hover:via-orange-500 hover:to-[#F4B448] text-black font-bold px-10 py-5 rounded-xl text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-[#F4B448]/25">
                <Bell className="inline mr-3 w-6 h-6 group-hover:animate-bounce" />
                Notify Me When Live
              </button>
              <button className="group border-2 border-purple-500 hover:border-[#F4B448] text-purple-400 hover:text-[#F4B448] font-semibold px-10 py-5 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:bg-purple-500/10">
                Watch Teaser
                <Play className="inline ml-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div> */}

            {/* Prize Pool Highlight */}
            {/* <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-2xl">
              <Trophy className="w-8 h-8 text-green-400 mr-4" />
              <div>
                <div className="text-3xl font-black text-green-400">
                  $125,000+
                </div>
                <div className="text-green-300 text-sm font-semibold">
                  Total Prize Pool
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-20 px-4 bg-gray-900/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Why <span className="text-[#F4B448]">AREAL</span> Hackathon?
            </h2>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed">
              Join the world's premier blockchain real estate hackathon. Connect
              with industry leaders, build groundbreaking solutions, and compete
              for life-changing prizes while shaping the future of property
              investment.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-12 h-12" />,
                  title: "Global Impact",
                  description:
                    "Build solutions that will transform how billions invest in real estate worldwide",
                  color: "from-blue-400 to-purple-500",
                },
                {
                  icon: <Rocket className="w-12 h-12" />,
                  title: "Launch Support",
                  description:
                    "Winners get funding, mentorship, and resources to bring their projects to market",
                  color: "from-[#F4B448] to-orange-500",
                },
                {
                  icon: <Users className="w-12 h-12" />,
                  title: "Elite Network",
                  description:
                    "Connect with top developers, investors, and industry leaders in blockchain real estate",
                  color: "from-green-400 to-teal-500",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-[#F4B448] hover:shadow-2xl hover:shadow-[#F4B448]/10 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#F4B448] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracks Section */}
        <section ref={tracksRef} className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
                Competition <span className="text-[#F4B448]">Tracks</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose your battlefield and compete in one of four exciting
                tracks designed to push the boundaries of blockchain real
                estate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {hackathonTracks.map((track, index) => (
                <div
                  key={index}
                  className={`group relative bg-gray-900/50 border border-gray-800 rounded-3xl p-8 hover:border-[#F4B448] transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                    activeTrack === index
                      ? "border-[#F4B448] shadow-2xl shadow-[#F4B448]/20"
                      : ""
                  }`}
                  onClick={() => setActiveTrack(index)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${track.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      {track.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-[#F4B448]">
                        {track.prize}
                      </div>
                      <div className="text-sm text-gray-400">Prize Pool</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#F4B448] transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {track.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-[#F4B448] mb-3">
                      Key Challenges:
                    </div>
                    {track.challenges.map((challenge, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors"
                      >
                        <Star className="w-4 h-4 mr-2 text-[#F4B448]" />
                        {challenge}
                      </div>
                    ))}
                  </div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-20 px-4 bg-gray-900/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
                Event <span className="text-[#F4B448]">Timeline</span>
              </h2>
              <p className="text-xl text-gray-300">
                Mark your calendars for the most exciting 48 hours in blockchain
                real estate.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F4B448] to-purple-500"></div>

              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center mb-12 last:mb-0"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F4B448] to-orange-500 rounded-full flex items-center justify-center mr-8 font-bold text-black text-sm z-10">
                    {item.date}
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 flex-1 hover:border-[#F4B448] hover:shadow-xl hover:shadow-[#F4B448]/10 transition-all duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.event}
                    </h3>
                    <div className="inline-flex items-center px-3 py-1 bg-[#F4B448]/20 text-[#F4B448] text-sm font-semibold rounded-full">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section ref={ctaRef} className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4B448]/10 via-purple-500/10 to-blue-500/10"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Don't Miss <span className="text-[#F4B448]">The Launch</span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Be the first to know when registration opens. Get exclusive
              updates, early access, and special perks.
            </p>

            <div className="max-w-md mx-auto mb-12">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-[#F4B448] focus:outline-none focus:ring-2 focus:ring-[#F4B448]/20 transition-all duration-300"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="bg-gradient-to-r from-[#F4B448] to-orange-500 hover:from-orange-500 hover:to-[#F4B448] text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F4B448]/25"
                >
                  <Bell className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* <div className="flex justify-center gap-6">
              {[
                { icon: <Twitter className="w-6 h-6" />, label: "Twitter" },
                { icon: <Github className="w-6 h-6" />, label: "GitHub" },
                { icon: <Globe className="w-6 h-6" />, label: "Website" },
              ].map((social, index) => (
                <button
                  key={index}
                  className="group w-14 h-14 bg-gray-900/50 border border-gray-700 rounded-xl flex items-center justify-center hover:border-[#F4B448] hover:bg-[#F4B448]/10 transition-all duration-300 transform hover:scale-110"
                >
                  <div className="text-gray-400 group-hover:text-[#F4B448] transition-colors">
                    {social.icon}
                  </div>
                </button>
              ))}
            </div> */}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ArealHackathonPage;
