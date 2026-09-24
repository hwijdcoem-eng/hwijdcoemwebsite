"use client";

import { useEffect, useState } from "react";

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hwi_splash_shown");
      if (hasSeen) {
        return; // Already viewed in this session
      }
      sessionStorage.setItem("hwi_splash_shown", "true");
      setMounted(true);
    } catch {
      return;
    }

    // Auto unmount from DOM after CSS fade finishes
    const timer = setTimeout(() => {
      setMounted(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      onClick={() => setMounted(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void cursor-pointer select-none"
      style={{
        animation: "splashFadeOut 0.4s ease-out 1.2s forwards",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes splashFadeOut {
          0% { opacity: 1; pointer-events: auto; }
          99% { opacity: 0; pointer-events: none; }
          100% { opacity: 0; pointer-events: none; display: none; }
        }
        @keyframes spinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinCounter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes fillBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      <div className="relative flex flex-col items-center pointer-events-none">
        {/* Glowing HUD Rings */}
        <div
          className="absolute inset-[-20%] border border-crimson/30 rounded-full border-t-crimson"
          style={{ animation: "spinClockwise 4s linear infinite" }}
        />
        <div
          className="absolute inset-[-40%] border border-chrome-dark/20 rounded-full border-l-crimson"
          style={{ animation: "spinCounter 6s linear infinite" }}
        />

        {/* Central Logo */}
        <div className="w-24 h-24 rounded-full bg-black border-2 border-crimson flex flex-col items-center justify-center shadow-[0_0_20px_rgba(255,16,83,0.5)] relative overflow-hidden">
          <span className="font-display font-bold text-ink text-xl uppercase leading-none">HWI</span>
          <span className="font-display font-bold text-crimson text-[10px] uppercase mt-1">JDCOEM</span>
        </div>

        {/* Tactical Loading Bar */}
        <div className="mt-12 w-64 h-1 bg-obsidian-raised overflow-hidden">
          <div
            className="h-full bg-crimson"
            style={{ animation: "fillBar 1.2s ease-in-out forwards" }}
          />
        </div>
        <div className="mt-4 font-ui text-crimson text-sm tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-crimson animate-pulse rounded-full" />
          SYSTEM INIT...
        </div>
      </div>
    </div>
  );
}
