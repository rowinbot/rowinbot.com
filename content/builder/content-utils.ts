import path from 'path'
import fs from 'fs/promises'

export const contentPath = path.join(process.cwd(), 'content')
export const buildContentPath = path.join(contentPath, 'build')

export const pagesPath = path.join(contentPath, 'pages')
export const journalPath = path.join(contentPath, 'journal')
export const journalIndexPath = path.join(
  contentPath,
  'build',
  'journal-index.json'
)

export const journalBuildPath = path.join(contentPath, 'build', 'journal')
export const pagesBuildPath = path.join(contentPath, 'build', 'pages')

export async function getJournalIndexList(): Promise<JournalIndexEntry[]> {
  const content = await fs.readFile(journalIndexPath, 'utf-8')

  return JSON.parse(content) as JournalIndexEntry[]
}

/**
 * @param date formatted as DD/MM/YYYY
 */
export function parseJournalDate(date: string) {
  const [day, month, year] = date.split('/').map((s) => parseInt(s, 10))

  return new Date(Date.UTC(year, month - 1, day))
}
