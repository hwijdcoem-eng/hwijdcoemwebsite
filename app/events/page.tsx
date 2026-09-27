const events = [
  {
    id: 1,
    title: "Global Hackathon 2026",
    date: "October 15, 2026",
    time: "48 Hours",
    location: "HWI Main Campus & Virtual",
    type: "Hackathon",
    description: "Our flagship annual hackathon. Build the next big thing in 48 hours with hundreds of other engineers and designers.",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Founder's Fireside Chat",
    date: "November 2, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "Innovation Lab",
    type: "Networking",
    description: "An intimate Q&A session with alumni founders who have successfully raised Series A rounds.",
    status: "Registration Open",
  },
  {
    id: 3,
    title: "Intro to Physical Computing",
    date: "November 10, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Hardware Shop",
    type: "Workshop",
    description: "Hands-on workshop covering the basics of Arduino, sensor integration, and rapid prototyping.",
    status: "Waitlist",
  },
  // ⬇️ SEPARATED INTO ITS OWN OBJECT
  {
    id: "hackathon",
    type: "Workshop & Hunt",
    title: "Git, GitHub Workshop & Operation Hunt",
    subtitle: "Inaugural Hackathon", 
    description: "Our very first hackathon — build real projects, compete in teams, and connect with mentors backed by the HWI industry ecosystem.",
    date: "01 Oct 2026", 
    time: "1:00 - 5:30 PM", 
    venue: "JDCOEM, Nagpur",
    status: "Active", 
    bannerSrc: "WhatsApp Image 2026-09-27 at 6.21.36 PM.jpeg", 
    accentColor: "text-crimson",
    glowColor: "rgba(220,38,38,0.15)",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfpKsk1UlRekAWU_Bp-1WkQX5WjZQ-1U3QSgxQit7LUkz2JcA/viewform",
    buttonText: "Register Now",
    countdownTarget: "2026-10-01T13:00:00+05:30", 
    overview: [
      "Open to all JDCOEM students across all departments and years.",
      "Basics of Git & GitHub, version control, and practical usage.", 
      "Strictly solo participation.", 
      "Participants access HWI's industry mentor network.",
      "Winners get trophies. Participants receive 2 certificates recognised by Hack With India." 
    ],
    requirements: [
      "Valid JDCOEM student ID required for participation.",
      "Bring your own laptop and charger.",
      "Basic programming knowledge recommended.",
      "Registration fee: ₹50." 
    ],
  }
];

export default function EventsPage() {
  return (
    <div>
      {/* ... your existing header code ... */}
      <div className="mb-12">
        <p>
          are designed to push your skills and expand your network.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {events.map((event, index) => (
          // ⬇️ EVERYTHING USING 'event.' MUST GO INSIDE THIS MAP FUNCTION
          <div key={event.id} className="bg-chrome-dark/10 rounded-lg overflow-hidden">
            
            {/* Your event card details (title, description, etc) would go here */}
            
            {/* THE BUTTON CODE MOVED INSIDE THE LOOP */}
            <div className="flex-shrink-0 border-t border-chrome-dark/40 px-7 py-5 flex items-center justify-between gap-4">
              <button
                onClick={() => console.log("Close clicked")} // Ensure onClose is defined in your actual component
                className="font-ui text-xs uppercase tracking-[0.15em] text-steel hover:text-ink transition-colors border border-chrome-dark/30 hover:border-steel/50 px-5 py-2.5"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
              >
                Close
              </button>

              {/* Added fallback to event.registrationLink since that's what you named it in the array */}
              {event.status === "Registration Open" || event.status === "Active" ? (
                <a
                  href={event.registrationLink || event.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="flex items-center gap-2 px-6">
                    Register Now <FiExternalLink size={13} />
                  </Button>
                </a>
              ) : (
                <div
                  className="font-ui text-xs uppercase tracking-[0.1em] text-steel/50 border border-chrome-dark/20 px-5 py-2.5"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)" }}
                >
                  Registration Opening Soon
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
