'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MobileBackButton, NextProjectCTA } from '@/components/CaseStudyNav';
import ReadingProgress from '@/components/ReadingProgress';

const EASE = [0.25, 1, 0.5, 1];
const rev = (d = 0) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65, delay: d, ease: EASE } });

/* ── Shared primitives ─────────────────────────────────────────── */
function Label({ children, color = '#A23A22' }) {
  return <span className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color, display: 'block', marginBottom: 22 }}>{children}</span>;
}
function Divider() {
  return <div style={{ borderTop: '1px solid rgba(26,23,18,0.14)', margin: '0 0 56px' }} />;
}
function SectionWrap({ bg = '#F0ECE3', border, children, py = 100 }) {
  return (
    <div style={{ background: bg, borderTop: border ? '1px solid rgba(26,23,18,0.14)' : 'none' }}>
      <div className="wrap-reading" style={{ paddingTop: py, paddingBottom: py }}>{children}</div>
    </div>
  );
}

/* ── Premium screen frames ─────────────────────────────────────── */
function WebFrame({ src, alt, caption, tilt = 0, opacity = 1 }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 4px rgba(26,24,20,0.04), 0 12px 40px rgba(26,24,20,0.1), 0 40px 80px rgba(26,24,20,0.08)', border: '1px solid rgba(26,24,20,0.06)', transform: `rotate(${tilt}deg)`, opacity }}>
        <div style={{ background: '#F0EFED', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(26,24,20,0.07)' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#F87171', flexShrink: 0 }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FBBF24', flexShrink: 0 }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
          <div style={{ flex: 1, height: 22, background: '#E8E6E1', borderRadius: 4, marginLeft: 8 }} />
        </div>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
      {caption && <p className="font-mono" style={{ fontSize: '0.625rem', color: '#A8A39C', marginTop: 14, letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.5 }}>{caption}</p>}
    </div>
  );
}

