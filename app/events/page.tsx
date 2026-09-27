"use client";

import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMapPin, FiExternalLink } from "react-icons/fi";

const events = [
  {
    id: 1,
    title: "Global Hackathon 2026",
    date: "October 15, 2026",
    time: "48 Hours",
    location: "HWI Main Campus & Virtual",
    type: "Hackathon",
    description: "Our flagship annual hackathon. Build the next big thing in 48 hours with hundreds of other engineers and designers.",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Founder's Fireside Chat",
    date: "November 2, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "Innovation Lab",
    type: "Networking",
    description: "An intimate Q&A session with alumni founders who have successfully raised Series A rounds.",
    status: "Registration Open",
  },
  {
    id: 3,
    title: "Intro to Physical Computing",
    date: "November 10, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Hardware Shop",
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

export default function EventsPage() {
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
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
        ))}
      </div>
    </div>
  );
}
