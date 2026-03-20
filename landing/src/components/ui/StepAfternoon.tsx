"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Target } from "lucide-react";
import { useState, useEffect } from "react";

interface StepAfternoonProps {
  progress: MotionValue<number>;
  activeStep: MotionValue<number>;
}

export default function StepAfternoon({ progress, activeStep }: StepAfternoonProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionsVisible, setQuestionsVisible] = useState(0);

  useEffect(() => {
    const unsubscribe = activeStep.on("change", (latest) => {
      setCurrentStep(latest);
    });
    return () => unsubscribe();
  }, [activeStep]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      if (latest > 0.4) {
        setQuestionsVisible(Math.min(3, Math.floor((latest - 0.4) * 5)));
      } else {
        setQuestionsVisible(0);
      }
    });
    return () => unsubscribe();
  }, [progress]);

  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);
  const y = useTransform(progress, [0, 0.2], [30, 0]);

  if (currentStep !== 1) return null;

  const weakTopics = [
    { name: "Electrostatics", accuracy: 62 },
    { name: "Organic Chemistry", accuracy: 58 },
    { name: "Calculus", accuracy: 71 },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-2 sm:px-4"
      style={{ opacity, scale, y }}
    >
      {/* Title & Subtitle */}
      <motion.div
        className="text-center mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-light text-[#393f5b] mb-1 md:mb-2 leading-tight">
          Practice What You&apos;re Weak At
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#070a05]/60 font-light">
          Automatically generated DPPs based on your performance
        </p>
      </motion.div>

      {/* Practice Dashboard Card */}
      <motion.div
        className="relative w-full max-w-md bg-white/40 backdrop-blur-sm rounded-lg md:rounded-xl border border-[#070a05]/10 p-3 sm:p-4 md:p-6 shadow-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[#070a05]/10">
          <span className="text-[10px] sm:text-xs font-light text-[#070a05]/50 tracking-wider uppercase">
            Smart Practice
          </span>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Target size={12} className="sm:w-[14px] sm:h-[14px] text-[#393f5b]/50" />
            <span className="text-[10px] sm:text-xs text-[#393f5b]/70 font-light">
              DPP #47
            </span>
          </div>
        </div>

        {/* Weak Topics Section */}
        <div className="mb-3 md:mb-4">
          <p className="text-[10px] sm:text-xs text-[#070a05]/50 font-light mb-2 md:mb-3">
            Your weak topics:
          </p>
          <div className="space-y-1.5 md:space-y-2">
            {weakTopics.map((topic, i) => (
              <motion.div
                key={topic.name}
                className="relative p-2 md:p-3 rounded-lg bg-gradient-to-r from-amber-50/30 to-orange-50/20 border border-amber-500/20"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[#070a05]/80 font-light">
                    {topic.name}
                  </span>
                  <span className="text-[10px] sm:text-xs text-amber-800/60 font-light">
                    {topic.accuracy}% accuracy
                  </span>
                </div>

                {/* Subtle pulse on first topic */}
                {i === 0 && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-amber-500/10"
                    animate={{
                      opacity: [0.5, 0.2, 0.5],
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
        </div>

        {/* Generated Questions */}
        <div className="pt-2 md:pt-3 border-t border-[#070a05]/10">
          <p className="text-[10px] sm:text-xs text-[#070a05]/50 font-light mb-2 md:mb-3">
            Generated questions:
          </p>
          <div className="space-y-1.5 md:space-y-2">
            {[1, 2, 3].map((num, i) => (
              <motion.div
                key={num}
                className={`p-2 md:p-3 rounded-lg border transition-all duration-300 ${
                  i < questionsVisible
                    ? "bg-white/50 border-[#070a05]/10"
                    : "bg-white/20 border-[#070a05]/5 opacity-30"
                }`}
                initial={{ x: -20, opacity: 0 }}
                animate={
                  i < questionsVisible
                    ? { x: 0, opacity: 1 }
                    : { x: -20, opacity: 0.3 }
                }
                transition={{ delay: 0.8 + i * 0.2 }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#393f5b]/10 flex items-center justify-center">
                    <span className="text-[10px] sm:text-xs text-[#393f5b]/70 font-light">
                      {num}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="h-1.5 md:h-2 bg-[#070a05]/10 rounded-full w-full" />
                    <div className="h-1.5 md:h-2 bg-[#070a05]/5 rounded-full w-3/4 mt-1 md:mt-1.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Start button */}
        <motion.button
          className="w-full mt-3 md:mt-4 py-2 md:py-2.5 rounded-lg bg-[#393f5b]/90 text-white text-xs sm:text-sm font-light hover:bg-[#393f5b] transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: questionsVisible >= 3 ? 1 : 0.5 }}
          whileHover={questionsVisible >= 3 ? { scale: 1.02 } : {}}
        >
          Start Practice
        </motion.button>
      </motion.div>

      {/* Time indicator */}
      <motion.div
        className="mt-4 md:mt-6 text-[10px] sm:text-xs text-[#070a05]/40 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
         Afternoon · 2:00 PM
      </motion.div>
    </motion.div>
  );
}
