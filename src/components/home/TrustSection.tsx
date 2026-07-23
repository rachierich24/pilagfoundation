'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TreePine, Scale, Users, ShieldCheck, Activity, Sparkles, PieChart } from 'lucide-react';
import '../../styles/sections/Trust.css';

export default function TrustSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const allocations = [
        {
            pct: 70,
            title: "Direct Field Projects",
            color: "#10B981",
            icon: TreePine,
            desc: "70% directly powers native seed banking, forest restoration & geospatial boundary telemetry.",
            items: [
                { label: "Native Forest Reforestation", val: "40%" },
                { label: "Land Boundary Telemetry", val: "20%" },
                { label: "Clean Water Infrastructure", val: "10%" }
            ]
        },
        {
            pct: 20,
            title: "Research & Litigation",
            color: "#34D399",
            icon: Scale,
            desc: "20% funds High Court & Supreme Court environmental PILs, defending indigenous land rights.",
            items: [
                { label: "High Court & Supreme Court Writs", val: "12%" },
                { label: "Ecological Policy Audits", val: "8%" }
            ]
        },
        {
            pct: 10,
            title: "Community Outreach",
            color: "#6EE7B7",
            icon: Users,
            desc: "10% supports Gram Sabha governance workshops & youth eco-leadership training.",
            items: [
                { label: "Gram Sabha Council Workshops", val: "6%" },
                { label: "Youth Eco-Leadership Training", val: "4%" }
            ]
        }
    ];

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo('.pie-segment-path',
            { strokeDashoffset: 880 },
            {
                strokeDashoffset: 0,
                duration: 2.2,
                ease: 'power3.out',
                scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
            }
        );
    }, { scope: containerRef });

    return (
        <section className="trust-section" ref={containerRef}>
            <div className="trust-bg-glow"></div>

            <div className="trust-inner">
                {/* HUD Header */}
                <div className="trust-hud-header">
                    <div className="trust-hud-badge">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AUDITED FINANCIAL ALLOCATION // FY 2025-26</span>
                    </div>
                </div>

                <h2 className="trust-heading">
                    WHERE YOUR <span className="trust-heading-highlight">MONEY GOES.</span>
                </h2>
                <p className="trust-subtext">
                    100% verified capital deployment powering frontline ecological defense and grassroots tribal governance.
                </p>

                {/* COLOSSAL CENTRAL PIE / DONUT INFOGRAPHIC (UNIFIED MASTERPIECE) */}
                <div className="trust-master-visual">
                    
                    {/* Left Allocation Detail: 70% Field Projects */}
                    <div
                        className={`trust-callout-block block-left ${hoveredIndex === 0 ? 'highlighted' : ''}`}
                        onMouseEnter={() => setHoveredIndex(0)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="callout-header">
                            <div className="callout-icon-wrap" style={{ borderColor: '#10B981' }}>
                                <TreePine className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="callout-pct" style={{ color: '#10B981' }}>70%</span>
                        </div>
                        <h3 className="callout-title">Direct Field Projects</h3>
                        <p className="callout-desc">{allocations[0].desc}</p>
                        
                        <div className="callout-sub-list">
                            {allocations[0].items.map((sub, i) => (
                                <div key={i} className="callout-sub-item">
                                    <span className="sub-dot" style={{ background: '#10B981' }}></span>
                                    <span className="sub-txt">{sub.label}</span>
                                    <span className="sub-num" style={{ color: '#10B981' }}>{sub.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Center SVG Donut Ring Graphic */}
                    <div className="trust-center-donut-container">
                        <svg className="trust-donut-master-svg" viewBox="0 0 320 320">
                            <defs>
                                <linearGradient id="pie-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10B981" />
                                    <stop offset="100%" stopColor="#34D399" />
                                </linearGradient>
                                <linearGradient id="pie-g2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0D9488" />
                                    <stop offset="100%" stopColor="#2DD4BF" />
                                </linearGradient>
                                <linearGradient id="pie-g3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#047857" />
                                    <stop offset="100%" stopColor="#6EE7B7" />
                                </linearGradient>
                            </defs>

                            {/* Base Track */}
                            <circle cx="160" cy="160" r="120" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="22" />

                            {/* 70% Segment */}
                            <circle
                                cx="160" cy="160" r="120"
                                fill="none" stroke="url(#pie-g1)"
                                strokeWidth={hoveredIndex === 0 ? "30" : "24"}
                                strokeDasharray="527 754"
                                strokeDashoffset="0"
                                strokeLinecap="round"
                                className="pie-segment-path"
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    transform: 'rotate(-90deg)',
                                    transformOrigin: '50% 50%',
                                    cursor: 'pointer',
                                    filter: hoveredIndex === 0 ? 'drop-shadow(0 0 16px #10B981)' : 'none',
                                    transition: 'all 0.35s ease'
                                }}
                            />

                            {/* 20% Segment */}
                            <circle
                                cx="160" cy="160" r="120"
                                fill="none" stroke="url(#pie-g2)"
                                strokeWidth={hoveredIndex === 1 ? "30" : "24"}
                                strokeDasharray="150 754"
                                strokeDashoffset="-540"
                                strokeLinecap="round"
                                className="pie-segment-path"
                                onMouseEnter={() => setHoveredIndex(1)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    transform: 'rotate(-90deg)',
                                    transformOrigin: '50% 50%',
                                    cursor: 'pointer',
                                    filter: hoveredIndex === 1 ? 'drop-shadow(0 0 16px #2DD4BF)' : 'none',
                                    transition: 'all 0.35s ease'
                                }}
                            />

                            {/* 10% Segment */}
                            <circle
                                cx="160" cy="160" r="120"
                                fill="none" stroke="url(#pie-g3)"
                                strokeWidth={hoveredIndex === 2 ? "30" : "24"}
                                strokeDasharray="75 754"
                                strokeDashoffset="-698"
                                strokeLinecap="round"
                                className="pie-segment-path"
                                onMouseEnter={() => setHoveredIndex(2)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    transform: 'rotate(-90deg)',
                                    transformOrigin: '50% 50%',
                                    cursor: 'pointer',
                                    filter: hoveredIndex === 2 ? 'drop-shadow(0 0 16px #6EE7B7)' : 'none',
                                    transition: 'all 0.35s ease'
                                }}
                            />
                        </svg>

                        {/* Donut Center Display */}
                        <div className="donut-master-center">
                            <Sparkles className="w-5 h-5 text-emerald-400 mb-1" />
                            <span className="donut-master-num">100%</span>
                            <span className="donut-master-lbl">AUDITED DEPLOYMENT</span>
                        </div>
                    </div>

                    {/* Right Column: 20% Legal & 10% Outreach Callout Blocks */}
                    <div className="trust-right-col">
                        
                        {/* 20% Legal Litigation */}
                        <div
                            className={`trust-callout-block block-right ${hoveredIndex === 1 ? 'highlighted' : ''}`}
                            onMouseEnter={() => setHoveredIndex(1)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="callout-header">
                                <div className="callout-icon-wrap" style={{ borderColor: '#34D399' }}>
                                    <Scale className="w-5 h-5 text-emerald-400" />
                                </div>
                                <span className="callout-pct" style={{ color: '#34D399' }}>20%</span>
                            </div>
                            <h3 className="callout-title">Research & Legal Litigation</h3>
                            <p className="callout-desc">{allocations[1].desc}</p>
                            
                            <div className="callout-sub-list">
                                {allocations[1].items.map((sub, i) => (
                                    <div key={i} className="callout-sub-item">
                                        <span className="sub-dot" style={{ background: '#34D399' }}></span>
                                        <span className="sub-txt">{sub.label}</span>
                                        <span className="sub-num" style={{ color: '#34D399' }}>{sub.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 10% Community Outreach */}
                        <div
                            className={`trust-callout-block block-right ${hoveredIndex === 2 ? 'highlighted' : ''}`}
                            onMouseEnter={() => setHoveredIndex(2)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="callout-header">
                                <div className="callout-icon-wrap" style={{ borderColor: '#6EE7B7' }}>
                                    <Users className="w-5 h-5 text-emerald-400" />
                                </div>
                                <span className="callout-pct" style={{ color: '#6EE7B7' }}>10%</span>
                            </div>
                            <h3 className="callout-title">Community Outreach</h3>
                            <p className="callout-desc">{allocations[2].desc}</p>
                            
                            <div className="callout-sub-list">
                                {allocations[2].items.map((sub, i) => (
                                    <div key={i} className="callout-sub-item">
                                        <span className="sub-dot" style={{ background: '#6EE7B7' }}></span>
                                        <span className="sub-txt">{sub.label}</span>
                                        <span className="sub-num" style={{ color: '#6EE7B7' }}>{sub.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

                {/* Audited Footer Trust Note */}
                <div className="trust-footer-badge">
                    <div className="trust-footer-content">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>INDEPENDENTLY AUDITED BY CAG CHARTERED ACCOUNTANTS • PUBLIC 80G REGISTRATION NO. 49281-ACF</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
