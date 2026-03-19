import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-[#f3f6f8] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
