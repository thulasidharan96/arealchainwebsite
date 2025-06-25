// components/KYCForm.tsx
"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useKycSubmission } from "@/src/hooks/useKycSubmission";
import Image from "next/image";

export default function KYCForm() {
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [idType, setIdType] = useState("passport");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isKycAlreadySubmitted, setIsKycAlreadySubmitted] = useState(false);
  const [kycStatus, setKycStatus] = useState<string>("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] =
    useState<boolean>(false);

  const countries = [
    {
      code: "US",
      name: "United States",
      flag: "🇺🇸",
      flagUrl: "https://flagcdn.com/us.svg",
    },
    {
      code: "GB",
      name: "United Kingdom",
      flag: "🇬🇧",
      flagUrl: "https://flagcdn.com/gb.svg",
    },
    {
      code: "CA",
      name: "Canada",
      flag: "🇨🇦",
      flagUrl: "https://flagcdn.com/ca.svg",
    },
    {
      code: "AU",
      name: "Australia",
      flag: "🇦🇺",
      flagUrl: "https://flagcdn.com/au.svg",
    },
    {
      code: "DE",
      name: "Germany",
      flag: "🇩🇪",
      flagUrl: "https://flagcdn.com/de.svg",
    },
    {
      code: "FR",
      name: "France",
      flag: "🇫🇷",
      flagUrl: "https://flagcdn.com/fr.svg",
    },
    {
      code: "IT",
      name: "Italy",
      flag: "🇮🇹",
      flagUrl: "https://flagcdn.com/it.svg",
    },
    {
      code: "ES",
      name: "Spain",
      flag: "🇪🇸",
      flagUrl: "https://flagcdn.com/es.svg",
    },
    {
      code: "NL",
      name: "Netherlands",
      flag: "🇳🇱",
      flagUrl: "https://flagcdn.com/nl.svg",
    },
    {
      code: "SE",
      name: "Sweden",
      flag: "🇸🇪",
      flagUrl: "https://flagcdn.com/se.svg",
    },
    {
      code: "NO",
      name: "Norway",
      flag: "🇳🇴",
      flagUrl: "https://flagcdn.com/no.svg",
    },
    {
      code: "DK",
      name: "Denmark",
      flag: "🇩🇰",
      flagUrl: "https://flagcdn.com/dk.svg",
    },
    {
      code: "FI",
      name: "Finland",
      flag: "🇫🇮",
      flagUrl: "https://flagcdn.com/fi.svg",
    },
    {
      code: "CH",
      name: "Switzerland",
      flag: "🇨🇭",
      flagUrl: "https://flagcdn.com/ch.svg",
    },
    {
      code: "AT",
      name: "Austria",
      flag: "🇦🇹",
      flagUrl: "https://flagcdn.com/at.svg",
    },
    {
      code: "BE",
      name: "Belgium",
      flag: "🇧🇪",
      flagUrl: "https://flagcdn.com/be.svg",
    },
    {
      code: "JP",
      name: "Japan",
      flag: "🇯🇵",
      flagUrl: "https://flagcdn.com/jp.svg",
    },
    {
      code: "KR",
      name: "South Korea",
      flag: "🇰🇷",
      flagUrl: "https://flagcdn.com/kr.svg",
    },
    {
      code: "SG",
      name: "Singapore",
      flag: "🇸🇬",
      flagUrl: "https://flagcdn.com/sg.svg",
    },
    {
      code: "HK",
      name: "Hong Kong",
      flag: "🇭🇰",
      flagUrl: "https://flagcdn.com/hk.svg",
    },
    {
      code: "IN",
      name: "India",
      flag: "🇮🇳",
      flagUrl: "https://flagcdn.com/in.svg",
    },
    {
      code: "CN",
      name: "China",
      flag: "🇨🇳",
      flagUrl: "https://flagcdn.com/cn.svg",
    },
    {
      code: "BR",
      name: "Brazil",
      flag: "🇧🇷",
      flagUrl: "https://flagcdn.com/br.svg",
    },
    {
      code: "MX",
      name: "Mexico",
      flag: "🇲🇽",
      flagUrl: "https://flagcdn.com/mx.svg",
    },
    {
      code: "AR",
      name: "Argentina",
      flag: "🇦🇷",
      flagUrl: "https://flagcdn.com/ar.svg",
    },
    {
      code: "CL",
      name: "Chile",
      flag: "🇨🇱",
      flagUrl: "https://flagcdn.com/cl.svg",
    },
    {
      code: "ZA",
      name: "South Africa",
      flag: "🇿🇦",
      flagUrl: "https://flagcdn.com/za.svg",
    },
    {
      code: "AE",
      name: "United Arab Emirates",
      flag: "🇦🇪",
      flagUrl: "https://flagcdn.com/ae.svg",
    },
    {
      code: "SA",
      name: "Saudi Arabia",
      flag: "🇸🇦",
      flagUrl: "https://flagcdn.com/sa.svg",
    },
    {
      code: "IL",
      name: "Israel",
      flag: "🇮🇱",
      flagUrl: "https://flagcdn.com/il.svg",
    },
  ];

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
    data: mutationData,
  } = useKycSubmission();
  const router = useRouter();

  // Handle mutation response
  useEffect(() => {
    if (mutationData) {
      if (mutationData.isAlreadySubmitted) {
        setIsKycAlreadySubmitted(true);
        setKycStatus(mutationData.status || "Waiting for approval");
        setError("");
      } else if (mutationData.success) {
        // Handle successful submission
        setError("");
      }
    }
  }, [mutationData]);

  // Handle mutation error (for actual errors, not "already submitted")
  useEffect(() => {
    if (mutationError) {
      setError(mutationError.message);
    }
  }, [mutationError]);

  const validateFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file.size > maxSize) {
      setError("File size should be less than 5MB");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPEG, JPG, and PNG files are allowed");
      return false;
    }

    return true;
  };

  const handleFrontImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && validateFile(file)) {
      setFrontImage(file);
      setError("");
    } else if (file) {
      setFrontImage(null);
    }
  };

  const handleBackImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && validateFile(file)) {
      setBackImage(file);
      setError("");
    } else if (file) {
      setBackImage(null);
    }
  };

  const handleCountrySelect = (selectedCountryCode: string) => {
    setCountry(selectedCountryCode);
    setIsCountryDropdownOpen(false);
  };

  const selectedCountryData = countries.find((c) => c.code === country);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Reset previous states
    setError("");
    setIsKycAlreadySubmitted(false);

    if (!fullName || !country || !idType || !frontImage || !backImage) {
      setError("Please fill all fields and upload both ID images.");
      return;
    }

    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("country", country);
    formData.append("idProof", idType);

    // Append images as an array
    formData.append("images", frontImage);
    formData.append("images", backImage);

    mutate(formData);
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    if (isSuccess && mutationData?.success) {
      const timer = setTimeout(() => {
        router.reload(); // Reload the page
      }, 2000); // wait for 2 seconds before reload

      return () => clearTimeout(timer); // cleanup
    }
  }, [isSuccess, mutationData, router]);

  // If KYC is already submitted, show a different UI
  if (isKycAlreadySubmitted) {
    return (
      <div className="flex items-center justify-center mt-10 px-4">
        <Card className="w-full max-w-2xl bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg shadow-[#F4B448]/10 backdrop-blur-sm p-8 md:p-12 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              KYC Already Submitted
            </h1>
            <p className="text-gray-300 mb-2">
              Your KYC details have already been submitted and are currently
              being reviewed.
            </p>
            <p className="text-yellow-400 font-medium">Status: {kycStatus}</p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              We'll notify you once your KYC verification is complete. This
              process typically takes 1-3 business days.
            </p>

            <Button
              onClick={handleGoToDashboard}
              className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base transition-colors"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center pt-12 pb-12 px-4">
      <Card className="w-full max-w-3xl bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg shadow-[#F4B448]/10 backdrop-blur-sm p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Submit Your KYC
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <Label
              htmlFor="fullName"
              className="text-white font-medium block mb-2"
            >
              Full Name<span className="text-[#F4B448]">*</span>
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors"
            />
          </div>

          {/* Country Dropdown */}
          <div>
            <Label className="text-white font-medium mb-2 block">
              Country<span className="text-[#F4B448]">*</span>
            </Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="w-full bg-gray-800 border border-gray-700 text-left text-white focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors flex items-center justify-between"
              >
                <span className="flex items-center space-x-3">
                  {selectedCountryData ? (
                    <>
                      <Image
                        width={20}
                        height={20}
                        src={selectedCountryData.flagUrl}
                        alt={`${selectedCountryData.name} flag`}
                        className="w-6 h-4 object-cover rounded-sm"
                      />
                      <span>{selectedCountryData.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-500">Select your country</span>
                  )}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isCountryDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg backdrop-blur-sm z-50 max-h-60 overflow-y-auto shadow-xl">
                  {countries.map((countryItem) => (
                    <button
                      key={countryItem.code}
                      type="button"
                      onClick={() => handleCountrySelect(countryItem.code)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center space-x-3 text-white border-b border-gray-700 last:border-b-0"
                    >
                      <Image
                        width={20}
                        height={20}
                        src={countryItem.flagUrl}
                        alt={`${countryItem.name} flag`}
                        className="w-6 h-4 object-cover rounded-sm"
                      />
                      <span>{countryItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ID Type */}
          <div>
            <Label
              htmlFor="idType"
              className="text-white font-medium block mb-2"
            >
              ID Proof Type<span className="text-[#F4B448]">*</span>
            </Label>
            <select
              id="idType"
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors"
            >
              <option value="passport">Passport</option>
              <option value="driving_licence">Driving Licence</option>
              {/* <option value="other">Other</option> */}
            </select>
          </div>

          {/* Front Image */}
          <div>
            <Label className="text-white font-medium block mb-2">
              Upload Front Side<span className="text-[#F4B448]">*</span>
            </Label>
            <Input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFrontImageChange}
              required
              className="bg-gray-800 text-white border-gray-700 focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] transition-colors"
            />
            {frontImage && (
              <p className="text-green-400 text-sm mt-1">
                ✓ {frontImage.name} selected
              </p>
            )}
          </div>

          {/* Back Image */}
          <div>
            <Label className="text-white font-medium block mb-2">
              Upload Back Side<span className="text-[#F4B448]">*</span>
            </Label>
            <Input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleBackImageChange}
              required
              className="bg-gray-800 text-white border-gray-700 focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] transition-colors"
            />
            {backImage && (
              <p className="text-green-400 text-sm mt-1">
                ✓ {backImage.name} selected
              </p>
            )}
          </div>

          {/* Status */}
          {(isError || error) && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400">
              {error || "Something went wrong. Please try again."}
            </div>
          )}
          {isSuccess && mutationData?.success && (
            <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg text-sm text-green-400">
              KYC submitted successfully!
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
          >
            {isPending ? "Submitting..." : "Submit KYC"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
