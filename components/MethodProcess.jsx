'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

// METHOD — the real UX pipeline, named the way the industry names it, with a
// recognisable artifact for each stage: an affinity board, a task flow with a
// decision branch, a wireframe resolving into UI, a component library, and
// redlined hand-off specs.
// Each stage is scrubbed by scroll: the artifact assembles as the recruiter
// scrolls into it, so scrolling further literally builds the next step.
// Styles live in globals.css — styled-jsx never reaches sub-components.

const EASE = [0.16, 1, 0.3, 1];
const ACCENT = 'var(--accent, #4F8DF7)';
const INK3 = 'rgba(244,245,247,0.34)';

/* Reveal one item across a slice of the stage's scroll progress. */
function useSlice(p, i, n, spread = 0.62) {
  const start = (i / n) * spread;
  const end = start + (1 - spread) + 0.06;
  return {
    opacity: useTransform(p, [start, end], [0, 1]),
    y: useTransform(p, [start, end], [10, 0]),
  };
}

/* ---------- 01 · affinity board — research notes grouped into themes ---------- */
function AffinityViz({ p }) {
  const NOTES = [
    [10, 16], [30, 12], [10, 30], [30, 30],
    [78, 16], [98, 12], [78, 30], [98, 30], [88, 44],
    [146, 16], [166, 12], [146, 30],
  ];
  const items = NOTES.map((_, i) => useSlice(p, i, NOTES.length));
  const cols = [0, 1, 2].map((i) => useSlice(p, i, 3, 0.4));
  const tint = ['rgba(224,145,95,0.30)', 'rgba(79,141,247,0.30)', 'rgba(63,184,115,0.28)'];
  const stroke = ['rgba(224,145,95,0.7)', 'rgba(79,141,247,0.75)', 'rgba(63,184,115,0.7)'];
  return (
    <svg viewBox="0 0 200 57" style={{ width: '100%', height: '100%' }} aria-hidden>
      {[8, 76, 144].map((x, i) => (
        <motion.g key={i} style={{ opacity: cols[i].opacity }}>
          <rect x={x} y="4" width="46" height="2" rx="1" fill={stroke[i]} fillOpacity="0.5" />
        </motion.g>
      ))}
      {NOTES.map(([x, y], i) => {
        const c = i < 4 ? 0 : i < 9 ? 1 : 2;
        return (
          <motion.rect
            key={i} x={x} y={y} width="17" height="11" rx="1.5"
            fill={tint[c]} stroke={stroke[c]} strokeWidth="0.6"
            style={{ opacity: items[i].opacity, y: items[i].y }}
          />
        );
      })}
    </svg>
  );
}

/* ---------- 02 · task flow with a decision branch ---------- */
function FlowViz({ p }) {
  const steps = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => useSlice(p, i, 8));
  return (
    <svg viewBox="0 0 200 57" style={{ width: '100%', height: '100%' }} aria-hidden>
      <defs>
        <marker id="mp-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2" orient="auto">
          <path d="M0 0 L4 2 L0 4 z" fill={ACCENT} fillOpacity="0.75" />
        </marker>
      </defs>

      <motion.rect x="6" y="21" width="30" height="15" rx="2.5" fill="rgba(79,141,247,0.14)" stroke={ACCENT} strokeWidth="0.8" style={{ opacity: steps[0].opacity, y: steps[0].y }} />
      <motion.path d="M37 28 L54 28" stroke={ACCENT} strokeOpacity="0.6" strokeWidth="0.9" markerEnd="url(#mp-arrow)" style={{ opacity: steps[1].opacity }} />

      {/* decision */}
      <motion.path d="M70 19 L83 28 L70 37 L57 28 Z" fill="rgba(224,145,95,0.16)" stroke="#E0915F" strokeWidth="0.9" style={{ opacity: steps[2].opacity, y: steps[2].y }} />

      <motion.path d="M84 25 L100 14" stroke={ACCENT} strokeOpacity="0.6" strokeWidth="0.9" markerEnd="url(#mp-arrow)" style={{ opacity: steps[3].opacity }} />
      <motion.path d="M84 32 L100 43" stroke="#E0915F" strokeOpacity="0.65" strokeWidth="0.9" strokeDasharray="2 2" markerEnd="url(#mp-arrow)" style={{ opacity: steps[4].opacity }} />

      <motion.rect x="103" y="5" width="30" height="15" rx="2.5" fill="rgba(79,141,247,0.14)" stroke={ACCENT} strokeWidth="0.8" style={{ opacity: steps[5].opacity, y: steps[5].y }} />
      {/* the unhappy path, kept visible on purpose */}
      <motion.rect x="103" y="37" width="30" height="15" rx="2.5" fill="rgba(224,145,95,0.12)" stroke="#E0915F" strokeWidth="0.8" strokeDasharray="2 2" style={{ opacity: steps[6].opacity, y: steps[6].y }} />

      <motion.g style={{ opacity: steps[7].opacity }}>
        <path d="M134 12 L152 24" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="0.9" markerEnd="url(#mp-arrow)" />
        <path d="M134 45 L152 33" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="0.9" markerEnd="url(#mp-arrow)" />
        <rect x="156" y="21" width="30" height="15" rx="2.5" fill="rgba(63,184,115,0.14)" stroke="var(--live, #3FB873)" strokeWidth="0.8" />
      </motion.g>
    </svg>
  );
}

