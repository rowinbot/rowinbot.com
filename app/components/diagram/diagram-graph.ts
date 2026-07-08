export type DiagramNodeKind = 'box' | 'origin' | 'terminal' | 'decision'

export interface DiagramGraphNode {
  id: string
  kind: DiagramNodeKind
  label: string
  sublabels?: string[]
}

export interface DiagramGraphEdge {
  from: string
  to: string
  label?: string
  dashed?: boolean
}

export interface DiagramGraphAnnotation {
  anchor: string
  side: 'left' | 'right' | 'above' | 'below'
  lines: string[]
}

export interface DiagramGraph {
  nodes: DiagramGraphNode[]
  edges: DiagramGraphEdge[]
  annotations: DiagramGraphAnnotation[]
}

export interface NodeSize {
  width: number
  height: number
}

/*
  Text metrics for the `.diagram-auto` type scale. The node renderer stacks its
  lines with these same heights, so sizing and drawing never disagree. Widths
  are estimates for the mono face — a size is only ever a lower bound, so a
  small over-estimate keeps text off the stroke rather than overflowing it.
*/
export const TITLE_LINE_HEIGHT = 17
export const SUBLABEL_LINE_HEIGHT = 14
const TITLE_CHAR_WIDTH = 8.4
const SUBLABEL_CHAR_WIDTH = 6.6

interface KindMetrics {
  minWidth: number
  minHeight: number
  padX: number
  padY: number
}

const KIND_METRICS: Record<DiagramNodeKind, KindMetrics> = {
  box: { minWidth: 128, minHeight: 54, padX: 32, padY: 22 },
  origin: { minWidth: 148, minHeight: 58, padX: 34, padY: 24 },
  terminal: { minWidth: 112, minHeight: 46, padX: 40, padY: 22 },
  decision: { minWidth: 132, minHeight: 100, padX: 58, padY: 70 },
}

/*
  Sizes a node to its own content rather than a fixed per-kind box, so the two
  real graphs — a wide seven-box pipeline and a tall decision flowchart — both
  lay out without hand-tuning and without labels spilling the stroke. Kind sets
  the shape's minimum and its padding (a diamond carries the most slack because
  its corners eat horizontal room where the text sits).
*/
export function nodeSize(node: DiagramGraphNode): NodeSize {
  const metrics = KIND_METRICS[node.kind]
  const titleLines = node.label.split('\n')
  const subs = node.sublabels ?? []

  const contentWidth = Math.max(
    0,
    ...titleLines.map((line) => line.length * TITLE_CHAR_WIDTH),
    ...subs.map((line) => line.length * SUBLABEL_CHAR_WIDTH),
  )
  const contentHeight =
    titleLines.length * TITLE_LINE_HEIGHT + subs.length * SUBLABEL_LINE_HEIGHT

  return {
    width: Math.max(metrics.minWidth, Math.ceil(contentWidth) + metrics.padX),
    height: Math.max(metrics.minHeight, Math.ceil(contentHeight) + metrics.padY),
  }
}
