import { useEffect, useRef, useState } from 'react'

import { getConciseTheme, useAppTheme } from '~/components/theme'

import { MERMAID_NOTE_COLOR, mermaidSource } from './authoring-sources'

let renderSeq = 0

/*
  Approach C: render the shared graph from a plain-text Mermaid flowchart. Mermaid
  needs the DOM and bakes theme colors at parse time, so this is client-only and
  re-parses whenever the theme toggles — reading the live token values off :root so
  the hand-drawn output follows var(--accent)/var(--ink)/var(--box) in both modes.
*/
export default function MermaidGraph() {
  const theme = useAppTheme()
  const concise = getConciseTheme(theme)
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      const mermaid = (await import('mermaid')).default
      const root = document.documentElement
      const token = (name: string) =>
        getComputedStyle(root).getPropertyValue(name).trim()

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        look: 'handDrawn',
        theme: 'base',
        fontFamily: token('--font-mono') || 'monospace',
        themeVariables: {
          background: token('--surface'),
          primaryColor: token('--box'),
          primaryBorderColor: token('--accent'),
          primaryTextColor: token('--ink'),
          secondaryColor: token('--wash'),
          tertiaryColor: token('--surface'),
          lineColor: token('--accent'),
          textColor: token('--ink'),
          fontSize: '13px',
        },
      })

      // Mermaid bakes colors at parse; swap the note color for the live --mark
      // token so annotations follow the theme like everything else.
      const source = mermaidSource.replaceAll(
        MERMAID_NOTE_COLOR,
        token('--mark') || MERMAID_NOTE_COLOR
      )

      try {
        const { svg } = await mermaid.render(`mmd-${renderSeq++}`, source)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (renderError) {
        if (!cancelled) setError(String(renderError))
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [concise])

  if (error) {
    return (
      <div className="font-mono text-meta text-mark">
        Mermaid failed to render: {error}
      </div>
    )
  }

  return <div ref={containerRef} className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full" />
}
