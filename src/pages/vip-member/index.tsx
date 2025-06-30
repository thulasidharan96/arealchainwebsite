// pages/join.tsx
import { useState } from "react";
import Layout from "@/src/components/layout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { CheckCircle2, Lock, Star } from "lucide-react";

export default function VipMember() {
  const benefits = [
    {
      title: "Early Access",
      description: "Be the first to invest in premier RWA listings.",
    },
    {
      title: "Exclusive Airdrops",
      description: "Receive special airdrops of Areal's native token.",
    },
    {
      title: "Reduced Fees",
      description: "Enjoy lower transaction fees across the Areal Suite.",
    },
    {
      title: "Direct Insights",
      description: "Get direct access to our research & analysis team.",
    },
    {
      title: "VIP Support",
      description: "Access a dedicated, priority support channel.",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    terms: false,
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.terms) {
      setStatus("You must agree to receive updates.");
      return;
    }

    setStatus("Submitting...");

    const res = await fetch("/api/elite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-yellow-300 via-[#F4B448] to-yellow-300 bg-[length:200%_200%]">
                Areal ELITE Club
              </h1>
              <h2 className="text-4xl font-bold">
                Unlock the Inner Circle.
                <br />
                <span className="text-gray-400">Become an Areal ELITE.</span>
              </h2>
              <div className="space-y-4 pt-4 border-t-2 border-[#F4B448]/30">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#F4B448] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-transparent border border-gray-800 rounded-2xl shadow-2xl shadow-[#F4B448]/10 p-8 backdrop-blur-sm">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Join the ELITE Club
                </h3>
                <p className="text-gray-400 mt-2">
                  Submit your details to enter the selection process.
                </p>
                <p className="text-[#F4B448] font-semibold text-sm mt-1">
                  (Limited spots for founding members)
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-medium text-gray-300">
                    Name<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-[#F4B448] focus:ring-[#F4B448]"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-medium text-gray-300">
                    Email<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-[#F4B448] focus:ring-[#F4B448]"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-medium text-gray-300">
                    Phone<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-[#F4B448] focus:ring-[#F4B448]"
                  />
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        terms: checked === true,
                      }))
                    }
                    className="border-gray-600 data-[state=checked]:bg-[#F4B448] data-[state=checked]:text-black"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-gray-400 font-medium leading-none cursor-pointer"
                  >
                    Yes, please keep me updated on news, events and offers.
                    <span className="text-[#F4B448]">*</span>
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-bold text-base py-6 transition-transform hover:scale-105"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Apply for ELITE Access
                  <Star className="w-5 h-5 ml-2" />
                </Button>

                {status && (
                  <p className="text-sm text-center text-yellow-400 mt-4">
                    {status}
                  </p>
                )}
              </form>

              <div className="flex items-center justify-center gap-3 mt-6 text-gray-500 text-xs">
                <Lock className="w-4 h-4" />
                <span>Your details are 100% Private and Secure.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
