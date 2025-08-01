import Layout from "@/src/components/layout";
import TwitterFeed from "@/src/components/TwitterFeed";
import DiscordMessages from "@/src/components/DiscordMessages";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Building2,
  Users,
  Globe,
  MapPin,
  TrendingUp,
  Shield,
  Zap,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getAllAnnouncements,
  getAnnouncementsByCategory,
} from "@/src/lib/announcementData";
import type { Announcement } from "@/src/lib/announcementData";

const SplineCube = dynamic(() => import("@/src/components/SplineCube"), {
  ssr: false,
});

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface AdvisorMember {
  name: string;
  role?: string;
  image: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  { name: "Bart de Bruijn", role: "Managing Director & Co-Founder" },
  { name: "Ron Nath Mukherjee", role: "Managing Director Luxembourg" },
  { name: "Steve Craggs", role: "Director of Global Real Estate Distribution" },
  { name: "Graham Ade", role: "Chief Technical Officer" },
  { name: "Steve Lawrence", role: "Head of Marketing & Business Development" },
  {
    name: "Michael Gord",
    role: "Business Development & Areal United States",
  },
  { name: "Rainer Bergmann", role: "Managing Director Germany" },
  { name: "Wim Geleyn", role: "Managing Director Luxembourg" },
  { name: "Thomas Onel", role: "Co-Founder" },
  { name: "Adam Schmideg", role: "Chief Engineer" },
];

const advisors: AdvisorMember[] = [
  {
    name: "Mr. Adrian Oleary",
    role: "Head of Product Quality @ Light & Wonder",
    image: "/team/adrian.jpeg",
    linkedin: "https://www.linkedin.com/in/adrianoleary/",
  },
  {
    name: "Mr. James Capps",
    role: "Managing Director @ BlackRock",
    image: "/team/james.jpeg",
    linkedin: "https://www.linkedin.com/in/capps/",
  },
  {
    name: "Mr. Raghu Subramanian",
    role: "Executive Chairman @ Actyv.ai",
    image: "/team/raghu.jpg",
    linkedin: "https://www.linkedin.com/in/raghu0101/",
  },
];

interface Stat {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: Stat[] = [
  { number: "60+", label: "Employees", icon: Users },
  { number: "2+", label: "Continents", icon: Globe },
  { number: "10+", label: "Countries", icon: MapPin },
];

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Building2,
    title: "Real Estate Innovation",
    description:
      "Transforming traditional property investment through cutting-edge technology",
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description:
      "Secure, transparent transactions powered by blockchain technology",
  },
  {
    icon: TrendingUp,
    title: "Global Accessibility",
    description:
      "Making real estate investment accessible to everyone, everywhere",
  },
];

interface MediaLogo {
  name: string;
  src: string;
}

const mediaLogos: MediaLogo[] = [
  { name: "Forbes", src: "/media/forbes.png" },
  { name: "Gulf Time", src: "/media/gulf-time.png" },
  { name: "Gulf News", src: "/media/gulf-news.png" },
  { name: "Gulf Today", src: "/media/gulf_today.png" },
  { name: "GCCB", src: "/media/GCCB.png" },
  { name: "CoinTelegraph", src: "/media/cointelegraph.png" },
];

