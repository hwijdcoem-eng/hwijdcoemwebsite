import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="bg-panel border-t border-line py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display font-bold text-xl tracking-wider text-ink">
              HWI<span className="text-signal">.</span>
            </Link>
            <p className="mt-4 text-ink-dim text-sm max-w-sm">
              Hackers &amp; Founders Workspace. Building, connecting, and creating together.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink tracking-wider text-sm uppercase mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-ink-dim">
              <li><Link href="/about" className="hover:text-ink transition-colors">About</Link></li>
              <li><Link href="/events" className="hover:text-ink transition-colors">Events</Link></li>
              <li><Link href="/gallery" className="hover:text-ink transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-ink transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink tracking-wider text-sm uppercase mb-4">Connect</h3>
            <div className="flex space-x-4 text-ink-dim">
              <a href="#" className="hover:text-ink transition-colors" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="#" className="hover:text-ink transition-colors" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="hover:text-ink transition-colors" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-ink transition-colors" aria-label="Email">
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink-dim">
          <div>&copy; {new Date().getFullYear()} HWI JDCOEM. All rights reserved.</div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
