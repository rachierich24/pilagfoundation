"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [amount, setAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const finalAmount = amount === 'custom' ? Number(customAmount) : amount;

  const handlePayment = (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing(true);
      
      // Simulate Razorpay secure network delay
      setTimeout(() => {
          setIsProcessing(false);
          setIsSuccess(true);
      }, 2000);
  };

  if (isSuccess) {
      return (
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-bg-panel)' }}>
            <div style={{ textAlign: 'center', padding: '4rem', background: '#0a0a0a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '600px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(76, 175, 80, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', color: '#EADFC8', fontSize: '3rem', marginBottom: '1rem' }}>Transaction Secured</h1>
                <p style={{ opacity: 0.8, fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                    Thank you. Your contribution of <strong>₹{finalAmount}</strong> has been successfully processed. An official receipt and allocation tracker has been dispatched to your secure email.
                </p>
                <Link href="/" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center' }}>Return to Operations</Link>
            </div>
        </main>
      )
  }

  return (
    <main>
        <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '15vh' }}>
            <div className="container grid-cols-2" style={{ alignItems: 'flex-start', gap: '6rem' }}>
                <div style={{ position: 'sticky', top: '20vh' }}>
                    <p className="uppercase-label uppercase-label-dark" style={{ marginBottom: '2rem' }}>Fund The Fight</p>
                    <h1 className="text-colossal" style={{ color: 'var(--clr-text-prime)', marginBottom: '2rem', fontSize: 'clamp(4rem, 8vw, 6rem)' }}>SUPPORT<br/>THE WORK.</h1>
                    <p className="lead-text" style={{ marginBottom: '2rem' }}>Your contribution directly arms indigenous communities with the legal, technological, and tactical resources required to defend global frontlines.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>100%</h4>
                            <p style={{ opacity: 0.7 }}>Of public donations go strictly to operational grants.</p>
                        </div>
                        <div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>4X</h4>
                            <p style={{ opacity: 0.7 }}>Multiplier effect through our litigation match-fund.</p>
                        </div>
                    </div>
                </div>

                <div className="form-container" style={{ background: '#0a0a0c', padding: '3rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1.5rem', color: '#EADFC8' }}>Make a Contribution</h3>
                    <form onSubmit={handlePayment} className="donation-form">
                        <div className="form-group">
                            <label htmlFor="donor-name" style={{ color: 'var(--clr-text-prime)', opacity: 0.8 }}>Full Legal Name</label>
                            <input type="text" id="donor-name" required placeholder="Jane Doe" style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', width: '100%', borderRadius: '4px' }} />
                        </div>
                        <div className="form-group" style={{ marginTop: '1.5rem' }}>
                            <label htmlFor="donor-email" style={{ color: 'var(--clr-text-prime)', opacity: 0.8 }}>Secure Email Contact</label>
                            <input type="email" id="donor-email" required placeholder="contact@domain.com" style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', width: '100%', borderRadius: '4px' }} />
                        </div>
                        <div className="form-group" style={{ marginTop: '1.5rem' }}>
                            <label style={{ color: 'var(--clr-text-prime)', opacity: 0.8 }}>Contribution Amount (INR)</label>
                            <div className="amount-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {[50, 100, 500].map(val => (
                                    <button 
                                        key={val} 
                                        type="button" 
                                        onClick={() => setAmount(val)} 
                                        style={{ padding: '1rem', background: amount === val ? '#EADFC8' : 'rgba(255,255,255,0.05)', color: amount === val ? '#000' : '#FFF', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
                                    >
                                        ₹{val}
                                    </button>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={() => setAmount('custom')}
                                    style={{ padding: '1rem', background: amount === 'custom' ? '#EADFC8' : 'rgba(255,255,255,0.05)', color: amount === 'custom' ? '#000' : '#FFF', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
                                >
                                    Custom
                                </button>
                            </div>
                            {amount === 'custom' && (
                                <input 
                                    type="number" 
                                    required
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', width: '100%', borderRadius: '4px', marginTop: '0.5rem' }} 
                                    placeholder="Enter custom amount" 
                                />
                            )}
                        </div>
                        <div className="form-group" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <label style={{ color: 'var(--clr-text-prime)', opacity: 0.8 }}>Allocation Preference</label>
                            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400, color: '#FFF' }}><input type="radio" name="fund" value="general" defaultChecked /> General Defense Fund</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400, color: '#FFF' }}><input type="radio" name="fund" value="legal" /> Targeted Litigation</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isProcessing} style={{ width: '100%', justifyContent: 'center', fontSize: '1.2rem', padding: '1.5rem', background: isProcessing ? '#555' : '#EADFC8', color: '#000', border: 'none', cursor: 'pointer' }}>
                            {isProcessing ? 'Simulating Secure Transaction...' : 'Process Contribution'}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.5, marginTop: '1.5rem', color: '#FFF' }}>Securely processed via Mock Gateway. A tax-deductible receipt will be automatically generated.</p>
                    </form>
                </div>
            </div>
        </section>
    </main>
  );
}
