"use client";

import { useState } from "react";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send transmission.");
      }

      setStatus("success");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading as="h1" className="mb-4">
            Secure Comms
          </SectionHeading>
          <p className="font-ui text-steel max-w-2xl mx-auto text-lg">
            Establish a direct link with the HWI JDCOEM command team.
          </p>
        </div>

        <Card className="p-8 relative" withGlow={true}>
          {status === "success" ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="w-16 h-16 rounded-full bg-signal/20 border-2 border-signal flex items-center justify-center mx-auto mb-6 text-signal text-2xl font-bold">
                ✓
              </div>
              <h2 className="font-display text-2xl text-ink uppercase mb-2">Transmission Sent</h2>
              <p className="font-ui text-steel mb-8">
                Your message has been securely transmitted. The team will review and respond shortly.
              </p>
              <Button onClick={() => setStatus("idle")} variant="outline">
                SEND ANOTHER MESSAGE
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-steel font-ui uppercase tracking-wider mb-2">
                  Sender Identity (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@example.com"
                  required
                  className="w-full bg-obsidian border border-chrome-dark/30 rounded-none p-3 text-ink focus:border-crimson focus:outline-none transition-colors font-ui"
                />
              </div>

              <div>
                <label className="block text-steel font-ui uppercase tracking-wider mb-2">
                  Transmission Body
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your encrypted message here..."
                  required
                  rows={5}
                  className="w-full bg-obsidian border border-chrome-dark/30 rounded-none p-3 text-ink focus:border-crimson focus:outline-none transition-colors font-ui resize-none"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Transmitting..." : "Send Transmission"}
              </Button>

              {status === "error" && (
                <div className="mt-4 font-glitch text-crimson text-center p-3 border border-crimson/30 bg-crimson/10 animate-pulse">
                  ERR: {errorMessage}
                </div>
              )}
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
