import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Eye, EyeOff, Upload, X } from "lucide-react";
import { BlobAnimation } from "@/src/components/ui/BlobAnimation";

export default function Onboard() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [idType, setIdType] = useState<string>("passport");
  const [idFrontImage, setIdFrontImage] = useState<File | null>(null);
  const [idBackImage, setIdBackImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [autoFilled, setAutoFilled] = useState<boolean>(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] =
    useState<boolean>(false);

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "NO", name: "Norway", flag: "🇳🇴" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "FI", name: "Finland", flag: "🇫🇮" },
    { code: "CH", name: "Switzerland", flag: "🇨🇭" },
    { code: "AT", name: "Austria", flag: "🇦🇹" },
    { code: "BE", name: "Belgium", flag: "🇧🇪" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "AR", name: "Argentina", flag: "🇦🇷" },
    { code: "CL", name: "Chile", flag: "🇨🇱" },
    { code: "ZA", name: "South Africa", flag: "🇿🇦" },
    { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "IL", name: "Israel", flag: "🇮🇱" },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get("email");
    const nameFromUrl = urlParams.get("name");

    if (emailFromUrl) {
      setEmail(decodeURIComponent(emailFromUrl));
      setAutoFilled(true);
    }
    if (nameFromUrl) {
      setFullName(decodeURIComponent(nameFromUrl));
      setAutoFilled(true);
    }
  }, []);

  const handleFormSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!isTermsAccepted) {
      setError("Please accept the Terms and Privacy Policies.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLoading(false);
      alert(
        "You have successfully joined the waitlist! Please verify your email."
      );

      // Reset form fields after submission
      setFullName("");
      setEmail("");
      setMobileNumber("");
      setAddress("");
      setCountry("");
      setPassword("");
      setIdFrontImage(null);
      setIdBackImage(null);
      setIsTermsAccepted(false);
    } catch (err: any) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const handleIdFrontChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIdFrontImage(e.target.files[0]);
    }
  };

  const handleIdBackChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIdBackImage(e.target.files[0]);
    }
  };

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setIsCountryDropdownOpen(false);
  };

  const selectedCountryData = countries.find((c) => c.name === country);

  const removeFile = (type: "front" | "back") => {
    if (type === "front") {
      setIdFrontImage(null);
    } else {
      setIdBackImage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
      <BlobAnimation />
      <div className="w-full max-w-4xl bg-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl shadow-[#F4B448]/10 backdrop-blur-sm overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {/* <div className="inline-flex items-center px-3 py-1 bg-[#F4B448]/10 rounded-full border border-[#F4B448]/20">
                <span className="text-[#F4B448] text-sm font-medium">
                  ✨ Exclusive Access
                </span>
              </div> */}
              <h1 className="text-4xl text-center md:text-5xl font-bold text-white mb-6 leading-tight">
                Join the Areal
                <br />
                <span className="text-[#F4B448] text-center">Complete KYC</span>
              </h1>
              {/* <p className="text-gray-400 text-lg leading-relaxed">
                Be the first to access exclusive updates, early investment
                opportunities, and insider perks. Sign up today!
              </p> */}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#F4B448] rounded-full animate-pulse"></div>
                <span className="text-gray-300">
                  Priority access to new features
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#F4B448] rounded-full animate-pulse"></div>
                <span className="text-gray-300">
                  Exclusive investment opportunities
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#F4B448] rounded-full animate-pulse"></div>
                <span className="text-gray-300">
                  Direct line to insider updates
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-1">
          {/* Left Side - Hero Content */}

          {/* Right Side - Form */}
          <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-800">
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Full Name<span className="text-[#F4B448]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFullName(e.target.value);
                    setAutoFilled(false);
                  }}
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors"
                  placeholder="Enter your name"
                  disabled={autoFilled}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Email<span className="text-[#F4B448]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setAutoFilled(false);
                  }}
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors"
                  placeholder="username@gmail.com"
                  disabled={autoFilled}
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Mobile Number<span className="text-[#F4B448]">*</span>
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setMobileNumber(e.target.value)
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors"
                  placeholder="Enter your mobile number"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Password<span className="text-[#F4B448]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 pr-12 transition-colors"
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#F4B448] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Address<span className="text-[#F4B448]">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAddress(e.target.value)
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors"
                  placeholder="Enter your address"
                />
              </div>

              {/* Country Dropdown */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Country<span className="text-[#F4B448]">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setIsCountryDropdownOpen(!isCountryDropdownOpen)
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-left text-white focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-3">
                      {selectedCountryData ? (
                        <>
                          <span className="text-xl">
                            {selectedCountryData.flag}
                          </span>
                          <span>{selectedCountryData.name}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">
                          Select your country
                        </span>
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
                          onClick={() => handleCountrySelect(countryItem.name)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center space-x-3 text-white border-b border-gray-700 last:border-b-0"
                        >
                          <span className="text-xl">{countryItem.flag}</span>
                          <span>{countryItem.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ID Type */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  ID Type<span className="text-[#F4B448]">*</span>
                </label>
                <select
                  value={idType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setIdType(e.target.value)
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-white focus:border-[#F4B448] focus:ring-1 focus:ring-[#F4B448] rounded-lg px-4 py-3 transition-colors"
                >
                  <option value="passport">Passport</option>
                  <option value="driving-license">Driving License</option>
                  <option value="national-id">National ID</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* ID Front Image */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  ID Front Image<span className="text-[#F4B448]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleIdFrontChange}
                    accept="image/*"
                    className="hidden"
                    id="id-front-upload"
                  />
                  <label
                    htmlFor="id-front-upload"
                    className="w-full bg-gray-800 border border-gray-700 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer hover:bg-gray-750 hover:border-[#F4B448]/50 transition-all duration-200 block"
                  >
                    {idFrontImage ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Upload className="w-5 h-5 text-[#F4B448]" />
                          <span className="text-white">
                            {idFrontImage.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile("front");
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-[#F4B448] mx-auto" />
                        <div className="text-white">
                          Click to upload ID front image
                        </div>
                        <div className="text-gray-500 text-sm">
                          PNG, JPG up to 10MB
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* ID Back Image */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  ID Back Image<span className="text-[#F4B448]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleIdBackChange}
                    accept="image/*"
                    className="hidden"
                    id="id-back-upload"
                  />
                  <label
                    htmlFor="id-back-upload"
                    className="w-full bg-gray-800 border border-gray-700 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer hover:bg-gray-750 hover:border-[#F4B448]/50 transition-all duration-200 block"
                  >
                    {idBackImage ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Upload className="w-5 h-5 text-[#F4B448]" />
                          <span className="text-white">{idBackImage.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile("back");
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-[#F4B448] mx-auto" />
                        <div className="text-white">
                          Click to upload ID back image
                        </div>
                        <div className="text-gray-500 text-sm">
                          PNG, JPG up to 10MB
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="w-4 h-4 text-[#F4B448] bg-gray-800 border-gray-700 rounded focus:ring-[#F4B448] focus:ring-2"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-400 font-medium leading-none cursor-pointer"
                >
                  I agree to all the Terms and Privacy Policies
                  <span className="text-[#F4B448]">*</span>
                </label>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={loading}
                className="w-full bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold py-3 text-base rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Sign in...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
