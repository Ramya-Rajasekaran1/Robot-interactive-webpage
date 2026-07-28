# Design brief — Ramya Rajasekaran portfolio hero

## 1. Project statement

Build an experimental, interaction-first portfolio landing for **Ramya Rajasekaran**, **Senior Product Designer**, **Cal AI Labs**. The hero is not a conventional homepage: it is a scroll-driven spatial scene derived from three reference stills plus one reference motion clip. The experience must read as senior product design—visual judgment, motion systems, restraint, and accessibility—not as a WebGL demo with a name overlaid.

## 2. Purpose

Create a memorable first impression that proves interaction craft while making identity obvious within seconds. Encourage continuation into portfolio work through curiosity and confidence, not through project-card grids or SaaS landing patterns.

## 3. Primary audiences

1. Design directors evaluating craft and seniority  
2. Product-design hiring managers scanning quickly  
3. Founders and product leaders judging product sense  
4. AI product teams assessing design + technical fluency  
5. Senior designers evaluating interaction and systems thinking  
6. Recruiters on laptop or mobile  

## 4. Visitor state of mind

Curious but impatient; 10–20 seconds to decide whether to stay. Motion should reward attention without delaying name, role, or org.

## 5. Core message

Ramya combines strong visual judgment, interaction design, motion systems, AI-assisted experimentation, product thinking, and technical collaboration—demonstrated through the hero itself.

## 6. Source-of-truth hierarchy

1. **Reference video** (`references/hero-motion-reference.mp4`) — motion and timing  
2. **Reference stills** (three roles below) — visual appearance by phase  
3. **Portfolio identity text** — exact three lines  
4. **Documented a11y/responsive adaptations**  
5. **Defaults** — only where references are silent  

## 7. Exact content

Use exactly, in this order:

1. Ramya Rajasekaran  
2. Senior Product Designer  
3. Cal AI Labs  

No greetings, slogans, typewriter intros, or AI taglines. Optional “Scroll to explore” only if it matches reference motion language.

Remove all original reference copy (e.g. AESTHETIC, PROFILE labels as content, CYBERNETIC EVOLUTIONS, pill tags, @handles, season labels, technical strings on plates).

## 8. Visual invariants

### Three-still model (user-confirmed roles)

| Role | File | Source | Use in experience |
|------|------|--------|-------------------|
| **Starting keyframe** | `references/hero-keyframe-start.png` | `Gemini_Generated_Image_60d2jm60d2jm60d2.png` | Opening pose: tight three-quarter cyborg head—matte silver/champagne faceplates, dark panel seams, **glowing purple irises**, translucent crystalline horns, dark glossy neck, **white hex honeycomb collar**, warm rim + cool lavender ambient, faint holographic grid left of face. Dark rounded outer frame; vertical sidebar with logo mark (replace sidebar text with neutral structure only). |
| **Layout authority** | `references/hero-layout-reference.png` | `Gemini_Generated_Image_2tk4832tk4832tk4.png` | Composed hero **layout**: white rounded main panel on dark ground; **dark blue gradient left sidebar**; split composition—**identity zone left**, **3D cyborg bust right**; light gray-blue field with technical greebles (X/N motif, hairlines, barcode, coordinates); **magenta/hot-pink accent** on pills and markers; iridescent reflections on silver armor and hex shoulder; purple-blue eye glow. Preserve proportions, stroke weights, corner radii (~40–50px outer), and negative-space balance. |
| **Zoomed-in authority** | `references/hero-zoom-reference.png` | `Gemini_Generated_Image_qiyob4qiyob4qiyo.png` | **Macro / multi-panel zoom language**: four tall rounded vertical panels on white, each a distinct crop (profile, back/hoodie mesh, eye macro, frontal bust); same character material system (silver plates, bronze/copper back, hex white mesh, purple eyes, horns). Use for intro zoom target detail and scroll-phase spatial fidelity—not as a literal four-column homepage grid unless motion spec requires panel choreography. |

### Cross-cutting invariants (all stills)

- Same **character subject** (silver-plated cyborg, hex texture, purple eyes)—not a generic orb or blob  
- **Rounded squircle** frame language and thin precise UI strokes  
- **No new palette** (no unrelated purple-blue SaaS gradients, glass cards, neon particles)  
- **No baked identity text** in artwork—HTML only  
- Subtle **grain/atmosphere** where present in sources  
- Sidebar, hamburger, and technical decoration may remain as **non-content chrome** or be simplified if motion spec clears space for identity  

### Visual authority note

`references/hero-visual-reference.png` duplicates the **layout** still for single-file tooling. When stills conflict, **layout** governs composition and typography placement; **starting keyframe** governs load pose; **zoom** governs close detail and panel rhythm.

## 9. Responsive adaptations

