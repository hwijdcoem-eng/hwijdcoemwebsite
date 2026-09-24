"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiX,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiCheckCircle,
  FiExternalLink,
} from "react-icons/fi";

// ─── Events data ──────────────────────────────────────────────────────────────
type EventStatus = "Coming Soon" | "Registration Open" | "Ongoing" | "Completed";

type EventItem = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  status: EventStatus;
  bannerSrc: string;
  accentColor: string;
  glowColor: string;
  overview: string[];
  requirements: string[];
  registerUrl?: string;
};

const events: EventItem[] = [
  {
    id: "hackathon",
    type: "Hackathon",
    title: "Hack JDCOEM",
    subtitle: "Inaugural Hackathon",
    description:
      "Our very first hackathon — build real projects, compete in teams, and connect with mentors backed by the HWI industry ecosystem.",
    date: "October 2026",
    time: "TBA",
    venue: "JDCOEM, Nagpur",
    status: "Coming Soon",
    bannerSrc: "/events-hackathon-wide.jpg",
    accentColor: "text-crimson",
    glowColor: "rgba(220,38,38,0.15)",
    overview: [
      "Open to all JDCOEM students across all departments and years.",
      "Problem statements released 48 hours before the event starts.",
      "Teams of 2–4 members. Solo registrations will be team-matched.",
      "Participants access HWI's industry mentor network during the hackathon.",
      "Winners receive certificates, prizes, and recognition on the HWI platform.",
    ],
    requirements: [
      "Valid JDCOEM student ID required for participation.",
      "Bring your own laptop and charger.",
      "Basic programming knowledge recommended.",
      "Registration is completely free for all JDCOEM students.",
    ],
  },
  {
    id: "ideathon",
    type: "Ideathon",
    title: "Ideathon 2026",
    subtitle: "Pitch Your Vision",
    description:
      "Got a startup idea or a solution to a real-world problem? Present it to a panel of mentors and peers and win recognition.",
    date: "November 2026",
    time: "TBA",
    venue: "JDCOEM, Nagpur",
    status: "Coming Soon",
    bannerSrc: "/events-ideathon-wide.jpg",
    accentColor: "text-[#38bdf8]",
    glowColor: "rgba(56,189,248,0.12)",
    overview: [
      "No code required — just your idea, thinking, and pitch.",
      "Teams of 1–3 members. Individual participation is welcome.",
      "5 minutes to present + 3 minutes Q&A per team.",
      "Judged on innovation, feasibility, impact, and presentation quality.",
      "Top ideas will be featured on the HWI JDCOEM platform.",
    ],
    requirements: [
      "Valid JDCOEM student ID required.",
      "Prepare a presentation (PPT/PDF) — no coding needed.",
      "Ideas must be original and not previously submitted elsewhere.",
      "Registration is completely free for all JDCOEM students.",
    ],
  },
  {
    id: "techtalks",
    type: "Workshop",
    title: "TechTalks",
    subtitle: "Workshops & Seminars",
    description:
      "Hands-on sessions led by industry practitioners across Web Dev, Cloud, AI, Open Source, and more. Build something real.",
    date: "December 2026",
    time: "TBA",
    venue: "JDCOEM, Nagpur",
    status: "Coming Soon",
    bannerSrc: "/events-techtalks-wide.jpg",
    accentColor: "text-[#4ade80]",
    glowColor: "rgba(74,222,128,0.12)",
    overview: [
      "Multiple parallel workshops across different technology tracks.",
      "Each session is 2–3 hours with hands-on project-based learning.",
      "Tracks include: Web Development, Cloud & DevOps, AI/ML, and Open Source.",
      "Led by industry professionals and HWI network mentors.",
      "Participants receive digital certificates for each session attended.",
    ],
    requirements: [
      "Valid JDCOEM student ID required.",
      "Bring your own laptop with required software pre-installed (list TBA).",
      "Basic familiarity with the chosen track is recommended.",
      "Registration is completely free for all JDCOEM students.",
    ],
  },
];

