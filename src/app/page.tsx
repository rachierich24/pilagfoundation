"use client";

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 0. Preloader Sequence
    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = 'auto';
            gsap.to('.main-nav', { autoAlpha: 1, duration: 0.5 });
        }
    });

    document.body.style.overflow = 'hidden';
    gsap.set('.main-nav', { autoAlpha: 0 });

    tl.to('.preloader-text', { y: '0%', duration: 1, ease: 'power4.out', delay: 0.2 })
      .to({}, {duration: 0.5})
      .to('.preloader-text', { y: '100%', duration: 0.8, ease: 'power4.in' })
      .to('.split-left', { x: '-100%', duration: 1.2, ease: 'power4.inOut' }, 'split')
      .to('.split-right', { x: '100%', duration: 1.2, ease: 'power4.inOut' }, 'split')
      .to(['.split-left', '.split-right'], { autoAlpha: 0, duration: 0.01 }, 'split+=1.2')
      .to('.preloader', { autoAlpha: 0, duration: 0.5 }, 'split+=0.5');

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        // 1. Pinned Mask Reveal Hero (Desktop Only Pin)
        const heroSection = document.getElementById('hero-pin-trigger');
        const heroMaskImg = document.getElementById('hero-mask-img');
        if (heroSection && heroMaskImg) {
            gsap.to(heroMaskImg, {
                width: '100vw', height: '100vh', ease: 'none',
                scrollTrigger: {
                    trigger: heroSection, start: 'top top', end: '+=150%', scrub: true, pin: true
                }
            });
        }

        // 6. Pinned Editorial Gallery (Enhanced Mask Reveals)
        const pinnedSection = document.getElementById('pinned-quotes');
        const pinnedSlides = gsap.utils.toArray('.pinned-slide') as HTMLElement[];
        if (pinnedSection && pinnedSlides.length > 0) {
            gsap.set(pinnedSlides[0], { autoAlpha: 1 });
            gsap.set(pinnedSlides[0].querySelector('.pinned-bg-wrapper'), { clipPath: 'inset(0 0 0 0%)' });
            gsap.set(pinnedSlides[0].querySelector('.pinned-content'), { y: 0, autoAlpha: 1 });

            const galleryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinnedSection, start: "top top", end: "+=180%", scrub: 1, pin: true
                }
            });

            // Orb parallax
            galleryTl.to('.gallery-orb', { y: 200, x: 100, scale: 1.2, ease: "none", duration: 4 }, 0);

            pinnedSlides.forEach((slide, i) => {
                if (i === 0) {
                    // Animate first slide's popup
                    galleryTl.to(slide.querySelector('.stat-popup'), { autoAlpha: 1, scale: 1, duration: 0.5 }, 0.2);
                    return;
                }
                const prevSlide = pinnedSlides[i - 1];
                const prevContent = prevSlide.querySelector('.pinned-content');
                const prevBg = prevSlide.querySelector('.pinned-bg-wrapper');
                const prevPopup = prevSlide.querySelector('.stat-popup');
                
                const currentBg = slide.querySelector('.pinned-bg-wrapper');
                const currentContent = slide.querySelector('.pinned-content');
                const currentPopup = slide.querySelector('.stat-popup');

                const label = "transition" + i;
                galleryTl.add(label)
                    .to(prevContent, { y: -100, autoAlpha: 0, duration: 1 }, label)
                    .to(prevPopup, { scale: 0.8, autoAlpha: 0, duration: 0.5 }, label)
                    .to(prevBg, { clipPath: 'inset(0 0 0 100%)', duration: 1.2, ease: "power2.inOut" }, label)
                    .to(slide, { autoAlpha: 1, duration: 0.1 }, label + "+=0.1")
                    .to(currentBg, { clipPath: 'inset(0 0 0 0%)', duration: 1.2, ease: "power2.inOut" }, label)
                    .to(currentContent, { y: 0, autoAlpha: 1, duration: 1 }, label + "+=0.3")
                    .to(currentPopup, { scale: 1, autoAlpha: 1, duration: 0.8 }, label + "+=0.6");
            });
        }

        // 7. Kinetic Museum Timeline (Staggered & Progress)
        const horizontalWrapper = document.getElementById('horizontal-wrapper');
        const horizontalContainer = document.getElementById('horizontal-container');
        if (horizontalWrapper && horizontalContainer) {
            const scrollWidth = horizontalContainer.offsetWidth - window.innerWidth;
            
            const museumTl = gsap.timeline({
                scrollTrigger: {
                    trigger: horizontalWrapper, pin: true, scrub: 1, start: "top top", end: () => `+=${scrollWidth}`
                }
            });

            museumTl.to(horizontalContainer, { x: -scrollWidth, ease: "none" }, 0);
            museumTl.to('.timeline-progress-bar', { width: '100%', ease: "none" }, 0);

            // Parallax Year Labels
            gsap.utils.toArray('.outlined-dark').forEach((text, i) => {
                gsap.to(text as HTMLElement, {
                    x: -150, ease: "none",
                    scrollTrigger: { trigger: horizontalWrapper, start: "top top", end: () => `+=${scrollWidth}`, scrub: 2 }
                });
            });

            // 3D Card Tilts on Scroll
            gsap.utils.toArray('.museum-card').forEach(card => {
                gsap.fromTo(card as HTMLElement, { rotateY: -10, rotateX: 5 }, { 
                    rotateY: 10, rotateX: -5, ease: "none", 
                    scrollTrigger: { trigger: horizontalWrapper, start: "top top", end: () => `+=${scrollWidth}`, scrub: 1 }
                });
            });
        }

        // 4. Extreme Floating Parallax Scatter (Desktop Only)
        const rapidImages = gsap.utils.toArray('.parallax-rapid') as HTMLElement[];
        rapidImages.forEach(img => {
            const speed = parseFloat(img.getAttribute('data-speed') || '1');
            gsap.to(img, {
                y: () => `${-100 * speed}px`, ease: "none",
                scrollTrigger: {
                    trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true
                }
            });
        });
    });

    mm.add("(max-width: 768px)", () => {
        // Mobile behavior: No pinning, simple fades
        gsap.utils.toArray('.gs-fade-up, .pinned-slide, .museum-card, .scatter-img').forEach(elem => {
            gsap.fromTo(elem as HTMLElement, { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1, ease: 'power2.out',
                scrollTrigger: { trigger: elem as HTMLElement, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });
        
        // Show all pinned slides instead of hiding them
        gsap.set('.pinned-slide', { autoAlpha: 1, position: 'relative', marginBottom: '2rem' });
        gsap.set('.pinned-content', { autoAlpha: 1, y: 0, position: 'relative', bottom: 'auto', left: 'auto' });
        gsap.set('.hero-mask-img', { width: '100%', height: '50vh', position: 'relative', top: '0', left: '0', transform: 'none' });
    });

    // 2. Infinite Continuous Marquee (Shared)
    const marqueeTrack = document.getElementById('marquee-1');
    if (marqueeTrack) {
        gsap.to(marqueeTrack, { xPercent: -50, ease: "none", duration: 15, repeat: -1 });
    }

    // 3. Scrub Text Fill Reveal (Shared)
    const scrubContainer = document.getElementById('scrub-container-1');
    const scrubFill = document.getElementById('scrub-fill-1');
    if (scrubContainer && scrubFill) {
        gsap.to(scrubFill, {
            clipPath: 'inset(0 0% 0 0)', ease: 'none',
            scrollTrigger: {
                trigger: scrubContainer, start: 'top 80%', end: 'top 30%', scrub: true
            }
        });
    }

    // 5. Base Elegance Fades (Shared)
    const fadeUps = gsap.utils.toArray('.gs-fade-up') as HTMLElement[];
    fadeUps.forEach(elem => {
        gsap.fromTo(elem, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: elem, start: 'top 90%', toggleActions: 'play none none none' }
        });
    });

    // Nav blend mode workaround (Shared)
    const nav = document.querySelector('.main-nav');
    if (nav) {
        ScrollTrigger.create({
            trigger: '#hero-pin-trigger',
            start: "bottom top", 
            onEnter: () => nav.classList.add('scrolled'),
            onLeaveBack: () => nav.classList.remove('scrolled')
        });
    }
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

          </div>
      </main>
    </div>
  );
}
