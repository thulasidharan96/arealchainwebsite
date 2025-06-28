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

const ProductPage = () => {
  const product = {
    name: "Areal Launchpad",
    subtitle:
      "An Innovative Property Launchpad for Initial Real Estate Offerings (IREO), Making Real Estate Investing Accessible for Everyone.",
    description:
      "Areal Launchpad provides a secure and compliant platform for real estate developers and asset owners to raise capital by tokenizing their projects. We connect innovative projects with a global network of investors looking for the next big opportunity in real estate.",
    features: [
      "Full-service project incubation and advisory.",
      "Secure and audited smart contracts for token launches.",
      "Access to Areal's global community of investors.",
      "Streamlined compliance and legal frameworks.",
      "Marketing and PR support for successful launches.",
      "Transparent and fair allocation models.",
    ],
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
                    src="/ArealSuite/launchpad1.png"
                    alt="Product Image"
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
                      Be the first to know when the {product.name} goes live.
                      Join the waitlist for exclusive updates, early access, and
                      special opportunities.
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
