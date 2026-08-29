# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow

**Standing authorization** — granted 2026-08-29 by the site owner (a designer, non-technical). This replaces the previous ask-every-time rule.

**Request → Implement → `npm run build` → Commit → Push to `portfolio-v27` → Vercel preview → Owner reviews preview link → Owner approves → Merge to `main` → Live**

### Pre-approved — do NOT stop to ask
- Editing files
- `git commit`

### Pushing — the owner does this
`gh` is not installed and the macOS installer GitHub ships is unsigned, so Claude has no GitHub
credentials and CANNOT push. Do not attempt `git push`; it fails with "could not read Username".

After committing, tell the owner to open **GitHub Desktop** and click **Push origin**. That is the
only manual step in the loop. Everything before it (edit, build check, commit) and everything after
it (verify the preview, report back) is Claude's job.

### Still requires explicit approval every time
- **Merging to `main` / publishing to adityadahake.com.** The owner approves by looking at the preview link and saying yes. Never merge to `main` on your own initiative.

### Rules for every change
1. Run `npm run build` before pushing. Never push a failing build.
2. After the preview deploys, open it, verify it visually, and hand the owner the link plus a screenshot.
3. Explain what changed in plain, non-technical language. No jargon. The owner is a designer.
4. Work section by section, one at a time.

### Protected elements — never modify these

| Element | Location |
|---|---|
| Hero canvas particle network | `Hero.jsx` — the `<canvas ref={netRef}>` and its `useEffect` draw loop |
| Lenis smooth scroll | `SmoothScroll.jsx` — duration, easing, and anchor-intercept logic |
| ARC scan-line sweep | `ProjectARC.jsx` — the `motion.div` with `top: ['0%','100%']` animation |
| Motion architecture | `lib/motion.js` tokens; `Reveal.jsx`; `ScrollFX.jsx` — easing curves, `RiseIn`, `Unwrap` |
| Dark theme | `globals.css (:root)` — all `--bg`, `--ink`, `--accent`, `--live` custom properties |

---

## Commands

```bash
npm run dev      # start local dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

No test suite exists. There is no CI configuration.

## Stack

Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, Lenis (smooth scroll). All pages are `'use client'`. No server components, no API routes, no database.

## Project Layout

```
app/
  layout.jsx          — root HTML, metadata, Google Fonts import
  page.jsx            — homepage orchestrator
  globals.css         — all CSS custom properties, global classes, responsive utilities
  work/arc/page.jsx   — ARC case study (~614 lines, self-contained)
  work/indhi/page.jsx — INDHI case study (~594 lines, self-contained)
  work/trumac/page.jsx — TruMac case study (~513 lines, self-contained)
components/           — one file per section
lib/motion.js         — shared Framer Motion tokens (EXPO, EASE, DUR, reveal(), stagger())
public/arc/ indhi/ trumac/ logos/ — static images and logos
```

## Architecture

### Homepage composition

`page.jsx` gates the entire page behind a `ready` boolean set by `LoadingSequence`'s `onDone` callback. `Hero` receives `start={ready}` and uses it to fire its entrance animations. All other sections animate on scroll via `useInView` or `whileInView` independently of `ready`.

Section order: `LoadingSequence → Navbar → Hero → LogoStrip → ProjectARC → ProjectINDHI → TruMac → SystemsBeyond → About → TrustBand → Contact`

`ProjectARC`, `ProjectINDHI`, and `SystemsBeyond` are wrapped in `<Unwrap>` from `ScrollFX.jsx` (scroll-driven fade+lift). `TruMac` is excluded because it owns a 175vh sticky scroll section internally.

### Styling system

Three layers coexist — do not mix accidentally:

1. **CSS custom properties** defined in `globals.css (:root)`: `--bg`, `--bg-2`, `--bg-3`, `--ink`, `--ink-2`, `--ink-3`, `--rule`, `--accent` (`#4F8DF7`), `--live` (`#3FB873`). Use these everywhere; do not hardcode colours.
2. **Tailwind utilities** for typography classes (`font-mono`, `font-display`, `font-serif`) and responsive helpers (`hide-mobile`, `show-mobile`, `wrap`, `wrap-wide`, `wrap-reading`). Note: `wrap`, `wrap-wide`, `wrap-reading` are defined in `globals.css`, not Tailwind — they set `max-width` and horizontal padding.
3. **Inline styles** for all component layout (grids, spacing, colours). This is the dominant pattern.
4. **`<style jsx>`** blocks used only in `Hero.jsx` for complex CSS that requires pseudo-elements and keyframe animations local to that component.

### Font classes

- `className="font-mono"` → DM Mono (loaded)
- `className="font-serif"` or `className="font-display"` → Playfair Display (loaded via Google Fonts as "Playfair Display")
- **Important:** `tailwind.config.js` maps `font-display` to `'Fraunces'`, which is NOT loaded. The `.font-display` class in `globals.css` correctly maps to Playfair Display. Always use the CSS class, not the Tailwind utility `font-display`, for Playfair.

### Animation conventions

`lib/motion.js` exports the canonical easing curves and a `reveal()` factory — use these for new scroll-reveal animations instead of inlining values. The case study pages define a local `rev()` factory (same shape) rather than importing from `lib/motion.js` — this is a known inconsistency.

`Reveal.jsx` exports `RiseIn` (whileInView fade+rise) and `WipeImage` (clipPath wipe). Use these in homepage sections.

Smooth scrolling is provided by Lenis in `SmoothScroll.jsx`, which wraps the whole page. Anchor link clicks (`href="#section"`) are intercepted and routed through Lenis with a -80px offset for the fixed navbar.

### Case study pages

Each case study page is entirely self-contained — `BrowserFrame`, `PhoneFrame`, `ScrollFrame`, `Counter`, `Mono`, `H2`, `Body`, and `Em` are defined locally in each file. Do not add shared imports between them without updating all three.

The fixed header in each case study (Back / Title / Next) and mobile back button (`MobileBackButton`) come from `CaseStudyNav.jsx`. Reading progress bar comes from `ReadingProgress.jsx`.

### Logo and image treatment

Logo opacity is controlled via CSS classes, not inline styles:
- `.logo-img` — employer/freelance logos in LogoStrip (opacity 0.55, hover 1.0)
- `.trust-logo` — org logos in TrustBand (opacity 0.5, hover 1.0)
- `.archive-logo` — logos in SystemsBeyond rows (opacity 0.5, hover 0.95)

Screenshots are wrapped in `.mount` (defined in `globals.css`) for the dark-panel framing treatment.

### Known issues

- `WireframeBuild.jsx` and `SystemsBackdrop.jsx` exist but are not imported anywhere.
- `@emailjs/browser` is installed but unused — no contact form has been implemented yet.
- The `SystemsBeyond` headline reads "Six more systems" but the `SYSTEMS` array contains 7 items.
- No OG image is configured in `layout.jsx`.
