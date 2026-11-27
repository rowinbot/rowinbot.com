import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
)
const scanRoots = ['app', 'content/builder']
const skippedDirectories = new Set(['node_modules', 'build', '.react-router'])
const scriptExtensions = new Set(['.ts', '.tsx'])
const sourceExtensions = new Set(['.css', ...scriptExtensions])

const allowlist = [
  {
    rule: 'motion-scale-zero',
    file: 'app/components/theme/sun-moon-icon.tsx',
    lineIncludes: 'transition-transform duration-300 dark:scale-0',
    reason:
      'The sun rays are 4-unit SVG rects that shrink to nothing while the sun turns into the moon. It is a state change inside the toggle icon, not an entrance, and the toggle visual is fixed.',
  },
]

function blankRange(text, start, end) {
  return (
    text.slice(0, start) +
    text.slice(start, end).replace(/[^\n]/g, ' ') +
    text.slice(end)
  )
}

function blankSpans(text, spans) {
  return spans.reduce(
    (result, span) => blankRange(result, span.start, span.end),
    text
  )
}

function blankCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(/[^\n]/g, ' ')
  )
}

function scanScript(text) {
  const spans = []
  const length = text.length
  const regexPrecedents = new Set([
    '(',
    ',',
    '=',
    ':',
    '[',
    '!',
    '&',
    '|',
    '?',
    '{',
    ';',
  ])
  let lastSignificant = ''

  function lineEnd(index) {
    const newline = text.indexOf('\n', index)
    return newline === -1 ? length : newline
  }

  function scanQuoted(start) {
    const quote = text[start]
    let index = start + 1
    while (index < length && text[index] !== quote && text[index] !== '\n') {
      if (text[index] === '\\') index++
      index++
    }
    spans.push({ kind: 'string', start: start + 1, end: index })
    return text[index] === quote ? index + 1 : index
  }

  function scanRegex(start) {
    let index = start + 1
    let inClass = false
    while (index < length) {
      const char = text[index]
      if (char === '\n') return -1
      if (char === '\\') {
        index += 2
        continue
      }
      if (char === '[') inClass = true
      if (char === ']') inClass = false
      if (char === '/' && !inClass) {
        index++
        while (/[a-z]/i.test(text[index] ?? '')) index++
        return index
      }
      index++
    }
    return -1
  }

  function scanTemplate(start) {
    let index = start + 1
    let segmentStart = index
    while (index < length) {
      const char = text[index]
      if (char === '\\') {
        index += 2
      } else if (char === '`') {
        spans.push({ kind: 'string', start: segmentStart, end: index })
        return index + 1
      } else if (char === '$' && text[index + 1] === '{') {
        spans.push({ kind: 'string', start: segmentStart, end: index })
        index = scanCode(index + 2, true) + 1
        segmentStart = index
      } else {
        index++
      }
    }
    spans.push({ kind: 'string', start: segmentStart, end: length })
    return length
  }

  function scanCode(start, insideTemplateExpression) {
    let index = start
    let depth = 0
    while (index < length) {
      const char = text[index]
      const next = text[index + 1]
      if (char === '/' && next === '/') {
        const end = lineEnd(index)
        spans.push({ kind: 'comment', start: index, end })
        index = end
        continue
      }
      if (char === '/' && next === '*') {
        const close = text.indexOf('*/', index + 2)
        const end = close === -1 ? length : close + 2
        spans.push({ kind: 'comment', start: index, end })
        index = end
        continue
      }
      if (char === '"' || char === "'") {
        index = scanQuoted(index)
        lastSignificant = char
        continue
      }
      if (char === '`') {
        index = scanTemplate(index)
        lastSignificant = char
        continue
      }
      if (
        char === '/' &&
        (lastSignificant === '' || regexPrecedents.has(lastSignificant))
      ) {
        const end = scanRegex(index)
        if (end !== -1) {
          spans.push({ kind: 'regex', start: index, end })
          index = end
          lastSignificant = '/'
          continue
        }
      }
      if (insideTemplateExpression) {
        if (char === '{') depth++
        if (char === '}') {
          if (depth === 0) return index
          depth--
        }
      }
      if (!/\s/.test(char)) lastSignificant = char
      index++
    }
    return index
  }

  scanCode(0, false)
  return spans
}

function analyze(extension, source, file) {
  if (extension === '.css') {
    return {
      extension,
      file,
      source,
      code: blankCssComments(source),
      strings: [],
    }
  }
  const spans = scanScript(source)
  const comments = spans.filter((span) => span.kind === 'comment')
  const strings = spans.filter((span) => span.kind === 'string')
  const code = blankSpans(source, comments)
  const markup = blankSpans(source, spans)
  return { extension, file, source, code, strings, markup }
}

