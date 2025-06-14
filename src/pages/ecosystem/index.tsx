import Layout from "@/src/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export default function Ecosystem() {
  const products = [
    {
      name: "LaunchX",
      description:
        "Revolutionary launchpad for real estate projects and tokenized properties.",
      features: ["Project Incubation", "Token Launch", "Community Building"],
    },
    {
      name: "PropXChange",
      description:
        "Decentralized exchange for trading tokenized real estate assets.",
      features: ["Asset Trading", "Liquidity Pools", "Price Discovery"],
    },
    {
      name: "TokenizeX",
      description:
        "Platform for tokenizing real estate assets and creating digital ownership.",
      features: ["Asset Tokenization", "Smart Contracts", "Compliance Tools"],
    },
    {
      name: "Areal Pay",
      description:
        "Payment solution for real estate transactions using cryptocurrency.",
      features: [
        "Crypto Payments",
        "Escrow Services",
        "Multi-currency Support",
      ],
    },
    {
      name: "CapitalX",
      description:
        "Investment platform connecting investors with real estate opportunities.",
      features: [
        "Investment Matching",
        "Portfolio Management",
        "Risk Assessment",
      ],
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                The Areal Ecosystem
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                A comprehensive suite of products and services designed to
                revolutionize the real estate industry through blockchain
                technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-white text-xl">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-gray-300 flex items-center"
                        >
                          <div className="w-2 h-2 bg-[#F4B448] rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold"
              >
                Explore All Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
