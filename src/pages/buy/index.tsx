import React, { useState } from "react";
import LayoutMain from "@/src/components/dashboard/layoutMain";
import { useWallet } from "@/src/hooks/useWallet";
import { ArrowRightLeft, Info } from "lucide-react";

const BuyArealCoin = () => {
  const { address, balance } = useWallet();
  const [formData, setFormData] = useState({
    amount: "",
    receiving: "",
    paymentMethod: "usdt",
    agreedToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      receiving:
        name === "amount"
          ? (parseFloat(value || "0") * 0.5).toFixed(2).toString()
          : prev.receiving,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing purchase:", formData);
  };

  return (
    <LayoutMain>
      <div className="min-h-screen py-10 bg-gradient-to-b from-black to-gray-900 text-gold-500">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black border border-gold-700 rounded-xl shadow-xl p-8">
            <h1 className="text-4xl font-bold text-center mb-10 text-gold-500">
              Buy Areal Coin
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-gray-900 border border-gold-700 p-6 rounded-lg">
                <label className="block text-sm font-medium mb-2">
                  Amount (USDT)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder:text-gold-600 focus:ring-2 focus:ring-gold-500 border border-gold-700"
                    placeholder="Enter USDT amount"
                    required
                  />
                  <div className="absolute right-4 top-4 text-gold-400">
                    USDT
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="p-3 bg-gold-700 rounded-full">
                  <ArrowRightLeft className="text-black" />
                </div>
              </div>

              <div className="bg-gray-900 border border-gold-700 p-6 rounded-lg">
                <label className="block text-sm font-medium mb-2">
                  You Receive (AREAL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.receiving}
                    className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gold-700"
                    readOnly
                    placeholder="0.00"
                  />
                  <div className="absolute right-4 top-4 text-gold-400">
                    AREAL
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gold-700 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Select Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "USDT", value: "usdt", icon: "/usdt-icon.png" },
                    {
                      label: "Credit Card",
                      value: "card",
                      icon: "/card-icon.png",
                    },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:border-gold-500 transition-colors ${
                        formData.paymentMethod === method.value
                          ? "border-gold-600"
                          : "border-gold-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={handleInputChange}
                          className="mr-3 accent-gold-600"
                        />
                        <span>{method.label}</span>
                      </div>
                      <img
                        src={method.icon}
                        alt={method.label}
                        className="h-6 w-6"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="accent-gold-600 mt-1"
                  required
                />
                <label className="text-sm text-gold-400">
                  I agree to the terms and conditions and understand that
                  cryptocurrency transactions are irreversible.
                </label>
              </div>

              <div className="bg-gray-800 border border-gold-700 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <Info className="text-gold-500 w-5 h-5" />
                  <h3 className="font-semibold text-gold-400">
                    Transaction Summary
                  </h3>
                </div>
                <div className="text-sm text-gold-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Exchange Rate</span>
                    <span>1 USDT = 0.5 AREAL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Fee</span>
                    <span>0.1%</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gold-200">
                    <span>Total Amount</span>
                    <span>{formData.amount || "0"} USDT</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.agreedToTerms}
                className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors text-[#fef9f9]
                  ${
                    formData.agreedToTerms
                      ? "bg-gold-500 hover:bg-gold-600"
                      : "bg-gold-800 cursor-not-allowed"
                  }`}
              >
                Complete Purchase
              </button>
            </form>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
};

export default BuyArealCoin;
