"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface StepMorningProps {
  progress: MotionValue<number>;
  activeStep: MotionValue<number>;
}

export default function StepMorning({ progress, activeStep }: StepMorningProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    const unsubscribe = activeStep.on("change", (latest) => {
      setCurrentStep(latest);
    });
    return () => unsubscribe();
  }, [activeStep]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      if (latest > 0.3 && latest < 0.7 && timer > 7) {
        setTimer(Math.max(7, 10 - Math.floor((latest - 0.3) * 10)));
      }
      if (latest > 0.7) {
        setShowCorrect(true);
      } else {
        setShowCorrect(false);
      }
    });
    return () => unsubscribe();
  }, [progress, timer]);

  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  if (currentStep !== 0) return null;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-2 sm:px-4"
      style={{ opacity, scale }}
    >
      {/* Title & Subtitle */}
      <motion.div
        className="text-center mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-light text-[#393f5b] mb-1 md:mb-2 leading-tight">
          Start Your Day With Competition
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#070a05]/60 font-light">
          Daily tests that simulate real exam pressure
        </p>
      </motion.div>

      {/* Test Interface Card */}
      <motion.div
        className="relative w-full max-w-md bg-white/40 backdrop-blur-sm rounded-lg md:rounded-xl border border-[#070a05]/10 p-3 sm:p-4 md:p-6 shadow-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Timer */}
        <motion.div
          className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[#070a05]/10"
          animate={{ opacity: showCorrect ? 0.3 : 1 }}
        >
          <span className="text-[9px] sm:text-[10px] md:text-xs font-light text-[#070a05]/50 tracking-wider uppercase">
            Question 1/5
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm text-[#393f5b]/70">
            <Clock size={10} className="sm:w-3 sm:h-3 md:w-[14px] md:h-[14px]" />
            <motion.span
              key={timer}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="font-light"
            >
              00:{timer.toString().padStart(2, "0")}
            </motion.span>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          className="mb-2 sm:mb-3 md:mb-4"
          animate={{ opacity: showCorrect ? 0.5 : 1 }}
        >
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#070a05]/80 font-light leading-relaxed">
            A ball is thrown vertically upward with an initial velocity of 20 m/s. What is its maximum height? (g = 10 m/s²)
          </p>
        </motion.div>

        {/* Options */}
        <div className="space-y-1.5 sm:space-y-2">
          {[
            { label: "A", text: "10 m", correct: false },
            { label: "B", text: "20 m", correct: true },
            { label: "C", text: "30 m", correct: false },
            { label: "D", text: "40 m", correct: false },
          ].map((option, i) => (
            <motion.div
              key={option.label}
              className={`relative p-2 sm:p-2.5 md:p-3 rounded-md md:rounded-lg border transition-all duration-300 ${
                showCorrect && option.correct
                  ? "bg-teal-50/50 border-teal-600/30"
                  : "bg-white/30 border-[#070a05]/10 hover:bg-white/50"
              }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <span className="text-[9px] sm:text-[10px] md:text-xs font-light text-[#070a05]/50">
                  {option.label}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm text-[#070a05]/70 font-light break-words">
                  {option.text}
                </span>
              </div>

              {/* Checkmark for correct answer */}
              {showCorrect && option.correct && (
                <motion.div
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-teal-600/20 flex items-center justify-center">
                    <span className="text-teal-800 text-[10px] sm:text-xs md:text-sm">✓</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Correct message */}
        {showCorrect && (
          <motion.div
            className="mt-2 sm:mt-3 md:mt-4 pt-2 md:pt-3 border-t border-[#070a05]/10 text-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="text-[10px] sm:text-xs md:text-sm text-teal-800/70 font-light">
              Correct! +10 points
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Time indicator */}
      <motion.div
        className="mt-3 sm:mt-4 md:mt-6 text-[9px] sm:text-[10px] md:text-xs text-[#070a05]/40 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
         Morning · 7:00 AM
      </motion.div>
    </motion.div>
  );
}
