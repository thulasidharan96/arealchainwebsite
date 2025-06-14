import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import { db } from "@/firebase"; // import Firebase utils
import { collection, addDoc } from "firebase/firestore";
import Layout from "@/src/components/layout";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { sendVerificationEmail } from "@/src/hooks/sendVerificationEmail";

export default function Contact() {
  const [fullName, setFullName] = useState<string>("");
  const [updateme, setUpdateMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const router = useRouter(); // Create router instance

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Input validation
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Generate a unique verification token
      const verificationToken =
        Math.random().toString(36).substring(2) + Date.now().toString(36);

      // Send verification email
      await sendVerificationEmail(email, fullName, verificationToken, updateme);

      setLoading(false);
      setSuccess("Successfully joined the waitlist! Please check your email.");

      // Show the success notification popup
      setShowSuccessPopup(true);

      // Reset form fields after submission
      setFullName("");
      setEmail("");
      setUpdateMe(false);
    } catch (err: any) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      console.error("Registration error:", err);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    router.push("/"); // Redirect to homepage when the user clicks "Back"
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
        <Card className="w-full max-w-4xl bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl shadow-[#F4B448]/10 backdrop-blur-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Join the Areal
                <br />
                Waitlist Now!
              </h1>
              <p className="text-gray-400 text-lg">
                Be the first to access exclusive updates, early investment
                opportunities, and insider perks. Sign up today!
              </p>
            </div>

            <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-800">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="full-name"
                    className="text-white font-medium mb-2 block"
                  >
                    Full name<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFullName(e.target.value)
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448]"
                    placeholder="Enter your name"
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
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448]"
                    placeholder="username@gmail.com"
                    required
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="updateme"
                    checked={updateme}
                    onCheckedChange={(checked: boolean) => setUpdateMe(checked)}
                  />
                  <Label
                    htmlFor="updateme"
                    className="text-sm text-gray-400 font-medium leading-none cursor-pointer"
                  >
                    Yes, please keep me updated on Areal
                    <span className="text-[#F4B448]">*</span>
                  </Label>
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
                  className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Join Waitlist Today!"}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center">
          <div className="bg-black/50 text-white rounded-lg p-6 max-w-lg mx-auto shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
              Successfully Joined the Waitlist!
            </h2>
            <p className="text-sm mb-4">
              Please check your email and click the verification link to
              complete your registration.
            </p>
            <Button
              onClick={closeSuccessPopup}
              className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-2 text-base"
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
}
