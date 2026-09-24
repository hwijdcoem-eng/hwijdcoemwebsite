import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Secure Comms",
  description:
    "Connect with the Hack With India (HWI) JDCOEM leadership team for sponsorships, event partnerships, student queries, or tech collaborations.",
  openGraph: {
    title: "Contact & Secure Comms | HWI JDCOEM",
    description:
      "Connect with the Hack With India (HWI) JDCOEM leadership team for sponsorships, event partnerships, student queries, or tech collaborations.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
