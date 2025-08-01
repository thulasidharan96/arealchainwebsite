import Layout from "@/src/components/layout";
import Hero from "@/src/components/hero";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { properties } from "@/src/data/properties";
import { Button } from "../components/ui/button";
import Collaborators from "../components/landing/Collaborators";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const router = useRouter();

  // Refs for animation targets
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const suiteRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);
  const AccreditersRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const Accredited = [
    { name: "VARA", src: "/Accrediters/vara.png" },
    { name: "CERTIK", src: "/Accrediters/Certik.png" },
  ];

  const handleProductClick = (product: string): void => {
    switch (product) {
      case "Areal TaaS":
        router.push("/areal-suite/taas");
        break;
      case "Areal Mortgage":
        router.push("/areal-suite/mortgage");
        break;
      case "Launchpad":
        router.push("/areal-suite/launchpad");
        break;
      case "ArealPay":
        router.push("/areal-suite/pay");
        break;
      case "Areal Marketplace":
        router.push("/areal-suite/marketplace");
        break;
      default:
        break;
    }
  };

  const specialStats = [
    { value: 1.2, suffix: " Billion", label: "Total Supply", prefix: "" },
    { value: 200, suffix: " Million", label: "Circulating Supply", prefix: "" },
    { value: 0.25, prefix: "$", label: "Launching Price", suffix: "" },
    { value: 40, suffix: "%", label: "Investor Staking", prefix: "" },
    { value: 4.5, prefix: "$", suffix: " Million", label: "Fund Raised" },
    {
      value: 10,
      suffix: "x",
      label: "Expected Project Growth in 2 Years",
      prefix: "",
    },
  ];

  const faqItems = [
    {
      question: "What is AREAL and how does it tokenize real estate?",
      answer:
        "AREAL is a Layer-1 Blockchain that makes it easy to buy and sell real-world assets. We tokenize real estate by creating digital representations (tokens) of property ownership on our blockchain. This allows for fractional ownership, increased liquidity, and easier transfer of property assets.",
    },
    {
      question:
        "How does blockchain technology work in real estate investment?",
      answer:
        "Blockchain provides a secure, transparent, and immutable ledger for all transactions. In real estate, this means that ownership records are tamper-proof and transparent. Smart contracts can automate processes like rental income distribution and property sales, reducing costs and increasing efficiency.",
    },
    {
      question: "What cryptocurrencies does AREAL support?",
      answer:
        "Initially, the AREAL platform will support major cryptocurrencies like Bitcoin (BTC) and Ethereum (ETH), as well as our native AREAL token for transactions and platform fees. We plan to expand support for other cryptocurrencies in the future based on community demand and regulatory compliance.",
    },
  ];

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
    animateOnScroll(".stat-card", statsRef.current);
    animateOnScroll(".project-card", projectsRef.current);
    animateOnScroll(".suite-card", suiteRef.current);
    animateOnScroll(".partner-logo", partnersRef.current);
    animateOnScroll(".partner-logo", AccreditersRef.current);
    animateOnScroll(".faq-item", faqRef.current);

    // Animate section headers
    const headers = document.querySelectorAll("section h2, section p");
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
      {/* Hero Section */}
      <section ref={heroRef} className="flex justify-center">
        <Hero />
      </section>

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="h-px bg-[#F4B448]/30"></div>
      </div>

      {/* Special Stats Section */}
      <section ref={statsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-16">
            What makes AREAL Special?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white text-left">
            {specialStats.map((item, i) => (
              <div
                key={i}
                className="stat-card bg-gray-800/60 p-6 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-[#F4B448]/20 transition-all duration-300"
              >
                <h3 className="text-4xl font-extrabold text-[#F4B448] mb-2">
                  {item.prefix}
                  <span className="counter" data-value={item.value}>
                    {item.value}
                  </span>
                  {item.suffix}
                </h3>
                <p className="text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="h-px bg-[#F4B448]/30"></div>
      </div>

      {/* Accredited Section */}
      <section ref={AccreditersRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Accredited With
          </h2>
          <div className="flex flex-row gap-8 items-center justify-center">
            {Accredited.map((Accrediter, i) => (
              <div
                key={i}
                className="partner-logo bg-gray-800/50 p-4 rounded-lg flex items-center justify-center h-[200px] w-[400px] cursor-pointer mt-4 hover:scale-105 hover:border hover:border-[#F4B448] transition-all duration-300"
              >
                <Image
                  src={Accrediter.src}
                  alt={Accrediter.name}
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="h-px bg-[#F4B448]/30"></div>
      </div>

      {/* Featured Projects Section */}
      <section ref={projectsRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center justify-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Featured Projects
          </h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {properties.map((property, i) => (
              <div key={property.id} className="project-card">
                <Link
                  href={`/property/${property.id}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl hover:border-[#F4B448] hover:scale-105 transition-all duration-300 p-6 text-left w-full max-w-sm block"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg mb-4 relative">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {property.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {property.location}
                  </p>
                  <p className="text-yellow-400 text-sm">{property.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="h-px bg-[#F4B448]/30"></div>
      </div>

      {/* Areal Suite Section */}
      <section ref={suiteRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              The Areal Suite
            </h2>
            <h2 className="text-2xl font-bold text-white mb-6">
              Unlock the Future of Real-World Assets — All in One Powerful
              Suite.
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
              The World's First End-to-End Blockchain Ecosystem for Real Assets
              is Now Live. In the words of our CEO: "Simple, Secure, Seamless —
              That's the Areal promise.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "Areal TaaS",
                "Areal Mortgage",
                "Launchpad",
                "ArealPay",
                "Areal Marketplace",
              ].map((product, i) => (
                <button
                  key={product}
                  onClick={() => handleProductClick(product)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#F4B448] hover:text-black hover:scale-105"
                >
                  {product}
                </button>
              ))}
            </div>
            <button
              className="bg-[#F4B448] hover:bg-[#F4B448]/90 hover:scale-105 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              onClick={() => router.push("/areal-suite")}
            >
              Explore our Ecosystem →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Turn Real Estate into Crypto",
                description:
                  "Tokenize property investments and convert to various cryptocurrencies.",
                icon: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z",
              },
              {
                title: "Lightning Fast Transactions",
                description:
                  "Revolutionizing liquidity with ArealPay's blockchain technology.",
                icon: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z",
              },
              {
                title: "Spend Your Property Portfolio",
                description:
                  "Make your real estate assets liquid enough to spend on everyday goods and services through crypto.",
                icon: "M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h6zM4 14a2 2 0 002 2h8a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2z",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="suite-card bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-[#F4B448] hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#F4B448] rounded-lg mb-6 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="h-px bg-[#F4B448]/30"></div>
      </div>

      {/* Partners Section */}
      <section id="partners" ref={partnersRef} className="py-20 px-4">
        <Collaborators />
      </section>

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="h-px bg-[#F4B448]/30"></div>
      </div>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">FAQ</h2>
            <p className="text-gray-400">
              Before You Ask, We've Tokenized the Answer.
            </p>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <div key={i} className="faq-item">
                  <AccordionItem
                    value={`item-${i}`}
                    className="bg-gray-800/50 rounded-lg border border-gray-700 data-[state=open]:border-[#F4B448]/50 hover:border-[#F4B448]/30 transition-colors duration-300"
                  >
                    <AccordionTrigger className="p-6 text-left font-semibold text-white hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-400">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => router.push("/faqs")}
            className="hover:scale-105 transition-transform duration-300"
          >
            More FAQ
          </Button>
        </div>
      </section>

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="h-px bg-[#F4B448]/30"></div>
      </div>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="py-20 px-4 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            The Opportunity to Invest in Real Assets on Blockchain is Here
          </h2>
          <h2 className="text-3xl font-bold text-white mb-8">
            Don't Miss the Opportunity
          </h2>
          <button
            className="bg-[#F4B448] hover:bg-[#F4B448]/90 hover:scale-105 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300"
            onClick={() => router.push("/contact")}
          >
            Join the Movement
          </button>
        </div>
      </section>
    </Layout>
  );
}
