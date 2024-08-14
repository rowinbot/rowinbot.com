import path from 'path'
import fs from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import crypto from 'node:crypto'

export const contentPath = path.join(process.cwd(), 'content')
export const buildContentPath = path.join(contentPath, 'build')

export const pagesPath = path.join(contentPath, 'pages')
export const journalPath = path.join(contentPath, 'journal')
export const journalIndexPath = path.join(
  buildContentPath,
  'journal-index.json'
)
export const contentHashesIndexPath = path.join(
  buildContentPath,
  'content-index-hash.json'
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

export function getContentHashKey(filePath: string): string {
  return filePath.replace(contentPath, '')
}

export function getContentHash(content: string): string {
  const hash = crypto.createHash('sha256')
  hash.update(content)
  return hash.digest('hex')
}

// TODO: Move to a @rowinbot/node-ts-utils package
export function isEnoentError(
  error: unknown
): error is Error & { code: 'ENOENT' } {
  if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
    return true
  }

  return false
}
