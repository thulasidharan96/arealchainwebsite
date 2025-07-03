import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "@/src/components/layout";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { CheckCircle2, Lock, ChevronDown } from "lucide-react";
import SplineConntact from "@/src/components/SplineContact";

const contactTypes = [
  { value: "retail-customer", label: "Retail Customer" },
  { value: "investor", label: "Investor" },
  { value: "ib", label: "IB" },
  { value: "exchange", label: "Exchange" },
  { value: "influencer", label: "Influencer" },
  { value: "others", label: "Others" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDropdownSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, contactType: value }));
    setDropdownOpen(false);
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
      setFormData({ fullName: "", email: "", contactType: "", message: "" });
    } else {
      setStatusMessage("❌ Something went wrong. Please try again.");
    }
  };

  const getSelectedLabel = () => {
    const selected = contactTypes.find(
      (type) => type.value === formData.contactType
    );
    return selected ? selected.label : "Select contact type";
  };

  return (
    <Layout>
      <div className="relative z-0">
        <SplineConntact /> {/* fixed, always in background */}
        <div className="relative z-10">
          <div className="min-h-screen bg-transparent">
            <div className="pt-32 pb-20 px-4">
              <div className="max-w-6xl mx-auto">
                <Card className="grid lg:grid-cols-2 gap-12 items-center !border-none bg-black/50 rounded-3xl backdrop-blur-3xl overflow-hidden">
                  {/* Left side form */}
                  <div className="p-8 md:p-12 border-b lg:border-b-0  border-gray-800">
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
                          className="bg-transparent border-white border-2 rounded-3xl text-white !placeholder-white/50 focus:border-[#F4B448] focus:ring-[#F4B448]"
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
                          className="bg-transparent border-white border-2 rounded-3xl text-white !placeholder-white/50 focus:border-[#F4B448] focus:ring-[#F4B448]"
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-white font-medium mb-2 block">
                          Contact Type<span className="text-[#F4B448]">*</span>
                        </Label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full bg-transparent border-white border-2 rounded-3xl text-white px-4 py-2 text-left focus:border-[#F4B448] focus:ring-[#F4B448] focus:outline-none flex items-center justify-between"
                          >
                            <span
                              className={
                                formData.contactType
                                  ? "text-white"
                                  : "text-white/50"
                              }
                            >
                              {getSelectedLabel()}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                dropdownOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {dropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-white/20 rounded-2xl backdrop-blur-sm z-50 overflow-hidden">
                              {contactTypes.map((type) => (
                                <button
                                  key={type.value}
                                  type="button"
                                  onClick={() =>
                                    handleDropdownSelect(type.value)
                                  }
                                  className="w-full px-4 py-3 text-left text-white hover:bg-[#F4B448]/20 transition-colors border-b border-white/10 last:border-b-0"
                                >
                                  {type.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="message"
                          className="text-white font-medium mb-2 block"
                        >
                          Message<span className="text-[#F4B448]">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-transparent border-white border-2 rounded-3xl text-white !placeholder-white/50 focus:border-[#F4B448] focus:ring-[#F4B448] min-h-[120px] resize-none"
                          placeholder="Tell us about your inquiry or project..."
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
                        disabled={loading || !formData.contactType}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </Button>

                      <div className="flex items-center justify-center gap-3 mt-4 text-gray-50 text-xs">
                        <Lock className="w-4 h-4" />
                        <span>Your details are 100% Private and Secure.</span>
                      </div>
                    </form>
                  </div>

                  {/* Right side content */}
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
                          <h3 className="font-semibold text-lg">
                            Support & Queries
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Reach out for any questions related to our platform,
                            partnerships or listings.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#F4B448] mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg">
                            Direct Access
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Get connected with a real human, not an automated
                            chatbot.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
