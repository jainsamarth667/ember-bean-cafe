import { useLayoutEffect, useRef } from 'react'
import { Button } from './Button'
import { images } from '../data/images'
import { ImageReveal } from './ImageReveal'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

export function StorySection() {
  const textRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const text = textRef.current
    if (!text || reduced) return

    const ctx = gsap.context(() => {
      gsap.from(text.children, {
        y: 36,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 78%',
        },
      })
    }, text)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="story"
      data-nav="cream"
      className="bg-cream px-6 py-24 text-espresso md:px-10 md:py-32 lg:px-14"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <ImageReveal
            src={images.story}
            alt="Warm café interior with a sculpted wall relief, amber pendant lights, and a hanging swing"
            direction="left"
            className="aspect-[4/5] w-full"
          />
        </div>
        <div ref={textRef} className="lg:col-span-6 lg:py-8">
          <p className="label text-coffee">Our story</p>
          <h2 className="font-display mt-5 text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.03em]">
            Rooted in coffee.
            <br />
            Built around people.
          </h2>
          <p className="mt-8 max-w-lg text-lg text-umber/80">
            Ember & Bean began as a two-person roasting project in a rented
            garage, with more curiosity than capital. We opened our doors in
            2026 to make a room where the coffee is serious and the welcome is
            not. Every bean is sourced with growers we know by name. Every
            pastry comes from our own oven before dawn. The rest is just
            showing up — for the regulars, the first-timers, and whoever needs
            a quiet table.
          </p>
          <div className="mt-10">
            <Button href="#visit" variant="dark">
              Read our story
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
