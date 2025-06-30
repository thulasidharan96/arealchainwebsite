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

const ProductPage = () => {
  const product = {
    name: "ArealPay",
    subtitle: "Seamlessly Transact and Pay with Your Real World Assets.",
    description:
      "ArealPay is a revolutionary payment gateway that bridges the gap between your digital asset portfolio and real-world commerce. Spend the value of your tokenized assets instantly and securely, anywhere in the world.",
    features: [
      "Spend your RWA-backed tokens directly at participating merchants.",
      "Instantaneous, low-cost cross-border payments.",
      "Integrated crypto-to-fiat off-ramps for ultimate flexibility.",
      "Secure escrow services for high-value transactions.",
      "NFC and QR code-based payment solutions for retail.",
      "Developer APIs to integrate ArealPay into your applications.",
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
                    src="/ArealSuite/arealpay1.png"
                    alt="ArealPay Product Image"
                    width={400}
                    height={400}
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
                      Be the first to experience the future of payments. Join
                      the {product.name} waitlist for exclusive access and
                      partner integrations.
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
