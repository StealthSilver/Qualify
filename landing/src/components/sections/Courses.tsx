/**
 * Courses Section Component
 * 
 * A minimal, expandable course list interface inspired by Stripe's design philosophy
 * Features:
 * - Expandable accordion-style course items
 * - Only one item expanded at a time
 * - Smooth Framer Motion animations
 * - Clean, spacious layout
 * - Accessibility support (keyboard navigation, reduced motion)
 * - Responsive design
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, X, ChevronRight, ArrowRight } from "lucide-react";

interface Course {
  id: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  duration: string;
  difficulty: string;
  price: string;
}

const COURSES: Course[] = [
  {
    id: "physics-pressure",
    title: "Master Physics Under Exam Pressure",
    tag: "Physics",
    description: "Build strong conceptual clarity and solve under real exam conditions.",
    features: [
      "Daily competitive tests",
      "Topic-wise DPPs",
      "Performance analytics"
    ],
    duration: "3 months",
    difficulty: "Advanced",
    price: "₹1999"
  },
  {
    id: "chemistry-organic",
    title: "Organic Chemistry Mastery",
    tag: "Chemistry",
    description: "Master reaction mechanisms and synthesis strategies with systematic problem-solving.",
    features: [
      "Video lectures on mechanisms",
      "Daily practice problems",
      "Quick revision notes"
    ],
    duration: "2 months",
    difficulty: "Intermediate",
    price: "₹1799"
  },
  {
    id: "math-calculus",
    title: "Advanced Calculus & Integration",
    tag: "Mathematics",
    description: "Deep dive into calculus with extensive practice and exam-oriented problem sets.",
    features: [
      "Concept-building sessions",
      "Targeted DPPs",
      "Doubt support"
    ],
    duration: "3 months",
    difficulty: "Advanced",
    price: "₹2199"
  },
  {
    id: "full-test-series",
    title: "Complete JEE Test Series",
    tag: "Test Series",
    description: "Comprehensive test series covering all subjects with detailed performance analytics.",
    features: [
      "Full-length mock tests",
      "Subject-wise tests",
      "All-India rank tracking"
    ],
    duration: "6 months",
    difficulty: "All Levels",
    price: "₹2999"
  },
  {
    id: "weak-topics-dpp",
    title: "Personalized Weak Topics DPP",
    tag: "Adaptive",
    description: "AI-powered daily practice problems targeting your weakest areas based on performance.",
    features: [
      "AI-driven recommendations",
      "Adaptive difficulty",
      "Progress tracking"
    ],
    duration: "Ongoing",
    difficulty: "Personalized",
    price: "₹1499"
  },
  {
    id: "revision-module",
    title: "Smart Revision & Retention System",
    tag: "Revision",
    description: "Scientifically designed revision schedules to ensure long-term retention of concepts.",
    features: [
      "Spaced repetition algorithm",
      "Quick concept tests",
      "Revision reminders"
    ],
    duration: "Ongoing",
    difficulty: "All Levels",
    price: "₹1299"
  },
];

export default function Courses() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(id);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f3f6f8] text-[#070a05] overflow-hidden py-20 md:py-32"
    >
      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-4">
            Explore Our{" "}
            <span className="text-[#393f5b]">Courses</span>
          </h2>
          <p className="text-sm md:text-base text-[#070a05]/60 font-light">
            Focused programs designed to improve your rank, step by step.
          </p>
        </motion.div>

        {/* Course List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-0"
        >
          {COURSES.map((course, index) => (
            <CourseAccordionItem
              key={course.id}
              course={course}
              isExpanded={expandedId === course.id}
              onToggle={() => handleToggle(course.id)}
              onKeyDown={(e) => handleKeyDown(e, course.id)}
              prefersReducedMotion={prefersReducedMotion}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20 md:mt-24"
        >
          <p className="text-lg md:text-xl text-[#070a05]/70 font-light mb-6">
            Not sure where to start?
          </p>
          <motion.button
            whileHover={
              prefersReducedMotion
                ? {}
                : {
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(57, 63, 91, 0.2)",
                  }
            }
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="relative bg-[#393f5b] text-white px-8 py-4 rounded-md text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Get Personalized Plan
              <span className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                <ChevronRight
                  size={18}
                  className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2"
                />
                <ArrowRight
                  size={18}
                  className="absolute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,63,91,0.03),transparent_70%)] pointer-events-none" />
    </section>
  );
}

interface CourseAccordionItemProps {
  course: Course;
  isExpanded: boolean;
  onToggle: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  prefersReducedMotion: boolean;
  index: number;
  isInView: boolean;
}

function CourseAccordionItem({
  course,
  isExpanded,
  onToggle,
  onKeyDown,
  prefersReducedMotion,
  index,
  isInView,
}: CourseAccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
      className={`relative border-b border-[#070a05]/10 transition-colors duration-300 ${
        isExpanded ? "bg-white/30" : "hover:bg-white/20"
      }`}
    >
      {/* Collapsed State - Header */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        className="flex items-center justify-between py-8 cursor-pointer group"
      >
        {/* Left: Title & Tag */}
        <div className="flex items-center gap-4 flex-1">
          <motion.h3
            className="text-lg md:text-xl font-light text-[#070a05] transition-transform duration-300 group-hover:translate-x-1"
            animate={prefersReducedMotion ? {} : {}}
          >
            {course.title}
          </motion.h3>
          <span className="text-xs px-3 py-1 rounded-full bg-[#393f5b]/10 text-[#393f5b] font-light">
            {course.tag}
          </span>
        </div>

        {/* Right: Icon */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: isExpanded ? 45 : 0,
                }
          }
          transition={{ duration: 0.3 }}
          className="ml-4"
        >
          <div className="w-6 h-6 flex items-center justify-center text-[#393f5b] group-hover:scale-110 transition-transform duration-300">
            {isExpanded ? <X size={20} /> : <Plus size={20} />}
          </div>
        </motion.div>
      </div>

      {/* Expanded State - Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, height: 0 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, height: "auto" }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 pt-2 px-6 md:px-8 grid md:grid-cols-2 gap-8">
              {/* Left Side - Description & Features */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-6"
              >
                <p className="text-sm text-[#070a05]/70 font-light leading-relaxed">
                  {course.description}
                </p>

                <div>
                  <h4 className="text-sm font-medium text-[#393f5b] mb-3">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={
                          prefersReducedMotion ? {} : { opacity: 0, x: -10 }
                        }
                        animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                        className="flex items-start gap-2 text-sm text-[#070a05]/60 font-light"
                      >
                        <span className="text-[#393f5b] mt-1">•</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Right Side - Metrics & CTA */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/60 backdrop-blur-xl rounded-lg border border-[#070a05]/10 p-4">
                    <p className="text-xs text-[#070a05]/50 font-light mb-1">
                      Duration
                    </p>
                    <p className="text-sm text-[#393f5b] font-medium">
                      {course.duration}
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-xl rounded-lg border border-[#070a05]/10 p-4">
                    <p className="text-xs text-[#070a05]/50 font-light mb-1">
                      Difficulty
                    </p>
                    <p className="text-sm text-[#393f5b] font-medium">
                      {course.difficulty}
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-xl rounded-lg border border-[#070a05]/10 p-4">
                    <p className="text-xs text-[#070a05]/50 font-light mb-1">
                      Price
                    </p>
                    <p className="text-sm text-[#393f5b] font-medium">
                      {course.price}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.02,
                          boxShadow: "0 10px 30px rgba(57, 63, 91, 0.15)",
                        }
                  }
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  className="w-full bg-[#393f5b] text-white px-6 py-3 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[#2f3450] group"
                >
                  <span className="flex items-center justify-center gap-2">
                    View Course
                    <ChevronRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle glow effect when expanded */}
      {isExpanded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#393f5b]/5 via-transparent to-[#393f5b]/5 pointer-events-none rounded-sm" />
      )}
    </motion.div>
  );
}
