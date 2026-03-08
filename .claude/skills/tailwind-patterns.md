# Skill: Tailwind Patterns for This Project

Use this skill when applying Tailwind CSS styles in this project.

## Project-Specific Classes

### Custom Spacing
- `px-x` / `py-x` - Standard horizontal padding (1.75rem)
- `px-x-safe` - Safe area padding (1.5rem)
- `px-x-sm` / `sm:px-x-sm` - Wider padding at sm+ (2rem)

### Custom Utilities
- `app-text` - Default text color with dark mode support
- `app-bg` - Default background color with dark mode support
- `skewed-mark` - Gradient underline decoration (purple-to-fuchsia)
- `text-shadow-{color}` + `text-shadow-{short|regular|long}` - Text shadow with configurable color and depth
- `svg-stop-{color}` - SVG gradient stop color
- `box-decoration-break` - Clone box decoration
- `no-marker` - Hide details/summary markers

### Custom Breakpoints
- `2xs:` - 372px
- `xs:` - 512px
- Standard: `sm:` `md:` `lg:` `xl:` `2xl:`

### Custom Fonts
- `font-sans` - Inter (default)
- `font-mono` - JetBrains Mono
- `font-body` - Open Sans

## Best Practices

### DO
- Use `clsx()` from `~/utils/clsx` for conditional/merged classes (it's tailwind-merge)
- Use `dark:` prefix for dark mode styles (class-based)
- Use the opacity modifier syntax: `bg-blue-500/50` (not `bg-blue-500 bg-opacity-50`)
- Use `shrink-0` (not `flex-shrink-0`)
- Use `border` alone for 1px borders (not `border-[1px]`)
- Use `transition-colors` or `transition-opacity` for specific transitions
- Use responsive prefixes mobile-first

### DON'T
- Don't use `transition-all` unless truly needed (use specific transition properties)
- Don't use deprecated opacity utilities (`bg-opacity-*`, `border-opacity-*`)
- Don't add custom `.select-none` (Tailwind has one built-in)
- Don't use spacer divs for layout (use gap/space utilities)

## Layout Components
- `AlignedBlock` - Max-width container with standard padding
- `TextBlock` - Text content block
- `ImageBlock` - Image content block
- `Block` - Generic layout block
