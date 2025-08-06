import Layout from "@/src/components/layout";
import { FormEvent, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiBox,
  FiDroplet,
  FiBriefcase,
  FiUser,
  FiMail,
  FiPhone,
  FiChevronDown,
  FiEdit,
} from "react-icons/fi";
import { toast } from "sonner";

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

// Reusable Feature Card Component
const FeatureCard = ({
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

// Main Development Hub Page Component
const ArealDevelopmentHub: NextPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorHover, setCursorHover] = useState(false);
  const [loading, setLoading] = useState(false);
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
      // Scroll-triggered animations for sections
      const sections = gsap.utils.toArray("section");
      sections.forEach((section: any) => {
        gsap.from(section.children, {
          opacity: 0,
          y: 100,
          duration: 0.1,
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

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    project_name: "",
    project_category: "Real Estate",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success(
          "Your Form has been submitted. We'll get back to you soon."
        );
        setFormState({
          name: "",
          email: "",
          phone: "",
          project_name: "",
          project_category: "Real Estate",
          description: "",
        });
      } else {
        toast.error(`Submission failed: ${data.message || "Try again later."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <Layout>
      <div
        ref={mainRef}
        className="bg-black text-white overflow-hidden relative"
      >
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

          <div className="relative z-10 px-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-[#f8e276] to-[#efa638] bg-clip-text text-transparent mb-6">
              Areal Development Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light">
              Unlock the future of asset tokenization. Bring your Real Estate,
              Oil, and Gold projects to the world's most secure and streamlined
              platform.
            </p>
          </div>
        </section>

        <main className="px-4 md:px-8 py-24 md:py-32 space-y-32 md:space-y-48 relative z-10">
          {/* Why Build on Areal? */}
          <section>
            <SectionHeader
              title="Why Build on Areal?"
              subtitle="Leverage our robust infrastructure to introduce unprecedented liquidity, security, and accessibility to traditional assets."
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FiBriefcase size={40} />}
                title="Real Estate"
                description="Fractionalize ownership of properties, reduce transaction friction, and open up global investment opportunities for residential and commercial real estate."
                setCursorHover={setCursorHover}
              />
              <FeatureCard
                icon={<FiDroplet size={40} />}
                title="Oil"
                description="Tokenize oil reserves and contracts to create a more liquid and transparent market, simplifying investment and trading for this vital commodity."
                setCursorHover={setCursorHover}
              />
              <FeatureCard
                icon={<FiBox size={40} />}
                title="Gold"
                description="Digitize physical gold holdings. Offer investors a secure, blockchain-verified claim on real gold, combining its stability with digital efficiency."
                setCursorHover={setCursorHover}
              />
            </div>
          </section>

          {/* Lead Gen Form Section */}
          <section>
            <SectionHeader
              title="Bring Your Project to Life"
              subtitle="Complete the form below to begin the process. Our team will review your submission and contact you to discuss the next steps."
            />
            <div
              className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="relative">
                    <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pr-4 pl-12 text-white focus:outline-none focus:border-[#efa638] transition-colors"
                    />
                  </div>
                  {/* Email Address */}
                  <div className="relative">
                    <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pr-4 pl-12 text-white focus:outline-none focus:border-[#efa638] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Phone Number */}
                  <div className="relative">
                    <FiPhone className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional)"
                      value={formState.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pr-4 pl-12 text-white focus:outline-none focus:border-[#efa638] transition-colors"
                    />
                  </div>
                  {/* Project Name */}
                  <div className="relative">
                    <FiEdit className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
                    <input
                      type="text"
                      name="project_name"
                      placeholder="Project Name"
                      value={formState.project_name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pr-4 pl-12 text-white focus:outline-none focus:border-[#efa638] transition-colors"
                    />
                  </div>
                </div>

                {/* Project Category */}
                <div className="relative">
                  <FiChevronDown className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 pointer-events-none" />
                  <select
                    name="project_category"
                    value={formState.project_category}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#efa638] transition-colors appearance-none"
                  >
                    <option>Real Estate</option>
                    <option>Oil</option>
                    <option>Gold</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Project Description */}
                <textarea
                  name="description"
                  placeholder="Tell us more about your project..."
                  rows={6}
                  value={formState.description}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#efa638] transition-colors"
                ></textarea>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#efa638] to-[#f8e276] text-black font-bold text-lg rounded-lg hover:opacity-90 transition-opacity duration-300"
                >
                  Submit Project Inquiry
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default ArealDevelopmentHub;
