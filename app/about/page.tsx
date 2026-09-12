"use client";

import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { motion } from "framer-motion";
import { FiTarget, FiZap, FiUsers } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <SectionHeading as="h1" className="mb-4">
          Our Story
        </SectionHeading>
        <p className="text-ink-dim max-w-2xl mx-auto">
          We are the Hackers and Founders Workspace. Born from the idea that 
          the best products are built when great engineers and visionary founders 
          share the same room.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-video bg-line rounded-lg overflow-hidden relative flex items-center justify-center">
            {/* Placeholder for actual photo */}
            <div className="text-ink-dim opacity-50 font-display text-sm tracking-widest uppercase">
              Workspace Photo
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent opacity-50" />
          </div>
        </motion.div>
        
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading as="h2" className="mb-6">The Genesis</SectionHeading>
          <p className="text-ink-dim mb-4 leading-relaxed">
            HWI JDCOEM started as a small group of computer engineering students who 
            wanted more than just standard curriculum. We wanted to build real things, 
            break things, and ship software that matters.
          </p>
          <p className="text-ink-dim leading-relaxed">
            Today, we are a thriving hub of technical talent, providing the infrastructure, 
            the network, and the culture required to turn late-night hacks into 
            venture-backed companies.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-signal border border-signal flex items-center justify-center mb-6 text-void">
            <FiTarget size={28} />
          </div>
          <h3 className="font-display font-bold text-xl text-ink mb-3">Our Mission</h3>
          <p className="text-ink-dim">
            To accelerate the technical and entrepreneurial growth of our members through 
            collaboration and extreme building.
          </p>
        </Card>

        <Card className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-signal-warm border border-signal-warm flex items-center justify-center mb-6 text-void">
            <FiZap size={28} />
          </div>
          <h3 className="font-display font-bold text-xl text-ink mb-3">Our Vision</h3>
          <p className="text-ink-dim">
            To become the premier launchpad for student-led startups and open-source 
            projects in the region.
          </p>
        </Card>

        <Card className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-line flex items-center justify-center mb-6 text-ink">
            <FiUsers size={28} />
          </div>
          <h3 className="font-display font-bold text-xl text-ink mb-3">Our Culture</h3>
          <p className="text-ink-dim">
            We value shipping over planning, code over talk, and community over individual 
            accolades.
          </p>
        </Card>
      </div>
    </div>
  );
}
