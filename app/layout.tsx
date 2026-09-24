import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SplashScreen } from "../components/ui/SplashScreen";
import { DataStreamBackground } from "../components/ui/DataStreamBackground";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-rajdhani" });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: ["400"], variable: "--font-press-start" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hwijdcoem.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HWI JDCOEM | Hack With India Student Chapter",
    template: "%s | HWI JDCOEM",
  },
  description:
    "Official Hack With India (HWI) student chapter at JD College of Engineering & Management, Nagpur. Fostering collegiate hackathons, open source, technical workshops, and verified certificates.",
  keywords: [
    "HWI JDCOEM",
    "Hack With India",
    "JDCOEM Nagpur",
    "JD College of Engineering and Management",
    "Nagpur Hackathons",
    "Student Coding Club",
    "HWI Certificates",
    "Engineering Community Nagpur",
    "Hackathon Portal",
  ],
  authors: [{ name: "HWI JDCOEM Web Team", url: siteUrl }],
  creator: "HWI JDCOEM",
  publisher: "Hack With India",
  icons: {
    icon: "/hwi-logo.png",
    shortcut: "/hwi-logo.png",
    apple: "/hwi-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "HWI JDCOEM",
    title: "HWI JDCOEM | Hack With India Student Chapter",
    description:
      "Official student community of Hack With India at JD College of Engineering & Management, Nagpur. Build, connect, and innovate.",
    images: [
      {
        url: "/event-banner.jpg",
        width: 1200,
        height: 630,
        alt: "HWI JDCOEM Tactical Command Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HWI JDCOEM | Hack With India Student Chapter",
    description:
      "Official student community of Hack With India at JD College of Engineering & Management, Nagpur.",
    images: ["/event-banner.jpg"],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "HWI JDCOEM",
      alternateName: "Hack With India JDCOEM Chapter",
      url: siteUrl,
      logo: `${siteUrl}/hwi-logo.png`,
      description:
        "Official student tech chapter of Hack With India at JD College of Engineering & Management, Nagpur.",
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "JD College of Engineering & Management, Nagpur",
      },
      sameAs: ["https://hackwithindia.in"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "HWI JDCOEM Official Platform",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${pressStart.variable} overflow-x-hidden`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="text-ink font-ui antialiased selection:bg-crimson selection:text-ink flex flex-col min-h-screen overflow-x-hidden bg-void">
        <SplashScreen />
        <DataStreamBackground />
        <Navbar />
        <main className="relative z-10 flex-grow pt-16">{children}</main>
        <div className="relative z-10">
          <Footer />
        </div>
      </body>
    </html>
  );
}
