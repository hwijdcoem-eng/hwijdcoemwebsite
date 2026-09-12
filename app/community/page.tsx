"use client";

import { communityProjects } from "../../data/community";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { AnimatedIcon } from "../../components/icons/AnimatedIcon";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 flex flex-col items-center text-center">
        <AnimatedIcon className="mb-8" />
        <SectionHeading as="h1" className="mb-4">
          Open Source Community
        </SectionHeading>
        <p className="text-ink-dim max-w-2xl">
          HWI JDCOEM is built by hackers, for hackers. Explore our open-source projects,
          contribute to our ecosystem, and build the future with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {communityProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:border-signal transition-colors duration-300">
              <div className="flex-grow">
                <h3 className="font-display font-bold text-2xl text-ink mb-2">
                  {project.title}
                </h3>
                <p className="text-ink-dim mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4 border-t border-line">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    className="flex items-center space-x-2 text-sm font-medium text-ink hover:text-signal transition-colors"
                  >
                    <FiGithub size={16} />
                    <span>Repository</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="flex items-center space-x-2 text-sm font-medium text-ink hover:text-signal transition-colors"
                  >
                    <FiExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
