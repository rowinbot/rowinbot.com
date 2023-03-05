import rangeParser from 'parse-numeric-range'
import type { Tinypool as TinypoolType } from 'tinypool'
import type { Plugin } from 'unified'
import type * as H from 'hast'
import type { HighlightWorkerReturn } from './worker'

const isArrayOfStrings = (value: unknown): value is Array<string> =>
  Array.isArray(value) && value.every((v) => typeof v === 'string')

let tokenizePool: TinypoolType

export const remarkCodeBlocksShiki: Plugin<
  [{}?] | Array<void>,
  H.Root,
  H.Root
> = () => {
  return async function transformer(tree) {
    const [{ visit, SKIP }, { htmlEscape }, { Tinypool }] = await Promise.all([
      import('unist-util-visit'),
      import('escape-goat'),
      import('tinypool'),
    ])
    // using TinyThread because shiki has some gnarly memory leaks
    // so we stick it in a worker to keep it isolated
    // and configure it so it will be destroyed if it remains unused for a while

    tokenizePool =
      tokenizePool ||
      new Tinypool({
        filename: require.resolve(
          '@rowinbot/mdx-code-formatter/dist/worker.js'
        ),
        minThreads: 0,
        idleTimeout: 60,
      })

    type PreNodeInfo = {
      preNode: H.Element
      codeString: string
      language: string
      meta: any
    }
    const nodesToTokenize: PreNodeInfo[] = []

    visit(tree, 'element', (preNode) => {
      if (preNode.tagName !== 'pre' || !preNode.children) {
        return
      }
      const codeNode = preNode.children[0]
      if (
        !codeNode ||
        codeNode.type !== 'element' ||
        codeNode.tagName !== 'code'
      ) {
        return
      }
      const meta = codeNode.data?.meta ?? ''
      if (typeof meta !== 'string') return
      const className = codeNode.properties?.className
      if (!isArrayOfStrings(className)) return
      const language =
        className
          .find((c) => c.startsWith('language-'))
          ?.slice('language-'.length) ?? 'txt'
      if (codeNode.children.length > 1) {
        console.warn(
          `@kentcdodds/md-temp - Unexpected: ${codeNode.children.length} children`
        )
        return
      }
      const [firstChild] = codeNode.children
      if (firstChild.type !== 'text') {
        console.warn(
          `@kentcdodds/md-temp - Unexpected: firstChild type is not "text": ${firstChild.type}`
        )
        return
      }
      const codeString = firstChild.value.trimEnd()

      nodesToTokenize.push({ preNode, codeString, language, meta })
      return SKIP
    })

    for (const nodeStuff of nodesToTokenize) {
      const { preNode, codeString, language, meta } = nodeStuff
      let metaParams = new URLSearchParams()
      if (meta) {
        metaParams = new URLSearchParams(meta.split(/\s+/).join('&'))
      }

      // TODO: review this (?? '') because URLSearchParams entries might be null and we're not handling that

      const addedLines = parseLineRange(metaParams.get('add') ?? '')
      const removedLines = parseLineRange(metaParams.get('remove') ?? '')
      const highlightLines = parseLineRange(metaParams.get('lines') ?? '')

      const startValNum = metaParams.has('start')
        ? Number(metaParams.get('start'))
        : 1
      const startingLineNumber = Number.isFinite(startValNum) ? startValNum : 1
      const numbers = !metaParams.has('nonumber')
      const { tokens, fgColor, bgColor } = (await tokenizePool.run({
        code: codeString,
        language,
      })) as HighlightWorkerReturn
      const isDiff = addedLines.length > 0 || removedLines.length > 0
      let diffLineNumber = startingLineNumber - 1
      const children = tokens.map((lineTokens, zeroBasedLineNumber) => {
        const children = lineTokens.map((token) => {
          const color = convertFakeHexToCustomProp(token.color || '')
          const content = {
            type: 'text',
            // Do not escape the _actual_ content
            value: token.content,
          }
          return color && color !== fgColor
            ? {
                type: 'element',
                tagName: 'span',
                properties: {
                  style: `color: ${htmlEscape(color)}`,
                },
                children: [content],
              }
            : content
        })
        children.push({
          type: 'text',
          value: '\n',
        })
        const lineNumber = zeroBasedLineNumber + startingLineNumber
        const highlightLine = highlightLines.includes(lineNumber)
        const removeLine = removedLines.includes(lineNumber)
        const addLine = addedLines.includes(lineNumber)
        if (!removeLine) {
          diffLineNumber++
        }
        return {
          type: 'element',
          tagName: 'span',
          properties: {
            className: 'codeblock-line',
            dataHighlight: highlightLine ? 'true' : undefined,
            dataLineNumber: numbers ? lineNumber : undefined,
            dataAdd: isDiff ? addLine : undefined,
            dataRemove: isDiff ? removeLine : undefined,
            dataDiffLineNumber: isDiff ? diffLineNumber : undefined,
          },
          children,
        }
      })
      const metaProps: Record<string, string> = {}
      metaParams.forEach((val, key) => {
        if (key === 'lines') return
        metaProps[`data-${key}`] = val
      })
      Object.assign(preNode, {
        type: 'element',
        tagName: 'pre',
        properties: {
          ...metaProps,
          dataLineNumbers: numbers ? 'true' : 'false',
          // Make pre focusable so that it can be scrolled with the keyboard
          tabIndex: '0',
          dataLang: htmlEscape(language),
          style: `color: ${htmlEscape(fgColor)};background-color: ${htmlEscape(
            bgColor
          )}`,
        },
        children: [
          {
            type: 'element',
            tagName: 'code',
            children,
          },
        ],
      })
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
const parseLineRange = (param: string) => {
  if (!param) return []
  return rangeParser(param)
}
// The theme actually stores #FFFF${base-16-color-id} because vscode-textmate
// requires colors to be valid hex codes, if they aren't, it changes them to a
// default, so this is a mega hack to trick it.
function convertFakeHexToCustomProp(color: string) {
  return color.replace(/^#FFFF(.+)/, 'var(--base$1)')
}
