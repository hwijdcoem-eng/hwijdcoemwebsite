"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiMessageSquare, FiUsers, FiAward, FiCpu, FiArrowRight, FiLinkedin, FiInstagram, FiLock } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { Button } from "../../components/ui/Button";

// ─── Dummy Data (Can be updated later) ──────────────────────────────────────
const perks = [
  {
    title: "Global Network",
    description: "Connect with developers, founders, and tech enthusiasts across the national Hack With India ecosystem.",
    icon: FiUsers,
    color: "text-crimson",
    border: "border-crimson/50"
  },
  {
    title: "Mentorship & Guidance",
    description: "Get direct access to industry professionals, alumni, and senior developers who can guide your career path.",
    icon: FiMessageSquare,
    color: "text-[#38bdf8]",
    border: "border-[#38bdf8]/50"
  },
  {
    title: "Hackathons & Events",
    description: "Priority registration for all HWI JDCOEM hackathons, ideathons, and exclusive technical workshops.",
    icon: FiAward,
    color: "text-[#4ade80]",
    border: "border-[#4ade80]/50"
  },
  {
    title: "Build & Ship",
    description: "Stop watching tutorials and start building. Join project teams and ship real-world applications.",
    icon: FiCpu,
    color: "text-[#facc15]",
    border: "border-[#facc15]/50"
  }
];

const showcasedProjects: any[] = []; // Projects are currently in incubation

export default function CommunityPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative py-24 overflow-hidden border-b border-chrome-dark/20">
        {/* Background Grid & Scanline */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-px bg-crimson/20 animate-[scanIdle_4s_linear_infinite]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 border border-crimson/30 bg-crimson/5 px-3 py-1" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              <span className="font-ui text-[0.65rem] uppercase tracking-[0.2em] text-crimson">
                Open to all JDCOEM Students
              </span>
            </div>

            <h1 className="font-display font-black text-5xl md:text-6xl text-ink uppercase tracking-tight leading-tight mb-6">
              Join The <span className="text-crimson">Network</span>
            </h1>
            
            <p className="font-ui text-steel leading-relaxed max-w-2xl mx-auto mb-10 text-base md:text-lg">
              HWI JDCOEM isn't just a club; it's an ecosystem built by hackers, for hackers. 
              Whether you are a beginner writing your first line of code or a senior building startups, 
              there is a place for you here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 flex-wrap">
              <a href="https://discord.gg/3tvdvSRwv" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="flex items-center justify-center gap-2 px-8 group w-full bg-[#5865F2] hover:bg-[#4752C4] text-white border-transparent">
                  <FaDiscord size={20} />
                  Join Discord Server
                </Button>
              </a>
              <a href="https://www.linkedin.com/company/hackwithindia-jdcoem/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="flex items-center justify-center gap-2 px-8 group w-full">
                  <FiLinkedin size={18} />
                  LinkedIn
                </Button>
              </a>
              <a href="https://www.instagram.com/hwi_jdcoem/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="flex items-center justify-center gap-2 px-8 w-full">
                  <FiInstagram size={18} />
                  Instagram
                </Button>
              </a>
            </div>
            <p className="font-ui text-steel/60 text-xs mt-6 uppercase tracking-widest">
              * WhatsApp & YouTube channels launching soon
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Perks Section ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-steel mb-2">
                // Why Join Us
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight">
                Community <span className="text-crimson">Perks</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group relative p-6 border bg-obsidian/40 hover:bg-void transition-colors duration-300 border-chrome-dark/40 hover:${perk.border}`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}
                >
                  <div className={`w-12 h-12 mb-6 border ${perk.border} bg-void flex items-center justify-center`} style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}>
                    <Icon size={20} className={perk.color} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink uppercase tracking-wide mb-3">
                    {perk.title}
                  </h3>
                  <p className="font-ui text-sm text-steel leading-relaxed">
                    {perk.description}
                  </p>
                  
                  {/* Decorative corner */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chrome-dark/40 group-hover:border-current transition-colors duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Projects Section ── */}
      <section className="py-24 border-t border-chrome-dark/20 bg-obsidian/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-steel mb-2">
                // Project Incubation
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight">
                Featured <span className="text-crimson">Projects</span>
              </h2>
            </div>
          </div>

          <div className="border border-chrome-dark/40 bg-void p-12 text-center relative overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)" }}>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-crimson/50 bg-crimson/10 flex items-center justify-center text-crimson mb-6">
                <FiLock size={28} />
              </div>
              <h3 className="font-display font-black text-2xl text-ink uppercase tracking-wide mb-4">
                Projects in Incubation
              </h3>
              <p className="font-ui text-steel max-w-lg mx-auto leading-relaxed mb-8">
                Our core team and members are currently building the next generation of campus tools and open-source software. Project repositories will be revealed after our inaugural Hackathon.
              </p>
              <div className="inline-flex items-center gap-2 border border-chrome-dark/50 bg-obsidian/50 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="font-ui text-xs uppercase tracking-widest text-steel">Status: Classified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
