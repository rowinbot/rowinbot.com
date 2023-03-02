import clsx from 'clsx'
import { useRouter } from 'next/router'

const pathToRouteName = {
  '': 'Home',
  blog: 'Blog',
}

export function Breadcrumbs() {
  const router = useRouter()

  const subPaths = router.asPath
    .split('/')
    .filter((str): str is keyof typeof pathToRouteName => {
      return str in pathToRouteName
    })
    .map((path) => ({
      path:
        router.asPath.substring(0, router.asPath.indexOf(path)) + path || '/',
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
