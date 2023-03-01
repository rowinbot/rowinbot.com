import type { ReactNode } from 'react'
import Link from 'next/link'

interface NavLinkProps {
  children: ReactNode
}

export function NavLink(props: NavLinkProps) {
  return (
    <a href="#" className="px-4 py-2 text-sm app-text cursor-pointer">
      {props.children}
    </a>
  )
}

interface BlogpostButtonProps {
  id: string
}
export function BlogpostButton(props: BlogpostButtonProps) {
  return (
    <Link
      href={`blog/${props.id}`}
      className="text-sm app-text cursor-pointer space-y-8 group"
    >
      <div className="aspect-square rounded-xl group-hover:ring-4 transition-all duration-300 ease-in-out ring-offset-4 ring-offset-white dark:ring-offset-slate-900 ring-[#144fff] overflow-hidden relative group/image">
        <img
          className="absolute inset-0 h-full w-full object-cover transition-all ease-in-out group-hover:duration-300 duration-75"
          src="https://images.pexels.com/photos/14182935/pexels-photo-14182935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      </div>

      <div className="space-y-2">
        <p className="text-2xl">This is a blogpost entry</p>

        <p>
          <span className="font-medium text-xl after:transition-all after:duration-200 after:ease-in-out after:h-1 after:bg-black dark:after:bg-white after:absolute after:left-0 relative after:-bottom-2 after:right-[100%] group-hover:after:right-0">
            Read more
          </span>
        </p>
      </div>
    </Link>
  )
}
