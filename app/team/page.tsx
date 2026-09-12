"use client";

import { teamData, TeamMember, TeamCategory } from "../../data/team";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { Reticle } from "../../components/ui/Motifs";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin } from "react-icons/fi";
import Image from "next/image";

const categories: TeamCategory[] = [
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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-20 text-center flex flex-col items-center">
        <SectionHeading as="h1" className="mb-4">
          HWI JDCOEM Committee
        </SectionHeading>
        <p className="text-steel max-w-2xl mx-auto font-ui text-lg">
          The tactical core driving the Hack With India JDCOEM initiative.
        </p>
      </div>

      <div className="space-y-32">
        {categories.map((category) => {
          const members = teamData.filter((m) => m.category === category);
          if (members.length === 0) return null;

          return (
            <section key={category} className="scroll-mt-24">
              <div className="mb-12 border-l-4 border-crimson pl-6">
                <h2 className="font-display font-bold text-3xl uppercase tracking-wider text-ink">
                  {category}
                </h2>
                <p className="text-steel font-ui text-sm mt-2 tracking-wide uppercase">
                  {members.length} Active Operators
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member) => {
                  const isLead =
                    member.role.includes("President") ||
                    (member.role.includes("Head") && !member.role.includes("Co-Head"));

                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="h-full flex flex-col relative items-center text-center p-8" withGlow={isLead}>
                        {isLead && <Reticle className="absolute top-4 right-4 text-crimson opacity-50" />}
                        
                        {/* Avatar */}
                        <div className="w-28 h-28 mb-6 rounded-full overflow-hidden border-2 border-chrome-dark/50 bg-obsidian-raised relative shrink-0">
                          {member.imageUrl ? (
                            <Image
                              src={member.imageUrl}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-steel font-display text-2xl bg-obsidian">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <h3 className="font-ui font-semibold text-2xl text-ink tracking-[0.01em] mb-1">
                          {member.name}
                        </h3>
                        <p className="text-crimson font-ui font-bold text-xs tracking-[0.15em] uppercase mb-4">
                          {member.role}
                        </p>
                        
                        <p className="text-steel font-ui text-sm mb-6 flex-grow">
                          {member.bio || `${member.departmentYear} representative.`}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-auto pt-6 border-t border-chrome-dark/30 w-full justify-center">
                          <a
                            href={member.email ? `mailto:${member.email}` : "#"}
                            className="w-10 h-10 rounded bg-obsidian border border-chrome-dark/50 flex items-center justify-center text-steel hover:text-ink hover:border-crimson hover:bg-crimson/10 transition-colors"
                          >
                            <FiMail size={18} />
                          </a>
                          <a
                            href={member.linkedinUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded bg-obsidian border border-chrome-dark/50 flex items-center justify-center text-steel hover:text-ink hover:border-crimson hover:bg-crimson/10 transition-colors"
                          >
                            <FiLinkedin size={18} />
                          </a>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
