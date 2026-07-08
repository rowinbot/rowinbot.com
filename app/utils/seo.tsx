import { type MetaDescriptor } from 'react-router'

import { websiteUrl } from './misc'
import { getMetaImageUrl } from './og'

const DEFAULT_TITLE = 'Rowin Hernandez — Product engineer & tech lead'
const DEFAULT_DESCRIPTION =
  'Senior product engineer and tech lead shipping complex product surfaces end-to-end. Co-founder of Kalebtec.'
const DEFAULT_OG_IMAGE = `${websiteUrl}/og-default.png`

export function getSocialMetaTags({
  url,
  image = DEFAULT_OG_IMAGE,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = '',
  type = 'website',
  canonical = url,
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
  type?: 'website' | 'article'
  canonical?: string
}): MetaDescriptor[] {
  return [
    { title },
    { name: 'description', content: description },
    ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
    { tagName: 'link', rel: 'canonical', href: canonical },

    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: title },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:site_name', content: 'Rowin Hernandez' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@rowinbot' },
    { name: 'twitter:site', content: '@rowinbot' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: title },
  ]
}

export function getJournalEntrySocialMetaTags(
  url: string,
  entryId: string,
  entry: JournalEntryMeta
): MetaDescriptor[] {
  return getSocialMetaTags({
    url,
    image: getMetaImageUrl(url, entryId),
    title: `${entry.title} | Rowin Hernandez`,
    description: entry.description,
    type: 'article',
    keywords: entry.tags?.join(', '),
  })
}
