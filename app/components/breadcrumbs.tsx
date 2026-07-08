import { useLocation } from 'react-router'

import clsx from '~/utils/clsx'

const pathToRouteName = {
  '': 'Home',
  journal: 'Journal',
}

export function Breadcrumbs() {
  const location = useLocation()

  const subPaths = location.pathname
    .split('/')
    .filter((str): str is keyof typeof pathToRouteName => {
      return str in pathToRouteName
    })
    .map((path) => ({
      path:
        location.pathname.substring(0, location.pathname.indexOf(path)) +
          path || '/',
      title: pathToRouteName[path],
    }))

  return (
    <ul className="flex flex-row space-x-4">
      {subPaths.map((subPath, index) => {
        const isFirst = index === 0
        const isLast = index === subPaths.length - 1

        return (
          <li key={subPath.path}>
            {!isFirst && (
              <span aria-hidden className="pr-4 font-mono text-meta text-ink-soft">
                {'>'}
              </span>
            )}

            <a
              href={subPath.path}
              className={clsx(
                'font-mono text-meta',
                isLast ? 'text-ink' : 'text-ink-soft hover:text-mark'
              )}
            >
              {subPath.title}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
