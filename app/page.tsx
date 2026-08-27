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
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#f0f2f5]">
      {/* Outer Card with Rounded Corners */}
      <div className="w-full max-w-[1020px] bg-white rounded-[32px] md:rounded-[40px] p-3 sm:p-3.5 shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[24px] md:rounded-[32px] overflow-hidden min-h-[560px] md:min-h-[620px]">
          
          {/* Left Column - Hero Factory Image with Rounded Corners */}
          <div className="relative w-full h-[280px] sm:h-[340px] md:h-auto min-h-full rounded-[22px] md:rounded-[28px] overflow-hidden shadow-inner">
            <Image
              src="/images/sign-in-img.jpg"
              alt="Solar Scrap Facility"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Column - Sign In Form */}
          <div className="bg-white flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 lg:px-14">
            <div className="w-full max-w-[360px] mx-auto flex flex-col">
              
              {/* Solar Scrap Logo */}
              <div className="mb-2.5 sm:mb-3">
                <Image
                  src="/images/solar-scrap-img.png"
                  alt="Solar Scrap"
                  width={140}
                  height={50}
                  className="w-[125px] sm:w-[135px] h-auto object-contain -ml-0.5"
                  priority
                />
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-xl sm:text-[22px] md:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                Welcome Back!
              </h1>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1 mb-5 sm:mb-6 font-normal">
                Enter details and login to your account
              </p>

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
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
                    className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all duration-200"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
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
                      className="w-full pl-3.5 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md transition-colors cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end pt-0.5">
                  <Link
                    href="/verify-email"
                    className="text-[11px] sm:text-xs text-gray-500 hover:text-gray-900 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 sm:py-3.5 px-4 bg-[#009639] hover:bg-[#008533] active:bg-[#00732c] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center disabled:opacity-75 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
