import path from 'path'
import type { Highlighter, IShikiTheme } from 'shiki'
import { getHighlighter, loadTheme } from 'shiki'

const themeName = 'base16'
let theme: IShikiTheme
let highlighter: Highlighter

export default async function highlight({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  theme = theme || (await loadTheme(path.resolve(__dirname, 'base16.json')))
  highlighter = highlighter || (await getHighlighter({ themes: [theme] }))
  const fgColor = convertFakeHexToCustomProp(
    highlighter.getForegroundColor(themeName) || ''
  )
  const bgColor = convertFakeHexToCustomProp(
    highlighter.getBackgroundColor(themeName) || ''
  )

  const tokens = highlighter.codeToThemedTokens(code, language, themeName)
  return {
    fgColor,
    bgColor,
    tokens: tokens.map((lineTokens) =>
      lineTokens.map((t) => ({ content: t.content, color: t.color }))
    ),
  }
}

export type HighlightWorkerReturn = Awaited<ReturnType<typeof highlight>>

// The theme actually stores #FFFF${base-16-color-id} because vscode-textmate
// requires colors to be valid hex codes, if they aren't, it changes them to a
// default, so this is a mega hack to trick it.
function convertFakeHexToCustomProp(color: string) {
  return color.replace(/^#FFFF(.+)/, 'var(--base$1)')
}
