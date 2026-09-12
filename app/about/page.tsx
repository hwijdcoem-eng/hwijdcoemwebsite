"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import {
  FiTarget,
  FiZap,
  FiUsers,
  FiCode,
  FiCamera,
  FiFileText,
  FiLayout,
  FiSpeaker,
  FiVolume2,
  FiHeart,
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";

// ─── Teams data ───────────────────────────────────────────────────────────────
const wings = [
  { icon: FiUsers,    name: "Admin Body",          desc: "Leadership, governance, and strategic direction of HWI JDCOEM.",        color: "text-crimson",      border: "group-hover:border-crimson/50" },
  { icon: FiCode,     name: "Web Dev Team",         desc: "Building the digital presence — this website and future platforms.",    color: "text-crimson",      border: "group-hover:border-crimson/50" },
  { icon: FiZap,      name: "Technical Team",       desc: "Driving hackathon problem statements and technical workshops.",         color: "text-steel",        border: "group-hover:border-steel/40" },
  { icon: FiLayout,   name: "UI/UX Team",           desc: "Designing experiences that look great and feel intuitive.",             color: "text-crimson",      border: "group-hover:border-crimson/50" },
  { icon: FiFileText, name: "Documentation Team",   desc: "Capturing and archiving every event, decision, and milestone.",         color: "text-steel",        border: "group-hover:border-steel/40" },
  { icon: FiVolume2,  name: "Publicity Team",       desc: "Spreading the word — social media, outreach, and partnerships.",       color: "text-crimson",      border: "group-hover:border-crimson/50" },
  { icon: FiCamera,   name: "Media Team",           desc: "Photography, videography, and content creation for all events.",        color: "text-steel",        border: "group-hover:border-steel/40" },
  { icon: FiSpeaker,  name: "Operational Team",     desc: "Making events happen — logistics, venue, and execution.",               color: "text-crimson",      border: "group-hover:border-crimson/50" },
  { icon: FiHeart,    name: "Volunteer Team",       desc: "The backbone — volunteers who show up and make everything possible.",   color: "text-steel",        border: "group-hover:border-steel/40" },
];

// ─── HWI ecosystem partners ───────────────────────────────────────────────────
const ecosystemPartners = [
  { name: "Microsoft Azure",  category: "Cloud" },
  { name: "GitHub",           category: "Dev Tools" },
  { name: "Postman",          category: "API" },
  { name: "GeeksForGeeks",    category: "EdTech" },
  { name: "Unstop",           category: "Platform" },
  { name: "ETHIndia",         category: "Web3" },
  { name: "Polygon",          category: "Web3" },
  { name: "Hack2Skill",       category: "Platform" },
  { name: "Physics Wallah",   category: "EdTech" },
  { name: "Logitech",         category: "Hardware" },
  { name: "HP",               category: "Compute" },
  { name: "RedBull",          category: "Sponsor" },
];

