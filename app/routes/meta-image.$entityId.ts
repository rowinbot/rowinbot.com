import { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getJournalEntryFromSlug } from '~/utils/mdx.server'
import { isEnoentError, restrictedRouteRedirect } from '~/utils/misc.server'
import { getCachifiedMetaImage } from '~/utils/og.server'

export function action() {
  throw restrictedRouteRedirect()
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { entityId } = params

  invariant(entityId, 'Missing entityId')

  const stream = new ReadableStream({
    async start(controller) {
      let image

      try {
        const entry = await getJournalEntryFromSlug(entityId)
        const url = new URL(`journal/${entityId}`, new URL(request.url).origin)

        const cachedImage = await getCachifiedMetaImage(
          `meta:journal/${entityId}/image`,
          {
            tags: entry.tags,
            title: entry.title,
            imageSrc: entry.imageSrc
              ? new URL(entry.imageSrc, url.origin).href
              : undefined,
            url: url.hostname + url.pathname,
          }
        )

        image = Buffer.from(
          cachedImage instanceof Buffer ? cachedImage : cachedImage.data
        )
      } catch (error) {
        if (isEnoentError(error)) {
          const cachedImage = await getCachifiedMetaImage('meta:not-found', {
            title: 'Not found',
            url: new URL(request.url).origin,
          })

          image = Buffer.from(
            cachedImage instanceof Buffer ? cachedImage : cachedImage.data
          )
        } else {
          throw error
        }
      }

      controller.enqueue(image)
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'no-cache, no-store',
    },
    status: 200,
  })
}
