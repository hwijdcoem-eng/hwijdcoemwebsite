import fs from "fs";
import path from "path";
import GalleryGrid from "./GalleryGrid";

export const metadata = {
  title: "Gallery | HWI JDCOEM",
  description: "Photos from the official Hack With India chapter at JDCOEM.",
};

export default function GalleryPage() {
  // Read gallery directory at build/request time
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  let images: string[] = [];

  try {
    const files = fs.readdirSync(galleryDir);
    // Filter out non-images (e.g. .DS_Store) and map to public URL path
    images = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file) => `/gallery/${file}`);
  } catch (error) {
    console.error("Error reading gallery directory:", error);
    // Fallback if directory doesn't exist or crashes
  }

  return (
    <div className="min-h-screen">
      {/* ── Page Header ── */}
      <section className="pt-16 pb-12 border-b border-chrome-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-ui text-xs uppercase tracking-[0.25em] text-steel mb-3">
            // HWI JDCOEM · Media
          </p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-ink uppercase tracking-tight leading-tight mb-4">
            Chapter <span className="text-crimson">Gallery</span>
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-crimson/60 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 bg-crimson/80" />
            <div className="h-px w-12 bg-gradient-to-l from-crimson/60 to-transparent" />
          </div>
          <p className="font-ui text-steel max-w-xl leading-relaxed">
            Moments captured during our official chapter installation, planning
            sessions, and team meetups at JD College of Engineering &amp; Management.
          </p>
        </div>
      </section>

      {/* ── Masonry Gallery Grid ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <div className="text-center py-20 border border-dashed border-chrome-dark/40">
              <p className="font-ui text-steel uppercase tracking-widest text-sm">
                No images found in gallery.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Google Drive Archive CTA ── */}
      <section className="py-20 border-t border-chrome-dark/20 bg-void/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="border border-chrome-dark/40 bg-obsidian/40 p-8 md:p-12" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)" }}>
            <h2 className="font-display font-black text-2xl md:text-3xl text-ink uppercase tracking-tight mb-4">
              Can't find your <span className="text-crimson">photo?</span>
            </h2>
            <p className="font-ui text-steel leading-relaxed mb-8 max-w-xl mx-auto text-sm">
              We only showcase a curated selection of photos here. All high-resolution, uncompressed photos from our events and hackathons are uploaded to our official Google Drive archive.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.15em] text-ink bg-crimson hover:bg-crimson/80 transition-colors px-6 py-3" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.71 3.5L1.15 15l3.43 6L11.14 9.5h-3.43zM9.73 15L6.3 21h13.12l3.43-6H9.73zM13.54 3.5h-6.85l11.77 20.48 3.43-6L13.54 3.5z"/>
              </svg>
              Access Google Drive Archive
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
