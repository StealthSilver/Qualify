"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import LogoTicker from "../ui/LogoTicker";
import QuestionSolvingAnimation from "../ui/QuestionSolvingAnimation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full bg-[#f3f6f8] text-[#070a05] overflow-hidden">
      {/* Main Container - Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-8 md:pt-32 md:pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="max-w-2xl">
            {/* Badge - Minimal Style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="inline-block"
            >
              <span className="text-xs font-light text-[#070a05]/50 tracking-[0.2em] uppercase">
                Prepare • Compete • Excel
              </span>
            </motion.div>

            {/* Main Headline - Very Light Font Weight */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="mt-8 text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight"
            >
              Master Your
              <br />
              <span className="text-[#393f5b]">Competitive Edge</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="mt-6 text-lg md:text-xl text-[#070a05]/70 leading-relaxed"
            >
              Transform your preparation with AI-powered learning, real-time competitions,
              and personalized coaching designed for ambitious students.
            </motion.p>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="mt-10"
            >
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
            </motion.div>
          </div>

          {/* Right Side - Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <QuestionSolvingAnimation />
          </motion.div>
        </div>
      </div>

      {/* Logo Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
      >
        <LogoTicker />
      </motion.div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(57,63,91,0.04),transparent_50%)] pointer-events-none" />
    </section>
  );
}