function PhoneFrame({ src, alt, caption, tilt = 0, width = '52%', shadow = true }) {
  return (
    <div style={{ width, flexShrink: 0 }}>
      <div style={{ borderRadius: 32, overflow: 'hidden', border: '7px solid #FFF', boxShadow: shadow ? '0 8px 24px rgba(26,24,20,0.08), 0 32px 64px rgba(26,24,20,0.12)' : 'none', transform: `rotate(${tilt}deg)`, background: '#FFF', aspectRatio: '1 / 2.05' }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
      </div>
      {caption && <p className="font-mono" style={{ fontSize: '0.625rem', color: '#A8A39C', marginTop: 16, letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.5 }}>{caption}</p>}
    </div>
  );
}

function AnnotationChip({ children, color = '#A23A22' }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(184,150,90,0.1)', border: `1px solid ${color}30`, fontSize: '0.75rem', color, marginRight: 8, marginBottom: 8, fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />{children}
  </span>;
}

/* ── ARC Hero with tilt interaction ──────────────────────────── */
function ARCHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const tilt = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const y    = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div style={{ background: '#1E2D5E', position: 'relative', overflow: 'hidden', paddingTop: 148, paddingBottom: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 60% 30%, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
      <div className="wrap-reading" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }}>
          <span className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 18 }}>
            Sapio Analytics · Enterprise SaaS · 2024 · Flagship case study
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 300, color: '#F0ECE3', lineHeight: 1.07, letterSpacing: '-0.03em', marginBottom: 24 }}>
            ARC — Workforce<br />Operating System
          </h1>
          <p className="font-display" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'rgba(250,248,244,0.68)', lineHeight: 1.45, fontWeight: 300, fontStyle: 'italic', marginBottom: 0, maxWidth: 540 }}>
            A system built for visibility that was slowly making the actual work impossible.
          </p>
        </motion.div>

        {/* Tilting flagship screen */}
        <div ref={ref} style={{ marginTop: 56, perspective: 1200 }}>
          <motion.div style={{ rotate: tilt, y, transformOrigin: 'bottom center' }}>
            <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 -4px 30px rgba(0,0,0,0.3), 0 -1px 0 rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}>
              <div style={{ background: '#1A2540', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginLeft: 10 }} />
              </div>
              <img src="/arc/command-center.png" alt="ARC Workforce Analytics command center" style={{ width: '100%', display: 'block' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Lifecycle diagram ──────────────────────────────────────── */
function LifecycleDiagram() {
  const steps = [
    { n: '01', label: 'Onboard', color: '#6B7CFF' },
    { n: '02', label: 'Train',   color: '#A23A22' },
    { n: '03', label: 'Target',  color: '#4ECDC4' },
    { n: '04', label: 'Execute', color: '#A8E6CF' },
    { n: '05', label: 'Verify',  color: '#F472B6' },
    { n: '06', label: 'Govern',  color: '#FB923C' },
    { n: '07', label: 'Pay',     color: '#34D399' },
  ];
  return (
    <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 560, position: 'relative' }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <motion.div {...rev(i * 0.07)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${s.color}18`, border: `1.5px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.625rem', color: s.color, fontWeight: 500 }}>{s.n}</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#6B6760', fontWeight: 500, whiteSpace: 'nowrap' }}>{s.label}</span>
            </motion.div>
            {i < steps.length - 1 && <div style={{ width: 24, height: 1, background: 'rgba(26,23,18,0.14)', flexShrink: 0, marginBottom: 20 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ARCPage() {
  const insightRef = useRef(null);
  const { scrollYProgress: insightProgress } = useScroll({ target: insightRef, offset: ['start 0.8', 'start 0.3'] });
  const wipeWidth = useTransform(insightProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ background: '#F0ECE3', minHeight: '100vh', color: '#1A1712' }}>
      <ReadingProgress />
      <MobileBackButton />

      {/* Fixed header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(14,15,19,0.6)', backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)', borderBottom: '1px solid rgba(244,245,247,0.1)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16 }}>
          <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: '#F4F5F7' }}>← Back to Home</Link>
          <span className="font-mono" style={{ fontSize: '0.6875rem', color: '#A8A39C', letterSpacing: '0.04em' }}>ARC — Workforce Operating System</span>
          <Link href="/work/indhi" className="link-line font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.04em', color: '#A23A22' }}>Next project: INDHI →</Link>
        </div>
      </div>

      <main>
        {/* ── 01 Hero ────────────────────────────────────────── */}
        <ARCHero />

        {/* ── 02 Problem ─────────────────────────────────────── */}
        <SectionWrap bg="#F0ECE3" py={120}>
          <motion.div {...rev(0)}>
            <Label>The problem</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 28 }}>
              The more the system demanded proof of work,<br />
              <em style={{ color: '#A23A22', fontStyle: 'italic' }}>the less reliable that proof became.</em>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#4A463F', lineHeight: 1.8, maxWidth: 580 }}>
              ARC was designed to give organizations visibility into distributed field teams. But the system's demand for real-time reporting competed directly with the work itself — under execution pressure, agents began batch-updating from memory. What looked like operational data was partly reconstruction.
            </p>
          </motion.div>
        </SectionWrap>

        {/* ── 03 Operating System ────────────────────────────── */}
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)}>
            <Label>The operating system</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 32 }}>
              One platform. Seven lifecycle stages.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, marginBottom: 40, maxWidth: 560 }}>
              ARC wasn't a tracking app — it was a workforce operating system. From initial onboarding to final payout, every stage of an agent's work lifecycle ran through one governed platform.
            </p>
            <LifecycleDiagram />
          </motion.div>

          <motion.div {...rev(0.1)} style={{ marginTop: 48 }}>
            <WebFrame src="/arc/onboarding.png" alt="ARC company onboarding — 7-step setup sequence" caption="Admin onboarding · 7-stage governed setup sequence" />
          </motion.div>

          <motion.div {...rev(0.15)} style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Company configuration', 'Product master', 'Induction & training', 'Goals & performance', 'Payout management', 'Tool kit', 'Start onboarding'].map(c => <AnnotationChip key={c}>{c}</AnnotationChip>)}
          </motion.div>
        </SectionWrap>

        {/* ── 04 Onboarding & Enablement ─────────────────────── */}
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)}>
            <Label>Onboarding & enablement</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 24 }}>
              Getting to the field is itself a governed process.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, marginBottom: 36, maxWidth: 560 }}>
              An agent doesn't reach a customer until the organization, products, training programs, and performance frameworks are in place. ARC sequences and verifies each step before fieldwork begins.
            </p>
          </motion.div>
          <motion.div {...rev(0.1)}>
            <WebFrame src="/arc/training.png" alt="ARC training effectiveness — training and induction management" caption="Training effectiveness · location-wise induction completion tracking" />
          </motion.div>
        </SectionWrap>

        {/* ── 05 Target Management & Scorecards ──────────────── */}
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)}>
            <Label>Target management & scorecards</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 24 }}>
              Performance designed, not assumed.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, marginBottom: 36, maxWidth: 560 }}>
              Balanced scorecards weight KPIs across Product, Operational, Financial, and Services categories — each adding to 100%. Targets are assigned, tracked, and approved per agent.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <motion.div {...rev(0.05)}>
              <WebFrame src="/arc/scorecard.png" alt="ARC balanced scorecard templates — KPI categories" caption="Balanced scorecard · 4 KPI categories weighted to 100%" />
            </motion.div>
            <motion.div {...rev(0.1)}>
              <WebFrame src="/arc/target-approval.png" alt="ARC target approval per agent — progress tracking" caption="Target approval · per-agent progress and pending review" />
            </motion.div>
          </div>

          <motion.div {...rev(0.15)} style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Product KPIs', 'Operational KPIs', 'Financial KPIs', 'Service KPIs', 'Weighted to 100%', 'Per-agent approval'].map(c => <AnnotationChip key={c}>{c}</AnnotationChip>)}
          </motion.div>
        </SectionWrap>

        {/* ── 06 Field Execution ─────────────────────────────── */}
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)}>
            <Label>Field execution</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 24 }}>
              Where the system meets reality.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, marginBottom: 40, maxWidth: 560 }}>
              Agents update target progress, log calls and visits, upload proof, all geo-stamped — under the execution pressure that the problem section named. The field app had to serve their workflow, not compete with it.
            </p>
          </motion.div>

          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', justifyContent: 'center', paddingTop: 16, paddingBottom: 8 }}>
            <PhoneFrame src="/arc/field-home.png" alt="ARC field agent home — KPI overview and AI assistant" caption="Agent home · KPIs, performance overview & AI assistant" width="26%" tilt={-2} />
            <PhoneFrame src="/arc/field-target.png" alt="ARC field target update — proof upload and geo-stamp" caption="Target update · progress logging with geo-verified proof" width="26%" tilt={2} />
          </div>
        </SectionWrap>

        {/* ── 07 Verification & Compliance ───────────────────── */}
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)}>
            <Label>Verification & compliance</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 24 }}>
              Trust in a distributed workforce is a design problem.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, marginBottom: 40, maxWidth: 560 }}>
              ARC verifies agents through biometric face recognition, matched geo-location, timestamped activity, and human-written context. Verification that respects operational reality — "Customer was not available at the location" is as valid a record as a completed visit.
            </p>
          </motion.div>
          <motion.div {...rev(0.1)}>
            <WebFrame src="/arc/target-setting.png" alt="ARC agent face verification with geo location match" caption="Agent verification · biometric + geo-match + timestamp + comment" />
          </motion.div>
          <motion.div {...rev(0.15)} style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Face recognition', 'Geo-location match', 'Timestamp', 'Human comment', 'Location matched confirmation'].map(c => <AnnotationChip key={c}>{c}</AnnotationChip>)}
          </motion.div>
        </SectionWrap>

        {/* ── 08 Operational Visibility — THE FLAGSHIP SECTION ─ */}
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)}>
            <Label color="#1A1712">Operational visibility & decision support</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
              A distributed workforce made into<br />
              <em style={{ color: '#A23A22', fontStyle: 'italic' }}>a single decision surface.</em>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#4A463F', lineHeight: 1.8, marginBottom: 44, maxWidth: 580 }}>
              The command center turns field operations into executive intelligence — live workforce distribution across India, regional headcount, attendance and productivity scoring, expense breakdowns, and a real-time alert stream that surfaces anomalies as they happen. This is where the proof-of-work insight resolves: instead of demanding more from agents, ARC detects what's real at the system level.
            </p>
          </motion.div>

          {/* Full flagship screen — the command center (same as homepage) */}
          <motion.div {...rev(0.05)}>
            <WebFrame src="/arc/command-center.png" alt="ARC command center — full enterprise decision surface" caption="Command center · live workforce distribution, regional KPIs, alerts, expenses, and productivity scoring" />
          </motion.div>

          {/* Annotation chips for each panel */}
          <motion.div {...rev(0.1)} style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Workforce distribution map', 'Regional headcount', 'Live alerts stream', 'Attendance rate', 'Avg. productivity', 'Workforce trend', 'Expenses breakdown', 'Productivity score', 'System status'].map(c => <AnnotationChip key={c}>{c}</AnnotationChip>)}
          </motion.div>

          {/* Misuse index callout */}
          <motion.div {...rev(0.15)} style={{ marginTop: 36, padding: '24px 28px', background: '#E8E3D8', borderRadius: 10, border: '1px solid rgba(26,23,18,0.14)' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C4472A', marginTop: 6, flexShrink: 0 }} />
              <div>
                <div className="font-mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4472A', marginBottom: 8 }}>Potential Misuse Index</div>
                <p style={{ fontSize: '0.9375rem', color: '#4A463F', lineHeight: 1.7, margin: 0 }}>
                  Instead of demanding more proof from agents, ARC watches for anomalies at the system level — login failures, onboarding flag mismatches, location discrepancies, signature inconsistencies. Detection over demand.
                </p>
              </div>
            </div>
          </motion.div>
        </SectionWrap>

        {/* ── 09 Performance Governance & Payout ─────────────── */}
        <SectionWrap bg="#E8E3D8" border py={90}>
          <motion.div {...rev(0)}>
            <Label>Performance governance & payout</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 24 }}>
              Performance connects to money through design.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.75, marginBottom: 36, maxWidth: 560 }}>
              Payout templates by channel, function, role, and hierarchy close the loop from field execution to compensation — with approval workflows between governed performance and released payment.
            </p>
          </motion.div>
          <motion.div {...rev(0.1)}>
            <WebFrame src="/arc/payout.png" alt="ARC payout configuration — templates by channel and role" caption="Payout configuration · channel type, function, role, hierarchy · run payroll" />
          </motion.div>
        </SectionWrap>

        {/* ── 10 The Insight — dark band ─────────────────────── */}
        <div ref={insightRef} style={{ background: '#1A1712', position: 'relative', overflow: 'hidden' }}>
          <img src="/arc/onboarding.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06, filter: 'grayscale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #1A1712 25%, rgba(44,40,37,0.65) 100%)' }} />
          <div className="wrap-reading" style={{ paddingTop: 130, paddingBottom: 130, position: 'relative', zIndex: 1 }}>
            <Label color="rgba(184,150,90,0.75)">Design judgment</Label>
            <div style={{ position: 'relative', maxWidth: 740, marginBottom: 32 }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 300, color: '#F0ECE3', lineHeight: 1.1, letterSpacing: '-0.032em' }}>
                The more a system demands proof of work,{' '}
                <em style={{ color: '#A23A22', fontStyle: 'italic' }}>the less reliable that proof becomes.</em>
              </h2>
              <motion.div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: useTransform(wipeWidth, v => `calc(100% - ${v})`), background: '#1A1712', borderLeft: '2px solid #A23A22' }} />
            </div>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(250,248,244,0.58)', lineHeight: 1.78, maxWidth: 520 }}>
              Accountability was preserved by decoupling reporting from task completion — not by demanding more from agents in the field. Data collected at the right moment, not the worst one.
            </p>
          </div>
        </div>

        {/* ── 11 Outcome ─────────────────────────────────────── */}
        <SectionWrap bg="#F0ECE3" border py={90}>
          <motion.div {...rev(0)}>
            <Label>Outcome</Label>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#1A1712', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 24 }}>
              From tracking the workforce to understanding it.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B6760', lineHeight: 1.78, marginBottom: 44, maxWidth: 580 }}>
              ARC shipped across web and mobile as a complete workforce operating system — onboarding, training, target management, field execution, verification, governance, and payout. Adopted across financial organizations and municipal operations, including BMC Mumbai.
            </p>
          </motion.div>

          {/* Closing screen family */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, alignItems: 'start' }}>
            <motion.div {...rev(0.05)}>
              <WebFrame src="/arc/mis.png" alt="ARC MIS dashboard" caption="Decision support" />
            </motion.div>
            <motion.div {...rev(0.1)}>
              <WebFrame src="/arc/onboarding.png" alt="ARC onboarding" caption="Lifecycle governance" />
            </motion.div>
            <motion.div {...rev(0.15)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <PhoneFrame src="/arc/field-home.png" alt="ARC mobile" caption="Field cockpit" width="100%" shadow={false} />
            </motion.div>
          </div>
        </SectionWrap>

        <NextProjectCTA href="/work/indhi" label="INDHI" />

        {/* ── Footer nav ──────────────────────────────────────── */}
        <div style={{ background: '#E8E3D8', borderTop: '1px solid rgba(26,23,18,0.14)' }}>
          <div className="wrap-reading" style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Link href="/" className="link-line font-mono" style={{ fontSize: '0.75rem' }}>← Back to Home</Link>
            <Link href="/work/indhi" className="link-line font-mono" style={{ fontSize: '0.75rem', color: '#A23A22' }}>Next project: INDHI →</Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
