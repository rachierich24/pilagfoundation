"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [donationAmount, setDonationAmount] = useState<number>(500);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ─── GLOBAL: Custom Cursor ───
    const cursor = document.getElementById('eco-cursor');
    const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', moveCursor);

    const handleHover = () => cursor?.classList.add('hovering');
    const handleUnhover = () => cursor?.classList.remove('hovering');
    document.querySelectorAll('a, button, .donation-card, .testimonial-card').forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleUnhover);
    });

    // ─── GLOBAL: Scroll Progress Bar ───
    gsap.to('#scroll-progress-bar', {
        width: '100%', ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.3 }
    });

    // ─── 0. Preloader Sequence (Enhanced) ───
    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = 'auto';
            gsap.to('.main-nav', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        }
    });

    document.body.style.overflow = 'hidden';
    gsap.set('.main-nav', { autoAlpha: 0, y: -20 });

    // Preloader progress counter
    const prgCounter = { value: 0 };
    tl.to(prgCounter, {
        value: 100, duration: 2, ease: 'power2.inOut',
        onUpdate: () => {
            const pct = Math.floor(prgCounter.value);
            const pctEl = document.querySelector('.preloader-pct');
            const fillEl = document.querySelector('.preloader-progress-fill') as HTMLElement;
            if (pctEl) pctEl.textContent = `${pct}%`;
            if (fillEl) fillEl.style.width = `${pct}%`;
            if (pct > 80) document.querySelector('.preloader-text')?.classList.add('sharp');
        }
    }, 'start');

    tl.to('.preloader-text', { y: '0%', duration: 1.2, ease: 'power4.out' }, 'start+=0.2')
      .to('.preloader-text', { scale: 1.1, opacity: 0, filter: 'blur(20px)', duration: 0.8, ease: 'power2.in' }, '+=0.5')
      .to('.split-left', { x: '-100%', duration: 1.2, ease: 'expo.inOut' }, 'split')
      .to('.split-right', { x: '100%', duration: 1.2, ease: 'expo.inOut' }, 'split')
      .to('.preloader', { autoAlpha: 0, duration: 0.5 }, 'split+=0.8');

    mm.add("(min-width: 769px)", () => {
        // 1. Pinned Mask Reveal Hero
        const heroSection = document.getElementById('hero-pin-trigger');
        const heroMaskImg = document.getElementById('hero-mask-img');
        if (heroSection && heroMaskImg) {
            gsap.to(heroMaskImg, {
                width: '100vw', height: '100vh', ease: 'none',
                scrollTrigger: { trigger: heroSection, start: 'top top', end: '+=150%', scrub: true, pin: true }
            });
        }

        // 6. Pinned Editorial Gallery
        const pinnedSection = document.getElementById('pinned-quotes');
        const pinnedSlides = gsap.utils.toArray('.pinned-slide') as HTMLElement[];
        if (pinnedSection && pinnedSlides.length > 0) {
            gsap.set(pinnedSlides[0], { autoAlpha: 1 });
            gsap.set(pinnedSlides[0].querySelector('.pinned-bg-wrapper'), { clipPath: 'inset(0 0 0 0%)' });
            gsap.set(pinnedSlides[0].querySelector('.pinned-content'), { y: 0, autoAlpha: 1 });

            const galleryTl = gsap.timeline({
                scrollTrigger: { trigger: pinnedSection, start: "top top", end: "+=250%", scrub: 1, pin: true }
            });

            galleryTl.to('.gallery-orb', { y: 200, x: 100, scale: 1.5, ease: "none", duration: 4 }, 0);

            pinnedSlides.forEach((slide, i) => {
                if (i === 0) {
                    galleryTl.to(slide.querySelector('.stat-popup'), { autoAlpha: 1, scale: 1, duration: 0.5 }, 0.2);
                    return;
                }
                const prevBg = pinnedSlides[i - 1].querySelector('.pinned-bg-wrapper');
                const prevContent = pinnedSlides[i - 1].querySelector('.pinned-content');
                const label = "transition" + i;
                galleryTl.add(label)
                    .to(prevContent, { y: -50, autoAlpha: 0, duration: 1 }, label)
                    .to(prevBg, { clipPath: 'inset(0 0 0 100%)', duration: 1.2, ease: "power2.inOut" }, label)
                    .to(slide, { autoAlpha: 1, duration: 0.1 }, label + "+=0.1")
                    .to(slide.querySelector('.pinned-bg-wrapper'), { clipPath: 'inset(0 0 0 0%)', duration: 1.2, ease: "power2.inOut" }, label)
                    .to(slide.querySelector('.pinned-content'), { y: 0, autoAlpha: 1, duration: 1 }, label + "+=0.3")
                    .to(slide.querySelector('.stat-popup'), { scale: 1, autoAlpha: 1, duration: 0.8 }, label + "+=0.6");
            });
        }

        // 7. Kinetic Museum Timeline
        const horizontalWrapper = document.getElementById('horizontal-wrapper');
        const horizontalContainer = document.getElementById('horizontal-container');
        if (horizontalWrapper && horizontalContainer) {
            const scrollWidth = horizontalContainer.offsetWidth - window.innerWidth;
            const museumTl = gsap.timeline({
                scrollTrigger: { trigger: horizontalWrapper, pin: true, scrub: 1, start: "top top", end: () => `+=${scrollWidth}` }
            });
            museumTl.to(horizontalContainer, { x: -scrollWidth, ease: "none" }, 0);
            museumTl.to('.timeline-progress-bar', { width: '100%', ease: "none" }, 0);
            
            gsap.utils.toArray('.outlined-dark').forEach((text) => {
                gsap.to(text as HTMLElement, { x: -200, scrollTrigger: { trigger: horizontalWrapper, scrub: 2 } });
            });
            gsap.utils.toArray('.museum-card').forEach(card => {
                gsap.fromTo(card as HTMLElement, { rotateY: -15 }, { rotateY: 15, scrollTrigger: { trigger: horizontalWrapper, scrub: 1 } });
            });
        }

        // ─── NEW: IMPACT STRIP Count-up ───
        const stats = [
            { id: 'stat-trees', end: 120000, suffix: '+' },
            { id: 'stat-volunteers', end: 3800, suffix: '+' },
            { id: 'stat-campaigns', end: 47, suffix: '' }
        ];
        stats.forEach(stat => {
            const el = document.getElementById(stat.id);
            if (el) {
                gsap.to({ val: 0 }, {
                    val: stat.end, duration: 2, ease: 'power2.out',
                    scrollTrigger: { trigger: '.impact-strip', start: 'top 80%' },
                    onUpdate: function() {
                        el.textContent = Math.floor(this.targets()[0].val).toLocaleString() + stat.suffix;
                    }
                });
            }
        });

        // ─── NEW: TRUST BARS Fill ───
        gsap.utils.toArray('.trust-bar-fill').forEach((bar: any) => {
            gsap.to(bar, {
                width: bar.getAttribute('data-pct') + '%', duration: 1.5, ease: 'expo.out',
                scrollTrigger: { trigger: '.trust-section', start: 'top 70%' }
            });
        });

        // ─── NEW: FINAL CTA Reveal ───
        const ctaLines = gsap.utils.toArray('.cta-line');
        ctaLines.forEach((line, i) => {
            gsap.to(line as HTMLElement, {
                className: 'cta-line revealed', scrollTrigger: { trigger: line as HTMLElement, start: 'top 85%', toggleActions: 'play none none reverse' },
                delay: i * 0.2
            });
        });
        gsap.to('.final-cta-buttons', {
            className: 'final-cta-buttons visible', scrollTrigger: { trigger: '.final-cta-section', start: 'top 60%' }
        });

        // ─── NAVBAR DYNAMIC CTA ───
        const navCTA = document.getElementById('nav-dynamic-cta');
        if (navCTA) {
            ScrollTrigger.create({
                trigger: '.hero-pinned', start: 'top top',
                onEnterBack: () => gsap.to(navCTA, { textContent: 'Join Movement', duration: 0.3 })
            });
            ScrollTrigger.create({
                trigger: '.impact-strip', start: 'top 50%',
                onEnter: () => gsap.to(navCTA, { textContent: 'See Impact', duration: 0.3 }),
                onLeaveBack: () => gsap.to(navCTA, { textContent: 'Join Movement', duration: 0.3 })
            });
            ScrollTrigger.create({
                trigger: '.conversion-section', start: 'top 50%',
                onEnter: () => gsap.to(navCTA, { textContent: 'Donate Now', duration: 0.3 }),
                onLeaveBack: () => gsap.to(navCTA, { textContent: 'See Impact', duration: 0.3 })
            });
        }
    });

    mm.add("(max-width: 768px)", () => {
        gsap.utils.toArray('.gs-fade-up, .pinned-slide, .museum-card, .impact-stat, .testimonial-card').forEach(elem => {
            gsap.fromTo(elem as HTMLElement, { y: 30, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: elem as HTMLElement, start: 'top 90%' }
            });
        });
        gsap.set('.pinned-slide', { autoAlpha: 1, position: 'relative', marginBottom: '2rem' });
        gsap.set('.pinned-content', { autoAlpha: 1, y: 0, position: 'relative' });
        gsap.set('.hero-mask-img', { width: '100%', height: '50vh', position: 'relative' });
    });

    // 2. Continuous Marquee
    const marqueeTrack = document.getElementById('marquee-1');
    if (marqueeTrack) {
        gsap.to(marqueeTrack, { xPercent: -50, ease: "none", duration: 15, repeat: -1 });
    }

    // 3. Scrub Text Fill
    const scrubContainer = document.getElementById('scrub-container-1');
    const scrubFill = document.getElementById('scrub-fill-1');
    if (scrubContainer && scrubFill) {
        gsap.to(scrubFill, {
            clipPath: 'inset(0 0% 0 0)', ease: 'none',
            scrollTrigger: { trigger: scrubContainer, start: 'top 80%', end: 'top 30%', scrub: true }
        });
    }

    return () => {
        window.removeEventListener('mousemove', moveCursor);
        mm.revert();
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Cinematic GSAP Preloader */}
      <div className="preloader">
          <div className="preloader-track">
              <span className="preloader-text">IMPACT</span>
          </div>
      </div>
      <div className="split-panel split-left"></div>
      <div className="split-panel split-right"></div>
      
      <main id="smooth-wrapper">
          <div id="smooth-content">
              
              <section id="hero-pin-trigger" className="hero-pinned">
                  <div className="hero-colossal-layer">
                      <h1 className="text-colossal">DEFEND</h1>
                      <h1 className="text-colossal text-colossal-outline">THE CLIMATE.</h1>
                  </div>
                  <img id="hero-mask-img" src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2500&auto=format&fit=crop" className="hero-pinned-img" alt="Forest Deforestation" />
                  <div className="hero-colossal-front">
                      <h1 className="text-colossal" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>DEFEND</h1>
                  </div>
              </section>

              <section style={{ padding: '10vh 0', overflow: 'hidden' }}>
                  <div className="marquee-band">
                      <div className="marquee-track" id="marquee-1">
                          <span className="marquee-item">GRASSROOTS ACTION //</span>
                          <span className="marquee-item">SYSTEMIC CHANGE //</span>
                          <span className="marquee-item">CLIMATE JUSTICE //</span>
                          <span className="marquee-item">DIGITAL EMPOWERMENT //</span>
                          <span className="marquee-item">GRASSROOTS ACTION //</span>
                          <span className="marquee-item">SYSTEMIC CHANGE //</span>
                          <span className="marquee-item">CLIMATE JUSTICE //</span>
                          <span className="marquee-item">DIGITAL EMPOWERMENT //</span>
                      </div>
                  </div>
              </section>

              <section className="section" style={{ paddingTop: 0 }}>
                  <div className="container text-center">
                      <p className="uppercase-label gs-fade-up">The Mandate</p>
                      
                      <div className="scrub-text-container" id="scrub-container-1">
                          We bridge the gap between global climate policies and local social realities.
                          <div className="scrub-text-fill" id="scrub-fill-1">
                              We bridge the gap between global climate policies and local social realities.
                          </div>
                      </div>

                      <div className="gs-fade-up delay-1 mt-md" style={{ marginTop: '4rem' }}>
                          <Link href="/about" className="btn btn-primary">Discover Our Mission</Link>
                      </div>
                  </div>
              </section>

              <section id="pinned-quotes" className="pinned-gallery-wrapper">
                  <div className="gallery-orb"></div>
                  <div className="pinned-gallery-container">
                      
                      {/* Slide 1 */}
                      <div className="pinned-slide active">
                          <div className="pinned-bg-wrapper">
                              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000" alt="Child in nature" className="pinned-bg" />
                          </div>
                          <div className="pinned-content">
                              <h2 className="text-colossal">THE YOUTH.</h2>
                              <p className="lead-text">Securing the rights of the next generation to inherit a stable climate through aggressive legal precedents.</p>
                          </div>
                          <div className="stat-popup" style={{ top: '20%', right: '15%' }}>
                              <h5>1.2M</h5>
                              <p>Hectares under legal protection</p>
                          </div>
                      </div>

                      {/* Slide 2 */}
                      <div className="pinned-slide">
                          <div className="pinned-bg-wrapper">
                              <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2000" alt="Mapping" className="pinned-bg" />
                          </div>
                          <div className="pinned-content">
                              <h2 className="text-colossal">THE DATA.</h2>
                              <p className="lead-text">Mapping the invisible. Using high-resolution satellite arrays to prove ancestral land ownership.</p>
                          </div>
                          <div className="stat-popup" style={{ bottom: '25%', right: '10%' }}>
                              <h5>400+</h5>
                              <p>Communities Digitized</p>
                          </div>
                      </div>

                      {/* Slide 3 */}
                      <div className="pinned-slide">
                          <div className="pinned-bg-wrapper">
                              <img src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000" alt="Deforestation" className="pinned-bg" />
                          </div>
                          <div className="pinned-content">
                              <h2 className="text-colossal">THE DEFENSE.</h2>
                              <p className="lead-text">Halting illegal extractions. Our litigation fund is the shield for the world's most vulnerable habitats.</p>
                          </div>
                          <div className="stat-popup" style={{ top: '30%', right: '20%' }}>
                              <h5>$8M</h5>
                              <p>Legal Grants Disbursed</p>
                          </div>
                      </div>

                  </div>
              </section>

              <section className="section gallery-scatter">
                  <div className="scatter-img scatter-1 parallax-rapid" data-speed="0.8">
                      <img src="https://images.unsplash.com/photo-1593113589914-075992c80da5?q=80&w=1000&auto=format&fit=crop" alt="Community" />
                  </div>
                  <div className="scatter-img scatter-2 parallax-rapid" data-speed="-1.2">
                      <h2 className="text-colossal" style={{ position: 'absolute', top: '-10%', right: '-20%', zIndex: 5, fontSize: '10rem', WebkitTextStroke: '2px var(--clr-primary)', opacity: 0.3, color: 'transparent' }}>POWER</h2>
                      <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000&auto=format&fit=crop" alt="Mapping" />
                  </div>
                  <div className="scatter-img scatter-3 parallax-rapid" data-speed="1.5">
                      <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" alt="Action" />
                  </div>
              </section>

              <section id="horizontal-wrapper" className="horizontal-wrapper">
                  <div className="timeline-progress-container">
                      <div className="timeline-progress-bar"></div>
                  </div>
                  <div id="horizontal-container" className="horizontal-container">
                      <div className="museum-panel">
                          <h2 className="text-colossal outlined-dark">FOUNDATIONS</h2>
                          <div className="museum-card">
                              <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000" alt="River Conservation" />
                              <div className="card-caption">
                                  <span>Archive: 2021</span>
                                  <h4>AMAZON PACT</h4>
                              </div>
                          </div>
                      </div>

                      <div className="museum-panel">
                          <h2 className="text-colossal outlined-dark">LITIGATION</h2>
                          <div className="museum-card" style={{ transform: 'translateY(-10vh)' }}>
                              <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1000" alt="Legal Action" />
                              <div className="card-caption">
                                  <span>Archive: 2023</span>
                                  <h4>DEFENSE FUND</h4>
                              </div>
                          </div>
                      </div>

                      <div className="museum-panel">
                          <h2 className="text-colossal outlined-dark">RESOLUTION</h2>
                          <div className="museum-card" style={{ transform: 'translateY(10vh)' }}>
                              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000" alt="Emissions" />
                              <div className="card-caption">
                                  <span>Archive: 2025</span>
                                  <h4>CLEAN AIR ACCORD</h4>
                              </div>
                          </div>
                      </div>

                      <div className="museum-panel">
                          <h2 className="text-colossal outlined-dark">SOVEREIGNTY</h2>
                          <div className="museum-card">
                              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000" alt="Future" />
                              <div className="card-caption">
                                  <span>Vision: 2030</span>
                                  <h4>SYSTEMIC SHIFT</h4>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* ─── NEW: IMPACT STRIP ─── */}
              <section className="impact-strip">
                  <div className="impact-strip-inner">
                      <div className="impact-stat">
                          <span className="impact-stat-number" id="stat-trees">0</span>
                          <span className="impact-stat-label">Trees Planted</span>
                      </div>
                      <div className="impact-stat">
                          <span className="impact-stat-number" id="stat-volunteers">0</span>
                          <span className="impact-stat-label">Volunteers Joined</span>
                      </div>
                      <div className="impact-stat">
                          <span className="impact-stat-number" id="stat-campaigns">0</span>
                          <span className="impact-stat-label">Campaigns Executed</span>
                      </div>
                  </div>
              </section>

              {/* ─── NEW: CONVERSION SPLIT ─── */}
              <section className="conversion-section">
                  <div className="conversion-inner">
                      <div className="volunteer-col">
                          <span className="section-eyebrow">Get Involved</span>
                          <h2>Join the Movement</h2>
                          <p>Your time is the most powerful currency in climate action. Join thousands of volunteers driving real grassroots change across India's most vulnerable ecosystems.</p>
                          <Link href="/support" className="btn btn-primary" style={{ background: '#1A3626', color: '#FFF' }}>Register as Volunteer →</Link>
                      </div>
                      
                      <div className="donation-col">
                          <span className="section-eyebrow">Action Now</span>
                          <h2>Fund the Impact</h2>
                          <div className="donation-cards">
                              {[
                                  { amt: 100, desc: "Plant a native tree + certificate" },
                                  { amt: 500, desc: "Support community awareness events" },
                                  { amt: 1000, desc: "Sponsor a full local campaign" }
                              ].map((card) => (
                                  <div 
                                      key={card.amt}
                                      className={`donation-card ${donationAmount === card.amt ? 'selected' : ''}`}
                                      onClick={() => setDonationAmount(card.amt)}
                                  >
                                      <div>
                                          <div className="donation-amount">₹{card.amt}</div>
                                          <div className="donation-desc">{card.desc}</div>
                                      </div>
                                      <div className="donation-card-check"></div>
                                  </div>
                              ))}
                          </div>
                          <div className="donate-action">
                              <Link href="/support" className="btn-donate">Donate Now ₹{donationAmount}</Link>
                          </div>
                      </div>
                  </div>
              </section>

              {/* ─── NEW: TRUST SECTION ─── */}
              <section className="trust-section">
                  <div className="trust-inner">
                      <span className="trust-eyebrow">Transparency</span>
                      <h2 className="trust-heading">Where your money goes</h2>
                      <div className="trust-bars">
                          <div className="trust-bar-item">
                              <div className="trust-bar-header">
                                  <span className="trust-bar-label">Direct Project Funding</span>
                                  <span className="trust-bar-pct">70%</span>
                              </div>
                              <div className="trust-bar-track">
                                  <div className="trust-bar-fill" data-pct="70"></div>
                              </div>
                          </div>
                          <div className="trust-bar-item">
                              <div className="trust-bar-header">
                                  <span className="trust-bar-label">Research & Litigation</span>
                                  <span className="trust-bar-pct">20%</span>
                              </div>
                              <div className="trust-bar-track">
                                  <div className="trust-bar-fill" data-pct="20"></div>
                              </div>
                          </div>
                          <div className="trust-bar-item">
                              <div className="trust-bar-header">
                                  <span className="trust-bar-label">Community Outreach</span>
                                  <span className="trust-bar-pct">10%</span>
                              </div>
                              <div className="trust-bar-track">
                                  <div className="trust-bar-fill" data-pct="10"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* ─── NEW: COMMUNITY SECTION ─── */}
              <section className="community-section">
                  <div className="community-inner">
                      <h2 className="community-heading">Our Community. <br/> Our Strength.</h2>
                      <div className="community-grid">
                          <div className="testimonial-card">
                              <p className="testimonial-text">"Pilag Foundation gave us the tools to map our ancestral lands when the government said they didn't exist."</p>
                              <div className="testimonial-author">
                                  <div className="testimonial-avatar">AM</div>
                                  <div>
                                      <div className="testimonial-name">Arjun Mehra</div>
                                      <div className="testimonial-role">Community Leader</div>
                                  </div>
                              </div>
                          </div>
                          <div className="testimonial-card">
                              <p className="testimonial-text">"The litigation fund stopped the illegal logging in our valley within three months of the first report."</p>
                              <div className="testimonial-author">
                                  <div className="testimonial-avatar">PN</div>
                                  <div>
                                      <div className="testimonial-name">Priya Nair</div>
                                      <div className="testimonial-role">Legal Activist</div>
                                  </div>
                              </div>
                          </div>
                          <div className="testimonial-card">
                              <p className="testimonial-text">"I started as a volunteer planting trees and now I lead digital literacy workshops for tribal youth."</p>
                              <div className="testimonial-author">
                                  <div className="testimonial-avatar">RD</div>
                                  <div>
                                      <div className="testimonial-name">Rekha Devi</div>
                                      <div className="testimonial-role">Field Officer</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* ─── NEW: FINAL CLIMAX CTA ─── */}
              <section className="final-cta-section">
                  <div className="final-cta-bg-orb"></div>
                  <div className="final-cta-inner">
                      <span className="cta-line">You've seen the problem.</span>
                      <span className="cta-line">You've seen the action.</span>
                      <span className="cta-line">Now be part of it.</span>
                      <div className="final-cta-buttons">
                          <Link href="/support" className="btn-volunteer">Register as Volunteer</Link>
                          <Link href="/support" className="btn-donate-cta">Donate Now ₹</Link>
                      </div>
                  </div>
              </section>

          </div>
      </main>
    </div>
  );
}
