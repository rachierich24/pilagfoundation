import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function FinalCTA() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctaLines = gsap.utils.toArray('.cta-line');
        if (ctaLines.length > 0) {
            const ctaTl = gsap.timeline({
                scrollTrigger: { trigger: containerRef.current, start: 'top 40%' }
            });
            ctaLines.forEach((line: any, i) => {
                ctaTl.to(line, { color: '#FFF', duration: 0.5 }, i * 0.3); // directly animating color since className swaps can be buggy in React strict mode
            });
            ctaTl.to('.final-cta-buttons', { opacity: 1, y: 0, duration: 1 }, "+=0.2");
        }
    }, { scope: containerRef });

    return (
        <section className="final-cta-section" ref={containerRef}>
            <div className="final-cta-bg-orb"></div>
            <div className="final-cta-inner">
                <span className="cta-line">You've seen the problem.</span>
                <span className="cta-line">You've seen the action.</span>
                <span className="cta-line">Now be part of it.</span>
                <div className="final-cta-buttons">
                    <Link href="/support" className="btn-volunteer btn-magnetic">Register as Volunteer</Link>
                    <Link href="/support" className="btn-donate-cta btn-magnetic">Donate</Link>
                </div>
            </div>
        </section>
    );
}
