# FPE Product Passport

**Purpose:** navigate FPE's implemented design system using code and evidence. This document is a map, not a specification and not proof that every consumer or host works.

**Reviewed against source paths:** `tokens/fpe.tokens.json`, `scripts/build.mjs`, `site/`, `registry/`, both plugin source folders, `tests/system.test.mjs`, `package.json`, the two GitHub workflows and `docs/compatibility.md`. This adoption PR does not itself run browser, consumer, plugin-host, CI or deployment checks.

See [AGENTS.md](../../AGENTS.md) for the project's DUNE entrypoint and the [complete handbook](https://github.com/ogfrench/agentic-coding-setup/blob/main/docs/dune.md) and [Agentic Workflow plugin](https://github.com/ogfrench/agentic-coding-setup/tree/main/plugins/agent-workflow) for the shared method.

## Capability and ownership map

| User outcome | Canonical implementation | Relevant evidence and limits |
| --- | --- | --- |
| Apply FPE light/dark colors, gradients, typography and motion | `tokens/fpe.tokens.json` → `scripts/build.mjs` → `css/fpe-theme.css`; motion in `css/fpe-motion.css` | `npm run check` and token parity checks in `tests/system.test.mjs`. A passing build is not contrast/keyboard acceptance. |
| Browse the responsive HTML design reference | `site/index.html`, `site/styles.css`, `site/app.js` | Generated `dist/` via `npm run build`. Browser/mobile/dark/light and reduced-motion review are separate evidence. |
| Add shadcn theme and optional brand blocks | `registry.json`, `registry/fpe-logo.tsx`, `registry/fpe-hero.tsx`, generated `dist/r/` | Registry and token tests. Actual Next.js/Vite, Base UI/Radix installation/SSR/keyboard acceptance remains separately tracked in `docs/compatibility.md`. |
| Reuse approved brand marks | `assets/brand/*.svg`, `LICENSES/BRAND-ASSETS.md` | Validate logo geometry and rights; published MIT code does not grant all brand-asset rights. |
| Install Claude or ChatGPT design instructions | `plugins/claude/`, `plugins/chatgpt/`, `scripts/package.py` | Package structure, manifest/version parity and checksums. Real-host installation/activation must be verified separately. |
| Publish a versioned release and static site | `.github/workflows/ci.yml`, `.github/workflows/release.yml`, `netlify.toml`, `package.json` | CI, exact SHA and tagged assets. The release workflow publishes the `package.json` version on each merge to `main` and refuses to overwrite an existing tag. |
