# FPE Design System

**Hypermodern Expressive**: FPE brand identity, a shadcn/ui-compatible color and type layer, deliberate motion, black/white identity with controlled fuchsia-to-violet gradients, a responsive HTML reference, and reusable Claude/ChatGPT skills.

> **Initial foundation release: v2026.11.3.** FPE is a theme, brand asset kit, interactive HTML guide and optional React blocks. It is not a replacement for shadcn/ui. Consumer integration and host acceptance are tracked separately in the compatibility guide.

## What is included

- Three original corrected monogram variants (pink, white, black), plus a gradient brand expression. UI uses gradients rather than solid fuchsia. Monochrome marks remain unchanged for contrast and bylines.
- A structured, mode-aware token file at `tokens/fpe.tokens.json`, generated CSS in `css/fpe-theme.css`, and reduced-motion-safe animations in `css/fpe-motion.css`.
- A public [shadcn-compatible registry](registry.json) with `fpe-theme`, `fpe-logo`, and `fpe-hero` entries.
- Static HTML reference at `site/index.html`, built to `dist/`, plus a generated single-file offline export.
- Claude and ChatGPT skills with consistent component-selection and accessibility rules.
- IBM Plex type scale and a small, monochrome “Designed by François” signature integrated into FPE pages; optional `FpeCredit` for shadcn pages. See [typography](docs/typography.md).

## Quick start

Requires Node.js 20 or later. No application or npm dependencies are required to build the documentation.

```sh
npm run build
npm test
```

Open `dist/index.html` with a static server, or open `dist/offline.html` locally for a self-contained preview. The static site is published with the repository's `netlify.toml` configuration.

## Install in an existing shadcn application

With shadcn/ui and Tailwind CSS v4 configured, first **inspect** what an item installs:

```sh
npx shadcn@latest view ogfrench/fpe-design-system/fpe-theme
npx shadcn@latest add ogfrench/fpe-design-system/fpe-theme --dry-run
```

After the release is merged:

```sh
npx shadcn@latest add ogfrench/fpe-design-system/fpe-theme
npx shadcn@latest add ogfrench/fpe-design-system/fpe-logo
npx shadcn@latest add ogfrench/fpe-design-system/fpe-hero
```

**These commands work only after `registry.json` and the item sources are on `main`.** For reproducible deployments, pin the registry item to a release tag or full commit SHA. FPE does not replace shadcn's Button, Dialog, Input, or other established primitives. Use shadcn components as-is and let semantic CSS tokens theme them.

**Framework target:** Next.js App Router and Vite + React using either Base UI or Radix shadcn components. The reference HTML is framework-free. These targets require consumer-level smoke tests before claiming full compatibility.

## Project structure

```text
assets/brand/           SVG identity marks, separate brand rights
css/                    Generated shadcn theme, reusable motion CSS
site/                   Responsive static documentation source
tokens/                 Mode-aware structured design tokens
registry/               Optional React brand components
registry.json           shadcn public GitHub registry root
scripts/build.mjs       Generate CSS, docs, offline HTML and registry JSON
plugins/claude/         Claude Code / Claude skill plugin source
plugins/chatgpt/        Portable ChatGPT plugin source
netlify.toml            Static site build and safe headers
docs/                   Architecture, compatibility, motion, QA
```

## Source of truth

1. `tokens/fpe.tokens.json` owns color, gradient, radius, spacing, typography and motion declarations. CSS gradients are resolved from color stops in this file; shadcn semantic CSS variables remain actual colors.
2. `scripts/build.mjs` generates `css/fpe-theme.css`, the static distribution and registry JSON payloads.
3. `registry.json` contains the public registry metadata and must be kept synchronized with tokens. The build fails if semantic colors drift.
4. React brand compositions are **optional**; shadcn/ui remains the interactive primitive implementation.

## Versioning

FPE uses calendar versioning (`YYYY.M.RELEASE`), beginning with `2026.11.3`. The final component counts releases within a month, not calendar days. Month is unpadded to comply with strict three-segment SemVer parsers used by plugin clients and npm. The root package, token metadata, and Claude/ChatGPT plugin manifests must share one version. See [versioning policy](docs/versioning.md).

## Engineering with DUNE

Start with the [Product Passport](docs/product-passport/README.md) and [AGENTS.md](AGENTS.md); use the [full DUNE handbook](https://github.com/ogfrench/agentic-coding-setup/blob/main/docs/dune.md) and [Agentic Workflow plugin](https://github.com/ogfrench/agentic-coding-setup/tree/main/plugins/agent-workflow) to navigate code, test real behavior and reconcile evidence. These links do not install the plugin or prove consumer compatibility.

## Governance

- No third-party font binaries or paid shadcn assets bundled.
- New components require keyboard, light/dark, reduced-motion and accessibility checks.
- The existing FPE Figma source is retained as a visual reference; the new Figma staging system has Starter-plan limitations (3 pages, 1 native variable mode).
- Reviews: visual identity, responsive HTML, registry install in actual Next.js and Vite apps, plugin install, accessibility and deployment preview.

## Licensing

MIT for code and tokens, CC BY 4.0 for original documentation, **brand rights reserved** for FPE logo and identity. See [LICENSE](LICENSE), [LICENSES/BRAND-ASSETS.md](LICENSES/BRAND-ASSETS.md), and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Public source does not license the FPE logo for third-party branding.
