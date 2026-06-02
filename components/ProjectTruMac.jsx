'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// PLATE III — TruMac · TRUST. ~20%. The phone is a dramatic CENTERPIECE,
// large and central, scrubbing through Marketplace → Verification → Credit
// as you scroll. Trust becoming purchasing power.
const STEPS = [
  { src: '/trumac/home.png',      no: '01', label: 'Marketplace',  note: 'A familiar commerce surface. Adoption first — trust is earned before it is asked for.' },
  { src: '/trumac/documents.png', no: '02', label: 'Verification', note: 'GST document and shop photo. Trust must exist before credit can.' },
  { src: '/trumac/credit.png',    no: '03', label: 'Credit',       note: "The credit limit is the platform's judgment of the merchant, made legible." },
];

export default function TruMac() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const warm = useTransform(scrollYProgress, [0.55, 1], [0, 0.6]);

  return (
    <section ref={ref} style={{ position: 'relative', height: '175vh', background: 'var(--bg)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 48 }}>
        {/* warming credit glow */}
        <motion.div aria-hidden style={{ position: 'absolute', inset: 0, opacity: warm, background: 'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(79,141,247,0.14) 0%, transparent 62%)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'linear-gradient(rgba(244,245,247,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,247,0.022) 1px, transparent 1px)', backgroundSize: '46px 46px', maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 80%)' }} />

        <div className="wrap-wide" style={{ width: '100%', position: 'relative' }}>
          {/* header — clears the fixed navbar, sits above the grid */}
          <div style={{ position: 'absolute', top: 24, left: 0, right: 0, zIndex: 3 }}>
            <div className="wrap-wide" style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap', padding: 0 }}>
              <span className="plate-no" style={{ color: 'var(--accent)' }}>SYSTEM / 03</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.8rem)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.03em' }}>TruMac</h2>
              <span className="label" style={{ display: 'inline' }}>Trust · Embedded Credit</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 56, alignItems: 'center', maxWidth: 1100, margin: '0 auto', marginTop: 40 }} className="trumac-grid">
            {/* left captions */}
            <div style={{ position: 'relative', height: 260 }} className="hide-mobile">
              {STEPS.map((s, i) => <Caption key={i} step={s} index={i} total={STEPS.length} progress={scrollYProgress} />)}
            </div>

            {/* the CENTERPIECE phone — large */}
            <div style={{ position: 'relative', width: 'clamp(250px, 30vw, 330px)', height: 'clamp(510px, 62vw, 680px)', justifySelf: 'center' }}>
              {STEPS.map((s, i) => <Frame key={i} step={s} index={i} total={STEPS.length} progress={scrollYProgress} />)}
            </div>

            {/* right thesis */}
            <div className="hide-mobile">
              <p className="font-serif" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.3, marginBottom: 22 }}>
                Trust, made into purchasing power.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: 26 }}>
                It looked like e-commerce. It ran like embedded finance — verification quietly unlocking credit for an offline procurement industry that had never had access to it.
              </p>
              <a href="/work/trumac" className="link-line font-mono" style={{ fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Open the TruMac case study →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Frame({ step, index, total, progress }) {
  const seg = 1 / total;
  const start = index * seg, end = start + seg, mid = start + seg / 2;
  const opacity = useTransform(progress,
    [start - seg * 0.5, start, end, end + seg * 0.5].map(v => Math.max(0, Math.min(1, v))),
    index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, mid, end], [0.97, 1, 0.97]);
  return (
    <motion.div style={{ position: 'absolute', inset: 0, opacity, scale }}>
      <div className="mount" style={{ borderRadius: 'clamp(28px, 3vw, 40px)', overflow: 'hidden', height: '100%', padding: 8, boxShadow: '0 60px 120px -30px rgba(0,0,0,0.8)' }}>
        <img src={step.src} alt={`TruMac ${step.label}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 'clamp(22px, 2.4vw, 32px)' }} />
      </div>
    </motion.div>
  );
}

function Caption({ step, index, total, progress }) {
  const seg = 1 / total;
  const start = index * seg;
  const opacity = useTransform(progress, [start - seg * 0.35, start + seg * 0.15, start + seg * 0.85, start + seg * 1.15], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + seg], [16, -16]);
  return (
    <motion.div style={{ position: 'absolute', opacity, y, left: 0, right: 0, textAlign: 'right' }}>
      <span className="plate-no" style={{ display: 'block', marginBottom: 12 }}>{step.no} · {step.label}</span>
      <p className="font-serif" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
        {step.note}
      </p>
    </motion.div>
  );
}
