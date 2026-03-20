"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import LogoTicker from "../ui/LogoTicker";
import QuestionSolvingAnimation from "../ui/QuestionSolvingAnimation";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#0B0F1A] text-white overflow-hidden">
      {/* Main Container - Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="max-w-2xl">
            {/* Badge - Minimal Style */}
            <div className="inline-block">
              <span className="text-xs font-light text-white/40 tracking-[0.2em] uppercase">
                Prepare • Compete • Excel
              </span>
            </div>

            {/* Main Headline - Very Light Font Weight */}
            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
              Compete Daily.
              <br />
              Rank Higher.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Crack IIT.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/60 leading-relaxed">
              AI-powered practice, real-time tests, and performance analytics
              designed to help you master competitive exams.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <button className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                
                <span className="relative">Start Competing</span>
                
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
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-first lg:order-last">
            <QuestionSolvingAnimation />
          </div>
        </div>
      </div>

      {/* Logo Ticker */}
      <LogoTicker />

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
    </section>
  );
}
