"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }, 1000);
  };

  return (
    <main className="min-h-screen w-full bg-[#EBECEF] p-2 sm:p-3 md:p-4 lg:p-5 flex items-center justify-center">
      {/* Outer Card filling the viewport */}
      <div className="w-full bg-white rounded-[28px] md:rounded-[36px] p-3 sm:p-4 md:p-5 shadow-2xl border border-gray-200/60 flex flex-col md:flex-row min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-24px)] md:min-h-[calc(100vh-32px)]">
        
        {/* Left Column - Worker Loading Solar Panels Image with rounded corners & shadow */}
        <div className="relative w-full md:w-[50%] lg:w-[48%] h-[320px] sm:h-[400px] md:h-auto min-h-[300px] md:min-h-full rounded-[22px] md:rounded-[28px] overflow-hidden shadow-sm shrink-0">
          <Image
            src="/images/reset-password-img.jpg"
            alt="Worker recycling solar scrap panels"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Column - Reset Password Form (Spacious, bold, perfectly scaled) */}
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

            {/* Back Button */}
            <div className="mb-3 sm:mb-4">
              <Link
                href="/verify-otp"
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 border border-gray-200/80 transition-colors"
                aria-label="Go back to OTP Verification"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </Link>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
              Reset Password
            </h1>
            <p className="text-xs sm:text-sm md:text-[15px] text-gray-500 mt-1.5 mb-6 sm:mb-8 font-normal">
              Enter and confirm your new secure password
            </p>

            {/* Reset Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    required
                    className="w-full pl-4 pr-11 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-gray-900 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md transition-colors"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    required
                    className="w-full pl-4 pr-11 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-gray-900 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="text-xs sm:text-sm text-red-600 font-medium">{errorMessage}</p>
              )}

              {/* Success Feedback */}
              {isSuccess && (
                <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#009639] shrink-0" />
                  <span>Password reset successfully! Redirecting to login...</span>
                </div>
              )}

              {/* Continue Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="w-full py-3.5 sm:py-4 px-4 bg-[#009639] hover:bg-[#008533] active:bg-[#00732c] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg shadow-[#009639]/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center disabled:opacity-75 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Continue"
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
