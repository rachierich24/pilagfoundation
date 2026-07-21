import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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

        // 3. Parallax Rapid
        gsap.utils.toArray('.parallax-rapid').forEach((el: any) => {
            const speed = parseFloat(el.getAttribute('data-speed') || '1');
            gsap.to(el, {
                y: () => speed * 80,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        });

        // 4. Desktop Pinned Gallery
        mm.add("(min-width: 769px)", () => {
            const pinnedSection = document.getElementById('pinned-quotes');
            const pinnedSlides = gsap.utils.toArray('.pinned-slide') as HTMLElement[];
            if (pinnedSection && pinnedSlides.length > 0) {
                gsap.set(pinnedSlides[0], { autoAlpha: 1 });
                gsap.set(pinnedSlides[0].querySelector('.pinned-bg-wrapper'), { clipPath: 'inset(0 0 0 0%)' });
                gsap.set(pinnedSlides[0].querySelector('.pinned-content'), { y: 0, autoAlpha: 1 });

                const galleryTl = gsap.timeline({
                    scrollTrigger: { trigger: pinnedSection, start: "top top", end: "+=250%", scrub: 1, pin: true, anticipatePin: 1 }
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
        });

        // 5. Mobile Fixes for Pinned Gallery
        mm.add("(max-width: 768px)", () => {
            gsap.set('.pinned-gallery-wrapper', { height: 'auto', overflow: 'visible' });
            gsap.set('.pinned-gallery-container', { height: 'auto', position: 'relative' });
            gsap.set('.pinned-slide', {
                position: 'relative', opacity: 1, visibility: 'visible',
                height: 'auto', minHeight: '100vh'
            });
            gsap.set('.pinned-bg-wrapper', { clipPath: 'none', width: '100%', position: 'relative', height: '60vh' });
            gsap.set('.pinned-content', { transform: 'none', opacity: 1, position: 'relative', left: 0, padding: '3rem 5vw' });
            gsap.set('.stat-popup', { opacity: 1, scale: 1 });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            {/* MARQUEE */}
            <section style={{ padding: '10vh 0', overflow: 'hidden' }}>
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

            {/* MANDATE / SCRUB TEXT */}
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
                        <Link href="/about" className="btn btn-primary btn-magnetic">Discover Our Mission</Link>
                    </div>
                </div>
            </section>

            {/* PINNED EDITORIAL GALLERY */}
            <section id="pinned-quotes" className="pinned-gallery-wrapper">
                <div className="gallery-orb"></div>
                <div className="pinned-gallery-container">
                    {/* Slide 1 */}
                    <div className="pinned-slide active">
                        <div className="pinned-bg-wrapper">
                            <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000" alt="Child in nature" className="pinned-bg" width={2000} height={1333} />
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
                            <Image src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2000" alt="Mapping" className="pinned-bg" width={2000} height={1333} />
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
                            <Image src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000" alt="Deforestation" className="pinned-bg" width={2000} height={1333} />
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

            {/* SCATTER PARALLAX */}
            <section className="section gallery-scatter">
                <div className="scatter-img scatter-1 parallax-rapid" data-speed="0.8">
                    <Image src="https://images.unsplash.com/photo-1593113589914-075992c80da5?q=80&w=1000&auto=format&fit=crop" alt="Community" width={1000} height={667} />
                </div>
                <div className="scatter-img scatter-2 parallax-rapid" data-speed="-1.2">
                    <h2 className="text-colossal" style={{ position: 'absolute', top: '-10%', right: '-20%', zIndex: 5, fontSize: '10rem', WebkitTextStroke: '2px var(--clr-primary)', opacity: 0.3, color: 'transparent' }}>POWER</h2>
                    <Image src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000&auto=format&fit=crop" alt="Mapping" width={1000} height={667} />
                </div>
                <div className="scatter-img scatter-3 parallax-rapid" data-speed="1.5">
                    <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" alt="Action" width={1000} height={667} />
                </div>
            </section>
        </div>
    );
}
