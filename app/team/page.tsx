"use client";

import { useState } from "react";
import { teamData, TeamMember, TeamCategory } from "../../data/team";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Reticle, TickMarks } from "../../components/ui/Motifs";
import { motion, AnimatePresence } from "framer-motion";

const categories: ("All" | TeamCategory)[] = [
  "All",
  "Admin Body",
  "Web Development Team",
  "Technical Team",
  "UI/UX Team",
  "Documentation Team",
  "Operational Team",
  "Publicity Team",
  "Media Team",
  "Volunteer Team"
];

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | TeamCategory>("All");

  const filteredTeam =
    activeCategory === "All"
      ? teamData
      : teamData.filter((member) => member.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center flex flex-col items-center">
        <SectionHeading as="h1" className="mb-4">
          HWI JDCOEM Commitee
        </SectionHeading>
        <p className="text-steel max-w-2xl mx-auto font-ui text-lg">
          The tactical core driving the Hack With India JDCOEM initiative.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-none clip-edge text-sm font-ui uppercase font-bold tracking-widest transition-colors ${
              activeCategory === category
                ? "bg-crimson text-void"
                : "bg-obsidian-raised text-ink hover:bg-chrome-dark"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member) => {
            const isLead = member.role.includes("President") || member.role.includes("Head") && !member.role.includes("Co-Head");
            
            return (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full flex flex-col relative" withGlow={isLead}>
                  {isLead && <Reticle className="absolute top-4 right-4 text-crimson opacity-50" />}
                  
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <TickMarks />
                        <p className="text-crimson font-ui font-bold text-[0.65rem] tracking-[0.15em] uppercase">
                          {member.role}
                        </p>
                      </div>
                      <h3 className="font-ui font-semibold text-2xl text-ink tracking-[0.01em]">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-chrome-dark/30 flex justify-between items-center">
                    <Badge variant="outline">{member.category}</Badge>
                    <span className="font-ui text-steel text-xs tracking-wider">{member.departmentYear}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
