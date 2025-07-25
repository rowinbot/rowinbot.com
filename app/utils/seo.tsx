import { getMetaImageUrl } from './og'
import { MetaDescriptor } from 'react-router';

export function getSocialMetaTags({
  url,
  image,
  title = 'Crafting adaptive high-quality experiences for the Web',
  description = 'Make the world better with software',
  keywords = '',
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}): MetaDescriptor[] {
  return [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: 'Rowin Hernandez Website' },
    {
      name: 'twitter:card',
      content: image ? 'summary_large_image' : 'summary',
    },
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
  const image = getMetaImageUrl(url, entryId)

  return getSocialMetaTags({
    url,
    image,
    title: `${entry.title} | Rowin Hernandez`,
    description: entry.description,
  })
}
