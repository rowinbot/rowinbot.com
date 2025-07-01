import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';

const codes = {
  'vue-l1': 'https://certificates.dev/c/9a1f4c22-455a-42fe-942b-f60414d73dda',
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.code! in codes) {
    return redirect(codes[params.code! as keyof typeof codes])
  }

  return redirect('/')
}