export default function Company(): JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Announcement states
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const router = useRouter();

  // Get announcements data
  const allAnnouncements = getAllAnnouncements();
  const filteredAnnouncements = getAnnouncementsByCategory(selectedCategory);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    // Simple fade-in animations on scroll
    const animateOnScroll = (
      selector: string,
      triggerElement: HTMLElement | null
    ) => {
      if (!triggerElement) return;

      const elements = triggerElement.querySelectorAll(selector);

      gsap.set(elements, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 80%",
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
      });
    };

    // Apply animations to each section
    animateOnScroll(".hero-element", heroRef.current);
    animateOnScroll(".mission-element", missionRef.current);
    animateOnScroll(".recognition-element", recognitionRef.current);
    animateOnScroll(".founder-element", founderRef.current);
    animateOnScroll(
      ".advisor-card",
      document.querySelector(".advisory-section")
    );

    // Animate section headers
    const headers = document.querySelectorAll("section h2, .section-title");
    gsap.set(headers, { opacity: 0, y: 20 });

    headers.forEach((header) => {
      ScrollTrigger.create({
        trigger: header,
        start: "top 85%",
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Layout>
      <div className="relative z-0">
        <SplineCube />
        <div className="relative z-10 backdrop-blur-sm">
          {/* Hero Section */}
          <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div ref={heroRef} className="text-center mb-16">
                <div className="hero-element">
                  <Badge className="mb-6 bg-[#F4B448]/20 text-[#F4B448] border-[#F4B448]/30 hover:bg-[#F4B448]/30 transition-colors">
                    <Zap className="w-4 h-4 mr-2" />
                    From Vision to Reality
                  </Badge>
                </div>
                <h1 className="hero-element text-5xl font-bold text-white mb-6">
                  AREAL : The Future of Real Assets
                </h1>
                <p className="hero-element text-gray-400 text-xl max-w-3xl mx-auto">
                  From Vision to Reality: Powering the Future of Real-World
                  Investments
                </p>
                <p className="hero-element text-gray-400 text-xl max-w-3xl mx-auto">
                  At Areal, we're not just building blockchain infrastructure —
                  we're reshaping how the world invests in real-world assets.
                </p>
              </div>

              {/* Mission & Vision */}
              <div
                ref={missionRef}
                className="grid lg:grid-cols-2 gap-16 mb-20"
              >
                <div className="mission-element group">
                  <Card className="h-full bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-[#F4B448] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Building2 className="w-6 h-6 text-black" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">
                          Our Mission
                        </h2>
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#F4B448]">
                          Revolutionizing Real Estate Through Blockchain
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                          We aim to bring the new era of real estate investing
                          to life. Breaking down barriers and providing
                          liquidity and flexibility for the new generation of
                          property owners and investors.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                          Our mission is to make real estate simple, affordable
                          and accessible to everyone, everywhere.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mission-element space-y-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="mission-element">
                        <Card className="bg-gray-900/50 border-gray-800 text-center hover:bg-gray-900/70 hover:-translate-y-1 hover:scale-105 transition-all duration-300 group">
                          <CardContent className="p-6 backdrop-blur-3xl">
                            <div className="flex justify-center mb-3">
                              <stat.icon className="w-8 h-8 text-[#F4B448] group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">
                              {stat.number}
                            </div>
                            <div className="text-sm text-gray-400 font-medium">
                              {stat.label}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="mission-element">
                        <Card className="bg-gray-900/30 border-gray-800 hover:bg-gray-900/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 group">
                          <CardContent className="p-6 backdrop-blur-3xl">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-[#F4B448]/20 rounded-lg flex items-center justify-center group-hover:bg-[#F4B448]/30 group-hover:scale-110 transition-all duration-300">
                                  <feature.icon className="w-5 h-5 text-[#F4B448]" />
                                </div>
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-2">
                                  {feature.title}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vision Section */}
              <div className="text-center mb-20">
                <h2 className="section-title text-3xl font-bold text-white mb-4">
                  Our Vision
                </h2>
                <div className="section-title w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                <p className="section-title text-gray-400 text-lg max-w-4xl mx-auto mb-8">
                  To become the world's leading blockchain ecosystem for
                  real-world asset tokenization — where anyone, anywhere can
                  invest in tangible, secure, and accessible real estate assets
                  with the ease of digital finance.
                </p>
                <p className="section-title text-gray-400 text-lg max-w-3xl mx-auto mb-8">
                  We envision a future where blockchain bridges the gap between
                  traditional investment barriers and modern financial freedom —
                  unlocking new wealth-building opportunities across the globe.
                </p>
                <div className="section-title max-w-2xl mx-auto">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:bg-gray-900/70 hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                    <p className="text-[#F4B448] text-2xl font-bold mb-2">
                      Simple. Secure. Seamless.
                    </p>
                    <p className="text-gray-300 text-lg ">
                      That's the future of real estate investing — powered by
                      AREAL.
                    </p>
                    <Link href="/whitepaper" legacyBehavior>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#F4B448] text-black font-semibold mt-4 px-4 py-3 rounded-lg hover:bg-[#e0a53b] transition-all duration-300"
                      >
                        Read Our Whitepaper
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recognition */}
              <div ref={recognitionRef} className="text-center mb-20">
                <h2 className="section-title text-3xl font-bold text-white mb-4">
                  Areal in the Limelight
                </h2>
                <div className="section-title w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                <p className="section-title text-gray-400 text-lg max-w-3xl mx-auto mb-12">
                  We've been featured in leading global and regional
                  publications for our innovative approach to real estate
                  tokenization.
                </p>
                <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-16 items-center">
                  {mediaLogos.map((media, index) => (
                    <div
                      key={media.name}
                      className="recognition-element flex justify-center items-center h-20 group hover:scale-110 transition-transform duration-300"
                    >
                      <Image
                        src={media.src}
                        alt={media.name}
                        width={250}
                        height={250}
                        className="w-25 h-25 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Meet the Founder */}
              <div
                ref={founderRef}
                className="mb-20 flex flex-col items-center"
              >
                <div className="text-center mb-12">
                  <h2 className="section-title text-3xl font-bold text-white mb-4">
                    Meet the Founder
                  </h2>
                  <div className="section-title w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                  <p className="section-title text-gray-400 text-lg max-w-3xl mx-auto">
                    Our founder is the visionary behind Areal, with a deep
                    passion for innovation and technology. Leading the company
                    into the future, they bring unparalleled expertise to the
                    real estate and tech industries.
                  </p>
                </div>

                <div className="flex md:flex-row lg:flex-row items-center justify-center space-x-12 sm:flex-col flex-col">
                  {/* Founder Image  */}
                  <div className="founder-element bg-transparent rounded-lg border border-[#F4B448] overflow-hidden group hover:scale-105 transition-all duration-300">
                    <Image
                      src="/team/founder.jpg"
                      alt="Founder"
                      width={350}
                      height={350}
                      className="object-cover"
                    />
                  </div>

                  {/* Founder Content */}
                  <div className="founder-element flex flex-col bg-black/50 p-4 rounded-2xl justify-center space-y-4 max-w-lg mt-4 sm:mt-10 md:mt-0 lg:mt-0 backdrop-blur-3xl">
                    <h3 className="text-white text-2xl font-semibold">
                      Sripriya Kalyanasundaram
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Founder & CEO | Areal Chain
                    </p>
                    <ul className="text-gray-200 text-sm space-y-2">
                      <li>
                        Sripriya Kalyanasundaram is the visionary Founder and
                        CEO of Areal Chain, leading the charge in the
                        tokenization of real-world assets (RWA) and creating a
                        borderless, decentralized, permissionless economy. With
                        over 20 years of experience in technology and business
                        strategy, she is dedicated to driving digital
                        transformation and empowering individuals through
                        blockchain technology.
                      </li>
                      <li>
                        Our Vision: To make RWA the next UPI, democratizing
                        access to tokenized assets and driving innovation in the
                        real estate space globally.
                      </li>
                    </ul>
                    <div className="w-full sm:w-auto">
                      <a
                        href="https://www.linkedin.com/in/sripriya-kalyanasundaram-7964b28/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-800/50 hover:scale-105 text-white font-semibold px-2 py-2 rounded-md mt-2 sm:mt-0 w-full sm:w-auto transition-all duration-300"
                      >
                        <Image
                          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                          alt="LinkedIn"
                          className="w-5 h-5"
                          width={20}
                          height={20}
                        />
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advisory Board Section */}
              <div className="advisory-section mb-20">
                <h2 className="section-title text-3xl font-bold text-white mb-4 text-center">
                  Meet Our Advisory Board
                </h2>
                <div className="section-title w-24 h-1 bg-[#F4B448] mx-auto mb-10"></div>

                {/* Dynamic grid center based on number of advisors */}
                <div
                  className={`grid gap-10 max-w-7xl mx-auto ${
                    advisors.length === 1
                      ? "grid-cols-1"
                      : advisors.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  }`}
                >
                  {advisors.map((advisor, index) => (
                    <div
                      key={index}
                      className="advisor-card bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:scale-105 hover:border-[#F4B448] transition-all duration-300 flex flex-col justify-self-center"
                    >
                      <Image
                        src={advisor.image}
                        alt={advisor.name}
                        width={400}
                        height={300}
                        className="w-full h-[300px] object-cover flex-shrink-0"
                      />
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {advisor.name}
                        </h3>
                        {advisor.role && (
                          <p className="text-gray-400 text-sm mb-2">
                            {advisor.role}
                          </p>
                        )}
                        {advisor.linkedin && (
                          <Link
                            href={advisor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-blue-400 hover:text-blue-500 hover:scale-105 transition-all duration-300"
                          >
                            <Linkedin className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              LinkedIn
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements Dropdown Section */}
              <div className="mb-20">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-8">
                    <button
                      onClick={() =>
                        setIsAnnouncementsOpen(!isAnnouncementsOpen)
                      }
                      className="inline-flex items-center gap-3 bg-gray-900/50 hover:bg-gray-900/70 border border-gray-800 hover:border-[#F4B448]/50 rounded-xl px-8 py-4 text-white font-semibold text-xl transition-all duration-300 hover:scale-105"
                    >
                      <span>Latest Announcements</span>
                      {isAnnouncementsOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#F4B448]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#F4B448]" />
                      )}
                    </button>
                  </div>

                  {isAnnouncementsOpen && (
                    <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8 backdrop-blur-sm">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Stay Updated with Areal
                        </h3>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                          Stay informed with the latest announcements, updates,
                          and news related to Areal.
                        </p>
                      </div>

                      {filteredAnnouncements.length > 0 ? (
                        <div className="grid lg:grid-cols-2 gap-8">
                          {filteredAnnouncements.map(
                            (announcement: Announcement) => (
                              <Link
                                href={`${announcement.link}`}
                                key={announcement.id}
                              >
                                <Card className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]">
                                  <CardHeader className="p-0">
                                    <div className="aspect-video bg-black rounded-t-lg overflow-hidden p-2">
                                      <Image
                                        src={
                                          announcement.image ||
                                          "/placeholder.svg"
                                        }
                                        alt={announcement.title}
                                        width={800}
                                        height={450}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                      />
                                    </div>
                                  </CardHeader>
                                  <CardContent className="p-6 backdrop-blur-3xl">
                                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                                      <Badge className="bg-[#F4B448] text-black">
                                        {announcement.category}
                                      </Badge>
                                      <span className="text-gray-400 text-sm">
                                        {announcement.date}
                                      </span>
                                    </div>
                                    <CardTitle className="text-white text-xl mb-3 hover:text-[#F4B448] transition-colors line-clamp-2">
                                      {announcement.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-400 text-base line-clamp-3">
                                      {announcement.excerpt}
                                    </CardDescription>
                                  </CardContent>
                                </Card>
                              </Link>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-400 text-lg">
                            No announcements available at the moment.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Community Updates Section (Previously Twitter Feed) */}
              <div className="mb-20">
                <div className="text-center mb-8">
                  <h2 className="section-title text-3xl font-bold text-white mb-4">
                    Community Updates
                  </h2>
                  <div className="section-title w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                  {/* <p className="section-title text-gray-400 text-lg max-w-3xl mx-auto">
                    Stay connected with our community and get the latest updates
                    from our Discord channel.
                  </p> */}
                </div>
                <div className="max-w-full mx-auto">
                  <DiscordMessages />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
