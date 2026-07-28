# Design system — portfolio hero

## Visual world

Reference-led cyber-industrial UI: rounded white panel, dark sidebar, technical hairlines, magenta accent (from layout still). Character: silver plates, purple eyes, hex mesh.

## Tokens

| Token | Value |
|-------|--------|
| `--canvas` | `#07090f` |
| `--surface` | `#eef1f6` |
| `--ink` | `#f4f6fa` (on canvas) / `#0f1a33` (on panel) |
| `--muted-ink` | `#5a6478` |
| `--accent` | `#c2185b` |

## Typography

- **Inter** (Google Fonts) replaces reference grotesk; weights 500–700 for identity hierarchy.

## Motion

Single source: `web/src/motion-spec.ts` — shared with future HyperFrames composition.

## 3D decision

2.5D layered images + CSS `preserve-3d` transforms. No Three.js in v1.

## Accessibility

- Identity in HTML (`h1` + paragraphs).
- Reduced motion: final layout, all lines visible, no long scroll pin.
