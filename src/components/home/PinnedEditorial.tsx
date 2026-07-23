import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowUpRight, Compass, ShieldCheck, Radar } from 'lucide-react';

export default function PinnedEditorial() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        // 1. Continuous Marquee
        const marqueeTrack = document.getElementById('marquee-1');
        if (marqueeTrack) {
            gsap.to(marqueeTrack, { xPercent: -50, ease: "none", duration: 15, repeat: -1 });
        }

        // 2. Scrub Text Fill & Reveal
        const scrubContainer = document.getElementById('scrub-container-1');
        const scrubFill = document.getElementById('scrub-fill-1');
        if (scrubContainer && scrubFill) {
            gsap.to(scrubFill, {
                clipPath: 'inset(0 0% 0 0)', ease: 'none',
                scrollTrigger: { trigger: scrubContainer, start: 'top 80%', end: 'top 30%', scrub: true }
            });
        }

        // 3. Sequential 3D Scroll Pop-Out Animation for Fieldwork Archive Cards
        gsap.utils.toArray('.fieldwork-card-wrapper').forEach((el: any) => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    scale: 0.82,
                    y: 120,
                    rotateX: 16,
                    transformOrigin: "center bottom"
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotateX: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        end: "top 45%",
                        scrub: 0.8
                    }
                }
            );
        });

        // 4. Background Watermark Text Scrubbing
        const watermarkText = document.getElementById('fieldwork-watermark');
        if (watermarkText) {
            gsap.to(watermarkText, {
                xPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.fieldwork-archive-gallery',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5
                }
            });
        }

        // 5. Desktop Cinematic Pinned Gallery
        mm.add("(min-width: 769px)", () => {
            const pinnedSection = document.getElementById('pinned-quotes');
            const pinnedSlides = gsap.utils.toArray('.pinned-slide') as HTMLElement[];
            const slideNumEl = document.getElementById('slide-num');
            const slideBarEl = document.getElementById('slide-bar');

            if (pinnedSection && pinnedSlides.length > 0) {
                // Initialize SplitType for slide headings
                const splitInstances: any[] = [];
                pinnedSlides.forEach((slide) => {
                    const heading = slide.querySelector('.text-colossal');
                    if (heading) {
                        const split = new SplitType(heading as HTMLElement, { types: 'chars' });
                        splitInstances.push(split);
                    }
                });

                // Set Initial Slide 1 state
                gsap.set(pinnedSlides[0], { autoAlpha: 1 });
                gsap.set(pinnedSlides[0].querySelector('.pinned-bg-wrapper'), { clipPath: 'inset(0 0 0 0%)' });
                gsap.set(pinnedSlides[0].querySelector('.pinned-content'), { y: 0, autoAlpha: 1 });
                gsap.set(pinnedSlides[0].querySelector('.lead-text'), { y: 0, autoAlpha: 1 });

                // Animate Slide 1 SplitType chars
                const slide1Chars = pinnedSlides[0].querySelectorAll('.char');
                if (slide1Chars.length > 0) {
                    gsap.set(slide1Chars, { yPercent: 0, rotateX: 0, opacity: 1 });
                }

                const galleryTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinnedSection,
                        start: "top top",
                        end: "+=280%",
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            // Update progress bar HUD
                            const progress = self.progress;
                            if (slideBarEl) {
                                slideBarEl.style.width = `${Math.max(15, progress * 100)}%`;
                            }
                            if (slideNumEl) {
                                if (progress < 0.35) {
                                    slideNumEl.textContent = '01';
                                } else if (progress < 0.70) {
                                    slideNumEl.textContent = '02';
                                } else {
                                    slideNumEl.textContent = '03';
                                }
                            }
                        }
                    }
                });

                // Dynamic background light orb animation
                galleryTl.to('.gallery-orb', { y: 250, x: 120, scale: 1.6, ease: "none", duration: 5 }, 0);

                // Initial Slide 1 stat popup reveal
                galleryTl.to(pinnedSlides[0].querySelector('.stat-popup'), { autoAlpha: 1, scale: 1, duration: 0.5 }, 0.2);

                pinnedSlides.forEach((slide, i) => {
                    if (i === 0) return;

                    const prevSlide = pinnedSlides[i - 1];
                    const prevBg = prevSlide.querySelector('.pinned-bg-wrapper');
                    const prevContent = prevSlide.querySelector('.pinned-content');
                    const prevStat = prevSlide.querySelector('.stat-popup');
                    const prevChars = prevSlide.querySelectorAll('.char');

                    const currBg = slide.querySelector('.pinned-bg-wrapper');
                    const currContent = slide.querySelector('.pinned-content');
                    const currLead = slide.querySelector('.lead-text');
                    const currStat = slide.querySelector('.stat-popup');
                    const currChars = slide.querySelectorAll('.char');

                    const label = "transition" + i;

                    galleryTl.add(label)
                        // Fade out previous slide content
                        .to(prevStat, { scale: 0.9, autoAlpha: 0, duration: 0.6 }, label)
                        .to(prevChars, { yPercent: -80, opacity: 0, stagger: 0.02, duration: 0.8 }, label)
                        .to(prevContent, { y: -40, autoAlpha: 0, duration: 0.8 }, label)
                        .to(prevBg, { clipPath: 'inset(0 0 0 100%)', duration: 1.2, ease: "power2.inOut" }, label)
                        
                        // Reveal current slide background
                        .to(slide, { autoAlpha: 1, duration: 0.1 }, label + "+=0.1")
                        .to(currBg, { clipPath: 'inset(0 0 0 0%)', duration: 1.2, ease: "power2.inOut" }, label)
                        
                        // Entrance for current slide content & SplitType chars
                        .to(currContent, { y: 0, autoAlpha: 1, duration: 0.8 }, label + "+=0.3")
                        .fromTo(currChars, 
                            { yPercent: 100, rotateX: -60, opacity: 0 }, 
                            { yPercent: 0, rotateX: 0, opacity: 1, stagger: 0.03, duration: 1, ease: "power3.out" }, 
                            label + "+=0.3"
                        )
                        .to(currLead, { y: 0, autoAlpha: 1, duration: 0.8 }, label + "+=0.5")
                        .to(currStat, { scale: 1, autoAlpha: 1, duration: 0.8, ease: "back.out(1.4)" }, label + "+=0.6");
                });

                return () => {
                    splitInstances.forEach((inst) => inst.revert());
                };
            }
        });

        // 6. Mobile Fixes for Pinned Gallery
        mm.add("(max-width: 768px)", () => {
            gsap.set('.pinned-gallery-wrapper', { height: 'auto', overflow: 'visible' });
            gsap.set('.pinned-gallery-container', { height: 'auto', position: 'relative' });
            gsap.set('.pinned-slide', {
                position: 'relative', opacity: 1, visibility: 'visible',
                height: 'auto', minHeight: 'auto'
            });
            gsap.set('.pinned-bg-wrapper', { clipPath: 'none', width: '100%', position: 'relative', height: '45vh' });
            gsap.set('.pinned-content', { transform: 'none', opacity: 1, position: 'relative', left: 0, padding: '2rem 6vw' });
            gsap.set('.stat-popup', { opacity: 1, scale: 1 });
            gsap.set('.lead-text', { opacity: 1, transform: 'none' });
            gsap.set('.text-colossal', { opacity: 1, transform: 'none' });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            {/* MARQUEE (ALABASTER BEIGE BACKGROUND) */}
            <section style={{ padding: '8vh 0', overflow: 'hidden', background: '#F9F6F0' }}>
                <div className="marquee-band">
                    <div className="marquee-track-horizontal" id="marquee-1">
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

            {/* MANDATE / SCRUB TEXT (ALABASTER BEIGE BACKGROUND) */}
            <section className="section mandate-section-beige">
                <div className="container text-center">
                    <p className="uppercase-label gs-fade-up" style={{ color: '#059669', letterSpacing: '0.2em', fontWeight: 700 }}>The Mandate</p>
                    <div className="scrub-text-container" id="scrub-container-1">
                        We bridge the gap between global climate policies and local social realities.
                        <div className="scrub-text-fill" id="scrub-fill-1">
                            We bridge the gap between global climate policies and local social realities.
                        </div>
                    </div>
                    <div className="gs-fade-up delay-1 mt-md" style={{ marginTop: '3rem' }}>
                        <Link href="/about" className="btn btn-primary btn-magnetic">Discover Our Mission</Link>
                    </div>
                </div>
            </section>

            {/* PINNED EDITORIAL GALLERY */}
            <section id="pinned-quotes" className="pinned-gallery-wrapper">
                <div className="editorial-grid"></div>
                <div className="crosshair crosshair-1"></div>
                <div className="crosshair crosshair-2"></div>

                {/* HUD Slide Counter */}
                <div className="slide-counter">
                    <span className="slide-counter-num" id="slide-num">01</span>
                    <div className="slide-progress-track">
                        <div className="slide-progress-bar" id="slide-bar"></div>
                    </div>
                    <span className="slide-counter-total">03</span>
                </div>

                <div className="gallery-orb"></div>
                <div className="pinned-gallery-container">
                    {/* Slide 1 */}
                    <div className="pinned-slide active">
                        <div className="pinned-bg-wrapper">
                            <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000" alt="Child in nature" className="pinned-bg" width={2000} height={1333} priority />
                        </div>
                        <div className="pinned-content">
                            <h2 className="text-colossal">THE YOUTH.</h2>
                            <p className="lead-text">Securing the rights of the next generation to inherit a stable climate through aggressive legal precedents.</p>
                        </div>
                        {/* Minimal Research Stat Card 1 */}
                        <div className="stat-popup" style={{ top: '20%', right: '12%' }}>
                            <div className="stat-card-tag">DOSSIER // 01</div>
                            <h5 className="stat-card-num">1.2M+</h5>
                            <p className="stat-card-label">Hectares Under Protection</p>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="pinned-slide">
                        <div className="pinned-bg-wrapper">
                            <Image src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2000" alt="Mapping" className="pinned-bg" width={2000} height={1333} />
                        </div>
                        <div className="pinned-content">
                            <h2 className="text-colossal">THE DATA.</h2>
                            <p className="lead-text">Mapping the invisible. Using high-resolution satellite arrays to prove ancestral land ownership.</p>
                        </div>
                        {/* Minimal Research Stat Card 2 */}
                        <div className="stat-popup" style={{ bottom: '22%', right: '10%' }}>
                            <div className="stat-card-tag">DOSSIER // 02</div>
                            <h5 className="stat-card-num">400+</h5>
                            <p className="stat-card-label">Communities Mapped</p>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="pinned-slide">
                        <div className="pinned-bg-wrapper">
                            <Image src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000" alt="Deforestation" className="pinned-bg" width={2000} height={1333} />
                        </div>
                        <div className="pinned-content">
                            <h2 className="text-colossal">THE DEFENSE.</h2>
                            <p className="lead-text">Halting illegal extractions. Our litigation fund is the shield for the world's most vulnerable habitats.</p>
                        </div>
                        {/* Minimal Research Stat Card 3 */}
                        <div className="stat-popup" style={{ top: '25%', right: '16%' }}>
                            <div className="stat-card-tag">DOSSIER // 03</div>
                            <h5 className="stat-card-num">$8M</h5>
                            <p className="stat-card-label">Legal Defense Disbursed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ULTRA-PREMIUM ARCHITECTURAL FIELDWORK ARCHIVE */}
            <section className="fieldwork-archive-gallery">
                <div className="fieldwork-bg-grid"></div>
                <div className="fieldwork-watermark-text" id="fieldwork-watermark">
                    FIELDWORK // EXPEDITION // ECOSYSTEM //
                </div>

                <div className="fieldwork-header-hud">
                    <div className="hud-badge-tag">
                        <Radar className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span>ARCHIVAL DOSSIER // 04</span>
                    </div>
                    <h2 className="fieldwork-title">GROUND EVIDENCE.</h2>
                    <p className="fieldwork-subtitle">Documenting frontline environmental litigation, community territorial mapping, and ecosystem restoration.</p>
                </div>

                <div className="fieldwork-cards-grid">
                    {/* Card 1 */}
                    <div className="fieldwork-card-wrapper">
                        <div className="fieldwork-card">
                            <div className="fieldwork-img-container">
                                <Image 
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Community Leadership & Forest Fieldwork" 
                                    width={1200} 
                                    height={800} 
                                    priority
                                />
                                <div className="fieldwork-card-overlay"></div>
                                <div className="fieldwork-hud-meta">
                                    <span className="hud-meta-badge">01 // COMMUNITY DEFENSE</span>
                                    <span className="hud-gps-coords">28.6139° N, 77.2090° E</span>
                                </div>
                                <div className="fieldwork-card-body">
                                    <div className="fieldwork-card-info">
                                        <h4>Grassroots Legal Precedents</h4>
                                        <p>Protecting indigenous territorial rights through federal court filings.</p>
                                    </div>
                                    <div className="fieldwork-arrow-btn">
                                        <ArrowUpRight size={22} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="fieldwork-card-wrapper">
                        <div className="fieldwork-card">
                            <div className="fieldwork-img-container">
                                <Image 
                                    src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Ancestral Forest Cartography" 
                                    width={1200} 
                                    height={800} 
                                />
                                <div className="fieldwork-card-overlay"></div>
                                <div className="fieldwork-hud-meta">
                                    <span className="hud-meta-badge">02 // SATELLITE CARTOGRAPHY</span>
                                    <span className="hud-gps-coords">23.6102° N, 85.2799° E</span>
                                </div>
                                <div className="fieldwork-card-body">
                                    <div className="fieldwork-card-info">
                                        <h4>High-Resolution Territory Mapping</h4>
                                        <p>Deploying spatial satellite analytics to survey ancestral forest boundaries.</p>
                                    </div>
                                    <div className="fieldwork-arrow-btn">
                                        <Compass size={22} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="fieldwork-card-wrapper">
                        <div className="fieldwork-card">
                            <div className="fieldwork-img-container">
                                <Image 
                                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Habitat Protection Sanctuary" 
                                    width={1200} 
                                    height={800} 
                                />
                                <div className="fieldwork-card-overlay"></div>
                                <div className="fieldwork-hud-meta">
                                    <span className="hud-meta-badge">03 // HABITAT RESTORATION</span>
                                    <span className="hud-gps-coords">30.0668° N, 79.0193° E</span>
                                </div>
                                <div className="fieldwork-card-body">
                                    <div className="fieldwork-card-info">
                                        <h4>Critical Habitat Protection</h4>
                                        <p>Reforestation monitoring and biodiversity sanctuary defense networks.</p>
                                    </div>
                                    <div className="fieldwork-arrow-btn">
                                        <ShieldCheck size={22} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
