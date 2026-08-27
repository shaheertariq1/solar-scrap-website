"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 500);
  };

  return (
    <main className="min-h-screen w-full bg-[#EBECEF] p-2 sm:p-3 md:p-4 lg:p-5 flex items-center justify-center">
      {/* Outer Card filling the viewport */}
      <div className="w-full bg-white rounded-[28px] md:rounded-[36px] p-3 sm:p-4 md:p-5 shadow-2xl border border-gray-200/60 flex flex-col md:flex-row min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-24px)] md:min-h-[calc(100vh-32px)]">
        
        {/* Left Column - Hero Factory Image with rounded corners & shadow */}
        <div className="relative w-full md:w-[50%] lg:w-[48%] h-[320px] sm:h-[400px] md:h-auto min-h-[300px] md:min-h-full rounded-[22px] md:rounded-[28px] overflow-hidden shadow-sm shrink-0">
          <Image
            src="/images/sign-in-img.jpg"
            alt="Solar Scrap Facility"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Column - Sign In Form (Spacious, bold, perfectly scaled) */}
        <div className="flex-1 bg-white flex flex-col justify-center items-center px-6 py-8 sm:px-10 sm:py-12 md:px-14 lg:px-20">
          <div className="w-full max-w-[440px] flex flex-col">
            
            {/* Solar Scrap Logo */}
            <div className="mb-3 sm:mb-4">
              <Image
                src="/images/solar-scrap-img.png"
                alt="Solar Scrap"
                width={160}
                height={60}
                className="w-[140px] sm:w-[155px] md:w-[165px] h-auto object-contain -ml-0.5"
                priority
              />
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
              Welcome Back!
            </h1>
            <p className="text-xs sm:text-sm md:text-[15px] text-gray-500 mt-1.5 mb-6 sm:mb-8 font-normal">
              Enter details and login to your account
            </p>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mymail@gmail.com"
                  required
                  className="w-full px-4 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-gray-900 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    required
                    className="w-full pl-4 pr-11 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-gray-900 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end pt-0.5">
                <Link
                  href="/verify-email"
                  className="text-xs sm:text-sm text-gray-500 hover:text-gray-900 hover:underline transition-colors font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 sm:py-4 px-4 bg-[#009639] hover:bg-[#008533] active:bg-[#00732c] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg shadow-[#009639]/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center disabled:opacity-75 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </main>
  );
}
