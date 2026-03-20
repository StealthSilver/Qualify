"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import LogoTicker from "../ui/LogoTicker";
import QuestionSolvingAnimation from "../ui/QuestionSolvingAnimation";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#f3f6f8] text-[#070a05] overflow-hidden">
      {/* Main Container - Mobile-first responsive grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-32 md:pb-12 lg:pt-40 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            {/* Badge - Minimal Style */}
            <div className="inline-block">
              <span className="text-[0.625rem] sm:text-xs font-light text-[#070a05]/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Prepare • Compete • Excel
              </span>
            </div>

            {/* Main Headline - Responsive typography with clamp */}
            <h1 
              className="mt-6 sm:mt-8 font-light leading-[1.1] sm:leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
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
              className="mt-4 sm:mt-6 text-[#070a05]/70 leading-relaxed sm:leading-relaxed"
              style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
              }}
            >
              AI-powered practice, real-time tests, and performance analytics
              designed to help you master competitive exams.
            </p>

            {/* CTA Button - Touch-friendly on mobile */}
            <div className="mt-8 sm:mt-10">
              <button 
                className="group relative flex items-center justify-center gap-2 bg-[#393f5b] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] active:scale-95 overflow-hidden w-full sm:w-auto sm:inline-flex"
                style={{
                  padding: 'clamp(0.875rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  minHeight: '48px',
                }}
              >
                <span className="relative">Start Competing</span>
                
                {/* Icon container - Fixed width to prevent shift */}
                <span className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                  <ChevronRight
                    size={18}
                    className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2"
                  />
                  <ArrowRight
                    size={18}
                    className="absolute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - Animation - Responsive height */}
          <div 
            className="relative w-full order-first lg:order-last"
            style={{
              height: 'clamp(250px, 50vw, 600px)',
              maxHeight: '600px',
            }}
          >
            <QuestionSolvingAnimation />
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
