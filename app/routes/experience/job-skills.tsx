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
    <mark className="font-mono text-xs uppercase tracking-wider leading-loose rounded-sm px-2.5 py-1 text-cyber-text bg-cyber-cyan/10 font-medium border border-cyber-cyan/30 transition-colors duration-200 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/15">
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
    <ul className="flex flex-row flex-wrap gap-2 mt-5 z-20 text-cyber-text">
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
                'font-mono text-sm font-bold rounded-sm inline-block px-4 py-1 text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/40 transition-all duration-200 hover:bg-cyber-cyan/20 hover:border-cyber-cyan/70',
                isOpen && 'bg-cyber-cyan/20 border-cyber-cyan/70'
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
                    className="mt-2 p-4 bg-cyber-surface/95 backdrop-blur-xl rounded-sm z-20 border border-cyber-border shadow-lg"
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
