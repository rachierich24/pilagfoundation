"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import './impact.css';

const VIDEO_URL = "/impact_main.mp4";

export default function ImpactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Premium Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    if (!video) return;

    // ── THE CORRECT WAY TO SCRUB VIDEO WITH SCROLL ──
    // Do NOT use tl.to(video, { currentTime }) — it's unreliable.
    // Instead, use ScrollTrigger's onUpdate to directly write currentTime
    // based on scroll progress. This is frame-perfect every single time.

    const scrubTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=1000%",
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        if (video.duration && !isNaN(video.duration)) {
          video.currentTime = self.progress * video.duration;
        }
      },
    });

    // Separate timeline for text animations — tied to SAME scroll range
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000%",
        scrub: 1.2,
      }
    });

    // Progress 0→1 maps to 0→20 duration units
    // Text fades in at ~40% scroll, fades out at ~70% scroll
    tl.set({}, {}, 0); // anchor start
    tl.fromTo(".overlay-text",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" },
      8
    );
    tl.to(".overlay-text",
      { autoAlpha: 0, y: -30, duration: 2, ease: "power2.in" },
      14
    );
    tl.set({}, {}, 20); // anchor end — ensures full scroll range is honoured

    return () => {
      scrubTrigger.kill();
    };

  }, { scope: containerRef });

  return (
    <main className="impact-master-wrapper" style={{ background: "#000" }}>
      <div ref={containerRef} className="scroll-wrapper" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

        <video
          ref={videoRef}
          src={VIDEO_URL}
          className="impact-video"
          muted
          playsInline
          preload="auto"
        />

        {/* Ambient Overlay */}
        <div className="dark-tint"></div>

        <div className="abs-center overlay-text" style={{ opacity: 0 }}>
          <h1 style={{ fontFamily: "var(--font-heading), serif", fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.1 }}>
            Impact In Motion
          </h1>
          <p style={{ fontFamily: "var(--font-body), sans-serif", letterSpacing: "0.4em", textTransform: "uppercase", color: "#4ade80", fontSize: "1rem", marginTop: "1rem", fontWeight: 600 }}>
            Scroll to Navigate Time
          </p>
        </div>

      </div>
    </main>
  );
}
