// components/KYCForm.tsx
"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import Layout from "@/src/components/layout";
import { useKycSubmission } from "@/src/hooks/useKycSubmission";

export default function KYCForm() {
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [idType, setIdType] = useState("passport");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isKycAlreadySubmitted, setIsKycAlreadySubmitted] = useState(false);
  const [kycStatus, setKycStatus] = useState<string>("");

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

  // If KYC is already submitted, show a different UI
  if (isKycAlreadySubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
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
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Country */}
          <div>
            <Label
              htmlFor="country"
              className="text-white font-medium block mb-2"
            >
              Country<span className="text-[#F4B448]">*</span>
            </Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="Enter your country"
              className="bg-gray-800 border-gray-700 text-white"
            />
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
              className="bg-gray-800 border border-gray-700 text-white p-2 rounded-md w-full"
            >
              <option value="passport">Passport</option>
              <option value="driving_licence">Driving Licence</option>
              <option value="other">Other</option>
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
              className="bg-gray-800 text-white border-gray-700"
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
              className="bg-gray-800 text-white border-gray-700"
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
