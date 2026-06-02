'use client';
import { RiseIn } from '@/components/Reveal';

// METHOD / ABOUT — richer editorial layout. The statement, what I actually do
// (capabilities), the context, and the working toolset. No imagery — the work
// is the identity — but structured so a recruiter reads competence fast.
const CAPABILITIES = [
  { k: 'UX Research', d: 'Domain interviews, workflow mapping, usability testing' },
  { k: 'Interaction Design', d: 'Complex flows, state logic, edge-case handling' },
  { k: 'Design Systems', d: 'Scalable components, tokens, cross-platform consistency' },
  { k: 'Prototyping', d: 'High-fidelity, motion, and developer hand-off' },
];

export default function About() {
  return (
    <section id="about" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 14%)', paddingTop: 110, paddingBottom: 110 }}>
      <div className="wrap-wide">
        {/* header row */}
        <RiseIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--rule)', paddingBottom: 22, marginBottom: 56, flexWrap: 'wrap', gap: 12 }}>
            <span className="label" style={{ color: 'var(--accent)' }}>About · Method</span>
            <span className="label">Aditya Dahake — Product Designer, India</span>
          </div>
        </RiseIn>

        {/* two-column: statement + capabilities */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 64, alignItems: 'start' }} className="about-grid">
          {/* left — statement */}
          <div>
            <RiseIn delay={0.05}>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: 36 }}>
                I don't design screens. I find the system underneath a problem — <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>then make it usable.</span>
              </h2>
            </RiseIn>
            <RiseIn delay={0.12}>
              <p style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 24 }}>
                My work lives inside operational complexity — the workflows, role conflicts, and edge cases most products are designed around rather than for. Currently at <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>EBIXCash</strong>, designing financial products across wealth management, capital markets, and custody, where an interface decision carries direct financial consequence.
              </p>
            </RiseIn>
            <RiseIn delay={0.18}>
              <p style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 36 }}>
                The method is transferable: enter any complex operational domain, learn its logic before touching a pixel, and design the system that lets people depend on it. I also take on <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>freelance</strong> product and UI/UX work.
              </p>
            </RiseIn>
            {/* domains */}
            <RiseIn delay={0.24}>
              <div className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', lineHeight: 2 }}>
                Fintech · Field Force · Gov-Tech · HRMS · Insurance · IoT · Ed-Tech · Legal
              </div>
            </RiseIn>
          </div>

          {/* right — capabilities + tools */}
          <div>
            <RiseIn delay={0.1}>
              <span className="label" style={{ marginBottom: 22 }}>What I do</span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {CAPABILITIES.map((c, i) => (
                  <div key={c.k} style={{ padding: '18px 0', borderTop: '1px solid var(--rule)', borderBottom: i === CAPABILITIES.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                    <div style={{ fontSize: '1.0625rem', color: 'var(--ink)', fontWeight: 600, marginBottom: 5 }}>{c.k}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{c.d}</div>
                  </div>
                ))}
              </div>
            </RiseIn>
            <RiseIn delay={0.2}>
              <div style={{ marginTop: 36 }}>
                <span className="label" style={{ marginBottom: 18 }}>Tools</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }}>
                  {['Figma', 'Miro', 'Claude', 'ChatGPT', 'Cursor', 'Notion', 'Jira', 'Mixpanel', 'Hotjar', 'Illustrator', 'Photoshop'].map((t, i) => (
                    <span key={t} className="font-display" style={{ fontSize: '1.05rem', fontWeight: 400, fontStyle: i % 2 ? 'italic' : 'normal', color: 'var(--ink-2)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </RiseIn>
          </div>
        </div>
      </div>
    </section>
  );
}
