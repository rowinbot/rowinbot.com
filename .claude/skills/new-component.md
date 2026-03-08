# Skill: Create a New Component

Use this skill when the user asks to create a new React component.

## Steps

1. **Determine location**:
   - Shared components: `app/components/`
   - Route-specific components: co-locate in the route's folder (e.g., `app/routes/about/fact-about-me.tsx`)
   - Layout components: `app/components/layout/`
   - Button/link components: `app/components/buttons/`

2. **Create the component**:

```tsx
import clsx from '~/utils/clsx'

interface MyComponentProps {
  className?: string
  // ... other props
}

export function MyComponent({ className, ...props }: MyComponentProps) {
  return (
    <div className={clsx('base-classes', className)}>
      {/* content */}
    </div>
  )
}
```

## Conventions

- Use named exports (not default exports) for non-route components
- Use `clsx` from `~/utils/clsx` (which is `tailwind-merge` aliased) for className merging
- Accept `className` prop for style customization
- Use Tailwind utility classes for styling
- Dark mode: use `dark:` prefix (class-based strategy)
- Custom spacing: `px-x` (1.75rem), `px-x-safe` (1.5rem), `px-x-sm` (2rem), `sm:px-x-sm`
- Text styling: use `app-text` class for default text color
- Responsive: mobile-first with custom breakpoints `2xs`/`xs`/`sm`/`md`/`lg`/`xl`/`2xl`
- Animations: use Framer Motion or React Spring (both available)
- Icons: use `@iconify-icon/react` with `<Icon icon="radix-icons:icon-name" />`
- Images: use `BlurrableImage` for images with blur placeholders
