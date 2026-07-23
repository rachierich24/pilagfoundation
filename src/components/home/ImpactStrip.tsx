import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TreePine, Users, Globe, Award, Activity } from 'lucide-react';

export default function ImpactStrip() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const stats = [
            { id: 'stat-trees', end: 120000, suffix: '+' },
            { id: 'stat-volunteers', end: 3800, suffix: '+' },
            { id: 'stat-hectares', end: 1200000, suffix: '+' },
            { id: 'stat-precedents', end: 47, suffix: '' }
        ];
        
        stats.forEach(stat => {
            const el = document.getElementById(stat.id);
            if (el) {
                gsap.to({ val: 0 }, {
                    val: stat.end, 
                    duration: 2.2, 
                    ease: 'power2.out',
                    scrollTrigger: { 
                        trigger: containerRef.current, 
                        start: 'top 85%' 
                    },
                    onUpdate: function () {
                        const currentVal = Math.floor(this.targets()[0].val);
                        if (stat.end >= 1000000) {
                            el.textContent = (currentVal / 1000000).toFixed(1) + 'M' + stat.suffix;
                        } else {
                            el.textContent = currentVal.toLocaleString() + stat.suffix;
                        }
                    }
                });
            }
        });
    }, { scope: containerRef });

    return (
        <section className="impact-strip" ref={containerRef}>
            <div className="impact-strip-container">
                {/* Header HUD Tag */}
                <div className="impact-hud-header">
                    <div className="impact-hud-badge">
                        <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span>REAL-TIME ECOLOGICAL METRICS // AUDITED IMPACT</span>
                    </div>
                </div>

                <div className="impact-strip-inner">
                    {/* Stat 1 */}
                    <div className="impact-stat-item">
                        <div className="impact-icon-wrap">
                            <TreePine size={24} />
                        </div>
                        <span className="impact-stat-number" id="stat-trees">0</span>
                        <span className="impact-stat-label">Trees Planted</span>
                    </div>

                    {/* Stat 2 */}
                    <div className="impact-stat-item">
                        <div className="impact-icon-wrap">
                            <Users size={24} />
                        </div>
                        <span className="impact-stat-number" id="stat-volunteers">0</span>
                        <span className="impact-stat-label">Volunteers Mobilized</span>
                    </div>

                    {/* Stat 3 */}
                    <div className="impact-stat-item">
                        <div className="impact-icon-wrap">
                            <Globe size={24} />
                        </div>
                        <span className="impact-stat-number" id="stat-hectares">0</span>
                        <span className="impact-stat-label">Hectares Protected</span>
                    </div>

                    {/* Stat 4 */}
                    <div className="impact-stat-item">
                        <div className="impact-icon-wrap">
                            <Award size={24} />
                        </div>
                        <span className="impact-stat-number" id="stat-precedents">0</span>
                        <span className="impact-stat-label">Legal Precedents Set</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
