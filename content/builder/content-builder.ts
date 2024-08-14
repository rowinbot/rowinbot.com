import fs from 'fs/promises'
import path from 'path'
import Watcher from 'watcher'
import { bundleMDXFile } from './mdx.ts'

import {
  buildContentPath,
  contentHashesIndexPath,
  contentPath,
  getContentHash,
  journalIndexPath,
  journalPath,
  pagesPath,
  parseJournalDate,
  isEnoentError,
  getContentHashKey,
} from './content-utils.ts'
import { getBlurDataUrlFromImagePath } from './image-blur.ts'

const mdxExt = '.mdx'

const contentIndexMap = new Map<string, JournalEntryMeta>()
const contentHashesIndexMap = new Map<string, string>()

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

function getJournalEntrySlug(filePath: string) {
  const actualFilePathSplit = filePath.split(journalPath)

  if (actualFilePathSplit.length !== 2) {
    throw new Error('Invalid file path')
  }

  const journalEntryName =
    actualFilePathSplit.at(1)?.split(path.sep).at(1) ?? null

  if (journalEntryName === null) {
    throw new Error('Invalid file path')
  }

  return journalEntryName ?? filePath
}

async function updateJournalContentMap(
  filePath: string,
  meta: JournalEntryMeta
) {
  contentIndexMap.set(getJournalEntrySlug(filePath), meta)
  const contentIndexArray = Array.from(contentIndexMap.entries()).map(
    ([id, value]) => ({
      id,
      ...value,
      formattedDate: value.date,
      sortDate: parseJournalDate(value.date).getTime(),
    })
  ) satisfies JournalIndexEntry[]

  contentIndexArray.sort((a, b) => b.sortDate - a.sortDate)

  return recursiveWriteFile(journalIndexPath, JSON.stringify(contentIndexArray))
}

async function loadInitialContentHashesMap() {
  try {
    const contentHashesIndex = await fs.readFile(
      contentHashesIndexPath,
      'utf-8'
    )
    const contentHashesIndexArray = JSON.parse(contentHashesIndex) as Record<
      string,
      string
    >

    for (const [key, hash] of Object.entries(contentHashesIndexArray)) {
      contentHashesIndexMap.set(key, hash)
    }

    console.log('[Load] Hashes index map')
  } catch (e) {
    if (isEnoentError(e)) {
      console.info(
        '[Load] No hashes index file found, will create a new one once content is updated'
      )
    } else {
      console.error('[Load] Failed to load hashes index map', e)
    }
  }
}

async function loadInitialContentMap() {
  try {
    const contentIndex = await fs.readFile(journalIndexPath, 'utf-8')
    const contentIndexArray = JSON.parse(contentIndex) as Record<
      string,
      JournalEntryMeta
    >

    for (const [key, value] of Object.entries(contentIndexArray)) {
      contentIndexMap.set(key, value)
    }

    console.log('[Load] Loaded content index map')
  } catch (e) {
    if (isEnoentError(e)) {
      console.info(
        '[Load] No content index map found, will create a new one once content is updated'
      )
    } else {
      console.error('[Load] Failed to load content index map', e)
    }
  }
}

async function loadInitialIndexesData() {
  console.log('[Load] Loading initial indexes data...')
  await Promise.all([loadInitialContentHashesMap(), loadInitialContentMap()])

  console.log('[Load] Finished loading initial indexes data')
}

async function updateContentIndexHash(key: string, hash: string) {
  contentHashesIndexMap.set(key, hash)
  return recursiveWriteFile(
    contentHashesIndexPath,
    JSON.stringify(Object.fromEntries(contentHashesIndexMap))
  )
}

async function updateContentBuildFile(filePath: string) {
  const contents = await fs.readFile(filePath, 'utf-8')
  const hash = getContentHash(contents)
  const hashKey = getContentHashKey(filePath)

  if (contentHashesIndexMap.get(hashKey) === hash) {
    return
  } else {
    updateContentIndexHash(hashKey, hash)
  }

  console.log('[MDX] Updating', filePath)
  const data = await bundleMDXFile(contents)
  const contentFilePath = getContentBuildFilePath(filePath)

  const isJournal = filePath.startsWith(journalPath)
  if (isJournal) {
    if (data.frontmatter.imageSrc) {
      const imageBlur = await getBlurDataUrlFromImagePath(
        path.join(path.dirname(filePath), data.frontmatter.imageSrc)
      )

      data.frontmatter.imageBlurUri = imageBlur
      data.frontmatter.imageSrc = path.join(
        path.sep,
        'journal',
        getJournalEntrySlug(filePath),
        data.frontmatter.imageSrc
      )
    }

    updateJournalContentMap(filePath, data.frontmatter)
  }

  return recursiveWriteFile(contentFilePath, JSON.stringify({ ...data }))
}

async function updateMdxFilesInPath(baseFilePath: string): Promise<void> {
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
      console.log('[MDX] Tracking', file.filePath)
      await updateContentBuildFile(file.filePath)
    }
  }
}

async function updateContentFiles(): Promise<void> {
  await loadInitialIndexesData()

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