function matchesOf(pattern, text) {
  return [...text.matchAll(pattern)].map((match) => ({
    offset: match.index,
    match: match[0],
  }))
}

const scaleZeroPatterns = [
  /(?<![\w-])scale(?:3d|X|Y|Z)?\(\s*0(?:\.0+)?\s*[,)]/g,
  /(?<![\w-])scale[XYZ]?\s*:\s*0(?:\.0+)?(?![\d.])/g,
  /(?<![\w-])scale-(?:x-|y-)?0(?![\w.-])/g,
]

function checkMotionScaleZero({ code }) {
  return scaleZeroPatterns
    .flatMap((pattern) => matchesOf(pattern, code))
    .map(({ offset, match }) => ({
      offset,
      message: `"${match}" starts an animation from nothing. Begin at 0.95 or higher with opacity, or without scale.`,
    }))
}

const cssOutlineRemoval =
  /(?<![\w-])outline(?:-style|-width)?\s*:\s*(?:none|0(?:px)?)(?![\w.-])/g
const scriptOutlineRemoval =
  /(?<![\w-])outline\s*:\s*['"]?(?:none|0)(?![\w.-])/g
const tailwindOutlineRemoval = /(?<![\w-])outline-(?:none|0|hidden)(?![\w-])/g
const tailwindFocusReplacement =
  /focus-visible:(?!outline-(?:none|0|hidden)(?![\w-]))\S/
const programmaticFocusSelector = /\[tabindex=["']?-1["']?\]/

function enclosingCssRule(css, offset) {
  let depth = 0
  let open = -1
  for (let index = offset - 1; index >= 0; index--) {
    if (css[index] === '}') depth++
    if (css[index] === '{') {
      if (depth === 0) {
        open = index
        break
      }
      depth--
    }
  }
  if (open === -1) return { selector: '', body: '' }

  const selectorStart =
    Math.max(
      css.lastIndexOf('}', open),
      css.lastIndexOf('{', open - 1),
      css.lastIndexOf(';', open)
    ) + 1
  let close = open + 1
  let nesting = 1
  while (close < css.length && nesting > 0) {
    if (css[close] === '{') nesting++
    if (css[close] === '}') nesting--
    close++
  }
  return {
    selector: css.slice(selectorStart, open),
    body: css.slice(open + 1, close - 1),
  }
}

function cssRuleKeepsFocusIndicator({ selector, body }) {
  if (programmaticFocusSelector.test(selector)) return true
  if (selector.includes('focus-visible')) {
    return /box-shadow|border|background/.test(body)
  }
  return body.includes('focus-visible')
}

function checkFocusOutlineNone({ extension, code, strings }) {
  const message =
    'Outline removed without a :focus-visible replacement in the same rule or className string.'

  if (extension === '.css') {
    return matchesOf(cssOutlineRemoval, code)
      .filter(
        ({ offset }) =>
          !cssRuleKeepsFocusIndicator(enclosingCssRule(code, offset))
      )
      .map(({ offset }) => ({ offset, message }))
  }

  const classFindings = matchesOf(tailwindOutlineRemoval, code)
    .filter(({ offset }) => {
      const enclosing = strings.find(
        (span) => offset >= span.start && offset < span.end
      )
      if (!enclosing) return true
      return !tailwindFocusReplacement.test(
        code.slice(enclosing.start, enclosing.end)
      )
    })
    .map(({ offset }) => ({ offset, message }))
  const styleFindings = matchesOf(scriptOutlineRemoval, code).map(
    ({ offset }) => ({ offset, message })
  )
  return [...classFindings, ...styleFindings]
}

const viewportZoomLockPatterns = [
  /user-scalable\s*=\s*(?:no|0|false)(?![\w-])/gi,
  /maximum-scale\s*=/gi,
  /(?<![\w-])userScalable\s*:\s*(?:false|0|['"]no['"])/g,
  /(?<![\w-])maximumScale\s*:/g,
]

function checkViewportZoomLock({ extension, code }) {
  if (!scriptExtensions.has(extension)) return []
  return viewportZoomLockPatterns
    .flatMap((pattern) => matchesOf(pattern, code))
    .map(({ offset, match }) => ({
      offset,
      message: `"${match.trim()}" locks pinch zoom. The viewport must stay zoomable.`,
    }))
}

const jsxTextPattern = /(?<!=)>([^<>{}]+)</g
const spreadPrecedents = new Set(['(', ',', '[', '{', '='])

const buildLogDirectory = 'content/builder/'

function checkEllipsis({ extension, file, code, strings, markup }) {
  if (!scriptExtensions.has(extension)) return []
  if (file.startsWith(buildLogDirectory) && extension === '.ts') return []
  const message = 'Use the single character "…" instead of three dots.'
  const findings = new Map()

  for (const span of strings) {
    for (const { offset } of matchesOf(
      /\.\.\./g,
      code.slice(span.start, span.end)
    )) {
      findings.set(span.start + offset, {
        offset: span.start + offset,
        message,
      })
    }
  }

  if (extension === '.tsx') {
    for (const textMatch of markup.matchAll(jsxTextPattern)) {
      const textStart = textMatch.index + 1
      for (const { offset } of matchesOf(/\.\.\./g, textMatch[1])) {
        const before = textMatch[1].slice(0, offset).trimEnd().slice(-1)
        if (spreadPrecedents.has(before)) continue
        findings.set(textStart + offset, {
          offset: textStart + offset,
          message,
        })
      }
    }
  }

  return [...findings.values()]
}

const dashPattern = /[\u2013\u2014]/g
const dashScopeDirectory = 'app/'
const dashNames = { '\u2013': 'en dash', '\u2014': 'em dash' }

function checkEmDash({ file, source }) {
  if (!file.startsWith(dashScopeDirectory)) return []
  return matchesOf(dashPattern, source).map(({ offset, match }) => ({
    offset,
    message: `The ${dashNames[match]} is banned in app/. Use a comma, a full stop, a colon, or a spaced hyphen for a label or range.`,
  }))
}

const rules = [
  { id: 'motion-scale-zero', check: checkMotionScaleZero },
  { id: 'focus-outline-none', check: checkFocusOutlineNone },
  { id: 'viewport-zoom-lock', check: checkViewportZoomLock },
  { id: 'ellipsis', check: checkEllipsis },
  { id: 'em-dash', check: checkEmDash },
]

function findViolations(extension, source, file = 'app/self-test') {
  const context = analyze(extension, source, file)
  return rules.flatMap((rule) =>
    rule
      .check(context)
      .map((finding) => ({ ...finding, rule: rule.id }))
      .sort((a, b) => a.offset - b.offset)
  )
}

function locate(source, offset) {
  const before = source.slice(0, offset)
  const line = before.split('\n').length
  const column = offset - before.lastIndexOf('\n')
  const lineText = source.split('\n')[line - 1]
  return { line, column, lineText }
}

function isAllowlisted(entry, violation, file, lineText) {
  return (
    entry.rule === violation.rule &&
    entry.file === file &&
    lineText.includes(entry.lineIncludes)
  )
}

const selfTestCases = [
  {
    rule: 'motion-scale-zero',
    extension: '.css',
    bad: '.a { transform: scale(0); }',
    good: '.a { transform: scale(0.95); opacity: 0; }',
  },
  {
    rule: 'motion-scale-zero',
    extension: '.tsx',
    bad: "const v = { initial: { scale: 0, opacity: 0 } }\nconst c = 'transition dark:scale-0'",
    good: "const v = { initial: { scale: 0.95 } }\nconst c = 'hover:scale-105 scale-x-100'",
  },
  {
    rule: 'motion-scale-zero',
    extension: '.tsx',
    bad: "const c = 'origin-center scale-y-0'",
    good: '// scale(0) is documented here\nconst c = 1',
  },
  {
    rule: 'focus-outline-none',
    extension: '.css',
    bad: 'button:focus { outline: none; }',
    good: 'button:focus-visible { outline: 2px solid red; }\n[tabindex="-1"]:focus { outline: none; }\nbutton { outline: 0; &:focus-visible { outline: 2px solid red; } }',
  },
  {
    rule: 'focus-outline-none',
    extension: '.css',
    bad: 'button:focus-visible { outline: none; }',
    good: 'button:focus-visible { outline: none; box-shadow: 0 0 0 2px red; }',
  },
  {
    rule: 'focus-outline-none',
    extension: '.tsx',
    bad: 'const c = "outline-none focus-visible:outline-none"',
    good: 'const c = "outline-none focus-visible:ring-2"\nconst d = "focus-visible:outline-2"',
  },
  {
    rule: 'viewport-zoom-lock',
    extension: '.tsx',
    bad: '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />',
    good: '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />',
  },
  {
    rule: 'viewport-zoom-lock',
    extension: '.ts',
    bad: "const v = 'width=device-width, user-scalable=no'",
    good: "const v = 'width=device-width, user-scalable=yes'",
  },
  {
    rule: 'ellipsis',
    extension: '.tsx',
    bad: "const label = 'Loading...'",
    good: "const label = 'Loading…'\nconst copy = [...items, ...more]\n// Loading...\nfn(...args)\nconst url = 'https://example.com'\nconst r = /a.../",
  },
  {
    rule: 'ellipsis',
    extension: '.tsx',
    bad: 'const view = <p>Loading...</p>',
    good: 'const view = <Row {...props}><p>Loading…</p></Row>',
  },
  {
    rule: 'ellipsis',
    extension: '.ts',
    bad: 'const note = `wait${n}...`',
    good: "const url = 'https://example.com'\nconst after = 'done…'\nfunction f(...rest: string[]) {}",
  },
  {
    rule: 'em-dash',
    extension: '.tsx',
    bad: "const title = 'Rowin Hernandez \u2014 Product engineer'",
    good: "const title = 'Rowin Hernandez - Product engineer'\nconst copy = 'let go, which can be a sword'",
  },
  {
    rule: 'em-dash',
    extension: '.tsx',
    bad: 'const view = <p>Margin note \u2014 read this</p>',
    good: 'const view = <p>Margin note: read this</p>',
  },
  {
    rule: 'em-dash',
    extension: '.ts',
    bad: 'const years = `${min} \u2013 ${max}`',
    good: 'const years = `${min} - ${max}`',
  },
  {
    rule: 'em-dash',
    extension: '.css',
    bad: '/* palette \u2014 notebook */\n.a { color: red; }',
    good: '/* palette: notebook */\n.a { color: red; }',
  },
]

function runSelfTest() {
  const failures = []
  for (const testCase of selfTestCases) {
    const badRules = findViolations(testCase.extension, testCase.bad).map(
      (violation) => violation.rule
    )
    const goodRules = findViolations(testCase.extension, testCase.good).map(
      (violation) => violation.rule
    )
    if (!badRules.includes(testCase.rule)) {
      failures.push(`${testCase.rule}: missed a violation in ${testCase.bad}`)
    }
    if (goodRules.includes(testCase.rule)) {
      failures.push(
        `${testCase.rule}: flagged a clean snippet ${testCase.good}`
      )
    }
  }

  const sample = "const c = 'transition dark:scale-0'"
  const [violation] = findViolations('.tsx', sample)
  const entry = {
    rule: 'motion-scale-zero',
    file: 'a.tsx',
    lineIncludes: 'dark:scale-0',
  }
  const { lineText } = locate(sample, violation.offset)
  if (!isAllowlisted(entry, violation, 'a.tsx', lineText)) {
    failures.push('allowlist: an exact entry did not match')
  }
  if (isAllowlisted(entry, violation, 'b.tsx', lineText)) {
    failures.push('allowlist: an entry matched a different file')
  }

  return failures
}

function collectSourceFiles(directory) {
  return readdirSync(path.join(repositoryRoot, directory), {
    withFileTypes: true,
  }).flatMap((entry) => {
    const relative = path.posix.join(directory, entry.name)
    if (entry.isDirectory()) {
      return skippedDirectories.has(entry.name)
        ? []
        : collectSourceFiles(relative)
    }
    return sourceExtensions.has(path.extname(entry.name)) ? [relative] : []
  })
}

function reportAndExit(lines, code) {
  process.stderr.write(`${lines.join('\n')}\n`)
  process.exit(code)
}

const selfTestFailures = runSelfTest()
if (selfTestFailures.length > 0) {
  reportAndExit(['check-ui-rules self-test failed', ...selfTestFailures], 1)
}
if (process.argv.includes('--self-test')) {
  process.stdout.write(
    `check-ui-rules self-test ok (${selfTestCases.length} cases)\n`
  )
  process.exit(0)
}

const files = scanRoots.flatMap(collectSourceFiles).sort()
const usedAllowlistEntries = new Set()
const reports = []

for (const file of files) {
  const source = readFileSync(path.join(repositoryRoot, file), 'utf8')
  for (const violation of findViolations(path.extname(file), source, file)) {
    const { line, column, lineText } = locate(source, violation.offset)
    const entry = allowlist.find((candidate) =>
      isAllowlisted(candidate, violation, file, lineText)
    )
    if (entry) {
      usedAllowlistEntries.add(entry)
      continue
    }
    reports.push(
      `${file}:${line}:${column}  ${violation.rule}  ${violation.message}`
    )
  }
}

for (const entry of allowlist) {
  if (!usedAllowlistEntries.has(entry)) {
    reports.push(
      `${entry.file}  ${entry.rule}  allowlist entry matches nothing, remove it`
    )
  }
}

if (reports.length > 0) {
  reportAndExit([...reports, `check-ui-rules: ${reports.length} problem(s)`], 1)
}

process.stdout.write(
  `check-ui-rules ok (${files.length} files, ${rules.length} rules)\n`
)
