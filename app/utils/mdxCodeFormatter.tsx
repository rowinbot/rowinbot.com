// const remarkCodeBlocksShiki: import('unified').Plugin = () => {
//   return async function transformer(tree) {
//     // The path is relative to the dist dir where themes will be put in a themes folder
//     const oneDark = await loadTheme(
//       Path.resolve(__dirname, './themes/OneDark.json')
//     )
//     const highlighter = await getHighlighter({
//       themes: [...BUNDLED_THEMES, oneDark],
//     })
//     const themeOptionRx = /^theme:(.+)$/

//     visit(tree, 'code', (node) => {
//       if (!node.lang || !node.value) {
//         return
//       }

//       const meta = Array.isArray(node.meta)
//         ? node.meta
//         : node.meta
//         ? [node.meta]
//         : []
//       const defaultTheme: string = 'One Dark Pro'
//       let requestedTheme: string = defaultTheme

//       for (const entry of meta) {
//         const matches = entry.match(themeOptionRx)

//         if (matches) {
//           requestedTheme = matches[1]
//         }
//       }

//       const cacheKey = JSON.stringify([requestedTheme, node.lang, node.value])
//       let nodeValue = cache.get(cacheKey)

//       if (!nodeValue) {
//         const fgColor = highlighter
//           .getForegroundColor(requestedTheme)
//           .toUpperCase()
//         const bgColor = highlighter
//           .getBackgroundColor(requestedTheme)
//           .toUpperCase()
//         const tokens = highlighter.codeToThemedTokens(
//           node.value as string,
//           node.lang as string,
//           requestedTheme
//         )
//         const children = tokens.map(
//           (lineTokens, zeroBasedLineNumber): Element => {
//             const children = lineTokens.map((token): Text | Element => {
//               const color = token.color
//               const content: Text = {
//                 type: 'text',
//                 // Do not escape the _actual_ content
//                 value: token.content,
//               }

//               return color && color !== fgColor
//                 ? {
//                     type: 'element',
//                     tagName: 'span',
//                     properties: {
//                       style: `color: ${htmlEscape(color)}`,
//                     },
//                     children: [content],
//                   }
//                 : content
//             })

//             children.push({
//               type: 'text',
//               value: '\n',
//             })

//             return {
//               type: 'element',
//               tagName: 'span',
//               properties: {
//                 className: 'codeblock-line',
//                 dataLineNumber: zeroBasedLineNumber + 1,
//               },
//               children,
//             }
//           }
//         )

//         nodeValue = {
//           type: 'element',
//           tagName: 'pre',
//           properties: {
//             dataLang: htmlEscape(node.lang as string),
//             style: `color: ${htmlEscape(
//               fgColor
//             )};background-color: ${htmlEscape(bgColor)}`,
//           },
//           children: [
//             {
//               type: 'element',
//               tagName: 'code',
//               children,
//             },
//           ],
//         }

//         cache.set(cacheKey, nodeValue)
//       }

//       const data = node.data ?? (node.data = {})

//       node.type = 'element'
//       data.hProperties ??= {}
//       data.hChildren = [nodeValue]

//       return SKIP
//     })
//   }
// }
