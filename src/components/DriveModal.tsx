'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Drive {
  title: string;
  location: string;
  date: string;
  impact: string;
}

interface DriveModalProps {
  drive: Drive | null;
  onClose: () => void;
}

export default function DriveModal({ drive, onClose }: DriveModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', college: '', phone: '', interest: 'Plantation' });

  // Animate in on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(modalRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out', delay: 0.1 });
    return () => { document.body.style.overflow = ''; };
  }, []);

  const close = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose });
    gsap.to(modalRef.current, { y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' });
    setStep(0);
  };

  const goToStep = (next: number) => {
    const cur = stepRefs[step].current;
    const nxt = stepRefs[next].current;
    gsap.to(cur, { x: -30, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
      setStep(next);
      gsap.fromTo(nxt, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'expo.out' });
    }});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!drive) return null;

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) close(); }}>
      <div className="drive-modal" ref={modalRef}>

        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">Registering for</p>
            <h3 className="modal-title">{drive.title}</h3>
            <p className="modal-meta">{drive.location} · {drive.date} · {drive.impact}</p>
          </div>
          <button className="modal-close" onClick={close} aria-label="Close">✕</button>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          {[0, 1, 2].map(i => (
            <div key={i} className={`step-dot ${i <= step ? 'active' : ''} ${i === step ? 'current' : ''}`} />
          ))}
        </div>

        {/* Steps */}
        <div className="modal-body">

          {/* Step 0: Personal Info */}
          <div ref={stepRefs[0]} className="form-step" style={{ display: step === 0 ? 'block' : 'none' }}>
            <h4 className="step-label">Personal Details</h4>
            <div className="form-field">
              <label>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Arjun Mehra" />
            </div>
            <div className="form-field">
              <label>College / Organization</label>
              <input name="college" value={formData.college} onChange={handleChange} placeholder="e.g. DTU, Delhi" />
            </div>
            <button className="modal-btn-next" onClick={() => goToStep(1)}>Continue →</button>
          </div>

          {/* Step 1: Contact & Interest */}
          <div ref={stepRefs[1]} className="form-step" style={{ display: step === 1 ? 'block' : 'none', opacity: 0 }}>
            <h4 className="step-label">Contact & Interests</h4>
            <div className="form-field">
              <label>Phone Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" type="tel" />
            </div>
            <div className="form-field">
              <label>Area of Interest</label>
              <select name="interest" value={formData.interest} onChange={handleChange}>
                <option>Plantation</option>
                <option>Cleanup</option>
                <option>Awareness</option>
                <option>Legal Support</option>
                <option>Data Mapping</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="modal-btn-back" onClick={() => goToStep(0)}>← Back</button>
              <button className="modal-btn-next" onClick={() => goToStep(2)}>Register Now</button>
            </div>
          </div>

          {/* Step 2: Success */}
          <div ref={stepRefs[2]} className="form-step form-success" style={{ display: step === 2 ? 'block' : 'none', opacity: 0 }}>
            <div className="success-icon">✦</div>
            <h4>You&apos;re Registered!</h4>
            <p>Welcome to the movement, <strong>{formData.name || 'Volunteer'}</strong>. We&apos;ll send confirmation details to your phone before the drive.</p>
            <p className="success-meta">📍 {drive.location} · 📅 {drive.date}</p>
            <button className="modal-btn-next" onClick={close}>Done</button>
          </div>

        </div>
      </div>
    </div>
  );
}
