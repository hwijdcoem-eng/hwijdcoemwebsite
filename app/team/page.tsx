"use client";

import { useState } from "react";
import { teamData, TeamMember } from "../../data/team";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiTwitter } from "react-icons/fi";

const categories = ["All", "Leadership", "Engineering", "Design", "Community"];

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTeam =
    activeCategory === "All"
      ? teamData
      : teamData.filter((member) => member.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <SectionHeading as="h1" className="mb-4">
          The HWI Team
        </SectionHeading>
        <p className="text-ink-dim max-w-2xl mx-auto">
          Meet the engineers, designers, and founders building the future of our workspace.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-signal text-void"
                : "bg-panel text-ink hover:bg-line"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink">{member.name}</h3>
                    <p className="text-signal text-sm font-medium">{member.role}</p>
                  </div>
                  <Badge>{member.category}</Badge>
                </div>
                <p className="text-ink-dim text-sm flex-grow mb-6">{member.bio}</p>
                <div className="flex space-x-3 text-ink-dim pt-4 border-t border-line">
                  {member.githubUrl && (
                    <a href={member.githubUrl} className="hover:text-ink transition-colors">
                      <FiGithub size={18} />
                    </a>
                  )}
                  {member.twitterUrl && (
                    <a href={member.twitterUrl} className="hover:text-ink transition-colors">
                      <FiTwitter size={18} />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
