# Diagram tooling for rowinbot.com — decision doc

_Research date: 2026-07-08. Scope: read-only evaluation. No app code changed._

## TL;DR

**Recommendation: keep the current SVG + CSS-variable + `#rough` filter rendering exactly as-is, and replace only the hand-placed coordinates with a synchronous auto-layout pass using `@dagrejs/dagre`, feeding small declarative React SVG `<Node>` / `<Edge>` components.** This is the only option that satisfies every hard constraint without regressions: it stays SSR-safe (dagre is pure, synchronous JS — it runs during `renderToString`, no `window`), keeps 100% of the theming (fill/stroke already resolve from `--ink`/`--accent`/`--mark`/`--box` CSS vars), keeps the hand-drawn look (the existing `feTurbulence` `#rough` filter and the `role="img"` + `aria-label` a11y), keeps the CSS scroll-driven `diagram-wipe` draw-on animation and its reduced-motion fallback, and adds roughly **~45 kB min (~15 kB gzip)** of build-time-only layout code. The author writes nodes + edges as data; dagre assigns the x/y that is tedious to hand-tune today.

Everything the current diagrams do well is a consequence of them being plain SVG styled by CSS. The single real pain point the owner named — hand-placing SVG coordinates — is a layout problem, not a rendering problem. So the fix is a layout engine, not a rendering library. Swapping in React Flow / Mermaid / Rough.js would _lose_ working properties (CSS-var theming, the scroll-timeline animation, the `#rough` filter, SSR purity, print-crispness) to solve a problem those tools don't uniquely solve.

**Runners-up:** (2) **React Flow / `@xyflow/react`** — best-in-class if these were interactive pan/zoom graph editors, but they aren't; it renders nodes as **HTML `<div>`s measured by a `ResizeObserver`** (client-only for dynamic sizes), ships a required base stylesheet and a canvas/viewport paradigm, and doesn't fit static, print-like article figures. (3) **Mermaid `look: 'handDrawn'`** — least authoring effort (text → diagram, has a built-in rough look), but ~500 kB+, string-DSL not JSX, and it bakes theme colors at parse time so it won't recolor from our CSS vars on a theme toggle without hacks. (4) **react-rough-fiber** (a React reconciler that renders SVG JSX _through_ Rough.js) is the most on-brand in spirit but is effectively unmaintained (last publish 2023, React 17/18), has an SSR-unknown custom reconciler, and its theming only reads inline `fill` attributes, not CSS `fill` — a direct conflict with our token system.

Doc lives at: `/Users/rowin/Projects/Personal/rowinbot.com/docs/diagram-tooling-research.md`.

---

## What we have today (the baseline to beat)

Two figures — `app/components/diagram/voxel-render-tests-figure.tsx` (a workflow flowchart: terminals, decision diamonds, a dashed per-test loop box, red margin annotations) and `app/components/diagram/site-pipeline-figure.tsx` (a content pipeline with side-output branches). Both are hand-authored inline SVG. Shared machinery:

- **Sketchy look:** one SVG filter, `#rough`, in `app/components/ui/sketch-defs.tsx` — `feTurbulence` (fractalNoise) → `feDisplacementMap scale=2.4` — applied via `filter="url(#rough)"` on the shape group. Also defines the `#ah` arrowhead marker. This is a Rough.js-style effect done in ~10 lines, with zero JS and zero dependencies.
- **Theming:** every shape carries a class (`.box`, `.stroke`, `.diamond`, `.term`, `.loopbox`, `.lbl`, `.red-note`…) and `app/styles/notebook.css` maps those to `fill`/`stroke` of CSS custom properties (`--box`, `--accent`, `--ink`, `--ink-soft`, `--mark`, `--rule`, `--wash`, `--link`). `app/styles/tokens.css` redefines those vars for light vs. dark. So the diagram recolors on theme toggle **for free** — nothing is baked into the SVG.
- **A11y:** `role="img"` + a long descriptive `aria-label` (full prose walkthrough of the flow) + `<title>`. Text nodes are real SVG `<text>`, so they're crisp and selectable.
- **Draw-on animation:** pure CSS. `notebook.css` animates `.diagram > g` with `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` on an `animation-timeline: view()` scroll timeline (a left-to-right "wipe"), gated behind `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`, with an explicit `prefers-reduced-motion: reduce` reset (`clip-path: none`). Red annotation arrows use `pathLength={1}` for stroke-draw. No JS, no IntersectionObserver.
- **The one weakness:** every `x`/`y`/`d` is a magic number. Adding a node or re-routing an edge means re-solving coordinates by hand for dozens of elements. That's the maintenance tax the owner wants gone.