// ─── Values ───────────────────────────────────────────────────────────────────
const values = [
  { icon: FiTarget, title: "Mission", body: "To connect JDCOEM students with real-world tools, industry mentors, and hackathon ecosystems via the Hack With India network." },
  { icon: FiZap,    title: "Vision",  body: "To become the most active student tech chapter in Nagpur — hosting events, building products, and launching careers." },
  { icon: FiUsers,  title: "Culture", body: "Ship over talk. Community over ego. Every member — from Admin to Volunteer — is a builder first." },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen">

      {/* ── Hero: Banner left + Content right ───────────────────────────────── */}
      <section className="py-16 border-b border-chrome-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">

            {/* ── LEFT: Compact banner frame (2/5 width) ── */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                {/* Corner tick marks */}
                <span className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-crimson z-20" />
                <span className="absolute -top-3 -right-3 w-5 h-5 border-t-2 border-r-2 border-crimson z-20" />
                <span className="absolute -bottom-3 -left-3 w-5 h-5 border-b-2 border-l-2 border-crimson z-20" />
                <span className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 border-crimson z-20" />

                {/* HUD top label */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                  <span className="font-ui text-[0.55rem] uppercase tracking-[0.2em] text-steel bg-void border border-chrome-dark/50 px-2 py-0.5">
                    // HWI-JDCOEM · EST. 2026
                  </span>
                </div>

                {/* Scan line */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  <div className="w-full h-0.5 bg-crimson/20 animate-[scanIdle_5s_linear_infinite]" />
                </div>

                {/* Banner image */}
                <div
                  className="border border-chrome-dark/50 overflow-hidden"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}
                >
                  <img
                    src="/about-banner.jpg"
                    alt="HWI JDCOEM – Official Hack With India Chapter at JD College of Engineering & Management, Nagpur"
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: About content (3/5 width) ── */}
            <motion.div
              className="lg:col-span-3 flex flex-col lg:pl-10"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                <span className="font-ui text-xs uppercase tracking-[0.25em] text-crimson">
                  Official HWI Chapter · JDCOEM Nagpur
                </span>
              </div>

              <h1 className="font-display font-black text-4xl md:text-5xl text-ink uppercase tracking-tight leading-tight mb-6">
                About <span className="text-crimson">HWI</span> JDCOEM
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-7">
                <div className="h-px w-10 bg-gradient-to-r from-crimson/60 to-transparent" />
                <div className="w-1 h-1 rotate-45 bg-crimson/80" />
                <div className="h-px w-10 bg-gradient-to-l from-crimson/60 to-transparent" />
              </div>

              <p className="font-ui text-steel leading-relaxed text-base max-w-lg">
                HWI JDCOEM is the official Hack With India chapter at JD College of
                Engineering &amp; Management, Nagpur. Inaugurated in September 2026,
                we are a student-driven tech community of 36 members across 9
                specialized teams — united by one goal: to connect engineers at
                JDCOEM with real-world tools, industry mentors, and hands-on
                hackathon experiences through the national HWI ecosystem.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Our Values ───────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-chrome-dark/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-14" {...fadeUp()}>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-steel mb-3">// Core principles</p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight">
              Mission &amp; Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.1)}
                className="group border border-chrome-dark/40 bg-obsidian/40 p-8 flex flex-col gap-4 hover:border-crimson/40 transition-colors duration-300"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}
              >
                <div className="w-12 h-12 border border-crimson/30 group-hover:border-crimson/70 transition-colors flex items-center justify-center text-crimson"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                >
                  <v.icon size={20} />
                </div>
                <h3 className="font-display font-bold text-lg text-ink uppercase tracking-wide">{v.title}</h3>
                <p className="font-ui text-steel text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 Wings ──────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-chrome-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14" {...fadeUp()}>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-steel mb-3">// Organizational structure</p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight">
              Our 9 Wings
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-crimson/60" />
              <div className="w-1.5 h-1.5 rotate-45 bg-crimson/80" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-crimson/60" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wings.map((wing, i) => (
              <motion.div
                key={wing.name}
                {...fadeUp(i * 0.06)}
                className={`group border border-chrome-dark/30 bg-obsidian/30 p-6 flex gap-4 items-start transition-colors duration-300 ${wing.border}`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)" }}
              >
                <div className={`flex-shrink-0 w-10 h-10 border border-chrome-dark/40 group-hover:border-current transition-colors flex items-center justify-center ${wing.color}`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
                >
                  <wing.icon size={18} />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-ink uppercase tracking-wide mb-1">{wing.name}</p>
                  <p className="font-ui text-[0.75rem] text-steel leading-relaxed">{wing.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-10" {...fadeUp(0.2)}>
            <Link href="/team">
              <Button size="lg" className="flex items-center gap-2 group mx-auto">
                <FiUsers size={16} />
                Meet the Full Team
                <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HWI Ecosystem ────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-chrome-dark/20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/4 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div className="mb-14" {...fadeUp()}>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-steel mb-3">// Why HWI matters</p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight mb-6">
              The HWI Ecosystem
            </h2>
            <p className="font-ui text-steel max-w-2xl leading-relaxed">
              As an official Hack With India chapter, every HWI JDCOEM member gets
              direct access to a national ecosystem of industry sponsors, tools,
              and internship pipelines — the same ecosystem that powers hackathons
              across India.
            </p>
          </motion.div>

          {/* Partner tags grid */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {ecosystemPartners.map((p) => (
              <div
                key={p.name}
                className="group flex items-center gap-2 border border-chrome-dark/40 bg-obsidian/40 px-4 py-2.5 hover:border-crimson/50 transition-colors duration-200"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
              >
                <span className="font-display font-bold text-xs text-ink uppercase tracking-wide group-hover:text-crimson transition-colors">{p.name}</span>
                <span className="font-ui text-[0.55rem] uppercase tracking-widest text-steel border border-chrome-dark/40 px-1.5 py-0.5">{p.category}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="mt-10" {...fadeUp(0.2)}>
            <a href="https://hackwithindia.in" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="flex items-center gap-2 group">
                <FiExternalLink size={16} />
                Visit hackwithindia.in
                <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-chrome-dark/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp()}>
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-steel mb-4">// Be part of it</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-ink uppercase tracking-tight mb-6">
              Want to <span className="text-crimson">Join</span> Us?
            </h2>
            <p className="font-ui text-steel leading-relaxed mb-10 max-w-lg mx-auto">
              We are a brand new community — the best time to join is right now,
              before our first event. Reach out and become a founding member.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="flex items-center gap-2 group">
                  Contact Us
                  <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/team">
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <FiUsers size={16} />
                  Meet the Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
