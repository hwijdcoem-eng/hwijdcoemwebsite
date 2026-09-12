import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiInstagram } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="relative bg-void border-t border-chrome-dark/30 py-16 mt-24 shadow-[0_-5px_30px_rgba(255,16,83,0.05)] overflow-hidden">
      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-30 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display font-bold text-3xl tracking-wider text-ink flex items-center gap-3 group w-fit">
              <div className="w-8 h-8 rounded-full border border-signal bg-signal/10 flex items-center justify-center group-hover:bg-signal/30 transition-colors shadow-[0_0_15px_rgba(0,255,128,0.2)]">
                <div className="w-2 h-2 rounded-full bg-signal shadow-[0_0_10px_#00FF80] animate-pulse" />
              </div>
              HWI<span className="text-signal">.</span>
            </Link>
            <p className="mt-6 text-steel text-sm max-w-sm font-ui leading-relaxed">
              Hackers &amp; Founders Workspace. Building, connecting, and creating together under a unified command structure.
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-ink tracking-widest text-sm uppercase mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-crimson shadow-[0_0_8px_#FF1053]" /> System Links
            </h3>
            <ul className="space-y-4 text-sm text-steel font-ui">
              <li><Link href="/about" className="hover:text-crimson transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-crimson">▹</span>About</Link></li>
              <li><Link href="/events" className="hover:text-crimson transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-crimson">▹</span>Events</Link></li>
              <li><Link href="/gallery" className="hover:text-crimson transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-crimson">▹</span>Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-crimson transition-colors flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-crimson">▹</span>Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-ink tracking-widest text-sm uppercase mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-signal shadow-[0_0_8px_#00FF80]" /> Comm Channels
            </h3>
            <div className="flex space-x-5 text-steel">
              <a href="#" className="hover:text-signal hover:scale-110 transition-all drop-shadow-[0_0_0_rgba(0,255,128,0)] hover:drop-shadow-[0_0_10px_rgba(0,255,128,0.8)]" aria-label="GitHub">
                <FiGithub size={22} />
              </a>
              <a href="https://www.instagram.com/hwi_jdcoem/" target="_blank" rel="noopener noreferrer" className="hover:text-signal hover:scale-110 transition-all drop-shadow-[0_0_0_rgba(0,255,128,0)] hover:drop-shadow-[0_0_10px_rgba(0,255,128,0.8)]" aria-label="Instagram">
                <FiInstagram size={22} />
              </a>
              <a href="https://www.linkedin.com/company/hackwithindia-jdcoem/" target="_blank" rel="noopener noreferrer" className="hover:text-signal hover:scale-110 transition-all drop-shadow-[0_0_0_rgba(0,255,128,0)] hover:drop-shadow-[0_0_10px_rgba(0,255,128,0.8)]" aria-label="LinkedIn">
                <FiLinkedin size={22} />
              </a>
              <a href="/contact" className="hover:text-signal hover:scale-110 transition-all drop-shadow-[0_0_0_rgba(0,255,128,0)] hover:drop-shadow-[0_0_10px_rgba(0,255,128,0.8)]" aria-label="Email">
                <FiMail size={22} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-chrome-dark/30 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-steel/60 font-ui">
          <div className="tracking-widest uppercase">&copy; {new Date().getFullYear()} HWI JDCOEM. All rights reserved.</div>
          <div className="flex space-x-8 tracking-wider">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
