"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Layout from "@/src/components/layout";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Your login logic here
      console.log({ email, password, rememberMe });

      // Simulate login
      await new Promise((res) => setTimeout(res, 1000));
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
        <Card className="w-full max-w-7xl h-full max-h-full bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl shadow-[#F4B448]/10 backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Welcome Back 👋
              </h1>
              <p className="text-gray-400 text-lg">
                Log in to access your Areal account and manage your activities
                securely.
              </p>
            </div>

            <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-800">
              <form onSubmit={handleLogin} className="space-y-6">
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448]"
                    placeholder="username@example.com"
                    required
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 pr-10 focus:border-[#F4B448] focus:ring-[#F4B448]"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) =>
                      setRememberMe(checked)
                    }
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-gray-400 font-medium leading-none cursor-pointer"
                  >
                    Remember Me
                  </Label>
                </div>

                {error && (
                  <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                <Button
                  className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base"
                  type="submit"
                  disabled={loading}
                  onClick={() => router.push("/dashboard")}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
