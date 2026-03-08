import { redirect } from 'react-router';

import type { Route } from './+types/link.route'

const codes = {
  'vue-l1': 'https://certificates.dev/c/9a1f4c22-455a-42fe-942b-f60414d73dda',
}

export async function loader({ params }: Route.LoaderArgs) {
  if (params.code in codes) {
    return redirect(codes[params.code as keyof typeof codes])
  }

  return redirect('/')
}
