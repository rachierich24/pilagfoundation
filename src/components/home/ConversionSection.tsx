'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Heart, ShieldCheck } from 'lucide-react';
import '../../styles/sections/Conversion.css';

export default function ConversionSection() {
    const [donationAmount, setDonationAmount] = useState<number>(500);

    return (
        <section className="conversion-section">
            {/* Ambient Background Glows */}
            <div className="conversion-bg-glow-left"></div>
            <div className="conversion-bg-glow-right"></div>

            <div className="conversion-inner">
                {/* Left Panel: Volunteer Movement */}
                <div className="conversion-card-panel volunteer-panel">
                    <div>
                        <div className="conversion-badge">
                            <span className="conversion-badge-dot"></span>
                            VOLUNTEER COMMUNITY
                        </div>

                        <h2 className="conversion-heading">
                            JOIN THE<br />
                            <span className="conversion-heading-highlight">MOVEMENT.</span>
                        </h2>

                        <p className="conversion-subtext">
                            Your time is the most powerful currency in climate action. Join thousands of volunteers driving real grassroots change across India&apos;s most vulnerable ecosystems.
                        </p>

                        <ul className="conversion-benefits-list">
                            <li>
                                <div className="benefit-icon-check">
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <span>Field Reforestation & Ancestral Land Mapping</span>
                            </li>
                            <li>
                                <div className="benefit-icon-check">
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <span>Verified Volunteer Certificates & Leadership Hours</span>
                            </li>
                            <li>
                                <div className="benefit-icon-check">
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <span>Direct Local Community Governance Workshops</span>
                            </li>
                        </ul>
                    </div>

                    <Link href="/support" className="conversion-cta-btn">
                        <span>REGISTER AS VOLUNTEER</span>
                        <div className="cta-arrow-circle">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </Link>
                </div>

                {/* Right Panel: Fund the Impact */}
                <div className="conversion-card-panel donation-panel">
                    <div>
                        <div className="conversion-badge">
                            <span className="conversion-badge-dot"></span>
                            DIRECT IMPACT FUND
                        </div>

                        <h2 className="conversion-heading">
                            FUND THE<br />
                            <span className="conversion-heading-highlight">IMPACT.</span>
                        </h2>

                        <div className="donation-cards">
                            {[
                                { amt: 100, desc: "Plant 1 native tree + digital certificate", tag: "" },
                                { amt: 500, desc: "Support local community awareness drive", tag: "MOST POPULAR" },
                                { amt: 1000, desc: "Sponsor a full local reforestation kit", tag: "HIGH IMPACT" }
                            ].map((card) => (
                                <div
                                    key={card.amt}
                                    className={`donation-card ${donationAmount === card.amt ? 'selected' : ''}`}
                                    onClick={() => setDonationAmount(card.amt)}
                                >
                                    <div className="donation-card-content">
                                        <div className="donation-card-header">
                                            <span className="donation-amount">₹{card.amt}</span>
                                            {card.tag && <span className="donation-pop-tag">{card.tag}</span>}
                                        </div>
                                        <div className="donation-desc">{card.desc}</div>
                                    </div>
                                    <div className="donation-card-check">
                                        {donationAmount === card.amt && <Check className="w-4 h-4 text-white" />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Custom Amount Input */}
                        <div className="donation-custom">
                            <label>OR ENTER CUSTOM AMOUNT (₹)</label>
                            <div className="donation-custom-input-wrap">
                                <span className="donation-currency">₹</span>
                                <input
                                    type="number"
                                    min="10"
                                    placeholder="Enter custom amount..."
                                    value={donationAmount !== 100 && donationAmount !== 500 && donationAmount !== 1000 ? donationAmount : ''}
                                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                                    className="donation-custom-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Submit Donation Button */}
                        <div className="donate-action">
                            <Link href="/support" className="btn-donate">
                                <Heart className="w-4 h-4 text-white fill-white" />
                                <span>DONATE NOW — ₹{donationAmount || 0}</span>
                                <ArrowRight className="w-4 h-4 text-white" />
                            </Link>
                        </div>

                        <div className="donation-trust-note">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>80G Tax Exempt Certified • 100% Direct Field Distribution</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