/* ---------- 03 · wireframe resolving into UI ---------- */
function WireframeViz({ p }) {
  const parts = [0, 1, 2, 3, 4, 5, 6].map((i) => useSlice(p, i, 7));
  // the last third of the scroll fills grey boxes with real UI colour
  const fill = useTransform(p, [0.66, 1], [0, 1]);
  const barFill = useTransform(fill, (v) => `rgba(79,141,247,${0.12 + v * 0.26})`);
  const barStroke = useTransform(fill, (v) => `rgba(79,141,247,${0.25 + v * 0.55})`);
  const grey = 'rgba(244,245,247,0.10)';
  const greyS = 'rgba(244,245,247,0.30)';
  return (
    <svg viewBox="0 0 200 57" style={{ width: '100%', height: '100%' }} aria-hidden>
      {/* frame */}
      <motion.rect x="5" y="4" width="190" height="49" rx="3" fill="none" stroke={greyS} strokeWidth="0.7" style={{ opacity: parts[0].opacity }} />
      {/* sidebar */}
      <motion.rect x="9" y="8" width="17" height="41" rx="2" fill={grey} stroke={greyS} strokeWidth="0.5" style={{ opacity: parts[1].opacity, y: parts[1].y }} />
      {/* header */}
      <motion.rect x="30" y="8" width="60" height="6" rx="1.5" fill={grey} stroke={greyS} strokeWidth="0.5" style={{ opacity: parts[2].opacity, y: parts[2].y }} />
      {/* stat cards — these are what resolve into colour */}
      {[30, 68, 106, 144].map((x, i) => (
        <motion.rect key={x} x={x} y={18} width="34" height="14" rx="2"
          stroke={barStroke} strokeWidth="0.6"
          style={{ opacity: parts[3 + (i > 2 ? 2 : i)].opacity, y: parts[3 + (i > 2 ? 2 : i)].y, fill: barFill }} />
      ))}
      {/* table rows */}
      {[36, 42, 48].map((y, i) => (
        <motion.rect key={y} x={30} y={y} width={148} height={3.4} rx="1.2" fill={grey}
          style={{ opacity: parts[6].opacity }} />
      ))}
    </svg>
  );
}

