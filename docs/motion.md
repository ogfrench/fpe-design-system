# FPE Motion Language

Motion explains state changes and adds identity where useful. It must not obstruct navigation, conceal information, or create inaccessible interactions.

| Token | Duration | Purpose |
| --- | --- | --- |
| `instant` | 100 ms | Press or toggle response |
| `fast` | 160 ms | Hover/focus feedback |
| `base` | 240 ms | Small layout or component change |
| `slow` | 380 ms | Drawer/panel transition |
| `expressive` | 720 ms | Brand-only animated reveal |

Easing: `standard` = cubic-bezier(0.2, 0, 0, 1); `emphasized` = cubic-bezier(0.16, 1, 0.3, 1); `exit` = cubic-bezier(0.4, 0, 1, 1).

Rules:

- Never animate layout-affecting width, top or left when a transform can do the job.
- Prefer opacity/transform for fluidity; limit filter-based glow to isolated brand moments.
- Avoid ambient motion in application controls. Focus/hover changes can be immediate and deliberate.
- Respect `prefers-reduced-motion: reduce`; avoid automatic carousel movement, parallax and continuous animation when enabled.
- Maintain visible keyboard focus even when animations are disabled.
- Motion must not be a prerequisite to perceiving content, navigation or state.
- No nonessential animation should block the next action.

Brand expression: angular monogram transformations, controlled translucent ribbons, geometric orbiting, and editorial reveal. Do not interpret “frog inspiration” as cartoon frogs or distracting bouncing UI.
