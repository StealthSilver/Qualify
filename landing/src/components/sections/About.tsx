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
      id="about"
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
            className="relative p-6 md:p-8 lg:pr-6"
          >
            {/* Title */}
            <div className="mb-5">
              <h3 className="text-xl md:text-2xl font-light text-[#070a05]/70 mb-2">
                Without Spardha
              </h3>
              <p className="text-xs md:text-sm text-[#070a05]/50 font-light">
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
              className="relative bg-white/40 backdrop-blur-sm rounded-xl border border-[#070a05]/5 p-5 opacity-60 blur-[0.5px]"
            >
              {/* Messy notes layout */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-[#070a05]/30 tracking-wider uppercase">
                    Performance
                  </span>
                  <TrendingDown size={14} className="text-red-400/40" />
                </div>

                {/* Static Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#070a05]/50">Accuracy</span>
                    <span className="text-xl font-light text-red-500/40">
                      42%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#070a05]/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400/30 rounded-full"
                      style={{ width: "42%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#070a05]/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#070a05]/50">Rank</span>
                    <span className="text-xl font-light text-[#070a05]/40">
                      #12,430
                    </span>
                  </div>
                </div>

                {/* Flat graph */}
                <div className="pt-3 h-20 flex items-end gap-1">
                  {[32, 28, 35, 30, 33, 29, 31, 34, 30, 32].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-red-400/15 rounded-sm"
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
            className="relative p-6 md:p-8 lg:pl-6"
          >
            {/* Title */}
            <div className="mb-5">
              <h3 className="text-xl md:text-2xl font-light text-[#393f5b] mb-2">
                With Spardha
              </h3>
              <p className="text-xs md:text-sm text-[#070a05]/70 font-light">
                Daily competition. Measurable improvement.
              </p>
            </div>

            {/* Clean Dashboard Card with glassmorphism */}
            <motion.div
              transition={{ duration: 0.3 }}
              className="group relative bg-white backdrop-blur-xl rounded-xl border border-[#070a05]/10 shadow-lg p-5 overflow-hidden"
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#393f5b]/5 via-transparent to-[#393f5b]/8 pointer-events-none" />
              <motion.div
                className="absolute inset-0 bg-[#393f5b]/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-[#070a05]/40 tracking-wider uppercase">
                    Performance
                  </span>
                  <TrendingUp size={14} className="text-teal-700/50" />
                </div>

                {/* Animated Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#070a05]/70">Accuracy</span>
                    <motion.span
                      key={accuracy}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xl font-light text-teal-800/70"
                    >
                      {accuracy}%
                    </motion.span>
                  </div>
                  <div className="relative h-1.5 bg-[#070a05]/5 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-700/50 to-cyan-700/45 rounded-full"
                      style={{ width: `${accuracy}%` }}
                    />
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-teal-600/30 rounded-full blur-sm opacity-50"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#070a05]/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#070a05]/70">Rank</span>
                    <motion.span
                      key={rank}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xl font-light text-slate-700/70"
                    >
                      #{rank.toLocaleString()}
                    </motion.span>
                  </div>
                </div>

                {/* Rising graph */}
                <div className="pt-3 h-20 flex items-end gap-1">
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
                      className="flex-1 bg-gradient-to-t from-sky-700/50 to-blue-700/45 rounded-sm relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-sky-600/25 blur-sm" />
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

        {/* Anatomy of a Topper Section */}
        <AnatomyOfTopper />
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,63,91,0.03),transparent_70%)] pointer-events-none" />
    </section>
  );
}

