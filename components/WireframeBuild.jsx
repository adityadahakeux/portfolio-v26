'use client';
import { motion } from 'framer-motion';

// Wireframe-building animation — the hero's "I'm a product designer" signal.
// A transparent light wireframe of a web dashboard + a mobile screen assembles
// element by element (soft UI blocks drawing in), then loops. Pure SVG/Framer,
// reduced-motion safe (renders the completed wireframe statically).

const STROKE = 'rgba(79,141,247,0.55)';
const FILL = 'rgba(79,141,247,0.07)';
const SOFT = 'rgba(244,245,247,0.10)';
const ACCENT = 'rgba(79,141,247,0.9)';

// one looping draw cycle
const LOOP = 7; // seconds

function Block({ x, y, w, h, rx = 3, delay, fill = SOFT, stroke = SOFT, dur = 0.5 }) {
  return (
    <motion.rect
      x={x} y={y} width={w} height={h} rx={rx}
      fill={fill} stroke={stroke} strokeWidth={1}
      initial={{ opacity: 0, scaleY: 0.4 }}
      animate={{ opacity: [0, 1, 1, 1, 0], scaleY: [0.4, 1, 1, 1, 1] }}
      transition={{ duration: LOOP, times: [0, delay / LOOP, (delay + dur) / LOOP, 0.9, 1], repeat: Infinity, ease: 'easeOut' }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    />
  );
}

function Line({ x1, y1, x2, y2, delay, stroke = STROKE }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
      transition={{ duration: LOOP, times: [0, delay / LOOP, (delay + 0.5) / LOOP, 0.9, 1], repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function WireframeBuild() {
  return (
    <div aria-hidden style={{ position: 'relative', width: '100%', maxWidth: 560, margin: '0 auto' }}>
      <svg viewBox="0 0 560 460" width="100%" style={{ overflow: 'visible' }}>
        {/* ── drafting grid ── */}
        <defs>
          <pattern id="wf-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(244,245,247,0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id="wf-mask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="1" />
            <stop offset="85%" stopColor="#000" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="560" height="460" fill="url(#wf-grid)" opacity="0.6" />

        {/* ── WEB DASHBOARD wireframe ── */}
        <g>
          {/* frame */}
          <motion.rect x="20" y="40" width="380" height="280" rx="10"
            fill="rgba(20,23,29,0.5)" stroke={STROKE} strokeWidth="1.4"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: LOOP, times: [0, 0.05, 0.85, 0.92, 1], repeat: Infinity }} />
          {/* top bar */}
          <Block x={20} y={40} w={380} h={34} rx={10} delay={0.4} fill={FILL} stroke={STROKE} />
          <motion.circle cx={40} cy={57} r={4} fill={ACCENT}
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 1, 0] }} transition={{ duration: LOOP, times: [0, 0.08, 0.85, 0.92, 1], repeat: Infinity }} />
          <Block x={120} y={50} w={120} h={14} rx={7} delay={0.6} />
          {/* sidebar */}
          <Block x={20} y={74} w={86} h={246} delay={0.8} fill="rgba(244,245,247,0.04)" stroke={SOFT} />
          <Block x={36} y={92} w={54} h={9} rx={4} delay={1.0} />
          <Block x={36} y={110} w={54} h={9} rx={4} delay={1.1} />
          <Block x={36} y={128} w={54} h={9} rx={4} delay={1.2} />
          {/* KPI cards */}
          <Block x={120} y={88} w={84} h={50} delay={1.4} fill={FILL} stroke={STROKE} />
          <Block x={214} y={88} w={84} h={50} delay={1.55} fill={FILL} stroke={STROKE} />
          <Block x={308} y={88} w={80} h={50} delay={1.7} fill={FILL} stroke={STROKE} />
          {/* chart area */}
          <Block x={120} y={150} w={178} h={158} delay={2.0} fill="rgba(244,245,247,0.03)" stroke={SOFT} />
          {/* chart line */}
          <motion.path d="M134 280 L160 250 L186 262 L212 220 L238 235 L264 200 L284 215"
            fill="none" stroke={ACCENT} strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: LOOP, times: [0, 0.42, 0.85, 0.92, 1], repeat: Infinity, ease: 'easeInOut' }} />
          {/* side list */}
          <Block x={308} y={150} w={80} h={158} delay={2.2} fill="rgba(244,245,247,0.03)" stroke={SOFT} />
          <Line x1={318} y1={172} x2={378} y2={172} delay={2.4} stroke={SOFT} />
          <Line x1={318} y1={190} x2={378} y2={190} delay={2.5} stroke={SOFT} />
          <Line x1={318} y1={208} x2={378} y2={208} delay={2.6} stroke={SOFT} />

          {/* minimal color micro-elements */}
          {/* green live dot on the top bar */}
          <motion.circle cx={378} cy={57} r={3.5} fill="#3FB873"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1, 0.4, 1, 0] }}
            transition={{ duration: LOOP, times: [0, 0.12, 0.3, 0.5, 0.7, 0.85, 1], repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 5px #3FB873)' }} />
          {/* one KPI card value goes accent-green (positive metric) */}
          <motion.rect x={128} y={118} width={28} height={6} rx={3} fill="#3FB873"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: LOOP, times: [0, 0.22, 0.3, 0.85, 1], repeat: Infinity }} />
          {/* a small amber data point on the chart */}
          <motion.circle cx={264} cy={200} r={3} fill="#E0915F"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 1] }}
            transition={{ duration: LOOP, times: [0, 0.5, 0.58, 0.85, 1], repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 4px rgba(224,145,95,0.8))' }} />
        </g>

        {/* ── MOBILE wireframe (overlapping, front-right) ── */}
        <g>
          <motion.rect x="410" y="150" width="130" height="270" rx="22"
            fill="rgba(20,23,29,0.7)" stroke={STROKE} strokeWidth="1.6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 1, 0], y: [20, 0, 0, 0, 0] }}
            transition={{ duration: LOOP, times: [0, 0.3, 0.85, 0.92, 1], repeat: Infinity, ease: 'easeOut' }} />
          {/* notch */}
          <Block x={455} y={160} w={40} h={6} rx={3} delay={2.5} fill={SOFT} stroke="none" />
          {/* header */}
          <Block x={422} y={178} w={106} h={26} rx={6} delay={2.7} fill={FILL} stroke={STROKE} />
          {/* search */}
          <Block x={422} y={212} w={106} h={16} rx={8} delay={2.9} />
          {/* category chips */}
          <Block x={422} y={236} w={30} h={12} rx={6} delay={3.05} fill={FILL} stroke={STROKE} />
          <Block x={458} y={236} w={30} h={12} rx={6} delay={3.15} />
          <Block x={494} y={236} w={34} h={12} rx={6} delay={3.25} />
          {/* hero card */}
          <Block x={422} y={256} w={106} h={62} rx={8} delay={3.5} fill={FILL} stroke={ACCENT} />
          {/* small green "verified/active" pill on the mobile hero card */}
          <motion.rect x={430} y={264} width={22} height={8} rx={4} fill="#3FB873"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: LOOP, times: [0, 0.5, 0.6, 0.85, 1], repeat: Infinity }} />
          {/* list rows */}
          <Block x={422} y={326} w={106} h={20} rx={5} delay={3.7} />
          <Block x={422} y={350} w={106} h={20} rx={5} delay={3.8} />
          <Block x={422} y={374} w={106} h={20} rx={5} delay={3.9} />
          {/* bottom nav */}
          <Block x={422} y={398} w={106} h={14} rx={5} delay={4.1} fill={FILL} stroke={STROKE} />
        </g>

        {/* ── building cursor dot that travels (the 'designer at work' touch) ── */}
        <motion.circle r={4} fill={ACCENT}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            cx: [60, 160, 260, 350, 470, 475, 475],
            cy: [57, 113, 113, 230, 287, 350, 405],
          }}
          transition={{ duration: LOOP, times: [0, 0.1, 0.3, 0.5, 0.65, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(79,141,247,0.9))' }} />

        {/* labels */}
        <motion.text x="20" y="345" fill="rgba(244,245,247,0.32)" fontSize="9" fontFamily="'DM Mono', monospace" letterSpacing="1.5"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.7, 0] }} transition={{ duration: LOOP, times: [0, 0.5, 0.85, 1], repeat: Infinity }}>
          WEB · DESKTOP
        </motion.text>
        <motion.text x="410" y="438" fill="rgba(244,245,247,0.32)" fontSize="9" fontFamily="'DM Mono', monospace" letterSpacing="1.5"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.7, 0] }} transition={{ duration: LOOP, times: [0, 0.55, 0.85, 1], repeat: Infinity }}>
          MOBILE
        </motion.text>
      </svg>
    </div>
  );
}
