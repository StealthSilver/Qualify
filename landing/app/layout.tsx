import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ Font setup (correct)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata (fixed image paths + metadataBase usage)
export const metadata: Metadata = {
  metadataBase: new URL("https://qualify.app"),
  title: "Qualify - Master Concepts. Build Consistency. Earn Your Rank.",
  description:
    "Train like a top ranker with daily practice, real exam simulations, and deep analytics. Built for serious JEE/NEET aspirants.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title:
      "Qualify - Master Concepts. Build Consistency. Earn Your Rank.",
    description:
      "Train like a top ranker with daily practice, real exam simulations, and deep analytics.",
    images: [
      {
        url: "/logo.svg", // ✅ must be object or absolute URL
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Qualify - Master Concepts. Build Consistency. Earn Your Rank.",
    description:
      "Train like a top ranker with daily practice, real exam simulations, and deep analytics.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth overflow-x-hidden text-base"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#070a05] text-[#f3f6f8] overflow-x-hidden relative min-h-screen`}
      >
        {/* Background glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0 animate-breathe"
          style={{
            background: `radial-gradient(circle at 15% 20%, rgba(79, 70, 229, 0.12) 0%, transparent 45%),
                         radial-gradient(circle at 85% 60%, rgba(124, 58, 237, 0.12) 0%, transparent 45%),
                         radial-gradient(circle at 45% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
                         radial-gradient(circle at 70% 30%, rgba(30, 58, 138, 0.08) 0%, transparent 55%)`,
          }}
        />

        {/* Mesh grid */}
        <div
          className="fixed -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none z-0 opacity-40 animate-mesh-rotate"
          style={{
            background: `repeating-linear-gradient(0deg, rgba(79, 70, 229, 0.02) 0px, transparent 1px, transparent 2px, rgba(79, 70, 229, 0.02) 3px),
                         repeating-linear-gradient(90deg, rgba(124, 58, 237, 0.02) 0px, transparent 1px, transparent 2px, rgba(124, 58, 237, 0.02) 3px)`,
          }}
        />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}