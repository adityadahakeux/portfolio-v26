'use client';
import { useEffect, useRef } from 'react';

// Cinematic systems backdrop — a living node constellation with drifting
// motion, pulsing connection lines, and a slow diagonal light sweep. Canvas
// based for smoothness even when rich. The on-brand answer to a hero video:
// it reads as operational intelligence, not a creative-studio reel.
// Respects reduced-motion (renders one static frame) and pauses off-screen.
export default function SystemsBackdrop({
  accent = '79,141,247',   // signal blue (rgb, no alpha)
  density = 64,
  className,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let raf = 0, running = true, sweep = 0, t = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // seed nodes scaled to area
      const count = Math.max(28, Math.min(density, Math.round((w * h) / 24000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
        r: 0.6 + Math.random() * 1.4,
        ph: Math.random() * Math.PI * 2, // pulse phase
      }));
    };

    const LINK = 150; // px connect distance

    const frame = () => {
      if (!running) return;
      t += 0.016; sweep += 0.0016; if (sweep > 1.3) sweep = -0.3;
      ctx.clearRect(0, 0, w, h);

      // move nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }

      // sweep position (diagonal band of light that brightens what it crosses)
      const sweepX = sweep * (w + h) - h; // diagonal offset

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            // proximity to sweep band brightens the link
            const mid = (a.x + a.y + b.x + b.y) / 2;
            const near = Math.max(0, 1 - Math.abs(mid / 2 - sweepX) / 220);
            const base = (1 - d / LINK) * 0.16;
            const alpha = base + near * 0.5 * (1 - d / LINK);
            ctx.strokeStyle = `rgba(${accent},${alpha})`;
            ctx.lineWidth = 0.6 + near * 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // nodes (with sweep glow + gentle pulse)
      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.abs((n.x + n.y) / 2 - sweepX) / 200);
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + n.ph);
        const a = 0.25 + pulse * 0.2 + near * 0.6;
        const rr = n.r + near * 1.6;
        if (near > 0.15) {
          ctx.shadowColor = `rgba(${accent},0.8)`; ctx.shadowBlur = 10 * near;
        } else ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(${accent},${a})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, rr, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    };

    const staticFrame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) { ctx.strokeStyle = `rgba(${accent},${(1 - d / LINK) * 0.14})`; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      for (const n of nodes) { ctx.fillStyle = `rgba(${accent},0.4)`; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill(); }
    };

    resize();
    if (reduce) { staticFrame(); }
    else { raf = requestAnimationFrame(frame); }

    const onResize = () => { resize(); if (reduce) staticFrame(); };
    window.addEventListener('resize', onResize);

    // pause when off-screen
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
      else cancelAnimationFrame(raf);
    }, { threshold: 0 });
    io.observe(canvas);

    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); io.disconnect(); };
  }, [accent, density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className}
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}
