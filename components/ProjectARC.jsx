'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// PLATE I — ARC · FIELD FORCE. THE FLAGSHIP.
// Reordered deliberately: the phones come first because ARC is a field-force
// system and a desktop dashboard never says that. The agent's day is the
// narrative — assignments, targets, training — and the command centre appears
// afterwards as the other end of the same system.
// The scan-line sweep is preserved (protected element).

const EASE = [0.16, 1, 0.3, 1];

const FIELD = [
  {
    src: '/arc/field-home.png',
    no: '01',
    label: 'The agent opens the day',
    note: 'Assignments, route and current status — on the phone that goes out with them.',
  },
  {
    src: '/arc/field-target.png',
    no: '02',
    label: 'Targets, before they move',
    note: 'What the supervisor set, visible to the agent at the start rather than argued about at the end.',
  },
  {
    src: '/arc/training.png',
    no: '03',
    label: 'Certification in the pocket',
    note: 'Training carried into the field instead of filed in an office nobody visits.',
  },
];

function Counter({ to, suffix = '', dur = 1.8, start, decimals = 0 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / (dur * 1000));
      setV((1 - Math.pow(1 - p, 3)) * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, dur, start]);
  const val = decimals
    ? v.toFixed(decimals)
    : Math.round(v).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return <>{val}{suffix}</>;
}

// Abstract coverage motif — dashed routes and pins. Suggests distributed field
// work without pretending to be a photograph of anyone.
function FieldRoutes() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.5, pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 66% 70% at 50% 40%, #000 8%, transparent 76%)',
        WebkitMaskImage: 'radial-gradient(ellipse 66% 70% at 50% 40%, #000 8%, transparent 76%)',
      }}
    >
      <g stroke="rgba(79,141,247,0.30)" strokeWidth="1" fill="none" strokeDasharray="5 7">
        <path d="M60 300 C 240 210, 330 330, 520 220 S 830 150, 1010 250" />
        <path d="M120 90 C 300 170, 470 60, 660 140 S 940 220, 1140 110" />
        <path d="M40 190 C 260 250, 420 180, 600 300" />
      </g>
      {[[60,300],[520,220],[1010,250],[120,90],[660,140],[1140,110],[600,300]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="rgba(79,141,247,0.10)" />
          <circle cx={x} cy={y} r="2.6" fill="rgba(79,141,247,0.75)" />
        </g>
      ))}
    </svg>
  );
}

export default function ProjectARC() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="work" ref={ref} style={{ paddingTop: 84, paddingBottom: 94, position: 'relative', overflow: 'hidden' }}>
      <FieldRoutes />

      <div className="wrap-wide" style={{ position: 'relative' }}>
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 30, flexWrap: 'wrap', gap: 16 }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
            <span className="plate-no" style={{ color: 'var(--accent)' }}>FLAGSHIP / 01</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.03em' }}>ARC</h2>
            <span className="label" style={{ display: 'inline' }}>Field force management</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 100, background: 'rgba(63,184,115,0.1)', border: '1px solid rgba(63,184,115,0.3)' }}>
            <span className="pulse-dot" />
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--live)' }}>Deployed · BMC Mumbai · KBZ Bank</span>
          </div>
        </motion.div>

        {/* the claim, stated plainly */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          style={{ maxWidth: 620, marginBottom: 56 }}
        >
          <h3 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.025em', lineHeight: 1.14, margin: 0 }}>
            <span className="font-mono" style={{ color: 'var(--accent)', fontSize: '0.92em', letterSpacing: '-0.01em' }}>
              <Counter to={28542} start={inView} />
            </span>{' '}
            field agents.{' '}
            <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>
              Most of them never sit at a desk.
            </span>
          </h3>
          <p style={{ marginTop: 18, fontSize: '1rem', lineHeight: 1.68, color: 'var(--ink-2)', maxWidth: 540 }}>
            So the system had to work on a phone first, held one-handed, outdoors, on a bad
            connection — and still roll up into something a supervisor could govern.
          </p>
        </motion.div>

        {/* THE FIELD — phones lead, because this is what ARC actually is */}
        <div className="arc-phones">
          {FIELD.map((f, i) => (
            <motion.div
              key={f.no}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.24 + i * 0.14, ease: EASE }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* phone frame */}
              <div
                style={{
                  position: 'relative', borderRadius: 26, padding: 9,
                  background: 'linear-gradient(160deg, rgba(244,245,247,0.13), rgba(244,245,247,0.03))',
                  boxShadow: '0 34px 70px -34px rgba(0,0,0,0.9)',
                }}
              >
                <div style={{ position: 'relative', borderRadius: 19, overflow: 'hidden', background: 'var(--bg-2)', aspectRatio: '9 / 19' }}>
                  <img
                    src={f.src} alt={`ARC field app — ${f.label}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                  <span aria-hidden style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 54, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.55)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 22 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px rgba(79,141,247,0.8)', flex: 'none' }} />
                <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.16em', color: 'var(--ink-3)' }}>{f.no}</span>
              </div>
              <h4 style={{ margin: '10px 0 8px', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{f.label}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--ink-2)' }}>{f.note}</p>
            </motion.div>
          ))}
        </div>

        {/* THE OTHER END — command centre, secondary and smaller */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          style={{ marginTop: 74 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
            <span className="label" style={{ display: 'inline', color: 'var(--accent)' }}>And what the supervisor sees</span>
            <span style={{ flex: 1, minWidth: 40, height: 1, background: 'var(--rule)' }} />
          </div>

          <div className="mount" style={{ padding: 'clamp(8px, 1vw, 13px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
              <motion.img
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
                transition={{ duration: 1.1, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                src="/arc/command-center.png"
                alt="ARC command centre — the supervisor view of the same field data"
                style={{ width: '100%', display: 'block' }}
              />

              {/* scan-line sweep — the 'live' signature (protected) */}
              {inView && (
                <motion.div aria-hidden
                  initial={{ top: '0%', opacity: 0 }}
                  animate={{ top: ['0%', '100%'], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2.6, delay: 1, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
                  style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(79,141,247,0.8), transparent)', boxShadow: '0 0 18px rgba(79,141,247,0.6)', zIndex: 3 }} />
              )}
            </div>
          </div>
        </motion.div>

        {/* meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="arc-meta"
          style={{ marginTop: 38, display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', gap: 32, alignItems: 'start' }}
        >
          <div>
            <p style={{ fontSize: '1.0625rem', color: 'var(--ink)', lineHeight: 1.55, fontWeight: 500, marginBottom: 8 }}>
              One system, from the agent's phone to the administrator's console.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>
              Onboarding, target setting, verification and payout — designed so the field and
              the office are looking at the same numbers.
            </p>
          </div>
          {[
            { k: 'Deployment', v: 'BMC Mumbai · KBZ Bank' },
            { k: 'Surface', v: 'Android · iOS · web console' },
            { k: 'Role', v: 'End-to-end product design' },
          ].map((m) => (
            <div key={m.k}>
              <span className="label" style={{ marginBottom: 8 }}>{m.k}</span>
              <span style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.5 }}>{m.v}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.62 }} style={{ marginTop: 28 }}
        >
          <a href="/work/arc" className="link-line font-mono" style={{ fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Open the ARC case study →
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .arc-phones {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 46px;
          max-width: 940px;
        }
        @media (max-width: 900px) {
          .arc-phones { grid-template-columns: 1fr; gap: 56px; max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
