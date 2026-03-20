"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface StoryFrameProps {
  children: ReactNode;
  ctaProgress: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export default function StoryFrame({ children, ctaProgress, scrollYProgress }: StoryFrameProps) {
  // Only show CTA when ctaProgress > 0.7 (near the end)
  const ctaOpacity = useTransform(ctaProgress, [0, 0.7, 1], [0, 0, 1]);
  const ctaScale = useTransform(ctaProgress, [0.7, 1], [0.9, 1]);

  // Define subtle, inspiring color gradients that match the website's concept
  // Phase 1 (0-0.2): Soft teal with muted blue - Focus & Clarity
  const phase1Gradient = "radial-gradient(circle at 50% 130%, rgba(94, 196, 188, 0.25) 0%, rgba(57, 63, 91, 0.20) 35%, rgba(104, 159, 183, 0.18) 65%, transparent 100%)";
  
  // Phase 2 (0.2-0.4): Gentle lavender with sage - Growth & Balance
  const phase2Gradient = "radial-gradient(circle at 50% 130%, rgba(168, 162, 196, 0.22) 0%, rgba(147, 179, 169, 0.20) 35%, rgba(182, 194, 201, 0.18) 65%, transparent 100%)";
  
  // Phase 3 (0.4-0.6): Warm coral with soft peach - Energy & Progress
  const phase3Gradient = "radial-gradient(circle at 50% 130%, rgba(237, 158, 142, 0.24) 0%, rgba(255, 198, 171, 0.20) 35%, rgba(188, 170, 164, 0.18) 65%, transparent 100%)";
  
  // Phase 4 (0.6-0.8): Deep slate with hints of teal - Confidence & Achievement
  const phase4Gradient = "radial-gradient(circle at 50% 130%, rgba(76, 88, 115, 0.26) 0%, rgba(94, 196, 188, 0.18) 35%, rgba(112, 128, 144, 0.20) 65%, transparent 100%)";

  // CTA (0.8-1.0): Clean & Minimal - Ready to Act
  const ctaGradient = "radial-gradient(circle at 50% 130%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)";

  // Create opacity values for smooth phase transitions
  // Phase 1: 0-0.2 scroll
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [1, 1, 1, 0]);
  
  // Phase 2: 0.2-0.4 scroll
  const phase2Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  
  // Phase 3: 0.4-0.6 scroll
  const phase3Opacity = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  
  // Phase 4: 0.6-0.8 scroll
  const phase4Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  
  // CTA: 0.8-1.0 scroll
  const ctaGradientOpacity = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);

  return (
    <div className="relative w-full max-w-5xl h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] mt-6 md:mt-12">
      {/* Main Story Card - Glassmorphism */}
      <motion.div
        className="relative w-full h-full bg-white/60 backdrop-blur-xl rounded-lg md:rounded-xl lg:rounded-2xl border border-[#070a05]/10 shadow-2xl overflow-hidden"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Gradient phase overlays - stacked for smooth transitions */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg md:rounded-xl lg:rounded-2xl"
          style={{
            background: phase1Gradient,
            opacity: phase1Opacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg md:rounded-xl lg:rounded-2xl"
          style={{
            background: phase2Gradient,
            opacity: phase2Opacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg md:rounded-xl lg:rounded-2xl"
          style={{
            background: phase3Gradient,
            opacity: phase3Opacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg md:rounded-xl lg:rounded-2xl"
          style={{
            background: phase4Gradient,
            opacity: phase4Opacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg md:rounded-xl lg:rounded-2xl"
          style={{
            background: ctaGradient,
            opacity: ctaGradientOpacity,
          }}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#393f5b]/5 via-transparent to-[#393f5b]/8 pointer-events-none" />

        {/* Soft glow effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(57,63,91,0.1)] pointer-events-none rounded-lg md:rounded-xl lg:rounded-2xl" />

        {/* Content Container */}
        <div className="relative w-full h-full p-3 sm:p-4 md:p-8 lg:p-12 flex items-center justify-center overflow-y-auto">
          {children}
        </div>

        {/* Final CTA - Centered in the box, appears only at the end */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none overflow-y-auto"
          style={{
            opacity: ctaOpacity,
            scale: ctaScale,
          }}
        >
          <div className="text-center pointer-events-auto py-4">
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-light text-[#393f5b] mb-3 sm:mb-4 md:mb-6 leading-relaxed px-4">
              Small daily improvements.
              <br />
              Massive rank shifts.
            </p>
            <button className="group relative bg-[#393f5b] text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg text-xs sm:text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#2f3450] overflow-hidden">
              <span className="relative z-10">Start Competing</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle background blur elements */}
      <div className="absolute -z-10 top-8 left-8 w-32 h-32 bg-[#393f5b]/5 rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-8 right-8 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl" />
    </div>
  );
}
