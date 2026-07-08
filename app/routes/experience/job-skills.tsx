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
import { useState } from 'react'

import clsx from '~/utils/clsx'

const maxSkills = 4

function JobSkill(props: React.PropsWithChildren) {
  return (
    <mark className="rounded-sm border border-rule bg-surface px-2.5 py-1 font-mono text-label uppercase tracking-[0.08em] text-ink transition-colors hover:border-mark">
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
    <ul className="z-20 mt-5 flex flex-row flex-wrap gap-2 text-ink">
      {props.skills.slice(0, maxSkills).map((skill) => (
        <li
          key={skill}
          className="inline-flex text-sm leading-relaxed hover:scale-105 select-none hover:z-10 transition-all duration-150"
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
                'inline-block rounded-sm border border-rule bg-surface px-4 py-1 font-mono text-meta font-bold text-mark transition-colors hover:border-mark',
                isOpen && 'border-mark'
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
                    className="z-20 mt-2 rounded-sm border border-rule bg-surface/95 p-4 shadow-lg backdrop-blur-xl"
                    {...getFloatingProps()}
                  >
                    <ul className="text-sm flex items-start flex-row flex-wrap gap-2 max-w-xl">
                      {props.skills.slice(maxSkills).map((skill) => (
                        <li
                          key={skill}
                          className="inline-flex leading-relaxed font-medium hover:scale-105 cursor-pointer select-none hover:z-10 transition-all duration-150"
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
