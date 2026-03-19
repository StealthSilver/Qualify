"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f3f6f8] text-[#070a05]">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#393f5b]/10 rounded-full border border-[#393f5b]/20">
              <Sparkles size={16} className="text-[#393f5b]" />
              <span className="text-sm font-medium text-[#393f5b]">
                Prepare. Compete. Excel.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Master Your
              <br />
              <span className="text-[#393f5b]">Competitive Edge</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#070a05]/70 leading-relaxed max-w-xl">
              Transform your preparation with AI-powered learning, real-time competitions, 
              and personalized coaching designed for ambitious students.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary CTA */}
              <button className="group flex items-center justify-center gap-2 bg-[#393f5b] text-white px-8 py-4 rounded-lg text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#2f3450] hover:-translate-y-0.5">
                <span>Start Learning Free</span>
                <span className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                  <ArrowRight
                    size={18}
                    className="absolute transition-all duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>

              {/* Secondary CTA */}
              <button className="group flex items-center justify-center gap-2 bg-transparent text-[#393f5b] px-8 py-4 rounded-lg text-base font-medium border-2 border-[#393f5b] hover:bg-[#393f5b] hover:text-white transition-all duration-300 hover:-translate-y-0.5">
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-[#070a05]/10">
              <div>
                <div className="text-3xl font-bold text-[#393f5b]">10K+</div>
                <div className="text-sm text-[#070a05]/60 mt-1">Active Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#393f5b]">500+</div>
                <div className="text-sm text-[#070a05]/60 mt-1">Practice Tests</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#393f5b]">95%</div>
                <div className="text-sm text-[#070a05]/60 mt-1">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Gradient */}
          <div className="relative h-[500px] lg:h-[600px] w-full">
            {/* Main Gradient Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#393f5b] via-[#5a6899] to-[#8b95c9] rounded-full blur-3xl opacity-40 animate-pulse-slow" />
            </div>

            {/* Secondary Gradient Orb */}
            <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] md:w-[300px] md:h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b95c9] via-[#a8b1d6] to-[#c5cce3] rounded-full blur-2xl opacity-30 animate-float" />
            </div>

            {/* Accent Gradient Orb */}
            <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#393f5b] to-[#2f3450] rounded-full blur-2xl opacity-25 animate-float-delayed" />
            </div>

            {/* Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] border-2 border-[#393f5b]/20 rounded-full animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] border-2 border-[#393f5b]/15 rounded-full animate-spin-reverse" />

            {/* Floating Cards */}
            <div className="absolute top-16 right-8 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#393f5b] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">A+</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#070a05]">Top Score</div>
                  <div className="text-xs text-[#070a05]/60">Mock Test #24</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-8 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#393f5b] to-[#5a6899] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🏆</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#070a05]">Rank #1</div>
                  <div className="text-xs text-[#070a05]/60">Weekly Contest</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(57,63,91,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(57,63,91,0.08),transparent_50%)] pointer-events-none" />
    </section>
  );
}