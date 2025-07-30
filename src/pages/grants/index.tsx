import React, { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  Lightbulb,
  Rocket,
  Users,
  Award,
  Globe,
  Code,
  Zap,
  Target,
  ArrowRight,
  Calendar,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import Layout from "@/src/components/layout";

const ArealGrantsPage = () => {
  const [activeGrant, setActiveGrant] = useState(0);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const grantsRef = useRef(null);
  const benefitsRef = useRef(null);
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const grantCategories = [
    {
      title: "Infrastructure & Core Development",
      amount: "Up to $500K",
      description:
        "Building the foundation of tomorrow's real estate blockchain",
      icon: <Code className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      projects: [
        "Layer-1 optimizations",
        "Cross-chain bridges",
        "DeFi protocols",
        "Security auditing tools",
      ],
    },
    {
      title: "Real Estate Innovation",
      amount: "Up to $300K",
      description: "Revolutionizing property investment and management",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      projects: [
        "Property tokenization tools",
        "Smart contract templates",
        "Property management dApps",
        "Market analytics platforms",
      ],
    },
    {
      title: "Developer Tools & SDKs",
      amount: "Up to $200K",
      description: "Empowering developers to build the future",
      icon: <Zap className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      projects: [
        "Development frameworks",
        "API integrations",
        "Testing suites",
        "Documentation tools",
      ],
    },
    {
      title: "Community & Education",
      amount: "Up to $100K",
      description: "Growing and educating the AREAL ecosystem",
      icon: <Users className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      projects: [
        "Educational content",
        "Community tools",
        "Hackathon platforms",
        "Developer bootcamps",
      ],
    },
  ];

  const stats = [
    {
      value: "$5M",
      label: "Total Grant Pool",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      value: "200+",
      label: "Applications Received",
      icon: <Target className="w-6 h-6" />,
    },
    {
      value: "45",
      label: "Projects Funded",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      value: "150+",
      label: "Developer Community",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const applicationProcess = [
    {
      step: "01",
      title: "Submit Proposal",
      description:
        "Submit your innovative idea with detailed technical specifications and roadmap.",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      step: "02",
      title: "Initial Review",
      description:
        "Our technical team reviews your proposal for feasibility and alignment with AREAL's vision.",
      icon: <Target className="w-6 h-6" />,
    },
    {
      step: "03",
      title: "Technical Interview",
      description:
        "Present your project to our panel of blockchain experts and industry leaders.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      step: "04",
      title: "Funding Decision",
      description:
        "Successful projects receive funding and ongoing support from the AREAL team.",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, PropTech Solutions",
      company: "Received $250K Grant",
      quote:
        "The AREAL grant program didn't just fund our project - they became true partners in building the future of real estate technology.",
      avatar: "SC",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer, ChainBridge",
      company: "Received $400K Grant",
      quote:
        "Working with AREAL has been incredible. Their technical expertise and vision for blockchain real estate is unmatched.",
      avatar: "MR",
    },
    {
      name: "Dr. Emily Watson",
      role: "Blockchain Researcher",
      company: "Received $150K Grant",
      quote:
        "The support and resources provided by AREAL enabled us to push the boundaries of what's possible in DeFi real estate.",
      avatar: "EW",
    },
  ];

  useEffect(() => {
    // Simple fade-in animations would go here in a real GSAP implementation
    // For this demo, we'll use CSS animations instead
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

    // Observe all sections
    [
      heroRef,
      statsRef,
      grantsRef,
      benefitsRef,
      processRef,
      testimonialsRef,
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
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F4B448]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative max-w-6xl mx-auto text-center z-10">
            <div className="inline-flex items-center px-4 py-2 bg-[#F4B448]/20 border border-[#F4B448]/30 rounded-full text-[#F4B448] text-sm font-medium mb-8 animate-bounce">
              <Rocket className="w-4 h-4 mr-2" />
              Now Accepting Applications for 2025
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-[#F4B448] to-white bg-clip-text text-transparent">
                Build the Future
              </span>
              <br />
              <span className="text-white">Get Funded</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join the{" "}
              <span className="text-[#F4B448] font-semibold">
                AREAL Grants Program
              </span>{" "}
              and receive up to{" "}
              <span className="text-[#F4B448] font-semibold">$500,000</span> to
              build groundbreaking technology that will reshape real estate on
              the blockchain.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-[#F4B448] to-yellow-500 hover:from-yellow-500 hover:to-[#F4B448] text-black font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F4B448]/25">
                Apply for Grant
                <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-gray-600 hover:border-[#F4B448] text-white hover:text-[#F4B448] font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105">
                View Success Stories
                <ChevronRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div> */}
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F4B448] to-yellow-600 rounded-2xl flex items-center justify-center">
              <Code className="w-8 h-8 text-black" />
            </div>
          </div>
          <div className="absolute bottom-20 right-10 animate-float delay-1000">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
        </section>

        {/* Stats Section 
        <section ref={statsRef} className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F4B448] to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-[#F4B448]/25 transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-[#F4B448] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>*/}

        {/* Grant Categories Section */}
        <section ref={grantsRef} className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Grant <span className="text-[#F4B448]">Categories</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose the category that best fits your innovative project and
                get the funding you need to make it reality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {grantCategories.map((category, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-[#F4B448] hover:shadow-2xl hover:shadow-[#F4B448]/10 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setActiveGrant(index)}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F4B448] transition-colors">
                    {category.title}
                  </h3>

                  <div className="text-2xl font-black text-[#F4B448] mb-4">
                    {category.amount}
                  </div>

                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    {category.description}
                  </p>

                  <div className="space-y-2">
                    {category.projects.map((project, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-[#F4B448]" />
                        {project}
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#F4B448]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section ref={processRef} className="py-20 px-4 bg-gray-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Application <span className="text-[#F4B448]">Process</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our streamlined process ensures the best projects get funded
                quickly and efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applicationProcess.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-[#F4B448] hover:shadow-xl hover:shadow-[#F4B448]/10 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-6xl font-black text-[#F4B448]/20 mb-4">
                      {step.step}
                    </div>

                    <div className="w-12 h-12 bg-gradient-to-br from-[#F4B448] to-yellow-600 rounded-xl flex items-center justify-center mb-6">
                      {step.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {index < applicationProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-[#F4B448]/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section ref={testimonialsRef} className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Success <span className="text-[#F4B448]">Stories</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Hear from the innovators who are already building the future
                with AREAL grants.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-[#F4B448] hover:shadow-xl hover:shadow-[#F4B448]/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F4B448] to-yellow-600 rounded-full flex items-center justify-center text-black font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-[#F4B448]">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section ref={ctaRef} className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4B448]/10 via-transparent to-[#F4B448]/10"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              We’re <span className="text-[#F4B448]">Coming Soon!</span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Something groundbreaking is on the horizon. We’re building the
              next era of RWA innovation powered by blockchain technology.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-[#F4B448] to-yellow-500 hover:from-yellow-500 hover:to-[#F4B448] text-black font-bold px-10 py-5 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F4B448]/25">
                Notify Me
                <Rocket className="inline ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="group border-2 border-gray-600 hover:border-[#F4B448] text-white hover:text-[#F4B448] font-semibold px-10 py-5 rounded-xl text-xl transition-all duration-300 transform hover:scale-105">
                Learn More
                <Calendar className="inline ml-2 w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div> */}
          </div>
        </section>

        {/* <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
        `}</style> */}
      </div>
    </Layout>
  );
};

export default ArealGrantsPage;
