import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { dbCache as cache } from '~/utils/cache.server'
import { getInternalInstanceDomain, getInstanceInfo } from 'litefs-js'
import { getRequiredServerEnv } from '~/utils/env.server'
import { restrictedRouteRedirect } from '~/utils/misc.server'

export async function action({ request }: DataFunctionArgs) {
  const { currentIsPrimary, primaryInstance } = await getInstanceInfo()
  if (!currentIsPrimary) {
    throw new Error(
      `${request.url} should only be called on the primary instance (${primaryInstance})}`
    )
  }
  if (
    request.headers.get('auth') !==
    getRequiredServerEnv('INTERNAL_COMMAND_TOKEN')
  ) {
    return restrictedRouteRedirect()
  }

  const { key, cacheValue } = await request.json()
  if (cacheValue === undefined) {
    await cache.delete(key)
  } else {
    await cache.set(key, cacheValue)
  }
  return json({ success: true })
}

export async function updatePrimaryCacheValue({
  key,
  cacheValue,
}: {
  key: string
  cacheValue: any
}) {
  const { currentIsPrimary, primaryInstance } = await getInstanceInfo()
  if (currentIsPrimary) {
    throw new Error(
      `updatePrimaryCacheValue should not be called on the primary instance (${primaryInstance})}`
    )
  }
  const domain = getInternalInstanceDomain(primaryInstance)
  const token = getRequiredServerEnv('INTERNAL_COMMAND_TOKEN')
  return fetch(`${domain}/resources/cache/sqlite`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key, cacheValue }),
  })
}
