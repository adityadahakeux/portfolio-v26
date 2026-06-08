'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// HERO — two-column: statement on the left, the live ARC dashboard on the right
// with hover parallax. Self-contained dark theme (hard fallbacks) so it renders
// correctly even if global theme vars don't reach it. start-gated entrances.
const EASE = [0.16, 1, 0.3, 1];
const WORDS = ['operations', 'finance', 'logistics', 'government', 'field teams'];

function Counter({ to, suffix = '', dur = 1.5, start }) {
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
  return <>{Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</>;
}

export default function Hero({ start = true }) {
  const netRef = useRef(null);
  const clusterRef = useRef(null);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCi((i) => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      const el = clusterRef.current;
      if (el) { el.style.setProperty('--mx', x.toFixed(3)); el.style.setProperty('--my', y.toFixed(3)); }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const c = netRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, raf, t = 0, sweep = -0.3, nodes = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 160;
    const seed = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(34, Math.min(82, Math.round((w * h) / 22000)));
      nodes = Array.from({ length: count }, () => {
        const z = Math.random();
        return { x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, z, r: 0.5 + z * 2.2, ph: Math.random() * 6.28 };
      });
    };
    const frame = () => {
      t += 0.016; sweep += 0.0015; if (sweep > 1.3) sweep = -0.3;
      ctx.clearRect(0, 0, w, h);
      const sx = sweep * (w + h) - h;
      for (let i = 0; i < nodes.length; i++) { const n = nodes[i]; n.x += n.vx; n.y += n.vy; if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20; if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20; }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < LINK) { const mid = (a.x + a.y + b.x + b.y) / 2, near = Math.max(0, 1 - Math.abs(mid / 2 - sx) / 220), depth = (a.z + b.z) / 2, al = (1 - d / LINK) * (0.05 + depth * 0.13) + near * 0.45 * (1 - d / LINK); ctx.strokeStyle = 'rgba(79,141,247,' + al + ')'; ctx.lineWidth = 0.5 + near * 0.7 + depth * 0.4; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      for (let i = 0; i < nodes.length; i++) { const n = nodes[i]; const near = Math.max(0, 1 - Math.abs((n.x + n.y) / 2 - sx) / 200); const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + n.ph), al = (0.12 + n.z * 0.22) + pulse * 0.12 + near * 0.55; ctx.shadowColor = 'rgba(79,141,247,0.8)'; ctx.shadowBlur = n.z * 6 + near * 10; ctx.fillStyle = 'rgba(79,141,247,' + al + ')'; ctx.beginPath(); ctx.arc(n.x, n.y, n.r + near * 1.6, 0, 6.28); ctx.fill(); }
      ctx.shadowBlur = 0; raf = requestAnimationFrame(frame);
    };
    const staticFrame = () => { ctx.clearRect(0, 0, w, h); for (let i = 0; i < nodes.length; i++) { const n = nodes[i]; ctx.fillStyle = 'rgba(79,141,247,' + (0.15 + n.z * 0.25) + ')'; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.28); ctx.fill(); } };
    seed(); reduce ? staticFrame() : (raf = requestAnimationFrame(frame));
    const onResize = () => { cancelAnimationFrame(raf); seed(); reduce ? staticFrame() : (raf = requestAnimationFrame(frame)); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  const rise = (d) => ({ initial: { opacity: 0, y: 18 }, animate: start ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: d, ease: EASE } });
  const reveal = (d) => ({ initial: { y: '115%' }, animate: start ? { y: 0 } : {}, transition: { duration: 1.05, delay: d, ease: EASE } });

  return (
    <section className="hero-im">
      <canvas ref={netRef} className="net" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <div className="grid" aria-hidden="true" />
      <div className="scrim" aria-hidden="true" />

      <div className="wrap">
        <div className="row">
          <div className="col-text">
            <motion.div className="pill" {...rise(0.1)}>
              <span className="statusdot" />
              <span className="font-mono pilltxt">UI/UX &amp; Product Designer · India · Available</span>
            </motion.div>

            <motion.h1 className="head" {...rise(0.25)} style={{ fontSize: 'clamp(2.4rem, 6vw, 5.2rem)', fontWeight: 600, lineHeight: 1.02, letterSpacing: '-0.035em', color: 'var(--ink, #F4F5F7)', maxWidth: '18ch', marginBottom: 28 }}>
              Designing systems <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent, #4F8DF7)', textShadow: '0 0 24px rgba(79,141,247,0.45), 0 0 8px rgba(79,141,247,0.30)' }}>people depend on.</span>
            </motion.h1>

            <motion.div className="kicker font-mono" {...rise(0.6)}>
              Built for{' '}
              <span className="cycwrap">
                <AnimatePresence mode="wait">
                  <motion.span key={ci} className="cyc" style={{ color: 'var(--accent, #4F8DF7)', textShadow: '0 0 12px rgba(79,141,247,0.35)' }} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.35, ease: EASE }}>{WORDS[ci]}</motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p className="lede" {...rise(0.72)}>
              I&apos;m a Product Designer (UI/UX) who makes complex software simple to use — the dashboards, apps, and everyday tools that run operations, finance, and field teams. I design the whole system, not just the screens. Currently at EBIXCash.
            </motion.p>

            <motion.div className="cta" {...rise(0.86)}>
              <button onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} className="btn">View the work</button>
              <a href="#contact" className="link-line font-mono getintouch">Get in touch →</a>
            </motion.div>
          </div>

          <motion.div className="col-vis" initial={{ opacity: 0, y: 20 }} animate={start ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.6, ease: EASE }}>
            <div className="stage">
              <div className="cluster" ref={clusterRef}>
                <div className="panel dash">
                  <div className="bar">
                    <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-2, rgba(244,245,247,0.62))', whiteSpace: 'nowrap' }}>ARC · Command Center</span>
                    <span className="lv"><i />Live</span>
                  </div>
                  <div className="dbody">
                    <div className="side"><i className="snav on" /><i className="snav" /><i className="snav" /><i className="snav" /><i className="snav" /></div>
                    <div className="main">
                      <div className="kpis">
                        <div className="kpi"><div className="k">Active</div><div className="v">28,542</div><div className="up">▲ 12.5%</div></div>
                        <div className="kpi"><div className="k">Productivity</div><div className="v" style={{ color: 'var(--live,#3FB873)' }}>92.4%</div><div className="up">▲ 3.7%</div></div>
                        <div className="kpi"><div className="k">Verified</div><div className="v">8,310</div><div className="up">▲ 6.1%</div></div>
                      </div>
                      <div className="chart">
                        <svg viewBox="0 0 320 100" preserveAspectRatio="none">
                          <defs><linearGradient id="arcArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4F8DF7" stopOpacity="0.35" /><stop offset="100%" stopColor="#4F8DF7" stopOpacity="0" /></linearGradient></defs>
                          <path d="M4 80 L48 62 L92 68 L136 38 L180 50 L224 22 L268 32 L316 14 L316 100 L4 100 Z" fill="url(#arcArea)" />
                          <path d="M4 80 L48 62 L92 68 L136 38 L180 50 L224 22 L268 32 L316 14" fill="none" stroke="#4F8DF7" strokeWidth="2" />
                          <circle cx="224" cy="22" r="3.5" fill="#E0915F" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel phone">
                  <div className="notch" />
                  <div className="pbody"><div className="phead" /><div className="psearch" /><div className="chips"><i className="chip on" /><i className="chip" /><i className="chip" /></div><div className="pcard"><span className="vpill">VERIFIED</span></div><div className="prow" /><div className="prow" /></div>
                </div>
                <div className="chipcard fk"><div className="l">Avg. productivity</div><div className="n">92.4%<em>▲ 3.7%</em></div></div>
                <div className="chipcard fstatus"><span className="gd" /><span>All systems operational</span></div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="metrics" {...rise(0.95)}>
          {[{ v: 10, suf: '+', l: 'Enterprise products' }, { v: 8, suf: '', l: 'Operational domains' }, { v: 3, suf: '', l: 'Flagship systems' }, { v: 28542, suf: '', l: 'Workforce on ARC' }].map((m, i) => (
            <div className="metric" key={i}>
              <div className="font-mono num"><Counter to={m.v} suffix={m.suf} start={start} /></div>
              <div className="label mlabel">{m.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .hero-im { background: var(--bg,#0E0F13); color: var(--ink,#F4F5F7); position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding: 120px 0 56px; overflow: hidden; }
        .net { position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 0; }
        .glow { position: absolute; inset: 0; z-index: 0; background: radial-gradient(54% 52% at 70% 34%, rgba(79,141,247,0.16) 0%, transparent 60%); }
        .grid { position: absolute; inset: 0; z-index: 0; opacity: 0.5; background-image: linear-gradient(rgba(244,245,247,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,247,0.022) 1px, transparent 1px); background-size: 48px 48px; -webkit-mask-image: radial-gradient(ellipse 80% 70% at 62% 38%, #000 20%, transparent 80%); mask-image: radial-gradient(ellipse 80% 70% at 62% 38%, #000 20%, transparent 80%); }
        .scrim { position: absolute; inset: 0; z-index: 1; background: linear-gradient(90deg, var(--bg,#0E0F13) 0%, rgba(14,15,19,0.55) 30%, transparent 62%); }
        .wrap { position: relative; z-index: 2; max-width: 1340px; margin: 0 auto; padding: 0 56px; width: 100%; }
        .row { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 40px; align-items: center; }
        .pill { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 30px; padding: 8px 16px; border-radius: 100px; background: var(--bg-2,#15171D); border: 1px solid var(--rule,rgba(244,245,247,0.12)); }
        .pilltxt { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-2,rgba(244,245,247,0.62)); }
        .statusdot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; background: var(--live,#3FB873); box-shadow: 0 0 0 0 rgba(63,184,115,0.55), 0 0 10px rgba(63,184,115,0.75); animation: statusPulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes statusPulse { 0% { box-shadow: 0 0 0 0 rgba(63,184,115,0.55), 0 0 10px rgba(63,184,115,0.75); } 70% { box-shadow: 0 0 0 8px rgba(63,184,115,0), 0 0 10px rgba(63,184,115,0.75); } 100% { box-shadow: 0 0 0 0 rgba(63,184,115,0), 0 0 10px rgba(63,184,115,0.75); } }
        .head { font-size: clamp(2.4rem, 6vw, 5.2rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.035em; max-width: 18ch; margin-bottom: 28px; color: var(--ink,#F4F5F7); }
        .hl { display: block; overflow: hidden; padding-bottom: 0.12em; }
        .hlin { display: block; }
        .accent { font-style: italic; font-weight: 500; color: var(--accent,#4F8DF7); text-shadow: 0 0 24px rgba(79,141,247,0.45), 0 0 8px rgba(79,141,247,0.30); }
        .kicker { font-size: 0.8rem; letter-spacing: 0.05em; color: var(--ink-2,rgba(244,245,247,0.62)); margin-bottom: 28px; }
        .cycwrap { display: inline-block; min-width: 8.5ch; text-align: left; }
        .cyc { color: var(--accent,#4F8DF7); display: inline-block; text-shadow: 0 0 12px rgba(79,141,247,0.35); }
        .lede { font-size: 1.0625rem; color: var(--ink-2,rgba(244,245,247,0.62)); line-height: 1.65; max-width: 500px; margin-bottom: 34px; }
        .cta { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
        .btn { padding: 13px 26px; border-radius: 9px; background: var(--accent,#4F8DF7); color: #fff; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; font-family: inherit; transition: transform 0.2s, box-shadow 0.3s; box-shadow: 0 8px 30px -8px rgba(79,141,247,0.6); }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px -8px rgba(79,141,247,0.75); }
        .getintouch { font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; }

        .stage { position: relative; perspective: 1500px; height: min(72vh, 560px); }
        .cluster { position: absolute; inset: 0; transform-style: preserve-3d; transform: rotateY(calc(-15deg + var(--mx,0) * 7deg)) rotateX(calc(6deg + var(--my,0) * -5deg)); animation: heroFloat 9s ease-in-out infinite; }
        @keyframes heroFloat { 0%, 100% { translate: 0 0; } 50% { translate: 0 -14px; } }
        .panel { position: absolute; background: rgba(20,23,29,0.82); border: 1px solid var(--rule,rgba(244,245,247,0.12)); border-radius: 14px; box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 50px 90px -30px rgba(0,0,0,0.85); }
        .dash { width: 78%; left: 0; top: 14%; }
        .bar { display: flex; align-items: center; gap: 9px; padding: 11px 14px; border-bottom: 1px solid var(--rule,rgba(244,245,247,0.12)); }
        .barlogo { height: 14px; width: auto; display: block; opacity: 0.92; }
        .lv { margin-left: auto; display: flex; align-items: center; gap: 6px; font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--live,#3FB873); font-family: 'DM Mono', monospace; }
        .lv i { width: 6px; height: 6px; border-radius: 50%; background: var(--live,#3FB873); box-shadow: 0 0 6px var(--live,#3FB873); }
        .dbody { display: grid; grid-template-columns: 64px 1fr; height: calc(100% - 41px); }
        .side { border-right: 1px solid var(--rule,rgba(244,245,247,0.12)); padding: 14px 10px; display: flex; flex-direction: column; gap: 9px; }
        .snav { height: 8px; border-radius: 4px; background: rgba(244,245,247,0.10); }
        .snav.on { background: rgba(79,141,247,0.55); }
        .main { padding: 14px; display: flex; flex-direction: column; gap: 12px; }
        .kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
        .kpi { background: rgba(79,141,247,0.07); border: 1px solid rgba(79,141,247,0.18); border-radius: 8px; padding: 9px; }
        .kpi .k { font-size: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3,rgba(244,245,247,0.40)); font-family: 'DM Mono', monospace; }
        .kpi .v { font-size: 0.95rem; font-weight: 600; margin-top: 5px; font-family: 'DM Mono', monospace; }
        .kpi .up { font-size: 0.5rem; color: var(--live,#3FB873); margin-top: 2px; font-family: 'DM Mono', monospace; }
        .chart { flex: 1; background: rgba(244,245,247,0.025); border: 1px solid var(--rule,rgba(244,245,247,0.12)); border-radius: 8px; padding: 10px; min-height: 96px; }
        .chart svg { width: 100%; height: 100%; }
        .phone { width: 25%; right: -3%; bottom: 2%; border-radius: 24px; transform: translateZ(80px); overflow: hidden; }
        .notch { height: 18px; display: flex; justify-content: center; align-items: flex-start; padding-top: 6px; }
        .notch::after { content: ''; width: 34%; height: 5px; border-radius: 3px; background: rgba(244,245,247,0.15); }
        .pbody { padding: 10px 11px 13px; display: flex; flex-direction: column; gap: 8px; }
        .phead { height: 22px; border-radius: 6px; background: rgba(79,141,247,0.10); border: 1px solid rgba(79,141,247,0.2); }
        .psearch { height: 13px; border-radius: 7px; background: rgba(244,245,247,0.07); }
        .chips { display: flex; gap: 5px; }
        .chip { height: 11px; flex: 1; border-radius: 6px; background: rgba(244,245,247,0.07); }
        .chip.on { background: rgba(79,141,247,0.4); }
        .pcard { height: 54px; border-radius: 9px; background: rgba(79,141,247,0.10); border: 1px solid rgba(79,141,247,0.3); position: relative; padding: 8px; }
        .vpill { position: absolute; top: 7px; left: 8px; font-size: 0.42rem; letter-spacing: 0.08em; color: #0E0F13; background: var(--live,#3FB873); padding: 2px 6px; border-radius: 5px; font-weight: 600; font-family: 'DM Mono', monospace; }
        .prow { height: 15px; border-radius: 5px; background: rgba(244,245,247,0.06); }
        .chipcard { position: absolute; padding: 11px 14px; border-radius: 11px; background: rgba(20,23,29,0.92); border: 1px solid var(--rule,rgba(244,245,247,0.12)); box-shadow: 0 30px 60px -20px rgba(0,0,0,0.8); }
        .fk { top: 2%; right: 16%; transform: translateZ(130px); animation: heroFloat2 7s ease-in-out infinite; }
        .fk .l { font-size: 0.52rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3,rgba(244,245,247,0.40)); font-family: 'DM Mono', monospace; }
        .fk .n { font-size: 1.35rem; font-weight: 600; font-family: 'DM Mono', monospace; margin-top: 3px; display: flex; align-items: baseline; gap: 7px; }
        .fk .n em { font-size: 0.62rem; font-style: normal; color: var(--live,#3FB873); }
        .fstatus { bottom: 12%; left: -4%; transform: translateZ(110px); display: flex; align-items: center; gap: 9px; animation: heroFloat2 8s ease-in-out infinite 0.5s; }
        .fstatus span { font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-2,rgba(244,245,247,0.62)); font-family: 'DM Mono', monospace; }
        .gd { width: 7px; height: 7px; border-radius: 50%; background: var(--live,#3FB873); box-shadow: 0 0 8px var(--live,#3FB873); }
        @keyframes heroFloat2 { 0%, 100% { margin-top: 0; } 50% { margin-top: -10px; } }

        .metrics { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-top: 1px solid var(--rule,rgba(244,245,247,0.12)); padding-top: 26px; margin-top: 48px; }
        .metric { flex: 1 1 0; min-width: 120px; }
        .num { font-size: clamp(1.6rem, 2.6vw, 2.4rem); font-weight: 500; color: var(--ink,#F4F5F7); line-height: 1; letter-spacing: -0.02em; white-space: nowrap; }
        .mlabel { margin-top: 10px; white-space: nowrap; }

        @media (max-width: 960px) {
          .hero-im { padding: 104px 0 40px; }
          .wrap { padding: 0 24px; }
          .row { grid-template-columns: 1fr; gap: 10px; }
          .col-vis { order: -1; }
          .stage { height: 44vh; max-width: 520px; margin: 0 auto; width: 100%; }
          .fk, .fstatus { display: none; }
          .cluster { transform: rotateY(-13deg) rotateX(8deg) scale(0.94); }
          .scrim { background: linear-gradient(180deg, transparent 0%, rgba(14,15,19,0.35) 64%, var(--bg,#0E0F13) 100%); }
          .head { font-size: clamp(2.4rem, 9vw, 3.6rem); max-width: none; }
          .lede { font-size: 1rem; }
          .metric { flex: 1 1 40%; min-width: 0; }
          .mlabel { white-space: normal; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cluster, .fk, .fstatus { animation: none; }
        }
      `}</style>
    </section>
  );
}
