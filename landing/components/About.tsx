'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Brain } from 'lucide-react';

const philosophies = [
  {
    icon: Target,
    title: 'Consistency > Motivation',
    description: 'Build daily habits that compound. Motivation fades, discipline stays.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Brain,
    title: 'Practice > Theory',
    description: 'True mastery comes from solving, not just reading. Apply what you learn.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Data-Driven Growth',
    description: 'Track every attempt. Identify patterns. Optimize your preparation scientifically.',
    color: 'from-pink-500 to-rose-500'
  }
];

export default function About() {
  return (
    <section className="relative py-32 px-6 overflow-hidden" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            The <span className="bg-gradient-to-r from-indigo-600 via-purple-600 via-pink-600 to-indigo-600 bg-[length:300%_300%] bg-clip-text text-transparent font-extrabold tracking-tight animate-gradient-flow">Qualify</span> Philosophy
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We believe in the power of deliberate practice and systematic improvement. 
            Success in competitive exams isn't about luck—it's about discipline.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {philosophies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative bg-[rgba(57,63,91,0.15)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)_saturate(200%)] border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.1)] rounded-2xl p-8 h-full hover:bg-white/5 transition-all duration-300 overflow-hidden"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
                  backgroundBlendMode: 'overlay'
                }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:via-pink-600 group-hover:to-indigo-600 group-hover:bg-[length:300%_300%] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>

                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-[rgba(57,63,91,0.08)] backdrop-blur-xl [-webkit-backdrop-filter:blur(12px)_saturate(180%)] border border-white/[0.08] shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-3xl p-12 text-center overflow-hidden relative"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
            backgroundBlendMode: 'overlay'
          }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Built for the <span className="bg-gradient-to-r from-indigo-600 via-purple-600 via-pink-600 to-indigo-600 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient-flow">Serious Few</span>
          </h3>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Qualify isn't for everyone. It's for aspirants who understand that 
            excellence requires sacrifice, that progress demands precision, and that 
            every single day counts toward their goal. If that's you, welcome home.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
