'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// VENTURES — work taken on independently, outside the day job.
// Deliberately not labelled "freelance": the framing is ownership and range,
// which is what a hiring manager is actually reading it for.
// Each venture carries its own accent so the three read as separate products
// rather than one portfolio grid. Screens are shown, not described.
// Fill the `shots` array for a venture and its placeholder disappears.

const EASE = [0.16, 1, 0.3, 1];

const VENTURES = [
  {
    no: '01',
    name: 'Troveez',
    kind: 'Creator platform · iOS & Android',
    accent: '#F5333F',
    line: 'A social platform where creators host live shows, sell concert tickets and take tips — with the wallet built into the feed rather than bolted on beside it.',
    tags: ['Onboarding', 'Feed & live', 'Ticketing', 'Wallet & tipping'],
    status: 'Shipped',
    device: 'phone',
    shots: [
      '/ventures/troveez-1.png', // interests onboarding
      '/ventures/troveez-2.png', // feed
      '/ventures/troveez-3.png', // concerts
      '/ventures/troveez-4.png', // booking confirmed
      '/ventures/troveez-5.png', // tipping mid-stream
      '/ventures/troveez-6.png', // wallet
    ],
  },
  {
    no: '02',
    name: 'MIDAS',
    kind: 'AI platform · B2B web',
    accent: '#4F6BF7',
    line: 'Describe the software you need and the platform builds it. My job was the console behind that — the admin surface where an operator watches generation, analysis, deployment and testing across every customer.',
    tags: ['Admin console', 'Multi-tenant', 'Pipeline states', 'Data density'],
    status: 'Shipped',
    device: 'browser',
    shots: [],
  },
  {
    no: '03',
    name: 'CyberLensAI',
    kind: 'Security operations · in build',
    accent: '#3FB873',
    line: 'A security operations workspace for analysts working live incidents. In active build — more when it ships.',
    tags: ['Threat correlation', 'Analyst workflow', 'Dark UI'],
    status: 'In build',
    device: 'browser',
    shots: [],
  },
];

function Placeholder({ device, accent }) {
  return (
    <div className={device === 'phone' ? 'vt-ph-phone' : 'vt-ph-browser'} aria-hidden>
      <span className="vt-ph-grid" />
      <span className="font-mono vt-ph-txt" style={{ color: accent }}>Screens to come</span>
    </div>
  );
}

function Venture({ v, i }) {
  const ref = useRef(null);
  const go = useInView(ref, { once: true, amount: 0.25 });
  const hasShots = v.shots.length > 0;

  return (
    <article ref={ref} className="vt-item">
      <motion.div
        initial={{ opacity: 0, y: 22 }} animate={go ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
        className="vt-copy"
      >
        <div className="vt-top">
          <span className="font-mono vt-no" style={{ color: v.accent }}>{v.no}</span>
          <span className="vt-rule" style={{ background: `linear-gradient(90deg, ${v.accent}66, var(--rule))` }} />
          <span className="font-mono vt-status" style={{ color: v.status === 'In build' ? v.accent : 'var(--ink-3)' }}>
            {v.status === 'In build' && <i className="vt-pulse" style={{ background: v.accent }} />}
            {v.status}
          </span>
        </div>

        <h3 className="vt-name" style={{ color: v.accent }}>{v.name}</h3>
        <div className="font-mono vt-kind">{v.kind}</div>
        <p className="vt-line">{v.line}</p>
        <div className="vt-tags">
          {v.tags.map((t, j) => (
            <motion.span key={t} className="font-mono vt-tag"
              initial={{ opacity: 0, y: 6 }} animate={go ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + j * 0.06, ease: EASE }}
              style={{ borderColor: `${v.accent}44` }}
            >{t}</motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 26 }} animate={go ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
        className="vt-visual"
        style={{ '--vt-accent': v.accent }}
      >
        {!hasShots ? (
          <Placeholder device={v.device} accent={v.accent} />
        ) : v.device === 'phone' ? (
          <div className="vt-phones">
            {v.shots.map((src, k) => (
              <motion.div key={src} className="vt-phone"
                initial={{ opacity: 0, y: 20 }} animate={go ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + k * 0.08, ease: EASE }}
              >
                <div className="vt-phone-screen">
                  <img src={src} alt={`${v.name} — screen ${k + 1}`} loading="lazy" />
                  <span className="vt-island" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="vt-browsers">
            {v.shots.map((src, k) => (
              <motion.div key={src} className="vt-browser"
                initial={{ opacity: 0, y: 20 }} animate={go ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + k * 0.12, ease: EASE }}
              >
                <div className="vt-chrome">
                  <span className="vt-dot" /><span className="vt-dot" /><span className="vt-dot" />
                </div>
                <img src={src} alt={`${v.name} — screen ${k + 1}`} loading="lazy" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </article>
  );
}

export default function Ventures() {
  const ref = useRef(null);
  const headIn = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="ventures" ref={ref} className="vt-sec">
      <div className="vt-glow" aria-hidden />
      <div className="wrap-wide" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--rule)', paddingBottom: 20, marginBottom: 42, flexWrap: 'wrap', gap: 12 }}
        >
          <span className="label" style={{ color: 'var(--accent)' }}>Ventures</span>
          <span className="label">Built independently · three products</span>
        </motion.div>

        <motion.h2
          className="font-display vt-h2"
          initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
        >
          Work nobody assigned me.{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Start to ship, alone.</span>
        </motion.h2>

        <div className="vt-list">
          {VENTURES.map((v, i) => <Venture key={v.no} v={v} i={i} />)}
        </div>
      </div>
    </section>
  );
}
