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
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading as="h1" className="mb-4">
            Secure Comms
          </SectionHeading>
          <p className="font-ui text-steel max-w-2xl mx-auto text-lg">
            Establish a direct link with the HWI JDCOEM command team.
          </p>
        </div>

        <Card padding="lg" className="relative" withGlow={true}>
          {status === "success" ? (
            <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="w-20 h-20 rounded-full bg-signal/10 border border-signal/50 flex items-center justify-center mx-auto mb-8 text-signal shadow-[0_0_30px_rgba(0,255,128,0.2)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-display text-3xl text-ink uppercase mb-3 tracking-widest">Transmission Secured</h2>
              <p className="font-ui text-steel mb-10 text-lg max-w-md mx-auto">
                Your encrypted message has been received by the HWI command center. We will respond shortly.
              </p>
              <Button onClick={() => setStatus("idle")} variant="outline" className="tracking-widest">
                SEND ANOTHER MESSAGE
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="relative group/input">
                <label className="block text-steel font-ui uppercase tracking-wider mb-2 text-sm group-focus-within/input:text-crimson transition-colors">
                  Sender Identity (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@example.com"
                  required
                  className="w-full bg-void/50 border border-chrome-dark/30 p-4 text-ink focus:border-crimson focus:shadow-[0_0_15px_rgba(255,16,83,0.2)] focus:outline-none transition-all font-ui placeholder:text-steel/30"
                />
              </div>

              <div className="relative group/textarea">
                <label className="block text-steel font-ui uppercase tracking-wider mb-2 text-sm group-focus-within/textarea:text-crimson transition-colors">
                  Transmission Body
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your encrypted message here..."
                  required
                  rows={6}
                  className="w-full bg-void/50 border border-chrome-dark/30 p-4 text-ink focus:border-crimson focus:shadow-[0_0_15px_rgba(255,16,83,0.2)] focus:outline-none transition-all font-ui resize-none placeholder:text-steel/30 leading-relaxed"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full py-4 text-lg tracking-widest group/btn relative overflow-hidden mt-2">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Encrypting & Transmitting...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <path d="M22 2 11 13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Send Transmission
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out" />
              </Button>

              {status === "error" && (
                <div className="mt-2 font-glitch text-crimson text-center p-4 border border-crimson/30 bg-crimson/10 animate-pulse tracking-widest">
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
