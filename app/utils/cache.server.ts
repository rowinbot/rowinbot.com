import LRU from 'lru-cache'
import fs from 'node:fs'
import Database from 'better-sqlite3'
import type BetterSqlite3 from 'better-sqlite3'

import cachifiedModule, {
  verboseReporter,
  type Cache,
  type CachifiedOptions,
  type CacheEntry,
  lruCacheAdapter,
} from 'cachified'
import { getRequiredServerEnv } from './env.server'
import { updatePrimaryCacheValue } from '~/routes/resources.cache'
import { getInstanceInfo, getInstanceInfoSync } from 'litefs-js'
import { getBlurDataUrlFromImagePath, getPathFromPublic } from './blur.server'

declare global {
  // These globals are meant to preserve the cache manager instances during development
  var __cacheDb: BetterSqlite3.Database | undefined
  var __lruCache: LRU<string, CacheEntry<unknown>> | undefined
}

export interface CachifiedMethodOptions {
  forceRefresh?: boolean
}

export const defaultStaleWhileRevalidate = 1000 * 60 * 60 * 24 * 30 // 30 days

const CACHE_DATABASE_PATH = getRequiredServerEnv('CACHE_DATABASE_PATH')

const cacheDb = (global.__cacheDb = global.__cacheDb
  ? global.__cacheDb
  : createDatabase())

function createDatabase(tryAgain = true): BetterSqlite3.Database {
  const db = new Database(CACHE_DATABASE_PATH)
  const { currentIsPrimary } = getInstanceInfoSync()
  if (!currentIsPrimary) return db

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS cache (
        key TEXT PRIMARY KEY,
        metadata TEXT,
        value TEXT
      )
    `)
  } catch (error: unknown) {
    fs.unlinkSync(CACHE_DATABASE_PATH)
    if (tryAgain) {
      console.error(
        `Error creating cache database, deleting the file at "${CACHE_DATABASE_PATH}" and trying again...`
      )
      return createDatabase(false)
    }
    throw error
  }
  return db
}

export const dbCache: Cache = {
  name: 'App cache',
  get(key) {
    const result = cacheDb
      .prepare('SELECT value, metadata FROM cache WHERE key = ?')
      .get(key)
    if (!result) return null
    return {
      metadata: JSON.parse(result.metadata),
      value: JSON.parse(result.value),
    }
  },
  async set(key, entry) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const { currentIsPrimary, primaryInstance } = await getInstanceInfo()
    if (currentIsPrimary) {
      cacheDb
        .prepare(
          'INSERT OR REPLACE INTO cache (key, value, metadata) VALUES (@key, @value, @metadata)'
        )
        .run({
          key,
          value: JSON.stringify(entry.value),
          metadata: JSON.stringify(entry.metadata),
        })
    } else {
      // fire-and-forget cache update
      void updatePrimaryCacheValue({
        key,
        cacheValue: entry,
      }).then((response) => {
        if (!response.ok) {
          console.error(
            `Error updating cache value for key "${key}" on primary instance (${primaryInstance}): ${response.status} ${response.statusText}`,
            { entry }
          )
        }
      })
    }
  },
  async delete(key) {
    const { currentIsPrimary, primaryInstance } = await getInstanceInfo()
    if (currentIsPrimary) {
      cacheDb.prepare('DELETE FROM cache WHERE key = ?').run(key)
    } else {
      // fire-and-forget cache update
      void updatePrimaryCacheValue({
        key,
        cacheValue: undefined,
      }).then((response) => {
        if (!response.ok) {
          console.error(
            `Error deleting cache value for key "${key}" on primary instance (${primaryInstance}): ${response.status} ${response.statusText}`
          )
        }
      })
    }
  },
}

const lru = (global.__lruCache = global.__lruCache
  ? global.__lruCache
  : new LRU<string, CacheEntry<unknown>>({
      max: 5000, // NOTE: Tune this value
    }))

export const lruCache = lruCacheAdapter(lru)

// TODO: Time value retrieval operations for profiling
export function cachified<T>(options: Omit<CachifiedOptions<T>, 'reporter'>) {
  return cachifiedModule({
    reporter: verboseReporter(),
    ...options,
  })
}

export const cachifiedImageWithBlur = async (src: string) => ({
  src,
  blurDataUrl: await cachified({
    key: src,
    cache: dbCache,
    ttl: 1000 * 60 * 60 * 24 * 60,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    getFreshValue: async () => {
      console.log(getPathFromPublic(src), src, 'LOADING')
      return getBlurDataUrlFromImagePath(getPathFromPublic(src))
    },
  }),
})
