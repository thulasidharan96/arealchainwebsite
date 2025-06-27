import Layout from "@/src/components/layout";
import Hero from "@/src/components/hero";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, easeOut } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { properties } from "@/src/data/properties";
import type { Variants } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const partners = [
    { name: "Google", src: "/partners/google.png" },
    { name: "Meta", src: "/partners/meta.png" },
    { name: "GitHub", src: "/partners/github.png" },
    { name: "Binance", src: "/partners/binance.png" },
    { name: "Chainlink", src: "/partners/chainlink.png" },
    { name: "Polygon", src: "/partners/polygon.png" },
    { name: "AWS", src: "/partners/aws.png" },
    { name: "Microsoft", src: "/partners/microsoft.png" },
    { name: "Solana", src: "/partners/solana.png" },
    { name: "Coinbase", src: "/partners/coinbase.png" },
  ];

  const handleProductClick = (product: string) => {
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
    { value: 10, suffix: "x", label: "Project Growth", prefix: "" },
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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const bounceIn: Variants = {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        duration: 0.8,
        bounce: 0.5,
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

  const cardHover: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const textReveal: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
      </motion.section>

      {/* Special Stats Section */}
      <motion.section
        className="py-20 px-4 bg-gray-900/30"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-white mb-16"
            variants={fadeInUp}
          >
            What makes AREAL Special?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white text-left"
            variants={staggerContainer}
          >
            {specialStats.map((item, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/60 p-6 rounded-xl"
                variants={bounceIn}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(244, 180, 72, 0.3)",
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <motion.h3
                  className="text-4xl font-extrabold text-[#F4B448] mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    duration: 0.8,
                    delay: i * 0.1,
                    bounce: 0.6,
                  }}
                >
                  {item.prefix}
                  <span className="counter" data-value={item.value}>
                    {item.value}
                  </span>
                  {item.suffix}
                </motion.h3>
                <motion.p className="text-gray-300" variants={textReveal}>
                  {item.label}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section
        className="py-20 px-4 bg-gray-900/20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto text-center justify-center">
          <motion.h2
            className="text-3xl font-bold text-white mb-12"
            variants={fadeInUp}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
          >
            {properties.map((property, i) => (
              <motion.div
                key={property.id}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <Link
                  href={`/property/${property.id}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl hover:border-[#F4B448] hover:shadow-[0_0_20px_#F4B448] transition-all p-6 text-left w-full max-w-sm block"
                >
                  <motion.div
                    className="aspect-[4/3] w-full overflow-hidden rounded-lg mb-4 relative"
                    variants={cardHover}
                  >
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold text-white"
                    variants={textReveal}
                  >
                    {property.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-400 text-sm mb-2"
                    variants={textReveal}
                  >
                    {property.location}
                  </motion.p>
                  <motion.p
                    className="text-yellow-400 text-sm"
                    variants={textReveal}
                  >
                    {property.price}
                  </motion.p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Areal Suite Section */}
      <motion.section
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              The Areal Suite
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg max-w-3xl mx-auto mb-8"
              variants={fadeInUp}
            >
              At AREAL, we provide more than just a platform - we offer a
              comprehensive suite of products designed to tokenize and
              democratize Real World Assets.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              variants={staggerContainer}
            >
              {[
                "Areal TaaS",
                "Areal Mortgage",
                "Launchpad",
                "ArealPay",
                "Areal Marketplace",
              ].map((product, i) => (
                <motion.button
                  key={product}
                  onClick={() => handleProductClick(product)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-full"
                  variants={bounceIn}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#F4B448",
                    color: "#000",
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {product}
                </motion.button>
              ))}
            </motion.div>
            <motion.button
              className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-3 rounded-lg"
              variants={bounceIn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(244, 180, 72, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore our Ecosystem →
            </motion.button>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
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
              <motion.div
                key={i}
                className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 transition-all duration-500 ease-in-out hover:border-[#F4B448] hover:border-2 hover:scale-102 hover:shadow-[0_0_25px_#F4B448]"
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <motion.div
                  className="w-12 h-12 bg-[#F4B448] rounded-lg mb-6 flex items-center justify-center"
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.8 },
                  }}
                >
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d={feature.icon} />
                  </svg>
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold text-white mb-4"
                  variants={textReveal}
                >
                  {feature.title}
                </motion.h3>
                <motion.p className="text-gray-400" variants={textReveal}>
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        className="py-20 px-4 bg-gray-900/30"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-2xl font-bold text-white mb-4"
            variants={fadeInUp}
          >
            Partner and Collaborators
          </motion.h2>
          <motion.p className="text-gray-400 mb-12" variants={fadeInUp}>
            Building the Future of Crypto Real Estate with our Network of
            Trusted Blockchain Partners
          </motion.p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center"
            variants={staggerContainer}
          >
            {[
              { name: "Google", src: "/partners/google.png" },
              { name: "Meta", src: "/partners/meta.png" },
              { name: "GitHub", src: "/partners/github.png" },
              { name: "AWS", src: "/partners/aws.png" },
              { name: "Microsoft", src: "/partners/microsoft.png" },
              { name: "Binance", src: "/partners/binance.png" },
              { name: "Chainlink", src: "/partners/chainlink.png" },
              { name: "CoinGecko", src: "/partners/coingecko.png" },
              { name: "Solana", src: "/partners/solana.png" },
              { name: "Coinbase", src: "/partners/coinbase.png" },
            ].map((partner, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-center h-20"
                variants={bounceIn}
                whileHover={{
                  scale: 1.1,
                  transition: {
                    scale: { type: "spring", stiffness: 300 },
                  },
                }}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={200}
                  height={200}
                  className="max-h-10 object-contain hover:scale-105 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-white mb-4"
              variants={fadeInUp}
            >
              FAQ
            </motion.h2>
            <motion.p className="text-gray-400" variants={fadeInUp}>
              Everything you need to know
            </motion.p>
          </div>
          <motion.div variants={staggerContainer}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <motion.div key={i} variants={fadeInLeft}>
                  <AccordionItem
                    value={`item-${i}`}
                    className="bg-gray-800/50 rounded-lg border border-gray-700 data-[state=open]:border-[#F4B448]/50"
                  >
                    <AccordionTrigger className="p-6 text-left font-semibold text-white hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-400">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-20 px-4 mb-10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.p className="text-gray-400 mb-4" variants={fadeInUp}>
            Don't miss out on the future of crypto real estate investment.
          </motion.p>
          <motion.h2
            className="text-4xl font-bold text-white mb-8"
            variants={fadeInUp}
          >
            Ready to Start Your Crypto Real Estate Journey?
          </motion.h2>
          <motion.button
            className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-8 py-4 rounded-lg text-lg"
            onClick={() => (window.location.href = "/contact")}
            variants={bounceIn}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 40px rgba(244, 180, 72, 0.4)",
              transition: { type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Revolution →
          </motion.button>
        </div>
      </motion.section>
    </Layout>
  );
}
