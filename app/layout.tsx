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

export const metadata: Metadata = {
  title: "HWI JDCOEM",
  description: "Tactical HUD / Cyber-Ops Identity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${pressStart.variable} overflow-x-hidden`}>
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
