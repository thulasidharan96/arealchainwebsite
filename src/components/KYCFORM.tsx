// components/KYCForm.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
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
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
  } = useKycSubmission();
  const router = useRouter();

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
    if (!fullName || !country || !idType || !frontImage || !backImage) {
      return alert("Please fill all fields and upload both ID images.");
    }

    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("country", country);
    formData.append("idType", idType); // Changed from "idProof" to "idType"

    // Try with array notation
    formData.append("images[0]", frontImage); // Front image at index 0
    formData.append("images[1]", backImage); // Back image at index 1

    mutate(formData);
  };

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
          {isSuccess && (
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
