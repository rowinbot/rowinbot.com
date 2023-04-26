import { useState } from 'react'
import {
  FloatingPortal,
  autoUpdate,
  limitShift,
  shift,
  useClick,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from '~/utils/clsx'

const maxSkills = 4

function JobSkill(props: React.PropsWithChildren) {
  return (
    <mark className="leading-loose rounded-lg px-2 py-1 text-slate-900 dark:text-white bg-opacity-50 bg-blue-100 dark:bg-slate-950 font-medium border-[1px] border-blue-300 dark:border-slate-950">
      {props.children}
    </mark>
  )
}

export function JobSkills(props: { skills: string[] }) {
  const seeMore = props.skills.length > maxSkills

  const [isOpen, setIsOpen] = useState(false)
  const { x, y, refs, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [shift({ padding: 16, limiter: limitShift() })],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useRole(context, { role: 'tooltip' }),
    useClick(context),
    useFocus(context),
  ])

  return (
    <ul className="flex flex-row flex-wrap gap-2 mt-4 z-20 text-slate-900 dark:text-white">
      {props.skills.slice(0, maxSkills).map((skill) => (
        <li
          key={skill}
          className="inline-flex text-sm leading-relaxed hover:scale-110 select-none hover:z-10 transition-all duration-75"
        >
          <JobSkill>{skill}</JobSkill>
        </li>
      ))}

      {seeMore && (
        <>
          <li className="inline-flex">
            <button
              ref={refs.setReference}
              {...getReferenceProps()}
              className={clsx(
                'text-lg rounded-lg inline-block px-4 py-1 text-slate-900 dark:text-white bg-opacity-50 bg-blue-100 dark:bg-slate-950 font-medium border-[1px] border-blue-300 dark:border-slate-950',
                isOpen && 'bg-opacity-100'
              )}
              aria-label="See more skills"
            >
              +
            </button>

            <FloatingPortal>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    ref={refs.setFloating}
                    initial={{ translateY: -10, opacity: 0.5 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    exit={{ translateY: -5, opacity: 0 }}
                    style={{
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                    }}
                    className="mt-2 p-4 bg-white dark:bg-slate-950 dark:bg-opacity-70 dark:backdrop-blur-xl rounded-lg z-20 border-[1px] border-slate-200 dark:border-slate-950 shadow-lg"
                    {...getFloatingProps()}
                  >
                    <ul className="text-sm flex items-start flex-row flex-wrap gap-2 max-w-xl">
                      {props.skills.slice(maxSkills).map((skill) => (
                        <li
                          key={skill}
                          className="inline-flex leading-relaxed font-medium hover:scale-110 cursor-pointer select-none hover:z-10 transition-all duration-75"
                        >
                          <JobSkill>{skill}</JobSkill>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </FloatingPortal>
          </li>
        </>
      )}
    </ul>
  )
}
