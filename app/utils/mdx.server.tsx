import { bundleMDX } from 'mdx-bundler'
import fs from 'node:fs/promises'
import type * as U from 'unified'
import { mdxCodeFormatter } from '@rowinbot/mdx-code-formatter'
import path from 'node:path'
import type { CachifiedMethodOptions } from './cache.server'
import { cachified, dbCache, defaultStaleWhileRevalidate } from './cache.server'
import { formatStrDate } from './misc'
import { getBlurDataUrlFromPublicImagePath } from './blur.server'

const journalPath = path.join(process.cwd(), 'journal')

const rehypePlugins: U.PluggableList = [mdxCodeFormatter]

async function getJournalEntrySource(slug: string) {
  return await fs.readFile(path.join(journalPath, `${slug}/index.mdx`), 'utf-8')
}

async function readJournalEntriesDir() {
  return await fs.readdir(journalPath)
}

async function bundleJournalEntryMDX(source: string) {
  const { default: rehypeSlug } = await import('rehype-slug')
  const { default: rehypeAutolinkHeadings } = await import(
    'rehype-autolink-headings'
  )

  const mdx = await bundleMDX<JournalEntryMeta>({
    source,
    mdxOptions(options) {
      options.rehypePlugins = [
        rehypeSlug,
        rehypeAutolinkHeadings,
        ...(options.rehypePlugins ?? []),
        ...rehypePlugins,
      ]
      return options
    },
  })

  return {
    ...mdx,
    frontmatter: {
      ...mdx.frontmatter,
      imageBlurData: await getBlurDataUrlFromPublicImagePath(
        mdx.frontmatter.imageSrc
      ),
      formattedDate: formatStrDate(mdx.frontmatter.date),
    } satisfies JournalEntry,
  }
}

export async function getJournalEntryMDXFromSlug(
  slug: string,
  cacheOptions?: CachifiedMethodOptions
) {
  const key = `journal:${slug}/mdx`
  return cachified({
    cache: dbCache,
    ttl: 1000 * 60 * 60 * 24 * 60,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    forceFresh: cacheOptions?.forceRefresh,
    key,
    getFreshValue: async () => {
      return await bundleJournalEntryMDX(await getJournalEntrySource(slug))
    },
  })
}

export async function getJournalEntryFromSlug(
  slug: string,
  cacheOptions?: CachifiedMethodOptions
) {
  const key = `journal:${slug}/entry`
  return cachified({
    cache: dbCache,
    ttl: 1000 * 60 * 60 * 24 * 60,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    forceFresh: cacheOptions?.forceRefresh,
    key,
    getFreshValue: async () => {
      const mdx = await getJournalEntryMDXFromSlug(slug, cacheOptions)

      return {
        id: slug,
        ...mdx.frontmatter,
      }
    },
  })
}

export async function getAllJournalEntries(
  cacheOptions?: CachifiedMethodOptions
) {
  const key = 'journal:mdx-list-items'
  return cachified({
    cache: dbCache,
    ttl: 1000 * 60 * 60 * 24 * 60,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    forceFresh: cacheOptions?.forceRefresh,
    key,
    getFreshValue: async () => {
      const entries = await readJournalEntriesDir()

      return await Promise.all(
        entries.map((entry) => getJournalEntryFromSlug(entry, cacheOptions))
      )
    },
  })
}