Any replacement must _keep_ the five strengths and _remove_ the one weakness.

---

## Comparison against the hard constraints

| Option | SSR-safe (RR7) | Themes from our CSS vars | Hand-drawn look | A11y (role=img + desc) | Auto-layout (no hand coords) | Declarative / JSX | SVG (not canvas) | Bundle (runtime) | Maintained 2026 | Fit |
|---|---|---|---|---|---|---|---|---|---|---|
| **Keep SVG + `#rough`, no layout engine (status quo)** | ✅ perfect | ✅ native | ✅ current effect | ✅ current | ❌ **hand-placed** | ⚠️ JSX but hand-tuned | ✅ | 0 kB | ✅ (our code) | Baseline; fails the one goal |
| **⭐ SVG + `#rough` + `@dagrejs/dagre` layout (RECOMMENDED)** | ✅ dagre is sync, pure JS, no `window` | ✅ unchanged (classes → vars) | ✅ unchanged `#rough` filter | ✅ unchanged | ✅ **dagre assigns x/y** | ✅ nodes+edges as data → React SVG | ✅ | **build/render-time only, ~45 kB min / ~15 kB gz** | ✅ v3.0.0, Mar 2026 | **Best** |
| SVG + `#rough` + **ELK (`elkjs`)** layout | ⚠️ **async** (Promise) → must layout before render or in effect; awkward in pure SSR | ✅ unchanged | ✅ unchanged | ✅ unchanged | ✅ most powerful layouts | ✅ | ✅ | large (~1.4 MB min; web-worker oriented) | ✅ very active | Good layouts, wrong ergonomics for static SSR figures |
| **React Flow / `@xyflow/react` 12** | ⚠️ SSR needs explicit node w/h; **nodes are HTML `<div>` measured by `ResizeObserver`** (client) | ⚠️ own CSS-var system + **required base stylesheet**; recolor possible but parallel to ours | ❌ not hand-drawn; nodes are DOM boxes (would need per-node inner SVG + our filter) | ⚠️ interactive-graph a11y, not `role=img` figure | ✅ (via dagre/ELK example hook) | ✅ | ⚠️ **edges SVG, nodes HTML** | ~55 kB+ core + base CSS | ✅ very active | Overkill; interactive canvas paradigm, not article figures |
| **Mermaid** `look: 'handDrawn'` | ⚠️ heavy; SSR needs headless/`mdbook-mermaid-ssr`-style setup or client render | ❌ **theme baked at parse** (neutral/base); won't follow `--accent` on toggle without re-render hacks | ✅ built-in rough look (uses Rough.js) | ⚠️ generated; limited control | ✅ fully automatic | ❌ **string DSL**, not JSX/data | ✅ SVG out | ~500 kB+ | ✅ very active | Great for speed, loses theming + JSX + bundle budget |
| **react-rough-fiber** (React reconciler → Rough.js SVG) | ❌ **SSR unknown**; custom `react-reconciler` | ❌ reads **inline `fill` only, not CSS `fill`** — conflicts with our token classes | ✅ real Rough.js strokes | ✅ (you author SVG) | ❌ no layout | ✅ write SVG JSX | ✅ | small | ❌ **stale (2023, React 17/18)** | On-brand but abandoned + theming conflict |
| **Rough.js directly** (`roughjs`) | ⚠️ imperative canvas/SVG API, needs DOM node | ❌ colors passed as options, **baked into generated paths** | ✅ the reference effect | manual | ❌ no layout | ❌ imperative, not declarative | ✅ (svg mode) | <9 kB gz | ⚠️ **v4.6.6, ~3 yrs old** | Our `feTurbulence` filter already gives this, themeably |
| **D3** (`d3-shape` + `d3-hierarchy` / `d3-dag`) | ✅ sync, SSR-fine | ✅ (you own the SVG) | ⚠️ DIY (reuse `#rough`) | ✅ (you own it) | ✅ hierarchy/dag layouts | ⚠️ imperative D3 idiom vs React | ✅ | modular, small per-module | ✅ active | Viable, but dagre is a better fit for boxes-and-arrows flowcharts than tree/DAG layouts |
| **visx** (`@visx/*`) | ✅ SVG, SSR-friendly | ✅ (you own the SVG) | ⚠️ DIY | ✅ | ⚠️ chart primitives, not graph layout | ✅ React components | ✅ | ~12 kB (`@visx/visx`), tree-shakeable | ✅ 1.26M w/dl | **Best for future _data_ charts, not flowcharts** |

