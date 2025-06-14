import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { db, auth } from "@/firebase"; // import Firebase utils
import { collection, addDoc } from "firebase/firestore";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Layout from "@/src/components/layout";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function Onboard() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // For password visibility toggle
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [autoFilled, setAutoFilled] = useState<boolean>(false);

  useEffect(() => {
    // Parse the query string parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get("email");
    const nameFromUrl = urlParams.get("name");

    // Set the form fields with URL parameters
    if (emailFromUrl) {
      setEmail(decodeURIComponent(emailFromUrl));
      setAutoFilled(true); // Mark as auto-filled
    }
    if (nameFromUrl) {
      setFullName(decodeURIComponent(nameFromUrl));
      setAutoFilled(true); // Mark as auto-filled
    }
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isTermsAccepted) {
      setError("Please accept the terms.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create user in Firebase Auth with the password entered by the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password // Using the entered password
      );

      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Save user data in Firestore
      await addDoc(collection(db, "users"), {
        fullName,
        email,
        mobileNumber,
        termsAccepted: isTermsAccepted,
        uid: user.uid, // Optionally store user UID for reference
      });

      setLoading(false);
      alert(
        "You have successfully joined the waitlist! Please verify your email."
      );

      // Reset form fields after submission
      setFullName("");
      setEmail("");
      setMobileNumber("");
      setPassword("");
      setIsTermsAccepted(false);
    } catch (err: any) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
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
                    Full Name<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setFullName(e.target.value);
                      setAutoFilled(false); // Disable auto-fill tracking if edited manually
                    }}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448]"
                    placeholder="Enter your name"
                    disabled={autoFilled} // Disable editing if auto-filled
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                      setAutoFilled(false); // Disable auto-fill tracking if edited manually
                    }}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448]"
                    placeholder="username@gmail.com"
                    disabled={autoFilled} // Disable editing if auto-filled
                  />
                </div>

                <div>
                  <Label
                    htmlFor="mobile-number"
                    className="text-white font-medium mb-2 block"
                  >
                    Mobile Number<span className="text-[#F4B448]">*</span>
                  </Label>
                  <Input
                    id="mobile-number"
                    value={mobileNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setMobileNumber(e.target.value)
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448]"
                    placeholder="Enter your mobile number"
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
                      type={showPassword ? "text" : "password"} // Toggle password visibility
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-[#F4B448] pr-12"
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent bg-transparent text-gray-400 hover:text-[#F4B448] transition-colors"
                      size="sm"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="terms"
                    checked={isTermsAccepted}
                    onCheckedChange={(checked: boolean) =>
                      setIsTermsAccepted(checked)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-gray-400 font-medium leading-none cursor-pointer"
                  >
                    Yes, please keep me updated on Areal
                    <span className="text-[#F4B448]">*</span>
                  </Label>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <Button
                  className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Joining..." : "Join Waitlist Today!"}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
