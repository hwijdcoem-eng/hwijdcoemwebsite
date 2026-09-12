"use client";

import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function AnimatedIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center w-12 h-12", className)}>
      <motion.div
        className="absolute inset-0 rounded-full border border-signal opacity-30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-signal/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <div className="absolute inset-4 rounded-full bg-signal" />
    </div>
  );
}
