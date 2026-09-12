"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";
import { FiCalendar, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ─── Event data ──────────────────────────────────────────────────────────────
type EventItem = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  targetDate: Date; // for countdown
  venue: string;
  status: "Coming Soon" | "Registration Open" | "Ongoing" | "Completed";
  bannerSrc: string;
  accentColor: string; // tailwind arbitrary text color for title
};

const events: EventItem[] = [
  {
    id: "hackathon",
    label: "Inaugural Event",
    title: "Hack JDCOEM",
    subtitle: "Inaugural Hackathon",
    description:
      "Our very first hackathon is on the horizon. Build real projects, connect with industry mentors via the HWI ecosystem, and compete alongside the best student developers at JDCOEM.",
    date: "Oct 2026",
    targetDate: new Date("2026-10-15T09:00:00"),
    venue: "JDCOEM, Nagpur",
    status: "Coming Soon",
    bannerSrc: "/event-hackathon.jpg",
    accentColor: "text-crimson",
  },
  {
    id: "ideathon",
    label: "Event 02",
    title: "Ideathon 2026",
    subtitle: "Pitch Your Vision",
    description:
      "Got an idea that could change the world? Pitch it. Our Ideathon brings together creative minds to prototype, present, and refine breakthrough concepts with mentor feedback.",
    date: "Nov 2026",
    targetDate: new Date("2026-11-20T09:00:00"),
    venue: "JDCOEM, Nagpur",
    status: "Coming Soon",
    bannerSrc: "/event-ideathon.jpg",
    accentColor: "text-[#38bdf8]",
  },
  {
    id: "techtalks",
    label: "Event 03",
    title: "TechTalks",
    subtitle: "Workshops & Seminars",
    description:
      "Hands-on workshops led by industry practitioners — from web dev and cloud to AI and open source. Attend, learn, build, and leave with skills you can deploy the same day.",
    date: "Dec 2026",
    targetDate: new Date("2026-12-10T09:00:00"),
    venue: "JDCOEM, Nagpur",
    status: "Coming Soon",
    bannerSrc: "/event-techtalks.jpg",
    accentColor: "text-[#4ade80]",
  },
];

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  // Start with zeros to match server-rendered HTML, then hydrate on client
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate.getTime()]);
  return time;
}

// ─── Pad helper ───────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0");

// ─── Main component ───────────────────────────────────────────────────────────
export function EventCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeEvent = events[activeIdx];
  const countdown = useCountdown(activeEvent.targetDate);

  const next = useCallback(() => setActiveIdx((i) => (i + 1) % events.length), []);
  const prev = useCallback(() => setActiveIdx((i) => (i - 1 + events.length) % events.length), []);

  // Auto-advance every 6s
  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, shouldReduceMotion, next]);

  const infoVariants = {
    enter: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -12, transition: { duration: 0.25, ease: "easeIn" as const } },
  };

  const bannerVariants = {
    enter: { opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97, transition: { duration: 0.3, ease: "easeIn" as const } },
  };

  return (
    <section
      className="py-20 border-t border-chrome-dark/20 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background glow — color shifts per event */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/4 blur-[140px] rounded-full pointer-events-none z-0 transition-colors duration-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section label ── */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-crimson">
              Upcoming Events
            </span>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`transition-all duration-300 rounded-sm ${
                  i === activeIdx
                    ? "w-6 h-1.5 bg-crimson"
                    : "w-1.5 h-1.5 bg-chrome-dark/60 hover:bg-steel"
                }`}
                aria-label={`Go to event ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Info panel ── */}
          <div className="flex flex-col min-h-[480px] justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                variants={infoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col flex-grow"
              >
                {/* Event index label */}
                <p className="font-ui text-[0.65rem] uppercase tracking-[0.2em] text-steel mb-4 border border-chrome-dark/30 w-fit px-2 py-0.5">
                  {activeEvent.label}
                </p>

                <h2 className={`font-display font-black text-4xl md:text-5xl uppercase tracking-tight leading-tight mb-2 ${activeEvent.accentColor}`}>
                  {activeEvent.title}
                </h2>
                <p className="font-display font-semibold text-lg text-steel uppercase tracking-wide mb-5">
                  {activeEvent.subtitle}
                </p>
                <p className="font-ui text-steel leading-relaxed mb-8 max-w-md text-sm">
                  {activeEvent.description}
                </p>

                {/* Detail chips */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { label: "Date", value: activeEvent.date },
                    { label: "Venue", value: "JDCOEM" },
                    { label: "Status", value: activeEvent.status },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border border-chrome-dark/30 p-3 bg-obsidian/40"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                    >
                      <p className="font-ui text-[0.6rem] uppercase tracking-[0.12em] text-steel mb-1">{item.label}</p>
                      <p className="font-display font-bold text-xs text-ink">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Countdown timer */}
                <div className="mb-8">
                  <p className="font-ui text-[0.6rem] uppercase tracking-[0.2em] text-steel mb-3">
                    // Countdown
                  </p>
                  <div className="flex items-end gap-3">
                    {[
                      { label: "Days", value: countdown.days },
                      { label: "Hrs", value: countdown.hours },
                      { label: "Min", value: countdown.minutes },
                      { label: "Sec", value: countdown.seconds },
                    ].map((unit, i) => (
                      <div key={unit.label} className="flex items-end gap-3">
                        <div className="text-center">
                          <div
                            className="bg-obsidian border border-chrome-dark/40 px-3 py-2 min-w-[52px] text-center"
                            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
                          >
                            <span className="font-display font-black text-2xl text-ink tabular-nums">
                              {pad(unit.value)}
                            </span>
                          </div>
                          <p className="font-ui text-[0.55rem] uppercase tracking-widest text-steel mt-1">{unit.label}</p>
                        </div>
                        {i < 3 && <span className="font-display font-black text-2xl text-crimson mb-6 leading-none">:</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/events">
                  <Button size="lg" className="flex items-center gap-2 group w-fit">
                    <FiCalendar size={16} />
                    View Events
                    <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 border border-chrome-dark/40 flex items-center justify-center text-steel hover:text-ink hover:border-crimson/60 transition-colors"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                aria-label="Previous event"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-chrome-dark/40 flex items-center justify-center text-steel hover:text-ink hover:border-crimson/60 transition-colors"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                aria-label="Next event"
              >
                <FiChevronRight size={18} />
              </button>
              <span className="font-ui text-[0.6rem] uppercase tracking-widest text-steel">
                {String(activeIdx + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── RIGHT: Banner frame ── */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Corner ticks */}
              <span className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-crimson z-20" />
              <span className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-crimson z-20" />
              <span className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-crimson z-20" />
              <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-crimson z-20" />

              {/* Scan line */}
              <div
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}
              >
                <div className="w-full h-0.5 bg-crimson/30 animate-[scanIdle_4s_linear_infinite]" />
              </div>

              {/* Banner crossfade */}
              <div
                className="border border-chrome-dark/50 overflow-hidden relative"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeEvent.id}
                    src={activeEvent.bannerSrc}
                    alt={`${activeEvent.title} event banner`}
                    variants={bannerVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full h-auto object-cover block"
                  />
                </AnimatePresence>
              </div>

              {/* Progress bar at bottom of frame */}
              {!paused && !shouldReduceMotion && (
                <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-chrome-dark/20 z-20">
                  <motion.div
                    key={`progress-${activeIdx}`}
                    className="h-full bg-crimson/60"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
