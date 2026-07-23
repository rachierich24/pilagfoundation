"use client";

import Link from 'next/link';
import { ArrowUp, ArrowRight, Mail, MapPin, ShieldCheck } from 'lucide-react';
import '../../styles/sections/Footer.css';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer-awwwards">
            {/* Background Ambient Radial Glow */}
            <div className="footer-bg-glow"></div>

            <div className="footer-container">
                {/* Top Callout Banner & Newsletter */}
                <div className="footer-top-banner">
                    <h2 className="footer-banner-heading">
                        STAND WITH LOCAL<br />
                        <span className="footer-banner-highlight">COMMUNITIES & LANDS.</span>
                    </h2>

                    <div className="footer-newsletter-wrap">
                        <div className="footer-newsletter-title">Subscribe to Field Reports</div>
                        <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                className="footer-newsletter-input"
                                required
                            />
                            <button type="submit" className="footer-newsletter-btn">
                                <span>JOIN</span>
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Grid Navigation */}
                <div className="footer-grid">
                    {/* Column 1: Brand & Mission */}
                    <div className="footer-brand-col">
                        <img src="/pilaglogo.png" alt="PILAG Foundation" className="footer-logo" />
                        <p className="footer-brand-desc">
                            People's Initiative for Local Administration and Governance. Advancing sovereign data, indigenous land rights, and grassroots climate justice since 2018.
                        </p>
                        <div className="footer-live-badge">
                            <span className="footer-live-dot"></span>
                            ACTIVE IN 14 FOREST STATES
                        </div>
                    </div>

                    {/* Column 2: Initiatives */}
                    <div>
                        <h4 className="footer-col-title">INITIATIVES</h4>
                        <ul className="footer-nav-list">
                            <li><Link href="/about" className="footer-nav-link">About PILAG</Link></li>
                            <li><Link href="/impact" className="footer-nav-link">Grassroots Impact</Link></li>
                            <li><Link href="/drives" className="footer-nav-link">Community Drives</Link></li>
                            <li><Link href="/support" className="footer-nav-link" style={{ color: '#34D399', fontWeight: 600 }}>Legal Defense Fund</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Governance */}
                    <div>
                        <h4 className="footer-col-title">GOVERNANCE</h4>
                        <ul className="footer-nav-list">
                            <li><Link href="/about" className="footer-nav-link">Annual Reports</Link></li>
                            <li><Link href="/about" className="footer-nav-link">Financial Audits</Link></li>
                            <li><Link href="/impact" className="footer-nav-link">Geospatial Telemetry</Link></li>
                            <li><Link href="/support" className="footer-nav-link">80G Tax Exemption</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact & Socials */}
                    <div>
                        <h4 className="footer-col-title">HEADQUARTERS</h4>
                        <div className="footer-contact-info">
                            <div className="footer-contact-item">
                                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>contact@pilagfoundation.org</span>
                            </div>
                            <div className="footer-contact-item">
                                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>New Delhi, India</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.8rem' }}>
                            <div className="footer-newsletter-title" style={{ marginBottom: '0.6rem' }}>CONNECT WITH US</div>
                            <div className="footer-social-pills">
                                <a href="#" className="footer-social-pill" target="_blank" rel="noopener noreferrer">Twitter/X</a>
                                <a href="#" className="footer-social-pill" target="_blank" rel="noopener noreferrer">Instagram</a>
                                <a href="#" className="footer-social-pill" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="#" className="footer-social-pill" target="_blank" rel="noopener noreferrer">YouTube</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Colossal Watermark */}
                <div className="footer-watermark">
                    PILAG FOUNDATION
                </div>

                {/* Bottom Sub-Footer */}
                <div className="footer-bottom">
                    <div>
                        © {new Date().getFullYear()} PILAG Foundation. All rights reserved.
                    </div>

                    <div className="footer-bottom-links">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Reg No. 49281-ACF
                        </span>
                        <Link href="/about" className="footer-bottom-link">Privacy Policy</Link>
                        <Link href="/about" className="footer-bottom-link">Terms of Governance</Link>
                    </div>

                    <button onClick={scrollToTop} className="footer-back-to-top">
                        <span>BACK TO TOP</span>
                        <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
