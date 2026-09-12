"use client";

import { useEffect, useRef } from "react";

export function DataStreamBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isActive = true;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        drawStaticFrame();
      } else {
        if (isActive && !document.hidden) loop();
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        if (isActive && !isReducedMotion) loop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Canvas rendering logic
    const fontSize = 14;
    const fontFamily = "var(--font-rajdhani), monospace";
    let columns: { x: number; y: number; speed: number; delay: number; active: boolean; numbers: string[] }[] = [];
    
    // Time tracking for boot sequence
    const startTime = Date.now();

    const initColumns = () => {
      // Setup high-DPI canvas
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const numCols = Math.floor(window.innerWidth / 24); // 24px horizontal spacing
      columns = [];
      for (let i = 0; i < numCols; i++) {
        // Cascade delay from left to right (0ms to 2000ms), wait 1.5s for splash screen
        const delay = 1500 + (i / numCols) * 2000;
        columns.push({
          x: i * 24 + 12, // center in column
          y: Math.random() * window.innerHeight,
          speed: 0.5 + Math.random() * 1.5, // varying scroll speeds
          delay,
          active: false,
          numbers: Array(Math.floor(window.innerHeight / fontSize) + 5).fill("0")
        });
      }
    };

    const updateNumbers = () => {
      columns.forEach(col => {
        if (!col.active) return;
        // Only update some columns per frame to reduce blurriness and create glitchy look
        if (Math.random() < 0.1) {
          col.numbers.pop();
          const chars = "0123456789";
          col.numbers.unshift(chars[Math.floor(Math.random() * chars.length)]);
        }
      });
    };

    const draw = () => {
      // Semi-transparent void color to create a trail/fade effect
      ctx.fillStyle = "rgba(10, 10, 11, 0.3)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `600 ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";

      const now = Date.now();
      const elapsed = now - startTime;

      columns.forEach((col) => {
        if (!col.active && elapsed > col.delay) {
          col.active = true;
        }
        if (!col.active) return;

        col.y -= col.speed;
        if (col.y < -fontSize) {
          col.y = fontSize; 
        }

        col.numbers.forEach((num, index) => {
          const drawY = col.y + (index * fontSize);
          if (drawY > window.innerHeight || drawY < 0) return;

          // 1 in ~50 chance of crimson highlight (fixed per slot index for consistency)
          // We use pseudo-random based on column x and index
          const isHighlight = (col.x * 13 + index * 17) % 50 === 0;

          if (isHighlight) {
            ctx.fillStyle = "rgba(255, 16, 83, 0.25)"; // crimson
          } else {
            ctx.fillStyle = "rgba(154, 154, 163, 0.08)"; // steel
          }

          ctx.fillText(num, col.x, drawY);
        });
      });
    };

    const drawStaticFrame = () => {
      ctx.fillStyle = "#0A0A0B";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `600 ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      
      columns.forEach(col => {
        col.numbers.forEach((num, index) => {
          const drawY = col.y + (index * fontSize);
          const isHighlight = (col.x * 13 + index * 17) % 50 === 0;
          ctx.fillStyle = isHighlight ? "rgba(255, 16, 83, 0.25)" : "rgba(154, 154, 163, 0.08)";
          ctx.fillText(num, col.x, drawY);
        });
      });
    };

    const resize = () => {
      initColumns();
      if (isReducedMotion) drawStaticFrame();
    };
    window.addEventListener("resize", resize);

    const loop = () => {
      if (!isActive) return;
      
      updateNumbers();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    // Init
    resize();
    if (isReducedMotion) {
      drawStaticFrame();
    } else {
      loop();
    }

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
