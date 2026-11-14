# FPE typography and attribution

FPE uses **IBM Plex Sans** for headings, content and interactive components, and **IBM Plex Mono** for code and technical information. Typography is not an ornamental brand treatment: it must read comfortably at real viewport widths.

## Shared typography tokens

The values in `tokens/fpe.tokens.json` are generated into `css/fpe-theme.css`. Use the CSS variables below, not hardcoded alternative values:

| Role | Max size | Weight | Tracking | Line-height |
| --- | --- | --- | --- | --- |
| Display | `--fpe-size-display` | `--fpe-weight-display` | `--fpe-tracking-display` | `--fpe-leading-display` |
| Heading | `--fpe-size-heading` | `--fpe-weight-heading` | `--fpe-tracking-heading` | `--fpe-leading-heading` |
| Subheading | `--fpe-size-subheading` | `--fpe-weight-subheading` | `--fpe-tracking-subheading` | `--fpe-leading-subheading` |
| Body | `--fpe-size-body` | `--fpe-weight-body` | `--fpe-tracking-body` | `--fpe-leading-body` |

Use the weight tokens rather than ad hoc weight combinations. Keep actual browser font kerning on. Avoid exaggerated negative tracking, optical letter collisions and fixed-height headline wrappers. Responsive size adjustments should not also compress line height or tracking.

## Font loading

The website loads IBM Plex Sans and IBM Plex Mono from Google Fonts with explicit weights (400, 500, 600, 700). Offline pages may use system fallback fonts when the hosted fonts are unavailable; this is intentional. **Do not bundle redistributed font binaries into FPE plugins.**

Next.js consumers should use `next/font/google` to provide IBM Plex font faces and set their project font variables to the FPE `--fpe-font-sans` / `--fpe-font-mono` stacks. Verify the resulting real face in the browser, not merely the computed font-family value.

## Byline and brand credit

For FPE-authored pages, the footer contains only **Designed by François** followed by the corrected FPE mark, 9 px high and aligned to the font baseline, using `currentColor`. No duplicated FPE wordmark, version text, or badge in this footer. The mark should be decorative (`aria-hidden="true"`), with the readable byline represented as text. The credit should inherit the footer's text color in dark and light modes, not introduce a colored logo or a boxed badge.

The website uses `.design-credit` and `.design-credit-mark`, and the shadcn-compatible logo registry item exports optional `FpeCredit`. Attribution is a brand/presentation pattern, **not a requirement on external consumers** of MIT-licensed FPE code.
