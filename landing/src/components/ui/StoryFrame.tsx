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

  // Define color stops for each time of day with higher opacity
  // Morning (0-0.2): Sunrise - yellow, orange, purple
  const morningGradient = "radial-gradient(circle at 50% 130%, rgba(255, 183, 77, 0.35) 0%, rgba(255, 138, 101, 0.28) 35%, rgba(156, 136, 255, 0.22) 65%, transparent 100%)";
  
  // Afternoon (0.2-0.4): Bright day - light yellow, white, light orange
  const afternoonGradient = "radial-gradient(circle at 50% 130%, rgba(255, 235, 59, 0.32) 0%, rgba(255, 245, 157, 0.25) 35%, rgba(255, 224, 178, 0.28) 65%, transparent 100%)";
  
  // Evening (0.4-0.6): Sunset - orange, purple, violet
  const eveningGradient = "radial-gradient(circle at 50% 130%, rgba(255, 152, 0, 0.38) 0%, rgba(179, 136, 255, 0.32) 35%, rgba(138, 43, 226, 0.28) 65%, transparent 100%)";
  
  // Night (0.6-0.8): Dark - blue, violet, grey
  const nightGradient = "radial-gradient(circle at 50% 130%, rgba(63, 81, 181, 0.35) 0%, rgba(103, 58, 183, 0.30) 35%, rgba(96, 125, 139, 0.25) 65%, transparent 100%)";

  // CTA (0.8-1.0): Fade to white/neutral
  const ctaGradient = "radial-gradient(circle at 50% 130%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)";

  // Create opacity values aligned with story phases
  // Morning: 0-0.2 scroll (step 0 - when morning story is active)
  const morningOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [1, 1, 1, 0]);
  
  // Afternoon: 0.2-0.4 scroll (step 1 - when afternoon story is active)
  const afternoonOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  
  // Evening: 0.4-0.6 scroll (step 2 - when evening story is active)
  const eveningOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  
  // Night: 0.6-0.8 scroll (step 3 - when night story is active)
  const nightOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  
  // CTA: 0.8-1.0 scroll (step 4 - when CTA is active)
  const ctaGradientOpacity = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);

  return (
    <div className="relative w-full max-w-5xl h-[650px] md:h-[750px] mt-8 md:mt-12">
      {/* Main Story Card - Glassmorphism */}
      <motion.div
        className="relative w-full h-full bg-white/60 backdrop-blur-xl rounded-2xl border border-[#070a05]/10 shadow-2xl overflow-hidden"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Time-of-day gradient overlays - stacked for smooth transitions */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: morningGradient,
            opacity: morningOpacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: afternoonGradient,
            opacity: afternoonOpacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: eveningGradient,
            opacity: eveningOpacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: nightGradient,
            opacity: nightOpacity,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: ctaGradient,
            opacity: ctaGradientOpacity,
          }}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#393f5b]/5 via-transparent to-[#393f5b]/8 pointer-events-none" />

        {/* Soft glow effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(57,63,91,0.1)] pointer-events-none rounded-2xl" />

        {/* Content Container */}
        <div className="relative w-full h-full p-8 md:p-12 flex items-center justify-center">
          {children}
        </div>

        {/* Final CTA - Centered in the box, appears only at the end */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
          style={{
            opacity: ctaOpacity,
            scale: ctaScale,
          }}
        >
          <div className="text-center pointer-events-auto">
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#393f5b] mb-6 leading-relaxed">
              Small daily improvements.
              <br />
              Massive rank shifts.
            </p>
            <button className="group relative bg-[#393f5b] text-white px-8 py-4 rounded-lg text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#2f3450] overflow-hidden">
              <span className="relative z-10">Start Competing</span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
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
