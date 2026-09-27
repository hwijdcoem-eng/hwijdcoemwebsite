import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Chapter Mission",
  description:
    "Learn about the Hack With India (HWI) JDCOEM student chapter, our mission, technical wings, leadership, and industry ecosystem in Nagpur.",
  openGraph: {
    title: "About Us & Chapter Mission | HWI JDCOEM",
    description:
      "Learn about the Hack With India (HWI) JDCOEM student chapter, our mission, technical wings, leadership, and industry ecosystem in Nagpur.",
    images: ["/about-banner.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
