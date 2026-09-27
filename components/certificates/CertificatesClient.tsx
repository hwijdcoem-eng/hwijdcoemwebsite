"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

type EventItem = { id: string; name: string };
type Participant = { name: string; usn: string; certificate: string };

export default function CertificatesClient({ initialEvents }: { initialEvents: EventItem[] }) {
  const [selectedEvent, setSelectedEvent] = useState(initialEvents[0]?.id || "");
  const [usn, setUsn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successDataUrl, setSuccessDataUrl] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessDataUrl(null);

    if (!selectedEvent || !usn.trim()) {
      setError("Please select an event and enter your USN.");
      return;
    }

    setLoading(true);

    try {
      // 1. Fetch data.json
      const res = await fetch(`/certificates/${selectedEvent}/data.json`);
      if (!res.ok) throw new Error("Certificate data unavailable.");
      const data = await res.json();

      // 2. Lookup USN
      const targetUSN = usn.trim().toUpperCase();
      const participant = data.participants.find((p: Participant) => p.usn.toUpperCase() === targetUSN);

      if (!participant) {
        throw new Error("No certificate found for this USN.");
      }
      setParticipantName(participant.name);

      const certType = participant.certificate || "participation";

      // 3. Load Config
      let config = {
        fontFamily: "Cinzel, serif",
        fontSize: 72,
        fontWeight: "bold",
        textColor: "#3B1B94",
        textAlign: "center" as CanvasTextAlign,
        textBaseline: "middle" as CanvasTextBaseline,
        textX: null,
        textY: null,
        maxWidth: null,
      };

      try {
        const typeConfigRes = await fetch(`/certificates/${selectedEvent}/${certType}-render-config.json`);
        if (typeConfigRes.ok) {
          config = { ...config, ...(await typeConfigRes.json()) };
        } else {
          const defaultConfigRes = await fetch(`/certificates/${selectedEvent}/render-config.json`);
          if (defaultConfigRes.ok) {
            config = { ...config, ...(await defaultConfigRes.json()) };
          }
        }
      } catch (e) {
        console.warn("Using default config, failed to load render-config.json");
      }

      // 4. Load Image
      const imgUrls = [
        `/certificates/${selectedEvent}/${certType}.png`,
        `/certificates/${selectedEvent}/${certType}-certificate.png`,
        `/certificates/${selectedEvent}/certificate.png`,
      ];

      const loadImg = (url: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });

      let img: HTMLImageElement | null = null;
      for (const url of imgUrls) {
        try {
          img = await loadImg(url);
          break; // Found it
        } catch (err) {
          continue; // Try next
        }
      }

      if (!img) {
        throw new Error("Certificate template missing.");
      }

      // 5. Setup Canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to initialize drawing canvas.");

      ctx.drawImage(img, 0, 0);

      const textX = config.textX || canvas.width / 2;
      const textY = config.textY || canvas.height * 0.52;
      const maxTextWidth = config.maxWidth || canvas.width * 0.7;

      let finalFontSize = config.fontSize;
      ctx.font = `${config.fontWeight} ${finalFontSize}px ${config.fontFamily}`;
      let textWidth = ctx.measureText(participant.name).width;

      while (textWidth > maxTextWidth && finalFontSize > 24) {
        finalFontSize -= 2;
        ctx.font = `${config.fontWeight} ${finalFontSize}px ${config.fontFamily}`;
        textWidth = ctx.measureText(participant.name).width;
      }

      ctx.textAlign = config.textAlign;
      ctx.textBaseline = config.textBaseline;
      ctx.fillStyle = config.textColor;

      ctx.fillText(participant.name, textX, textY);

      // Save Data URL
      const dataUrl = canvas.toDataURL("image/png");
      setSuccessDataUrl(dataUrl);

      // Store offscreen canvas to ref for PDF export
      if (canvasRef.current) {
        canvasRef.current.width = canvas.width;
        canvasRef.current.height = canvas.height;
        const outCtx = canvasRef.current.getContext("2d");
        outCtx?.drawImage(canvas, 0, 0);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPNG = () => {
    if (!successDataUrl) return;
    const link = document.createElement("a");
    link.download = `${participantName}_${selectedEvent}_Certificate.png`;
    link.href = successDataUrl;
    link.click();
  };

  const handleDownloadPDF = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${participantName}_${selectedEvent}_Certificate.pdf`);
  };

  return (
    <Card className="w-full relative z-10" padding="lg" withGlow={true}>
      <form onSubmit={handleGenerate} className="flex flex-col gap-8">
        <div className="relative group/select">
          <label className="block text-steel font-ui uppercase tracking-wider mb-2 text-sm group-focus-within/select:text-crimson transition-colors">
            Select Event
          </label>
          <div className="relative">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full bg-void/50 border border-chrome-dark/30 p-4 pr-12 text-ink focus:border-crimson focus:shadow-[0_0_15px_rgba(255,16,83,0.2)] focus:outline-none transition-all appearance-none font-ui cursor-pointer"
            >
              <option value="" disabled className="bg-obsidian text-steel">-- Select an Event --</option>
              {initialEvents.map((evt) => (
                <option key={evt.id} value={evt.id} className="bg-obsidian text-ink">
                  {evt.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-steel group-focus-within/select:text-crimson transition-colors">
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="relative group/input">
          <label className="block text-steel font-ui uppercase tracking-wider mb-2 text-sm group-focus-within/input:text-crimson transition-colors">
            Enter USN / ID
          </label>
          <input
            type="text"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            placeholder="e.g. CM24001"
            className="w-full bg-void/50 border border-chrome-dark/30 p-4 text-ink focus:border-crimson focus:shadow-[0_0_15px_rgba(255,16,83,0.2)] focus:outline-none transition-all font-ui uppercase placeholder:normal-case placeholder:text-steel/30 tracking-widest"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full py-4 text-lg tracking-widest group/btn relative overflow-hidden">
          <span className="relative z-10 flex items-center justify-center gap-3">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Decrypting Records...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Generate Certificate
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out" />
        </Button>

        {error && (
          <div className="text-crimson font-ui bg-crimson/10 p-3 text-center uppercase tracking-wider border border-crimson/20">
            {error}
          </div>
        )}
      </form>

      {successDataUrl && (
        <div className="mt-16 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
          
          {/* Certificate Display Frame */}
          <div 
            className="w-full relative p-[2px] bg-gradient-to-br from-chrome-light/40 to-chrome-dark/40 shadow-[0_0_30px_rgba(255,16,83,0.15)] transition-all"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
          >
            <div 
              className="bg-void w-full h-full relative p-2"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 19px 100%, 0 calc(100% - 19px))" }}
            >
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] z-10 opacity-50 mix-blend-overlay" />
              <img src={successDataUrl} alt="Certificate Preview" className="w-full h-auto relative z-0" />
            </div>
          </div>
          <div className="flex gap-4 mt-6 w-full">
            <Button onClick={handleDownloadPNG} className="flex-1" variant="secondary">
              Download PNG
            </Button>
            <Button onClick={handleDownloadPDF} className="flex-1" variant="outline">
              Download PDF
            </Button>
          </div>
        </div>
      )}

      {/* Hidden canvas used for PDF rendering scale */}
      <canvas ref={canvasRef} className="hidden" />
    </Card>
  );
}
