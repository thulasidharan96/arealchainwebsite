import Layout from "@/src/components/layout";
import TwitterFeed from "@/src/components/TwitterFeed"; // Import the new component
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
} from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { JSX, useEffect, useRef, useState } from "react";
import SplineCompany from "@/src/components/SplineCompany";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

const SplineCube = dynamic(() => import("@/src/components/SplineCube"), {
  ssr: false,
});

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
    image: "/team/raghu.jpeg",
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

// Scroll Animation variants
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const bounceUp = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const scaleUp = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
      type: "spring",
      damping: 15,
      stiffness: 120,
    },
  },
};

export default function Company(): JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-50px" });
  const recognitionInView = useInView(recognitionRef, {
    once: true,
    margin: "-50px",
  });
  const founderInView = useInView(founderRef, { once: true, margin: "-50px" });
  const videoInView = useInView(videoRef, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  const router = useRouter();

  return (
    <Layout>
      <div className="relative z-0">
        <SplineCube />
        <div className="relative z-10 backdrop-blur-sm">
          {/* Hero Section */}
          <div className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                ref={heroRef}
                className="text-center mb-16"
                initial="initial"
                animate={heroInView ? "animate" : "initial"}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Badge className="mb-6 bg-[#F4B448]/20 text-[#F4B448] border-[#F4B448]/30 hover:bg-[#F4B448]/30 transition-colors">
                    <Zap className="w-4 h-4 mr-2" />
                    From Vision to Reality
                  </Badge>
                </motion.div>
                <motion.h1
                  className="text-5xl font-bold text-white mb-6"
                  variants={bounceUp}
                >
                  AREAL : The Future of Real Assets
                </motion.h1>
                <motion.p
                  className="text-gray-400 text-xl max-w-3xl mx-auto"
                  variants={fadeInUp}
                >
                  From Vision to Reality: Powering the Future of Real-World
                  Investments
                </motion.p>
                <motion.p
                  className="text-gray-400 text-xl max-w-3xl mx-auto"
                  variants={fadeInUp}
                >
                  At Areal, we're not just building blockchain infrastructure —
                  we're reshaping how the world invests in real-world assets.
                </motion.p>
              </motion.div>

              {/* Mission & Vision */}
              <motion.div
                ref={missionRef}
                className="grid lg:grid-cols-2 gap-16 mb-20"
                initial="initial"
                animate={missionInView ? "animate" : "initial"}
                variants={staggerContainer}
              >
                <motion.div className="group" variants={bounceUp}>
                  <Card className="h-full bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
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
                </motion.div>

                <motion.div className="space-y-8" variants={fadeInUp}>
                  {/* Stats */}
                  <motion.div
                    className="grid grid-cols-3 gap-6"
                    variants={staggerContainer}
                  >
                    {stats.map((stat, index) => (
                      <motion.div key={index} variants={staggerItem}>
                        <Card className="bg-gray-900/50 border-gray-800 text-center hover:bg-gray-900/70  transition-all duration-300 hover:-translate-y-1 group">
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
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Features */}
                  <motion.div className="space-y-4" variants={staggerContainer}>
                    {features.map((feature, index) => (
                      <motion.div key={index} variants={staggerItem}>
                        <Card className="bg-gray-900/30 border-gray-800 hover:bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 group">
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
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Vision Section */}
              <motion.div
                className="text-center mb-20"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                <motion.h2
                  className="text-3xl font-bold text-white mb-4"
                  variants={fadeInUp}
                >
                  Our Vision
                </motion.h2>
                <motion.div
                  className="w-24 h-1 bg-[#F4B448] mx-auto mb-6"
                  variants={scaleUp}
                ></motion.div>
                <motion.p
                  className="text-gray-400 text-lg max-w-4xl mx-auto mb-8"
                  variants={fadeInUp}
                >
                  To become the world's leading blockchain ecosystem for
                  real-world asset tokenization — where anyone, anywhere can
                  invest in tangible, secure, and accessible real estate assets
                  with the ease of digital finance.
                </motion.p>
                <motion.p
                  className="text-gray-400 text-lg max-w-3xl mx-auto mb-8"
                  variants={fadeInUp}
                >
                  We envision a future where blockchain bridges the gap between
                  traditional investment barriers and modern financial freedom —
                  unlocking new wealth-building opportunities across the globe.
                </motion.p>
                <motion.div className="max-w-2xl mx-auto" variants={bounceUp}>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:bg-gray-900/70 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-[#F4B448] text-2xl font-bold mb-2">
                      Simple. Secure. Seamless.
                    </p>
                    <p className="text-gray-300 text-lg">
                      That's the future of real estate investing — powered by
                      AREAL.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Recognition */}
              <motion.div
                ref={recognitionRef}
                className="text-center mb-20"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                <motion.h2
                  className="text-3xl font-bold text-white mb-4"
                  variants={fadeInUp}
                >
                  Areal in the Limelight
                </motion.h2>
                <motion.div
                  className="w-24 h-1 bg-[#F4B448] mx-auto mb-6"
                  variants={scaleUp}
                ></motion.div>
                <motion.p
                  className="text-gray-400 text-lg max-w-3xl mx-auto mb-12"
                  variants={fadeInUp}
                >
                  We've been featured in leading global and regional
                  publications for our innovative approach to real estate
                  tokenization.
                </motion.p>
                <motion.div
                  className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-16 items-center"
                  variants={staggerContainer}
                >
                  {mediaLogos.map((media, index) => (
                    <motion.div
                      key={media.name}
                      className="flex justify-center items-center h-20 group"
                      variants={staggerItem}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image
                        src={media.src}
                        alt={media.name}
                        width={250}
                        height={250}
                        className="w-25 h-25 object-contain transition-all duration-300 group-hover:scale-[1.05]"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Meet the Founder */}
              <motion.div
                ref={founderRef}
                className="mb-20 flex flex-col items-center"
                initial="initial"
                animate={founderInView ? "animate" : "initial"}
                variants={staggerContainer}
              >
                <motion.div className="text-center mb-12" variants={fadeInUp}>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Meet the Founder
                  </h2>
                  <div className="w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                  <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                    Our founder is the visionary behind Areal, with a deep
                    passion for innovation and technology. Leading the company
                    into the future, they bring unparalleled expertise to the
                    real estate and tech industries.
                  </p>
                </motion.div>

                <motion.div
                  className="flex md:flex-row lg:flex-row items-center justify-center space-x-12 sm:flex-col flex-col"
                  variants={staggerContainer}
                >
                  {/* Founder Image  */}
                  <motion.div
                    className="bg-transparent rounded-lg border border-[#F4B448] overflow-hidden group hover:scale-105 transition-all duration-300"
                    variants={scaleUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src="/team/founder.jpg"
                      alt="Founder"
                      width={350}
                      height={350}
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Founder Content */}
                  <motion.div
                    className="flex flex-col bg-black/50 p-4 rounded-2xl justify-center space-y-4 max-w-lg mt-4 sm:mt-10 md:mt-0 lg:mt-0 backdrop-blur-3xl"
                    variants={bounceUp}
                  >
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
                        className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-800/50 text-white font-semibold px-2 py-2 rounded-md mt-2 sm:mt-0 w-full sm:w-auto transition-colors duration-200"
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
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Advisory Board Section */}
              <motion.div
                className="mb-20"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                <motion.h2
                  className="text-3xl font-bold text-white mb-4 text-center"
                  variants={fadeInUp}
                >
                  Meet Our Advisory Board
                </motion.h2>
                <motion.div
                  className="w-24 h-1 bg-[#F4B448] mx-auto mb-10"
                  variants={scaleUp}
                ></motion.div>

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
                    <motion.div
                      key={index}
                      className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] flex flex-col justify-self-center" // Add flex classes
                      variants={staggerItem}
                    >
                      <Image
                        src={advisor.image}
                        alt={advisor.name}
                        width={400}
                        height={300}
                        className="w-full h-[300px] object-cover flex-shrink-0" // Add flex-shrink-0
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
                            className="inline-flex items-center justify-center gap-2 text-blue-400 hover:text-blue-500 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              LinkedIn
                            </span>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Video Section */}
              {/* <motion.div
                ref={videoRef}
                className="mb-20"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={bounceUp}
              >
                <motion.div className="text-center mb-8" variants={fadeInUp}>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Promotional Videos
                  </h2>
                  <div className="w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                  <p className="text-gray-400 text-lg">
                    Learn more about our platform with our informative videos
                  </p>
                </motion.div>

                <motion.div className="max-w-4xl mx-auto" variants={scaleUp}>
                  <div className="aspect-video rounded-xl overflow-hidden border-2 border-[#F4B448]/30 shadow-[0_0_25px_#F4B44833]">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/wu5bA6-weUk?autoplay=1&mute=1&loop=1&playlist=wu5bA6-weUk&controls=0&modestbranding=1&showinfo=0&rel=0"
                      title="Introducing the identity behind the innovation."
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              </motion.div> */}

              {/* Twitter Feed Widget - Now using the new component */}
              <motion.div
                className="mb-20"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <div className="max-w-full mx-auto">
                  {/* <TwitterFeed /> */}
                  <DiscordMessages />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
