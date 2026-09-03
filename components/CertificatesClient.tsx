"use client";

import { useState } from "react";

type EventOption = {
  id: string;
  name: string;
};

export default function CertificatesClient({ events }: { events: EventOption[] }) {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [usn, setUsn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessData(null);
    
    if (!selectedEvent || !usn.trim()) {
      setError("Please select an event and enter your USN.");
      return;
    }

    setLoading(true);
    // Yield to let UI update
    await new Promise(r => setTimeout(r, 0));

    try {
      const res = await fetch(`/certificates/${selectedEvent}/data.json`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const eventData = await res.json();
      const targetUSN = usn.trim().toUpperCase();
      const participant = eventData.participants?.find((p: any) => p.usn.toUpperCase() === targetUSN);
      
      if (!participant) {
        setError("No certificate found for this USN.");
        setLoading(false);
        return;
      }

      const certType = participant.certificate || "participation";
      
      // Load configuration
      let config: any = {};
      try {
        let confRes = await fetch(`/certificates/${selectedEvent}/${certType}-render-config.json`);
        if (!confRes.ok) {
          confRes = await fetch(`/certificates/${selectedEvent}/render-config.json`);
        }
        if (confRes.ok) {
          config = await confRes.json();
        }
      } catch (err) {
        console.warn("Could not load configuration, using defaults.");
      }

      // Default config
      config = {
        fontFamily: "Cinzel",
        fontSize: 72,
        fontWeight: "bold",
        textColor: "#3B1B94",
        textAlign: "center",
        textBaseline: "middle",
        ...config
      };

      // Load custom font if needed
      const fontName = config.fontFamily;
      if (!document.fonts.check(`12px "${fontName}"`)) {
        try {
          const font = new FontFace(fontName, `url(/certificates/${selectedEvent}/${fontName}.ttf)`);
          const loaded = await font.load();
          document.fonts.add(loaded);
          await document.fonts.ready;
        } catch (fontErr) {
          try {
            const fontOtf = new FontFace(fontName, `url(/certificates/${selectedEvent}/${fontName}.otf)`);
            const loaded = await fontOtf.load();
            document.fonts.add(loaded);
            await document.fonts.ready;
          } catch(err2) {
             console.warn("Font loading failed, falling back to system font.", fontErr);
          }
        }
      }

      // Load image
      const candidateUrls = [
        `/certificates/${selectedEvent}/${certType}.png`,
        `/certificates/${selectedEvent}/${certType}-certificate.png`,
        `/certificates/${selectedEvent}/participation.png`,
        `/certificates/${selectedEvent}/certificate.png`
      ];

      let img = new Image();
      let imgLoaded = false;
      
      for (const url of candidateUrls) {
        try {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
          });
          imgLoaded = true;
          break;
        } catch (e) {
          // try next
        }
      }

      if (!imgLoaded) {
        setError("Certificate template missing.");
        setLoading(false);
        return;
      }

      // Canvas Rendering
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        setError("Failed to initialize drawing canvas.");
        setLoading(false);
        return;
      }

      ctx.drawImage(img, 0, 0);
      
      // Convert name to Title Case for a more professional look
      const titleCaseName = participant.name
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      let fontSize = config.fontSize;
      const maxWidth = config.maxWidth !== undefined ? config.maxWidth : canvas.width * 0.7;
      ctx.font = `${config.fontWeight} ${fontSize}px "${fontName}", serif`;

      while (ctx.measureText(titleCaseName).width > maxWidth && fontSize > 24) {
        fontSize -= 2;
        ctx.font = `${config.fontWeight} ${fontSize}px "${fontName}", serif`;
      }

      ctx.fillStyle = config.textColor;
      ctx.textAlign = config.textAlign;
      ctx.textBaseline = config.textBaseline;

      const textX = config.textX !== undefined ? config.textX : canvas.width / 2;
      const textY = config.textY !== undefined ? config.textY : canvas.height * 0.52;

      ctx.fillText(titleCaseName, textX, textY);

      setSuccessData({
        studentName: participant.name,
        eventName: eventData.eventName,
        certificateType: certType,
        dataUrl: canvas.toDataURL("image/png"),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      });

    } catch (err) {
      console.error(err);
      setError("Certificate data unavailable. Details: HTTP 404");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPNG = () => {
    if (!successData) return;
    const link = document.createElement("a");
    const safeName = successData.studentName.replace(/\s+/g, "_");
    const safeEvent = successData.eventName.replace(/\s+/g, "_");
    link.download = `${safeName}_${safeEvent}_Certificate.png`;
    link.href = successData.dataUrl;
    link.click();
  };

  const handleDownloadPDF = async () => {
    if (!successData) return;
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const width = successData.naturalWidth;
      const height = successData.naturalHeight;
      
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height],
      });

      pdf.addImage(successData.dataUrl, "PNG", 0, 0, width, height);
      
      const safeName = successData.studentName.replace(/\s+/g, "_");
      const safeEvent = successData.eventName.replace(/\s+/g, "_");
      pdf.save(`${safeName}_${safeEvent}_Certificate.pdf`);
    } catch (err) {
      console.error(err);
      setError("Failed to export certificate PDF document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="form-header">
          <h2>GENERATE YOUR OFFICIAL CERTIFICATE</h2>
        </div>
        
        <form onSubmit={handleGenerate}>
          <div className="input-group">
            <label className="input-label">SELECT EVENT</label>
            <select 
              className="select-field" 
              value={selectedEvent} 
              onChange={e => setSelectedEvent(e.target.value)}
            >
              <option value="">Choose an Event (e.g. Nexus Tech Symposium 2024)</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label className="input-label">EMAIL / USN</label>
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <input 
                type="text" 
                className="input-field" 
                style={{ paddingLeft: "3rem" }}
                placeholder="student@example.com / CM1000"
                value={usn}
                onChange={e => setUsn(e.target.value)}
              />
            </div>
          </div>
          
          {error && <div className="status-message error">{error}</div>}
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "GENERATING..." : "GENERATE CERTIFICATE"}
          </button>
        </form>
      </div>

      <div className="certificate-preview-area">
        {successData ? (
          <div>
            <div className="canvas-wrapper">
              <img 
                src={successData.dataUrl} 
                alt="Certificate Preview" 
                style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", display: "block" }}
              />
            </div>
            <div className="download-actions">
              <button type="button" className="btn-secondary" onClick={handleDownloadPNG}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PNG
              </button>
              <button type="button" className="btn-secondary" onClick={handleDownloadPDF}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Download PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="canvas-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', background: 'rgba(0,0,0,0.4)', border: '1px dashed var(--border-card)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Your certificate will appear here</p>
          </div>
        )}
      </div>
    </>
  );
}
