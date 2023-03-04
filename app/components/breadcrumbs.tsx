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
            <a
              href={subPath.path}
              className={clsx(
                !isFirst &&
                  'before:content-[">"] before:pr-4 before:dark:text-slate-600 before:text-slate-700 before:text-sm',
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
