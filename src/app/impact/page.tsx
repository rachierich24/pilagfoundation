"use client";

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SavorTrajectoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGPathElement>(null);
  const irisSectionRef = useRef<HTMLElement>(null);
  const webSectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    let mm = gsap.matchMedia();

    // 2. Continuous Central SVG Trajectory Line (Shared)
    if (svgLineRef.current) {
        const pathLength = 5000;
        gsap.set(svgLineRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        gsap.to(svgLineRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    }

    mm.add("(min-width: 769px)", () => {
        // 3. The "Iris" Reveal Mask (Desktop)
        if (irisSectionRef.current) {
            gsap.to('.iris-mask', {
                clipPath: 'circle(150% at 50% 50%)',
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: irisSectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true
                }
            });
            
            gsap.fromTo('.origins-text', 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, ease: 'power3.out',
                  scrollTrigger: {
                      trigger: irisSectionRef.current,
                      start: "top 50%",
                      end: "center center",
                      scrub: true
                  }
                }
            );
        }

        // 4. The Pinned "Butter" Web Anatomy Section (Desktop Only Pin)
        if (webSectionRef.current) {
            const webTl = gsap.timeline({
                scrollTrigger: {
                    trigger: webSectionRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true,
                    scrub: true
                }
            });

            gsap.set('.web-item', { opacity: 0 });
            gsap.set('.web-svg-line', { strokeDasharray: 500, strokeDashoffset: 500 });
            
            webTl.to('.web-svg-line', { strokeDashoffset: 0, duration: 1, ease: "none" }, 0)
                 .to('.web-label-left', { x: 50, opacity: 1, duration: 1, ease: "power2.out" }, 0)
                 .to('.web-label-right', { x: -50, opacity: 1, duration: 1, ease: "power2.out" }, 0);
        }
    });

    mm.add("(max-width: 768px)", () => {
        // Mobile: Show iris content immediately or with simple fade
        gsap.set('.iris-mask', { clipPath: 'circle(150% at 50% 50%)' });
        gsap.fromTo('.origins-text', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 1,
            scrollTrigger: { trigger: '.sv-iris-section', start: 'top 80%' }
        });

        // Mobile: No pinning for web section, show labels in stack
        gsap.set('.web-item', { opacity: 1, x: 0 });
        gsap.utils.toArray('.web-item').forEach(item => {
            gsap.from(item as HTMLElement, {
                opacity: 0, y: 20, duration: 0.8,
                scrollTrigger: { trigger: item as HTMLElement, start: 'top 90%' }
            });
        });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="sv-page-wrapper">
      
      {/* 
        THE CONTINUOUS GUIDE LINE 
        Spans the entire scroll height, strictly in the center
      */}
      <div className="sv-guide-container">
        <svg viewBox="0 0 100 5000" preserveAspectRatio="none" className="sv-guide-svg">
            {/* The line drops straight down. */}
            <path ref={svgLineRef} d="M50,0 L50,5000" className="sv-guide-path" />
        </svg>
      </div>

      {/* SECTION 1: THE HOOK (Light Theme) */}
      <section className="sv-hero-section">
          <div className="sv-hero-content">
              <h1 className="sv-split-heading">
                 <span style={{ alignSelf: 'flex-start' }}>Same impact.</span>
                 <span style={{ alignSelf: 'flex-end', marginTop: '20vh' }}>Better future.</span>
              </h1>
          </div>
      </section>

      {/* SECTION 2: THE IRIS ORIGIN (Dark Theme Reveal) */}
      <section ref={irisSectionRef} className="sv-iris-section">
          <div className="iris-mask sv-dark-bg">
              <div className="sv-content-wrapper">
                  <span className="sv-taxonomy">I // GROUNDWORK</span>
                  <h2 className="sv-massive-serif origins-text">Origins</h2>
                  
                  <div className="sv-spacer" style={{ height: '30vh' }}></div>
                  
                  <p className="sv-body-lead origins-text">
                     Before the data, there is the earth.<br/>
                     We start where nature started, beneath<br/>
                     the canopy, mapping ancestral truth.
                  </p>
              </div>
          </div>
      </section>

      {/* SECTION 3: THE PINNED WEB (The Product / Impact Core) */}
      <section ref={webSectionRef} className="sv-web-section sv-dark-bg">
          <div className="sv-web-content">
              <h3 className="sv-taxonomy" style={{ position: 'absolute', top: '10vh' }}>II // THE CATALYST</h3>
              
              {/* Central Target Image (Pinned) */}
              <div className="sv-web-center-image">
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1500" alt="Amazonian Core" />
              </div>

              {/* Anatomy Labels (Fly in from left/right) */}
              <div className="sv-web-labels">
                  
                  {/* Left Label 1 */}
                  <div className="web-item web-label-left" style={{ top: '20%', left: '10%' }}>
                      <h4>Indigenous Data</h4>
                      <p>2 Million acres strictly documented.</p>
                      <svg className="web-connect-svg" viewBox="0 0 200 100"><path className="web-svg-line" d="M0,50 L200,80"/></svg>
                  </div>

                  {/* Right Label 1 */}
                  <div className="web-item web-label-right" style={{ top: '30%', right: '10%', textAlign: 'left' }}>
                      <h4>Multinational Injunctions</h4>
                      <p>Supreme Court halts rapid deforestation.</p>
                      <svg className="web-connect-svg-right" viewBox="0 0 200 100"><path className="web-svg-line" d="M200,50 L0,80"/></svg>
                  </div>

                  {/* Left Label 2 */}
                  <div className="web-item web-label-left" style={{ bottom: '20%', left: '15%' }}>
                      <h4>Sovereign Power</h4>
                      <p>Establishing ancestral legal precedents.</p>
                      <svg className="web-connect-svg" viewBox="0 0 200 100" style={{ transform: 'scaleY(-1)' }}><path className="web-svg-line" d="M0,50 L200,80"/></svg>
                  </div>

              </div>
          </div>
      </section>

      {/* SECTION 4: THE GALLERY CLOSER */}
      <section className="sv-footer-section sv-dark-bg">
          <div className="sv-content-wrapper" style={{ alignItems: 'center' }}>
              <h2 className="sv-massive-serif">...so life could flourish</h2>
              <div className="sv-btn-trajectory-wrapper mt-lg">
                  <Link href="/support" className="sv-trajectory-btn">
                      <span>Fund</span>
                      <span className="sv-draw-dash"></span>
                      <span>The Next Phase</span>
                  </Link>
              </div>
          </div>
      </section>

    </main>
  );
}
