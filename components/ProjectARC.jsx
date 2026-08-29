'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// PLATE I — ARC · FIELD FORCE. THE FLAGSHIP.
// One composition, read in a single glance: the agent's phone on the left,
// the supervisor's console on the right, the same target moving between them.
// Underneath, the full lifecycle so the scope of the system is visible without
// opening the case study.
// The old near-full-bleed command-centre screenshot is gone — it dominated the
// section and said "generic dashboard" rather than "field force".
// The scan-line sweep is preserved (protected element).

const EASE = [0.16, 1, 0.3, 1];

const PHONES = [
  { src: '/arc/field-home.png', cap: "The day's assignments" },
  { src: '/arc/field-target.png', cap: 'Targets, before they move' },
  { src: '/arc/training.png', cap: 'Certification in hand' },
];

const LIFECYCLE = [
  { k: 'Onboard', v: 'Agent verified and activated' },
  { k: 'Target', v: 'Set above, accepted below' },
  { k: 'Verify', v: 'Work confirmed from the field' },
  { k: 'Train', v: 'Certification carried along' },
  { k: 'Pay', v: 'Output resolves to payout' },
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

export default function ProjectARC() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="work" ref={ref} style={{ paddingTop: 84, paddingBottom: 92, position: 'relative', overflow: 'hidden' }}>
      {/* coverage motif — abstract, not a photograph of anyone */}
      <svg
        aria-hidden viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.45, pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 68% 70% at 50% 45%, #000 6%, transparent 74%)',
          WebkitMaskImage: 'radial-gradient(ellipse 68% 70% at 50% 45%, #000 6%, transparent 74%)',
        }}
      >
        <g stroke="rgba(79,141,247,0.28)" strokeWidth="1" fill="none" strokeDasharray="5 8">
          <path d="M40 380 C 240 280, 360 420, 560 300 S 880 210, 1160 330" />
          <path d="M100 110 C 300 200, 480 70, 690 170 S 960 260, 1170 130" />
        </g>
        {[[40,380],[560,300],[1160,330],[100,110],[690,170],[1170,130]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="10" fill="rgba(79,141,247,0.09)" />
            <circle cx={x} cy={y} r="2.6" fill="rgba(79,141,247,0.7)" />
          </g>
        ))}
      </svg>

      <div className="wrap-wide" style={{ position: 'relative' }}>
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 26, flexWrap: 'wrap', gap: 16 }}
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

        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{ maxWidth: 680, marginBottom: 46 }}
        >
          <h3 style={{ fontSize: 'clamp(1.45rem, 3vw, 2.25rem)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.025em', lineHeight: 1.16, margin: 0 }}>
            <span className="font-mono" style={{ color: 'var(--accent)', fontSize: '0.92em' }}>
              <Counter to={28542} start={inView} />
            </span>{' '}
            field agents.{' '}
            <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>
              Most of them never sit at a desk.
            </span>
          </h3>
          <p style={{ marginTop: 16, fontSize: '1rem', lineHeight: 1.66, color: 'var(--ink-2)', maxWidth: 560 }}>
            A target is set in an office and worked in a street. ARC is the system that keeps
            both ends looking at the same number — phone in the field, console in the office.
          </p>
        </motion.div>

        {/* ONE COMPOSITION — field on the left, office on the right, same target between them */}
        <div className="arc-stage">
          {/* FIELD */}
          <div className="arc-side">
            <div className="arc-side-head">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px rgba(79,141,247,0.8)', flex: 'none' }} />
              <span className="font-mono arc-side-label">In the field</span>
            </div>

            <div className="arc-phones">
              {PHONES.map((p, i) => (
                <motion.figure
                  key={p.src}
                  initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, delay: 0.22 + i * 0.11, ease: EASE }}
                  style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  {/* iPhone frame */}
                  <div
                    style={{
                      position: 'relative', width: '100%', borderRadius: 22, padding: 5,
                      background: 'linear-gradient(150deg, #3a3f4a 0%, #14161b 44%, #2c313b 100%)',
                      boxShadow: '0 26px 52px -26px rgba(0,0,0,0.95), inset 0 0 0 1px rgba(244,245,247,0.07)',
                    }}
                  >
                    <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: 'var(--bg-2)', aspectRatio: '9 / 19.5' }}>
                      <img
                        src={p.src} alt={`ARC field app — ${p.cap}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                      />
                      {/* dynamic island */}
                      <span aria-hidden style={{ position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)', width: '30%', height: 9, borderRadius: 100, background: '#0a0b0e' }} />
                    </div>
                    {/* side button */}
                    <span aria-hidden style={{ position: 'absolute', right: -1.5, top: '26%', width: 2, height: '11%', borderRadius: 2, background: 'rgba(244,245,247,0.22)' }} />
                  </div>
                  <figcaption className="font-mono arc-cap">{p.cap}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>

          {/* FLOW */}
          <div className="arc-flow" aria-hidden>
            <span className="arc-flow-line" />
            <span className="font-mono arc-flow-txt">same target</span>
          </div>

          {/* OFFICE */}
          <div className="arc-side">
            <div className="arc-side-head">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--live)', boxShadow: '0 0 10px rgba(63,184,115,0.8)', flex: 'none' }} />
              <span className="font-mono arc-side-label">In the office</span>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
              style={{ margin: 0 }}
            >
              <div className="arc-console">
                {/* browser chrome */}
                <div className="arc-chrome">
                  <span className="arc-dot" style={{ background: 'rgba(244,245,247,0.22)' }} />
                  <span className="arc-dot" style={{ background: 'rgba(244,245,247,0.16)' }} />
                  <span className="arc-dot" style={{ background: 'rgba(244,245,247,0.12)' }} />
                  <span className="font-mono arc-chrome-txt">arc · supervisor console</span>
                </div>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <motion.img
                    initial={{ clipPath: 'inset(0 0 100% 0)' }}
                    animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
                    transition={{ duration: 1, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
                    src="/arc/target-approval.png"
                    alt="ARC supervisor console — approving the targets the field agents receive"
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
              <figcaption className="font-mono arc-cap" style={{ textAlign: 'left' }}>
                Supervisors set and approve targets · verify field output · release payout
              </figcaption>
            </motion.figure>
          </div>
        </div>

        {/* LIFECYCLE — the whole scope of the system, at a glance */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
        >
        <div className="arc-cycle">
          {LIFECYCLE.map((s, i) => (
            <div key={s.k} className="arc-step">
              <div className="arc-step-top">
                <span className="font-mono arc-step-no">{String(i + 1).padStart(2, '0')}</span>
                {i < LIFECYCLE.length - 1 && <span className="arc-step-rule" />}
              </div>
              <div className="arc-step-k">{s.k}</div>
              <div className="arc-step-v">{s.v}</div>
            </div>
          ))}
        </div>
        </motion.div>

        {/* meta */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.72 }}
        >
        <div className="arc-meta-row">
          <div className="arc-meta-items">
            {[
              { k: 'Deployment', v: 'BMC Mumbai · KBZ Bank' },
              { k: 'Surface', v: 'Android · iOS · web console' },
              { k: 'Role', v: 'End-to-end product design' },
            ].map((m) => (
              <div key={m.k}>
                <span className="label" style={{ marginBottom: 6 }}>{m.k}</span>
                <span style={{ fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.5 }}>{m.v}</span>
              </div>
            ))}
          </div>
          <a href="/work/arc" className="link-line font-mono" style={{ fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', whiteSpace: 'nowrap' }}>
            Open the ARC case study →
          </a>
        </div>
        </motion.div>
      </div>

      <style jsx>{`
        .arc-stage {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 64px minmax(0, 0.92fr);
          align-items: start;
          gap: 0;
        }
        .arc-side { min-width: 0; }
        .arc-side-head { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .arc-side-label {
          font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3);
        }

        .arc-phones {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        .arc-cap {
          margin-top: 14px; text-align: center;
          font-size: 0.6rem; letter-spacing: 0.08em; line-height: 1.5;
          color: var(--ink-2); text-transform: none;
        }

        .arc-flow {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 12px; padding-top: 96px; height: 100%;
        }
        .arc-flow-line { display: block; width: 1px; height: 92px; background: linear-gradient(180deg, transparent, rgba(79,141,247,0.5), transparent); }
        .arc-flow-txt {
          font-size: 0.5rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-3); writing-mode: vertical-rl; white-space: nowrap;
        }

        .arc-console {
          border-radius: 11px; overflow: hidden;
          border: 1px solid var(--rule);
          background: var(--bg-2);
          box-shadow: 0 30px 62px -32px rgba(0,0,0,0.92);
        }
        .arc-chrome {
          display: flex; align-items: center; gap: 6px;
          padding: 9px 13px;
          border-bottom: 1px solid var(--rule);
          background: rgba(244,245,247,0.03);
        }
        .arc-dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
        .arc-chrome-txt {
          margin-left: 8px; font-size: 0.52rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--ink-3);
        }

        .arc-cycle {
          display: grid; grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 22px; margin-top: 62px;
          padding-top: 30px; border-top: 1px solid var(--rule);
        }
        .arc-step-top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .arc-step-no { font-size: 0.58rem; letter-spacing: 0.14em; color: var(--accent); }
        .arc-step-rule {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(79,141,247,0.34), rgba(244,245,247,0.07));
        }
        .arc-step-k {
          font-size: 0.95rem; font-weight: 600; color: var(--ink);
          letter-spacing: -0.01em; margin-bottom: 5px;
        }
        .arc-step-v { font-size: 0.82rem; line-height: 1.5; color: var(--ink-2); }

        .arc-meta-row {
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: 28px; flex-wrap: wrap; margin-top: 40px;
        }
        .arc-meta-items { display: flex; gap: 46px; flex-wrap: wrap; }

        @media (max-width: 1000px) {
          .arc-stage { grid-template-columns: 1fr; }
          .arc-flow { flex-direction: row; padding: 30px 0; height: auto; }
          .arc-flow-line { width: 92px; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(79,141,247,0.5), transparent); }
          .arc-flow-txt { writing-mode: horizontal-tb; }
          .arc-cycle { grid-template-columns: repeat(2, 1fr); gap: 26px; }
        }
        @media (max-width: 620px) {
          /* three phones side by side collapse to ~90px here, which is
             unreadable. Swipeable strip keeps them legible instead. */
          .arc-phones {
            display: flex; gap: 16px;
            overflow-x: auto; -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            padding-bottom: 8px; margin-right: -20px; padding-right: 20px;
            scrollbar-width: none;
          }
          .arc-phones::-webkit-scrollbar { display: none; }
          .arc-phones > :global(figure) {
            flex: 0 0 168px; scroll-snap-align: start;
          }
          .arc-cap { font-size: 0.56rem; }
          .arc-cycle { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
