import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://qualify.app'),
  title: "Qualify - Master Concepts. Build Consistency. Earn Your Rank.",
  description: "Train like a top ranker with daily practice, real exam simulations, and deep analytics. Built for serious JEE/NEET aspirants.",
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "Qualify - Master Concepts. Build Consistency. Earn Your Rank.",
    description: "Train like a top ranker with daily practice, real exam simulations, and deep analytics.",
    images: ['/logo.svg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Qualify - Master Concepts. Build Consistency. Earn Your Rank.",
    description: "Train like a top ranker with daily practice, real exam simulations, and deep analytics.",
    images: ['/logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
