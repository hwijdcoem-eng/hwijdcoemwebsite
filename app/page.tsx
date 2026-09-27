"use client";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { EventCarousel } from "../components/ui/EventCarousel";
import {
  FiArrowRight,
  FiUsers,
  FiCalendar,
  FiZap,
  FiMessageSquare,
} from "react-icons/fi";
import { teamData } from "../data/team";

// ─── Collaborations ────────────────────────────────────────────────────────────
const collaborations = [
  {
    name: "Hack With India",
    logoSrc: "/hwi-logo.png",
    href: "https://hackwithindia.in",
    description: "National-level hackathon & tech community platform",
    tag: "OFFICIAL PARTNER",
  },
];

// ─── Feature cards data ────────────────────────────────────────────────────────────
const features = [
  {
    icon: FiZap,
    colorClass: "text-crimson",
    borderColorClass: "group-hover:border-crimson/60",
    title: "HWI Ecosystem Access",
    description:
      "As an official HWI chapter, members get direct access to industry partners — Microsoft Azure, GitHub, Postman, GeeksForGeeks, and more. Real tools, real credits, real experience.",
  },
  {
    icon: FiCalendar,
    colorClass: "text-steel",
    borderColorClass: "group-hover:border-steel/40",
    title: "Hackathons & Events",
    description:
      "We are gearing up for our first hackathon in October 2025. Every event connects you with mentors, industry sponsors, and peers who ship real products.",
  },
  {
    icon: FiUsers,
    colorClass: "text-crimson",
    borderColorClass: "group-hover:border-crimson/60",
    title: "Student-Led Community",
    description:
      "36 members across 9 specialized teams — Web Dev, Technical, UI/UX, Media, Publicity, and more. We just launched at JDCOEM and we're already building.",
  },
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <div className="w-full">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Corner tick marks */}
        <span className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-crimson/40 z-20 pointer-events-none" />
        <span className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-crimson/40 z-20 pointer-events-none" />
        <span className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-crimson/40 z-20 pointer-events-none" />
        <span className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-crimson/40 z-20 pointer-events-none" />

        {/* Ghost wordmark texture */}
        <div className="absolute -bottom-10 -right-10 z-0 pointer-events-none opacity-[0.03] select-none overflow-hidden">
          <h2 className="font-display font-black text-[12rem] md:text-[16rem] leading-[0.85] text-ink tracking-tighter text-right whitespace-nowrap">
            HACK WITH<br />INDIA<br />JDCOEM
          </h2>
        </div>

        {/* Horizontal scan line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/10 to-transparent z-0 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* System badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 font-ui text-xs tracking-[0.2em] uppercase text-steel border border-chrome-dark/40 px-4 py-1.5 bg-obsidian/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              HWI JDCOEM · Official Chapter · Est. 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-5xl md:text-[5.5rem] text-ink tracking-tighter leading-[0.9] mb-8 uppercase"
          >
            Build.{" "}
            <span className="text-crimson [text-shadow:0_0_40px_rgba(255,16,83,0.4)]">
              Connect.
            </span>{" "}
            Create.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-steel max-w-2xl mx-auto mb-12 font-ui leading-relaxed"
          >
            The official Hack With India chapter at JDCOEM — a brand new
            student community connecting engineers with industry tools,
            mentors, and real-world hackathons. First event: October 2025.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/team">
              <Button size="lg" className="w-full sm:w-auto flex items-center gap-2 group">
                <FiUsers size={18} />
                Meet the Team
                <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                <FiMessageSquare size={18} />
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Events Carousel ──────────────────────────────────────────────── */}
      <EventCarousel />

      {/* ── Collaborators ───────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-steel mb-3">
              // Affiliated with
            </p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight">
              Our Collaboration
            </h2>
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-crimson/60" />
              <div className="w-1.5 h-1.5 rotate-45 bg-crimson/80" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-crimson/60" />
            </div>
          </motion.div>

          {/* Collab cards */}
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {collaborations.map((collab) => (
              <a
                key={collab.name}
                href={collab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center w-56"
              >
                {/* Card */}
                <div className="relative w-full aspect-square border border-chrome-dark/40 group-hover:border-crimson/60 transition-all duration-300 overflow-hidden flex items-center justify-center p-4 bg-black"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)" }}
                >
                  {/* Corner tick marks */}
                  <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-crimson/40 group-hover:border-crimson transition-colors duration-300" />
                  <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-crimson/40 group-hover:border-crimson transition-colors duration-300" />
                  <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-crimson/20 group-hover:border-crimson/60 transition-colors duration-300" />
                  <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-crimson/20 group-hover:border-crimson/60 transition-colors duration-300" />

                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-crimson/0 group-hover:bg-crimson/5 transition-colors duration-300" />

                  <img
                    src={collab.logoSrc}
                    alt={collab.name}
                    className="w-4/5 h-4/5 object-contain relative z-10 drop-shadow-none"
                  />
                </div>

                {/* Tag */}
                <div className="mt-3 mb-1">
                  <span className="font-ui text-[0.6rem] uppercase tracking-[0.2em] text-crimson/70 border border-crimson/20 px-2 py-0.5">
                    {collab.tag}
                  </span>
                </div>

                {/* Name */}
                <p className="font-display font-bold text-ink uppercase text-sm tracking-wide text-center group-hover:text-crimson transition-colors duration-200">
                  {collab.name}
                </p>
                <p className="font-ui text-[0.7rem] text-steel text-center mt-1 leading-snug">
                  {collab.description}
                </p>
              </a>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ── Feature cards ─────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-ui text-xs uppercase tracking-[0.2em] text-steel mb-3">
              // What we do
            </p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight">
              Engineered for Builders
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={itemVariants}>
                <Card
                  className={`h-full group p-8 border border-chrome-dark/30 transition-colors duration-300 ${f.borderColorClass}`}
                >
                  <div className="w-12 h-12 mb-6 flex items-center justify-center border border-chrome-dark/40 bg-obsidian/60"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)" }}
                  >
                    <f.icon size={22} className={f.colorClass} />
                  </div>
                  <h3 className={`font-display font-bold text-lg text-ink mb-3 uppercase tracking-wide`}>
                    {f.title}
                  </h3>
                  <p className="font-ui text-steel text-sm leading-relaxed">
                    {f.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA section ───────────────────────────────────────────────────── */}
      <section className="py-28 border-t border-chrome-dark/20 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[600px] h-[300px] bg-crimson/5 blur-[120px] rounded-full" />
        </div>

        {/* Corner ticks */}
        <span className="absolute top-12 left-12 w-5 h-5 border-t-2 border-l-2 border-crimson/30 pointer-events-none" />
        <span className="absolute top-12 right-12 w-5 h-5 border-t-2 border-r-2 border-crimson/30 pointer-events-none" />
        <span className="absolute bottom-12 left-12 w-5 h-5 border-b-2 border-l-2 border-crimson/30 pointer-events-none" />
        <span className="absolute bottom-12 right-12 w-5 h-5 border-b-2 border-r-2 border-crimson/30 pointer-events-none" />

        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-6 font-ui text-xs tracking-[0.2em] uppercase text-steel">
            <FiZap size={12} className="text-crimson" />
            Join the community
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-ink uppercase tracking-tight leading-tight mb-6">
            Ready to Ship<span className="text-crimson">?</span>
          </h2>
          <p className="font-ui text-steel text-lg mb-10 leading-relaxed">
            Stop planning. Start building. Reach out to us and become part of
            HWI JDCOEM's growing network of builders and creators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="flex items-center gap-2 group">
                Get in Touch
                <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="lg" className="flex items-center gap-2">
                Learn About Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
