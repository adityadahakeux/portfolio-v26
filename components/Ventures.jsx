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
    line: 'A social platform where creators actually get paid — live shows, ticketed concerts, subscriptions and mid-stream tips, all settling into a wallet that lives inside the feed rather than bolted on beside it.',
    tags: ['Onboarding', 'Feed & live', 'Ticketing', 'Subscriptions', 'Tipping & wallet'],
    status: 'Shipped',
    device: 'phone',
    shots: [
      '/ventures/troveez-1.png', // interests onboarding
      '/ventures/troveez-2.png', // feed
      '/ventures/troveez-3.png', // concerts
      '/ventures/troveez-4.png', // booking confirmed
      '/ventures/troveez-5.png', // tipping mid-stream
      '/ventures/troveez-6.png', // wallet
      '/ventures/troveez-7.png', // subscription confirmed
    ],
  },
  {
    no: '02',
    name: 'MIDAS',
    kind: 'AI platform · B2B web',
    accent: '#4F6BF7',
    line: 'Describe the software you need and the platform generates it. I designed the operator console behind that — repository generation tracked across ChatGPT, Claude and Deepseek, iteration counts, and customer-wise reporting for every tenant on the platform.',
    tags: ['Admin console', 'Multi-tenant', 'Model usage analytics', 'Data-dense tables'],
    status: 'Shipped',
    device: 'browser',
    shots: ['/ventures/midas-1.png', '/ventures/midas-2.png'],
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
    viz: 'soc',    // drawn abstraction, not a screenshot — nothing real exposed
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


// An abstraction of a correlation graph — drawn, not captured. Conveys
// "security operations" without exposing a single real entity.
function SocGlimpse({ accent }) {
  const NODES = [
    [16, 30, '#5BB8E8'], [30, 14, '#5BB8E8'], [34, 46, '#F0674F'],
    [56, 34, '#E8A33D'], [78, 18, '#F0674F'], [80, 52, '#E8A33D'],
    [58, 66, '#E8A33D'], [40, 76, '#5BB8E8'],
  ];
  const EDGES = [
    ['M18 31 L32 44', '#5BB8E8', 0], ['M31 16 L34 43', '#5BB8E8', 0],
    ['M37 45 L54 36', '#F0674F', 0], ['M59 33 L76 20', '#F0674F', 0],
    ['M36 49 L56 64', '#F0674F', 0], ['M60 36 L78 50', '#E8A33D', 0],
    ['M60 65 L78 54', '#E8A33D', 0], ['M42 74 L57 38', '#4F8DF7', 1],
  ];
  return (
    <div className="vt-soc">
      <div className="vt-soc-bar" aria-hidden>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span key={i} className="vt-soc-stage">
            <i style={{ background: i > 4 ? '#F0674F' : '#E8A33D' }} />
            <b style={{ width: 18 + (i % 3) * 12 }} />
          </span>
        ))}
      </div>
      <svg viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {EDGES.map(([d, c, dash], i) => (
          <path key={i} d={d} stroke={c} strokeOpacity="0.75" strokeWidth="0.7"
            fill="none" strokeDasharray={dash ? '2 2' : undefined} />
        ))}
        {NODES.map(([cx, cy, c], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4.6" fill="rgba(14,15,19,0.9)" stroke={c} strokeWidth="0.9" />
            <circle cx={cx} cy={cy} r="1.5" fill={c} fillOpacity="0.8" />
          </g>
        ))}
        <circle cx="80" cy="52" r="7" fill="none" stroke="#E8A33D" strokeOpacity="0.45" strokeWidth="0.6" />
      </svg>
      <div className="vt-soc-veil" aria-hidden>
        <span className="font-mono vt-tease-txt" style={{ color: accent }}>
          <i className="vt-pulse" style={{ background: accent }} />
          In build
        </span>
      </div>
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
        {v.viz === 'soc' ? (
          <SocGlimpse accent={v.accent} />
        ) : !hasShots ? (
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
              <motion.div key={src} className={v.tease ? 'vt-browser vt-tease' : 'vt-browser'}
                initial={{ opacity: 0, y: 20 }} animate={go ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + k * 0.12, ease: EASE }}
              >
                <div className="vt-chrome">
                  <span className="vt-dot" /><span className="vt-dot" /><span className="vt-dot" />
                </div>
                <img src={src} alt={v.tease ? `${v.name} — preview` : `${v.name} — screen ${k + 1}`} loading="lazy" />
                {v.tease && (
                  <div className="vt-tease-veil" aria-hidden>
                    <span className="font-mono vt-tease-txt" style={{ color: v.accent }}>
                      <i className="vt-pulse" style={{ background: v.accent }} />
                      In build
                    </span>
                  </div>
                )}
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
