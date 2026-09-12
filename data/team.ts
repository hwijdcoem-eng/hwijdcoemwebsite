export type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: "Leadership" | "Engineering" | "Design" | "Community";
  bio: string;
  avatarUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
};

export const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Alex Doe",
    role: "Founder & Lead",
    category: "Leadership",
    bio: "Building the future of hacker workspaces.",
    githubUrl: "#",
    twitterUrl: "#",
  },
  {
    id: "2",
    name: "Sam Smith",
    role: "Core Engineer",
    category: "Engineering",
    bio: "Scaling systems and building architecture.",
    githubUrl: "#",
  },
  {
    id: "3",
    name: "Taylor Swift",
    role: "Lead Designer",
    category: "Design",
    bio: "Crafting beautiful, non-generic user experiences.",
    twitterUrl: "#",
  },
  {
    id: "4",
    name: "Jordan Lee",
    role: "Community Manager",
    category: "Community",
    bio: "Connecting hackers with founders.",
    githubUrl: "#",
    twitterUrl: "#",
  }
];
