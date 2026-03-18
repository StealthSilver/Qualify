'use client';

import { motion } from 'framer-motion';
import { BookOpen, BarChart3, Timer, AlertCircle, Trophy } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Daily Practice Questions',
    description: 'Curated questions aligned with JEE/NEET patterns. Fresh challenges every day to keep you sharp.',
    gradient: 'from-indigo-500 to-blue-500',
    glowColor: 'rgba(79, 70, 229, 0.3)'
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics Dashboard',
    description: 'Deep insights into your performance. Track accuracy, speed, and improvement trends over time.',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(124, 58, 237, 0.3)'
  },
  {
    icon: Timer,
    title: 'Mock Test Simulation',
    description: 'Real exam environment. Timed tests with instant evaluation and detailed solutions.',
    gradient: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.3)'
  },
  {
    icon: AlertCircle,
    title: 'Weak Topic Detection',
    description: 'AI-powered analysis identifies your weak areas. Get personalized recommendations to improve.',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.3)'
  },
  {
    icon: Trophy,
    title: 'Leaderboard & Ranking',
    description: 'Compete with peers nationwide. See where you stand and what it takes to reach the top.',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.3)'
  }
];

export default function Features() {
  return (
    <section className="relative py-32 px-6 overflow-hidden" id="features">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full glass border border-purple-500/20 text-sm text-purple-300">
              Everything You Need
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Features That <span className="gradient-text">Accelerate</span> Growth
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powerful tools designed to transform your preparation from good to exceptional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ 
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                }}
                transition={{ duration: 0.3 }}
                className="relative glass-strong rounded-2xl p-8 h-full cursor-pointer overflow-hidden noise"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${feature.glowColor} 0%, transparent 70%)`
                  }}
                />

                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${feature.glowColor} 0%, transparent 70%)`
                  }}
                />

                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 relative z-10`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-white relative z-10 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed relative z-10">
                  {feature.description}
                </p>

                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />

                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-white/10 transition-colors duration-300"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-semibold text-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
