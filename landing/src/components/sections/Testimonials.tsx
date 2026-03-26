"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { SIGNIN_URL } from "@/lib/app-urls";
import TestimonialCard from "../ui/TestimonialCard";

interface Testimonial {
  id: string;
  name: string;
  subtitle: string;
  problem: string;
  change: string;
  result: string;
  improvement?: string;
  rankChange?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "aman-sharma",
    name: "Aman Sharma",
    subtitle: "JEE Aspirant",
    problem: "I was stuck at around 60% accuracy and couldn't identify weak topics.",
    change: "I started taking daily tests and followed the analytics to focus on weak areas.",
    result: "Now I consistently score above 90% and improved my rank from #8000 to #1200.",
    improvement: "+30% accuracy",
    rankChange: "Rank ↑ 6800",
  },
  {
    id: "priya-verma",
    name: "Priya Verma",
    subtitle: "NEET Aspirant",
    problem: "I spent hours revising but forgot concepts within days.",
    change: "I used the smart revision system with spaced repetition.",
    result: "My retention improved dramatically. I remember concepts for months now and score consistently higher.",
    improvement: "+40% retention",
  },
  {
    id: "rohan-patel",
    name: "Rohan Patel",
    subtitle: "JEE Advanced Prep",
    problem: "Physics problems took me too long under exam pressure.",
    change: "I practiced daily with timed tests and focused on weak topics.",
    result: "Cut my solving time from 5 minutes to 2 minutes per question. Physics is now my strongest subject.",
    improvement: "+60% speed",
    rankChange: "Rank ↑ 4500",
  },
  {
    id: "neha-singh",
    name: "Neha Singh",
    subtitle: "JEE Mains Aspirant",
    problem: "I didn't know where I stood compared to other aspirants.",
    change: "Started competing daily and tracking my all-India rank.",
    result: "Went from #15,000 to #2,800 in 3 months. The competition kept me motivated.",
    rankChange: "Rank ↑ 12200",
  },
  {
    id: "arjun-desai",
    name: "Arjun Desai",
    subtitle: "NEET Aspirant",
    problem: "Organic chemistry felt impossible. I couldn't understand mechanisms.",
    change: "I followed the DPPs targeting weak chapters and watched concept videos.",
    result: "Organic chemistry became predictable. My accuracy went from 45% to 88%.",
    improvement: "+43% accuracy",
  },
  {
    id: "kavya-reddy",
    name: "Kavya Reddy",
    subtitle: "JEE Aspirant",
    problem: "I lost motivation after every bad test result.",
    change: "Analytics showed me small improvements daily, even when scores fluctuated.",
    result: "Maintained a 27-day streak. My average score jumped from 65% to 91%.",
    improvement: "+26% average",
    rankChange: "Rank ↑ 8900",
  },
  {
    id: "siddharth-kumar",
    name: "Siddharth Kumar",
    subtitle: "JEE Mains Aspirant",
    problem: "Mathematics was my weakest subject. I struggled with calculus and coordinate geometry.",
    change: "Used the chapter-wise DPPs and practiced consistently for 2 months.",
    result: "Mathematics became my highest-scoring subject. Went from 40% to 85% accuracy.",
    improvement: "+45% accuracy",
  },
  {
    id: "ananya-gupta",
    name: "Ananya Gupta",
    subtitle: "NEET Aspirant",
    problem: "I couldn't remember diagrams and biological processes during exams.",
    change: "Started using the revision scheduler and daily quick tests.",
    result: "My Biology score improved from 65% to 92%. I now recall details effortlessly.",
    improvement: "+27% accuracy",
    rankChange: "Rank ↑ 5400",
  },
  {
    id: "vikram-joshi",
    name: "Vikram Joshi",
    subtitle: "JEE Advanced Prep",
    problem: "I panicked during full-length tests and made silly mistakes.",
    change: "Took daily full-length tests to build exam temperament.",
    result: "My exam anxiety reduced completely. Improved from #6500 to #890.",
    rankChange: "Rank ↑ 5610",
  },
  {
    id: "ishita-rao",
    name: "Ishita Rao",
    subtitle: "NEET Aspirant",
    problem: "Chemistry reactions were confusing. I kept mixing up mechanisms.",
    change: "Followed the adaptive DPPs that focused on my weak reaction types.",
    result: "Chemistry accuracy went from 55% to 89%. I can now predict reaction outcomes.",
    improvement: "+34% accuracy",
  },
  {
    id: "aditya-mehta",
    name: "Aditya Mehta",
    subtitle: "JEE Mains Aspirant",
    problem: "I studied a lot but couldn't track what actually helped.",
    change: "Started using the analytics dashboard to identify high-impact topics.",
    result: "My study became focused. Rank improved from #9800 to #1600 in 4 months.",
    improvement: "+25% efficiency",
    rankChange: "Rank ↑ 8200",
  },
  {
    id: "sakshi-agarwal",
    name: "Sakshi Agarwal",
    subtitle: "NEET Aspirant",
    problem: "I was good at theory but terrible at MCQs under time pressure.",
    change: "Practiced timed MCQ tests daily to build speed.",
    result: "My speed doubled and accuracy improved. Now solving 180 questions in 3 hours comfortably.",
    improvement: "+50% speed",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full bg-[#f3f6f8] text-[#070a05] overflow-hidden py-20 md:py-32"
    >
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-4">
            What Changed for{" "}
            <span className="text-[#393f5b]">Our Students</span>
          </h2>
          <p className="text-sm md:text-base text-[#070a05]/60 font-light">
            Real improvements. Measurable results.
          </p>
        </motion.div>

        {/* Testimonials Scrolling Container */}
        <div className="relative overflow-hidden mb-16" style={{ height: "700px" }}>
          {/* Gradient overlays for smooth fade */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f3f6f8] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f3f6f8] to-transparent z-10 pointer-events-none" />

          {/* Three column layout with offset */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 h-full">
            {/* Column 1 - No offset */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -50 * (TESTIMONIALS.length / 3)],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: TESTIMONIALS.length * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              className="space-y-6 md:space-y-8"
            >
              {[...Array(2)].map((_, repeatIndex) =>
                TESTIMONIALS.filter((_, i) => i % 3 === 0).map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-${repeatIndex}-${index}`}
                    {...testimonial}
                    index={index}
                    isInView={isInView}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))
              )}
            </motion.div>

            {/* Column 2 - Offset by 100px */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [-100, -50 * (TESTIMONIALS.length / 3) - 100],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: TESTIMONIALS.length * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              className="space-y-6 md:space-y-8 hidden md:block"
            >
              {[...Array(2)].map((_, repeatIndex) =>
                TESTIMONIALS.filter((_, i) => i % 3 === 1).map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-${repeatIndex}-${index}`}
                    {...testimonial}
                    index={index}
                    isInView={isInView}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))
              )}
            </motion.div>

            {/* Column 3 - Offset by 200px */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [-200, -50 * (TESTIMONIALS.length / 3) - 200],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: TESTIMONIALS.length * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              className="space-y-6 md:space-y-8 hidden lg:block"
            >
              {[...Array(2)].map((_, repeatIndex) =>
                TESTIMONIALS.filter((_, i) => i % 3 === 2).map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-${repeatIndex}-${index}`}
                    {...testimonial}
                    index={index}
                    isInView={isInView}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#393f5b] mb-6 leading-relaxed">
            You could be the next success story.
          </p>
          <motion.a
            href={SIGNIN_URL}
            whileHover={
              prefersReducedMotion
                ? {}
                : {
                    boxShadow: "0 20px 40px rgba(57, 63, 91, 0.2)",
                  }
            }
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="relative inline-flex bg-[#393f5b] text-white px-8 py-4 rounded-md text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] overflow-hidden group"
          >
            {/* Subtle gradient overlay on button */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Start Competing
              {/* ICON CONTAINER (fixed width to prevent shift) */}
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
          </motion.a>
        </motion.div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,63,91,0.03),transparent_70%)] pointer-events-none" />
    </section>
  );
}
