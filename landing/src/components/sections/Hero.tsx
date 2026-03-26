"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { SIGNIN_URL } from "@/lib/app-urls";
import LogoTicker from "../ui/LogoTicker";
import QuestionSolvingAnimation from "../ui/QuestionSolvingAnimation";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#f3f6f8] text-[#070a05] overflow-hidden">
      {/* Main Container - Mobile-first responsive grid */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 pt-10 pb-3 xs:pt-12 xs:pb-4 sm:pt-16 sm:pb-6 md:pt-28 md:pb-10 lg:pt-40 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 md:gap-10 lg:gap-16 items-center">
          
          {/* Right Side - Animation - Responsive height - First on mobile */}
          <div 
            className="relative w-full order-first lg:order-last mt-[120px] xs:mt-20 sm:mt-0 mb-2 xs:mb-3 sm:mb-0"
            style={{
              height: 'clamp(180px, 35vw + 35px, 550px)',
              maxHeight: '550px',
            }}
          >
            <QuestionSolvingAnimation />
          </div>

          {/* Left Side - Content */}
          <div className="w-full max-w-2xl mx-auto lg:mx-0 mt-[100px] xs:mt-20 sm:mt-0 px-4 xs:px-6 sm:px-8 lg:px-0">
            {/* Badge - Minimal Style */}
            <div className="inline-block mb-2.5 xs:mb-3 sm:mb-0">
              <span className="text-[0.5rem] xs:text-[0.625rem] sm:text-xs font-light text-[#070a05]/40 tracking-[0.12em] xs:tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Prepare • Compete • Excel
              </span>
            </div>

            {/* Main Headline - Responsive typography with clamp */}
            <h1 
              className="mt-2 xs:mt-2.5 sm:mt-6 md:mt-8 font-light leading-[1] xs:leading-[1.05] sm:leading-[1.1] md:leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(1.375rem, 4.5vw + 0.4rem, 4.5rem)',
              }}
            >
              Compete Daily.
              <br />
              Rank Higher.
              <br />
              <span className="text-[#393f5b]">
                Crack JEE.
              </span>
            </h1>

            {/* Subheadline - Responsive text */}
            <p 
              className="mt-2 xs:mt-2.5 sm:mt-4 md:mt-6 text-[#070a05]/70 leading-snug xs:leading-normal sm:leading-relaxed"
              style={{
                fontSize: 'clamp(0.6875rem, 1.6vw + 0.2rem, 1.25rem)',
              }}
            >
              AI-powered practice, real-time tests, and performance analytics
              designed to help you master competitive exams.
            </p>

            {/* CTA Button - Touch-friendly on mobile */}
            <div className="mt-4 xs:mt-5 sm:mt-8 md:mt-10">
              <a
                href={SIGNIN_URL}
                className="group relative flex items-center justify-center gap-1.5 xs:gap-2 bg-[#393f5b] text-white rounded-md xs:rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] active:scale-95 overflow-hidden w-full sm:w-auto sm:inline-flex"
                style={{
                  padding: 'clamp(0.5rem, 1vw + 0.15rem, 1rem) clamp(0.875rem, 2.2vw + 0.3rem, 2rem)',
                  fontSize: 'clamp(0.6875rem, 1.2vw + 0.15rem, 1rem)',
                  minHeight: '40px',
                }}
              >
                <span className="relative">Start Competing</span>
                
                {/* Icon container - Fixed width to prevent shift */}
                <span className="relative w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex items-center justify-center overflow-hidden">
                  <ChevronRight
                    size={14}
                    className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2 xs:hidden"
                  />
                  <ChevronRight
                    size={16}
                    className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2 hidden xs:block sm:hidden"
                  />
                  <ChevronRight
                    size={18}
                    className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2 hidden sm:block"
                  />
                  <ArrowRight
                    size={14}
                    className="absolute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 xs:hidden"
                  />
                  <ArrowRight
                    size={16}
                    className="absolute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden xs:block sm:hidden"
                  />
                  <ArrowRight
                    size={18}
                    className="absolute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Ticker */}
      <LogoTicker />

      {/* Subtle Background Decoration - Adjusted for mobile */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 sm:opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(57, 63, 91, 0.04), transparent 50%)',
        }}
      />
    </section>
  );
}
