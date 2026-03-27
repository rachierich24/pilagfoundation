'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import DriveModal from '../../components/DriveModal';
import './drives.css';

const allDrives = [
  { title: 'DTU Plantation Drive', location: 'Delhi', date: 'April 5, 2026', impact: '300 Trees Planned', category: 'Plantation', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800' },
  { title: 'Yamuna Riverbank Cleanup', location: 'Delhi NCR', date: 'April 12, 2026', impact: '2 km Stretch', category: 'Cleanup', img: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=800' },
  { title: 'Green Awareness Walk', location: 'Noida', date: 'April 19, 2026', impact: '500 Citizens Reached', category: 'Awareness', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800' },
  { title: 'Jharkhand Forest Mapping', location: 'Jharkhand', date: 'May 3, 2026', impact: '400 ha Surveyed', category: 'Plantation', img: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800' },
  { title: 'Bengaluru Lake Restoration', location: 'Bengaluru', date: 'May 10, 2026', impact: '3 Lakes Restored', category: 'Cleanup', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800' },
  { title: 'School Eco-Literacy Program', location: 'Pune', date: 'May 17, 2026', impact: '2,000 Students', category: 'Awareness', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800' },
];

const filters = ['All', 'Plantation', 'Cleanup', 'Awareness'] as const;
type Filter = typeof filters[number];

export default function DrivesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [activeDrive, setActiveDrive] = useState<(typeof allDrives)[0] | null>(null);

  const filtered = activeFilter === 'All' ? allDrives : allDrives.filter(d => d.category === activeFilter);

  useEffect(() => {
    gsap.fromTo('.drives-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'expo.out' });
  }, [activeFilter]);

  return (
    <div className="drives-page">
      {/* Hero */}
      <section className="drives-hero">
        <div className="drives-hero-inner">
          <span className="section-eyebrow" style={{ color: '#22c55e' }}>Climate Action</span>
          <h1 className="drives-hero-title">Join a Drive</h1>
          <p className="drives-hero-sub">Be part of real, measurable climate action — on the ground.</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="drives-filter-bar">
        {filters.map(f => (
          <button
            key={f}
            className={`drives-filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >{f}</button>
        ))}
      </div>

      {/* Drive Grid */}
      <section className="drives-grid-section">
        <div className="drives-grid">
          {filtered.map((drive, i) => (
            <div key={i} className="drives-card">
              <div className="drives-card-img-wrap">
                <img src={drive.img} alt={drive.title} className="drives-card-img" />
                <span className="drives-card-category">{drive.category}</span>
              </div>
              <div className="drives-card-body">
                <h3 className="drives-card-title">{drive.title}</h3>
                <div className="drives-card-meta">
                  <span>📍 {drive.location}</span>
                  <span>📅 {drive.date}</span>
                  <span>🌱 {drive.impact}</span>
                </div>
                <button className="drive-join-btn" style={{ marginTop: '1.5rem', width: '100%' }} onClick={() => setActiveDrive(drive)}>
                  Join Drive
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {activeDrive && <DriveModal drive={activeDrive} onClose={() => setActiveDrive(null)} />}
    </div>
  );
}
