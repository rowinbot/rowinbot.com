import { Diagram } from './diagram'
import {
  SITE_PIPELINE_ARIA_LABEL,
  SITE_PIPELINE_TITLE,
  sitePipelineGraph,
} from './graphs/site-pipeline'

export function SitePipelineFigure() {
  return (
    <Diagram
      graph={sitePipelineGraph}
      title={SITE_PIPELINE_TITLE}
      ariaLabel={SITE_PIPELINE_ARIA_LABEL}
      layout={{ ranksep: 42 }}
      maxWidth={700}
    />
  )
}
