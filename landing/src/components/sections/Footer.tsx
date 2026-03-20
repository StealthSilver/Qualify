"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
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

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Courses", href: "#courses" },
      { label: "Test Series", href: "#" },
      { label: "Analytics", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  const XIcon = ({ size = 16 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );

  const socialLinks = [
    { icon: XIcon, href: "https://x.com/silver_srs", label: "X (Twitter)" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/rajat-saraswat-0491a3259/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/StealthSilver/Spardha", label: "GitHub" },
    { icon: Mail, href: "mailto:saraswatrajat12@gmail.com", label: "Email" },
  ];

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#f3f6f8] text-[#070a05] overflow-hidden"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-8 relative">
        {/* Top Section - Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 pb-12 relative"
        >
          {/* Horizontal border that extends to vertical lines */}
          <div className="absolute left-[-18px] md:left-[-42px] lg:left-[-56px] right-[-18px] md:right-[-42px] lg:right-[-56px] bottom-0 border-b border-dotted border-[#393f5b]/15" />
          
          {/* Logo and Tagline */}
          <div>
            <Image
              src="/logo-light.svg"
              alt="Spardha"
              width={140}
              height={32}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-[#070a05]/60 font-light max-w-md">
              Empowering aspirants to achieve their goals through smart practice and real competition.
            </p>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-medium text-[#393f5b] mb-4 tracking-wide">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-sm text-[#070a05]/60 hover:text-[#393f5b] font-light transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="break-words">{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-medium text-[#393f5b] mb-4 tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-sm text-[#070a05]/60 hover:text-[#393f5b] font-light transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="break-words">{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-medium text-[#393f5b] mb-4 tracking-wide">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-sm text-[#070a05]/60 hover:text-[#393f5b] font-light transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="break-words">{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-sm font-medium text-[#393f5b] mb-4 tracking-wide">
              Stay Updated
            </h3>
            <p className="text-xs text-[#070a05]/60 font-light mb-4 leading-relaxed">
              Get the latest updates on new features and exam tips.
            </p>
            <div className="flex flex-col gap-2 max-w-sm sm:max-w-none">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 text-sm bg-white/60 backdrop-blur-xl border border-[#070a05]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#393f5b]/30 focus:border-[#393f5b]/30 transition-all duration-200 placeholder:text-[#070a05]/40"
              />
              <motion.button
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="w-full bg-[#393f5b] text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450]"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 relative flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Horizontal border that extends to vertical lines */}
          <div className="absolute left-[-18px] md:left-[-42px] lg:left-[-56px] right-[-18px] md:right-[-42px] lg:right-[-56px] top-0 border-t border-dotted border-[#393f5b]/15" />
          
          {/* Copyright */}
          <p className="text-xs text-[#070a05]/50 font-light">
            © {new Date().getFullYear()} Spardha. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                  rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.05,
                        }
                  }
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="relative w-8 h-8 flex items-center justify-center text-[#070a05]/60 hover:text-[#393f5b] transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <IconComponent size={16} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(57,63,91,0.04),transparent_60%)] pointer-events-none" />
    </footer>
  );
}
