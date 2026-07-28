# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are design directors, product-design hiring managers, founders and product leaders, AI product teams, senior designers, and recruiters evaluating Ramya Rajasekaran’s seniority and craft. They arrive curious but impatient, often on laptop or mobile, with roughly 10–20 seconds before deciding whether to explore further.

## Product Purpose

An experimental, interaction-first portfolio landing experience for Ramya Rajasekaran (Senior Product Designer, Cal AI Labs). The hero is the product: it must demonstrate visual judgment, interaction design, motion systems, AI-assisted experimentation, product thinking, technical collaboration, and restraint—not claim them through copy or project cards alone.

Success means a memorable first impression, immediate recognition of identity and role, and a natural handoff into portfolio work without scroll traps or decorative gimmicks.

## Positioning

Unlike conventional portfolio homepages (card grids, SaaS-style landings, template demos), this surface treats scroll-driven spatial choreography as the primary proof of senior product-design capability, anchored to supplied reference still and motion assets rather than generic WebGL or AI-slop patterns.

## Operating Context

- Greenfield web project in this workspace; implementation target confirmed as **Vite + React + TypeScript**.
- Mandatory references (confirmed):
  - **Starting keyframe:** `references/hero-keyframe-start.png` ← `Gemini_Generated_Image_60d2jm60d2jm60d2.png` (cinematic close-up, silver faceplates, purple eyes, hex collar).
  - **Layout authority:** `references/hero-layout-reference.png` ← `Gemini_Generated_Image_2tk4832tk4832tk4.png` (split hero: UI left, cyborg right, magenta accent system).
  - **Zoomed-in authority:** `references/hero-zoom-reference.png` ← `Gemini_Generated_Image_qiyob4qiyob4qiyo.png` (four vertical panel macro composition).
  - **Motion:** `references/hero-motion-reference.mp4`.
  - **Legacy alias:** `references/hero-visual-reference.png` duplicates layout still for tooling that expects a single PNG path.
- Shared motion architecture: reference video → `motion-spec.json` → live scroll-driven site + HyperFrames time-driven render.
- HyperFrames composition for deterministic MP4 and keyframe comparison (Craft phase deliverable).

## Capabilities and Constraints

- Scope: landing hero, identity reveal, transition into first “Selected Work” section, supporting visual/motion system—not full case-study CMS, blog, contact, or navigation system unless already defined elsewhere.
- Exact hero copy (order and wording fixed): Ramya Rajasekaran; Senior Product Designer; Cal AI Labs.
- Identity must be real HTML text; no scroll hijacking; `prefers-reduced-motion` shows final composed hero immediately.
- Source-of-truth hierarchy: reference video (motion) > reference image (visual) > portfolio text > documented a11y/responsive adaptations > defaults.
- **Open:** frame-level motion analysis of `hero-motion-reference.mp4` until ffmpeg or extracted frames are available in the build environment.

## Brand Commitments

- Portfolio subject: **Ramya Rajasekaran**, **Senior Product Designer**, **Cal AI Labs** (spelling and order fixed).
- Visual and motion fidelity to supplied references; remove all original wording and branding from reference artwork.
- Anti-patterns explicitly rejected: purple-blue gradient clichés, glassmorphism, neon glows, generic 3D blobs, typewriter/scramble text, scroll hijacking, template SaaS hero layouts.

## Evidence on Hand

| Asset | Path | Status |
|-------|------|--------|
| Reference motion | `references/hero-motion-reference.mp4` | Present (~2.6 MB MP4) |
| Starting keyframe | `references/hero-keyframe-start.png` | Assigned |
| Layout reference | `references/hero-layout-reference.png` | Assigned |
| Zoom reference | `references/hero-zoom-reference.png` | Assigned |
| Reference motion | `references/hero-motion-reference.mp4` | Present |

Do not fabricate reference appearance or choreography where assets or tooling cannot verify them.

## Product Principles

1. **Interaction is the portfolio piece**—craft and narrative live in motion and spatial design, not card grids.
2. **References are authorities**, not mood boards; image controls look, video controls timing.
3. **Identity is immediate and accessible**—name, role, and org readable within seconds; never hidden behind scroll-only reveals for reduced-motion users.
4. **Restraint reads senior**—every animated property earns its place; pointer and parallax stay subordinate to scroll.
5. **One motion model**—live site and HyperFrames share the same normalized progress map.

## Accessibility & Inclusion

- WCAG-oriented contrast for identity text; keyboard-operable navigation; visible focus; support for text resize, touch, and `prefers-reduced-motion`.
- No essential information conveyed only through motion; graceful degradation without WebGL and when JavaScript fails (static identity and route to work content).
