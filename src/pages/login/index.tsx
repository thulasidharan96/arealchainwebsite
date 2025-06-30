"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Layout from "@/src/components/layout";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const callbackUrl = (router.query.callbackUrl as string) || "/dashboard";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showOtpStep, setShowOtpStep] = useState<boolean>(false);

  // ✅ SECURE: Store pending token for OTP verification
  const [pendingToken, setPendingToken] = useState<string>("");

  const validateCredentials = (): boolean => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const validateOtp = (): boolean => {
    if (!otp.trim()) {
      setError("Please enter the OTP code");
      return false;
    }

    if (otp.length < 4) {
      setError("Please enter a valid OTP code");
      return false;
    }

    return true;
  };

  const handleCredentialSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateCredentials()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        step: "credentials",
        redirect: false,
      });

      // ✅ SECURE: Handle the custom OTP_REQUIRED error
      if (result?.error) {
        if (result.error.startsWith("OTP_REQUIRED:")) {
          const token = result.error.split("OTP_REQUIRED:")[1];
          setPendingToken(token);
          setShowOtpStep(true);
          setSuccess("Please enter the OTP sent to your email");
        } else {
          // Handle other error types
          switch (result.error) {
            case "CredentialsSignin":
            case "InvalidCredentials":
              setError("Invalid email or password");
              break;
            case "UserNotFound":
              setError("No account found with this email");
              break;
            case "TooManyRequests":
              setError("Too many login attempts. Please try again later");
              break;
            default:
              setError("Invalid email or password");
          }
        }
      } else {
        // This shouldn't happen with our new secure flow
        setError("Unexpected authentication flow. Please try again.");
      }
    } catch (error) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateOtp()) return;

    // ✅ SECURE: Ensure we have a valid pending token
    if (!pendingToken) {
      setError("Session expired. Please start login process again.");
      handleBackToCredentials();
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        verifyCode: otp,
        step: "otp",
        pendingToken: pendingToken, // ✅ SECURE: Pass the pending token
        redirect: false,
      });

      if (result?.error) {
        // Handle OTP verification errors
        if (result.error.includes("Invalid or expired session")) {
          setError("Session expired. Please start login process again.");
          handleBackToCredentials();
        } else {
          switch (result.error) {
            case "InvalidOTP":
              setError("Invalid verification code");
              break;
            case "OTPExpired":
              setError(
                "Verification code has expired. Please request a new one"
              );
              break;
            case "TooManyAttempts":
              setError("Too many invalid attempts. Please request a new code");
              break;
            default:
              setError("Invalid verification code");
          }
        }
      } else if (result?.ok) {
        // ✅ SECURE: Only redirect after successful complete authentication
        setSuccess("Login successful! Redirecting...");
        // Clear sensitive data
        setPendingToken("");
        setPassword("");
        setOtp("");

        setTimeout(() => {
          window.location.href = callbackUrl;
        }, 1000);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (error) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (error) setError("");
      if (success) setSuccess("");
    };

  const handleBackToCredentials = () => {
    // ✅ SECURE: Clear all sensitive data when going back
    setShowOtpStep(false);
    setOtp("");
    setError("");
    setSuccess("");
    setPendingToken(""); // Clear pending token
  };

  const resendOtp = async () => {
    // ✅ SECURE: Clear current tokens and restart the process
    setPendingToken("");
    setOtp("");
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        step: "credentials",
        redirect: false,
      });

      if (result?.error && result.error.startsWith("OTP_REQUIRED:")) {
        const token = result.error.split("OTP_REQUIRED:")[1];
        setPendingToken(token);
        setSuccess("OTP resent to your email!");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SECURE: Clear sensitive data on component unmount
  React.useEffect(() => {
    return () => {
      setPendingToken("");
      setPassword("");
      setOtp("");
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
        <Card className="w-full max-w-7xl h-full max-h-full bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl shadow-[#F4B448]/10 backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {showOtpStep ? "Verify OTP 🔐" : "Welcome Back 👋"}
              </h1>
              <p className="text-gray-400 text-lg">
                {showOtpStep
                  ? `We've sent a verification code to ${email}. Please enter it below to complete your login.`
                  : "Log in to access your Areal account and manage your activities securely."}
              </p>
            </div>

            <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-800">
              {!showOtpStep ? (
                <form onSubmit={handleCredentialSubmit} className="space-y-6">
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
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors"
                      placeholder="username@example.com"
                      required
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>

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
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 pr-10 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors"
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        disabled={loading}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm">{success}</p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Continue"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <button
                      type="button"
                      onClick={handleBackToCredentials}
                      className="text-gray-400 hover:text-white transition-colors"
                      disabled={loading}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <span className="text-gray-400 text-sm">Back to login</span>
                  </div>

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
                      value={otp}
                      onChange={handleInputChange(setOtp)}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] transition-colors text-center text-lg tracking-widest"
                      placeholder="Enter OTP"
                      required
                      disabled={loading}
                      maxLength={6}
                      autoComplete="one-time-code"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Enter the 4-6 digit code sent to your email
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm">{success}</p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={resendOtp}
                      className="text-[#F4B448] hover:text-[#F4B448]/80 text-sm underline transition-colors"
                      disabled={loading}
                    >
                      Didn't receive the code? Resend OTP
                    </button>
                  </div>
                </form>
              )}

              {!showOtpStep && (
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/signup")}
                      className="text-[#F4B448] hover:text-[#F4B448]/80 underline transition-colors"
                      disabled={loading}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
