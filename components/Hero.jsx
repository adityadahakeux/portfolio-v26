'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SystemsBackdrop from '@/components/SystemsBackdrop';
import WireframeBuild from '@/components/WireframeBuild';

// HERO — a modern systems designer, not a magazine. Compact, dense, alive.
// A live "system status" strip with counting metrics sets the operational
// tone immediately; the statement is confident but not oversized.
const EASE = [0.16, 1, 0.3, 1];
const rise = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: EASE } });

function Counter({ to, suffix = '', dur = 1.4, start }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / (dur * 1000));
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, dur, start]);
  return <>{v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</>;
}

export default function Hero({ start = true }) {
  const a = start ? 'animate' : 'initial';
  return (
    <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 120, paddingBottom: 60, position: 'relative', overflow: 'hidden' }}>
      {/* cinematic living systems network — the moving hero backdrop */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, maskImage: 'radial-gradient(ellipse 70% 80% at 30% 45%, #000 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 30% 45%, #000 30%, transparent 78%)' }}>
        <SystemsBackdrop accent="79,141,247" />
      </div>
      {/* ambient operational glow */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(79,141,247,0.10) 0%, transparent 60%)', zIndex: 0 }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.25, backgroundImage: 'linear-gradient(rgba(244,245,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,247,0.025) 1px, transparent 1px)', backgroundSize: '46px 46px', zIndex: 0, maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)' }} />
      {/* legibility scrim so text stays crisp over the motion */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(90deg, var(--bg) 0%, rgba(14,15,19,0.6) 30%, transparent 58%)' }} />


      <div className="wrap-wide" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-2col" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'start' }}>
          <div>
        {/* status strip */}
        <motion.div {...rise(0.1)} initial="initial" animate={a}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 36, padding: '8px 16px', borderRadius: 100, background: 'var(--bg-2)', border: '1px solid var(--rule)' }}>
          <span className="pulse-dot" />
          <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
            UI/UX &amp; Product Designer · India · Available
          </span>
        </motion.div>

        {/* statement — confident, not magazine-oversized */}
        <motion.h1 {...rise(0.25)} initial="initial" animate={a}
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5.2rem)', fontWeight: 600, lineHeight: 1.02, letterSpacing: '-0.035em', color: 'var(--ink)', maxWidth: '18ch', marginBottom: 28 }}>
          Designing systems <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>people depend on.</span>
        </motion.h1>

        <motion.p {...rise(0.4)} initial="initial" animate={a}
          style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: 520, marginBottom: 40 }}>
          I turn dense enterprise workflows — operations, infrastructure, and trust — into interfaces people actually understand. UX research, interaction design, and design systems, end to end. Currently at EBIXCash; available for freelance.
        </motion.p>

        <motion.div {...rise(0.55)} initial="initial" animate={a} style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '13px 26px', borderRadius: 8, background: 'var(--accent)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            View the work
          </button>
          <a href="#contact" className="link-line font-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Get in touch →</a>
        </motion.div>
          </div>

          {/* Right column — wireframe building animation (the product-designer signal) */}
          <motion.div className="hero-wireframe" initial={{ opacity: 0, y: 20 }} animate={a === 'animate' ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }} style={{ marginTop: -20 }}>
            <WireframeBuild />
          </motion.div>
        </div>

        {/* live system metrics — full-width band across the hero */}
        <motion.div {...rise(0.75)} initial="initial" animate={a}
          style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', borderTop: '1px solid var(--rule)', paddingTop: 26, marginTop: 48 }}>
          {[
            { v: 10, suf: '+', l: 'Enterprise products' },
            { v: 8, suf: '', l: 'Operational domains' },
            { v: 3, suf: '', l: 'Flagship systems' },
            { v: 28542, suf: '', l: 'Workforce on ARC' },
          ].map((m, i) => (
            <div key={i} style={{ flex: '1 1 0', minWidth: 120 }}>
              <div className="font-mono" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 500, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                <Counter to={m.v} suffix={m.suf} start={start} />
              </div>
              <div className="label" style={{ marginTop: 10, whiteSpace: 'nowrap' }}>{m.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
