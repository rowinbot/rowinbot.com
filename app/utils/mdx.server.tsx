import { bundleMDX } from 'mdx-bundler'
import fs from 'node:fs/promises'
import type * as U from 'unified'
import { mdxCodeFormatter } from '@rowinbot/mdx-code-formatter'
import path from 'node:path'
import type { CachifiedMethodOptions } from './cache.server'
import { cachified, dbCache, defaultStaleWhileRevalidate } from './cache.server'
import { formatStrDate } from './misc'
import { getBlurDataUrlFromPublicImagePath } from './blur.server'
import { getServerEnv } from './env.server'

const contentPath = path.join(process.cwd(), 'content')
const pagesPath = path.join(contentPath, 'pages')
const journalPath = path.join(contentPath, 'journal')

const rehypePlugins: U.PluggableList = [mdxCodeFormatter]

function getContentSource(filePath: string) {
  return fs.readFile(filePath, 'utf-8')
}

function getJournalEntrySource(slug: string) {
  return getContentSource(path.join(journalPath, `${slug}/index.mdx`))
}

function getPageSource(slug: string) {
  return getContentSource(path.join(pagesPath, `${slug}.mdx`))
}

function readJournalEntriesDir() {
  return fs.readdir(journalPath)
}

async function bundleMDXPage(source: string) {
  const { default: rehypeSlug } = await import('rehype-slug')
  const { default: rehypeAutolinkHeadings } = await import(
    'rehype-autolink-headings'
  )

  return bundleMDX<JournalEntryMeta>({
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
      const mdx = await bundleMDXPage(await getJournalEntrySource(slug))

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
    },
  })
}

export async function getPageMDXFromSlug(
  slug: string,
  cacheOptions?: CachifiedMethodOptions
) {
  const key = `page:${slug}/mdx2`
  return cachified({
    cache: dbCache,
    ttl: 1000 * 60 * 60 * 24 * 60,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    forceFresh:
      getServerEnv('NODE_ENV') === 'development' || cacheOptions?.forceRefresh,
    key,
    getFreshValue: async () => {
      return await bundleMDXPage(await getPageSource(slug))
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
    forceFresh:
      getServerEnv('NODE_ENV') === 'development' || cacheOptions?.forceRefresh,
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
