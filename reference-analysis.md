# Reference analysis (Craft v1)

## Asset inventory

| Role | Path | Approx. role |
|------|------|----------------|
| Starting keyframe | `references/hero-keyframe-start.png` | Close three-quarter head, purple eyes, hex collar |
| Layout | `references/hero-layout-reference.png` | Split hero, sidebar, cyborg right, magenta accents |
| Zoom | `references/hero-zoom-reference.png` | Four-panel macro crops |
| Motion | `references/hero-motion-reference.mp4` | Timing authority (frame extraction pending ffmpeg) |

## Layout still (sampled roles)

- **Canvas:** outer ~`#07090f`, inner panel ~`#eef1f6`
- **Sidebar:** blue gradient `#1a2744` → `#0f1628`
- **Accent:** magenta ~`#c2185b` / `#e879a6`
- **Ink (on panel):** `#0f1a33`, muted `#5a6478`
- **Corner radius:** ~40–48px outer frame
- **Typography (reference):** wide grotesk sans — **Inter** substituted (documented in DESIGN.md)

## Implementation approach

- **2.5D:** Three raster layers cross-faded and transformed (no generic 3D mesh).
- **Intro:** Time-driven `sampleIntroProgress` (keyframe → layout zoom).
- **Scroll:** Sticky pin + `sampleHeroProgress` for camera, object Y-rotation, zoom overlay, text masks.

## Video analysis — remaining

Install ffmpeg locally and extract frames at 0%, 25%, 50%, 75%, 100% to refine `motion-spec.ts` keyframes against source motion.

## Responsive risks

- Baked copy in PNG bottom-left masked by identity scrim; full vector rebuild would remove dependency.
