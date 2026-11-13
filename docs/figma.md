# Figma integration

Existing FPE source: https://www.figma.com/design/NbFXdD8CGq2PfSLSjj7pfj

New staging: https://www.figma.com/design/l5VvZI5ubmVcfpQCNruBqG

The original has three connected FPE libraries (Style Guide, UI Kit, Icons), 55 paint styles, 84 text styles, no local token variables. The staging currently has three pages, 46 variables across three collections, eight text styles, an early button variant set and a logo specimen. Treat this as a design **staging** file, not the released library.

Starter plan limitations observed: three pages and one mode per variable collection. CSS/registry support both themes; we cannot claim Figma's native variables support both under this plan.

Reconciliation path:

1. Inspect logo variants against the original vector and exact SVG assets.
2. Preserve the original signature fuchsia and monogram. The updated digital direction uses black, white and fuchsia; the fuchsia-to-deep-pink/violet gradient is reserved for expression. Do not bring mint into the released identity.
3. Upgrade/merge semantic tokens in Figma when variable mode limits allow.
4. Develop component specimen sheets, using FPE theme on established shadcn patterns rather than redesigning the primitive behavior.
5. Publish only after visual and functional validation.
