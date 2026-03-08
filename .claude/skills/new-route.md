# Skill: Create a New Route

Use this skill when the user asks to add a new page or route to the app.

## Steps

1. **Add the route definition** in `app/routes.ts`:
   - Add the path to the `Routes` object
   - Add the route to the `routes` array using `route()` or `index()`

2. **Create the route file** at `app/routes/<name>.route.tsx` (or in a subfolder for routes with co-located components):

```tsx
import type { Route } from './+types/<name>.route'

// Only if needed:
export async function loader({ request, params }: Route.LoaderArgs) {
  return { /* data */ }
}

export const meta: Route.MetaFunction = ({ location }) => {
  return getSocialMetaTags({
    title: 'Page Title | Rowin Hernandez',
    url: getAbsolutePathname(location.pathname),
  })
}

export default function MyRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <AlignedBlock className="relative z-10 pt-14">
        {/* content */}
      </AlignedBlock>
    </main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  // Handle errors
}
```

3. **Run typegen** to generate route types: `npx react-router typegen`

4. **Verify** with `npx tsc --noEmit`

## Conventions

- Route files use `.route.tsx` or `.route.ts` suffix
- Use `Route.LoaderArgs`, `Route.ActionArgs`, `Route.ComponentProps` (not generic `LoaderFunctionArgs`)
- Receive data via `{ loaderData }` prop (not `useLoaderData()` hook)
- Import from `react-router` (never `@remix-run/*`)
- Use `AlignedBlock` for page-level layout containers
- Use `getSocialMetaTags()` for meta tags
- Use `ErrorBoundary` (not `CatchBoundary`)
- Throw `new Response(...)` for error responses (not plain objects)
