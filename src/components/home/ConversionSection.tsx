import { useState } from 'react';
import Link from 'next/link';

export default function ConversionSection() {
    const [donationAmount, setDonationAmount] = useState<number>(500);

    return (
        <section className="conversion-section">
            <div className="conversion-inner">
                <div className="volunteer-col">
                    <span className="section-eyebrow">Get Involved</span>
                    <h2>Join the Movement</h2>
                    <p>Your time is the most powerful currency in climate action. Join thousands of volunteers driving real grassroots change across India's most vulnerable ecosystems.</p>
                    <Link href="/support" className="btn btn-primary" style={{ background: '#1A3626', color: '#FFF' }}>Register as Volunteer →</Link>
                </div>

                <div className="donation-col">
                    <span className="section-eyebrow">Action Now</span>
                    <h2>Fund the Impact</h2>
                    <div className="donation-cards">
                        {[
                            { amt: 100, desc: "Plant a native tree + certificate" },
                            { amt: 500, desc: "Support community awareness events" },
                            { amt: 1000, desc: "Sponsor a full local campaign" }
                        ].map((card) => (
                            <div
                                key={card.amt}
                                className={`donation-card ${donationAmount === card.amt ? 'selected' : ''}`}
                                onClick={() => setDonationAmount(card.amt)}
                            >
                                <div>
                                    <div className="donation-amount">₹{card.amt}</div>
                                    <div className="donation-desc">{card.desc}</div>
                                </div>
                                <div className="donation-card-check"></div>
                            </div>
                        ))}
                    </div>
                    <div className="donation-custom">
                        <label>Or enter custom amount (₹)</label>
                        <div className="donation-custom-input-wrap">
                            <span className="donation-currency">₹</span>
                            <input
                                type="number"
                                min="10"
                                placeholder="Enter amount"
                                value={donationAmount !== 100 && donationAmount !== 500 && donationAmount !== 1000 ? donationAmount : ''}
                                onChange={(e) => setDonationAmount(Number(e.target.value))}
                                className="donation-custom-input"
                            />
                        </div>
                    </div>
                    <div className="donate-action">
                        <Link href="/support" className="btn-donate">Donate Now ₹{donationAmount}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
