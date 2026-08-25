import { useLayoutEffect, useRef } from 'react'
import { Button } from './Button'
import { images } from '../data/images'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const nav = document.querySelector('[data-nav-root]')
    const section = sectionRef.current
    if (!section) return

    if (reduced) {
      gsap.set(
        [eyebrowRef.current, subRef.current, ctaRef.current, nav, imageRef.current],
        { clearProps: 'all', opacity: 1 },
      )
      wordsRef.current.forEach((w) => gsap.set(w, { y: 0, opacity: 1 }))
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { scale: 1.08 })
      gsap.set(eyebrowRef.current, { opacity: 0, y: 16 })
      gsap.set(wordsRef.current, { yPercent: 110, opacity: 0 })
      gsap.set(subRef.current, { opacity: 0, y: 28 })
      gsap.set(ctaRef.current, { opacity: 0, y: 24 })
      if (nav) gsap.set(nav, { opacity: 0, y: -16 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(
        imageRef.current,
        { scale: 1, duration: 2.6, ease: 'power2.out' },
        0,
      )
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 1.1 }, 0.35)
        .to(
          wordsRef.current,
          { yPercent: 0, opacity: 1, duration: 1.25, stagger: 0.14 },
          0.45,
        )
        .to(subRef.current, { opacity: 1, y: 0, duration: 1.15 }, 1.15)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 1 }, 1.5)
        .to(nav, { opacity: 1, y: 0, duration: 1.1 }, 1.85)
    }, section)

    return () => ctx.revert()
  }, [reduced])

  const words = ['GOOD', 'COFFEE.', 'GOOD', 'MOMENTS.']

  return (
    <section
      id="home"
      ref={sectionRef}
      data-nav="dark"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-espresso"
    >
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src={images.hero}
          alt="Steam rising from a ceramic cup of black coffee in warm morning light"
          className="h-full w-full object-cover will-change-transform"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/45 to-espresso/25" />
      </div>

      <div className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
        <p
          ref={eyebrowRef}
          className="label mb-6 text-beige"
        >
          Est. 2026 · Specialty Coffee
        </p>
        <h1 className="font-display max-w-[18ch] text-[clamp(4rem,10vw,10rem)] leading-[0.82] font-medium tracking-[-0.03em] text-cream">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pr-[0.18em]">
              <span
                ref={(el) => {
                  if (el) wordsRef.current[i] = el
                }}
                className="inline-block will-change-transform"
              >
                {word}
              </span>
              {i === 1 ? <br /> : null}
            </span>
          ))}
        </h1>
        <p
          ref={subRef}
          className="mt-8 max-w-md text-[17px] text-cream/80 md:text-lg"
        >
          Specialty coffee, slow mornings, and conversations worth staying for.
        </p>
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
          <Button href="#menu" variant="solid">
            Explore Menu
          </Button>
          <Button href="#visit" variant="outline">
            Visit Us
          </Button>
        </div>
      </div>
    </section>
  )
}
