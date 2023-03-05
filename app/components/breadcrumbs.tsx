import clsx from 'clsx'
import { useLocation } from 'react-router'

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
              <span
                aria-hidden
                className="pr-4 dark:text-slate-600 text-slate-700 text-sm"
              >
                {'>'}
              </span>
            )}

            <a
              href={subPath.path}
              className={clsx(
                isLast ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'
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