- **Desktop:** Full pinned scroll choreography; identity enters from the right; richest 2.5D/3D depth.  
- **Tablet:** Shorter scroll span; reduced parallax and perspective; preserve narrative order.  
- **Mobile:** Same beats; compress scroll (~190–240svh); stack identity below or beside object as needed; disable pointer tilt; lighter depth; no horizontal overflow; do not scale desktop layout alone.  
- **Orientation change:** Recompute geometry without jumping scroll position.  

Layout still defines **alignment logic**; zoom still informs **crop scale limits**; starting keyframe informs **minimum safe crop** on small viewports.

## 10. Motion narrative

**Authority:** Video must be analyzed frame-by-frame in Craft (`reference-analysis.md`). Below is the semantic beat map; precise values come from the video.

| Beat | Name | Intent |
|------|------|--------|
| 0 | **Arrival** | Page opens on **starting keyframe** pose. Short camera-like **zoom into** the **layout** hero frame (connected background + object depth—not a flat fade). |
| 1 | **Settle** | Brief stability on layout composition before scroll-driven motion. |
| 2 | **Scroll activation** | Pin sticky stage; scroll progress maps 0→1 on timeline; reverse on scroll up; no wheel hijacking. |
| 3 | **Object revolution** | Central object rotates on video axis while moving in depth and **zooming out**; reveals structure per **zoom reference** detail language. |
| 4 | **Space creation** | Negative space opens for identity; no glass card behind text. |
| 5 | **Identity reveal** | Three lines from the **right**, masked/transform reveals, staggered: name → role → org. |
| 6 | **Composed hero** | Poster-strong final frame; name primary. |
| 7 | **Handoff** | Transition into restrained **Selected Work** using same stroke/pattern system. |

**Blocking until Craft:** Timestamp-level keyframes, easing, rotation axis/degrees, and camera scale require inspection of `hero-motion-reference.mp4` (ffmpeg or extracted frames not yet run in this environment).

## 11. Interaction principles

- Scroll owns the story; pointer is secondary after settle (±2–3° tilt max, subtle parallax, smooth return).  
- Every animated property supports spatial relationship.  
- No effect exists because a library allows it.  
- Upward scroll reverses coherently.  

## 12. 3D strategy

Prefer **least complex faithful technique**:

- **2.5D layered planes (SVG/CSS + optional WebGL)** if rotation range and occlusion match video without a full model.  
- **True 3D (Three.js)** only if video shows volumetric rotation/occlusion that layers cannot match.  

Character mesh/plates from references remain the hero—never substitute chrome sphere, liquid metal, or torus.

## 13. Accessibility intent

- Real HTML for all three identity lines; logical heading order; keyboard nav and visible focus.  
- `prefers-reduced-motion`: final **layout** composition immediately, all identity visible, no long pin sequence.  
- No scroll-only identity for reduced motion.  
- Decorative patterns marked appropriately; contrast sufficient for role/org lines.  

## 14. Performance intent

- Transform/opacity-first; one seekable timeline; preload critical hero assets only; pause offscreen rendering; cap DPR on WebGL.  
- No branded preloader; no layout-thrashing scroll animations.  
- Graceful degradation on low-power devices.  

## 15. HyperFrames role

Deterministic, scrubbable motion study sharing **motion-spec** with live site: same tokens, same keyframes, MP4 + contact sheet for portfolio and QA against video.

## 16. Non-goals

Full case-study CMS, blog, contact form, heavy nav, preloader theatrics, project-card grid as hero, AI chatbot, autoplay showreel background, dashboard UI.

## 17. Anti-references

Glassmorphism, neon glows, gradient text, typewriter/scramble, scroll hijacking, generic AI landing purple gradients, particle fields, elastic/bounce easing, cursor gimmicks, decorative blobs unrelated to source character.

## 18. Acceptance criteria

1. Three still roles recognizable in implementation.  
2. Video choreography recognizable after frame analysis.  
3. Identity correct and early-readable.  
4. Object rotation + zoom feel physically linked.  
5. Text from right in order.  
6. Final frame works static.  
7. Scroll reversal works.  
8. Mobile narrative preserved.  
9. Reduced motion complete.  
10. Handoff to Selected Work feels continuous.  
11. Shared motion-spec for site + HyperFrames.  

## 19. Remaining decisions

1. **Confirm still mapping** if the three images in your message were ordered differently (current mapping: close head → start; split 2tk483 → layout; four-panel qiyob4 → zoom).  
2. **Typography:** Identify licensed match for reference sans (likely wide-tracked grotesk); document substitution.  
3. **Motion numeric spec:** Extract from video in Craft (blocked on ffmpeg/frame export).  
4. **3D vs 2.5D:** Final call after video occlusion review.  
5. **Navigation labels:** Work / About / Contact only if not defined elsewhere.  

---

**Stack (confirmed):** Vite + React + TypeScript.

**Init:** `PRODUCT.md` complete. **Shape:** this brief—no implementation code in this phase.
