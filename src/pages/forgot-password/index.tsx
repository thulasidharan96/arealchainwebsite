import React, { useState, FormEvent, ChangeEvent } from "react";
import Layout from "@/src/components/layout";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { forgotPassword, resetPassword } from "../../services/auth/forgotPasswordService";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [step, setStep] = useState<"email" | "reset">("email");

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const validateResetForm = (): boolean => {
    if (!verifyCode.trim()) {
      setError("Please enter the verification code");
      return false;
    }

    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return false;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await forgotPassword(email);

      if (data.success || data.message?.toLowerCase().includes("sent")) {
        setSuccess("Verification code sent to your email! Please check your inbox.");
        setStep("reset");
      } else {
        setError(data.message || "Failed to send verification code. Please try again.");
      }
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateResetForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await resetPassword({
        userIdentity: email,
        verifyCode,
        newPassword,
        confirmPassword,
      });

      if (data.success || data.message?.toLowerCase().includes("success")) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: "email" | "verifyCode" | "newPassword" | "confirmPassword") => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "verifyCode":
        setVerifyCode(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
        <Card className="w-full max-w-2xl bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl shadow-[#F4B448]/10 backdrop-blur-sm overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-8">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={loading}
              >
                <ArrowLeft size={20} />
              </button>
              <span className="text-gray-400 text-sm">Back to login</span>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {step === "email" ? "Forgot Password?" : "Reset Your Password"}
              </h1>
              <p className="text-gray-400 text-lg">
                {step === "email" 
                  ? "No worries! Enter your email address and we'll send you a verification code."
                  : "Enter the verification code sent to your email and your new password."
                }
              </p>
            </div>

            {/* Email Step Form */}
            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-white font-medium mb-2 block"
                  >
                    Email Address<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleInputChange("email")}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors"
                    placeholder="Enter your email address"
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-sm">{success}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </Button>
              </form>
            )}

            {/* Reset Step Form */}
            {step === "reset" && (
              <form onSubmit={handleResetSubmit} className="space-y-6">
                {/* Back to Email Button */}
                <div className="flex items-center space-x-3 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setError("");
                      setSuccess("");
                      setVerifyCode("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <span className="text-gray-400 text-sm">Back to email</span>
                </div>
                <div>
                  <Label
                    htmlFor="verifyCode"
                    className="text-white font-medium mb-2 block"
                  >
                    Verification Code<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="verifyCode"
                    type="text"
                    value={verifyCode}
                    onChange={handleInputChange("verifyCode")}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors"
                    placeholder="Enter verification code"
                    required
                    disabled={loading}
                    autoComplete="one-time-code"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="newPassword"
                    className="text-white font-medium mb-2 block"
                  >
                    New Password<span className="text-[#F4B448]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={handleInputChange("newPassword")}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors pr-12"
                      placeholder="Enter new password (min. 6 characters)"
                      required
                      disabled={loading}
                      autoComplete="new-password"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 transition-colors"
                      disabled={loading}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white font-medium mb-2 block"
                  >
                    Confirm New Password<span className="text-[#F4B448]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleInputChange("confirmPassword")}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors pr-12"
                      placeholder="Confirm new password"
                      required
                      disabled={loading}
                      autoComplete="new-password"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 transition-colors"
                      disabled={loading}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-sm">{success}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-[#F4B448] hover:text-[#F4B448]/80 underline transition-colors"
                  disabled={loading}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
