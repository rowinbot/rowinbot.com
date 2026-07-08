import { DiagramAnnotation } from './diagram-annotation'

const ARIA_LABEL =
  "Hand-drawn architecture diagram of this site's content pipeline: MDX source for the journal and pages is bundled by a content builder using mdx-bundler, which also emits image blur data-URLs and Satori OG images as build-time side outputs; the builder writes prebuilt JSON into content/build; and an Express plus React Router v7 server on Fly.io reads that JSON at request time to render the page for the browser."

export function SitePipelineFigure() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 620 470"
      role="img"
      aria-label={ARIA_LABEL}
    >
      <title>How this site is built — the build-time MDX content pipeline</title>
      <g filter="url(#rough)">
        <rect className="box stroke" x="24" y="46" width="150" height="74" rx="4" />
        <rect className="box box-origin stroke" x="236" y="38" width="170" height="90" rx="5" />
        <rect className="box stroke" x="458" y="46" width="140" height="74" rx="4" />
        <rect className="box stroke" x="196" y="210" width="140" height="58" rx="4" />
        <rect className="box stroke" x="356" y="210" width="150" height="58" rx="4" />
        <rect className="box box-origin stroke" x="232" y="360" width="214" height="86" rx="5" />
        <rect className="box stroke" x="478" y="366" width="118" height="74" rx="4" />

        <path className="stroke" d="M174,83 C200,82 214,83 235,83" markerEnd="url(#ah)" />
        <path className="stroke" d="M406,83 C428,82 440,83 457,83" markerEnd="url(#ah)" />
        <path className="stroke" d="M528,120 C528,220 420,300 380,358" markerEnd="url(#ah)" />
        <path className="stroke" d="M446,403 C458,403 466,403 476,403" markerEnd="url(#ah)" />

        <path className="stroke stroke-dash" d="M300,128 C286,155 276,180 268,209" markerEnd="url(#ah)" />
        <path className="stroke stroke-dash" d="M348,128 C372,155 405,180 428,209" markerEnd="url(#ah)" />
      </g>

      <text className="lbl" x="99" y="76" textAnchor="middle">MDX SOURCE</text>
      <text className="lbl-sub" x="99" y="92" textAnchor="middle">journal + pages</text>
      <text className="lbl-sub" x="99" y="106" textAnchor="middle">content/*.mdx</text>

      <text className="lbl" x="321" y="72" textAnchor="middle">CONTENT BUILDER</text>
      <text className="lbl-sub" x="321" y="90" textAnchor="middle">mdx-bundler</text>
      <text className="lbl-sub" x="321" y="106" textAnchor="middle">runs on content:watch</text>
      <text className="lbl-sub" x="321" y="120" textAnchor="middle">build step — not runtime</text>

      <text className="lbl" x="528" y="74" textAnchor="middle">JSON</text>
      <text className="lbl-sub" x="528" y="90" textAnchor="middle">content/build/</text>
      <text className="lbl-sub" x="528" y="104" textAnchor="middle">entries + index</text>

      <text className="lbl" x="266" y="236" textAnchor="middle" style={{ fontSize: '10.5px' }}>image blur</text>
      <text className="lbl-sub" x="266" y="251" textAnchor="middle">data-URLs</text>

      <text className="lbl" x="431" y="236" textAnchor="middle" style={{ fontSize: '10.5px' }}>Satori OG images</text>
      <text className="lbl-sub" x="431" y="251" textAnchor="middle">per entry</text>

      <text className="lbl" x="339" y="390" textAnchor="middle" style={{ fontSize: '11px' }}>EXPRESS + REACT ROUTER v7</text>
      <text className="lbl-sub" x="339" y="406" textAnchor="middle">SSR · reads JSON at request time</text>
      <text className="lbl-sub" x="339" y="420" textAnchor="middle">Fly.io (mad)</text>

      <text className="lbl" x="537" y="398" textAnchor="middle">BROWSER</text>
      <text className="lbl-sub" x="537" y="414" textAnchor="middle">page view</text>

      <text className="edge-l" x="252" y="176" textAnchor="middle">side outputs</text>
      <text className="edge-l" x="470" y="250" textAnchor="start">read, not built</text>

      <DiagramAnnotation
        x={14}
        y={316}
        lines={[
          'build-time, not per-request —',
          'a page view is a file read,',
          'not a compile.',
        ]}
        arrowPath="M150,332 C185,336 205,358 232,374"
      />
      <DiagramAnnotation
        x={446}
        y={300}
        lines={['blur + OG made once,', 'here at build.']}
        arrowPath="M462,296 C452,288 444,280 432,270"
      />
    </svg>
  )
}
