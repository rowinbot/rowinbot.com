import fs from 'node:fs/promises'
import path from 'node:path'
import type { BundledMdxFile } from 'content/builder/mdx'
import {
  getJournalIndexList,
  journalBuildPath,
  pagesBuildPath,
} from 'content/builder/content-utils'

function getContentSource(filePath: string) {
  return fs.readFile(filePath, 'utf-8')
}

async function getJournalEntryMdxJson(slug: string) {
  const content = await getContentSource(
    path.join(journalBuildPath, `${slug}/index.json`)
  )

  return JSON.parse(content) as BundledMdxFile<JournalEntryMeta>
}

async function getPageMdxJson(slug: string) {
  const content = await getContentSource(
    path.join(pagesBuildPath, `${slug}.json`)
  )

  return JSON.parse(content) as BundledMdxFile<JournalEntryMeta>
}

export async function getJournalEntryMDXFromSlug(slug: string) {
  const mdx = await getJournalEntryMdxJson(slug)

  return {
    ...mdx,
    frontmatter: {
      ...mdx.frontmatter,
    } satisfies JournalEntryMeta,
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
