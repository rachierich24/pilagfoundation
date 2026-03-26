"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import Link from 'next/link';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutCinematicPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroImgRef = useRef<HTMLImageElement>(null);
    const statementRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
        function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);

        // Parallax Hero Image
        if (heroImgRef.current) {
            gsap.to(heroImgRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: '.hero-parallax-container',
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // Split Text Reveal
        const words = statementRef.current?.querySelectorAll('.word');
        if (words && words.length > 0) {
            gsap.from(words, {
                y: 80,
                opacity: 0,
                rotationX: -60,
                transformOrigin: "0% 50% -50",
                duration: 1.2,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: statementRef.current,
                    start: "top 85%"
                }
            });
        }

        // Image stagger reveals
        gsap.utils.toArray('.reveal-img').forEach((img: any) => {
            gsap.from(img, {
                opacity: 0,
                y: 100,
                scale: 0.95,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 85%"
                }
            });
        });

        return () => { lenis.destroy(); ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, { scope: containerRef });

    const statement = "We bridge the gap between grassroots realities and global policy.";
    
    return (
        <main ref={containerRef} style={{ background: '#0A0F11', color: '#EADFC8', minHeight: '100vh', overflowX: 'hidden' }}>
            
            {/* HERO */}
            <section className="hero-parallax-container" style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', zIndex: 0 }}>
                    <img ref={heroImgRef} src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2500" alt="Canopy" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                </div>
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <h1 className="text-colossal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(5rem, 12vw, 15rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#EADFC8', margin: 0 }}>ORIGINS</h1>
                    <p style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: '2rem', opacity: 0.8 }}>The Foundation</p>
                </div>
            </section>

            {/* MISSION */}
            <section style={{ padding: '25vh 5vw', display: 'flex', justifyContent: 'center' }}>
                <h2 ref={statementRef} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, maxWidth: '1200px', textAlign: 'center', margin: 0 }}>
                    {statement.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', padding: '0 0.3rem', verticalAlign: 'top' }}>
                            <span className="word" style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}>{word}</span>
                        </span>
                    ))}
                </h2>
            </section>

            {/* STICKY LAYOUT */}
            <section style={{ padding: '0 5vw 20vh 5vw' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8rem', alignItems: 'flex-start' }}>
                    {/* Left Sticky Col */}
                    <div style={{ position: 'sticky', top: '25vh', paddingRight: '2rem' }}>
                        <p className="sv-taxonomy" style={{ marginBottom: '2rem', color: 'rgba(234, 223, 200, 0.6)' }}>OUR MANDATE</p>
                        <h3 className="sv-body-lead" style={{ marginBottom: '3rem', color: '#FFF' }}>
                            Equipping the most vulnerable global populations with the legal, technological, and financial resources required to halt systemic ecological collapse.
                        </h3>
                        <Link href="/impact" className="btn btn-outline" style={{ borderColor: '#EADFC8', color: '#EADFC8', padding: '1rem 2rem' }}>Analyze Our Impact</Link>
                    </div>

                    {/* Right Scrolling Col */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15vh' }}>
                        <div>
                            <img className="reveal-img" src="https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1000" style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2.5rem' }} alt="Field Work" />
                            <p style={{ fontSize: '1.4rem', lineHeight: 1.6, opacity: 0.8, color: '#EADFC8' }}>For over a decade, PILAG has operated at the intersection of environmental justice and sovereign data. We believe that communities cannot defend what they cannot map, prove, or physically secure.</p>
                        </div>
                        <div>
                            <img className="reveal-img" src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000" style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2.5rem' }} alt="Community" />
                            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1.5rem', color: '#FFF' }}>Our Global Footprint</h4>
                            <p style={{ fontSize: '1.4rem', lineHeight: 1.6, opacity: 0.8, color: '#EADFC8' }}>Active in 14 countries, our interventions have directly established sovereign protections for over 2.5 million hectares of ancestral land, legally blocking illegal extraction pipelines.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
