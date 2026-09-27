"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZoomIn, FiDownload, FiExternalLink } from "react-icons/fi";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* ── Masonry Grid ── */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {images.map((src, idx) => (
          <motion.div
            key={src}
            className="relative group cursor-pointer break-inside-avoid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.5, delay: (idx % 10) * 0.05 }}
            onClick={() => setSelectedImg(src)}
          >
            {/* Image Container */}
            <div
              className="relative overflow-hidden border border-chrome-dark/40 bg-obsidian"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}
            >
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-void/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                {/* Decorative scanning line on hover */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="w-full h-px bg-crimson/40 animate-[scanIdle_2s_linear_infinite]" />
                </div>
                
                <div className="w-12 h-12 rounded-none border border-crimson/50 flex items-center justify-center text-crimson bg-void/60 z-10" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}>
                  <FiZoomIn size={20} />
                </div>
                <p className="font-ui text-[0.6rem] uppercase tracking-[0.2em] text-crimson mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Expand Photo
                </p>
              </div>

              {/* HUD Corner Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-crimson/0 group-hover:border-crimson/80 transition-colors duration-300 z-10" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-crimson/0 group-hover:border-crimson/80 transition-colors duration-300 z-10" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-crimson/0 group-hover:border-crimson/80 transition-colors duration-300 z-10" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-crimson/0 group-hover:border-crimson/80 transition-colors duration-300 z-10" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-void/90 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedImg(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div
                className="relative border border-chrome-dark/60 bg-obsidian pointer-events-auto p-1 shadow-[0_0_50px_rgba(220,38,38,0.15)]"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}
              >
                {/* Controls (Close & Download) */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
                  <a
                    href={selectedImg}
                    download
                    className="w-10 h-10 bg-void/80 backdrop-blur-sm border border-chrome-dark/50 flex items-center justify-center text-steel hover:text-crimson hover:border-crimson/50 transition-all duration-200"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                    title="Download Photo"
                  >
                    <FiDownload size={18} />
                  </a>
                  <button
                    onClick={() => setSelectedImg(null)}
                    className="w-10 h-10 bg-void/80 backdrop-blur-sm border border-chrome-dark/50 flex items-center justify-center text-steel hover:text-crimson hover:border-crimson/50 transition-all duration-200"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                    title="Close"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                  <div className="w-full h-1 bg-crimson/20 animate-[scanIdle_3s_linear_infinite]" />
                </div>

                <img
                  src={selectedImg}
                  alt="Full resolution gallery view"
                  className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
