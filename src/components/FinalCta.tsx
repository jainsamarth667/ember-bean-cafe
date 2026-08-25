import { useLayoutEffect, useRef } from 'react'
import { Button } from './Button'
import { images } from '../data/images'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img || reduced) return

    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(min-width: 768px)', () => {
        gsap.fromTo(
          img,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <img
        ref={imgRef}
        src={images.cta}
        alt="Café storefront glowing at dusk"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-espresso/55" />
      <div className="relative z-10 px-6 text-center">
        <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-cream">
          See you over a cup?
        </h2>
        <div className="mt-10 flex justify-center">
          <Button href="#visit" variant="solid">
            Visit Us
          </Button>
        </div>
      </div>
    </section>
  )
}
