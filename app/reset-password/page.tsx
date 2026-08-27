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
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#f0f2f5]">
      {/* Outer Card with Rounded Corners */}
      <div className="w-full max-w-[1020px] bg-white rounded-[32px] md:rounded-[40px] p-3 sm:p-3.5 shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[24px] md:rounded-[32px] overflow-hidden min-h-[560px] md:min-h-[620px]">
          
          {/* Left Column - Worker Loading Solar Panels Image with Rounded Corners */}
          <div className="relative w-full h-[280px] sm:h-[340px] md:h-auto min-h-full rounded-[22px] md:rounded-[28px] overflow-hidden shadow-inner">
            <Image
              src="/images/reset-password-img.jpg"
              alt="Worker recycling solar scrap panels"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Column - Reset Password Form */}
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

              {/* Back Button */}
              <div className="mb-4 sm:mb-5">
                <Link
                  href="/verify-otp"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200/80 text-gray-700 border border-gray-200/80 transition-colors cursor-pointer"
                  aria-label="Go back to OTP Verification"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>

              {/* Reset Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* New Password */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
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
                      className="w-full pl-3.5 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md transition-colors cursor-pointer"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
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
                      className="w-full pl-3.5 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md transition-colors cursor-pointer"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                )}

                {/* Success Feedback */}
                {isSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#009639] shrink-0" />
                    <span>Password reset successfully! Redirecting to login...</span>
                  </div>
                )}

                {/* Continue Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="w-full py-3 sm:py-3.5 px-4 bg-[#009639] hover:bg-[#008533] active:bg-[#00732c] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center disabled:opacity-75 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "continue"
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
