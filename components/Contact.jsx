'use client';
import { RiseIn } from '@/components/Reveal';

// COLOPHON — the exhibition end card. Quiet, editorial, an invitation.
const LINKS = [
  { label: 'Email',    value: 'adityadahake.ux@gmail.com', href: 'mailto:adityadahake.ux@gmail.com?subject=Product%20Design%20Opportunity' },
  { label: 'LinkedIn', value: 'in/aditya-dahake',          href: 'https://www.linkedin.com/in/aditya-dahake-888048122/' },
  { label: 'Resume',   value: 'Download PDF',              href: '/resume.pdf', download: true },
];

export default function Contact() {
  return (
    <section id="contact" style={{ paddingTop: 90, paddingBottom: 70 }}>
      <div className="wrap-wide">
        <RiseIn>
          <span className="label" style={{ marginBottom: 36 }}>Colophon — End of Exhibition</span>
        </RiseIn>
        <RiseIn delay={0.06}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.6rem, 8vw, 7rem)', fontWeight: 400, color: 'var(--ink)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 56 }}>
            Let's build something <span style={{ fontStyle: 'italic', fontWeight: 500 }}>people depend on.</span>
          </h2>
        </RiseIn>

        <RiseIn delay={0.12}>
          <div style={{ borderTop: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }} className="colophon-grid">
            {LINKS.map((l, i) => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith('http') || l.download ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                download={l.download ? 'Aditya_Dahake_UI-UX_Designer.pdf' : undefined}
                style={{ display: 'block', padding: '34px 0', borderRight: i < LINKS.length - 1 ? '1px solid var(--rule)' : 'none', textDecoration: 'none', paddingLeft: i > 0 ? 28 : 0 }}>
                <span className="label" style={{ marginBottom: 12 }}>{l.label}</span>
                <span className="font-display link-line" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 400, color: 'var(--ink)' }}>{l.value}</span>
              </a>
            ))}
          </div>
        </RiseIn>

        <RiseIn delay={0.2}>
          <div style={{ marginTop: 72, paddingTop: 28, borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span className="label">Aditya Dahake — Product Designer</span>
            <span className="label">Designed & built in India · 2025</span>
          </div>
        </RiseIn>
      </div>
    </section>
  );
}