const statusStyle: Record<EventStatus, string> = {
  "Coming Soon":       "border-steel/40 text-steel",
  "Registration Open": "border-crimson/70 text-crimson bg-crimson/10",
  "Ongoing":           "border-[#4ade80]/70 text-[#4ade80] bg-[#4ade80]/10",
  "Completed":         "border-chrome-dark/30 text-steel/40",
};

// ─── Modal ────────────────────────────────────────────────────────────────────
function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-void/85 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col bg-[#0d0d0d] border border-chrome-dark/60 shadow-2xl overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
          boxShadow: `0 0 60px ${event.glowColor}, 0 25px 60px rgba(0,0,0,0.7)`,
        }}
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Crimson top accent line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-crimson to-transparent flex-shrink-0" />

        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-6 pb-4 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`font-ui text-[0.6rem] uppercase tracking-[0.2em] border px-2.5 py-1 ${statusStyle[event.status]}`}>
              {event.type}
            </span>
            <div className="flex items-center gap-1.5">
              <FiCalendar size={11} className="text-crimson" />
              <span className="font-ui text-xs text-steel">{event.date}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 w-8 h-8 border border-chrome-dark/40 hover:border-crimson/60 flex items-center justify-center text-steel hover:text-ink transition-all duration-200"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)" }}
          >
            <FiX size={15} />
          </button>
        </div>

        {/* Title */}
        <div className="px-7 pb-5 flex-shrink-0">
          <h2 className={`font-display font-black text-3xl md:text-4xl uppercase tracking-tight leading-none mb-1.5 ${event.accentColor}`}>
            {event.title}
          </h2>
          <p className="font-display font-semibold text-xs text-steel uppercase tracking-widest">
            {event.subtitle}
          </p>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-7 space-y-6 pb-2 scrollbar-thin">

          {/* Banner */}
          <div
            className="relative overflow-hidden border border-chrome-dark/40 group"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}
          >
            <img
              src={event.bannerSrc}
              alt={event.title}
              className="w-full h-56 object-cover block transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scan overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent animate-[scanIdle_3.5s_linear_infinite]" />
            </div>
            {/* Corner ticks */}
            <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-crimson/70" />
            <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-crimson/70" />
            <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-crimson/70" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-crimson/70" />
          </div>

          {/* Meta chips */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: FiCalendar, label: "Date",  value: event.date },
              { icon: FiClock,    label: "Time",  value: event.time },
              { icon: FiMapPin,   label: "Venue", value: "JDCOEM" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}
                className="border border-chrome-dark/30 bg-obsidian/60 p-3"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={11} className="text-crimson" />
                  <p className="font-ui text-[0.55rem] uppercase tracking-widest text-steel">{label}</p>
                </div>
                <p className="font-display font-bold text-xs text-ink">{value}</p>
              </div>
            ))}
          </div>

          {/* Overview */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 border border-crimson/40 flex items-center justify-center">
                <FiInfo size={11} className="text-crimson" />
              </div>
              <h3 className="font-display font-bold text-sm text-ink uppercase tracking-widest">Overview</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-chrome-dark/40 to-transparent" />
            </div>
            <ul className="space-y-3">
              {event.overview.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson mt-[7px] flex-shrink-0" />
                  <span className="font-ui text-steel text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 border border-crimson/40 flex items-center justify-center">
                <FiCheckCircle size={11} className="text-crimson" />
              </div>
              <h3 className="font-display font-bold text-sm text-ink uppercase tracking-widest">Requirements</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-chrome-dark/40 to-transparent" />
            </div>
            <ul className="space-y-3">
              {event.requirements.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                >
                  <span className="w-1.5 h-1.5 rotate-45 bg-steel/40 mt-[7px] flex-shrink-0" />
                  <span className="font-ui text-steel text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-chrome-dark/40 px-7 py-5 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="font-ui text-xs uppercase tracking-[0.15em] text-steel hover:text-ink transition-colors border border-chrome-dark/30 hover:border-steel/50 px-5 py-2.5"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
          >
            Close
          </button>
          {event.status === "Registration Open" && event.registerUrl ? (
            <a href={event.registerUrl} target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center gap-2 px-6">
                Register Now <FiExternalLink size={13} />
              </Button>
            </a>
          ) : (
            <div
              className="font-ui text-xs uppercase tracking-[0.1em] text-steel/50 border border-chrome-dark/20 px-5 py-2.5"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
            >
              Registration Opening Soon
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalEvent, setModalEvent] = useState<EventItem | null>(null);

  const prev = useCallback(() => setActiveIdx((i) => (i - 1 + events.length) % events.length), []);
  const next = useCallback(() => setActiveIdx((i) => (i + 1) % events.length), []);

  return (
    <div className="min-h-screen">

      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-chrome-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-steel mb-3">
              // HWI JDCOEM · Event Calendar
            </p>
            <h1 className="font-display font-black text-4xl md:text-5xl text-ink uppercase tracking-tight leading-tight mb-4">
              Upcoming <span className="text-crimson">Events</span>
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-gradient-to-r from-crimson/60 to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 bg-crimson/80" />
              <div className="h-px w-12 bg-gradient-to-l from-crimson/60 to-transparent" />
            </div>
            <p className="font-ui text-steel max-w-xl leading-relaxed text-sm">
              We're a new chapter gearing up for our first series of events across 2026.
              Click any active card to view full event details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stacked Card Showcase ─────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* ── LEFT: Numbered nav ── */}
            <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-start gap-6 lg:gap-0 lg:ml-16">
              <p className="hidden lg:block font-ui text-[0.6rem] uppercase tracking-[0.2em] text-steel mb-8">
                // Choose Event
              </p>

              {events.map((e, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={e.id}
                    onClick={() => setActiveIdx(i)}
                    className="group relative flex items-center gap-3 mb-6 lg:mb-8 last:mb-0 transition-all duration-300"
                  >
                    <motion.span
                      className={`font-display font-black leading-none transition-all duration-400 ${
                        isActive ? "text-crimson" : "text-steel/30 group-hover:text-steel/60"
                      }`}
                      animate={{ fontSize: isActive ? "3.5rem" : "1.6rem" }}
                      transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="hidden lg:block h-px w-10 bg-crimson"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                );
              })}

              {/* Controls */}
              <div className="flex items-center gap-2 lg:mt-4">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-chrome-dark/40 hover:border-crimson/60 flex items-center justify-center text-steel hover:text-ink transition-all duration-200 hover:bg-crimson/5"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-chrome-dark/40 hover:border-crimson/60 flex items-center justify-center text-steel hover:text-ink transition-all duration-200 hover:bg-crimson/5"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* ── RIGHT: Stacked cards ── */}
            <div className="lg:col-span-10 relative flex items-center justify-center" style={{ height: 520 }}>
              {events.map((event, i) => {
                const total = events.length;
                const offset = ((i - activeIdx) % total + total) % total;
                const isActive = offset === 0;

                // Visual stack depth
                const depth = isActive ? 0 : offset === 1 ? 1 : 2;
                const y = depth * -20;
                const x = depth * 28;
                const scale = 1 - depth * 0.055;
                const opacity = depth > 1 ? 0.55 : 1 - depth * 0.12;
                const rotate = depth * 1.5;
                const blur = depth * 0.5;

                return (
                  <motion.div
                    key={event.id}
                    className="absolute w-full max-w-2xl cursor-pointer select-none"
                    animate={{
                      y,
                      x,
                      scale,
                      opacity,
                      rotateZ: shouldReduceMotion ? 0 : rotate,
                      filter: `blur(${shouldReduceMotion ? 0 : blur}px)`,
                      zIndex: total - depth,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                      mass: 0.8,
                    }}
                    onClick={() => {
                      if (isActive) setModalEvent(event);
                      else setActiveIdx(i);
                    }}
                    whileHover={isActive ? { scale: scale + 0.008 } : {}}
                  >
                    {/* Card glow on active */}
                    {isActive && (
                      <div
                        className="absolute -inset-1 rounded-sm pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at center, ${event.glowColor} 0%, transparent 70%)` }}
                      />
                    )}

                    <div
                      className="border overflow-hidden bg-[#0d0d0d] transition-colors duration-300 relative"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
                        borderColor: isActive ? "rgba(220,38,38,0.5)" : "rgba(255,255,255,0.07)",
                      }}
                    >
                      {/* Active top glow bar */}
                      {isActive && (
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-crimson/80 to-transparent" />
                      )}

                      {/* Banner */}
                      <div className="relative overflow-hidden h-64 group">
                        <motion.img
                          src={event.bannerSrc}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          animate={{ scale: isActive ? 1 : 1.04 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent" />

                        {/* Scan line (active only) */}
                        {isActive && !shouldReduceMotion && (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent animate-[scanIdle_4s_linear_infinite]" />
                          </div>
                        )}

                        {/* Corner ticks (active only) */}
                        {isActive && (
                          <>
                            <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-crimson/80" />
                            <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-crimson/80" />
                            <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-crimson/80" />
                          </>
                        )}

                        {/* Type badge */}
                        <div className="absolute top-4 left-4">
                          <span className="font-ui text-[0.6rem] uppercase tracking-[0.2em] text-ink bg-void/80 backdrop-blur-sm border border-chrome-dark/50 px-2 py-0.5">
                            {event.type}
                          </span>
                        </div>

                        {/* Status badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`font-ui text-[0.58rem] uppercase tracking-[0.15em] border px-2 py-0.5 backdrop-blur-sm ${statusStyle[event.status]}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-7">
                        <h2 className={`font-display font-black text-3xl uppercase tracking-tight leading-none mb-1.5 ${event.accentColor}`}>
                          {event.title}
                        </h2>
                        <p className="font-display font-semibold text-[0.7rem] text-steel uppercase tracking-widest mb-4">
                          {event.subtitle}
                        </p>
                        <p className="font-ui text-steel text-sm leading-relaxed mb-6 max-w-lg">
                          {event.description}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-6 mb-6">
                          {[
                            { icon: FiCalendar, val: event.date },
                            { icon: FiClock,    val: event.time },
                            { icon: FiMapPin,   val: event.venue },
                          ].map(({ icon: Icon, val }) => (
                            <div key={val} className="flex items-center gap-2 text-steel">
                              <Icon size={13} className="text-crimson flex-shrink-0" />
                              <span className="font-ui text-xs">{val}</span>
                            </div>
                          ))}
                        </div>

                        {/* Click hint */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              className="flex items-center justify-between pt-5 border-t border-chrome-dark/30"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ delay: 0.15, duration: 0.25 }}
                            >
                              <span className="font-ui text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                                Click card to view full details
                              </span>
                              <motion.span
                                className="text-crimson"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                              >
                                <FiArrowRight size={14} />
                              </motion.span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── Stay updated CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-chrome-dark/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-steel mb-4">
              // Don't miss out
            </p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight mb-5">
              Stay in the <span className="text-crimson">Loop</span>
            </h2>
            <p className="font-ui text-steel leading-relaxed mb-8 max-w-md mx-auto text-sm">
              Registration dates will be announced on our social channels. Reach
              out to us directly and we'll notify you when registration opens.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="flex items-center gap-2 group">
                  Contact Us
                  <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="outline" size="lg">Join Community</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Modal ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalEvent && (
          <EventModal event={modalEvent} onClose={() => setModalEvent(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
