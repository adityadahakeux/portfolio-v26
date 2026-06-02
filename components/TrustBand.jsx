'use client';
import { RiseIn } from '@/components/Reveal';

// TRUST BAND — organizations whose products/initiatives the work has reached.
// Placed after the About/Method section. Monochrome-light logos on the dark
// theme, presented as a quiet credibility wall to build recruiter trust.
const ORGS = [
  { src: '/logos/ministry.svg', alt: 'Ministry of Science and Technology', h: 70 },
  { src: '/logos/mysba.png',    alt: 'MySBA — Swavalambi Bharat Abhiyan', h: 60 },
  { src: '/logos/axis.svg',     alt: 'Axis Bank', h: 50 },
  { src: '/logos/canara.png',   alt: 'Canara Bank', h: 56 },
  { src: '/logos/ahli.png',     alt: 'Ahli Bank', h: 44 },
  { src: '/logos/redgram.png',  alt: 'Red Gram Wealth Management', h: 44 },
];

export default function TrustBand() {
  return (
    <section style={{ background: 'var(--bg-2)', paddingTop: 80, paddingBottom: 88, position: 'relative' }}>
      <div className="wrap-wide">
        <RiseIn>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="label" style={{ color: 'var(--accent)', marginBottom: 14 }}>Trusted across</span>
            <p style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
              Work that has reached national institutions, banking, and enterprise platforms — from government initiatives to financial services.
            </p>
          </div>
        </RiseIn>
        <RiseIn delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(36px, 6vw, 80px)' }}>
            {ORGS.map(o => (
              <img key={o.alt} src={o.src} alt={o.alt} className="trust-logo" style={{ height: o.h }} />
            ))}
          </div>
        </RiseIn>
      </div>
    </section>
  );
}
