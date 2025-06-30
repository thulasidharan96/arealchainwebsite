import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "@/src/components/layout";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { CheckCircle2, Lock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
      setStatusMessage("✅ Our team will reach out to you shortly.");
      setFormData({ fullName: "", email: "" });
    } else {
      setStatusMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center text-white bg-transparent pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl shadow-[#F4B448]/10 backdrop-blur-sm overflow-hidden">
            {/* Left side content */}
            <div className="p-8 md:p-12 space-y-6">
              <h1 className="text-5xl font-extrabold leading-tight text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-yellow-300 via-[#F4B448] to-yellow-300 bg-[length:200%_200%]">
                Get in Touch
              </h1>
              <h2 className="text-3xl font-bold">
                Connect with Areal's Team
                <br />
                <span className="text-gray-400 text-lg font-normal">
                  We're here to answer your questions.
                </span>
              </h2>

              <div className="pt-4 border-t-2 border-[#F4B448]/30 space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#F4B448] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Support & Queries</h3>
                    <p className="text-gray-400 text-sm">
                      Reach out for any questions related to our platform,
                      partnerships or listings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#F4B448] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Direct Access</h3>
                    <p className="text-gray-400 text-sm">
                      Get connected with a real human, not an automated chatbot.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-white text-center">
                  Leave Your Details
                </h3>
                <p className="text-sm text-center text-gray-400">
                  Our team will reach you.
                </p>

                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-white font-medium mb-2 block"
                  >
                    Name<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448]"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-white font-medium mb-2 block"
                  >
                    Email<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448]"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {statusMessage && (
                  <div
                    className={`text-sm text-center ${
                      submitted ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-bold text-base py-3 transition-transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>

                <div className="flex items-center justify-center gap-3 mt-4 text-gray-500 text-xs">
                  <Lock className="w-4 h-4" />
                  <span>Your details are 100% Private and Secure.</span>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
