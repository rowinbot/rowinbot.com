import { getAllJournalEntries } from '~/utils/mdx.server'
import { websiteUrl } from '~/utils/misc'

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
  priority: string
}

function toIsoDate(date: string): string {
  const [day, month, year] = date.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export async function loader() {
  const entries = await getAllJournalEntries()
  const today = new Date().toISOString().slice(0, 10)

  const urls: SitemapUrl[] = [
    { loc: `${websiteUrl}/`, lastmod: today, changefreq: 'monthly', priority: '1.0' },
    { loc: `${websiteUrl}/journal`, lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { loc: `${websiteUrl}/my-experience`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
    { loc: `${websiteUrl}/about`, lastmod: today, changefreq: 'yearly', priority: '0.7' },
    ...entries.map((entry) => ({
      loc: `${websiteUrl}/journal/${entry.id}`,
      lastmod: toIsoDate(entry.date),
      changefreq: 'yearly',
      priority: '0.7',
    })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) =>
      `  <url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod><changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`
  )
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
