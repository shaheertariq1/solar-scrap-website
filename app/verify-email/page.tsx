"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-otp");
    }, 600);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#f0f2f5]">
      {/* Outer Card with Rounded Corners */}
      <div className="w-full max-w-[1020px] bg-white rounded-[32px] md:rounded-[40px] p-3 sm:p-3.5 shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[24px] md:rounded-[32px] overflow-hidden min-h-[560px] md:min-h-[620px]">
          
          {/* Left Column - Verify Email Scrap Image with Rounded Corners */}
          <div className="relative w-full h-[280px] sm:h-[340px] md:h-auto min-h-full rounded-[22px] md:rounded-[28px] overflow-hidden shadow-inner">
            <Image
              src="/images/verify-email-screen.jpg"
              alt="Industrial Scrap Equipment"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Column - Verify Form */}
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
              <div className="mb-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200/80 text-gray-700 border border-gray-200/80 transition-colors cursor-pointer"
                  aria-label="Go back to Sign In"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-xl sm:text-[22px] md:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                Confirm it&apos;s you.
              </h1>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1 mb-5 sm:mb-6 font-normal">
                Please verify your email to continue
              </p>

              {/* Verify Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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

                {/* Continue Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 sm:py-3.5 px-4 bg-[#009639] hover:bg-[#008533] active:bg-[#00732c] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center disabled:opacity-75 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Continue"
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
