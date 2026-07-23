import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MapPin, Calendar, TreePine, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import DriveModal from '../DriveModal';

const drives = [
    { 
        title: 'DTU Plantation Drive', 
        location: 'Delhi', 
        date: 'April 5, 2026', 
        impact: '300 Trees Planned', 
        img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600', 
        num: '01',
        icon: TreePine
    },
    { 
        title: 'Yamuna Riverbank Cleanup', 
        location: 'Delhi NCR', 
        date: 'April 12, 2026', 
        impact: '2 km Stretch', 
        img: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1600', 
        num: '02',
        icon: Shield
    },
    { 
        title: 'Green Awareness Walk', 
        location: 'Noida', 
        date: 'April 19, 2026', 
        impact: '500 Citizens Reached', 
        img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600', 
        num: '03',
        icon: Zap
    },
    { 
        title: 'Jharkhand Forest Mapping', 
        location: 'Jharkhand', 
        date: 'May 3, 2026', 
        impact: '400 ha Surveyed', 
        img: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600', 
        num: '04',
        icon: Sparkles
    },
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
            const activeIdxEl = document.getElementById('drive-active-idx');

            if (horizontalWrapper && horizontalContainer) {
                const totalWidth = horizontalContainer.scrollWidth;
                const viewportW = window.innerWidth;
                const scrollDist = totalWidth - viewportW;

                const museumTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: horizontalWrapper,
                        pin: true,
                        scrub: 0.8,
                        start: "top top",
                        end: () => `+=${scrollDist}`,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const idx = Math.min(drives.length, Math.floor(progress * drives.length) + 1);
                            if (activeIdxEl) {
                                activeIdxEl.textContent = idx.toString().padStart(2, '0');
                            }

                            // Update active state on floating node markers
                            const nodeMarkers = containerRef.current?.querySelectorAll('.timeline-node-marker');
                            nodeMarkers?.forEach((marker, i) => {
                                const stepThreshold = (i + 0.5) / drives.length;
                                if (progress >= stepThreshold - 0.15) {
                                    marker.classList.add('active');
                                } else {
                                    marker.classList.remove('active');
                                }
                            });
                        }
                    }
                });

                // Main container horizontal scroll
                museumTl.to(horizontalContainer, { x: -scrollDist, ease: "none" }, 0);
                museumTl.to('.timeline-progress-bar', { width: '100%', ease: "none" }, 0);

                // Reactive background orb movement
                museumTl.to('.reactive-orb-1', { x: 400, y: 150, scale: 1.3, ease: "none" }, 0);
                museumTl.to('.reactive-orb-2', { x: -350, y: -100, scale: 1.2, ease: "none" }, 0);

                // Watermark numbers parallax scrubbing
                gsap.utils.toArray('.watermark-num').forEach((wm) => {
                    gsap.to(wm as HTMLElement, {
                        x: -180,
                        ease: "none",
                        scrollTrigger: { trigger: horizontalWrapper, scrub: 1 }
                    });
                });

                // Interactive 3D mouse tracking for drive cards
                gsap.utils.toArray('.drive-card').forEach((card) => {
                    const el = card as HTMLElement;

                    el.addEventListener('mousemove', (e) => {
                        const rect = el.getBoundingClientRect();
                        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
                        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
                        gsap.to(el, {
                            rotateY: xPos * 20,
                            rotateX: -yPos * 20,
                            z: 30,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    });

                    el.addEventListener('mouseleave', () => {
                        gsap.to(el, {
                            rotateY: 0,
                            rotateX: 0,
                            z: 0,
                            duration: 0.8,
                            ease: 'elastic.out(1, 0.5)'
                        });
                    });
                });
            }
        });

        mm.add("(max-width: 768px)", () => {
            gsap.utils.toArray('.drive-card').forEach((elem) => {
                gsap.fromTo(elem as HTMLElement, 
                    { y: 40, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: elem as HTMLElement, start: 'top 85%' } }
                );
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            {/* Horizontal Scrolling Exhibit */}
            <section id="horizontal-wrapper" className="horizontal-wrapper drives-section">
                
                {/* Reactive Background Ambient Orbs */}
                <div className="reactive-orb-1"></div>
                <div className="reactive-orb-2"></div>

                {/* Timeline Progress HUD */}
                <div className="timeline-hud">
                    <div className="timeline-counter">
                        <span className="timeline-counter-active" id="drive-active-idx">01</span>
                        <span>/</span>
                        <span>04</span>
                    </div>
                    <div className="timeline-progress-container">
                        <div className="timeline-progress-bar"></div>
                    </div>
                </div>

                <div id="horizontal-container" className="horizontal-container" style={{ transformStyle: 'preserve-3d' }}>
                    
                    {/* Section Intro Panel */}
                    <div className="museum-panel drive-intro-panel">
                        <div className="drive-intro-content">
                            <span className="section-eyebrow" style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 700 }}>
                                <Sparkles className="w-4 h-4 text-emerald-400" /> Grassroots Action Pipeline
                            </span>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 900,
                                fontSize: 'clamp(2.8rem, 4.8vw, 5.2rem)',
                                lineHeight: 0.95,
                                background: 'linear-gradient(135deg, #F9F6F0 40%, #34d399 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '1.8rem',
                                letterSpacing: '-0.02em'
                            }}>UPCOMING<br />DRIVES</h2>
                            <p style={{ color: '#EADFCF', fontSize: '1.05rem', maxWidth: '340px', lineHeight: 1.65, opacity: 0.88 }}>
                                Scroll horizontally through our live ecological action workflow across India.
                            </p>
                            <div className="scroll-hint">
                                <span className="scroll-hint-arrow">→</span>
                                <span className="scroll-hint-text">Scroll to explore</span>
                            </div>
                        </div>
                    </div>

                    {/* Drive Cards */}
                    {drives.map((drive, i) => {
                        const IconComp = drive.icon;
                        return (
                            <div key={i} className="museum-panel drive-panel">
                                {/* Floating Timeline Step Node */}
                                <div className={`timeline-node-marker ${i === 0 ? 'active' : ''}`}>
                                    <div className="node-pulse-ring"></div>
                                    <span>{drive.num}</span>
                                </div>

                                {/* Watermark Num Background */}
                                <div className="watermark-num">{drive.num}</div>

                                <div className="drive-card">
                                    <div className="drive-card-img-wrap">
                                        <Image src={drive.img} alt={drive.title} className="drive-card-img" width={1600} height={1067} priority={i === 0} />
                                        <div className="drive-card-overlay"></div>
                                    </div>
                                    <div className="drive-card-content">
                                        <div className="drive-badge-row">
                                            <span className="drive-tag">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {drive.date}
                                            </span>
                                        </div>
                                        <h3 className="drive-title">{drive.title}</h3>
                                        <div className="drive-meta">
                                            <span><MapPin className="w-3.5 h-3.5 text-emerald-400" /> {drive.location}</span>
                                            <span><IconComp className="w-3.5 h-3.5 text-emerald-400" /> {drive.impact}</span>
                                        </div>
                                        <button className="drive-join-btn btn-magnetic" onClick={() => setActiveDrive(drive)}>
                                            <span>Join Drive</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* See All Drives Banner */}
            <section className="see-all-drives-banner">
                <div className="see-all-drives-inner">
                    <div className="see-all-drives-text">
                        <span className="section-eyebrow" style={{ color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Zap className="w-4 h-4" /> Ready to Act?
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#F9F6F0', fontWeight: 800, lineHeight: 1.05, margin: '0.5rem 0 0' }}>
                            Find drives near your city
                        </h2>
                    </div>
                    <Link href="/drives" className="see-all-btn btn-magnetic">
                        <span>See All Drives</span>
                        <ArrowRight className="w-4 h-4" />
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
