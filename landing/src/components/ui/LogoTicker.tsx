"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function LogoTicker() {
  const logos = [
    "/Logos/logo.svg",
    "/Logos/motion-logo.webp",
    "/Logos/allen-logo-kota.jpg",
    "/Logos/download.jpeg",
    "/Logos/logo.png",
    "/Logos/logo (1).svg",
  ];

  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem);
      }
    });
  }, []);

  return (
    <div className="w-full bg-[#f3f6f8]">
      {/* Container matching the vertical lines boundaries */}
      <div className="max-w-7xl mx-auto px-12">
        {/* Horizontal separator line */}
        <div className="w-full border-t border-dotted border-[#393f5b]/15 mb-8" />
        
        <div className="pb-8">
          <div className="text-center mb-6">
            <p className="text-xs font-light text-[#070a05]/50 tracking-[0.2em] uppercase">
              Trusted by Leading Institutions
            </p>
          </div>

          <div className="relative">
            {/* Gradient Overlays - positioned at the edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f3f6f8] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f3f6f8] to-transparent z-10 pointer-events-none" />

            {/* Logo Scroller - contained within boundaries */}
            <div className="overflow-hidden">
              <div
                ref={scrollerRef}
                className="flex gap-16 animate-scroll-left"
                style={{
                  width: "max-content",
                }}
              >
                {logos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  >
                    <Image
                      src={logo}
                      alt={`Partner logo ${index + 1}`}
                      width={128}
                      height={64}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
