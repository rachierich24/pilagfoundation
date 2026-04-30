"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const PARTICLES = [
  { label: "Community", x: -900, y: -600 },
  { label: "Litigation",  x:  1100, y: -300 },
  { label: "Grassroots",  x: -1200, y:  700 },
  { label: "Mapping",     x:  800, y:  900 },
  { label: "Awareness",   x: -400,  y: -1200 },
  { label: "Policy",      x:  1000, y:  500 },
];

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>(".particle").forEach((p, i) => {
      gsap.set(p, { x: PARTICLES[i].x, y: PARTICLES[i].y, scale: 0, opacity: 0 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        // Optional: you can add scrub: true or toggleActions if you want it bound again later
        toggleActions: "play none none reverse"
      }
    });

    tl
      // 1. Radiant Particles appear scattered
      .to(".particle", { opacity: 1, scale: 1, stagger: 0.2, duration: 2, ease: "back.out(1.7)" })
      
      // 2. Particles converge into the center
      .to(".particle", { x: 0, y: 0, scale: 0.6, ease: "power3.inOut", textShadow: "0 0 20px rgba(74,222,128,1)", duration: 3 }, "+=1.5")
      
      // 3. Impact explosion sequence
      .to(".particle", { opacity: 0, scale: 0, duration: 1 })
      .fromTo(".collective", { scale: 0.8, opacity: 0 }, { opacity: 1, scale: 1, duration: 1.5 }, "-=0.5")
      .to(".collective", { opacity: 0, y: -50, duration: 1.5 }, "+=2");

    // Chaotic Leaf Float loop
    gsap.utils.toArray<HTMLElement>(".particle-inner").forEach((el) => {
      gsap.to(el, { 
        y: "random(-40, 40)", 
        x: "random(-30, 30)", 
        rotation: "random(-180, 180)", 
        duration: "random(4, 8)", 
        yoyo: true, 
        repeat: -1, 
        ease: "sine.inOut" 
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "transparent" }}>
      
      <div style={{ position: "absolute", width: 0, height: 0, zIndex: 10 }}>
        {PARTICLES.map((p, i) => (
          <div key={i} className="particle" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 0, height: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="particle-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "24px", height: "24px", fill: "#4ade80", filter: "drop-shadow(0 0 10px rgba(74,222,128,0.5))" }}>
                <path d="M17.02 3.53C16.89 3.51 16.74 3.5 16.5 3.5c-4.48 0-8.62 3.23-9.74 7.61L6 11.3v-1.1c0-.55-.45-1-1-1s-1 .45-1 1v4.8c0 .55.45 1 1 1h4.8c.55 0 1-.45 1-1s-.45-1-1-1H8.68c.95-3.35 4.34-5.6 7.82-5.6.86 0 1.63.15 2.19.34-.14 3.73-2.03 7.15-5.3 9.4-1.28.88-2.8 1.4-4.39 1.49v.03c0 .55.45 1 1 1 2.37.03 4.54-.78 6.27-1.97 3.99-2.75 6.42-7.23 6.64-11.83 0-1.78-1.52-2.92-3.89-3.33z"/>
              </svg>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", letterSpacing: "0.22em", fontWeight: 600, color: "#FFF", textTransform: "uppercase", whiteSpace: "nowrap", marginTop: "14px", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>{p.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="collective" style={{
        fontFamily:"'Inter',sans-serif", fontSize:"18px", letterSpacing:".58em", fontWeight: 900,
        textTransform:"uppercase", color:"#FFF", textShadow: "0 0 20px rgba(74,222,128,0.8)", zIndex: 15, opacity: 0
      }}>
        Collective Action
      </div>
    </div>
  );
}
