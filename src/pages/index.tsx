import Layout from "@/src/components/layout";
import Hero from "@/src/components/hero";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { properties } from "@/src/data/properties";

export default function Home() {
  const router = useRouter(); // Use the router for navigation

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

  // Split partners for two rows
  const partnersRow1 = partners.slice(0, 5);
  const partnersRow2 = partners.slice(5);

  return (
    <Layout>
      <Hero />
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-16">
            What makes AREAL Special?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white text-left">
            {specialStats.map((item, i) => (
              <div key={i} className="bg-gray-800/60 p-6 rounded-xl">
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

      {/* Real World Assets (RWA) Section */}
      <section className="py-20 px-4 bg-gray-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Featured Projects
          </h2>
          {/* <div className="flex justify-center"></div> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                href={`/property/${property.id}`}
                key={property.id}
                className="bg-gray-900/50 border border-gray-800 rounded-xl hover:border-[#F4B448] hover:shadow-[0_0_20px_#F4B448] transition-all p-6 text-left"
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
            ))}
          </div>
        </div>
      </section>

      {/* Areal Suite Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              The Areal Suite
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
              At AREAL, we provide more than just a platform - we offer a
              comprehensive suite of products designed to tokenize and
              democratize Real World Assets.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "Areal TaaS",
                "Areal Mortgage",
                "Launchpad",
                "ArealPay",
                "Areal Marketplace",
              ].map((product) => (
                <button
                  key={product}
                  onClick={() => handleProductClick(product)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-full"
                >
                  {product}
                </button>
              ))}
            </div>
            <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-3 rounded-lg">
              Explore our Ecosystem →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 transition-all duration-500 ease-in-out hover:border-[#F4B448] hover:border-2 hover:scale-102 hover:shadow-[0_0_25px_#F4B448]">
              <div className="w-12 h-12 bg-[#F4B448] rounded-lg mb-6 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Turn Real Estate into Crypto
              </h3>
              <p className="text-gray-400">
                Tokenize property investments and convert to various
                cryptocurrencies.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 transition-all duration-500 ease-in-out hover:border-[#F4B448] hover:border-2 hover:scale-102 hover:shadow-[0_0_25px_#F4B448]">
              <div className="w-12 h-12 bg-[#F4B448] rounded-lg mb-6 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Lightning Fast Transactions
              </h3>
              <p className="text-gray-400">
                Revolutionizing liquidity with ArealPay's blockchain technology.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 transition-all duration-500 ease-in-out hover:border-[#F4B448] hover:border-2 hover:scale-102 hover:shadow-[0_0_25px_#F4B448]">
              <div className="w-12 h-12 bg-[#F4B448] rounded-lg mb-6 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h6zM4 14a2 2 0 002 2h8a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Spend Your Property Portfolio
              </h3>
              <p className="text-gray-400">
                Make your real estate assets liquid enough to spend on everyday
                goods and services through crypto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Our trusted partners
          </h2>
          <p className="text-gray-400 mb-12">
            Building the Future of Crypto Real Estate with our Network of
            Trusted Blockchain Partners
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
            {[
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
            ].map((partner, i) => (
              <div
                key={i}
                className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-center h-20"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={200}
                  height={200}
                  className="max-h-10 object-contain  hover:scale-105 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Hidden as requested */}
      {/*
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Testimonials and Endorsements
          </h2>
          <p className="text-gray-400 mb-12">
            Hear what our crypto real estate investor community is saying about
            AREAL:
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="bg-gray-800/50 p-6 rounded-lg">
                <div className="text-gray-400">
                  Investor testimonial placeholder
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">FAQ</h2>
            <p className="text-gray-400">Everything you need to know</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
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
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section bg-gradient-to-r from-[#F4B448]/10 to-yellow-500/10*/}
      <section className="py-20 px-4 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Don't miss out on the future of crypto real estate investment.
          </p>
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Start Your Crypto Real Estate Journey?
          </h2>
          <button
            className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-8 py-4 rounded-lg text-lg"
            onClick={() => (window.location.href = "/contact")}
          >
            Join the Revolution →
          </button>
        </div>
      </section>
    </Layout>
  );
}
