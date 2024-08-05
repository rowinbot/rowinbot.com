import fs from 'node:fs/promises'
import path from 'node:path'
import { formatDate, parseJournalDate } from './misc'
import {
  getBlurDataUrlFromImagePath,
  getPathFromProjectRoot,
} from './blur.server'
import type { BundledMdxFile } from 'content/builder/mdx'
import { getJournalIndexList } from 'content/builder/content-builder'

const contentPath = path.join(process.cwd(), 'content/build')
const pagesPath = path.join(contentPath, 'pages')
const journalPath = path.join(contentPath, 'journal')

function getContentSource(filePath: string) {
  return fs.readFile(filePath, 'utf-8')
}

async function getJournalEntryMdxJson(slug: string) {
  const content = await getContentSource(
    path.join(journalPath, `${slug}/index.json`)
  )

  return JSON.parse(content) as BundledMdxFile<JournalEntryMeta>
}

async function getPageMdxJson(slug: string) {
  const content = await getContentSource(path.join(pagesPath, `${slug}.json`))

  return JSON.parse(content) as BundledMdxFile<JournalEntryMeta>
}

export async function getJournalEntryMDXFromSlug(slug: string) {
  const mdx = await getJournalEntryMdxJson(slug)

  let imageSrc
  let imageBlurData

  if (mdx.frontmatter.imageSrc) {
    const imageSrcLocalPath = getPathFromProjectRoot(
      'content',
      'journal',
      slug,
      mdx.frontmatter.imageSrc
    )

    imageSrc = path.join(`/public/journal/${slug}/${mdx.frontmatter.imageSrc}`)
    imageBlurData = await getBlurDataUrlFromImagePath(imageSrcLocalPath)
  }

  return {
    ...mdx,
    frontmatter: {
      ...mdx.frontmatter,
      imageSrc,
      imageBlurData,
      formattedDate: formatDate(parseJournalDate(mdx.frontmatter.date)),
    } satisfies JournalEntry,
  }
}

export async function getPageMDXFromSlug(slug: string) {
  return await getPageMdxJson(slug)
}

export async function getJournalEntryFromSlug(slug: string) {
  const mdx = await getJournalEntryMDXFromSlug(slug)

  return {
    id: slug,
    ...mdx.frontmatter,
  }
}

export async function getAllJournalEntries() {
  const entries = await getJournalIndexList()

  return entries
}
