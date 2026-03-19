"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Animated stats for "With Spardha" side
  const [accuracy, setAccuracy] = useState(58);
  const [rank, setRank] = useState(1200);
  const [graphProgress, setGraphProgress] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animate accuracy: 58% → 92%
      const accuracyInterval = setInterval(() => {
        setAccuracy((prev) => {
          if (prev >= 92) {
            clearInterval(accuracyInterval);
            return 92;
          }
          return prev + 1;
        });
      }, 30);

      // Animate rank: #1200 → #240
      const rankInterval = setInterval(() => {
        setRank((prev) => {
          if (prev <= 240) {
            clearInterval(rankInterval);
            return 240;
          }
          return prev - 20;
        });
      }, 30);

      // Animate graph progress
      const graphInterval = setInterval(() => {
        setGraphProgress((prev) => {
          if (prev >= 100) {
            clearInterval(graphInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 40);

      return () => {
        clearInterval(accuracyInterval);
        clearInterval(rankInterval);
        clearInterval(graphInterval);
      };
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f3f6f8] text-[#070a05] overflow-hidden py-20 md:py-32"
    >
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
            Same Student.{" "}
            <span className="text-[#393f5b]">Different Outcomes.</span>
          </h2>
        </motion.div>

        {/* Split Layout */}
        <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-0">
          {/* LEFT SIDE - Without Spardha */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative p-8 md:p-12 lg:pr-8"
          >
            {/* Title */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-light text-[#070a05]/70 mb-3">
                Without Spardha
              </h3>
              <p className="text-sm md:text-base text-[#070a05]/50 font-light">
                Inconsistent practice. No clear direction.
              </p>
            </div>

            {/* Dimmed Dashboard Card */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative bg-white/40 backdrop-blur-sm rounded-xl border border-[#070a05]/5 p-6 opacity-60 blur-[0.5px]"
            >
              {/* Messy notes layout */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-[#070a05]/30 tracking-wider uppercase">
                    Performance
                  </span>
                  <TrendingDown size={16} className="text-[#070a05]/30" />
                </div>

                {/* Static Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#070a05]/50">Accuracy</span>
                    <span className="text-2xl font-light text-[#070a05]/50">
                      42%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#070a05]/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#070a05]/20 rounded-full"
                      style={{ width: "42%" }}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#070a05]/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#070a05]/50">Rank</span>
                    <span className="text-2xl font-light text-[#070a05]/50">
                      #12,430
                    </span>
                  </div>
                </div>

                {/* Flat graph */}
                <div className="pt-4 h-24 flex items-end gap-1">
                  {[32, 28, 35, 30, 33, 29, 31, 34, 30, 32].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#070a05]/10 rounded-sm"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CENTER DIVIDER with shimmer */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          >
            <div className="relative w-full h-full bg-gradient-to-b from-transparent via-[#393f5b]/20 to-transparent" />
            <motion.div
              initial={{ y: "-100%" }}
              animate={isInView ? { y: "200%" } : {}}
              transition={{
                duration: 2,
                delay: 0.6,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full h-1/3 bg-gradient-to-b from-transparent via-[#393f5b]/40 to-transparent blur-sm"
            />
          </motion.div>

          {/* RIGHT SIDE - With Spardha */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative p-8 md:p-12 lg:pl-8"
          >
            {/* Title */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-light text-[#393f5b] mb-3">
                With Spardha
              </h3>
              <p className="text-sm md:text-base text-[#070a05]/70 font-light">
                Daily competition. Measurable improvement.
              </p>
            </div>

            {/* Clean Dashboard Card with glassmorphism */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white backdrop-blur-xl rounded-xl border border-[#070a05]/10 shadow-lg p-6 overflow-hidden"
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#393f5b]/5 via-transparent to-[#393f5b]/8 pointer-events-none" />
              <motion.div
                className="absolute inset-0 bg-[#393f5b]/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-[#070a05]/40 tracking-wider uppercase">
                    Performance
                  </span>
                  <TrendingUp size={16} className="text-[#393f5b]" />
                </div>

                {/* Animated Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#070a05]/70">Accuracy</span>
                    <motion.span
                      key={accuracy}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-2xl font-light text-[#393f5b]"
                    >
                      {accuracy}%
                    </motion.span>
                  </div>
                  <div className="relative h-1.5 bg-[#070a05]/5 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#393f5b] rounded-full"
                      style={{ width: `${accuracy}%` }}
                    />
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#393f5b]/60 rounded-full blur-sm opacity-50"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#070a05]/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#070a05]/70">Rank</span>
                    <motion.span
                      key={rank}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-2xl font-light text-[#393f5b]"
                    >
                      #{rank.toLocaleString()}
                    </motion.span>
                  </div>
                </div>

                {/* Rising graph */}
                <div className="pt-4 h-24 flex items-end gap-1">
                  {[45, 52, 58, 65, 72, 78, 85, 88, 92, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={
                        isInView && graphProgress >= i * 10
                          ? { height: `${height}%` }
                          : {}
                      }
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex-1 bg-[#393f5b]/80 rounded-sm relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[#393f5b]/40 blur-sm" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Center Overlay Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 md:mt-24"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#393f5b] leading-relaxed">
            Your preparation defines your future.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-4 text-sm md:text-base text-[#070a05]/60 font-light"
          >
            Small daily improvements create massive rank shifts.
          </motion.p>
        </motion.div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,63,91,0.03),transparent_70%)] pointer-events-none" />
    </section>
  );
}
