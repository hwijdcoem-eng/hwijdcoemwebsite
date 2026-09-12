export type CommunityProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
};

export const communityProjects: CommunityProject[] = [
  {
    id: "1",
    title: "HWI Platform Core",
    description: "The open-source core engine that powers HWI JDCOEM.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    repoUrl: "#",
  },
  {
    id: "2",
    title: "Hackathon Starter",
    description: "A robust starter kit for your next 24-hour build.",
    tags: ["React", "Firebase", "Stripe"],
    repoUrl: "#",
    demoUrl: "#",
  },
  {
    id: "3",
    title: "Open Design System",
    description: "Figma files and React components for the community.",
    tags: ["Figma", "Framer Motion", "Design"],
    repoUrl: "#",
  }
];
