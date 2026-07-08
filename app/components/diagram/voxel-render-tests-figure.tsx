import { Diagram } from './diagram'
import {
  VOXEL_RENDER_TESTS_ARIA_LABEL,
  VOXEL_RENDER_TESTS_TITLE,
  voxelRenderTestsGraph,
} from './graphs/voxel-render-tests'

export function VoxelRenderTestsFigure() {
  return (
    <Diagram
      graph={voxelRenderTestsGraph}
      title={VOXEL_RENDER_TESTS_TITLE}
      ariaLabel={VOXEL_RENDER_TESTS_ARIA_LABEL}
      layout={{ ranksep: 34, nodesep: 40 }}
      maxWidth={700}
    />
  )
}
