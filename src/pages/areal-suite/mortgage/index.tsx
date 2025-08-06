import Layout from "@/src/components/layout";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion
import { useRouter } from "next/router";
import Head from "next/head";

const ProductPage = () => {
  const product = {
    name: "Areal Mortgage",
    subtitle:
      "Unlock the Liquidity of Your Digital Assets with RWA-Backed Loans.",
    description:
      "Areal Mortgage lets you access instant liquidity by using your tokenized real-world assets as collateral .Access liquidity when you need it — while your investments continue to grow in value.",
    features: [
      "Obtain loans backed by your tokenized real estate portfolio.",
      "Competitive, transparent interest rates powered by DeFi protocols.",
      "Flexible and dynamic Loan-to-Value (LTV) ratios.",
      "Automated approval and management process via smart contracts.",
      "No lengthy paperwork or traditional credit checks.",
      "Transparent on-chain loan monitoring and repayment.",
    ],
  };

  const router = useRouter();

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

  return (
    <Layout>
      <Head>
        <title>Buy Property in Dubai for Investment | Secure ROI</title>
        <meta
          name="description"
          content="Looking to buy property in Dubai for investment? Explore top real estate options with high ROI, tax benefits & investor-friendly policies. Start today!"
        />
        <meta
          property="og:title"
          content="Buy Property in Dubai for Investment | Secure ROI"
        />
        <meta
          property="og:description"
          content="Looking to buy property in Dubai for investment? Explore top real estate options with high ROI, tax benefits & investor-friendly policies. Start today!"
        />
        <meta property="og:image" content="/properties/property1.avif" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-transparent">
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header with animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold text-white mb-6">
                {product.name}
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                {product.subtitle}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Description & Features with animation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="space-y-8"
              >
                <p className="text-lg text-gray-300 leading-relaxed">
                  {product.description}
                </p>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Key Features
                  </h3>
                  <ul className="space-y-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-[#F4B448] rounded-full flex items-center justify-center mr-4 mt-1">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Waitlist CTA with bounce animation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0], // Bouncing effect
                  }}
                  transition={{
                    repeat: Infinity, // Loop the animation
                    repeatType: "loop",
                    duration: 2.5, // Increased duration for slower bounce
                  }}
                  className="flex justify-center"
                >
                  <Image
                    src="/ArealSuite/mortgage1.png"
                    alt="Areal Mortgage Product Image"
                    width={500}
                    height={500}
                  />
                </motion.div>

                <Card className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl text-center">
                      Get Early Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-400 mb-6">
                      Unlock the future of lending. Join the {product.name}{" "}
                      waitlist to be first in line for RWA-backed financial
                      products.
                    </p>
                    <Link href="/contact" passHref>
                      <Button
                        size="lg"
                        className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold"
                      >
                        Join the Waitlist
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 m-8">
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
                className="bg-gray-800 text-white px-4 py-2 rounded-md transition-colors hover:bg-[#F4B448] hover:text-black"
              >
                {product}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
