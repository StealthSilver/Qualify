"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface StepEveningProps {
  progress: MotionValue<number>;
  activeStep: MotionValue<number>;
}

export default function StepEvening({ progress, activeStep }: StepEveningProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [accuracy, setAccuracy] = useState(68);
  const [graphProgress, setGraphProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = activeStep.on("change", (latest) => {
      setCurrentStep(latest);
    });
    return () => unsubscribe();
  }, [activeStep]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      if (latest > 0.3) {
        const newAccuracy = Math.min(91, 68 + Math.floor((latest - 0.3) * 35));
        setAccuracy(newAccuracy);
        setGraphProgress(Math.min(100, (latest - 0.3) * 150));
      } else {
        setAccuracy(68);
        setGraphProgress(0);
      }
    });
    return () => unsubscribe();
  }, [progress]);

  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);
  const y = useTransform(progress, [0, 0.2], [30, 0]);

  if (currentStep !== 2) return null;

  const graphData = [45, 52, 58, 65, 72, 78, 85, 88, 91, 91];

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
          Know Exactly Where You Stand
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-[#070a05]/60 font-light">
          Track accuracy, speed, and improvement in real-time
        </p>
      </motion.div>

      {/* Analytics Dashboard Card */}
      <motion.div
        className="relative w-full max-w-md bg-white/40 backdrop-blur-sm rounded-lg md:rounded-xl border border-[#070a05]/10 p-4 md:p-6 shadow-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[#070a05]/10">
          <span className="text-[10px] sm:text-xs font-light text-[#070a05]/50 tracking-wider uppercase">
            Analytics
          </span>
          <div className="flex items-center gap-1.5 md:gap-2">
            <TrendingUp size={12} className="sm:w-[14px] sm:h-[14px] text-teal-700/50" />
            <span className="text-[10px] sm:text-xs text-teal-800/70 font-light">
              Improving
            </span>
          </div>
        </div>

        {/* Accuracy Display */}
        <motion.div className="mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <span className="text-xs sm:text-sm text-[#070a05]/70 font-light">
              Overall Accuracy
            </span>
            <motion.span
              key={accuracy}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-lg sm:text-xl md:text-2xl font-light text-teal-800/70"
            >
              {accuracy}%
            </motion.span>
          </div>
          <div className="relative h-1.5 md:h-2 bg-[#070a05]/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-700/60 to-cyan-700/50 rounded-full"
              style={{ width: `${accuracy}%` }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 bg-teal-600/30 rounded-full blur-sm opacity-50"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </motion.div>

        {/* Performance Graph */}
        <div className="mb-3 md:mb-4">
          <p className="text-[10px] sm:text-xs text-[#070a05]/50 font-light mb-2 md:mb-3">
            Last 10 days:
          </p>
          <div className="h-24 md:h-32 flex items-end gap-1 md:gap-1.5 bg-gradient-to-t from-[#070a05]/[0.02] to-transparent rounded-lg p-2 md:p-3">
            {graphData.map((height, i) => (
              <div
                key={i}
                className="flex-1 relative"
                style={{ height: "100%" }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-700/60 to-blue-700/50 rounded-sm overflow-hidden"
                  initial={{ height: "20%" }}
                  animate={
                    graphProgress >= i * 10
                      ? { height: `${height}%` }
                      : { height: "20%" }
                  }
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="absolute inset-0 bg-sky-600/25 blur-sm" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 pt-2 md:pt-3 border-t border-[#070a05]/10">
          <motion.div
            className="p-2 md:p-3 rounded-lg bg-white/30 border border-[#070a05]/10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-[10px] sm:text-xs text-[#070a05]/50 font-light mb-0.5 md:mb-1">
              Avg. Speed
            </div>
            <div className="text-sm sm:text-base md:text-lg text-[#393f5b]/80 font-light">
              1m 12s
            </div>
          </motion.div>
          <motion.div
            className="p-2 md:p-3 rounded-lg bg-white/30 border border-[#070a05]/10"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="text-[10px] sm:text-xs text-[#070a05]/50 font-light mb-0.5 md:mb-1">
              Solved Today
            </div>
            <div className="text-sm sm:text-base md:text-lg text-[#393f5b]/80 font-light">
              24
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Time indicator */}
      <motion.div
        className="mt-4 md:mt-6 text-[10px] sm:text-xs text-[#070a05]/40 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Evening · 6:00 PM
      </motion.div>
    </motion.div>
  );
}
