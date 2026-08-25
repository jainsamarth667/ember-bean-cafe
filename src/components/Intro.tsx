import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const lines = [
  'Coffee is more than a drink.',
  "It's a reason to slow down.",
]

export function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<HTMLSpanElement[]>([])
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (reduced) {
      lineRefs.current.forEach((el) => gsap.set(el, { y: 0, opacity: 1 }))
      return
    }

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
            },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      data-nav="cream"
      className="bg-cream px-6 py-28 text-espresso md:px-10 md:py-40 lg:px-14"
    >
      <div ref={sectionRef} className="mx-auto max-w-[1400px]">
        <p className="label mb-12 text-coffee">A quieter kind of café</p>
        <h2 className="font-display text-[clamp(2.6rem,7vw,7rem)] leading-[0.95] font-medium tracking-[-0.03em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-2">
              <span
                ref={(el) => {
                  if (el) lineRefs.current[i] = el
                }}
                className="block will-change-transform"
              >
                {line}
              </span>
            </span>
          ))}
        </h2>
        <p className="mt-12 max-w-xl text-lg text-umber/80">
          At Ember & Bean we roast for sweetness, pour with care, and keep the
          room warm enough that you forget the hour. Stay for one cup. Stay for
          the next.
        </p>
      </div>
    </section>
  )
}
