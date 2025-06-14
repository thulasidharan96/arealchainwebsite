import Layout from "@/src/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export default function NFT() {
  const nftCollections = [
    {
      name: "Areal Genesis",
      description:
        "Limited edition NFTs representing founding membership in the Areal ecosystem.",
      supply: "1,000",
      price: "0.5 ETH",
      status: "Live",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Property Deeds",
      description:
        "NFTs representing ownership stakes in tokenized real estate properties.",
      supply: "Variable",
      price: "Market Price",
      status: "Active",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "VIP Access Pass",
      description:
        "Exclusive NFTs granting access to premium features and early investment opportunities.",
      supply: "500",
      price: "1.2 ETH",
      status: "Coming Soon",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  const benefits = [
    "Exclusive access to premium properties",
    "Early investment opportunities",
    "Governance voting rights",
    "Community events and networking",
    "Reduced transaction fees",
    "Priority customer support",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                Areal NFT Collections
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Own unique digital assets that represent real estate ownership,
                membership benefits, and exclusive access to the Areal
                ecosystem.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {nftCollections.map((collection, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-colors"
                >
                  <CardHeader>
                    <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">
                        {collection.name}
                      </CardTitle>
                      <Badge
                        className={
                          collection.status === "Live"
                            ? "bg-green-500"
                            : collection.status === "Active"
                            ? "bg-[#F4B448]"
                            : "bg-gray-500"
                        }
                      >
                        {collection.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      {collection.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Supply:</span>
                        <span className="text-white">{collection.supply}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Price:</span>
                        <span className="text-[#F4B448] font-semibold">
                          {collection.price}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold"
                      disabled={collection.status === "Coming Soon"}
                    >
                      {collection.status === "Coming Soon"
                        ? "Coming Soon"
                        : "View Collection"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">
                  NFT Benefits
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-[#F4B448] rounded-full mr-4"></div>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">
                  How It Works
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#F4B448] rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-black font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Choose Your NFT
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Select from our available collections based on your
                        investment goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#F4B448] rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-black font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Complete Purchase
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Use ETH or other supported cryptocurrencies to purchase
                        your NFT.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#F4B448] rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-black font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Enjoy Benefits
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Access exclusive features and opportunities within the
                        Areal ecosystem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
