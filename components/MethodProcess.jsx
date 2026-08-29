'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// METHOD — the process, shown rather than described.
// Each stage carries a working miniature that performs the thing it names:
// notes cluster into themes, a flow draws itself, a confirm step slides in,
// components snap to a grid. The reading is deliberately short — the eye is
// meant to travel down the rail, not stop and read paragraphs.
// Note: styled-jsx does not reach motion.* elements, so every animated element
// here carries inline styles. Classes are only on plain DOM nodes.

const EASE = [0.16, 1, 0.3, 1];
const ACCENT = 'var(--accent, #4F8DF7)';
const RULE = 'var(--rule, rgba(244,245,247,0.12))';

/* ---------- 01 · notes cluster into themes ---------- */
function ResearchViz({ go }) {
  // scattered → three clusters
  const dots = [
    [14, 22, 18, 30], [40, 12, 22, 18], [70, 30, 26, 34], [22, 62, 20, 66],
    [55, 74, 30, 70], [86, 58, 34, 26], [8, 46, 16, 48], [64, 46, 28, 52],
    [92, 18, 68, 24], [78, 82, 66, 66], [34, 34, 70, 36], [50, 90, 72, 74],
    [96, 72, 74, 44], [26, 8, 24, 34],
  ];
  return (
    <svg viewBox="0 0 110 100" style={{ width: '100%', height: '100%' }} aria-hidden>
      {[[22, 44], [70, 40], [70, 62]].map(([cx, cy], i) => (
        <motion.circle
          key={i} cx={cx} cy={cy} r="17"
          fill="none" stroke={ACCENT} strokeOpacity="0.22" strokeDasharray="3 4"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={go ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.9 + i * 0.12, ease: EASE }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {dots.map(([x0, y0, x1, y1], i) => (
        <motion.circle
          key={i} r="2.4" fill={ACCENT}
          initial={{ cx: x0, cy: y0, opacity: 0 }}
          animate={go ? { cx: x1, cy: y1, opacity: [0, 1, 1] } : {}}
          transition={{ duration: 1.2, delay: 0.25 + i * 0.035, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* ---------- 02 · the flow draws itself ---------- */
function FlowViz({ go }) {
  const nodes = [[16, 50], [45, 24], [45, 76], [80, 50], [104, 50]];
  const paths = ['M22 50 L39 27', 'M22 50 L39 73', 'M51 27 L74 47', 'M51 73 L74 53', 'M86 50 L98 50'];
  return (
    <svg viewBox="0 0 118 100" style={{ width: '100%', height: '100%' }} aria-hidden>
      {paths.map((d, i) => (
        <motion.path
          key={i} d={d} fill="none" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.2"
          initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.5 + i * 0.16, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.4 }} animate={go ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.16, ease: EASE }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <rect x={cx - 7} y={cy - 6} width="14" height="12" rx="3"
            fill="rgba(79,141,247,0.14)" stroke={ACCENT} strokeOpacity="0.55" strokeWidth="1" />
        </motion.g>
      ))}
      {/* the edge case — the branch most products skip */}
      <motion.circle cx={45} cy={76} r="12" fill="none" stroke="#E0915F" strokeOpacity="0.75" strokeWidth="1" strokeDasharray="2 3"
        initial={{ opacity: 0 }} animate={go ? { opacity: [0, 1, 1] } : {}}
        transition={{ duration: 0.8, delay: 1.5, ease: EASE }} />
    </svg>
  );
}

/* ---------- 03 · the confirm step slides in ---------- */
function InteractionViz({ go }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 6 }}>
      <div style={{ position: 'absolute', inset: 0, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 8, width: '42%', borderRadius: 3, background: 'rgba(244,245,247,0.16)' }} />
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }} animate={go ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.09, ease: EASE }}
            style={{ height: 9, borderRadius: 3, background: 'rgba(244,245,247,0.07)' }}
          />
        ))}
      </div>
      {/* the guard rail sliding down over the destructive action */}
      <motion.div
        initial={{ y: '-120%', opacity: 0 }} animate={go ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
        style={{
          position: 'absolute', left: '11%', right: '11%', top: '34%',
          borderRadius: 7, padding: '10px 11px',
          background: 'rgba(20,23,29,0.97)', border: `1px solid ${ACCENT}`,
          boxShadow: '0 16px 34px -14px rgba(0,0,0,0.9), 0 0 26px -10px rgba(79,141,247,0.55)',
        }}
      >
        <div style={{ height: 5, width: '58%', borderRadius: 3, background: 'rgba(244,245,247,0.42)', marginBottom: 6 }} />
        <div style={{ height: 4, width: '82%', borderRadius: 3, background: 'rgba(244,245,247,0.16)', marginBottom: 9 }} />
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ height: 11, width: 30, borderRadius: 3, background: 'rgba(244,245,247,0.12)' }} />
          <motion.span
            initial={{ opacity: 0.5 }} animate={go ? { opacity: [0.5, 1, 0.7, 1] } : {}}
            transition={{ duration: 1.4, delay: 1.7, ease: 'easeInOut' }}
            style={{ height: 11, width: 34, borderRadius: 3, background: ACCENT, display: 'block' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- 04 · components snap to a grid ---------- */
function SystemViz({ go }) {
  const tiles = [
    { w: 2, h: 1 }, { w: 1, h: 1 }, { w: 1, h: 1 }, { w: 1, h: 2 },
    { w: 1, h: 1 }, { w: 2, h: 1 }, { w: 1, h: 1 }, { w: 1, h: 1 },
  ];
  return (
    <div style={{ width: '100%', height: '100%', padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '17px', gap: 5, flex: 1 }}>
        {tiles.map((t, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.5 }} animate={go ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.075, ease: EASE }}
            style={{
              gridColumn: `span ${t.w}`, gridRow: `span ${t.h}`, borderRadius: 4,
              background: 'rgba(79,141,247,0.11)', border: '1px solid rgba(79,141,247,0.34)',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {['#4F8DF7', '#3FB873', '#E0915F', 'rgba(244,245,247,0.5)', 'rgba(244,245,247,0.2)'].map((c, i) => (
          <motion.span key={i}
            initial={{ opacity: 0, y: 6 }} animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.95 + i * 0.07, ease: EASE }}
            style={{ width: 15, height: 6, borderRadius: 2, background: c, display: 'block' }}
          />
        ))}
      </div>
    </div>
  );
}

const STAGES = [
  {
    no: '01', k: 'Learn the domain',
    d: 'Custody, recovery, field ops — I learn the vocabulary before I touch a pixel.',
    tags: ['Domain interviews', 'Workflow mapping', 'Shadowing'],
    Viz: ResearchViz,
  },
  {
    no: '02', k: 'Map the logic',
    d: 'The state machine underneath decides the architecture. Not the UI patterns.',
    tags: ['Information architecture', 'State logic', 'Edge cases'],
    Viz: FlowViz,
  },
  {
    no: '03', k: 'Design the interaction',
    d: 'Where money moves, the interface has to slow the user down on purpose.',
    tags: ['Flows', 'Guard rails', 'Empty and error states'],
    Viz: InteractionViz,
  },
  {
    no: '04', k: 'Make it a system',
    d: 'One screen is a favour. A system is what survives the next twenty.',
    tags: ['Components', 'Tokens', 'Hand-off'],
    Viz: SystemViz,
  },
];

function Stage({ s, i }) {
  const ref = useRef(null);
  const go = useInView(ref, { once: true, amount: 0.45 });
  const { Viz } = s;

  return (
    <div ref={ref} className="mp-stage">
      {/* rail */}
      <div className="mp-rail" aria-hidden>
        <motion.span
          initial={{ scale: 0 }} animate={go ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: 'block', width: 11, height: 11, borderRadius: '50%',
            background: ACCENT, boxShadow: '0 0 16px rgba(79,141,247,0.85)', flex: 'none',
          }}
        />
        {i < STAGES.length - 1 && (
          <motion.span
            initial={{ scaleY: 0 }} animate={go ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{
              display: 'block', flex: 1, width: 1, transformOrigin: 'top center',
              background: `linear-gradient(180deg, ${ACCENT}, ${RULE})`,
            }}
          />
        )}
      </div>

      {/* copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={go ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ paddingBottom: 54 }}
      >
        <span className="font-mono mp-no">{s.no}</span>
        <h3 className="mp-k">{s.k}</h3>
        <p className="mp-d">{s.d}</p>
        <div className="mp-tags">
          {s.tags.map((t, j) => (
            <motion.span key={t}
              initial={{ opacity: 0, y: 6 }} animate={go ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.3 + j * 0.08, ease: EASE }}
              style={{
                display: 'inline-block', padding: '5px 10px', borderRadius: 100,
                border: `1px solid ${RULE}`, fontSize: '0.62rem', letterSpacing: '0.07em',
                color: 'var(--ink-2)', whiteSpace: 'nowrap',
              }}
              className="font-mono"
            >{t}</motion.span>
          ))}
        </div>
      </motion.div>

      {/* the miniature */}
      <motion.div
        initial={{ opacity: 0, y: 22 }} animate={go ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
        style={{ paddingBottom: 54 }}
      >
        <div className="mp-viz">
          <Viz go={go} />
        </div>
      </motion.div>
    </div>
  );
}

export default function MethodProcess() {
  const ref = useRef(null);
  const headIn = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] });
  const railFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="about" ref={ref} style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 16%)', paddingTop: 104, paddingBottom: 104, position: 'relative' }}>
      <div className="wrap-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `1px solid ${RULE}`, paddingBottom: 20, marginBottom: 46, flexWrap: 'wrap', gap: 12 }}
        >
          <span className="label" style={{ color: 'var(--accent)' }}>Method</span>
          <span className="label">Four stages · every project</span>
        </motion.div>

        <motion.h2
          className="font-display"
          initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          style={{ fontSize: 'clamp(1.6rem, 3.1vw, 2.5rem)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: 700, marginBottom: 66 }}
        >
          I don't design screens. I find the system underneath a problem —{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>then make it usable.</span>
        </motion.h2>

        {/* scroll-linked progress rail, desktop only */}
        <div className="mp-progress" aria-hidden>
          <motion.span style={{ display: 'block', width: '100%', height: railFill, background: `linear-gradient(180deg, ${ACCENT}, rgba(79,141,247,0.25))` }} />
        </div>

        <div className="mp-list">
          {STAGES.map((s, i) => <Stage key={s.no} s={s} i={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginTop: 20, paddingTop: 30, borderTop: `1px solid ${RULE}` }}
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
