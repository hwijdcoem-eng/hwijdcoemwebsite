"use client";

import { teamData, TeamMember, TeamCategory } from "../../data/team";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
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
  const shouldReduceMotion = useReducedMotion();

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    show: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: shouldReduceMotion ? 0 : 0.15, 
        ease: "easeOut"
      }
    }
  };

  const tickBase = "absolute bg-crimson/80 group-hover/card:bg-crimson group-focus-visible/card:bg-crimson group-hover/card:shadow-[0_0_8px_#FF1053] group-focus-visible/card:shadow-[0_0_8px_#FF1053] z-20 pointer-events-none transition-all duration-250 ease-out motion-reduce:transition-none";

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

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 group/grid"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={gridVariants}
              >
                {members.map((member, index) => {
                  const isLead =
                    member.role.includes("President") ||
                    (member.role.includes("Head") && !member.role.includes("Co-Head"));

                  const hasPhoto = !!member.imageUrl;

                  return (
                    <motion.div
                      key={member.id}
                      variants={cardVariants}
                      className="group/card outline-none opacity-100 group-hover/grid:opacity-85 group-focus-within/grid:opacity-85 hover:!opacity-100 focus-within:!opacity-100 transition-opacity duration-250 ease-out motion-reduce:transition-none"
                      tabIndex={0}
                    >
                      <Card padding="lg" className="h-full flex flex-col relative items-center text-center group-hover/card:border-chrome-light/50 group-focus-visible/card:border-chrome-light/50 transition-colors duration-250 ease-out motion-reduce:transition-none" withGlow={isLead}>
                        
                        {/* Avatar Frame */}
                        <div className="relative w-32 h-32 mb-8 shrink-0">
                          {/* Outer chrome gradient ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-chrome-light/40 to-chrome-dark/40 p-[2px] group-hover/card:from-chrome-light group-focus-visible/card:from-chrome-light transition-colors duration-250 ease-out motion-reduce:transition-none">
                            <div className="w-full h-full rounded-full bg-void" />
                          </div>
                          
                          {/* Inner crimson ring */}
                          <div className="absolute inset-[3px] rounded-full border border-crimson/60 group-hover/card:border-crimson group-focus-visible/card:border-crimson group-hover/card:shadow-[0_0_15px_rgba(255,16,83,0.5)] group-focus-visible/card:shadow-[0_0_15px_rgba(255,16,83,0.5)] transition-all duration-250 ease-out motion-reduce:transition-none z-10 pointer-events-none" />

                          {/* N/E/S/W tick marks */}
                          <div className={`${tickBase} top-0 left-1/2 -translate-x-1/2 -translate-y-[2px] group-hover/card:-translate-y-[4px] group-focus-visible/card:-translate-y-[4px] w-[2px] h-2`} />
                          <div className={`${tickBase} bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px] group-hover/card:translate-y-[4px] group-focus-visible/card:translate-y-[4px] w-[2px] h-2`} />
                          <div className={`${tickBase} left-0 top-1/2 -translate-y-1/2 -translate-x-[2px] group-hover/card:-translate-x-[4px] group-focus-visible/card:-translate-x-[4px] w-2 h-[2px]`} />
                          <div className={`${tickBase} right-0 top-1/2 -translate-y-1/2 translate-x-[2px] group-hover/card:translate-x-[4px] group-focus-visible/card:translate-x-[4px] w-2 h-[2px]`} />

                          {/* Inner Container */}
                          <div className="absolute inset-[4px] rounded-full overflow-hidden bg-obsidian-raised">
                            {hasPhoto ? (
                              <>
                                <Image
                                  src={member.imageUrl!}
                                  alt={member.name}
                                  fill
                                  className={`object-cover ${member.imagePosition === 'top' ? 'object-top' : member.imagePosition === 'bottom' ? 'object-bottom' : 'object-center'} grayscale-[0.85] contrast-125 brightness-90 group-hover/card:grayscale-0 group-focus-visible/card:grayscale-0 group-hover/card:contrast-100 group-focus-visible/card:contrast-100 group-hover/card:brightness-100 group-focus-visible/card:brightness-100 transition-all duration-250 ease-out motion-reduce:transition-none`}
                                />
                                {/* Crimson tint in shadows overlay */}
                                <div className="absolute inset-0 bg-crimson/30 mix-blend-multiply group-hover/card:opacity-0 group-focus-visible/card:opacity-0 transition-opacity duration-250 ease-out motion-reduce:transition-none pointer-events-none z-10" />
                                {/* Vignette Overlay */}
                                <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(10,10,11,0.8)] group-hover/card:shadow-[inset_0_0_0px_rgba(10,10,11,0)] group-focus-visible/card:shadow-[inset_0_0_0px_rgba(10,10,11,0)] transition-shadow duration-250 ease-out motion-reduce:transition-none pointer-events-none z-20" />
                                
                                {/* Idle Scanline */}
                                <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-20 rounded-full motion-reduce:hidden">
                                  <div 
                                    className="w-full h-[2px] bg-crimson/30 shadow-[0_0_8px_rgba(255,16,83,0.5)] animate-[scanIdle_7s_linear_infinite]"
                                    style={{ animationDelay: `${(index % 5) * 1.2}s` }} 
                                  />
                                </div>
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
                                <div className="absolute inset-0 shadow-[inset_0_0_16px_rgba(10,10,11,1)] pointer-events-none z-30" />
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
                        
                        <p className="text-steel font-ui text-sm mb-6 flex-grow [&_a]:text-steel [&_a]:no-underline pointer-events-none">
                          {member.bio || member.departmentYear.replace('/', ' / ')}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-auto pt-6 border-t border-chrome-dark/30 group-hover/card:border-chrome-dark/60 group-focus-visible/card:border-chrome-dark/60 transition-colors duration-250 ease-out motion-reduce:transition-none w-full justify-center">
                          <a
                            href={member.email ? `mailto:${member.email}` : "#"}
                            className="w-10 h-10 rounded bg-obsidian border border-chrome-dark/50 flex items-center justify-center text-steel hover:text-ink focus-visible:text-ink focus-visible:border-crimson focus-visible:bg-crimson/10 hover:border-crimson hover:bg-crimson/10 transition-colors relative z-30 outline-none"
                            tabIndex={-1} // Handled by card focus
                          >
                            <FiMail size={18} />
                          </a>
                          
                          <a
                            href={member.linkedinUrl && member.linkedinUrl !== "#" ? member.linkedinUrl : "#"}
                            target={member.linkedinUrl && member.linkedinUrl !== "#" ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded bg-obsidian border border-chrome-dark/50 flex items-center justify-center text-steel transition-colors relative z-30 outline-none ${(!member.linkedinUrl || member.linkedinUrl === "#") ? "opacity-30 pointer-events-none" : "hover:text-ink focus-visible:text-ink focus-visible:border-crimson focus-visible:bg-crimson/10 hover:border-crimson hover:bg-crimson/10"}`}
                            tabIndex={-1}
                          >
                            <FiLinkedin size={18} />
                          </a>
                          
                          <a
                            href={member.githubUrl && member.githubUrl !== "#" ? member.githubUrl : "#"}
                            target={member.githubUrl && member.githubUrl !== "#" ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded bg-obsidian border border-chrome-dark/50 flex items-center justify-center text-steel transition-colors relative z-30 outline-none ${(!member.githubUrl || member.githubUrl === "#") ? "opacity-30 pointer-events-none" : "hover:text-ink focus-visible:text-ink focus-visible:border-crimson focus-visible:bg-crimson/10 hover:border-crimson hover:bg-crimson/10"}`}
                            tabIndex={-1}
                          >
                            <FiGithub size={18} />
                          </a>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
