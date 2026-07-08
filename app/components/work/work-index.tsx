import { SectionHeader } from '~/components/ui'

import { WorkRow } from './work-row'

const EXPERIENCE_HREF = '/my-experience'

export function WorkIndex() {
  return (
    <section aria-labelledby="work-heading">
      <div className="pt-[clamp(3.5rem,8vw,6.5rem)]">
        <SectionHeader
          title="Selected work"
          id="work-heading"
          seeAllHref={EXPERIENCE_HREF}
          seeAllLabel="full experience →"
        />
      </div>

      <ul className="m-0 list-none border-t-2 border-ink p-0">
        <WorkRow
          name="Kalebtec"
          role="Product Engineering Studio · now"
          href={EXPERIENCE_HREF}
        >
          Co-founded a two-person senior studio. Current focus: AI agent
          infrastructure, including <strong>browxai</strong> — an MCP-native,
          model-agnostic browser-control server for AI agents — and a Rust
          toolchain for machine-addressable agent context.
        </WorkRow>
        <WorkRow
          name="Fanfest"
          role="Live Fan-Engagement Platform"
          href={EXPERIENCE_HREF}
        >
          Planned and architected v3 for clubs like{' '}
          <strong>PSG, Manchester City, the 49ers and AC Milan</strong>; led a
          team of six and designed the technical hiring process. Built the
          live-broadcast pipeline (MediaLive HLS/LL-HLS → MediaPackage +
          CloudFront, Chime) serving tens of thousands of fans per live event.
        </WorkRow>
        <WorkRow
          name="WSC Sports"
          role="AI Sports-Video Platform"
          href={EXPERIENCE_HREF}
        >
          Owned the AI Voiceover domain of Clipro (trusted by{' '}
          <strong>550+ rights holders</strong> incl. the NBA, NHL, LaLiga,
          DAZN); re-architected it around an async, job-based model with
          real-time completion and in-flight recovery.
        </WorkRow>
        <WorkRow name="Voxel" role="3D Dental Imaging" href={EXPERIENCE_HREF}>
          Browser-based 3D frontend for medical volumes, sliced meshes and
          implants (Vue, Three.js, WebGL2, Rust/WASM) — plus the automated
          visual-regression infrastructure.
        </WorkRow>
        <WorkRow
          name="Sabanto"
          role="Autonomous-Agriculture Mission Control"
          href={EXPERIENCE_HREF}
        >
          Geospatial frontend for planning and monitoring autonomous tractor
          missions in real time — a reusable deck.gl / Mapbox layer system over
          Turf.js / GeoJSON workflows.
        </WorkRow>
        <WorkRow
          name="Limbic"
          role="Mental-Health Access Platform"
          href={EXPERIENCE_HREF}
        >
          Senior full-stack on an AI chatbot shortening the path to care —
          &ldquo;time-travel&rdquo; answer editing with safe rollback, and
          queued, retrying notifications so urgent cases always reach care.
        </WorkRow>
      </ul>
    </section>
  )
}
