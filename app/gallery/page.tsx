"use client";

import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const images = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    caption: `HWI Workspace Snippet ${i + 1}`,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <SectionHeading as="h1" className="mb-4">
          The Workspace in Action
        </SectionHeading>
        <p className="text-ink-dim max-w-2xl mx-auto">
          A glimpse into late-night builds, hardware prototypes, and the community 
          that makes it all happen.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            className="break-inside-avoid"
          >
            <Card className="p-2 border-line hover:border-signal transition-colors duration-300">
              <div 
                className={`w-full rounded bg-line relative flex items-center justify-center overflow-hidden ${
                  index % 3 === 0 ? "aspect-square" : index % 2 === 0 ? "aspect-video" : "aspect-[4/3]"
                }`}
              >
                {/* Image Placeholder */}
                <div className="text-ink-dim opacity-50 font-display text-sm tracking-widest uppercase text-center px-4">
                  Image Placeholder
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent opacity-30 hover:opacity-0 transition-opacity duration-300" />
              </div>
              <div className="p-3 text-sm text-ink-dim font-medium text-center">
                {image.caption}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
