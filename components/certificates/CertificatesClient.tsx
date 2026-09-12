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
    <Card className="w-full relative z-10" withGlow={true}>
      <form onSubmit={handleGenerate} className="flex flex-col gap-6">
        <div>
          <label className="block text-steel font-ui uppercase tracking-wider mb-2">
            Select Event
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full bg-obsidian border border-chrome-dark/30 rounded-none p-3 text-ink focus:border-crimson focus:outline-none transition-colors appearance-none font-ui"
          >
            <option value="" disabled>-- Select an Event --</option>
            {initialEvents.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-steel font-ui uppercase tracking-wider mb-2">
            Enter USN / ID
          </label>
          <input
            type="text"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            placeholder="e.g. CM24001"
            className="w-full bg-obsidian border border-chrome-dark/30 rounded-none p-3 text-ink focus:border-crimson focus:outline-none transition-colors font-ui uppercase placeholder:normal-case placeholder:text-steel/50"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Decrypting Records..." : "Generate Certificate"}
        </Button>

        {error && (
          <div className="text-crimson font-ui bg-crimson/10 p-3 text-center uppercase tracking-wider border border-crimson/20">
            {error}
          </div>
        )}
      </form>

      {successDataUrl && (
        <div className="mt-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-full border-2 border-chrome-dark/30 p-2 bg-void shadow-2xl relative">
            <img src={successDataUrl} alt="Certificate Preview" className="w-full h-auto shadow-inner" />
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
