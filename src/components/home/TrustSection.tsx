import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function TrustSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.trust-bar-fill').forEach((bar: any) => {
            gsap.to(bar, {
                width: bar.getAttribute('data-pct') + '%', duration: 1.5, ease: 'expo.out',
                scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
            });
        });
    }, { scope: containerRef });

    return (
        <section className="trust-section" ref={containerRef}>
            <div className="trust-inner">
                <span className="trust-eyebrow">Transparency</span>
                <h2 className="trust-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>Where your money goes</h2>
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
    );
}
