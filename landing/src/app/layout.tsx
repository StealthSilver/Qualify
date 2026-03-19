import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Spardha - Master JEE with Daily Practice & Analytics",
    template: "%s | Spardha",
  },
  description:
    "Excel in JEE preparation with Spardha's comprehensive platform. Access daily tests, DPPs, expert courses, and advanced analytics to track your progress. Set milestones and achieve your IIT dreams with personalized learning.",
  keywords: [
    "JEE preparation",
    "JEE Main",
    "JEE Advanced",
    "IIT JEE",
    "daily practice problems",
    "DPP",
    "JEE mock tests",
    "JEE courses",
    "JEE analytics",
    "IIT preparation",
    "engineering entrance exam",
    "JEE study material",
    "milestone tracking",
    "performance analytics",
    "JEE coaching online",
  ],
  authors: [{ name: "Spardha" }],
  creator: "Spardha",
  publisher: "Spardha",
  applicationName: "Spardha",
  category: "Education",
  classification: "Education & Learning",
  
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://spardha.com"),
  
  alternates: {
    canonical: "/",
  },
  
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Spardha",
    title: "Spardha - Master JEE with Daily Practice & Analytics",
    description:
      "Excel in JEE preparation with daily tests, DPPs, expert courses, and advanced analytics. Track your progress with milestones and achieve your IIT dreams.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Spardha - JEE Preparation Platform",
        type: "image/svg+xml",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Spardha - Master JEE with Daily Practice & Analytics",
    description:
      "Excel in JEE preparation with daily tests, DPPs, expert courses, and advanced analytics. Track your progress and achieve your IIT dreams.",
    images: ["/logo.svg"],
    creator: "@spardha",
    site: "@spardha",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: ["/logo.svg"],
  },
  
  manifest: "/manifest.json",
  
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Spardha",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Spardha",
    description:
      "Excel in JEE preparation with daily tests, DPPs, expert courses, and advanced analytics. Track your progress with milestones and achieve your IIT dreams.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://spardha.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://spardha.com"}/logo.svg`,
    sameAs: [
      "https://twitter.com/spardha",
      "https://facebook.com/spardha",
      "https://instagram.com/spardha",
      "https://linkedin.com/company/spardha",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      availableLanguage: ["English", "Hindi"],
    },
    offers: {
      "@type": "AggregateOffer",
      description: "JEE preparation courses and test series",
      priceCurrency: "INR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "JEE Preparation Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Daily Practice Problems (DPP)",
            description: "Daily curated practice problems for JEE preparation",
            provider: {
              "@type": "Organization",
              name: "Spardha",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Daily Tests",
            description: "Daily mock tests for JEE Main and Advanced",
            provider: {
              "@type": "Organization",
              name: "Spardha",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Expert Courses",
            description: "Comprehensive JEE courses by expert educators",
            provider: {
              "@type": "Organization",
              name: "Spardha",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Performance Analytics",
            description:
              "Advanced analytics with milestone tracking and progress monitoring",
            provider: {
              "@type": "Organization",
              name: "Spardha",
            },
          },
        },
      ],
    },
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web, Android, iOS",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "JEE aspirants",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
