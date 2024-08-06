import { getMetaImageUrl } from './og'

export function getSocialMetas({
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
}) {
  return {
    title,
    description,
    keywords,
    image,
    'og:url': url,
    'og:type': 'article',
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:site_name': 'Rowin Hernandez Website',
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:creator': '@rowinbot',
    'twitter:site': '@rowinbot',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:image:alt': title,
  }
}

export function getJournalEntrySocialMetas(
  url: string,
  entryId: string,
  entry: JournalEntryMeta
) {
  const image = getMetaImageUrl(url, entryId)

  return getSocialMetas({
    url,
    image,
    title: entry.title,
    description: entry.description,
  })
}
