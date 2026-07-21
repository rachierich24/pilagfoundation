import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import DriveModal from '../DriveModal';

const drives = [
    { title: 'DTU Plantation Drive', location: 'Delhi', date: 'April 5, 2026', impact: '300 Trees Planned', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600' },
    { title: 'Yamuna Riverbank Cleanup', location: 'Delhi NCR', date: 'April 12, 2026', impact: '2 km Stretch', img: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1600' },
    { title: 'Green Awareness Walk', location: 'Noida', date: 'April 19, 2026', impact: '500 Citizens Reached', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600' },
    { title: 'Jharkhand Forest Mapping', location: 'Jharkhand', date: 'May 3, 2026', impact: '400 ha Surveyed', img: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600' },
];

export default function MuseumDrives() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeDrive, setActiveDrive] = useState<(typeof drives)[0] | null>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            const horizontalWrapper = document.getElementById('horizontal-wrapper');
            const horizontalContainer = document.getElementById('horizontal-container');
            if (horizontalWrapper && horizontalContainer) {
                // Add extra scroll so the last panel fully enters view
                const totalWidth = horizontalContainer.scrollWidth;
                const viewportW = window.innerWidth;
                const scrollDist = totalWidth - viewportW;
                const museumTl = gsap.timeline({
                    scrollTrigger: { trigger: horizontalWrapper, pin: true, scrub: 1, start: "top top", end: () => `+=${scrollDist}`, anticipatePin: 1 }
                });
                museumTl.to(horizontalContainer, { x: -scrollDist, ease: "none" }, 0);
                museumTl.to('.timeline-progress-bar', { width: '100%', ease: "none" }, 0);

                gsap.utils.toArray('.outlined-dark').forEach((text) => {
                    gsap.to(text as HTMLElement, { x: -200, scrollTrigger: { trigger: horizontalWrapper, scrub: 2 } });
                });

                gsap.utils.toArray('.drive-card').forEach(card => {
                    const el = card as HTMLElement;
                    // Base scroll parallax rotation
                    const tl = gsap.timeline({ scrollTrigger: { trigger: horizontalWrapper, scrub: 1 } });
                    tl.fromTo(el, { rotateY: -25, rotateX: 5, z: -100 }, { rotateY: 25, rotateX: -5, z: 0 });

                    // Interactive 3D mouse tracking
                    el.addEventListener('mousemove', (e) => {
                        const rect = el.getBoundingClientRect();
                        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
                        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
                        gsap.to(el, { rotateY: xPos * 30, rotateX: -yPos * 30, z: 50, duration: 0.5, ease: 'power2.out' });
                    });
                    el.addEventListener('mouseleave', () => {
                        gsap.to(el, { rotateY: 0, rotateX: 0, z: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
                    });
                });
            }
        });

        mm.add("(max-width: 768px)", () => {
            gsap.utils.toArray('.gs-fade-up, .drive-card').forEach(elem => {
                gsap.fromTo(elem as HTMLElement, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: elem as HTMLElement, start: 'top 90%' }
                });
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            {/* Horizontal Scrolling Drives */}
            <section id="horizontal-wrapper" className="horizontal-wrapper drives-section" style={{ perspective: '1200px' }}>
                <div className="timeline-progress-container">
                    <div className="timeline-progress-bar"></div>
                </div>
                <div id="horizontal-container" className="horizontal-container" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Section Intro Panel */}
                    <div className="museum-panel drive-intro-panel">
                        <div className="drive-intro-content">
                            <span className="section-eyebrow" style={{ color: '#22c55e', display: 'block', marginBottom: '1.5rem' }}>Take Action</span>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)', fontWeight: 900,
                                fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 0.9,
                                color: 'transparent',
                                WebkitTextStroke: '2px #F9F6F0',
                                marginBottom: '2rem', letterSpacing: '-0.02em'
                            }}>UPCOMING<br />DRIVES</h2>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: '280px', lineHeight: 1.7 }}>Scroll to explore upcoming climate drives near you.</p>
                            <div className="scroll-hint">
                                <span className="scroll-hint-arrow">→</span>
                                <span className="scroll-hint-text">Scroll to explore</span>
                            </div>
                        </div>
                    </div>

                    {/* Drive Cards */}
                    {drives.map((drive, i) => (
                        <div key={i} className="museum-panel drive-panel">
                            <div className="drive-card">
                                <div className="drive-card-img-wrap">
                                    <Image src={drive.img} alt={drive.title} className="drive-card-img" width={1600} height={1067} />
                                    <div className="drive-card-overlay"></div>
                                </div>
                                <div className="drive-card-content">
                                    <span className="drive-tag">{drive.date}</span>
                                    <h3 className="drive-title">{drive.title}</h3>
                                    <div className="drive-meta">
                                        <span>📍 {drive.location}</span>
                                        <span>🌱 {drive.impact}</span>
                                    </div>
                                    <button className="drive-join-btn btn-magnetic" onClick={() => setActiveDrive(drive)}>
                                        Join Drive
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* See All Drives Banner */}
            <section className="see-all-drives-banner">
                <div className="see-all-drives-inner">
                    <div className="see-all-drives-text">
                        <span className="section-eyebrow" style={{ color: '#22c55e' }}>Ready to Act?</span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F9F6F0', fontWeight: 800, lineHeight: 1.05, margin: '0.75rem 0 0' }}>
                            Find drives near you
                        </h2>
                    </div>
                    <Link href="/drives" className="drive-join-btn" style={{ flexShrink: 0, padding: '1.1rem 2.8rem', fontSize: '0.95rem' }}>
                        See All Drives →
                    </Link>
                </div>
            </section>

            {activeDrive && (
                <DriveModal
                    onClose={() => setActiveDrive(null)}
                    drive={activeDrive}
                />
            )}
        </div>
    );
}
