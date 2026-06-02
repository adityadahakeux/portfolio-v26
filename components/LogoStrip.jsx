'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Trust strip — real company logos, monochrome-light to merge with the dark
// theme. Employers and freelance clients as a quiet credibility band.
const EMPLOYERS = [
  { src: '/logos/ebixcash.png', alt: 'EbixCash', h: 38 },
  { src: '/logos/sapio.png',    alt: 'Sapio Analytics', h: 42 },
  { src: '/logos/dhi.png',      alt: 'Dhi Technologies', h: 52 },
];
const FREELANCE = [
  { src: '/logos/continuum.png', alt: 'Continuum AI', h: 54 },
  { src: '/logos/troveez.png',   alt: 'Troveez', h: 34 },
];

export default function LogoStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const driftL = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const driftR = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const fade = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0.4, 1, 1, 0.5]);

  return (
    <section ref={ref} style={{ paddingTop: 8, paddingBottom: 44, position: 'relative', borderTop: '1px solid var(--rule-2)' }}>
      <motion.div className="wrap-wide" style={{ opacity: fade }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, paddingTop: 30 }}>
          {/* Employers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(28px, 4vw, 52px)', flexWrap: 'wrap' }} className="logo-row">
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
              Built systems at
            </span>
            <motion.div style={{ x: driftL, display: 'flex', alignItems: 'center', gap: 'clamp(28px, 3.5vw, 48px)', flexWrap: 'wrap' }}>
              {EMPLOYERS.map(c => (
                <img key={c.alt} src={c.src} alt={c.alt} className="logo-img" style={{ height: c.h }} />
              ))}
            </motion.div>
          </div>

          {/* Freelance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(24px, 3vw, 44px)', flexWrap: 'wrap' }} className="logo-row">
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
              Freelance for
            </span>
            <motion.div style={{ x: driftR, display: 'flex', alignItems: 'center', gap: 'clamp(24px, 3vw, 40px)' }}>
              {FREELANCE.map(c => (
                <img key={c.alt} src={c.src} alt={c.alt} className="logo-img" style={{ height: c.h }} />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