/* ---------- 04 · component library ---------- */
function SystemViz({ p }) {
  const it = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => useSlice(p, i, 9));
  return (
    <svg viewBox="0 0 200 57" style={{ width: '100%', height: '100%' }} aria-hidden>
      {/* buttons */}
      <motion.rect x="8" y="8" width="30" height="11" rx="2.5" fill={ACCENT} fillOpacity="0.85" style={{ opacity: it[0].opacity, y: it[0].y }} />
      <motion.rect x="42" y="8" width="30" height="11" rx="2.5" fill="none" stroke={ACCENT} strokeWidth="0.8" style={{ opacity: it[1].opacity, y: it[1].y }} />
      {/* input */}
      <motion.rect x="8" y="24" width="64" height="11" rx="2" fill="rgba(244,245,247,0.06)" stroke="rgba(244,245,247,0.28)" strokeWidth="0.6" style={{ opacity: it[2].opacity, y: it[2].y }} />
      <motion.rect x="12" y="28.5" width="18" height="2.4" rx="1" fill={INK3} style={{ opacity: it[2].opacity }} />
      {/* toggle */}
      <motion.g style={{ opacity: it[3].opacity, y: it[3].y }}>
        <rect x="8" y="40" width="18" height="9" rx="4.5" fill="rgba(63,184,115,0.28)" stroke="var(--live,#3FB873)" strokeWidth="0.6" />
        <circle cx="21" cy="44.5" r="3" fill="var(--live,#3FB873)" />
      </motion.g>
      {/* chips */}
      {[32, 50, 68].map((x, i) => (
        <motion.rect key={x} x={x} y={40} width="15" height="9" rx="4.5" fill="rgba(79,141,247,0.14)" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="0.6" style={{ opacity: it[4].opacity, y: it[4].y }} />
      ))}
      {/* divider */}
      <motion.line x1="86" y1="8" x2="86" y2="49" stroke="rgba(244,245,247,0.16)" strokeWidth="0.6" style={{ opacity: it[5].opacity }} />
      {/* type scale */}
      <motion.text x="96" y="20" fontSize="13" fill="rgba(244,245,247,0.85)" fontFamily="Georgia, serif" style={{ opacity: it[5].opacity, y: it[5].y }}>Aa</motion.text>
      <motion.text x="120" y="20" fontSize="9" fill="rgba(244,245,247,0.6)" fontFamily="Georgia, serif" style={{ opacity: it[6].opacity, y: it[6].y }}>Aa</motion.text>
      <motion.text x="136" y="20" fontSize="6.5" fill="rgba(244,245,247,0.42)" fontFamily="Georgia, serif" style={{ opacity: it[7].opacity, y: it[7].y }}>Aa</motion.text>
      {/* tokens */}
      {['#4F8DF7', '#3FB873', '#E0915F', 'rgba(244,245,247,0.55)', 'rgba(244,245,247,0.22)'].map((c, i) => (
        <motion.rect key={i} x={96 + i * 20} y={32} width="16" height="8" rx="2" fill={c} style={{ opacity: it[8].opacity, y: it[8].y }} />
      ))}
      <motion.rect x="96" y="45" width="96" height="2" rx="1" fill="rgba(244,245,247,0.10)" style={{ opacity: it[8].opacity }} />
    </svg>
  );
}

/* ---------- 05 · redlined hand-off spec ---------- */
function HandoffViz({ p }) {
  const it = [0, 1, 2, 3, 4, 5].map((i) => useSlice(p, i, 6));
  const RED = '#E0915F';
  return (
    <svg viewBox="0 0 200 57" style={{ width: '100%', height: '100%' }} aria-hidden>
      {/* the component being specced */}
      <motion.rect x="52" y="18" width="76" height="22" rx="3" fill="rgba(79,141,247,0.16)" stroke={ACCENT} strokeWidth="0.9" style={{ opacity: it[0].opacity, y: it[0].y }} />
      <motion.rect x="60" y="26" width="30" height="3" rx="1.5" fill="rgba(244,245,247,0.55)" style={{ opacity: it[0].opacity }} />

      {/* horizontal measure */}
      <motion.g style={{ opacity: it[1].opacity }}>
        <line x1="52" y1="48" x2="128" y2="48" stroke={RED} strokeWidth="0.7" />
        <line x1="52" y1="45" x2="52" y2="51" stroke={RED} strokeWidth="0.7" />
        <line x1="128" y1="45" x2="128" y2="51" stroke={RED} strokeWidth="0.7" />
        <text x="82" y="55.5" fontSize="4.6" fill={RED} fontFamily="monospace">240px</text>
      </motion.g>

      {/* vertical measure */}
      <motion.g style={{ opacity: it[2].opacity }}>
        <line x1="44" y1="18" x2="44" y2="40" stroke={RED} strokeWidth="0.7" />
        <line x1="41" y1="18" x2="47" y2="18" stroke={RED} strokeWidth="0.7" />
        <line x1="41" y1="40" x2="47" y2="40" stroke={RED} strokeWidth="0.7" />
        <text x="20" y="31" fontSize="4.6" fill={RED} fontFamily="monospace">48px</text>
      </motion.g>

      {/* padding guides */}
      <motion.rect x="58" y="23" width="64" height="12" fill="none" stroke={RED} strokeOpacity="0.6" strokeWidth="0.5" strokeDasharray="1.6 1.6" style={{ opacity: it[3].opacity }} />

      {/* spec callouts */}
      <motion.g style={{ opacity: it[4].opacity, y: it[4].y }}>
        <line x1="128" y1="22" x2="146" y2="14" stroke={RED} strokeOpacity="0.7" strokeWidth="0.6" />
        <circle cx="146" cy="14" r="1.6" fill={RED} />
        <text x="150" y="15.6" fontSize="4.4" fill={RED} fontFamily="monospace">radius 8</text>
      </motion.g>
      <motion.g style={{ opacity: it[5].opacity, y: it[5].y }}>
        <line x1="128" y1="36" x2="146" y2="44" stroke={RED} strokeOpacity="0.7" strokeWidth="0.6" />
        <circle cx="146" cy="44" r="1.6" fill={RED} />
        <text x="150" y="45.6" fontSize="4.4" fill={RED} fontFamily="monospace">accent/600</text>
      </motion.g>
    </svg>
  );
}

