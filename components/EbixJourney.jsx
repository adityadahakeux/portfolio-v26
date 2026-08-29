'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// CURRENT WORK — EBIXCash. Sits directly under the hero because this is the
// most recent and most relevant work. Deliberately shallow: three products,
// one line each, read as a single journey rather than three case studies.
// The deep case studies (ARC, INDHI, TruMac) come after.
// Client names are withheld on purpose.

const EASE = [0.16, 1, 0.3, 1];

const WORK = [
  {
    no: '01',
    name: 'Private Equity',
    domain: 'US market',
    line: 'Capital placed into property and land, held and tracked as shareholdings.',
    shot: '/ebix/private-equity.png',
    // 1.86 wide vs a 16:10 slot — contain keeps both offering cards and the
    // left nav rail intact. White ground so the letterbox is invisible.
    fit: 'contain', pos: 'top center', bg: '#FFFFFF',
  },
  {
    no: '02',
    name: 'RM Dashboards',
    domain: 'Wealth management',
    line: 'Every client on one screen — portfolio status, wealth under management, and what needs attention today.',
    shot: '/ebix/rm-dashboard.png',
    // very tall page — anchor to the top so the header, nav rail and KPI strip
    // stay visible rather than squashing the whole page into a thumbnail
    fit: 'cover', pos: 'top center', bg: '#FFFFFF',
  },
  {
    no: '03',
    name: 'Vantage',
    domain: 'Loan against securities',
    line: 'Clients borrow against the portfolio they already hold, without having to sell any of it.',
    shot: '/ebix/vantage.png',
    fit: 'cover', pos: 'top center', bg: '#FFFFFF',
  },
];

