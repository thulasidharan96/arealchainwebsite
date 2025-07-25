import Layout from "@/src/components/layout";
import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiCode,
  FiUsers,
  FiBox,
  FiAward,
  FiBookOpen,
  FiGithub,
  FiMessageSquare,
  FiExternalLink,
  FiTerminal,
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

// Reusable Benefit Card Component
const BenefitCard = ({
  icon,
  title,
  description,
  setCursorHover,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  setCursorHover: (hover: boolean) => void;
}) => (
  <div
    className="bg-gray-900/50 p-8 rounded-3xl h-full flex flex-col items-center text-center border border-gray-800 transition-all duration-300 hover:border-[#efa638]/50 hover:shadow-[0_0_25px_rgba(239,166,56,0.2)] hover:-translate-y-2"
    onMouseEnter={() => setCursorHover(true)}
    onMouseLeave={() => setCursorHover(false)}
  >
    <div className="text-[#efa638] mb-6">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

// Reusable Resource Link Component
const ResourceLink = ({
  icon,
  title,
  description,
  href,
  setCursorHover,
}: any) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block group"
    onMouseEnter={() => setCursorHover(true)}
    onMouseLeave={() => setCursorHover(false)}
  >
    <div className="bg-gray-900/50 p-6 rounded-2xl h-full border border-gray-800 transition-all duration-300 group-hover:border-[#efa638]/50 group-hover:shadow-[0_0_25px_rgba(239,166,56,0.2)] group-hover:-translate-y-1">
      <div className="flex items-start">
        <div className="text-[#efa638] mr-5 mt-1">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            {title}
            <FiExternalLink className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-gray-400 leading-relaxed mt-1">{description}</p>
        </div>
      </div>
    </div>
  </a>
);

// Main Contributors Access Page Component
const ContributorsAccess: NextPage = () => {
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

      const sections = gsap.utils.toArray("section");
      sections.forEach((section: any) => {
        gsap.from(section.children, {
          opacity: 0,
          y: 100,
          duration: 1,
          stagger: 0.2,
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

  return (
    <Layout>
      <div
        ref={mainRef}
        className="bg-black text-white overflow-hidden relative"
      >
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center justify-center text-center overflow-hidden hero-section">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          {/* Decorative Background Elements for Developer Theme */}
          <div className="absolute inset-0 z-0">
            <p className="hero-element absolute top-[15%] left-[10%] font-mono text-gray-700 text-lg">
              &lt;Areal&gt;
            </p>
            <p className="hero-element absolute bottom-[20%] right-[15%] font-mono text-gray-600">
              // Your code here...
            </p>
            <p className="hero-element absolute top-[50%] right-[20%] font-mono text-gray-700 text-sm">
              Areal.init();
            </p>
            <p className="hero-element absolute bottom-[15%] left-[20%] font-mono text-gray-600 text-xl">
              [object Object]
            </p>
          </div>
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-mono bg-gradient-to-r from-white via-[#f8e276] to-[#efa638] bg-clip-text text-transparent mb-8">
              git commit -m "feat: Build the new financial world"
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light">
              Your first commit is more than just code. It's a stake in the
              future of real-world assets. Fork our repository and push the
              boundaries of decentralized finance on{" "}
              <span className="text-[#efa638] font-medium">arealchain.com</span>
              .
            </p>
          </div>
        </section>

        <main className="px-4 md:px-8 py-24 md:py-32 space-y-32 md:space-y-48 relative z-10">
          {/* Why Contribute Section */}
          <section>
            <SectionHeader
              title="Why Contribute to Areal?"
              subtitle="Be part of a revolutionary platform that's bridging the gap between physical assets and decentralized finance."
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <BenefitCard
                icon={<FiBox size={40} />}
                title="Innovate with RWAs"
                description="Work at the cutting edge of finance by developing applications for tokenized real-world assets (RWAs) like property, gold, and oil."
                setCursorHover={setCursorHover}
              />
              <BenefitCard
                icon={<FiCode size={40} />}
                title="Powerful APIs & SDKs"
                description="Leverage our robust, well-documented tools to build sophisticated applications with ease and efficiency."
                setCursorHover={setCursorHover}
              />
              <BenefitCard
                icon={<FiUsers size={40} />}
                title="Growing Community"
                description="Collaborate with a diverse and passionate community of developers, investors, and visionaries."
                setCursorHover={setCursorHover}
              />
              <BenefitCard
                icon={<FiAward size={40} />}
                title="Earn & Grow"
                description="Gain recognition, earn rewards through our grant programs, and enhance your skills by contributing to a high-impact project."
                setCursorHover={setCursorHover}
              />
            </div>
          </section>

          {/* Getting Started Section */}
          <section>
            <SectionHeader
              title="Your Journey Starts Here"
              subtitle="Follow these simple steps to start contributing to the Areal ecosystem and make your mark."
            />
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 text-3xl font-bold text-[#efa638]">
                  01
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Explore the Documentation
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Dive into our comprehensive docs to understand the core
                    concepts, architecture, and APIs that power Areal.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 text-3xl font-bold text-[#efa638]">
                  02
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Set Up Your Environment
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Clone our repository from GitHub and follow the setup guide
                    to get a local development environment running in minutes.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 text-3xl font-bold text-[#efa638]">
                  03
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Find an Issue & Contribute
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Browse open issues on GitHub, especially those tagged `good
                    first issue`. When you're ready, submit a pull request with
                    your contribution.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Developer Resources Section */}
          <section>
            <SectionHeader
              title="Developer Resources"
              subtitle="Everything you need to start building, all in one place. Connect with the code, the tools, and the community."
            />
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceLink
                icon={<FiGithub size={24} />}
                title="GitHub Repository"
                description="Access the full source code, track issues, and submit your pull requests."
                href="https://github.com/arealchain"
                setCursorHover={setCursorHover}
              />
              <ResourceLink
                icon={<FiBookOpen size={24} />}
                title="Technical Docs"
                description="In-depth guides, tutorials, and architectural overviews for the Areal platform."
                href="https://docs.arealchain.com"
                setCursorHover={setCursorHover}
              />
              <ResourceLink
                icon={<FiMessageSquare size={24} />}
                title="Discord Community"
                description="Join the conversation, ask questions, and collaborate with other developers in real-time."
                href="https://discord.gg/arealchain"
                setCursorHover={setCursorHover}
              />
              <ResourceLink
                icon={<FiTerminal size={24} />}
                title="API Reference"
                description="Detailed reference for all available API endpoints to interact with the Areal chain."
                href="https://api.arealchain.com"
                setCursorHover={setCursorHover}
              />
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default ContributorsAccess;
