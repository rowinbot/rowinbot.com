# rowinbot.com - Project Guide

## CRITICAL: NO AI ATTRIBUTION IN COMMITS

**DO NOT add AI attribution lines to git commit messages.** This is enforced by a pre-tool-use hook at `.claude/hooks/block-ai-attribution.sh`.

The following are **BLOCKED** and will cause commit failure:
- `Co-Authored-By: Claude ...` or any AI co-author trailer
- `Generated with Claude Code` or similar credit lines
- `noreply@anthropic.com` or any AI service email
- Any `Co-Authored-By` referencing Claude, Anthropic, AI, GPT, or Copilot

Just write normal commit messages. No AI attribution. Ever.

---

## Project Overview

Personal website for Rowin Hernandez. A full-stack SSR app with a journal (blog) powered by MDX, deployed to Fly.io via Docker.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React Router v7 (evolved from Remix) | 7.6.3 |
| UI | React | 19.1.0 |
| Bundler | Vite | 7.0.0 |
| Styling | Tailwind CSS v3 + PostCSS | 3.4.4 |
| Server | Express (custom server.js) | 4.x |
| State | Jotai | 2.x |
| Content | MDX (custom builder with mdx-bundler) | - |
| Animation | Framer Motion + React Spring | - |
| OG Images | Satori + Resvg | - |
| Language | TypeScript | 5.x |
| Runtime | Node.js | >= 24.3.0 |
| Deploy | Fly.io (Docker) | - |

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server + content watcher (concurrent) |
| `npm run dev:server` | Start only the Express dev server |
| `npm run content:watch` | Watch & rebuild MDX content |
| `npm run build` | Production build via `react-router build` |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type checking with route typegen |

## Project Structure

```
app/
  root.tsx              # App shell (html, head, body, theme, layout)
  routes.ts             # Route definitions (manual, not file-based)
  entry.client.tsx      # Client entry
  entry.server.tsx      # Server entry
  routes/
    home.route.tsx       # / - Homepage
    about/               # /about
    experience/          # /my-experience
    journal.route.tsx    # /journal - Journal listing
    journal-entry.route.tsx  # /journal/:entryId - Individual entry
    link.route.tsx       # /ln/:code - Short link redirects
    theme.route.ts       # /resources/theme - Theme toggle action
  components/
    layout/              # Main layout, navbar, footer, MDX renderer
    buttons/             # NavLink, JournalEntryButton, etc.
    graphics/            # SVG logos
    theme.tsx            # Theme provider (dark/light/system)
    image.tsx            # BlurrableImage component
  hooks/
  styles/
    global.css           # Global styles + Tailwind imports
    app.css              # App-specific styles
    journal.css          # Journal entry styles
  utils/
    mdx.server.tsx       # MDX content loading (reads from content/build)
    theme.server.ts      # Cookie-based theme session
    env.server.ts        # Server environment variable access
    misc.ts              # Shared utilities (websiteUrl, etc.)
    misc.server.ts       # Server-only utilities (redirects)
    seo.tsx              # Social meta tag generators
    og.tsx               # OG image utilities

content/
  journal/               # MDX journal entries (source)
  pages/                 # MDX pages (source)
  builder/               # Content build system
    content-builder.ts   # Main builder (watches + builds MDX)
    mdx.ts               # MDX bundling with mdx-bundler
    image-blur.ts        # Image blur data URL generation
    og-image.tsx         # OG image generation with Satori
    content-utils.ts     # Paths, hashing, index management
  build/                 # Built content output (JSON + OG images)

server.js               # Custom Express server (dev + production)
vite.config.ts          # Vite config with reactRouter plugin
react-router.config.ts  # React Router config (SSR enabled)
tailwind.config.ts      # Tailwind with custom plugins
```

## Architecture Decisions

### Routing
Routes are defined manually in `app/routes.ts` using `@react-router/dev/routes` (not file-system routing). The `Routes` object provides type-safe route constants.

### Content System
MDX content is pre-built by a separate process (`content:watch`), not bundled at request time. The builder:
1. Reads `.mdx` files from `content/journal/` and `content/pages/`
2. Bundles them with `mdx-bundler`
3. Generates blur data URLs for images
4. Generates OG images with Satori
5. Outputs JSON to `content/build/`
6. Maintains an index of all journal entries

The server reads these pre-built JSON files at request time.

### Theme System
- Cookie-based (`app-theme`) via `createCookieSessionStorage`
- Supports dark/light/system modes
- Toggle via POST to `/resources/theme`
- Uses Jotai for client-side state
- Dark mode via Tailwind `class` strategy

### Custom Server
`server.js` is a custom Express server that:
- Serves static files from `build/client` and `content/journal`
- Serves OG images from `content/build/og`
- Uses compression and morgan logging
- In dev: creates a Vite dev server in middleware mode
- In prod: serves fingerprinted assets with long cache

### Image Handling
- `@rowinbot/rollup-image-blur` Vite plugin for blur placeholders
- `BlurrableImage` component for progressive image loading
- Journal entry images served from `/build/journal/`

## Conventions

### File Naming
- Route files: `*.route.tsx` or `*.route.ts`
- Server-only files: `*.server.ts` or `*.server.tsx`
- Route co-located components: placed in folders alongside routes (e.g., `routes/about/fact-about-me.tsx`)

### Imports
- Use `~/` alias for app-relative imports (maps to `./app/*`)
- Use `react-router` for all router imports (not `@remix-run/*`)
- Route types: `import type { Route } from './+types/[route-name]'`

### Styling
- Tailwind CSS utility classes
- Custom spacing: `x`, `x-safe`, `x-sm`
- Custom fonts: Inter (sans), JetBrains Mono (mono), Open Sans (body)
- Custom plugins: `textShadowPlugin`, `appUtilities` in tailwind.config.ts
- Custom screen breakpoints: `2xs` (372px), `xs` (512px)

### Components
- Layout blocks system: `AlignedBlock`, `TextBlock`, `ImageBlock`, `Block`
- Common class: `app-text` for default text styling

### Environment
- `.env` with `SESSION_SECRET` required
- Client env exposed via `window.__env` in root.tsx
- Server env accessed via `getRequiredServerEnv()`

## Deployment

- **Platform**: Fly.io (region: `mad` / Madrid)
- **Container**: Docker (node:24-bullseye-slim)
- **Port**: 8080 (production), 3000 (development)
- **Volume**: `/data` mounted for persistent storage
- **Build**: Multi-stage Docker build (deps -> build -> production)

## Pitfalls

- **Module augmentation files**: Don't place `.d.ts` files named after npm packages at the project root. TypeScript's `baseUrl: "."` will resolve imports to the local file instead of `node_modules`. Put augmentation files in `types/` instead.
- **Express static mounts**: Never mount `express.static` at a path that matches a React Router route (e.g., `/journal`). Use a non-conflicting prefix like `/build/journal`.
- **Trailing slash handling**: The root loader calls `removeTrailingSlashes(request)` to normalize URLs. Don't remove this call during migrations.
- **Content rebuilds after React upgrades**: After upgrading React, clean and rebuild content: `rm -rf content/build && npm run content:watch`

## Known Cleanup Opportunities

- Old build artifacts in `public/build/` from pre-Vite Remix builds (5.5MB, git-ignored, can be deleted)
- `.netlify/` directory from a previous Netlify deployment (git-ignored, harmless)
