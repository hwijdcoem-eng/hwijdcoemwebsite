"use client";

import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

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
  }
];

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <SectionHeading as="h1" className="mb-4">
          Upcoming Events
        </SectionHeading>
        <p className="text-ink-dim max-w-2xl mx-auto">
          From 48-hour hackathons to intimate founder fireside chats, our events 
          are designed to push your skills and expand your network.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:border-signal transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
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
                      {event.location}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-auto w-full pt-4 md:pt-0 md:pl-6 md:border-l border-line flex flex-col justify-center">
                  <Button className="w-full whitespace-nowrap">
                    {event.status === "Waitlist" ? "Join Waitlist" : "Register Now"}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
