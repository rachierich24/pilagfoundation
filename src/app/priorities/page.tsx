"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const priorities = [
    {
        id: "p1",
        title: "CLIMATE RESILIENCE",
        desc: "Funding localized infrastructure and agroforestry systems designed to withstand extreme, compounding weather events while regenerating deep soil health.",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1500"
    },
    {
        id: "p2",
        title: "INDIGENOUS RIGHTS",
        desc: "Capitalizing sovereign legal defense funds to protect frontline environmental defenders and rapidly prosecute illegal industrial land grabs at the highest courts.",
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1500"
    },
    {
        id: "p3",
        title: "SOVEREIGN DATA",
        desc: "Equipping communities with drones, GIS training, and encrypted networks to securely map their own ancestral lands and enforce their territorial borders.",
        img: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1500"
    },
    {
        id: "p4",
        title: "POLICY REFORM",
        desc: "Drafting aggressive international frameworks that force carbon accountability, dismantle colonial extraction subsidies, and redefine global supply chains.",
        img: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?q=80&w=1500"
    }
];

export default function PrioritiesCinematicPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // 2. Animate Hero
    gsap.fromTo('.prio-hero-title', 
        { y: 100, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.5, ease: 'power4.out' }
    );

    // 3. Scroll-Spy Crossfade Gallery
    const texts = gsap.utils.toArray('.prio-text-block') as HTMLElement[];
    const images = gsap.utils.toArray('.prio-img-layer') as HTMLElement[];

    gsap.set(images, { opacity: 0, scale: 1.1 });
    if(images[0]) gsap.set(images[0], { opacity: 1, scale: 1 }); // show first

    texts.forEach((text, i) => {
        ScrollTrigger.create({
            trigger: text,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                // Fade out all images
                gsap.to(images, { opacity: 0, scale: 1.1, duration: 0.8, ease: "power2.inOut" });
                // Fade in current
                gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.inOut" });
                // Dim all texts
                gsap.to(texts, { opacity: 0.3, duration: 0.4 });
                // Highlight current text
                gsap.to(text, { opacity: 1, duration: 0.4 });
            },
            onEnterBack: () => {
                gsap.to(images, { opacity: 0, scale: 1.1, duration: 0.8, ease: "power2.inOut" });
                gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.inOut" });
                gsap.to(texts, { opacity: 0.3, duration: 0.4 });
                gsap.to(text, { opacity: 1, duration: 0.4 });
            }
        });
    });

    return () => { lenis.destroy(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, { scope: containerRef });

  return (
    <main ref={containerRef} style={{ background: '#050505', color: '#EADFC8', minHeight: '100vh' }}>
        
        {/* HERO */}
        <section style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5vw', position: 'relative', zIndex: 10 }}>
            <p className="uppercase-label uppercase-label-dark" style={{ marginBottom: '2rem', color: 'rgba(234, 223, 200, 0.6)' }}>Our Work</p>
            <h1 className="text-colossal prio-hero-title" style={{ color: '#FFF', fontSize: 'clamp(5rem, 10vw, 12rem)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: 0 }}>
                CORE<br/>PRIORITIES
            </h1>
        </section>

        {/* STICKY SCROLL-SPY SECTION */}
        <section style={{ position: 'relative', width: '100vw', paddingBottom: '20vh' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw' }}>
                
                {/* Left Side: Pinned Canvas for Crossfading Images */}
                <div style={{ position: 'relative', height: '100vh' }}>
                    <div style={{ position: 'sticky', top: '20vh', width: '40vw', height: '60vh', marginLeft: '5vw', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
                        {priorities.map((p, i) => (
                            <img 
                                key={`img-${p.id}`} 
                                className="prio-img-layer" 
                                src={p.img} 
                                alt={p.title} 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Heavy Scrolling Text Blocks */}
                <div style={{ paddingRight: '5vw', paddingTop: '30vh', paddingBottom: '30vh' }}>
                    {priorities.map((p, i) => (
                        <div key={`txt-${p.id}`} className="prio-text-block" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: i === 0 ? 1 : 0.3, transition: 'opacity 0.4s ease' }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', letterSpacing: '0.2em', opacity: 0.5, marginBottom: '1rem' }}>0{i + 1} // PRIORITY</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 5vw, 6rem)', color: '#FFF', lineHeight: 1, margin: '0 0 2rem 0' }}>{p.title}</h2>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', lineHeight: 1.6, opacity: 0.8, maxWidth: '600px' }}>{p.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>

    </main>
  );
}
