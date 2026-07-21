import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ImpactStrip() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const stats = [
            { id: 'stat-trees', end: 120000, suffix: '+' },
            { id: 'stat-volunteers', end: 3800, suffix: '+' },
            { id: 'stat-campaigns', end: 47, suffix: '' }
        ];
        
        stats.forEach(stat => {
            const el = document.getElementById(stat.id);
            if (el) {
                gsap.to({ val: 0 }, {
                    val: stat.end, duration: 2, ease: 'power2.out',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
                    onUpdate: function () {
                        el.textContent = Math.floor(this.targets()[0].val).toLocaleString() + stat.suffix;
                    }
                });
            }
        });
    }, { scope: containerRef });

    return (
        <section className="impact-strip" ref={containerRef}>
            <div className="impact-strip-inner">
                <div className="impact-stat gs-fade-up">
                    <span className="impact-stat-number" id="stat-trees">0</span>
                    <span className="impact-stat-label">Trees Planted</span>
                </div>
                <div className="impact-stat gs-fade-up">
                    <span className="impact-stat-number" id="stat-volunteers">0</span>
                    <span className="impact-stat-label">Volunteers Joined</span>
                </div>
                <div className="impact-stat gs-fade-up">
                    <span className="impact-stat-number" id="stat-campaigns">0</span>
                    <span className="impact-stat-label">Campaigns Executed</span>
                </div>
            </div>
        </section>
    );
}
