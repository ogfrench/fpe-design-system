# Accessibility and visual QA

Target: WCAG 2.2 AA for the HTML reference and documented interactive patterns. This is a goal, **not a current certification**.

Acceptance checklist:

- Keyboard tab order, focus visibility, labeled controls, skip navigation and semantic landmarks.
- Sufficient text contrast for actual foreground/background pairings, including primary actions. FPE keyline buttons use standard shadcn surface and foreground semantic colors (`--background`, `--foreground`), with fuchsia-to-violet gradient confined to a 1px perimeter and arrow. Never put normal-size white text on signature pink.
- 200% text zoom, 320px narrow viewport, and no horizontal page overflow.
- Descriptive icon alternatives, correct decorative semantics, accurate labels, and live region feedback when needed.
- Color never carries status alone; status text and shape/icon accompany color.
- Reduced-motion preferences disable decorative and continuous motion.
- Theme switching respects controlled state and persists only when local storage is available.
- Native buttons, links and inputs in HTML; do not add simulated controls or nested interactive elements.
- CSP and browser console sanity checks on the actual Netlify preview.

Current limitation: Local browser automation may be blocked in some environments. Node-based static checks are not a substitute for actual browser and assistive technology tests; log gaps rather than claiming a pass.
