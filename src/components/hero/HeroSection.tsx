"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import heroData from "@/data/hero.json";
import styles from "./HeroSection.module.css";

const splitText = (text: string) => {
  return text.split("").map((char, index) => (
    <span key={index} className="char" style={{ display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const pinnedImgRef = useRef<HTMLImageElement>(null);
  const colossalBackRef = useRef<HTMLDivElement>(null);
  const colossalFrontRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const bottomGradientRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      // Ensure crisp initial centered card state
      if (imageWrapRef.current) {
        gsap.set(imageWrapRef.current, {
          xPercent: -50,
          yPercent: -50,
          top: "50%",
          left: "50%",
          width: "48vw",
          height: "52vh",
          maxWidth: "none",
          borderRadius: "20px",
          opacity: 1,
        });
      }

      if (pinnedImgRef.current) {
        gsap.set(pinnedImgRef.current, { scale: 1.25 });
      }

      if (orb1Ref.current && orb2Ref.current) {
        gsap.set([orb1Ref.current, orb2Ref.current], { opacity: 0.3, scale: 1 });
      }

      // Entrance Text stagger reveal
      if (containerRef.current) {
        const chars = containerRef.current.querySelectorAll(".char");
        if (chars.length > 0) {
          gsap.fromTo(
            chars,
            { y: "110%", rotate: 3, opacity: 0 },
            { y: "0%", rotate: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.012 }
          );
        }
      }

      // Desktop Cinematic Pinned Scroll Progression: Centered Card -> Full Screen Expansion
      mm.add("(min-width: 769px)", () => {
        const heroContainer = containerRef.current;
        const imgWrap = imageWrapRef.current;
        const maskImg = pinnedImgRef.current;

        if (heroContainer && imgWrap && maskImg) {
          const scrollTl = gsap.timeline({ paused: true });

          const colossalBack = colossalBackRef.current;
          const colossalFront = colossalFrontRef.current;

          const frontDefend = colossalFront?.querySelector(".text-colossal-front-defend");
          const frontClimate = colossalFront?.querySelector(".text-colossal-front-climate");
          const backDefend = colossalBack?.querySelector(`.${styles.textColossalSolid}`);
          const backClimate = colossalBack?.querySelector(`.${styles.textColossalOutline}`);

          // 1. Centered Card Expands to Full Screen Width, Height & Square Corners
          scrollTl.to(
            imgWrap,
            {
              width: "100vw",
              height: "100vh",
              maxWidth: "none",
              borderRadius: "0px",
              boxShadow: "none",
              ease: "power2.inOut",
              duration: 10,
            },
            0
          );

          // 2. Inner Image Zoom Out
          scrollTl.to(
            maskImg,
            {
              scale: 1.0,
              ease: "power2.inOut",
              duration: 10,
            },
            0
          );

          // 3. Parallax Typography Drift directly OVER the expanding image
          if (frontDefend) scrollTl.to(frontDefend, { xPercent: -18, ease: "none", duration: 10 }, 0);
          if (frontClimate) scrollTl.to(frontClimate, { xPercent: 18, ease: "none", duration: 10 }, 0);
          if (backDefend) scrollTl.to(backDefend, { xPercent: -18, ease: "none", duration: 10 }, 0);
          if (backClimate) scrollTl.to(backClimate, { xPercent: 18, ease: "none", duration: 10 }, 0);

          // Orb fade on scroll
          if (orb1Ref.current && orb2Ref.current) {
            scrollTl.to([orb1Ref.current, orb2Ref.current], { autoAlpha: 0, scale: 1.15, duration: 5 }, 0);
          }

          // Orb fade on scroll

          // 6. Atmospheric Bottom Gradient Fade-In
          if (bottomGradientRef.current) {
            scrollTl.to(
              bottomGradientRef.current,
              {
                opacity: 1,
                duration: 3,
                ease: "power2.inOut",
              },
              6.5
            );
          }

          ScrollTrigger.create({
            trigger: heroContainer,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            refreshPriority: 1,
            animation: scrollTl,
          });

          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        }
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  const { mainHero } = heroData;

  return (
    <section id="hero-pin-trigger" ref={containerRef} className={styles.heroContainer}>
      <div ref={bottomGradientRef} className={styles.bottomGradient} />
      <div className={styles.noiseOverlay} />

      <div ref={orb1Ref} className={`${styles.glowOrb} ${styles.glowOrbPrimary}`} />
      <div ref={orb2Ref} className={`${styles.glowOrb} ${styles.glowOrbSecondary}`} />

      {/* Back Typography Layer */}
      <div ref={colossalBackRef} className={styles.colossalLayer}>
        <h1 className={`${styles.textColossal} ${styles.textColossalSolid}`}>
          {splitText(mainHero.titlePart1)}
        </h1>
        <h1 className={`${styles.textColossal} ${styles.textColossalOutline}`}>
          {splitText(mainHero.titlePart2)}
        </h1>
      </div>

      {/* Centered Hero Image Card (Expands to Fullscreen on Scroll) */}
      <div ref={imageWrapRef} className={styles.imageWrap}>
        <Image
          ref={pinnedImgRef}
          src={mainHero.heroImage.src}
          alt={mainHero.heroImage.alt}
          width={mainHero.heroImage.width}
          height={mainHero.heroImage.height}
          priority={true}
          sizes="100vw"
          className={styles.pinnedImage}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8c+bMfwAJoANwcS0cPQAAAABJRU5ErkJggg=="
        />
      </div>

      {/* Front Typography Overlay Layer (Sits Directly OVER the Image) */}
      <div ref={colossalFrontRef} className={styles.colossalFront}>
        <h1 className={`${styles.textColossal} ${styles.textColossalSolid} text-colossal-front-defend`}>
          {splitText(mainHero.titlePart1)}
        </h1>
        <h1 className={`${styles.textColossal} ${styles.textColossalOutline} text-colossal-front-climate`}>
          {splitText(mainHero.titlePart2)}
        </h1>
      </div>
    </section>
  );
}
