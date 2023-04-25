import clsx from '~/utils/clsx'
import { useEffect, useState } from 'react'
import { useEffectEvent } from '~/utils/misc'

function useTypewriter(
  texts: string[],
  {
    timeInterval,
    delayBetweenTexts = 1000,
  }: {
    timeInterval: number
    delayBetweenTexts?: number
  }
) {
  const [textIndex, setTextIndex] = useState(0)
  const [letterIndex, setLetterIndex] = useState(0)
  const [sleep, setSleep] = useState(false)

  const fullText = texts[textIndex]
  const text = fullText.slice(0, letterIndex)

  const typewriterHandler = useEffectEvent(() => {
    if (letterIndex < fullText.length) {
      setLetterIndex(letterIndex + 1)
    } else {
      setSleep(true)
    }
  })

  useEffect(() => {
    if (sleep) return

    const interval = setInterval(typewriterHandler, timeInterval)

    return () => clearInterval(interval)
  }, [sleep, typewriterHandler, timeInterval])

  const resetHandler = useEffectEvent(() => {
    setTextIndex((textIndex + 1) % texts.length)
    setLetterIndex(0)
    setSleep(false)
  })

  useEffect(() => {
    if (!sleep) return

    const timeout = setTimeout(resetHandler, delayBetweenTexts)

    return () => clearTimeout(timeout)
  }, [sleep, resetHandler, delayBetweenTexts])

  return {
    fullText,
    text,
    idle: sleep,
  }
}

interface RoleTypewriterProps {
  roles: string[]
}
export function RoleTypewriter(props: RoleTypewriterProps) {
  const { text, idle } = useTypewriter(props.roles, {
    timeInterval: 50,
    delayBetweenTexts: 3500,
  })

  const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  })

  return (
    <span aria-label={formatter.format(props.roles)}>
      <span
        aria-hidden
        className={clsx('blinking-cursor', idle && 'blinking-cursor-inactive')}
      >
        {text}
      </span>
    </span>
  )
}
