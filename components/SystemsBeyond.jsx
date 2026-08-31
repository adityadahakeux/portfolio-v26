'use client';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// THE ARCHIVE — a curated archive experience, not a static list.
// Entering from TruMac: a short "archive room" intro, then the project files
// emerge progressively and stack with slight overlap. Desktop hover expands
// the active file (summary + metadata) and compresses the inactive ones.
const DOMAINS = ['Fintech', 'Gov-Tech', 'Recovery', 'Insurance', 'Ed-Tech', 'Legal'];

const SYSTEMS = [
  { i: '01', name: 'Wealth Management Platform', tag: 'Fintech', domain: 'Fintech · EBIXCash', year: '2024', logo: '/logos/ebixcash.png',
    insight: 'The decision surface for relationship managers, where each interface choice carries direct financial consequence for high-net-worth clients.',
    meta: ['Wealth · capital markets', 'Web · advisor console', 'Product design'] },
  { i: '02', name: 'Enterprise Legal Case Management', tag: 'Legal', domain: 'Legal Tech', year: '2023', logo: null,
    insight: 'Domain vocabulary had to be learned before wireframing began. Case-state logic determined the architecture, not UI patterns.',
    meta: ['Legal operations', 'Web · case management', 'UX + research'] },
  { i: '03', name: 'Secure Debt', tag: 'Recovery', domain: 'Recovery Operations', year: '2022', logo: '/logos/securedebt.png',
    insight: 'Data existed; prioritization did not. Agents needed to know which case to pursue first, not see everything at once.',
    meta: ['Debt recovery', 'Web · agent tooling', 'Product design'] },
  { i: '04', name: 'Insure Efficient', tag: 'Insurance', domain: 'InsurTech', year: '2022', logo: '/logos/insure.png',
    insight: 'Policy complexity belongs in the underwriting engine, not the user journey. Simplification was an architectural decision.',
    meta: ['Insurance · B2C + B2B', 'Web + mobile', 'End-to-end design'] },
  { i: '05', name: 'Sikho Kamana', tag: 'Ed-Tech', domain: 'EdTech', year: '2021', logo: '/logos/sikho.png',
    insight: 'Skill platforms lose users after intent, not motivation. The friction lives after the decision, not before it.',
    meta: ['Education · mobile', 'iOS + Android', 'Product design'] },
  { i: '06', name: 'Samarth', tag: 'Gov-Tech', domain: 'Gov-Tech · National scale', year: '2022', logo: '/logos/samarth.png',
    insight: 'A government recruitment and onboarding platform serving users meeting public digital infrastructure for the first time.',
    meta: ['Government · national', 'Web · public', 'UX design'] },
];

export default function SystemsBeyond() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.2'] });
  // intro "entering the archive room" line
  const introOp = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const introY = useTransform(scrollYProgress, [0, 0.6], [30, 0]);

  return (
    <section id="systems" ref={ref} style={{ paddingTop: 40, paddingBottom: 80, position: 'relative' }}>
      {/* Archive-room intro — bridges TruMac into the archive */}
      <div className="wrap-wide">
        <motion.div style={{ opacity: introOp, y: introY, textAlign: 'center', marginBottom: 56 }}>
          <span className="label" style={{ color: 'var(--accent)', marginBottom: 18 }}>More Work</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 720, margin: '0 auto' }}>
            Six more systems, across <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>eight operational domains.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 520, margin: '18px auto 0' }}>
            The same method — find the system underneath, then make it usable — applied wherever the work demanded it.
          </p>
        </motion.div>

        {/* Domain chips — a recruiter hiring for fintech can isolate fintech
            instead of reading all six. Dims rather than removes, so the shape
            of the whole body of work stays visible. */}
        <div className="arch-chips">
          <button
            className={`font-mono arch-chip${filter === null ? ' is-on' : ''}`}
            onClick={() => setFilter(null)}
          >All</button>
          {DOMAINS.map((d) => (
            <button
              key={d}
              className={`font-mono arch-chip${filter === d ? ' is-on' : ''}`}
              onClick={() => setFilter(filter === d ? null : d)}
            >{d}</button>
          ))}
        </div>

        {/* Stacked archive files */}
        <div onMouseLeave={() => {}} style={{ position: 'relative' }}>
          {SYSTEMS.map((s, idx) => {
            const isActive = active === idx;
            const dimmed = filter !== null && s.tag !== filter;
            return (
              <motion.div key={s.i}
                onMouseEnter={() => !dimmed && setActive(idx)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  marginTop: idx === 0 ? 0 : -1,
                  background: isActive && !dimmed ? 'var(--bg-2)' : 'transparent',
                  borderTop: '1px solid var(--rule)',
                  borderBottom: idx === SYSTEMS.length - 1 ? '1px solid var(--rule)' : 'none',
                  cursor: 'default',
                  transition: 'background 360ms ease, opacity 360ms ease, filter 360ms ease',
                  zIndex: isActive ? 2 : 1,
                }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1.1fr 1.3fr',
                  gap: 28, alignItems: 'start',
                  padding: isActive ? '34px 28px' : '24px 28px',
                  opacity: dimmed ? 0.26 : 1,
                  filter: dimmed ? 'saturate(0.25)' : 'none',
                  transition: 'padding 360ms ease, opacity 360ms ease, filter 360ms ease',
                }} className="archive-grid">
                  <span className="plate-no" style={{ color: isActive ? 'var(--accent)' : 'var(--ink-3)', transition: 'color 360ms ease', paddingTop: 4 }}>{s.i}</span>
                  <div>
                    {s.logo && <img src={s.logo} alt={s.name} className="archive-logo" style={{ marginBottom: 12 }} />}
                    <h3 style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.5rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 8 }}>
                      {s.name}
                    </h3>
                    <span className="label">{s.domain} · {s.year}</span>
                  </div>
                  <div>
                    {/* Insight and metadata both wait for hover. Six insight
                        paragraphs shown at once is a wall of text and makes the
                        list unscannable; it also left the hover with almost no
                        payoff. Collapsed, the archive reads as six tight rows
                        and hovering actually rewards you. */}
                    <motion.div initial={false} animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
                      <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 0 }}>{s.insight}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', marginTop: 16 }}>
                        {s.meta.map(m => (
                          <span key={m} className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.04em', color: 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />{m}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                    {/* a hint of what is behind the row, always visible */}
                    {!isActive && (
                      <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)', opacity: 0.7 }}>
                        {s.meta[0]}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="font-mono" style={{ marginTop: 40, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', textAlign: 'center', lineHeight: 2 }}>
          Fintech · Field Force · Gov-Tech · HRMS · Insurance · IoT · Ed-Tech · Legal
        </motion.p>
      </div>
    </section>
  );
}
