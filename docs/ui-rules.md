# rowinbot.com UI rules

Design engineering checks for motion, layout, interaction, accessibility and copy. Tokens and component structure live in [design-system.md](design-system.md). Short form of the 14 highest-value rows of the Kalebtec design engineering playbook, adapted to this stack: Tailwind v4 CSS-first, React Router 7 SSR, React 19, Framer Motion, English only.

Cite the row id in a PR or review. Every row is checked by a reviewer today. This repo has no spec suite and no UI lint rules yet, so rows that are spec or lint checks upstream read `review` here until that tooling lands.

| ID  | Check a reviewer can verify                                                                                                                                                                                           | Enforce |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| M1  | Each new animation has a one-word purpose (feedback, spatial, state, jarring-change, explanation) and a frequency tier in the PR. None is decoration.                                                                 | review  |
| M2  | An action opened by keyboard, or fired 100-plus times a day, plays no transition. Covers every keyboard-triggered surface that exists (menus, dialogs, search).                                                       | review  |
| M4  | No `scale(0)` start, in CSS or in Framer `initial`. Entrances begin at 0.95 or higher with opacity, or without scale.                                                                                                 | review  |
| M6  | Every stylesheet with motion has a `prefers-reduced-motion` block that substitutes (crossfade or instant state change). Framer motion sits under `<MotionConfig reducedMotion="user">` at the root in `app/root.tsx`. | review  |
| M12 | With JS blocked and with reduced motion, no content is hidden or below full opacity. Server-rendered HTML never contains `opacity: 0`, so Framer `initial={{ opacity: 0 }}` on SSR content needs a no-JS path.        | review  |
| L3  | No visible empty hole. Every reserved slot (images, embeds, diagrams, fonts) equals the loaded size. CLS under 0.1.                                                                                                   | review  |
| I2  | Every drag, swipe or hold action has a tap or click path and a keyboard path.                                                                                                                                         | review  |
| I3  | While the pointer is down the element follows it 1:1 with no transition. No React state per move: drive a Framer motion value or set `transform` on the element, not a CSS variable on a parent.                      | review  |
| I4  | Release dismisses on distance or velocity. Snap-back takes 200ms or less. Resistance past the edge.                                                                                                                   | review  |
| A2  | No `div` or `span` carries a click handler without being a real control (`button`, `a`, or the right role, tabindex and key handling).                                                                                | review  |
| A3  | No `outline: none` or `outline-none` without a `:focus-visible` replacement in the same rule or file. Allowlisted: programmatic focus, `main[tabindex="-1"]:focus`.                                                   | review  |
| A4  | The viewport meta in `app/root.tsx` never sets `user-scalable=no` or `maximum-scale`.                                                                                                                                 | review  |
| S4  | No page is mostly a repeated icon-title-text card grid. Two identical grids on one page is the limit, and each section has its own composition.                                                                       | review  |
| S7  | No banned word, stock line, template residue or virtue word about the site or its author. Two-fragment and number-pair headings capped at one per page.                                                               | review  |

Lint rules for M4, M6, A3 and A4 wait on a stack recon of this repo. M12, L3, I2 and S4 are Playwright specs upstream and become specs here when a suite exists.

## Verification

390 and 1280, light and dark, on every touched route plus the home. A view that was not captured is named as unchecked.

## Rules log

- 2026-11-26: ported 14 rows (M1, M2, M4, M6, M12, L3, I2, I3, I4, A2, A3, A4, S4, S7) from the Kalebtec design engineering playbook. English only, no locale rows, all rows `review`. Docs only, no lint rules.
