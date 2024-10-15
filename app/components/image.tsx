import { useIsomorphicLayoutEffect } from '@react-spring/web'
import clsx from '~/utils/clsx'
import { useEffect, useRef, useState } from 'react'

interface BlurrableImageProps {
  src: string
  alt: string
  blurDataUrl: string
  width: number
  height: number
  className?: string
  useSpan?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  align?: 'start' | 'center' | 'end'
  mode?: 'responsive' | 'fixed' | 'aspect-responsive'
}
export function BlurrableImage({
  blurDataUrl,
  className,
  useSpan = false,
  align = 'center',
  objectFit = 'cover',
  mode = 'responsive',
  ...props
}: BlurrableImageProps) {
  const [visible, setVisible] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (imgRef.current?.complete) setVisible(true)
  }, [])

  useEffect(() => {
    if (!imgRef.current) return
    if (imgRef.current.complete) return

    let current = true
    imgRef.current.addEventListener('load', () => {
      if (!imgRef.current || !current) return
      setTimeout(() => {
        setVisible(true)
      }, 0)
    })

    return () => {
      current = false
    }
  }, [])

  let containerStyle: React.HTMLAttributes<HTMLDivElement>['style'] = undefined
  if (mode === 'fixed') {
    containerStyle = {
      width: props.width,
      height: props.height,
    }
  } else if (mode === 'aspect-responsive') {
    containerStyle = {
      aspectRatio: `${props.width} / ${props.height}`,
    }
  }

  const Element = useSpan ? 'span' : 'div'

  return (
    <Element
      className={clsx('relative overflow-hidden', className)}
      style={containerStyle}
    >
      <img
        src={blurDataUrl}
        className={clsx(
          'absolute inset-0 z-10 h-full w-full blur-3xl transition-all duration-300 ease-in-out',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          objectFit === 'scale-down' && 'object-scale-down',
          !visible ? 'scale-150 opacity-100' : 'scale-100 opacity-0',
          align === 'start' && 'object-left',
          align === 'center' && 'object-center',
          align === 'end' && 'object-right'
        )}
        alt=""
      />

      <img
        ref={imgRef}
        src={props.src}
        className={clsx(
          'h-full w-full transition-all ease-in-out relative z-10',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          objectFit === 'scale-down' && 'object-scale-down',
          !visible ? 'scale-125 opacity-0' : 'scale-100 opacity-100',
          align === 'start' && 'object-left',
          align === 'center' && 'object-center',
          align === 'end' && 'object-right'
        )}
        alt={props.alt}
        style={{ minWidth: 'auto', minHeight: 'auto' }}
      />
    </Element>
  )
}
