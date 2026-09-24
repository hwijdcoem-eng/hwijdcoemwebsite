import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Developer Community",
  description:
    "Join the official HWI JDCOEM student developer network. Connect with student builders, participate in hackathons, and access industry mentorship.",
  openGraph: {
    title: "Student Developer Community | HWI JDCOEM",
    description:
      "Join the official HWI JDCOEM student developer network in Nagpur.",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
