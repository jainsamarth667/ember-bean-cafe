import { useLayoutEffect, useRef } from 'react'
import { images } from '../data/images'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

export function ParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return

    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(min-width: 768px)', () => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      data-nav="dark"
      className="relative h-[70vh] overflow-hidden md:h-[90vh]"
    >
      <img
        ref={imgRef}
        src={images.parallax}
        alt="Warm café interior with guests seated at wooden tables"
        loading="lazy"
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover will-change-transform md:-top-[10%] md:h-[120%]"
      />
      <div className="absolute inset-0 bg-espresso/35" />
      <p className="font-display absolute inset-0 flex items-center justify-center text-center text-[clamp(2.4rem,6vw,6rem)] text-cream">
        Take your time.
      </p>
    </section>
  )
}
