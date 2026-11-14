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
| Publish a versioned release and static site | `.github/workflows/ci.yml`, `.github/workflows/release.yml`, `netlify.toml`, `package.json` | CI, exact SHA and tagged assets. The existing release workflow is specifically pinned to `2026.11.3`; it is not a general-purpose next-release procedure. |

## Paved path and invariants

1. Inspect the affected capability's actual code, consumers and existing tests before changing implementation. When docs and code disagree, determine which is wrong, rather than making the app follow outdated documentation.
2. Make the smallest change to the canonical owner. Tokens are never manually duplicated into generated CSS. Interactive controls remain upstream shadcn, with FPE styling applied through its supported theme/registry path.
3. Test the meaningful failure case. `npm run check` builds and runs source tests. When packaging changes, use `npm run package` and verify the produced manifests/checksums.
4. For user-visible changes, inspect real rendered output. For consumer or plugin compatibility claims, run relevant installs/host journeys. If unavailable, record `blocked` or `not_run`.
5. Reconcile this map only for capability or verification-impacting changes; for unrelated edits write `map unchanged` with a reason in the PR.
6. Preserve traceability: exact commit, commands, environment, artifacts, screenshots (where relevant), unresolved risks, and independently authorized release.

## Current acceptance boundaries

- **Implemented in source:** token-driven theme, static HTML reference, registry metadata/blocks and plugin sources. See actual files and automated tests.
- **Previously published:** `v2026.11.3` foundation release. Confirm a live deployment or host installation with current external evidence before making a new claim.
- **Not established by this document:** full Next.js/Vite consumer interoperability, Base UI/Radix equivalence, real Claude/ChatGPT plugin acceptance, general accessibility compliance, new tagged releases or production deployment state.
- **Release coupling:** version metadata in `package.json`, tokens and both plugin manifests must stay synchronized; never increment just a single manifest.

## DUNE verification record

For any future substantive PR, record (in the PR, not as an invented permanent success claim) its outcome, affected code owner, exact SHA, positive and negative tests, rendered/host evidence, `passed|failed|blocked|not_run` statuses, passport change and deployment/release decision.

Privacy and license boundaries always override convenience. Generated artifacts belong to their generating source; reports and screenshots do not substitute for application behavior.

---

## Focused verification matrix (source-reviewed 14 November 2026)

The token-to-output ownership and release constraints above remain authoritative. These are the least-cost checks that prove **different** failure classes without replacing actual consumer or host acceptance.

| Change | Focused source proof | Additional acceptance |
| --- | --- | --- |
| Brand token, semantic alias, light/dark theme | `tokens/fpe.tokens.json` → `scripts/build.mjs` → generated `css/fpe-theme.css`; run `npm run check` | Check invalid/missing token/alias, readability, contrast and real light/dark rendered UI |
| Reference site or animations | `site/`, `css/fpe-motion.css` and generated `dist/` | Browser at mobile/desktop plus reduced-motion and keyboard behavior; a static build is not visual or accessibility proof |
| shadcn registry or branded components | `registry.json`, `registry/`, `tests/system.test.mjs` | Install in the target Next.js/Vite/shadcn stack and verify SSR, icons, keyboard/interactive states; record results in `docs/compatibility.md` |
| Claude/ChatGPT plugin files | `plugins/claude/`, `plugins/chatgpt/`, `scripts/package.py` | `npm run package`, ZIP/checksum/manifest/version parity and **separate actual host install/activation** |
| Version or release changes | `.github/workflows/ci.yml`, `release.yml`, versioned manifests | Match source SHA, artifact contents and rights; the existing first-release workflow is pinned to `2026.11.3` and must not be reinterpreted as a generic release job |

### Change and evidence procedure

1. Modify the canonical token or registry owner, never generated CSS or copied consumers as a workaround. Prove one known good and one invalid case when touching parsing, component API or asset boundaries.
2. Use `npm run check` for token/build changes; only add `npm run package` when packaging/versioned files change. For visible output use real browser inspection, and for consumer/library compatibility use actual installation rather than a screenshot alone.
3. Maintain a release trigger matrix: `ci.yml` runs validation on PR/main; `release.yml` performs its pinned first-release verification on main. Do not remove `push` just to reduce cost without checking required statuses and publication coupling.
4. Record exact SHA, source token/version, generated artifact, test commands, real consumer/host result and **passed / failed / blocked / not_run** in the PR. Preserve licensed brand assets and fonts.

**Review evidence:** inspected generator, tests, scripts, release workflow and latest published GitHub release (`v2026.11.3`). No build, package generation, browser, consuming-app or host test was executed as part of this documentation update.
