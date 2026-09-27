"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMapPin, FiExternalLink } from "react-icons/fi";

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
    description: "Hands-on workshop covering the basics of Arduino, sensor integration, and rapid prototyping.",
    status: "Waitlist",
  },
  {
    id: "hackathon",
    type: "Workshop & Hunt",
    title: "Git, GitHub Workshop & Operation Hunt",
    subtitle: "Inaugural Hackathon", 
    description: "Our very first hackathon — build real projects, compete in teams, and connect with mentors backed by the HWI industry ecosystem.",
    date: "01 Oct 2026", 
    time: "1:00 - 5:30 PM", 
    venue: "JDCOEM, Nagpur",
    status: "Active", 
    bannerSrc: "WhatsApp Image 2026-09-27 at 6.21.36 PM.jpeg", 
    accentColor: "text-crimson",
    glowColor: "rgba(220,38,38,0.15)",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfpKsk1UlRekAWU_Bp-1WkQX5WjZQ-1U3QSgxQit7LUkz2JcA/viewform",
    buttonText: "Register Now",
    countdownTarget: "2026-10-01T13:00:00+05:30", 
    overview: [
      "Open to all JDCOEM students across all departments and years.",
      "Basics of Git & GitHub, version control, and practical usage.", 
      "Strictly solo participation.", 
      "Participants access HWI's industry mentor network.",
      "Winners get trophies. Participants receive 2 certificates recognised by Hack With India." 
    ],
    requirements: [
      "Valid JDCOEM student ID required for participation.",
      "Bring your own laptop and charger.",
      "Basic programming knowledge recommended.",
      "Registration fee: ₹50." 
    ],
  }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Page Header */}
      <div className="mb-16 text-center">
        <SectionHeading as="h1" className="mb-4">
          Upcoming Events
        </SectionHeading>
        <p className="text-ink-dim max-w-2xl mx-auto">
          From 48-hour hackathons to intimate founder fireside chats, our events 
          are designed to push your skills and expand your network.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="hover:border-signal transition-colors duration-300 overflow-hidden">
              
              {/* Card Main Content */}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge variant={event.status === "Upcoming" ? "default" : "outline"}>
                    {event.status}
                  </Badge>
                  <span className="text-sm font-medium text-signal">{event.type}</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-ink mb-3">
                  {event.title}
                </h3>
                <p className="text-ink-dim mb-6">{event.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-ink-dim">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-signal" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-signal" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-signal" />
                    {/* Handles both 'location' and 'venue' properties smoothly */}
                    {event.location || event.venue}
                  </div>
                </div>
              </div>

              {/* Custom Action Bar (Buttons) */}
              <div className="flex-shrink-0 border-t border-chrome-dark/40 px-7 py-5 flex items-center justify-between gap-4 bg-chrome-dark/5">
                <button
                  onClick={() => console.log(`Close clicked for ${event.title}`)}
                  className="font-ui text-xs uppercase tracking-[0.15em] text-steel hover:text-ink transition-colors border border-chrome-dark/30 hover:border-steel/50 px-5 py-2.5"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
                >
                  Close
                </button>

                {event.status === "Registration Open" || event.status === "Active" ? (
                  <a
                    href={event.registrationLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
              
            </Card>
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
