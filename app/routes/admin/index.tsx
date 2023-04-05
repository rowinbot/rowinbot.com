import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { getRequiredServerEnv } from '~/utils/env.server'

export async function action({ request }: ActionArgs) {
  const INTERNAL_COMMAND_TOKEN = getRequiredServerEnv('INTERNAL_COMMAND_TOKEN')

  if (getRequiredServerEnv('NODE_ENV') != 'development') {
    throw new Error('Unauthorized')
  }

  let success = false

  const response = await fetch(
    new URL('/resources/refresh-cache', request.url).toString(),
    {
      headers: {
        auth: INTERNAL_COMMAND_TOKEN,
      },
      method: 'post',
      body: JSON.stringify({
        contentPaths: ['journal'],
      }),
    }
  )

  if (response.status === 200) {
    success = true
  }

  return json({ success })
}

export function loader() {
  if (getRequiredServerEnv('NODE_ENV') != 'development') {
    throw new Error('Unauthorized')
  }

  return json({})
}

export default function AdminRoute() {
  const actionData = useActionData<typeof action>()
  const transition = useTransition()

  return (
    <div className="app-text">
      <Form aria-describedby="form-success" method="post">
        <button type="submit">Reset cache :)</button>
      </Form>

      {transition.state === 'idle' && actionData && (
        <p id="form-success" role="alert" className="app-text">
          {actionData.success
            ? "Successfully reset the journal's cache"
            : "Error trying to reset the journal's cache"}
        </p>
      )}
    </div>
  )
}
