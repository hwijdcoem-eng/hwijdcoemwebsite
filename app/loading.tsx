"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center relative py-16" aria-live="polite" aria-busy="true">
      {/* Top ambient scan beam */}
      <div className="w-48 h-0.5 bg-obsidian-raised overflow-hidden relative mb-8">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-crimson to-transparent"
        />
      </div>

      {/* Tactical spinner */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-crimson/20 border-t-crimson"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          className="absolute inset-2 rounded-full border border-steel/20 border-b-crimson/60"
        />
        <div className="w-2 h-2 rounded-full bg-crimson animate-ping" />
      </div>

      {/* Status label */}
      <div className="mt-6 flex items-center gap-2 font-ui text-xs uppercase tracking-[0.25em] text-steel">
        <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
        <span>Synchronizing Tactical Feed...</span>
      </div>
    </div>
  );
}
