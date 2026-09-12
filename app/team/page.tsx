"use client";

import { teamData, TeamMember, TeamCategory } from "../../data/team";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 group/grid">
                {members.map((member) => {
                  const isLead =
                    member.role.includes("President") ||
                    (member.role.includes("Head") && !member.role.includes("Co-Head"));

                  const hasPhoto = !!member.imageUrl;

                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="h-full flex flex-col relative items-center text-center p-8 group/card" withGlow={isLead}>
                        
                        {/* Avatar Frame */}
                        <div className="relative w-32 h-32 mb-8 shrink-0 transition-opacity duration-300 group-hover/grid:opacity-50 group-hover/card:!opacity-100">
                          {/* Outer chrome gradient ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-chrome-light to-chrome-dark p-[2px]">
                            <div className="w-full h-full rounded-full bg-void" />
                          </div>
                          
                          {/* Inner crimson ring (gap created by inset-[3px]) */}
                          <div className="absolute inset-[3px] rounded-full border border-crimson/40 group-hover/card:border-crimson group-hover/card:shadow-[0_0_15px_rgba(255,16,83,0.5)] transition-all duration-250 z-10 pointer-events-none" />

                          {/* N/E/S/W tick marks */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[2px] w-[2px] h-2 bg-crimson z-20 pointer-events-none" />
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px] w-[2px] h-2 bg-crimson z-20 pointer-events-none" />
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[2px] w-2 h-[2px] bg-crimson z-20 pointer-events-none" />
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[2px] w-2 h-[2px] bg-crimson z-20 pointer-events-none" />

                          {/* Inner Container */}
                          <div className="absolute inset-[4px] rounded-full overflow-hidden bg-obsidian-raised relative">
                            {hasPhoto ? (
                              <>
                                <Image
                                  src={member.imageUrl!}
                                  alt={member.name}
                                  fill
                                  className="object-cover grayscale-[0.85] contrast-125 brightness-90 group-hover/card:grayscale-0 group-hover/card:contrast-100 group-hover/card:brightness-100 transition-all duration-250"
                                />
                                {/* Crimson tint in shadows overlay */}
                                <div className="absolute inset-0 bg-crimson/20 mix-blend-color-burn group-hover/card:opacity-0 transition-opacity duration-250 pointer-events-none z-10" />
                                {/* Vignette Overlay */}
                                <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(10,10,11,1)] group-hover/card:shadow-[inset_0_0_12px_rgba(10,10,11,0.5)] transition-shadow duration-250 pointer-events-none z-20" />
                              </>
                            ) : (
                              <>
                                {/* Circuit Texture (using CSS grid lines) */}
                                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:12px_12px]" />
                                
                                {/* Scan line */}
                                <div className="absolute top-0 left-0 right-0 h-[100%] pointer-events-none overflow-hidden z-10">
                                  <div className="w-full h-[2px] border-t border-dashed border-crimson/40 animate-scan" />
                                </div>
                                
                                <div className="w-full h-full flex items-center justify-center relative z-20">
                                  <span className="font-display text-5xl text-steel/50">
                                    {member.name.charAt(0)}
                                  </span>
                                </div>
                                {/* Vignette Overlay */}
                                <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(10,10,11,1)] pointer-events-none z-30" />
                              </>
                            )}
                          </div>
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
                            className="w-10 h-10 rounded bg-obsidian border border-chrome-dark/50 flex items-center justify-center text-steel hover:text-ink hover:border-crimson hover:bg-crimson/10 transition-colors relative z-30"
                          >
                            <FiMail size={18} />
                          </a>
                          <a
                            href={member.linkedinUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded bg-obsidian border border-chrome-dark/50 flex items-center justify-center text-steel hover:text-ink hover:border-crimson hover:bg-crimson/10 transition-colors relative z-30"
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
