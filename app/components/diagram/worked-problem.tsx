import { SectionHeader } from '~/components/ui'

import { DiagramFrame } from './diagram-frame'
import { VoxelRenderTestsFigure } from './voxel-render-tests-figure'

export function WorkedProblem() {
  return (
    <section aria-labelledby="worked-problem-heading">
      <div className="pt-[clamp(3.5rem,8vw,6.5rem)]">
        <SectionHeader
          title="Worked problem — testing a 3D medical viewer"
          id="worked-problem-heading"
        />
      </div>

      <p className="reveal m-0 mb-5 max-w-[64ch] font-mono text-[0.84375rem] leading-[1.72] text-ink">
        On Voxel — a browser-based 3D dental viewer — a wrong pixel is a clinical
        risk. Every branch runs{' '}
        <strong className="font-semibold text-link">
          Puppeteer render tests
        </strong>{' '}
        and pixel-diffs them against{' '}
        <strong className="font-semibold text-link">cloud baselines</strong>. The
        CI I built treats a diff as a{' '}
        <span className="italic text-mark">question for a human</span>, not an
        automatic fail — and lets the newest push preempt a stale run.
      </p>

      <DiagramFrame caption="render-tests workflow" note="voxel · 2021">
        <VoxelRenderTestsFigure />
      </DiagramFrame>

      <p className="mt-4 max-w-[60ch] font-mono text-[0.75rem] leading-[1.7] text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink">
        Stack: <strong>AVA + Puppeteer</strong>, pixelmatch against cloud
        baselines. The hard part wasn&apos;t the diffing — it was the run
        lifecycle: preemption, a halt check between tests, and a notifier keeping
        humans in the loop.
      </p>
    </section>
  )
}
