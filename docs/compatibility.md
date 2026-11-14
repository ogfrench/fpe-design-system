# Compatibility and acceptance matrix

| Target | Desired support | Current status |
| --- | --- | --- |
| shadcn/ui semantic variables | Light/dark CSS variable bridge | Implemented in source, generation checks required |
| Tailwind CSS v4 | `@theme inline` mapping | Implemented, build fixture pending |
| Base UI based shadcn | Theme only, no primitives replaced | Not yet consumer-tested |
| Radix based shadcn | Theme only, no primitives replaced | Not yet consumer-tested |
| Next.js App Router | Registry install, SSR, hydration | Not yet consumer-tested |
| Vite + React | Registry install and production build | Not yet consumer-tested |
| Plain HTML | No-framework reference and offline file | Built; browser QA required |
| Claude | Self-contained skill and plugin | v2026.11.3 ZIP published; actual Claude installation and task acceptance unverified |
| ChatGPT | Private skills-only plugin | v2026.11.3 ZIP published; private installation/activation remains separate and unverified |
| Figma Starter | Visual reference, limited native modes | Staging exists; audit ongoing |

GitHub [v2026.11.3](https://github.com/ogfrench/fpe-design-system/releases/tag/v2026.11.3) contains Claude and ChatGPT plugin archives and source/checksum assets. Publication establishes archive availability only; the source build, consumer fixture tests, and actual assistant-host behavior must be recorded independently.

“100% compatible” will only apply to a specific validated matrix at a specific release. Do not infer support for all upstream versions, every headless primitive behavior, or unspecified frameworks from the presence of CSS tokens.

## Planned consumer test fixtures

1. Fresh Next.js App Router scaffold with standard shadcn setup and token theme; assert build, interactive controls, theme toggle and hydration.
2. Fresh React/Vite scaffold with standard shadcn setup and token theme; assert build and controls.
3. Component smoke suite: Button, Dialog, Input, Select, Checkbox, Tabs, Table, Toast, Navigation, Skeleton; check states and keyboard.
4. Radix + Base UI comparison with preserved behavior and no code changes to upstream components.
5. Regression screenshots at 390px, 768px, 1440px, in light/dark and reduced-motion modes.

No fixture is described as executed unless an actual run and result is retained.
