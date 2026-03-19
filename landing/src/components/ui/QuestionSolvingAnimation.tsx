"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface Step {
  id: number;
  text: string;
  isAnswer?: boolean;
}

interface Question {
  question: string;
  steps: Step[];
  timeLimit: number;
}

const sampleQuestions: Question[] = [
  {
    question: "Find the value of x: 2x + 5 = 13",
    steps: [
      { id: 1, text: "2x = 13 - 5" },
      { id: 2, text: "2x = 8" },
      { id: 3, text: "x = 4", isAnswer: true },
    ],
    timeLimit: 10,
  },
  {
    question: "Solve: 3(x - 2) = 15",
    steps: [
      { id: 1, text: "3x - 6 = 15" },
      { id: 2, text: "3x = 21" },
      { id: 3, text: "x = 7", isAnswer: true },
    ],
    timeLimit: 12,
  },
  {
    question: "Find: ∫ 2x dx",
    steps: [
      { id: 1, text: "= 2 ∫ x dx" },
      { id: 2, text: "= 2 · (x²/2) + C" },
      { id: 3, text: "= x² + C", isAnswer: true },
    ],
    timeLimit: 15,
  },
];

export default function QuestionSolvingAnimation() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [accuracy, setAccuracy] = useState(72);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  useEffect(() => {
    // Reset state when question changes
    setCurrentStep(-1);
    setTimeLeft(currentQuestion.timeLimit);
    setShowCorrect(false);
    setIsComplete(false);
    setAccuracy(72 + currentQuestionIndex * 8);

    // Start timer
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.5) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    // Animate steps
    const stepTimings = [1500, 2300, 3100];
    const stepTimeouts = stepTimings.map((delay, index) => {
      return setTimeout(() => {
        setCurrentStep(index);
      }, delay);
    });

    // Show correct indicator
    const correctTimeout = setTimeout(() => {
      setShowCorrect(true);
    }, 4000);

    // Animate accuracy
    const accuracyTimeout = setTimeout(() => {
      setIsComplete(true);
      const targetAccuracy = 98 - currentQuestionIndex * 2;
      const startAccuracy = 72 + currentQuestionIndex * 8;
      const duration = 1000;
      const steps = 50;
      const increment = (targetAccuracy - startAccuracy) / steps;
      
      let step = 0;
      const accuracyInterval = setInterval(() => {
        step++;
        setAccuracy((prev) => {
          const newValue = startAccuracy + increment * step;
          if (step >= steps) {
            clearInterval(accuracyInterval);
            return targetAccuracy;
          }
          return Math.round(newValue);
        });
      }, duration / steps);
    }, 4500);

    // Move to next question
    const nextQuestionTimeout = setTimeout(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % sampleQuestions.length);
    }, 8000);

    return () => {
      clearInterval(timerInterval);
      stepTimeouts.forEach(clearTimeout);
      clearTimeout(correctTimeout);
      clearTimeout(accuracyTimeout);
      clearTimeout(nextQuestionTimeout);
    };
  }, [currentQuestionIndex, currentQuestion.timeLimit]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#393f5b]/8 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#393f5b]/6 rounded-full blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Main card */}
      <motion.div
        className="relative w-full max-w-md bg-white backdrop-blur-xl rounded-2xl border border-[#070a05]/10 shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#393f5b]/5 via-transparent to-[#393f5b]/8 pointer-events-none" />
        
        {/* Timer */}
        <div className="relative px-6 pt-5 pb-3 flex items-center justify-between border-b border-[#070a05]/5">
          <motion.div
            className="text-xs font-light text-[#070a05]/40 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Question {currentQuestionIndex + 1}
          </motion.div>
          <motion.div
            className="font-mono text-sm font-medium text-[#070a05]/60"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}
            :
            {Math.floor(timeLeft % 60)
              .toString()
              .padStart(2, "0")}
          </motion.div>
        </div>

        {/* Question */}
        <div className="px-6 pt-6 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-lg font-light text-[#070a05]/90 leading-relaxed"
            >
              {currentQuestion.question}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Solution steps */}
        <div className="px-6 pb-6 space-y-3">
          <AnimatePresence>
            {currentQuestion.steps.map((step, index) => (
              index <= currentStep && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="relative"
                >
                  <div
                    className={`relative px-4 py-3 rounded-lg ${
                      step.isAnswer
                        ? "bg-[#393f5b]/10 border border-[#393f5b]/20"
                        : "bg-[#070a05]/5 border border-[#070a05]/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-light text-[#070a05]/40 min-w-[60px]">
                        Step {step.id}
                      </span>
                      <span
                        className={`font-light ${
                          step.isAnswer
                            ? "text-[#393f5b] font-normal"
                            : "text-[#070a05]/70"
                        }`}
                      >
                        {step.text}
                      </span>
                    </div>

                    {/* Answer highlight glow */}
                    {step.isAnswer && (
                      <motion.div
                        className="absolute inset-0 bg-[#393f5b]/10 rounded-lg blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.5] }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Correct badge */}
        <AnimatePresence>
          {showCorrect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mx-6 mb-5 flex items-center gap-2 px-4 py-2.5 bg-emerald-600/10 border border-emerald-600/20 rounded-lg"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600/15 flex items-center justify-center">
                <Check size={14} className="text-emerald-600" />
              </div>
              <span className="text-sm font-light text-emerald-700">
                Correct Solution
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accuracy indicator */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-light text-[#070a05]/40 tracking-wider uppercase">
              Accuracy
            </span>
            <motion.span
              className="text-sm font-medium text-[#070a05]/70"
              key={accuracy}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {accuracy}%
            </motion.span>
          </div>
          <div className="relative h-1.5 bg-[#070a05]/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#393f5b] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${accuracy}%` }}
              transition={{
                duration: isComplete ? 1 : 0.3,
                ease: "easeOut",
              }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#393f5b]/60 rounded-full blur-sm opacity-50"
              initial={{ width: "0%" }}
              animate={{ width: `${accuracy}%` }}
              transition={{
                duration: isComplete ? 1 : 0.3,
                ease: "easeOut",
              }}
            />
          </div>
          <motion.p
            className="mt-2 text-xs font-light text-[#070a05]/30 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isComplete ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            Improving with every practice
          </motion.p>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#393f5b]/20 rounded-full blur-sm"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
