"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hwi_splash_shown");
      if (hasSeen) {
        return;
      }
      setShow(true);
      sessionStorage.setItem("hwi_splash_shown", "true");
    } catch {
      return;
    }

    // Auto-dismiss after 1.2s
    const timer = setTimeout(() => {
      setShow(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []); // Run once on mount

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void cursor-pointer select-none"
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center">
            {/* Glowing HUD Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-[-20%] border border-crimson/30 rounded-full border-t-crimson pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-[-40%] border border-chrome-dark/20 rounded-full border-l-crimson pointer-events-none"
            />

            <div className="w-24 h-24 rounded-full bg-black border-2 border-crimson flex flex-col items-center justify-center shadow-[0_0_20px_rgba(255,16,83,0.5)] relative overflow-hidden pointer-events-none">
              <span className="font-display font-bold text-ink text-xl uppercase leading-none">HWI</span>
              <span className="font-display font-bold text-crimson text-[10px] uppercase mt-1">JDCOEM</span>
            </div>

            {/* Tactical Loading Bar */}
            <div className="mt-12 w-64 h-1 bg-obsidian-raised overflow-hidden pointer-events-none">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-crimson"
              />
            </div>
            <div className="mt-4 font-ui text-crimson text-sm tracking-widest uppercase flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 bg-crimson animate-pulse rounded-full" />
              SYSTEM INIT...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
