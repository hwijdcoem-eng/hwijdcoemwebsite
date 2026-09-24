"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#0A0A0B] text-[#F5F5F7] font-sans min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full border border-[#FF1053]/40 bg-[#141417] p-8 text-center shadow-[0_0_30px_rgba(255,16,83,0.2)]">
          <div className="text-[#FF1053] font-mono text-5xl font-black mb-4 tracking-wider animate-pulse">
            ERR_CRITICAL
          </div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-[#F5F5F7] mb-4">
            Command Center Offline
          </h1>
          <p className="text-[#9A9AA3] text-sm leading-relaxed mb-8">
            A fatal root-level malfunction occurred. The tactical feed failed to initialize.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 px-6 bg-[#FF1053] hover:bg-[#FF3D77] text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_15px_rgba(255,16,83,0.4)]"
          >
            Force System Reboot
          </button>
        </div>
      </body>
    </html>
  );
}
