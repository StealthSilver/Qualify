import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#f3f6f8]">
      {/* Vertical Lines Container - starts below navbar */}
      <div className="fixed top-[72px] left-0 right-0 bottom-0 pointer-events-none z-[5]">
        <div className="max-w-7xl mx-auto px-6 h-full relative">
          {/* Left vertical line */}
          <div className="absolute left-6 top-0 h-full w-[1px] border-l border-dotted border-[#393f5b]/15" />
          {/* Right vertical line */}
          <div className="absolute right-6 top-0 h-full w-[1px] border-r border-dotted border-[#393f5b]/15" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <Navbar />
        <Hero />
        <div className="bg-[#f3f6f8]">
          <About />
          <Features />
          <Testimonials />
          <Footer />
        </div>
      </div>
    </main>
  );
}
