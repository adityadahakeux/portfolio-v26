'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// PLATE I — ARC · OPERATIONS. THE FLAGSHIP. ~40% of homepage attention.
// The dashboard is shown immediately, massive (near full-bleed), and ALIVE:
// a sweeping scan line, a live pulse, counting KPI overlays, and region nodes
// lighting up on the map. This is the portfolio's one memorable interaction —
// a command center that feels operational, not a screenshot.
function Counter({ to, prefix = '', suffix = '', dur = 1.6, start, decimals = 0 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const tick = (t) => { if (!t0) t0 = t; const p = Math.min(1, (t - t0) / (dur * 1000));
      setV((1 - Math.pow(1 - p, 3)) * to); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [to, dur, start]);
  const val = decimals ? v.toFixed(decimals) : Math.round(v).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return <>{prefix}{val}{suffix}</>;
}

export default function ProjectARC() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.04, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="work" ref={ref} style={{ paddingTop: 80, paddingBottom: 90, position: 'relative' }}>
      <div className="wrap-wide">
        {/* compact flagship header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 26, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span className="plate-no" style={{ color: 'var(--accent)' }}>FLAGSHIP / 01</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.03em' }}>ARC</h2>
            <span className="label" style={{ display: 'inline' }}>Operations · Workforce OS</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 100, background: 'rgba(63,184,115,0.1)', border: '1px solid rgba(63,184,115,0.3)' }}>
            <span className="pulse-dot" />
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--live)' }}>Live · all systems operational</span>
          </div>
        </motion.div>
      </div>

      {/* MASSIVE near-full-bleed live dashboard */}
      <div className="wrap-wide">
        <motion.div ref={null} style={{ scale: imgScale, position: 'relative' }}>
          <div className="mount" style={{ padding: 'clamp(8px, 1vw, 14px)', position: 'relative', overflow: 'hidden' }}>
            {/* the dashboard, large */}
            <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
              <motion.img
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
                transition={{ duration: 1.1, ease: [0.65,0,0.35,1] }}
                src="/arc/command-center.png" alt="ARC Workforce Analytics command center"
                style={{ width: '100%', display: 'block' }} />

              {/* scan-line sweep — the 'live' signature */}
              {inView && (
                <motion.div aria-hidden
                  initial={{ top: '0%', opacity: 0 }}
                  animate={{ top: ['0%', '100%'], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2.6, delay: 1, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
                  style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(79,141,247,0.8), transparent)', boxShadow: '0 0 18px rgba(79,141,247,0.6)', zIndex: 3 }} />
              )}

              {/* live KPI overlay chips — count up, positioned over dashboard dead areas */}
              <LiveChip start={inView} style={{ top: '6%', right: '4%' }} delay={0.6}
                label="Avg. Productivity" render={<Counter to={89.3} suffix="%" decimals={1} start={inView} />} trend="+3.7%" />
            </div>
          </div>

          {/* floating glass telemetry card — overlaps the frame edge for depth */}
          <motion.div className="hide-mobile"
            initial={{ opacity: 0, x: -30, y: 20 }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16,1,0.3,1] }}
            style={{ position: 'absolute', left: -28, bottom: 48, zIndex: 5, background: 'rgba(20,23,29,0.82)', backdropFilter: 'blur(16px)', border: '1px solid var(--rule)', borderRadius: 14, padding: '18px 22px', boxShadow: '0 30px 70px rgba(0,0,0,0.6)', minWidth: 230 }}>
            <div className="label" style={{ marginBottom: 10 }}>Total Workforce · live</div>
            <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              <Counter to={28542} start={inView} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: '0.75rem', color: 'var(--live)' }}>
              <span>↑ 12.5%</span><span style={{ color: 'var(--ink-3)' }}>vs last month</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* dense caption row — no large empty band */}
      <div className="wrap-wide">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ marginTop: 34, display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', gap: 32, alignItems: 'start' }} className="arc-meta">
          <div>
            <p style={{ fontSize: '1.0625rem', color: 'var(--ink)', lineHeight: 1.55, fontWeight: 500, marginBottom: 8 }}>
              Mission control for distributed field operations at national scale.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
              Onboarding, governance, verification, and real-time decision support — one coordinated surface from field agent to administrator.
            </p>
          </div>
          {[
            { k: 'Deployment', v: 'BMC Mumbai + financial orgs' },
            { k: 'Surface', v: 'Web · iOS · real-time' },
            { k: 'Role', v: 'End-to-end product design' },
          ].map(m => (
            <div key={m.k}>
              <span className="label" style={{ marginBottom: 8 }}>{m.k}</span>
              <span style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.5 }}>{m.v}</span>
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.45 }} style={{ marginTop: 28 }}>
          <a href="/work/arc" className="link-line font-mono" style={{ fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Open the ARC case study →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function LiveChip({ label, render, trend, style, start, delay = 0 }) {
  return (
    <motion.div className="hide-mobile"
      initial={{ opacity: 0, scale: 0.9 }} animate={start ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16,1,0.3,1] }}
      style={{ position: 'absolute', zIndex: 4, background: 'rgba(20,23,29,0.82)', backdropFilter: 'blur(14px)', border: '1px solid var(--rule)', borderRadius: 12, padding: '12px 16px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', ...style }}>
      <div className="label" style={{ marginBottom: 7 }}>{label}</div>
      <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1 }}>{render}</div>
      <div style={{ fontSize: '0.7rem', color: 'var(--live)', marginTop: 6 }}>↑ {trend}</div>
    </motion.div>
  );
}
