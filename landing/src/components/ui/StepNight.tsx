"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Trophy } from "lucide-react";
import { useState, useEffect } from "react";

interface StepNightProps {
  progress: MotionValue<number>;
  activeStep: MotionValue<number>;
}

export default function StepNight({ progress, activeStep }: StepNightProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [rank, setRank] = useState(1200);
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = activeStep.on("change", (latest) => {
      setCurrentStep(latest);
    });
    return () => unsubscribe();
  }, [activeStep]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      if (latest > 0.3) {
        const newRank = Math.max(240, 1200 - Math.floor((latest - 0.3) * 1400));
        setRank(newRank);
        setBarProgress(Math.min(100, (latest - 0.3) * 150));
      } else {
        setRank(1200);
        setBarProgress(0);
      }
    });
    return () => unsubscribe();
  }, [progress]);

  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);
  const y = useTransform(progress, [0, 0.2], [30, 0]);

  if (currentStep !== 3) return null;

  const leaderboardEntries = [
    { rank: 238, name: "Arjun K.", score: 8450 },
    { rank: 239, name: "Priya M.", score: 8445 },
    { rank: 240, name: "You", score: 8440, isUser: true },
    { rank: 241, name: "Rahul S.", score: 8430 },
    { rank: 242, name: "Neha T.", score: 8425 },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ opacity, scale, y }}
    >
      {/* Title & Subtitle */}
      <motion.div
        className="text-center mb-6 md:mb-8 px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-base sm:text-lg md:text-2xl font-light text-[#393f5b] mb-1 md:mb-2">
          See Your Rank Improve Daily
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-[#070a05]/60 font-light">
          Compete with real students and track your growth
        </p>
      </motion.div>

      {/* Leaderboard Card */}
      <motion.div
        className="relative w-full max-w-md bg-white/40 backdrop-blur-sm rounded-lg md:rounded-xl border border-[#070a05]/10 p-4 md:p-6 shadow-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Header with Rank */}
        <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[#070a05]/10">
          <span className="text-[10px] sm:text-xs font-light text-[#070a05]/50 tracking-wider uppercase">
            Your Rank
          </span>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Trophy size={12} className="sm:w-[14px] sm:h-[14px] text-amber-700/50" />
            <motion.span
              key={rank}
              initial={{ scale: 1.2, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-base sm:text-lg md:text-xl font-light text-[#393f5b]/80"
            >
              #{rank}
            </motion.span>
          </div>
        </div>

        {/* Rank Improvement */}
        <motion.div className="mb-3 md:mb-4 p-2 md:p-3 rounded-lg bg-gradient-to-r from-emerald-50/30 to-teal-50/20 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <span className="text-[10px] sm:text-xs text-[#070a05]/60 font-light">
              This Week
            </span>
            <span className="text-[10px] sm:text-xs text-emerald-800/70 font-light">
              ↑ {1200 - rank} places
            </span>
          </div>
          <div className="relative h-1.5 md:h-2 bg-[#070a05]/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-700/60 to-teal-700/50 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${barProgress}%` }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 bg-emerald-600/30 rounded-full blur-sm opacity-50"
              initial={{ width: "0%" }}
              animate={{ width: `${barProgress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>

        {/* Leaderboard List */}
        <div className="space-y-1 md:space-y-1.5">
          <p className="text-[10px] sm:text-xs text-[#070a05]/50 font-light mb-1.5 md:mb-2">
            Current standings:
          </p>
          {leaderboardEntries.map((entry, i) => (
            <motion.div
              key={entry.rank}
              className={`flex items-center justify-between p-2 md:p-2.5 rounded-lg transition-all duration-300 ${
                entry.isUser
                  ? "bg-gradient-to-r from-[#393f5b]/10 to-blue-500/5 border border-[#393f5b]/20"
                  : "bg-white/20 border border-[#070a05]/5"
              }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <span
                  className={`text-[10px] sm:text-xs font-light ${
                    entry.isUser ? "text-[#393f5b]/70" : "text-[#070a05]/40"
                  }`}
                >
                  #{entry.rank}
                </span>
                <span
                  className={`text-xs sm:text-sm font-light ${
                    entry.isUser ? "text-[#393f5b]/90" : "text-[#070a05]/70"
                  }`}
                >
                  {entry.name}
                </span>
              </div>
              <span
                className={`text-[10px] sm:text-xs font-light ${
                  entry.isUser ? "text-[#393f5b]/60" : "text-[#070a05]/50"
                }`}
              >
                {entry.score.toLocaleString()}
              </span>

              {/* Glow pulse for user entry */}
              {entry.isUser && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-[#393f5b]/10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Next Milestone */}
        <motion.div
          className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-[#070a05]/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[10px] sm:text-xs text-[#070a05]/60 font-light">
            Next milestone: Top 200
          </span>
        </motion.div>
      </motion.div>

      {/* Time indicator */}
      <motion.div
        className="mt-4 md:mt-6 text-[10px] sm:text-xs text-[#070a05]/40 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Night · 10:00 PM
      </motion.div>
    </motion.div>
  );
}
