# FPE Design System v2026.11.3

First public foundation release. This is not a claim that the entire design system or all framework targets are production certified.

## Includes

- Repaired FPE mark, signature gradient expression, and white-on-black / black-on-white masters.
- Black/white website with gradient brand accents and approved thin gradient-keyline primary actions.
- Responsive HTML design-system reference, offline single-file HTML export, IBM Plex type definitions, light/dark themes, motion specimens and reduced-motion support.
- Design-token source of truth with 32 semantic colors per mode, Tailwind CSS v4 shadcn variable bridge, and a public three-item shadcn GitHub registry: `fpe-theme`, `fpe-logo`, `fpe-hero`.
- Portable Claude and ChatGPT skills plugin archives using the same FPE icon and CalVer.
- Netlify static-build configuration and brand-protective split licensing.

## Downloads

- `fpe-design-system-source-v2026.11.3.zip`: source, tests, docs and design assets
- `fpe-claude-v2026.11.3.zip`: Claude plugin candidate
- `fpe-chatgpt-v2026.11.3.zip`: ChatGPT plugin candidate
- `SHA256SUMS-2026.11.3.txt`: asset checksum list

## Verified and outstanding

Automated source checks validate token parity, versions, asset geometry, registry references, gradient contrast tests, and build output. The HTML browser smoke review checks desktop/mobile widths and both visual themes with network-hosted fonts disabled.

Not yet verified: actual IBM Plex font loading in a connected browser, installing the GitHub registry into clean Next.js/Vite shadcn applications, Claude package import in every host, ChatGPT plugin installation from release ZIP, full accessibility auditing, and production Netlify deployment. These are separate acceptance gates; users should inspect component changes before installing.

## Licensing

MIT for FPE source code and design tokens; CC BY 4.0 for original documentation; reserved rights for FPE branding and logo; upstream licenses retained. See `LICENSES/`.
