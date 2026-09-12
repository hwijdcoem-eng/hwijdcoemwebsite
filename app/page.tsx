"use client";

import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { AnimatedIcon } from "../components/icons/AnimatedIcon";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiTerminal, FiCpu, FiGlobe } from "react-icons/fi";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
          <img src="/logo.jpg" alt="" className="absolute w-[500px] h-[500px] object-contain opacity-20 mix-blend-screen" />
          <div className="absolute w-[800px] h-[800px] rounded-full border border-line animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-signal/20" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6">HWI JDCOEM Platform</Badge>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-ink tracking-tighter leading-tight mb-6">
              BUILD. <span className="text-signal">CONNECT.</span> CREATE.
            </h1>
            <p className="text-xl text-ink-dim max-w-2xl mx-auto mb-10">
              The hacker and founder workspace designed for those who ship. 
              Join a community of builders pushing the boundaries of what's possible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                Join the Workspace <FiArrowRight />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-panel/50 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading as="h2">Engineered for Builders</SectionHeading>
            <p className="text-ink-dim mt-4 max-w-2xl mx-auto">
              Everything you need to go from idea to deployment in record time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FiTerminal size={24} className="text-signal" />}
              title="Open Source Core"
              description="Contribute to our shared codebase and leverage high-end tooling from day one."
            />
            <FeatureCard 
              icon={<FiCpu size={24} className="text-signal-warm" />}
              title="Hardware Labs"
              description="Access specialized equipment and IoT testbeds for physical computing projects."
            />
            <FeatureCard 
              icon={<FiGlobe size={24} className="text-signal" />}
              title="Global Network"
              description="Connect with alumni founders and engineers across top tech ecosystems."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedIcon className="mx-auto mb-8 scale-150" />
          <SectionHeading as="h2" className="mb-6">Ready to Ship?</SectionHeading>
          <p className="text-lg text-ink-dim mb-10">
            Stop planning. Start building. The next great product starts here.
          </p>
          <Link href="/about">
            <Button size="lg" variant="secondary">Learn More About Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="hover:border-signal transition-colors duration-300">
      <div className="w-12 h-12 rounded-lg bg-void border border-line flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-display font-bold text-xl text-ink mb-3">{title}</h3>
      <p className="text-ink-dim">{description}</p>
    </Card>
  );
}
