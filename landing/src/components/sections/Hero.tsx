"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import LogoTicker from "../ui/LogoTicker";
import QuestionSolvingAnimation from "../ui/QuestionSolvingAnimation";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#f3f6f8] text-[#070a05] overflow-hidden">
      {/* Main Container - Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-8 md:pt-32 md:pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="max-w-2xl">
            {/* Badge - Minimal Style */}
            <div className="inline-block">
              <span className="text-xs font-light text-[#070a05]/50 tracking-[0.2em] uppercase">
                Prepare • Compete • Excel
              </span>
            </div>

            {/* Main Headline - Very Light Font Weight */}
            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
              Master Your
              <br />
              <span className="text-[#393f5b]">Competitive Edge</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg md:text-xl text-[#070a05]/70 leading-relaxed">
              Transform your preparation with AI-powered learning, real-time competitions,
              and personalized coaching designed for ambitious students.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <button className="group flex items-center gap-2 bg-[#393f5b] text-white px-8 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[#2f3450]">
                <span>Get Started</span>
                
                {/* ICON CONTAINER (fixed width to prevent shift) */}
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

          {/* Right Side - Animation */}
          <div className="relative h-[500px] lg:h-[600px]">
            <QuestionSolvingAnimation />
          </div>
        </div>
      </div>

      {/* Logo Ticker */}
      <LogoTicker />

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(57,63,91,0.04),transparent_50%)] pointer-events-none" />
    </section>
  );
}