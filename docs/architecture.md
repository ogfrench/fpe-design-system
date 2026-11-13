# FPE architecture and interoperability

## System of record

- Design tokens (DTCG-style `$type`/`$value`): `tokens/fpe.tokens.json`.
- Reusable CSS bridge: generated `css/fpe-theme.css`, with gradient brand tokens (`--fpe-gradient-brand`, `--fpe-gradient-hero`, `--fpe-gradient-text`) kept separate from shadcn semantic colors (`--background`, `--foreground`, `--primary`, `--ring`, sidebar and chart roles), dark values via `.dark` and `[data-theme="dark"]`, and Tailwind CSS v4 `@theme inline` mappings.
- Motion: token values + composable CSS classes and keyframes in `css/fpe-motion.css`.
- Branding: three original compound-path SVGs plus an optional fuchsia-to-violet gradient SVG in `assets/brand`, with independent rights.
- Registry: `registry.json` at repository root, optional UI items in `registry/`, resolved static JSON under `/r` during site builds.
- Reference UI: independent HTML/CSS/JS at `site/`, without a component runtime or application server.
- Agent workflows: Claude and ChatGPT consume the same source files, but neither is required to use the theme.

## What FPE must not do

- Ship a parallel Button, Dialog, Input, Select, or Form implementation when shadcn already provides one.
- Change an existing application's framework or headless primitive (Base UI versus Radix) just to apply the theme.
- Claim all shadcn versions are compatible without a documented test matrix.
- Override app-owned Tailwind configuration or globals indiscriminately.
- Embed proprietary font binaries or bundle paid upstream UI products.

## Consumer paths

1. **Existing shadcn app:** review installed components, inspect theme diff, install `fpe-theme`, confirm styles and accessibility. Add brand blocks separately.
2. **New Next.js app:** initialize official Next.js + shadcn stack, then apply FPE theme. Verify server rendering and hydration for React components.
3. **React/Vite app:** initialize official Vite + shadcn stack, apply same registry theme; verify build and runtime behavior.
4. **Static HTML:** link the generated theme and motion CSS and use native HTML controls. Do not claim that HTML specimens provide shadcn behavior.
5. **Agent design workflow:** supply the token file plus FPE skill; require screenshots and user-journey verification where the environment supports it.

## Release strategy

- CalVer (`YYYY.M.RELEASE`) for packages, with signed/verified release source when feasible.
- Avoid publishing install instructions for registry items until `main` actually contains the registry.
- Prefer a tagged installation ref and maintain a compatibility matrix after real fixture installs.
- Review visual changes in a draft PR; validate preview before deployment and release.

## Gradient branding without breaking shadcn

CSS gradients are **images**, not CSS colors. FPE therefore keeps the standard `--primary`, `--ring`, `--sidebar-primary` and other shadcn color roles as accessible neutral colors. The brand layer uses `--fpe-gradient-brand` as a restrained accent on inverse neutral primary actions, `--fpe-gradient-hero` for expressive surfaces and `--fpe-gradient-text` (different values by theme) for selective display typography. Both the reference CSS and the `fpe-theme` registry item include these gradient values. The build rejects registry/CSS drift.

Avoid assigning a `linear-gradient(...)` value directly to `--primary` or any `--color-*` token, as standard shadcn `bg-primary` classes expect a color and would become invalid. The original pink SVG remains available for backward compatibility but the website uses the gradient logo, with monochrome marks for navigation, footer and high-contrast contexts.