const STAGES = [
  {
    no: '01', k: 'Discovery & Research',
    d: 'I sit with the relationship managers, the field agents, the recovery team — until their vocabulary is mine.',
    tags: ['Stakeholder interviews', 'Domain immersion', 'Journey mapping'],
    Viz: AffinityViz,
  },
  {
    no: '02', k: 'Information Architecture & User Flows',
    d: 'Sitemaps, task flows, and every unhappy path. In finance the exception is the job, not the footnote.',
    tags: ['IA', 'Task flows', 'State logic', 'Edge cases'],
    Viz: FlowViz,
  },
  {
    no: '03', k: 'Wireframes & Prototypes',
    d: 'Low-fidelity first. If the flow fails in grey boxes, no amount of visual polish is going to save it.',
    tags: ['Lo-fi wireframes', 'Hi-fi UI', 'Clickable prototypes'],
    Viz: WireframeViz,
  },
  {
    no: '04', k: 'UI Design & Design System',
    d: 'Components, tokens, and a type scale — so the fiftieth screen still looks like the first one.',
    tags: ['Design system', 'Design tokens', 'Dashboard design', 'Responsive'],
    Viz: SystemViz,
  },
  {
    no: '05', k: 'Testing & Developer Hand-off',
    d: 'Usability runs and a heuristic pass, then redlines an engineer can build from without asking me twice.',
    tags: ['Usability testing', 'Heuristic evaluation', 'Redlines', 'QA support'],
    Viz: HandoffViz,
  },
];

function Stage({ s, i, last }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.28'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const { Viz } = s;

  return (
    <div ref={ref} className="mp-stage">
      <div className="mp-rail" aria-hidden>
        <motion.span
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: 'block', width: 11, height: 11, borderRadius: '50%', background: ACCENT, boxShadow: '0 0 16px rgba(79,141,247,0.85)', flex: 'none' }}
        />
        {!last && (
          <span className="mp-rail-track">
            <motion.span className="mp-rail-fill" style={{ scaleY: p }} />
          </span>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ paddingBottom: 50 }}
      >
        <span className="font-mono mp-no">{s.no}</span>
        <h3 className="mp-k">{s.k}</h3>
        <p className="mp-d">{s.d}</p>
        <div className="mp-tags">
          {s.tags.map((t, j) => (
            <motion.span key={t}
              initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.25 + j * 0.07, ease: EASE }}
              className="font-mono mp-tag"
            >{t}</motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        style={{ paddingBottom: 50 }}
      >
        <div className="mp-viz"><Viz p={p} /></div>
      </motion.div>
    </div>
  );
}

export default function MethodProcess() {
  const ref = useRef(null);
  const headIn = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="about" ref={ref} style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 16%)', paddingTop: 104, paddingBottom: 104, position: 'relative' }}>
      <div className="wrap-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--rule)', paddingBottom: 20, marginBottom: 44, flexWrap: 'wrap', gap: 12 }}
        >
          <span className="label" style={{ color: 'var(--accent)' }}>Method</span>
          <span className="label">Research → Hand-off · every project</span>
        </motion.div>

        <motion.h2
          className="font-display"
          initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          style={{ fontSize: 'clamp(1.6rem, 3.1vw, 2.5rem)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: 700, marginBottom: 62 }}
        >
          I don't design screens. I find the system underneath a problem —{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>then make it usable.</span>
        </motion.h2>

        <div className="mp-list">
          {STAGES.map((s, i) => (
            <Stage key={s.no} s={s} i={i} last={i === STAGES.length - 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginTop: 16, paddingTop: 30, borderTop: '1px solid var(--rule)' }}
        >
          <div className="mp-foot">
            <div>
              <span className="label" style={{ marginBottom: 12 }}>Domains</span>
              <div className="font-mono mp-domains">
                Fintech · Field Force · Gov-Tech · HRMS · Insurance · IoT · Ed-Tech · Legal
              </div>
            </div>
            <div>
              <span className="label" style={{ marginBottom: 12 }}>Tools</span>
              <div className="mp-tools">
                {['Figma', 'Miro', 'Claude', 'Cursor', 'Notion', 'Jira', 'Mixpanel', 'Hotjar'].map((t, i) => (
                  <span key={t} className="font-display" style={{ fontStyle: i % 2 ? 'italic' : 'normal' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
