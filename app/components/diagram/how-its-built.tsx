import { SectionHeader } from '~/components/ui'

import { DiagramFrame } from './diagram-frame'
import { SitePipelineFigure } from './site-pipeline-figure'

export function HowItsBuilt() {
  return (
    <section aria-labelledby="how-its-built-heading">
      <div className="pt-[clamp(3.5rem,8vw,6.5rem)]">
        <SectionHeader
          title="How this site is built"
          id="how-its-built-heading"
        />
      </div>

      <p className="reveal m-0 mb-5 max-w-[64ch] font-mono text-[0.84375rem] leading-[1.72] text-ink">
        React Router v7 SSR on a custom Express server. The journal is pre-built,
        not compiled per request — so a page view is a{' '}
        <span className="italic text-mark">file read, not a compile</span>.
      </p>

      <DiagramFrame caption="how this site is built" note="rowinbot.com">
        <SitePipelineFigure />
      </DiagramFrame>

      <p className="mt-4 max-w-[60ch] font-mono text-[0.75rem] leading-[1.7] text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink">
        Open source spin-off: <strong>@rowinbot/rollup-image-blur</strong>, the
        Vite plugin that generates those blur placeholders.
      </p>
    </section>
  )
}
