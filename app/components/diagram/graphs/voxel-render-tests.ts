import { type DiagramGraph } from '../diagram-graph'

export const VOXEL_RENDER_TESTS_TITLE =
  'Voxel render-tests workflow — the CI pipeline that runs Puppeteer render tests and pixel-diffs them against cloud baselines'

export const VOXEL_RENDER_TESTS_ARIA_LABEL =
  'Hand-drawn flowchart of the Voxel render-tests workflow. A push or manual trigger hits a git webhook, which calls the render-tests API. The API checks whether the branch is already running; if so it stops the stale run so the newest commit wins, then starts a run: it checks out the branch and commit and notifies run-started through a Lambda notifier. A per-test loop then runs each render test: if the test errored it notifies an error; otherwise it checks for pixel diffs — a diff notifies a diff for a human to review, no diff notifies success. After each test it asks whether more tests remain; if yes it checks for a halt event between tests and, if none, loops back to run the next test; a halt event or no remaining tests ends the loop. Finally it notifies run-finished through the notifier and the run is done.'

export const voxelRenderTestsGraph: DiagramGraph = {
  nodes: [
    { id: 'trigger', kind: 'terminal', label: 'push / manual' },
    { id: 'webhook', kind: 'box', label: 'git webhook', sublabels: ['push event'] },
    { id: 'api', kind: 'origin', label: 'render-tests API', sublabels: ['entry point'] },
    { id: 'running', kind: 'decision', label: 'branch already\nrunning?' },
    { id: 'stopStale', kind: 'box', label: 'stop stale run', sublabels: ['newest commit wins'] },
    { id: 'startRun', kind: 'box', label: 'start run', sublabels: ['checkout branch + commit'] },
    {
      id: 'runStarted',
      kind: 'origin',
      label: 'notify: run started',
      sublabels: ['notifier · Lambda'],
    },
    { id: 'runTest', kind: 'box', label: 'run test' },
    { id: 'errors', kind: 'decision', label: 'errors?' },
    { id: 'notifyError', kind: 'origin', label: 'notify: error' },
    { id: 'diffs', kind: 'decision', label: 'diffs?' },
    { id: 'notifySuccess', kind: 'origin', label: 'notify: success' },
    {
      id: 'notifyDiff',
      kind: 'origin',
      label: 'notify: diff',
      sublabels: ['human reviews the pixels'],
    },
    { id: 'moreTests', kind: 'decision', label: 'more tests?' },
    { id: 'halt', kind: 'decision', label: 'halt event?' },
    {
      id: 'runFinished',
      kind: 'origin',
      label: 'notify: run finished',
      sublabels: ['notifier · Lambda'],
    },
    { id: 'done', kind: 'terminal', label: 'done' },
  ],
  edges: [
    { from: 'trigger', to: 'webhook' },
    { from: 'webhook', to: 'api' },
    { from: 'api', to: 'running' },
    { from: 'running', to: 'stopStale', label: 'yes' },
    { from: 'running', to: 'startRun', label: 'no' },
    { from: 'stopStale', to: 'startRun' },
    { from: 'startRun', to: 'runStarted' },
    { from: 'runStarted', to: 'runTest' },
    { from: 'runTest', to: 'errors' },
    { from: 'errors', to: 'notifyError', label: 'yes' },
    { from: 'errors', to: 'diffs', label: 'no' },
    { from: 'diffs', to: 'notifyDiff', label: 'yes' },
    { from: 'diffs', to: 'notifySuccess', label: 'no' },
    { from: 'notifyError', to: 'moreTests' },
    { from: 'notifySuccess', to: 'moreTests' },
    { from: 'notifyDiff', to: 'moreTests' },
    { from: 'moreTests', to: 'halt', label: 'yes' },
    { from: 'moreTests', to: 'runFinished', label: 'no' },
    { from: 'halt', to: 'runTest', label: 'no' },
    { from: 'halt', to: 'runFinished', label: 'yes' },
    { from: 'runFinished', to: 'done' },
  ],
  annotations: [
    {
      anchor: 'stopStale',
      side: 'left',
      lines: [
        'newest push preempts the',
        'running branch — stale results',
        'are worse than slow ones.',
      ],
    },
    {
      anchor: 'halt',
      side: 'left',
      lines: ['halt is checked between', 'tests — never mid-test.'],
    },
    {
      anchor: 'notifyDiff',
      side: 'left',
      lines: ["a diff isn't a failure —", 'a human judges the pixels.'],
    },
  ],
}