function AnatomyOfTopper() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animated metrics
  const [streak, setStreak] = useState(3);
  const [accuracy, setAccuracy] = useState(68);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(10);
  const [revisionBars, setRevisionBars] = useState([false, false, false, false, false]);

  useEffect(() => {
    if (isInView) {
      // Streak animation: 3 → 27
      const streakInterval = setInterval(() => {
        setStreak((prev) => {
          if (prev >= 27) {
            clearInterval(streakInterval);
            return 27;
          }
          return prev + 1;
        });
      }, 50);

      // Accuracy animation: 68% → 94%
      const accuracyInterval = setInterval(() => {
        setAccuracy((prev) => {
          if (prev >= 94) {
            clearInterval(accuracyInterval);
            return 94;
          }
          return prev + 1;
        });
      }, 50);

      // Timer animation: 2m 10s → 58s
      const timerInterval = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec > 0) {
            return prevSec - 1;
          } else if (minutes > 0) {
            setMinutes((prevMin) => prevMin - 1);
            return 59;
          }
          return prevSec;
        });

        // Stop when we reach 0m 58s
        if (minutes === 0 && seconds <= 58) {
          setSeconds(58);
          clearInterval(timerInterval);
        }
      }, 40);

      // Revision bars animation
      const revisionInterval = setInterval(() => {
        setRevisionBars((prev) => {
          const currentIndex = prev.findIndex((val) => !val);
          if (currentIndex !== -1) {
            const newBars = [...prev];
            newBars[currentIndex] = true;
            return newBars;
          }
          clearInterval(revisionInterval);
          return prev;
        });
      }, 300);

      return () => {
        clearInterval(streakInterval);
        clearInterval(accuracyInterval);
        clearInterval(timerInterval);
        clearInterval(revisionInterval);
      };
    }
  }, [isInView, minutes, seconds]);

  // Subtle parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 10, y: y * 10 });
  };

  const cards = [
    {
      title: "Consistency",
      description: "Daily practice builds unstoppable momentum.",
      metric: `${streak} days`,
      metricLabel: "streak",
      accentColor: "from-emerald-500/20 to-teal-500/20",
      glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      textAccent: "text-emerald-700/80",
    },
    {
      title: "Accuracy",
      description: "Fewer mistakes. Better understanding.",
      metric: `${accuracy}%`,
      metricLabel: "accuracy",
      accentColor: "from-blue-500/20 to-indigo-500/20",
      glowColor: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      textAccent: "text-blue-700/80",
    },
    {
      title: "Speed",
      description: "Solve faster under real exam pressure.",
      metric:
        minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`,
      metricLabel: "time",
      accentColor: "from-amber-500/20 to-orange-500/20",
      glowColor: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      textAccent: "text-amber-700/80",
    },
    {
      title: "Revision",
      description: "Smart revision ensures nothing is forgotten.",
      metric: null,
      metricLabel: "revision",
      accentColor: "from-purple-500/20 to-violet-500/20",
      glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      textAccent: "text-purple-700/80",
      customMetric: (
        <div className="flex gap-1.5 justify-center">
          {revisionBars.map((active, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={active ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.3 }}
              className={`w-1.5 h-6 rounded-full ${
                active
                  ? "bg-gradient-to-t from-purple-600/90 to-violet-500/90 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  : "bg-[#070a05]/10"
              }`}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative mt-32 md:mt-40"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#070a05] mb-4 tracking-tight">
          What Makes a Topper?
        </h2>
        <p className="text-base md:text-lg text-[#070a05]/60 font-light">
          It&apos;s not talent. It&apos;s systems, tracked daily.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
        {/* Connection Lines - visible on desktop */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Horizontal line connecting cards 1-2 */}
          <motion.line
            x1="50%"
            y1="25%"
            x2="50%"
            y2="25%"
            stroke="rgba(57,63,91,0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          {/* Vertical line connecting cards 1-3 */}
          <motion.line
            x1="25%"
            y1="50%"
            x2="25%"
            y2="50%"
            stroke="rgba(57,63,91,0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          />
          {/* Vertical line connecting cards 2-4 */}
          <motion.line
            x1="75%"
            y1="50%"
            x2="75%"
            y2="50%"
            stroke="rgba(57,63,91,0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          />
          {/* Horizontal line connecting cards 3-4 */}
          <motion.line
            x1="50%"
            y1="75%"
            x2="50%"
            y2="75%"
            stroke="rgba(57,63,91,0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          />
          {/* Pulsing glow */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="4"
            fill="rgba(57,63,91,0.3)"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.15 }}
            whileHover={{
              y: -4,
            }}
            className={`group relative bg-white/60 backdrop-blur-xl rounded-xl border border-[#070a05]/10 shadow-lg p-6 md:p-7 overflow-hidden transition-all duration-300 ${card.glowColor}`}
            style={{
              transform: `translate(${mousePosition.x * (index % 2 === 0 ? 1 : -1)}px, ${
                mousePosition.y * (index < 2 ? 1 : -1)
              }px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Subtle gradient overlay - no hover color change */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#393f5b]/5 via-transparent to-[#393f5b]/8 pointer-events-none" />

            {/* Hover glow - subtle */}
            <motion.div
              className="absolute inset-0 bg-[#393f5b]/5 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />

            {/* Card Content */}
            <div className="relative space-y-4">
              {/* Title */}
              <h3 className="text-lg md:text-xl font-light text-[#393f5b]">
                {card.title}
              </h3>

              {/* Metric */}
              <div className="py-2">
                {card.customMetric ? (
                  card.customMetric
                ) : (
                  <motion.div
                    key={card.metric}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-3xl md:text-4xl font-light text-center ${card.textAccent} transition-transform duration-300`}
                  >
                    {card.metric}
                  </motion.div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-[#070a05]/70 font-light leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center mt-16 md:mt-20"
      >
        <p className="text-xl md:text-2xl font-light text-[#393f5b] leading-relaxed">
          Spardha doesn&apos;t just test you. It trains you.
        </p>
      </motion.div>
    </div>
  );
}