Legend: ✅ satisfies · ⚠️ satisfies with caveats/work · ❌ fails or fights the constraint.

---

## Recommended integration: dagre-driven, same rendering

The mental model: **dagre owns _where_, our existing SVG/CSS owns _how it looks_.** Nothing about theming, the `#rough` filter, a11y, or the animation changes.

### 1. Author the flowchart as data (no coordinates)

```ts
// voxel-render-tests.graph.ts
export const nodes = [
  { id: 'trigger', kind: 'terminal', label: 'push / manual', w: 104, h: 44 },
  { id: 'webhook', kind: 'box', label: 'git webhook', sub: 'push event', w: 116, h: 52 },
  { id: 'api', kind: 'box', label: 'render-tests API', sub: 'entry point', w: 150, h: 52 },
  { id: 'running?', kind: 'decision', label: 'branch already running?', w: 84, h: 84 },
  { id: 'runTest', kind: 'box', label: 'run test', w: 104, h: 44 },
  // …
] as const

export const edges = [
  { from: 'trigger', to: 'webhook' },
  { from: 'api', to: 'running?' },
  { from: 'running?', to: 'stopStale', label: 'yes' },
  { from: 'running?', to: 'startRun', label: 'no' },
  // …
]

// visual-only grouping (the dashed per-test loop box) and red margin notes
// stay as declarative extras keyed to node ids, drawn after layout from the
// bounding box of their member nodes.
```

Node `kind` maps to the existing CSS classes (`terminal → .term`, `box → .box`, `decision → .diamond`), so **theming is automatic and unchanged**. Sizes (`w`/`h`) are provided explicitly (as SSR requires) so dagre and the server agree on geometry without measuring the DOM.

### 2. Lay out synchronously at render time

```ts
import dagre from '@dagrejs/dagre'

function layout(nodes, edges, { rankdir = 'TB', nodesep = 40, ranksep = 56 } = {}) {
  const g = new dagre.graphlib.Graph().setGraph({ rankdir, nodesep, ranksep })
  g.setDefaultEdgeLabel(() => ({}))
  nodes.forEach((n) => g.setNode(n.id, { width: n.w, height: n.h }))
  edges.forEach((e) => g.setEdge(e.from, e.to))
  dagre.layout(g) // ← synchronous, pure JS, runs inside renderToString
  return g // read g.node(id).x/y (center) and g.edge(e).points for the polyline
}
```

Because `dagre.layout()` is synchronous and touches no browser globals, it runs during React Router v7's server render — the SVG arrives fully positioned in the HTML, hydration matches, no client layout flash. (This is the key ergonomic win over ELK, whose layout is Promise-based and would force a two-pass or effect-based render.)

### 3. Render with tiny React SVG components (the look you already have)

```tsx
<svg className="diagram" viewBox={`0 0 ${g.graph().width} ${g.graph().height}`}
     role="img" aria-label={ARIA_LABEL}>
  <title>{TITLE}</title>
  <g filter="url(#rough)">
    {nodes.map((n) => <Node key={n.id} {...g.node(n.id)} kind={n.kind} />)}
    {edges.map((e) => <Edge key={e.id} points={g.edge(e).points} label={e.label} />)}
  </g>
  {/* labels + <DiagramAnnotation> red notes, positioned from node centers */}
</svg>
```

- `<Node>` emits the same `<rect className="box stroke">` / `<path className="diamond stroke">` / `<rect className="term">` markup — so **the `#rough` filter, `--accent`/`--box`/`--ink` theming, and dark-mode toggle all work unchanged**.
- `<Edge>` turns dagre's `points` into a `<path className="stroke" markerEnd="url(#ah)">`, replacing the hand-built `d="M…H…V…"` strings. Orthogonal routing: round the polyline or snap to H/V segments to match the current right-angle style.
- `DiagramAnnotation` (`app/components/diagram/diagram-annotation.tsx`) stays as-is; anchor each note's `arrowPath` to a laid-out node center instead of a magic coordinate.

### 4. Theming, look, animation, a11y, SSR — all preserved

