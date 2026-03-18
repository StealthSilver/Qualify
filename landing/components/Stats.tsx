'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedStat({ value, suffix, label, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center group cursor-default"
    >
      <motion.div
        className="text-5xl md:text-6xl font-bold gradient-text mb-3"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <div className="text-gray-400 text-lg font-medium">
        {label}
      </div>
      <motion.div
        className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Numbers Speak for <span className="gradient-text">Themselves</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Trusted by thousands of serious aspirants across the nation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-12">
          <AnimatedStat value={50000} suffix="+" label="Practice Questions" delay={0} />
          <AnimatedStat value={10000} suffix="+" label="Active Learners" delay={0.1} />
          <AnimatedStat value={95} suffix="%" label="Success Rate" delay={0.2} />
          <AnimatedStat value={500} suffix="+" label="Mock Tests" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
