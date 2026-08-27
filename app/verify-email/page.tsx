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
    <main className="min-h-screen w-full bg-white flex flex-col md:flex-row">
      {/* Left Column - Verify Email Scrap Image */}
      <div className="relative w-full md:w-1/2 h-[280px] sm:h-[360px] md:h-auto md:min-h-screen">
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
      <div className="w-full md:w-1/2 min-h-[calc(100vh-280px)] md:min-h-screen bg-white flex flex-col justify-center items-center px-6 py-10 sm:px-12 md:px-16 lg:px-20">
        <div className="w-full max-w-[400px] flex flex-col">
          
          {/* Solar Scrap Logo */}
          <div className="mb-3 sm:mb-4">
            <Image
              src="/images/solar-scrap-img.png"
              alt="Solar Scrap"
              width={150}
              height={55}
              className="w-[135px] sm:w-[145px] h-auto object-contain -ml-0.5"
              priority
            />
          </div>

          {/* Back Button */}
          <div className="mb-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200/80 text-gray-700 border border-gray-200/80 transition-colors"
              aria-label="Go back to Sign In"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-2xl sm:text-[26px] md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
            Confirm it&apos;s you.
          </h1>
          <p className="text-xs sm:text-[14px] text-gray-500 mt-1.5 mb-6 sm:mb-8 font-normal">
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
    </main>
  );
}
