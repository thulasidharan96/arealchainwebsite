import Layout from "@/src/components/layout";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                {product.name}
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                {product.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Description & Features */}
              <div className="space-y-8">
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
              </div>

              {/* Waitlist CTA */}
              <div>
                <Card className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl text-center">
                      Get Early Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-400 mb-6">
                      Be the first to experience the future of payments. Join the {product.name} waitlist for exclusive access and partner integrations.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;