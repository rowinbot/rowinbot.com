import { bundleMDX } from 'mdx-bundler'
import fs from 'node:fs/promises'

async function getJournalEntrySource(slug: string) {
  return await fs.readFile(`./journal/${slug}/index.mdx`, 'utf-8')
}

async function readJournalEntriesDir() {
  return await fs.readdir('./journal')
}

async function bundleJournalEntryMDX(source: string) {
  return await bundleMDX<JournalEntryMeta>({ source })
}

export async function bundleJournalEntryMDXFromSlug(slug: string) {
  return await bundleJournalEntryMDX(await getJournalEntrySource(slug))
}

export async function getAllJournalEntries() {
  const entries = await readJournalEntriesDir()

  return await Promise.all(
    entries.map(async (entry) => {
      const mdx = await bundleJournalEntryMDX(
        await getJournalEntrySource(entry)
      )

      return {
        id: entry,
        title: mdx.frontmatter.title,
        imageSrc: mdx.frontmatter.imageSrc,
        imageAlt: mdx.frontmatter.imageAlt,
      }
    })
  )
}
