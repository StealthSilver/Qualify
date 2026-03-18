'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'JEE Advanced AIR 234',
    content: 'Qualify changed my entire approach. The daily practice and analytics helped me identify my weak areas systematically. Every question taught me something new.',
    avatar: 'AS',
    rating: 5
  },
  {
    name: 'Priya Mehta',
    role: 'NEET AIR 156',
    content: 'The mock tests felt exactly like the real exam. The pressure, the interface, the questions—everything. By exam day, I was so prepared that nothing surprised me.',
    avatar: 'PM',
    rating: 5
  },
  {
    name: 'Karthik Reddy',
    role: 'JEE Mains 99.8%ile',
    content: 'What I loved most was the consistency it built in me. Even on days I didn\'t feel like studying, the streak kept me going. That discipline made all the difference.',
    avatar: 'KR',
    rating: 5
  },
  {
    name: 'Sneha Gupta',
    role: 'NEET 680/720',
    content: 'The weak topic detection was spot on. It pointed out exactly where I was making silly mistakes and where I needed conceptual clarity. Saved months of random practice.',
    avatar: 'SG',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-32 px-6 overflow-hidden" id="testimonials">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent"></div>
      
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
            <span className="px-4 py-2 rounded-full glass border border-indigo-500/20 text-sm text-indigo-300">
              Success Stories
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Trusted by <span className="gradient-text">Top Rankers</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real results from real students who transformed their preparation with Qualify.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <motion.div
                className="glass-strong rounded-2xl p-8 h-full relative overflow-hidden noise cursor-pointer"
                whileHover={{ 
                  boxShadow: '0 20px 60px rgba(124, 58, 237, 0.15)'
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, transparent 70%)'
                  }}
                />

                <div className="relative z-10">
                  <Quote className="w-10 h-10 text-indigo-500/30 mb-6" />

                  <p className="text-gray-300 leading-relaxed text-lg mb-8">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {testimonial.avatar}
                    </motion.div>

                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-6 glass rounded-2xl px-12 py-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">4.9/5</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-sm text-gray-500">Happy Students</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">95%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
