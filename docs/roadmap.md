# FPE Design System: phased roadmap

## P0. Identity [logo correction committed on main]
- [x] Continuous compound-path master SVG
- [x] Pink, white-on-black and black-on-white mark assets
- [x] Brand usage and rights notes
- [ ] Optical geometry validation against the original Figma file at very small sizes
- [ ] Figma staging specimen updated to corresponding true backgrounds

## P1. Portable foundations [v2026.11.3 review branch]
- [x] Mode-aware semantic tokens and contrast-aware primary foreground
- [x] CSS theme bridge to shadcn/Tailwind v4
- [x] Motion durations, easings, reduced-motion CSS
- [x] Root GitHub registry with theme, logo and optional hero
- [ ] Validate shadcn CLI resolving `owner/repo/item` from the merged repository

## P2. Reference experience [v2026.11.3 review branch]
- [x] Responsive HTML brand guide, including true monochrome marks
- [x] Components and motion specimens, theme toggle, copy controls, mobile navigation
- [x] Single-file offline HTML export
- [ ] Visual browser QA in a testable headless browser or Netlify preview
- [ ] WCAG 2.2 AA manual review and assistive technology tests

## P3. Integration [v2026.11.3 review branch]
- [x] Claude Code skill plugin package
- [x] ChatGPT private skills-only plugin package
- [x] Netlify static build and security headers
- [ ] Activate plugin installations in Claude and ChatGPT
- [ ] Validate Next.js, Vite, Base UI and Radix consumer fixtures
- [ ] Netlify deploy preview and performance scores

## P4. Full production system [future version]
- [ ] Foundation scales: opacity, typography across breakpoints, more motion patterns, elevation and surface materials
- [ ] shadcn registry blocks for application shells, dashboards, data displays and presentations
- [ ] Figma component reconciliation and native variable modes when plan supports it
- [ ] Localization/RTL and content design system
- [ ] Automated component interaction, accessibility and screenshot regression suite
- [ ] Public contribution policy, CalVer migration guides, and release cadence

The v2026.11.3 branch is intentionally a foundation, **not** a claim that the entire design system is finished. Each later milestone needs evidence and published compatibility support.

## Digital visual direction (review candidate)

The primary FPE web identity is black, white and signature fuchsia `#F23D9F`. The original fuchsia/deep-pink/violet gradient is retained as a single, controlled expressive device for the brand hero or selected brand artwork, not for every UI surface. No mint, lime, cream backgrounds, graphite-colored card stacks, rounded pill grids, decorative eyebrows or invented progress indicators. Functional components inherit shadcn semantic variables and sharp radii. The user approved this direction and selected the thin gradient-keyline primary action for the first release.
