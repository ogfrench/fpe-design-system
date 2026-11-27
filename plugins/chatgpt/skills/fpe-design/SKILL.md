---
name: fpe-design
description: Use when creating or reviewing FPE-branded websites, shadcn/React components, presentations, HTML outputs, or interactive product interfaces. Apply the FPE identity, tokens, motion and brand rules while preserving existing framework components.
---

# FPE Hypermodern Expressive

Use FPE's identity to create bold, precise and kinetic experiences while maintaining industry-grade usability. Avoid calling the identity “playful.”

## Before writing code or visuals

1. Inspect the project's existing code, components and shadcn registry settings. Do not replace existing UI primitives or framework versions without authorization.
2. Read the token and usage reference when included in the plugin bundle. The canonical source is https://github.com/ogfrench/fpe-design-system (`tokens/fpe.tokens.json`, `css/fpe-theme.css`, `docs/`).
3. Select the appropriate FPE mark: pink signature, white on black, black on white. Keep SVG geometry and aspect ratio; never recreate the mark from memory.
4. Distinguish existing, proposed and validated designs. Do not invent Figma or deployment state.

## Brand and composition

- Identity: angular FPE monogram, black and white interface surfaces, fuchsia-to-violet brand gradients. `#F23D9F` is a **gradient stop**, never a flat fill, headline color, status color, border or button background. Use `--fpe-gradient-brand`, `--fpe-gradient-hero` and theme-specific `--fpe-gradient-text` from the generated theme. Keep monochrome logo variants and footer signature monochrome; do not turn every control into an effect.
- Typography: IBM Plex Sans for editorial and product text, IBM Plex Mono for code and technical labels. Load the actual font faces on hosted pages; check computed rendering, tracking and line wrapping. Use the shared scale in `tokens/fpe.tokens.json` and `docs/typography.md`, not extreme negative tracking. Respect offline fallbacks; do not bundle font binaries.
- Direction: Hypermodern Expressive. Strong grids, editorial hierarchy, sharp geometry and decisive typography. Avoid decorative eyebrows, fake metrics, pill badge grids and ornamental glow.
- Functional UI stays calm; logo reveals, hero graphics and presentation covers may have more expressiveness.
- On FPE-authored pages using the byline “Designed by François”, place a small FPE mark immediately after the name, matching the byline size and inheriting its color (`currentColor`). Keep it inline, not a badge. Use `FpeCredit` from the FPE logo registry where applicable. Do not impose the byline on independent MIT consumers.
- Preserve FPE brand rights. The MIT source license does not apply to logo artwork.

## Visual composition: avoid reflexive AI defaults

FPE is an authored identity, not a generic UI theme. Build from the content,
editorial hierarchy, real objects and the FPE type, geometry and motion tokens.

- **Decorative eyebrows and uppercase labels:** default to direct sentence-case
  headings; add a short chapter, category or technical label only when it
  contributes orientation. Preserve required acronyms.
- **Decorative colored side borders:** group with alignment and whitespace.
  Use semantic state indicators only where they communicate something real.
  Preserve the specified 2px FPE gradient edge on primary actions.
- **Random italicized headline words:** create emphasis with the FPE type scale,
  weight, placement and contrast. Use italics for genuine editorial emphasis,
  titles or quotations, not a repeated hero formula.
- **Generic fonts:** use IBM Plex Sans and IBM Plex Mono in their prescribed roles.
  Do not default to Inter or fashionable display serifs instead of FPE typography;
  retain the documented offline fallbacks.
- **Excessive cards and nested containers:** prefer open editorial grids,
  whitespace, lists and tables. Use cards for independent objects or actions,
  not every paragraph, statistic or heading. Keep FPE's sharp tokenized geometry.
- **Redundant blurbs:** do not automatically add explanatory text under each
  title. Include only information the heading or interaction cannot communicate.
- **Blinking status dots:** use truthful, labeled, static status by default;
  communicate real progress and transitions with restrained, accessible motion.
  Do not use ambient pulses to imply activity.
- **Decorative badges, fake metrics and ornamental icons:** omit them unless
  they communicate actual attributes, data or actions. Do not invent evidence
  to fill a layout.
- **Formulaic heroes and three-column sections:** select a composition for the
  actual content. Do not force symmetry, excessive rounded boxes, arbitrary
  accent colors, glass, glow or decoration into routine product surfaces.

Protect intentional FPE expression: angular monogram geometry, signature
fuchsia-to-violet gradients in their specified roles, purposeful kinetic brand
moments and editorial emphasis. Repetition is justified when it improves
consistency or comparison. Do not remove useful semantic labels, cards or
brand signatures merely because similar treatments occur in AI-made designs.

Review the entire actual render for repeated patterns, information hierarchy,
contrast, responsive behavior and purposeful motion. Fix the specific issue
and inspect again; distinguish source-only review from visual verification.

## Implement with existing components

- Prefer `shadcn/ui` primitives for Button, Dialog, Select, Input, Tabs, and other standard controls. Do not clone their implementation in FPE.
- Compatible with Base UI or Radix choices in the consumer project; apply theme semantic CSS variables rather than swapping headless libraries.
- Use Tailwind v4 shadcn `@theme inline` bridge when present. Standard tokens include `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--ring`, `--card`, and sidebar/chart tokens.
- For Next.js, avoid unnecessary client components; verify hydration when stateful components are required. For HTML, use native semantic controls.
- Do not claim universal compatibility. State the exact framework and versions actually tested.

## Motion and accessibility

- Timing: 100 / 160 / 240 / 380 / 720ms for immediate / fast / base / slow / brand expression.
- Animate transform and opacity, avoid excessive layout thrashing and unnecessary animation in product controls.
- Respect `prefers-reduced-motion`; provide visible keyboard focus, labels, accessible contrast, and color-independent status.
- FPE primary actions use shadcn's inverse neutral pair (`--primary`/`--primary-foreground`). A restrained 2px `--fpe-gradient-brand` edge carries the identity; never fill the entire button with the brand gradient. Standard shadcn `--primary` stays a CSS color for compatibility. Never assign a CSS gradient to a CSS color role.
- Test responsive widths, light/dark behavior and keyboard flows. Mark unperformed tests as unverified.

## Delivery

- Maintain a single token source, generated CSS and registry metadata. Fix drift at the source, not with overrides.
- Provide a concise explanation of reused upstream components, custom FPE elements, compatibility tests and outstanding risks.
- In a codebase, edit existing files and match surrounding conventions. Do not introduce unnecessary frameworks, dependencies or build systems.
