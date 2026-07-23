"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import '../../styles/sections/About.css';

export default function AboutCinematicPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroImgRef = useRef<HTMLImageElement>(null);
    const statementRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

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
        // @ts-ignore
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
        <main ref={containerRef} className="about-main">
            {/* Ambient Background Glow */}
            <div className="about-ambient-glow"></div>

            {/* HERO */}
            <section className="about-hero-section hero-parallax-container">
                <div className="about-hero-bg">
                    <img
                        ref={heroImgRef}
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2500"
                        alt="Canopy"
                        className="about-hero-img"
                    />
                    <div className="about-hero-overlay"></div>
                </div>
                <div className="about-hero-content">

                    <h1 className="about-title-colossal">ORIGINS</h1>
                    <p className="about-subtitle">The Foundation</p>
                </div>
            </section>

            {/* MISSION */}
            <section className="about-mission-section">
                <h2 ref={statementRef} className="about-mission-heading">
                    {statement.split(' ').map((word, i) => (
                        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', padding: '0 0.35rem', verticalAlign: 'top' }}>
                            <span className="word" style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}>
                                {word === "grassroots" || word === "realities" || word === "global" || word === "policy." ? (
                                    <span className="about-mission-highlight">{word}</span>
                                ) : (
                                    word
                                )}
                            </span>
                        </span>
                    ))}
                </h2>
            </section>

            {/* STICKY LAYOUT */}
            <section className="about-mandate-section">
                <div className="about-mandate-grid">
                    {/* Left Sticky Col */}
                    <div className="about-sticky-col">
                        <div className="mandate-hud-tag">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>OUR MANDATE</span>
                        </div>
                        <h3 className="mandate-lead-body">
                            Equipping the most vulnerable global populations with the legal, technological, and financial resources required to halt systemic ecological collapse.
                        </h3>
                        <Link href="/impact" className="about-cta-btn">
                            <span>Analyze Our Impact</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Right Scrolling Col */}
                    <div className="about-scroll-col">
                        <div className="about-dossier-card">
                            <div className="about-img-frame">
                                <img
                                    className="reveal-img"
                                    src="https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1000"
                                    alt="Field Work"
                                />
                            </div>
                            <p className="about-card-text">
                                For over a decade, PILAG has operated at the intersection of environmental justice and sovereign data. We believe that communities cannot defend what they cannot map, prove, or physically secure.
                            </p>
                        </div>

                        <div className="about-dossier-card">
                            <div className="about-img-frame">
                                <img
                                    className="reveal-img"
                                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000"
                                    alt="Community"
                                />
                            </div>
                            <h4 className="about-card-heading">Our Global Footprint</h4>
                            <p className="about-card-text">
                                Active in 14 countries, our interventions have directly established sovereign protections for over 2.5 million hectares of ancestral land, legally blocking illegal extraction pipelines.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
