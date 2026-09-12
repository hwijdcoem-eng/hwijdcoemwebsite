import type { Metadata } from "next";
import { Orbitron, Rajdhani, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SplashScreen } from "../components/ui/SplashScreen";
import { DataStreamBackground } from "../components/ui/DataStreamBackground";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-rajdhani" });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: ["400"], variable: "--font-press-start" });

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
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${pressStart.variable}`}>
      <body className="text-ink font-ui antialiased selection:bg-crimson selection:text-ink flex flex-col min-h-screen">
        <SplashScreen />
        <DataStreamBackground />
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
