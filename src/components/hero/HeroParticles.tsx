"use client";

import { useEffect, useRef } from "react";

interface HeroParticlesProps {
  labels?: string[];
}

export default function HeroParticles({ labels = ["Community", "Litigation", "Grassroots", "Mapping", "Awareness", "Policy"] }: HeroParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const particleEls = Array.from(container.querySelectorAll<HTMLElement>("[data-particle-idx]"));

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;

      particleEls.forEach((el, idx) => {
        const speed = 0.4 + (idx % 3) * 0.15;
        const radiusX = 18 + (idx * 7) % 25;
        const radiusY = 12 + (idx * 5) % 20;
        const offsetX = Math.sin(elapsed * speed + idx) * radiusX;
        const offsetY = Math.cos(elapsed * speed * 0.8 + idx) * radiusY;

        el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const defaultPositions = [
    { top: "18%", left: "12%" },
    { top: "22%", right: "14%" },
    { top: "70%", left: "8%" },
    { top: "68%", right: "10%" },
    { top: "38%", left: "20%" },
    { top: "42%", right: "22%" },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        overflow: "hidden",
      }}
    >
      {labels.map((label, i) => {
        const pos = defaultPositions[i % defaultPositions.length];
        return (
          <div
            key={i}
            data-particle-idx={i}
            style={{
              position: "absolute",
              ...pos,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "100px",
              background: "rgba(18, 26, 22, 0.45)",
              border: "1px solid rgba(74, 222, 128, 0.25)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#FFF",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 0 12px rgba(74,222,128,0.08)",
              willChange: "transform",
              opacity: 0.85,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px #4ade80",
              }}
            />
            {label}
          </div>
        );
      })}
    </div>
  );
}