- **Theming:** unchanged. Classes → CSS vars → light/dark. No palette enters JS or the SVG. ✅ hard constraint met.
- **Hand-drawn look:** unchanged `#rough` `feTurbulence` filter on the group. (Optional future upgrade: swap the filter for real Rough.js path generation, but the filter already satisfies the brand and is themeable and cheaper — keep it.) ✅
- **Draw-on animation:** unchanged. The `.diagram > g` `clip-path` scroll-timeline wipe and the `prefers-reduced-motion: reduce` reset in `notebook.css` don't care how the SVG was produced. ✅
- **A11y:** unchanged `role="img"` + `aria-label` + `<title>`. Keep authoring the prose description by hand (it's better than any generated alt text). ✅
- **SSR:** dagre is synchronous and pure; renders server-side, hydrates cleanly, no `window` at import. ✅

### Bundle impact

`@dagrejs/dagre` + its `graphlib`/`lodash-es` deps are the only additions, and they're used **only to compute coordinates** — for two static figures you can even run dagre at content-build time (alongside the existing `content:watch` pipeline) and ship pure positioned SVG with **zero** added client JS. If run at request-time SSR instead, it's server-only weight. Either way the client bundle can stay ~0 kB heavier. This beats every library option on bundle.

### Risks / caveats

- **Edge routing fidelity:** dagre gives clean ranked layouts but its default edge polylines are simpler than the bespoke right-angle routing in the Voxel chart (e.g. the loop-back arrow that hugs the left margin). Mitigation: post-process dagre's `points` into orthogonal segments, or keep a handful of edges hand-routed. Low effort, cosmetic.
- **The dashed "per-test loop" box and red margin notes are editorial, not graph structure.** Keep them as a declarative overlay computed from the bounding box of their member nodes after layout — don't try to make dagre model them.
- **Rank direction:** the Voxel chart is vertical (TB) with side branches; the pipeline is horizontal (LR) with side-outputs. dagre handles both via `rankdir`; side-outputs may want a fixed rank/`constraint` or a small manual nudge. Minor.
- **`lodash-es` transitive dep:** ensure Vite tree-shakes it; it's build/server-side so client impact is nil if layout runs at build time.
- **Scope check:** this is a "componentise + auto-layout" refactor of two files, not a new platform. Don't over-build a general graph framework for two figures.

---

## Why not the alternatives (short form)

- **React Flow / `@xyflow/react`:** the strongest _library_, and its docs even show dagre/ELK layout — but it's built for **interactive, pannable, zoomable node editors**. Nodes render as **HTML `<div>`s** whose sizes are read by a `ResizeObserver` in the browser (SSR requires hardcoding `width`/`height`), it mandates a base stylesheet and a viewport/canvas wrapper, and its nodes wouldn't carry our `#rough` SVG filter without wrapping each in inner SVG. For static, print-like, non-interactive article figures it adds a paradigm and bundle we don't want. Great tool, wrong job.
- **Mermaid (`look: 'handDrawn'`):** lowest authoring effort and it genuinely has a built-in Rough.js hand-drawn look — but it's a **string DSL** (not our JSX/data + component model), ~500 kB+, SSR needs a headless render step, and critically it **bakes theme colors at parse time** (`theme: 'neutral'` etc.), so it won't follow `--accent`/`--ink` on a light/dark toggle without re-parsing. Loses theming and bundle budget to save layout effort we can get from dagre for a fraction of the weight.
- **react-rough-fiber:** the most _philosophically_ aligned — write SVG JSX, get real Rough.js strokes — but it's **stale (last publish 2023, React 17/18 era)**, its custom `react-reconciler` has **no stated SSR story** (a real hazard under RR7 server render + React 19), and its theming reads **inline `fill` attributes only, not CSS `fill`**, which directly conflicts with our class→CSS-var token system. Too risky to adopt for a React 19 SSR site.
- **Rough.js directly / svg2roughjs:** Rough.js (`roughjs`, v4.6.6, ~3 yrs old) is imperative and bakes stroke colors into generated paths — un-themeable without regeneration. Our 10-line `feTurbulence` filter already delivers the same sketchy effect, is fully CSS-themeable, and costs nothing. No reason to add it.
- **ELK (`elkjs`):** the most powerful layout engine, but **async (Promise-based)** and worker-oriented — it fights a clean synchronous SSR render. Only reach for it if dagre's layouts prove insufficient (unlikely for two modest flowcharts).
- **D3 (`d3-hierarchy`/`d3-dag`):** perfectly SSR-safe and you own the SVG, but its layouts are tuned for **trees/DAGs**, and the idiom is imperative-in-React. dagre is the more direct fit for boxes-and-labeled-arrows flowcharts. (We'll still want `d3-shape`/`d3-scale` for data charts — see below.)

---

## Future data charts (bar / line / small-multiples / writing-cadence sparkline)

Different problem, different tool — **flowcharts and data charts should not share a library**. For the anticipated data charts:

- **Recommendation: `visx` (`@visx/*`).** It's low-level D3 math + **React-owned SVG rendering**, which means the _same_ pattern that makes our flowcharts work applies directly: className-based, CSS-variable theming (light/dark from our tokens), `role="img"`, and — crucially — we can reuse the **`#rough` filter and the scroll-driven draw-on** on chart marks to keep data charts in the same field-notebook voice. It's SSR-friendly (pure SVG), tree-shakeable (~8–20 kB for what you import; `@visx/visx` ~12 kB), React 18/19 compatible, and actively maintained (~1.26M weekly downloads on `@visx/shape`). A writing-cadence sparkline is a few `@visx/shape` + `@visx/scale` primitives.
- **Runner-up: raw `d3-shape` + `d3-scale`** hand-rendered to SVG in React — even lighter and fully in our control; good if we want zero chart-library surface. More code per chart.
- **Not Recharts/Chart.js/etc.:** Recharts is fine and SSR-ok, but it imposes its own component/theming model and default look that would fight the hand-drawn aesthetic; visx lets us keep the brand. Chart.js is canvas — loses the CSS-var theming, a11y text, and `#rough` filter entirely. Avoid canvas for this site.

Net: **visx for data charts later, dagre for flowcharts now** — both render to CSS-themeable SVG and both can wear the `#rough` filter, so the whole site's graphics stay one coherent system.

---

## Sources

- React Flow — SSR/SSG config (explicit node width/height required): https://reactflow.dev/learn/advanced-use/ssr-ssg-configuration
- React Flow — Node measurement / `ResizeObserver` / `measured.width`: https://reactflow.dev/api-reference/types/node and https://reactflow.dev/learn/troubleshooting/common-errors
- React Flow — theming via CSS variables + `colorMode` + required base styles: https://reactflow.dev/learn/customization/theming and https://reactflow.dev/examples/styling/dark-mode
- React Flow 12 announcement: https://github.com/xyflow/xyflow/discussions/3764
- React Flow — auto-layout with dagre / ELK: https://reactflow.dev/examples/layout/auto-layout , https://reactflow.dev/examples/layout/dagre , https://reactflow.dev/examples/layout/elkjs
- `@dagrejs/dagre` — npm (v3.0.0, published ~Mar 2026, MIT, active fork): https://www.npmjs.com/package/@dagrejs/dagre and https://github.com/dagrejs/dagre
- dagre vs ELK — configurability, ELK async/Promise, download counts: https://reactflow.dev/learn/layouting/layouting and https://npmtrends.com/dagre-layout-vs-diagram-js-vs-elkjs-vs-graphviz
- Mermaid — `look: 'handDrawn'` (Rough.js-based) look option: https://docs.mermaidchart.com/blog/posts/mermaid-innovation-introducing-new-looks-for-mermaid-diagrams and https://mermaid.ai/open-source/config/schema-docs/config.html
- Mermaid — rough.js option customization limitations: https://github.com/mermaid-js/mermaid/issues/6153
- Mermaid — SSR handDrawn support (mdbook-mermaid-ssr): https://lib.rs/crates/mdbook-mermaid-ssr
- Rough.js — <9 kB, canvas+SVG, v4.6.6 (~3 yrs old): https://roughjs.com/ and https://www.npmjs.com/package/roughjs
- react-rough-fiber — reconciler → SVG via Rough.js, CSS-var caveat (inline fill only), 2023 vintage, React 17/18: https://bowencodes.com/post/react-rough-fiber and https://github.com/Bowen7/react-rough-fiber
- visx — primitives, React 18/19 peer range, ~12 kB, SSR-friendly SVG, downloads: https://github.com/airbnb/visx and https://visx.airbnb.tech/
- React chart libraries 2026 (SSR/RSC tradeoffs, SVG-first for SSR): https://blog.logrocket.com/best-react-chart-libraries-2026/