export default function EbixJourney() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="ebix" ref={ref} className="ebix">
      <div className="bg-grid" aria-hidden />
      <div className="bg-glow" aria-hidden />

      <div className="wrap-wide" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
          className="head-block"
          style={{ maxWidth: 660, marginBottom: 76 }}
        >
          <span className="label eyebrow">
            <i className="dot" />
            Currently · EBIXCash
          </span>
          <h2 className="h2">
            Three of the products I work on.{' '}
            <span className="font-serif accent">All of them handle real money.</span>
          </h2>
          <p className="sub">
            EBIXCash builds the wealth, custody and lending platforms that banks and advisors
            run on. I design across them — these are three.
          </p>
        </motion.div>

        <div className="grid">
          {WORK.map((w, i) => (
            <motion.article
              key={w.no}
              className="card"
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.12 + i * 0.13, ease: EASE }}
            >
              <div className="shot">
                {w.shot ? (
                  <div className="frame" style={{ background: w.bg }}>
                    <img
                      src={w.shot} alt={`${w.name} — EBIXCash`} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: w.fit, objectPosition: w.pos, display: 'block' }}
                    />
                  </div>
                ) : (
                  <div className="ph" aria-hidden>
                    <span className="ph-grid" />
                    <span className="font-mono ph-txt">Screenshot to come</span>
                  </div>
                )}
                <span className="shot-edge" aria-hidden />
              </div>

              <div className="rail">
                <motion.span
                  className="node"
                  style={{ width: 7, height: 7, borderRadius: '50%', flex: 'none', background: 'var(--accent, #4F8DF7)', boxShadow: '0 0 12px rgba(79,141,247,0.75)' }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.34 + i * 0.13, ease: EASE }}
                />
                <motion.span
                  className="line"
                  style={{ flex: 1, height: 1, transformOrigin: 'left center', background: 'linear-gradient(90deg, rgba(79,141,247,0.42), var(--rule, rgba(244,245,247,0.12)))' }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.13, ease: EASE }}
                />
                <span className="font-mono no">{w.no}</span>
              </div>

              <h3 className="name">{w.name}</h3>
              <div className="font-mono domain">{w.domain}</div>
              <p className="line-txt">{w.line}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ebix { position: relative; padding: 104px 0 100px; overflow: hidden; }

        .bg-grid {
          position: absolute; inset: 0; opacity: 0.5;
          background-image:
            linear-gradient(rgba(244,245,247,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,245,247,0.028) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 70% 62% at 30% 40%, #000 12%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 70% 62% at 30% 40%, #000 12%, transparent 78%);
        }
        .bg-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 46% 52% at 22% 26%, rgba(79,141,247,0.10) 0%, transparent 62%);
        }

        .head-block { max-width: 660px; margin-bottom: 60px; }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          color: var(--accent); margin-bottom: 18px;
        }
        .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--live, #3FB873);
          box-shadow: 0 0 0 3px rgba(63,184,115,0.16);
        }
        .h2 {
          font-size: clamp(1.6rem, 3.4vw, 2.6rem); font-weight: 600;
          color: var(--ink); letter-spacing: -0.025em; line-height: 1.12; margin: 0;
        }
        .accent {
          font-style: italic; font-weight: 500; color: var(--accent);
          text-shadow: 0 0 22px rgba(79,141,247,0.32);
        }
        .sub {
          margin: 18px 0 0; font-size: 1rem; line-height: 1.65;
          color: var(--ink-2, rgba(244,245,247,0.62)); max-width: 500px;
        }

        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 44px; }

        .card { position: relative; }

        .shot {
          position: relative; border-radius: 12px; overflow: hidden;
          border: 1px solid var(--rule, rgba(244,245,247,0.12));
          background: var(--bg-2, #15171D);
          box-shadow: 0 26px 54px -30px rgba(0,0,0,0.85);
          transition: border-color 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.45s ease;
        }
        .frame { aspect-ratio: 16 / 10; overflow: hidden; }
        .card:hover .shot {
          transform: translateY(-5px);
          border-color: rgba(79,141,247,0.42);
          box-shadow: 0 34px 64px -30px rgba(0,0,0,0.9), 0 0 42px -18px rgba(79,141,247,0.4);
        }

        .shot-edge {
          position: absolute; inset: 0; pointer-events: none; border-radius: 12px;
          background: linear-gradient(160deg, rgba(244,245,247,0.06) 0%, transparent 42%);
        }

        .ph {
          position: relative; aspect-ratio: 16 / 10;
          display: flex; align-items: center; justify-content: center;
        }
        .ph-grid {
          position: absolute; inset: 0; opacity: 0.7;
          background-image:
            linear-gradient(rgba(244,245,247,0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,245,247,0.032) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 82%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 82%);
        }
        .ph-txt {
          position: relative; font-size: 0.58rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--ink-3, rgba(244,245,247,0.34));
        }

        .rail { display: flex; align-items: center; gap: 12px; margin: 26px 0 16px; }
        .node {
          width: 7px; height: 7px; border-radius: 50%; flex: none;
          background: var(--accent, #4F8DF7);
          box-shadow: 0 0 12px rgba(79,141,247,0.75);
          transition: box-shadow 0.4s ease;
        }
        .card:hover .node { box-shadow: 0 0 20px rgba(79,141,247,1); }
        .line {
          flex: 1; height: 1px; transform-origin: left center;
          background: linear-gradient(90deg, rgba(79,141,247,0.42), var(--rule, rgba(244,245,247,0.12)));
        }
        .no {
          font-size: 0.62rem; letter-spacing: 0.16em; flex: none;
          color: var(--ink-3, rgba(244,245,247,0.38));
        }

        .name {
          margin: 0; font-size: 1.125rem; font-weight: 600;
          color: var(--ink); letter-spacing: -0.012em;
        }
        .domain {
          font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--accent); opacity: 0.85; margin: 9px 0 13px;
        }
        .line-txt {
          margin: 0; font-size: 0.9375rem; line-height: 1.64;
          color: var(--ink-2, rgba(244,245,247,0.62));
        }

        @media (max-width: 900px) {
          .ebix { padding: 76px 0 72px; }
          .grid { grid-template-columns: 1fr; gap: 52px; }
          .head-block { margin-bottom: 46px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .shot, .node { transition: none; }
          .card:hover .shot { transform: none; }
        }
      `}</style>
    </section>
  );
}
