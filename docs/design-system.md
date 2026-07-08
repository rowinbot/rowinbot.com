# rowinbot.com — Design System

The single source of truth for tokens and component structure. Components consume **tokens only** — never raw hex, px, or one-off values. Extracted from the committed Field Notes reference (`docs/landing-concepts/final/field-notes.html`) and rationalized into a scale. Implemented as Tailwind v4 `@theme` tokens in `app/styles/tokens.css`.

Aesthetic: an engineer's **field notebook** — warm dot-grid paper, drafting-blue ink, red margin annotations, hand-drawn diagrams. Light and dark ("warm blueprint") both first-class.

## Color tokens (semantic, resolve per theme)

| Token (`--color-*`) | Light | Dark | Role |
|---|---|---|---|
| `paper` | `#F3EFE6` | `#16202B` | page background |
| `surface` | `#EFEADF` | `#1E2A37` | raised surface (cards, panels) |
| `ink` | `#2B2A28` | `#DCE4EE` | primary text |
| `ink-soft` | `#5A574F` | `#AEB9C8` | secondary text / labels |
| `accent` | `#2F5DAA` | `#6FA8C7` | drafting stroke, diagram lines, accent |
| `link` | `#274C8C` | `#86C1DD` | links, interactive text |
| `mark` | `#B23B2E` | `#EC9179` | red annotations, emphasis, corrections |
| `box` | `#EFEADF` | `#21303E` | diagram box fill |
| `wash` | `#E8EEF7` | `#24384A` | tint behind text over diagrams |
| `dot` | `#D9D3C6` | `#26333F` | dot-grid |
| `rule` | `#D3CCBD` | `#33414F` | hairlines, borders |
| `tab` | `#E5DECF` | `#24313F` | washi-tape / tab accents |
| `mount` | `#ffffff` | `#E6E1D6` | photo mount / frame |

Contrast is AA-verified in both themes (body ≥ 4.5:1, large/graphic ≥ 3:1). `mark` and `accent` on `paper`/`surface` are the tight pairs — do not darken backgrounds past the values above.

Texture tokens: `--grain-opacity` (`.045` light / `.06` dark), `--grain-blend` (`multiply` / `soft-light`).

## Typography

Families:
- `--font-display` — **Cabinet Grotesk** (Fontshare, self-hosted woff2): headings, body, UI. Weights 400/500/700/800/900.
- `--font-mono` — **IBM Plex Mono**: labels, eyebrows, metadata, annotations, diagram text. Weights 400/500/600 + italic.

The reference file used dozens of ad-hoc px/clamp sizes. Rationalized to two scales:

**Text scale** (discrete, rem, `--text-*`):
| Token | Size | Use |
|---|---|---|
| `label` | .6875rem (11px) | mono eyebrows / kickers |
| `meta` | .8125rem (13px) | mono metadata, captions |
| `sm` | .875rem (14px) | small body, deck |
| `base` | 1rem (16px) | body |
| `lg` | 1.125rem (18px) | lead body |

**Display scale** (fluid clamp, `--display-*`) — headings only:
| Token | clamp | Use |
|---|---|---|
| `d3` | `clamp(1.5rem, 3.5vw, 2.25rem)` | section titles |
| `d2` | `clamp(1.75rem, 4vw, 2.75rem)` | sub-hero |
| `d1` | `clamp(2.375rem, 6vw, 3.875rem)` | hero name |

Positioning line uses `d3`-weight display at `--text-lg`→`d3` fluidly. No component sets a raw font-size.

## Spacing & layout

Base 4px scale (Tailwind default retained). Semantic layout tokens on top:
- `--gutter` — fluid page padding `clamp(1.125rem, 4vw, 2.75rem)`
- `--measure` — prose width `68ch`
- `--section-gap` — vertical rhythm between organisms `clamp(3.5rem, 8vw, 6.5rem)`
- `--stack` — default in-flow vertical gap `1.25rem`

## Radii, shadows, motion

- Radii: `--radius-sm` 2px (tape, chips), `--radius` 4px (cards). The notebook is mostly square — radius is used sparingly.
- Shadows: `--shadow-paper` (soft offset lift for taped elements), `--shadow-rule` (1px inset hairline). No glow.
- Motion: `--ease-draw` `cubic-bezier(.2,.7,.2,1)`; durations `--dur-quick` 180ms, `--dur` 320ms, `--dur-draw` 700ms. All motion behind `prefers-reduced-motion`.

## Atomic structure (Brad Frost)

Folders: primitives in `app/components/ui/` (atoms + generic molecules); domain organisms in feature folders (`hero/`, `journal/`, `work/`, `diagram/`, `layout/`). Smart vs dumb per CLAUDE.md.

### Atoms (`ui/`)
`paper-surface` (bg + grain layer) · `dot-grid` (parallax background layer) · `rule` (hairline / dashed) · `mono-label` (eyebrow/kicker) · `ink-link` · `annotation` (red margin note) · `tape-strip` · `page-stamp` (ghost page number) · `icon-button` · `pill`/`tag` · `skip-link` · `visually-hidden` · `sun-moon-icon` · `sound-icon` (last two already in `theme/`,`sound/`).

### Molecules
`taped-photo` (mount + tape + caption, hover-straighten) · `section-header` (kicker + title + rule + see-all) · `journal-card` (tags · title · deck · date · read-link, hover date-circle) · `draft-line` (checkbox · title · pillar-tag) · `work-row` (name · role · desc · stack · details) · `diagram-annotation` (note + hand arrow) · `toggle-cluster` (theme + sound).

### Organisms
`site-header` (brand · nav · toggles) · `hero` · `journal-section` (header + card grid + drafts) · `work-index` · `worked-problem` (intro + figure + annotations) · `how-its-built` (compact figure) · `kalebtec-bridge` (margin note) · `site-footer`. Inline-SVG figures (`voxel-render-tests`, `site-pipeline`) are `diagram/` organisms with `role=img` + titles + themed stroke tokens.

### Templates / Pages
`page-shell` (header + main + footer + background layers) · `landing-template`. Pages: `home` (landing), `about`, `experience`, `journal`, `journal-entry`.

## Tailwind v4 conventions

- CSS-first: `@import "tailwindcss"` + `@theme { --color-*, --font-*, --text-*, … }` in `app/styles/tokens.css`; no `tailwind.config.ts` theme block.
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` driven by the existing cookie + `<html class>` (see `theme/`).
- `@tailwindcss/vite` plugin replaces the PostCSS pipeline.
- Utilities from tokens (`bg-paper`, `text-ink`, `text-mark`, `font-mono`, `text-display-d1`…). Bespoke, reused patterns become `@utility` (e.g. `@utility dot-grid`, `@utility grain`), never copy-pasted class blobs.
- The cyber `textShadowPlugin`/neon utilities are dropped; `box-decoration-break`/`no-marker` survive as `@utility`.
