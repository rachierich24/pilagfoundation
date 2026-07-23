"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Link from "next/link";
import {
  TreePine,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Compass
} from "lucide-react";
import './impact.css';

export default function ImpactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [restorationState, setRestorationState] = useState<'before' | 'after'>('after');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal-impact-pod').forEach((pod: any) => {
      gsap.from(pod, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pod,
          start: 'top 85%'
        }
      });
    });
  }, { scope: containerRef });

  const risingPillars = [
    {
      name: "Trees Planted",
      val: "120,000+",
      height: "68%",
      video: "/forest_loop.mp4"
    },
    {
      name: "Land Protected",
      val: "3,800+",
      height: "84%",
      video: "/impact_main.mp4"
    },
    {
      name: "CO₂ Sequestered",
      val: "1.2M+",
      height: "74%",
      video: "/chapter1.mp4"
    },
    {
      name: "Gram Sabhas",
      val: "47",
      height: "92%",
      video: "/transition.mp4"
    },
    {
      name: "Global Nations",
      val: "14",
      height: "100%",
      video: "/ocean.mp4"
    }
  ];

  return (
    <main ref={containerRef} className="impact-main-container">
      {/* Background Ambient Glow */}
      <div className="impact-bg-glow"></div>

      {/* ── 1. RISING VIDEO PILLARS HERO (ENERGY PROFITS INSPIRED) ── */}
      <section className="rising-hero-section">
        {/* Background Atmospheric Video */}
        <video
          src="/forest_loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="rising-hero-bg-video"
        />
        <div className="rising-hero-overlay"></div>

        {/* Top Header Text */}
        <div className="rising-hero-top">
          <h1 className="rising-hero-heading">
            Systemic Recovery.<br />
            <span className="rising-hero-heading-green">Unstoppable Impact.</span>
          </h1>

        </div>

        {/* 5 Rising Video Pillars Grid */}
        <div className="rising-pillars-container">
          {risingPillars.map((pillar, idx) => (
            <div key={idx} className="rising-pillar-col">
              <div className="pillar-stat-header">
                <div className="pillar-meta-name">{pillar.name}</div>
                <div className="pillar-stat-val">{pillar.val}</div>
              </div>

              <div className="pillar-video-box" style={{ height: pillar.height }}>
                <video
                  src={pillar.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pillar-video-media"
                />
                <div className="pillar-glass-overlay"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. THE CRITICAL DEFORESTATION & ECOLOGICAL CRISIS ── */}
      <section className="impact-problem-section">
        <div className="section-tag-header">
          <ShieldAlert className="w-4 h-4" />
          <span>ECOLOGICAL THREAT MATRIX</span>
        </div>
        <h2 className="section-title-large">
          THE CRISIS WE <span style={{ color: '#F43F5E' }}>CONFRONT.</span>
        </h2>

        <div className="problem-grid">
          <div className="problem-card reveal-impact-pod">
            <div className="problem-img-wrapper">
              <img src="/problem_deforestation.png" alt="Deforestation Crisis" />
            </div>
            <div className="problem-card-body">
              <h3 className="problem-card-title">Deforestation & Canopy Loss</h3>
              <p className="problem-card-text">
                Unregulated clearing destroys millions of hectares of primary canopy annually, displacing endangered species and destabilizing local watersheds.
              </p>
            </div>
          </div>

          <div className="problem-card reveal-impact-pod">
            <div className="problem-img-wrapper">
              <img src="/problem_energy.png" alt="Energy & Extraction" />
            </div>
            <div className="problem-card-body">
              <h3 className="problem-card-title">Industrial Extraction</h3>
              <p className="problem-card-text">
                Encroaching industrial infrastructure strips topsoil moisture, triggers heavy metal runoffs, and erodes native biodiversity corridors.
              </p>
            </div>
          </div>

          <div className="problem-card reveal-impact-pod">
            <div className="problem-img-wrapper">
              <img src="/problem_inaction.png" alt="Systemic Inaction" />
            </div>
            <div className="problem-card-body">
              <h3 className="problem-card-title">Systemic Policy Inaction</h3>
              <p className="problem-card-text">
                Grassroots indigenous communities frequently lack GIS spatial evidence and High Court legal representation to halt illegal land grabbing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. BEFORE & AFTER INTERACTIVE RESTORATION VISUALIZER ── */}
      <section className="impact-restoration-section">
        <div className="restoration-visualizer-box reveal-impact-pod">
          <div className="impact-hud-badge" style={{ borderColor: 'rgba(52, 211, 153, 0.4)' }}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>INTERACTIVE RESTORATION VISUALIZER</span>
          </div>

          <h2 className="section-title-large" style={{ marginBottom: '1.5rem' }}>
            FROM BARREN TO <span className="impact-hero-title-highlight">THRIVING CANOPY.</span>
          </h2>

          <div className="visualizer-toggle-pills">
            <button
              className={`toggle-pill-btn ${restorationState === 'before' ? 'active-pill' : ''}`}
              onClick={() => setRestorationState('before')}
            >
              BEFORE RESTORATION (DEGRADED)
            </button>
            <button
              className={`toggle-pill-btn ${restorationState === 'after' ? 'active-pill' : ''}`}
              onClick={() => setRestorationState('after')}
            >
              AFTER RESTORATION (REFORESTED)
            </button>
          </div>

          <div className="visualizer-media-frame">
            <img
              src={restorationState === 'before' ? "/before_barren.png" : "/after_forest.png"}
              alt={restorationState === 'before' ? "Barren Degraded Land" : "Lush Green Forest"}
            />
          </div>

          <div className="visualizer-caption">
            {restorationState === 'before' ? (
              <span style={{ color: '#F43F5E' }}>⚠️ Baseline Status: Severely eroded topsoil with 0% native canopy cover.</span>
            ) : (
              <span style={{ color: '#34D399' }}>✨ Impact Status: 100% indigenous canopy density with active soil mycorrhizal recovery.</span>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. OUR 4 PILLARS OF SYSTEMIC IMPACT ── */}
      <section className="impact-pillars-section">
        <div className="section-tag-header">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>FOUR STRATEGIC PILLARS</span>
        </div>
        <h2 className="section-title-large">
          HOW WE DRIVE <span className="impact-hero-title-highlight">SYSTEMIC IMPACT.</span>
        </h2>

        <div className="pillars-grid">
          <div className="pillar-card reveal-impact-pod">
            <div className="pillar-img-box">
              <img src="/impact_action.png" alt="Direct Field Action" />
            </div>
            <div className="pillar-card-content">
              <div className="pillar-tag">PILLAR 01 // DIRECT FIELD ACTION</div>
              <h3 className="pillar-title">Native Seed Banking & Sapling Drives</h3>
              <p className="pillar-desc">
                Establishing community-managed micro-nurseries propagating endemic tree species, revitalizing soil microbiomes, and ensuring 92%+ sapling survival rates.
              </p>
            </div>
          </div>

          <div className="pillar-card reveal-impact-pod">
            <div className="pillar-img-box">
              <img src="/impact_awareness.png" alt="Policy & Legal Advocacy" />
            </div>
            <div className="pillar-card-content">
              <div className="pillar-tag">PILLAR 02 // PUBLIC & LEGAL ADVOCACY</div>
              <h3 className="pillar-title">High Court PILs & Environmental Literacy</h3>
              <p className="pillar-desc">
                Filing Public Interest Litigations in the Supreme Court and High Courts while hosting legal awareness workshops for frontline ecological defense.
              </p>
            </div>
          </div>

          <div className="pillar-card reveal-impact-pod">
            <div className="pillar-img-box">
              <img src="/impact_leadership.png" alt="Gram Sabha Governance" />
            </div>
            <div className="pillar-card-content">
              <div className="pillar-tag">PILLAR 03 // TRIBAL GOVERNANCE</div>
              <h3 className="pillar-title">Gram Sabha & Youth Eco-Leadership</h3>
              <p className="pillar-desc">
                Empowering indigenous Gram Sabha councils with legal resolution toolkits and training next-generation youth climate champions.
              </p>
            </div>
          </div>

          <div className="pillar-card reveal-impact-pod">
            <div className="pillar-img-box">
              <img src="/impact_scale.png" alt="Geospatial Telemetry" />
            </div>
            <div className="pillar-card-content">
              <div className="pillar-tag">PILLAR 04 // GEOSPATIAL TELEMETRY</div>
              <h3 className="pillar-title">GIS Satellite Mapping & Scale</h3>
              <p className="pillar-desc">
                Utilizing drone telemetry and satellite GIS boundary mapping to provide open-access, indisputable land proof blocking illegal timber corridors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. GRASSROOTS CHAMPION SPOTLIGHT ── */}
      <section className="impact-champion-section">
        <div className="champion-card reveal-impact-pod">
          <div className="champion-img-frame">
            <img src="/story_student.png" alt="Grassroots Champion Student" />
          </div>
          <div>
            <div className="champion-quote-mark">“</div>
            <p className="champion-quote">
              “Before PILAG helped our Gram Sabha map our boundary lines, we had no legal proof when timber trucks entered. Today, our community guards 400 hectares of sacred forest with satellite telemetry.”
            </p>
            <div className="champion-name">Sunita Marandi</div>
            <div className="champion-role">YOUTH ECO-LEADERSHIP FELLOW • JHARKHAND DRIVE</div>
          </div>
        </div>
      </section>

      {/* ── 6. FINAL ACTION CTA ── */}
      <section className="impact-cta-banner">
        <div className="cta-box reveal-impact-pod">
          <div className="impact-hud-badge">
            <TreePine className="w-3.5 h-3.5 text-emerald-400" />
            <span>JOIN THE FRONT LINE</span>
          </div>

          <h2 className="cta-heading">BE PART OF THE NEXT 100,000 TREES.</h2>
          <p className="cta-text">
            100% of your capital goes directly into frontline native reforestation, High Court legal writs, and tribal council empowerment.
          </p>

          <div className="cta-btn-group">
            <Link href="/support" className="cta-primary-btn">
              <span>FUND THE IMPACT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/drives" className="cta-secondary-btn">
              <span>EXPLORE LIVE DRIVES</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
