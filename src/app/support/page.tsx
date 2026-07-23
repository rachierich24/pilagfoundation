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
    <main style={{ overflowX: 'hidden', width: '100vw' }}>
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 5vw 80px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }} className="support-responsive-layout">
          <style jsx>{`
            @media (min-width: 900px) {
              .support-responsive-layout {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 5rem !important;
                align-items: flex-start !important;
              }
              .support-sticky-col {
                position: sticky !important;
                top: 140px !important;
              }
            }
            @media (max-width: 899px) {
              .support-sticky-col {
                position: relative !important;
                top: 0 !important;
              }
            }
          `}</style>
          <div className="support-sticky-col">
            <p className="uppercase-label uppercase-label-dark" style={{ marginBottom: '1.5rem', fontSize: '0.76rem', letterSpacing: '0.18em', color: '#34D399' }}>Fund The Fight</p>
            <h1 className="text-colossal" style={{ color: 'var(--clr-text-prime)', marginBottom: '1.5rem', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 0.95 }}>SUPPORT<br />THE WORK.</h1>
            <p className="lead-text" style={{ marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.65, opacity: 0.85 }}>Your contribution directly arms indigenous communities with the legal, technological, and tactical resources required to defend global frontlines.</p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.3rem', color: '#10B981' }}>100%</h4>
                <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>Of public donations go strictly to operational grants.</p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.3rem', color: '#10B981' }}>4X</h4>
                <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>Multiplier effect through our litigation match-fund.</p>
              </div>
            </div>
          </div>

          <div className="form-container" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)', padding: 'clamp(1.5rem, 5vw, 3rem)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box', width: '100%' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1.5rem', color: '#F4EFE6' }}>Make a Contribution</h3>
            <form onSubmit={handlePayment} className="donation-form">
              <div className="form-group">
                <label htmlFor="donor-name" style={{ color: 'var(--clr-text-prime)', opacity: 0.8, fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Full Legal Name</label>
                <input type="text" id="donor-name" required placeholder="Jane Doe" style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)', padding: '0.9rem 1rem', width: '100%', borderRadius: '12px', boxSizing: 'border-box', fontSize: '16px' }} />
              </div>
              <div className="form-group" style={{ marginTop: '1.2rem' }}>
                <label htmlFor="donor-email" style={{ color: 'var(--clr-text-prime)', opacity: 0.8, fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Secure Email Contact</label>
                <input type="email" id="donor-email" required placeholder="contact@domain.com" style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)', padding: '0.9rem 1rem', width: '100%', borderRadius: '12px', boxSizing: 'border-box', fontSize: '16px' }} />
              </div>
              <div className="form-group" style={{ marginTop: '1.2rem' }}>
                <label style={{ color: 'var(--clr-text-prime)', opacity: 0.8, fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Contribution Amount (INR)</label>
                <div className="amount-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '0.6rem', marginTop: '0.5rem' }}>
                  {[50, 100, 500].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      style={{ padding: '0.8rem 0.5rem', background: amount === val ? '#10B981' : 'rgba(255,255,255,0.05)', color: amount === val ? '#040806' : '#FFF', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', borderRadius: '12px', fontWeight: 'bold', minHeight: '44px' }}
                    >
                      ₹{val}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAmount('custom')}
                    style={{ padding: '0.8rem 0.5rem', background: amount === 'custom' ? '#10B981' : 'rgba(255,255,255,0.05)', color: amount === 'custom' ? '#040806' : '#FFF', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', borderRadius: '12px', fontWeight: 'bold', minHeight: '44px' }}
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
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)', padding: '0.9rem 1rem', width: '100%', borderRadius: '12px', marginTop: '0.6rem', boxSizing: 'border-box', fontSize: '16px' }}
                    placeholder="Enter custom amount"
                  />
                )}
              </div>
              <div className="form-group" style={{ marginTop: '1.5rem', marginBottom: '1.8rem' }}>
                <label style={{ color: 'var(--clr-text-prime)', opacity: 0.8, fontSize: '0.85rem', display: 'block', marginBottom: '0.6rem' }}>Allocation Preference</label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400, color: '#FFF', fontSize: '0.88rem', cursor: 'pointer' }}><input type="radio" name="fund" value="general" defaultChecked /> General Defense Fund</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 400, color: '#FFF', fontSize: '0.88rem', cursor: 'pointer' }}><input type="radio" name="fund" value="legal" /> Targeted Litigation</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isProcessing} style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem', background: isProcessing ? '#555' : 'linear-gradient(135deg, #10B981, #059669)', color: '#FFF', border: 'none', cursor: 'pointer', borderRadius: '100px', fontWeight: 800, textTransform: 'uppercase', minHeight: '48px' }}>
                {isProcessing ? 'Simulating Secure Transaction...' : 'Process Contribution'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', opacity: 0.6, marginTop: '1.2rem', color: '#FFF' }}>Securely processed via Mock Gateway. A tax-deductible receipt will be automatically generated.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
