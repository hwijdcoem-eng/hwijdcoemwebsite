"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/community", label: "Community" },
  { href: "/certificates", label: "Certificates" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-display font-bold text-xl tracking-wider text-ink flex-shrink-0">
            HWI<span className="text-signal">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "text-ink" : "text-ink-dim hover:text-ink hover:bg-panel"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-panel rounded-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-ink-dim hover:text-ink focus:outline-none p-2"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-panel border-b border-line">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === link.href
                    ? "bg-line text-ink"
                    : "text-ink-dim hover:bg-line hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
