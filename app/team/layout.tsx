import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Committee & Team",
  description:
    "Meet the student leaders, engineers, designers, and organizers driving the Hack With India (HWI) chapter at JDCOEM, Nagpur.",
  openGraph: {
    title: "Core Committee & Team | HWI JDCOEM",
    description:
      "Meet the student leaders, engineers, designers, and organizers driving the Hack With India (HWI) chapter at JDCOEM, Nagpur.",
    images: ["/about-banner.jpg"],
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
