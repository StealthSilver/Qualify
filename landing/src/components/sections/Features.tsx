"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import StoryFrame from "../ui/StoryFrame";
import StepMorning from "../ui/StepMorning";
import StepAfternoon from "../ui/StepAfternoon";
import StepEvening from "../ui/StepEvening";
import StepNight from "../ui/StepNight";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activeStepValue = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Divide scroll into 4 phases + final CTA
  const morningProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const afternoonProgress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const eveningProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const nightProgress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const ctaProgress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Update active step value
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.2) activeStepValue.set(0);
      else if (latest < 0.4) activeStepValue.set(1);
      else if (latest < 0.6) activeStepValue.set(2);
      else if (latest < 0.8) activeStepValue.set(3);
      else activeStepValue.set(4);
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeStepValue]);

  if (prefersReducedMotion) {
    return <FeaturesStatic />;
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f3f6f8] text-[#070a05]"
      style={{ height: "500vh", position: "relative" }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,63,91,0.03),transparent_70%)] pointer-events-none" />

        {/* Subtle animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#393f5b]/10"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-2 h-2 rounded-full bg-[#393f5b]/10"
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Main Content Container */}
        <div className="relative h-full w-full flex flex-col items-center justify-center px-6 md:px-12">
          {/* Section Title - fades out as scroll progresses */}
          <motion.div
            className="absolute top-12 md:top-16 text-center pt-6 md:pt-8"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
            }}
          >
            <h2 className="text-xs font-light text-[#070a05]/50 tracking-[0.2em] uppercase">
              A Day Inside{" "}
              <span className="text-[#070a05]/50">Spardha</span>
            </h2>
          </motion.div>

          {/* Story Frame Container */}
          <StoryFrame ctaProgress={ctaProgress} scrollYProgress={scrollYProgress}>
            {/* Morning - Daily Test */}
            <StepMorning progress={morningProgress} activeStep={activeStepValue} />

            {/* Afternoon - Smart Practice */}
            <StepAfternoon progress={afternoonProgress} activeStep={activeStepValue} />

            {/* Evening - Analytics */}
            <StepEvening progress={eveningProgress} activeStep={activeStepValue} />

            {/* Night - Rank & Progress */}
            <StepNight progress={nightProgress} activeStep={activeStepValue} />
          </StoryFrame>
        </div>
      </div>
    </section>
  );
}

function FeaturesStatic() {
  return (
    <section className="relative w-full bg-[#f3f6f8] text-[#070a05] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#070a05] tracking-tight">
            A Day Inside <span className="text-[#393f5b]">Spardha</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#070a05]/60 font-light">
            Your complete preparation journey
          </p>
        </div>

        <div className="space-y-12">
          <div className="bg-white/60 backdrop-blur-xl rounded-xl border border-[#070a05]/10 shadow-lg p-8">
            <h3 className="text-2xl font-light text-[#393f5b] mb-4">
              🌅 Morning — Daily Test
            </h3>
            <p className="text-[#070a05]/70 font-light">
              Start Your Day With Competition. Daily tests that simulate real exam pressure.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-xl border border-[#070a05]/10 shadow-lg p-8">
            <h3 className="text-2xl font-light text-[#393f5b] mb-4">
              🧠 Afternoon — Smart Practice
            </h3>
            <p className="text-[#070a05]/70 font-light">
              Practice What You&apos;re Weak At. Automatically generated DPPs based on your performance.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-xl border border-[#070a05]/10 shadow-lg p-8">
            <h3 className="text-2xl font-light text-[#393f5b] mb-4">
              📊 Evening — Advanced Analytics
            </h3>
            <p className="text-[#070a05]/70 font-light">
              Know Exactly Where You Stand. Track accuracy, speed, and improvement in real-time.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-xl border border-[#070a05]/10 shadow-lg p-8">
            <h3 className="text-2xl font-light text-[#393f5b] mb-4">
              🏁 Night — Rank & Progress
            </h3>
            <p className="text-[#070a05]/70 font-light">
              See Your Rank Improve Daily. Compete with real students and track your growth.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#393f5b] mb-6 leading-relaxed">
            Small daily improvements. Massive rank shifts.
          </p>
          <button className="bg-[#393f5b] text-white px-8 py-4 rounded-lg text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#2f3450]">
            Start Competing
          </button>
        </div>
      </div>
    </section>
  );
}
