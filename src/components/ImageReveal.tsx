import { useLayoutEffect, useRef, type ImgHTMLAttributes } from 'react'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

type Direction = 'left' | 'right' | 'bottom' | 'center'

const fromClip: Record<Direction, string> = {
  bottom: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  center: 'inset(18% 18% 18% 18%)',
}

type Props = {
  src: string
  alt: string
  direction?: Direction
  className?: string
  imgClassName?: string
  priority?: boolean
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'className'>

export function ImageReveal({
  src,
  alt,
  direction = 'bottom',
  className = '',
  imgClassName = '',
  priority = false,
  ...imgProps
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    if (reduced) {
      gsap.set(wrap, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(img, { scale: 1, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(wrap, { clipPath: fromClip[direction] })
      gsap.set(img, { scale: 1.08, opacity: 0.85 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top 86%',
            once: true,
          },
        })
        .to(
          wrap,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.45,
            ease: 'power3.inOut',
          },
          0,
        )
        .to(
          img,
          {
            scale: 1,
            opacity: 1,
            duration: 1.7,
            ease: 'power2.out',
          },
          0,
        )
    }, wrap)

    return () => ctx.revert()
  }, [direction, reduced])

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
        {...imgProps}
      />
    </div>
  )
}
