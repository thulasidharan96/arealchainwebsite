import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Layout from "@/src/components/layout";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { signupUser, verifyOtp } from "@/src/services/auth/signupService";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  email: string;
  username: string;
  password: string;
  otp: string;
  referralId: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    otp: "",
    referralId: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange =
    (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // Clear errors when user starts typing
      if (error) setError("");
      if (success) setSuccess("");
    };

  const validateForm = (): boolean => {
    const { email, username, password, otp } = formData;

    if (!email.trim() || !username.trim() || !password.trim()) {
      setError("Please fill in all required fields");
      return false;
    }

    if (showOtpInput && !otp.trim()) {
      setError("Please enter the OTP");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Username validation
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    // OTP validation
    if (showOtpInput && (otp.length < 4 || otp.length > 8)) {
      setError("Please enter a valid OTP");
      return false;
    }

    return true;
  };

  const handleInitialSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { email, username, password, referralId } = formData;
      const data = await signupUser({ email, username, password, referralId });

      if (data.success || data.message?.toLowerCase().includes("otp")) {
        setSuccess("OTP sent to your email! Please check your inbox.");
        setShowOtpInput(true);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await verifyOtp(formData);

      if (
        data.success ||
        data.message?.toLowerCase().includes("created") ||
        data.message?.toLowerCase().includes("success") ||
        data.message?.toLowerCase().includes("verified")
      ) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("OTP verification error:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { email, username, password, referralId } = formData;
      const data = await signupUser({ email, username, password, referralId });

      if (data.success || data.message?.toLowerCase().includes("otp")) {
        setSuccess("New OTP sent to your email!");
      } else {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      console.error("Resend OTP error:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
        <Card className="w-full max-w-4xl bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl shadow-[#F4B448]/10 backdrop-blur-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Create Your
                <br />
                Account
              </h1>
              <p className="text-gray-400 text-lg">
                Join Areal today and unlock exclusive features and
                opportunities.
              </p>
              {showOtpInput && (
                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    We've sent a verification code to your email. Please enter
                    it below to complete your registration.
                  </p>
                </div>
              )}
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-800">
              <form
                onSubmit={showOtpInput ? handleOtpSubmit : handleInitialSubmit}
                className="space-y-6"
              >
                {/* Email Field */}
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
                    onChange={handleInputChange("email")}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors"
                    placeholder="username@gmail.com"
                    required
                    disabled={showOtpInput || loading}
                    autoComplete="email"
                  />
                </div>

                {/* Username Field */}
                <div>
                  <Label
                    htmlFor="username"
                    className="text-white font-medium mb-2 block"
                  >
                    Username<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange("username")}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors"
                    placeholder="Enter username"
                    required
                    disabled={showOtpInput || loading}
                    autoComplete="username"
                    minLength={3}
                  />
                </div>

                {/* Password Field */}
                <div>
                  <Label
                    htmlFor="password"
                    className="text-white font-medium mb-2 block"
                  >
                    Password<span className="text-[#F4B448]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange("password")}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors pr-12"
                      placeholder="Enter your password (min. 6 characters)"
                      required
                      disabled={showOtpInput || loading}
                      autoComplete="new-password"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 transition-colors"
                      disabled={loading}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Referral ID Field */}
                <div>
                  <Label
                    htmlFor="referralId"
                    className="text-white font-medium mb-2 block"
                  >
                    Referral Code <span className="text-gray-500 text-sm">(Optional)</span>
                  </Label>
                  <Input
                    id="referralId"
                    type="text"
                    value={formData.referralId}
                    onChange={handleInputChange("referralId")}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors"
                    placeholder="Enter referral code (optional)"
                    disabled={showOtpInput || loading}
                    autoComplete="off"
                  />
                </div>

                {/* OTP Field */}
                {showOtpInput && (
                  <div>
                    <Label
                      htmlFor="otp"
                      className="text-white font-medium mb-2 block"
                    >
                      Verification Code<span className="text-[#F4B448]">*</span>
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleInputChange("otp")}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors"
                      placeholder="Enter verification code"
                      required
                      disabled={loading}
                      maxLength={8}
                      autoComplete="one-time-code"
                    />
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="mt-2 text-[#F4B448] hover:text-[#F4B448]/80 text-sm underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading
                        ? "Sending..."
                        : "Didn't receive the code? Resend"}
                    </button>
                  </div>
                )}

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
                  {loading
                    ? "Processing..."
                    : showOtpInput
                    ? "Verify & Create Account"
                    : "Send Verification Code"}
                </Button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-[#F4B448] hover:text-[#F4B448]/80 underline transition-colors"
                    disabled={loading}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
