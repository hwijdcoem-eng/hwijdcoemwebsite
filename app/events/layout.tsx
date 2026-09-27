import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathons & Events",
  description:
    "Explore upcoming hackathons, ideathons, and technical workshops organized by Hack With India (HWI) JDCOEM.",
  openGraph: {
    title: "Hackathons & Events | HWI JDCOEM",
    description:
      "Explore upcoming hackathons, ideathons, and technical workshops organized by Hack With India (HWI) JDCOEM.",
    images: ["/events-hackathon-wide.jpg"],
  },
};

const eventsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "name": "Hack JDCOEM — Inaugural Hackathon",
      "description":
        "Inaugural collegiate hackathon organized by HWI JDCOEM. Build real projects, compete in teams, and connect with mentors.",
      "startDate": "2026-10-15T09:00:00+05:30",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "JD College of Engineering & Management",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nagpur",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "HWI JDCOEM",
        "url": "https://hwijdcoem.com"
      }
    },
    {
      "@type": "Event",
      "name": "Ideathon 2026 — Pitch Your Vision",
      "description":
        "Pitch real-world problem statements and startup solutions to a panel of mentors and industry peers.",
      "startDate": "2026-11-20T10:00:00+05:30",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "JD College of Engineering & Management",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nagpur",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "HWI JDCOEM",
        "url": "https://hwijdcoem.com"
      }
    }
  ]
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      {children}
    </>
  );
}
