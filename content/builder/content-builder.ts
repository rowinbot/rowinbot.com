import fs from 'fs/promises'
import path from 'path'
import Watcher from 'watcher'
import { bundleMDXFile } from './mdx.ts'
import { parseJournalDate } from '~/utils/misc.ts'

// TODO: Move this to a shared location
export const contentPath = path.join(process.cwd(), 'content')
export const buildContentPath = path.join(contentPath, 'build')

export const pagesPath = path.join(contentPath, 'pages')
export const journalPath = path.join(contentPath, 'journal')
export const journalIndexPath = path.join(
  contentPath,
  'build',
  'journal-index.json'
)

// TODO: Move this to a shared location
export async function getJournalIndexList(): Promise<JournalIndexEntry[]> {
  const content = await fs.readFile(journalIndexPath, 'utf-8')

  return JSON.parse(content) as JournalIndexEntry[]
}

const mdxExt = '.mdx'

const journalIndexMap = new Map<string, JournalEntryMeta>()

function getContentBuildFilePath(filePath: string) {
  const actualFilePathSplit = filePath.split(contentPath)

  if (actualFilePathSplit.length !== 2) {
    throw new Error('Invalid file path')
  }

  return path.join(
    buildContentPath,
    actualFilePathSplit[1].replace(mdxExt, '.json')
  )
}

async function removeContentBuildFile(filePath: string) {
  return fs.unlink(getContentBuildFilePath(filePath))
}

async function recursiveWriteFile(filePath: string, data: string) {
  const dirPath = path.dirname(filePath)

  try {
    await fs.access(dirPath)
  } catch (e) {
    await fs.mkdir(dirPath, { recursive: true })
  }

  return fs.writeFile(filePath, data, {
    encoding: 'utf-8',
  })
}

async function updateJournalContentMap(
  filePath: string,
  meta: JournalEntryMeta
) {
  journalIndexMap.set(filePath, meta)
  const journalIndexArray = Array.from(journalIndexMap.entries()).map(
    ([id, value]) => ({
      id,
      ...value,
    })
  ) satisfies JournalIndexEntry[]

  journalIndexArray.sort(
    (a, b) =>
      parseJournalDate(b.date).getTime() - parseJournalDate(a.date).getTime()
  )

  return recursiveWriteFile(journalIndexPath, JSON.stringify(journalIndexArray))
}

async function updateContentBuildFile(filePath: string) {
  console.log('Updating content build file', filePath)
  const contents = await fs.readFile(filePath, 'utf-8')
  const data = await bundleMDXFile(contents)
  const contentFilePath = getContentBuildFilePath(filePath)

  updateJournalContentMap(filePath, data.frontmatter)
  return recursiveWriteFile(contentFilePath, JSON.stringify(data))
}

async function updateMdxFilesInPath(baseFilePath: string): Promise<void> {
  console.log('Fetching files in', baseFilePath)
  const files = await fs.readdir(baseFilePath)
  const fileStats = files.map(async (filePath) => {
    const fullFilePath = path.join(baseFilePath, filePath)
    return {
      filePath: fullFilePath,
      stat: await fs.stat(fullFilePath),
    }
  })

  for await (const file of fileStats) {
    if (file.stat.isDirectory()) {
      await updateMdxFilesInPath(file.filePath)
    } else if (file.filePath.endsWith(mdxExt)) {
      console.log('Found MDX file, updating content build', file.filePath)
      await updateContentBuildFile(file.filePath)
    }
  }
}

async function updateContentFiles(): Promise<void> {
  await Promise.all([
    updateMdxFilesInPath(pagesPath),
    updateMdxFilesInPath(journalPath),
  ])
}

function setupWatcher() {
  const watcher = new Watcher(
    [pagesPath, journalPath],
    { renameDetection: true, recursive: true },
    async (event, targetPath, targetPathNext) => {
      // console.log('Watcher event:', event, targetPath, targetPathNext)

      const isOrWasMdxFile = targetPath.endsWith(mdxExt)
      const nextMdxFile =
        targetPathNext !== undefined ? targetPathNext.endsWith(mdxExt) : false

      try {
        if (isOrWasMdxFile && (event === 'add' || event === 'change')) {
          updateContentBuildFile(targetPath)
        } else if (isOrWasMdxFile && event === 'unlink') {
          removeContentBuildFile(targetPath)
        } else if (event === 'rename' && targetPathNext !== undefined) {
          if (isOrWasMdxFile) removeContentBuildFile(targetPath)
          if (nextMdxFile) updateContentBuildFile(targetPathNext)
        }
      } catch (e) {
        console.error(e)
      }
    }
  )

  return watcher
}

async function main() {
  console.log('Updating content files...')
  try {
    await updateContentFiles()

    console.log('Watching content files...')
    setupWatcher()
  } catch (e) {
    console.error(e)
  }
}

main()
