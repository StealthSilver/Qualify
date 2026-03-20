"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "features", "courses", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 100; // offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // If at the very top, clear active section
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 72; // navbar height
      const targetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Features", id: "features" },
    { label: "Courses", id: "courses" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="w-full bg-[#f3f6f8] text-[#070a05] fixed top-0 left-0 z-50 border-b border-dotted border-[#393f5b]/15">
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">
        {/* Left Section - Logo and Hamburger */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <button onClick={scrollToTop} className="cursor-pointer transition-opacity hover:opacity-80">
            <Image 
              src="/logo-light.svg" 
              alt="Spardha" 
              width={120} 
              height={28}
              className="h-7 w-auto"
              priority
            />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative group transition-all duration-300 hover:text-[#393f5b]"
            >
              <span className="relative z-10">{item.label}</span>
              
              {/* Animated underline with scale effect */}
              <span 
                className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] bg-[#393f5b] transition-all duration-300 ease-out ${
                  activeSection === item.id 
                    ? "w-full" 
                    : "w-0 group-hover:w-full"
                }`} 
              />
            </button>
          ))}
        </div>

        {/* CTA Button (Desktop) */}
        <button className="hidden md:flex items-center gap-2 bg-[#393f5b] text-white px-5 py-2 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] group">
          <span>
            Get Started
          </span>

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
        </button>

        {/* Hamburger (Mobile) - Right Side */}
        <button
          className="md:hidden transition-transform duration-200 active:scale-90 hover:text-[#393f5b]"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile Drawer - Slides from Left */}
      <div
        className={`fixed top-0 left-0 w-80 h-screen bg-gradient-to-br from-[#f3f6f8] via-[#f3f6f8] to-[#e8ecf0] backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50">
          <button onClick={() => { scrollToTop(); setIsOpen(false); }} className="cursor-pointer transition-opacity hover:opacity-80">
            <Image 
              src="/logo-light.svg" 
              alt="Spardha" 
              width={120} 
              height={28}
              className="h-7 w-auto"
            />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="transition-all duration-200 active:scale-90 hover:rotate-90 hover:text-[#393f5b]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col px-6 py-8">
          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => { scrollToSection(item.id); setIsOpen(false); }}
                className={`relative group px-4 py-3 rounded-lg transition-all duration-300 hover:text-[#393f5b] hover:bg-[#393f5b]/5 text-left ${
                  activeSection === item.id ? "text-[#393f5b] bg-[#393f5b]/5" : ""
                }`}
                style={{
                  animation: isOpen
                    ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                    : "none",
                }}
              >
                <span className="relative z-10 font-medium text-base">
                  {item.label}
                </span>

                {/* Animated border on hover or active */}
                <span 
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 bg-[#393f5b] transition-all duration-300 ease-out rounded-r-full ${
                    activeSection === item.id
                      ? "w-1"
                      : "w-0 group-hover:w-1"
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* CTA Button (Mobile) */}
          <button
            className="mt-8 flex items-center justify-center gap-2 bg-[#393f5b] text-white px-5 py-3 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] group w-full"
            style={{
              animation: isOpen ? "slideIn 0.3s ease-out 0.5s both" : "none",
            }}
          >
            <span>Get Started</span>

            {/* ICON CONTAINER */}
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
          </button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
