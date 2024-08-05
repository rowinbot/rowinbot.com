import { bundleMDX } from 'mdx-bundler'
import type * as U from 'unified'
import { mdxCodeFormatter } from '@rowinbot/mdx-code-formatter'
import type * as esbuild from 'esbuild'
import type grayMatter from 'gray-matter'

const rehypePlugins: U.PluggableList = [mdxCodeFormatter]

export interface BundledMdxFile<T> {
  code: string
  frontmatter: T
  errors: esbuild.Message[]
  matter: Omit<grayMatter.GrayMatterFile<string>, 'data'> & {
    data: T
  }
}

export async function bundleMDXFile(source: string) {
  const { default: rehypeSlug } = await import('rehype-slug')
  const { default: rehypeAutolinkHeadings } = await import(
    'rehype-autolink-headings'
  )

  // Hack for esbuild to work in contexts where this is not defined
  // i.e ts-node with register file.
  process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

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
  }) satisfies Promise<BundledMdxFile<JournalEntryMeta>>
}
