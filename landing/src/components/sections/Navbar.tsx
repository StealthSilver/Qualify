"use client";

import { useState } from "react";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#f3f6f8] text-[#070a05] fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden transition-transform duration-200 active:scale-90"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={26} />
          </button>

          {/* Logo */}
          <h1 className="text-xl font-semibold tracking-tight">Spardha</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {["About", "Features", "Courses", "Testimonials", "Contact"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="relative group transition-colors duration-200"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#393f5b] transition-all duration-300 group-hover:w-full" />
              </a>
            ),
          )}
        </div>

        {/* CTA Button (Desktop) */}
        <button className="hidden md:flex items-center gap-2 bg-[#393f5b] text-white px-5 py-2 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] group">
          <span className="transition-all duration-300 group-hover:font-semibold">
            Get Started
          </span>

          {/* ICON CONTAINER (fixed width to prevent shift) */}
          <span className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
            <ChevronRight
              size={18}
              className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2"
            />
            <ArrowRight
              size={18}
              className="absolute opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#f3f6f8] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-lg font-semibold">Spardha</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="transition-transform duration-200 active:scale-90"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 mt-20 text-lg ">
          {["About", "Features", "Courses", "Testimonials", "Contact"].map(
            (item) => (
              <a
                key={item}
                href="#"
                onClick={() => setIsOpen(false)}
                className="transition-all font-semibold duration-200 hover:text-[#393f5b]"
              >
                {item}
              </a>
            ),
          )}

          {/* CTA Button (Mobile) */}
          <button className="mt-6 flex items-center gap-2 bg-[#393f5b] text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] group">
            <span className="transition-all duration-300 ">Get Started</span>

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
    </nav>
  );
}
