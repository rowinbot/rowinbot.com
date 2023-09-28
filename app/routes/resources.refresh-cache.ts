import type { DataFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { getRequiredServerEnv } from '~/utils/env.server'
import { getAllJournalEntries } from '~/utils/mdx.server'
import { ensurePrimary } from 'litefs-js/remix'

type Body = { keys: Array<string> } | { contentPaths: Array<string> }

export async function action({ request }: DataFunctionArgs) {
  await ensurePrimary()
  // Everything in this function is fire and forget, so we don't need to await
  // anything.
  console.log('Hi')
  if (
    request.headers.get('auth') !==
    getRequiredServerEnv('INTERNAL_COMMAND_TOKEN')
  ) {
    return redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  }
  console.log('Ho')

  const body = (await request.json()) as Body

  if ('contentPaths' in body && Array.isArray(body.contentPaths)) {
    const refreshingContentPaths = body.contentPaths.filter((p) =>
      p.startsWith('journal')
    )

    if (refreshingContentPaths.length) {
      void getAllJournalEntries({
        forceRefresh: true,
      })
    }

    return json({
      message: 'Refreshing cache for content paths',
      contentPaths: refreshingContentPaths,
    })
  }
  return json({ message: 'no action taken' }, { status: 400 })
}

export const loader = () => redirect('/', { status: 404 })
