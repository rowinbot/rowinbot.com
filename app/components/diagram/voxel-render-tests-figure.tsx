import { DiagramAnnotation } from './diagram-annotation'

const ARIA_LABEL =
  'Hand-drawn flowchart of the Voxel render-tests workflow. A push or manual trigger hits a git webhook, which calls the render-tests API. The API checks whether the branch is already running; if so it stops the stale run so the newest commit wins, then starts a run: it checks out the branch and commit and notifies run-started through a Lambda notifier. A per-test loop then runs each render test: if the test errored it notifies an error; otherwise it checks for pixel diffs — a diff notifies a diff for a human to review, no diff notifies success. After each test it asks whether more tests remain; if yes it checks for a halt event between tests and, if none, loops back to run the next test; a halt event or no remaining tests ends the loop. Finally it notifies run-finished through the notifier and the run is done.'

export function VoxelRenderTestsFigure() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 700 800"
      role="img"
      aria-label={ARIA_LABEL}
    >
      <title>
        Voxel render-tests workflow — the CI pipeline that runs Puppeteer render
        tests and pixel-diffs them against cloud baselines
      </title>
      <g filter="url(#rough)">
        <rect className="loopbox" x="44" y="368" width="650" height="360" rx="12" />

        <rect className="term stroke" x="24" y="26" width="104" height="44" rx="22" />
        <rect className="box stroke" x="170" y="22" width="116" height="52" rx="5" />
        <rect className="box box-origin stroke" x="330" y="22" width="150" height="52" rx="5" />

        <path className="diamond stroke" d="M405,96 L447,138 L405,180 L363,138 Z" />
        <rect className="box stroke" x="92" y="112" width="148" height="52" rx="5" />

        <rect className="box stroke" x="325" y="218" width="160" height="48" rx="5" />
        <rect className="box box-origin stroke" x="343" y="296" width="124" height="44" rx="5" />

        <rect className="box stroke" x="353" y="384" width="104" height="44" rx="5" />
        <path className="diamond stroke" d="M405,446 L439,480 L405,514 L371,480 Z" />
        <rect className="box box-origin stroke" x="514" y="459" width="148" height="42" rx="5" />
        <path className="diamond stroke" d="M405,526 L439,560 L405,594 L371,560 Z" />
        <rect className="box box-origin stroke" x="514" y="539" width="148" height="42" rx="5" />
        <rect className="box box-origin stroke" x="333" y="605" width="144" height="42" rx="5" />
        <path className="diamond stroke" d="M405,654 L441,690 L405,726 L369,690 Z" />
        <path className="diamond stroke" d="M150,564 L186,600 L150,636 L114,600 Z" />

        <rect className="box box-origin stroke" x="331" y="739" width="148" height="44" rx="5" />
        <rect className="term stroke" x="508" y="741" width="104" height="42" rx="21" />

        <path className="stroke" d="M128,48 H170" markerEnd="url(#ah)" />
        <path className="stroke" d="M286,48 H330" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,74 V96" markerEnd="url(#ah)" />
        <path className="stroke" d="M363,138 H240" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,180 V218" markerEnd="url(#ah)" />
        <path className="stroke" d="M166,164 V242 H325" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,266 V296" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,340 V384" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,428 V446" markerEnd="url(#ah)" />
        <path className="stroke" d="M439,480 H514" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,514 V526" markerEnd="url(#ah)" />
        <path className="stroke" d="M439,560 H514" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,594 V605" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,647 V654" markerEnd="url(#ah)" />
        <path className="stroke" d="M662,480 H676 V690 H441" markerEnd="url(#ah)" />
        <path className="stroke" d="M662,560 H676" />
        <path className="stroke" d="M369,690 H150 V636" markerEnd="url(#ah)" />
        <path className="stroke" d="M150,564 V406 H353" markerEnd="url(#ah)" />
        <path className="stroke" d="M405,726 V739" markerEnd="url(#ah)" />
        <path className="stroke" d="M114,600 H72 V760 H331" markerEnd="url(#ah)" />
        <path className="stroke" d="M479,761 H508" markerEnd="url(#ah)" />
      </g>

      <text className="lbl" x="76" y="52" textAnchor="middle" style={{ fontSize: '10.5px' }}>
        push / manual
      </text>

      <text className="lbl" x="228" y="45" textAnchor="middle">git webhook</text>
      <text className="lbl-sub" x="228" y="60" textAnchor="middle">push event</text>

      <text className="lbl" x="405" y="45" textAnchor="middle">render-tests API</text>
      <text className="lbl-sub" x="405" y="60" textAnchor="middle">entry point</text>

      <text className="lbl" x="405" y="134" textAnchor="middle" style={{ fontSize: '10px' }}>branch already</text>
      <text className="lbl" x="405" y="147" textAnchor="middle" style={{ fontSize: '10px' }}>running?</text>

      <text className="lbl" x="166" y="135" textAnchor="middle" style={{ fontSize: '10.5px' }}>stop stale run</text>
      <text className="lbl-sub" x="166" y="150" textAnchor="middle">newest commit wins</text>

      <text className="lbl" x="405" y="238" textAnchor="middle">start run</text>
      <text className="lbl-sub" x="405" y="253" textAnchor="middle">checkout branch + commit</text>

      <text className="lbl" x="405" y="314" textAnchor="middle" style={{ fontSize: '10.5px' }}>notify: run started</text>
      <text className="lbl-sub" x="405" y="329" textAnchor="middle">notifier · Lambda</text>

      <text className="lbl" x="405" y="410" textAnchor="middle">run test</text>

      <text className="lbl" x="405" y="484" textAnchor="middle" style={{ fontSize: '10px' }}>errors?</text>
      <text className="lbl" x="588" y="484" textAnchor="middle" style={{ fontSize: '10.5px' }}>notify: error</text>

      <text className="lbl" x="405" y="564" textAnchor="middle" style={{ fontSize: '10px' }}>diffs?</text>
      <text className="lbl" x="588" y="564" textAnchor="middle" style={{ fontSize: '10.5px' }}>notify: success</text>

      <text className="lbl" x="405" y="623" textAnchor="middle" style={{ fontSize: '10.5px' }}>notify: diff</text>
      <text className="lbl-sub" x="405" y="638" textAnchor="middle">human reviews the pixels</text>

      <text className="lbl" x="405" y="686" textAnchor="middle" style={{ fontSize: '9.5px' }}>more tests?</text>

      <text className="lbl" x="150" y="597" textAnchor="middle" style={{ fontSize: '9.5px' }}>halt</text>
      <text className="lbl" x="150" y="609" textAnchor="middle" style={{ fontSize: '9.5px' }}>event?</text>

      <text className="lbl" x="405" y="757" textAnchor="middle" style={{ fontSize: '10.5px' }}>notify: run finished</text>
      <text className="lbl-sub" x="405" y="772" textAnchor="middle">notifier · Lambda</text>

      <text className="lbl" x="560" y="766" textAnchor="middle">done</text>

      <text className="grp-l" x="60" y="388" textAnchor="start">
        per-test loop — repeats until done or halted
      </text>

      <text className="yn" x="300" y="132" textAnchor="middle">yes</text>
      <text className="yn" x="416" y="200" textAnchor="start">no</text>
      <text className="yn" x="470" y="474" textAnchor="start">yes</text>
      <text className="yn" x="416" y="522" textAnchor="start">no</text>
      <text className="yn" x="470" y="554" textAnchor="start">no</text>
      <text className="yn" x="416" y="602" textAnchor="start">yes</text>
      <text className="yn" x="255" y="682" textAnchor="middle">yes</text>
      <text className="yn" x="132" y="500" textAnchor="middle">no</text>
      <text className="yn" x="416" y="736" textAnchor="start">no</text>
      <text className="yn" x="96" y="590" textAnchor="middle">yes</text>

      <DiagramAnnotation
        x={18}
        y={262}
        lines={[
          'newest push preempts the',
          'running branch — stale results',
          'are worse than slow ones.',
        ]}
        arrowPath="M108,256 C100,222 110,192 122,166"
      />
      <DiagramAnnotation
        x={16}
        y={556}
        lines={['halt is checked between', 'tests — never mid-test.']}
        arrowPath="M96,562 C102,578 106,588 114,596"
      />
      <DiagramAnnotation
        x={168}
        y={618}
        lines={["a diff isn't a failure —", 'a human judges the pixels.']}
        arrowPath="M300,624 C314,620 324,616 332,610"
      />
    </svg>
  )
}
