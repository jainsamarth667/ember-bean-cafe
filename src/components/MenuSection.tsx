import { useLayoutEffect, useRef } from 'react'
import { images } from '../data/images'
import { menuCategories } from '../data/menu'
import { ImageReveal } from './ImageReveal'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

export function MenuSection() {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    if (!pin || !track) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      if (reduced) return

      const getDistance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      mm.revert()
    }
  }, [reduced])

  return (
    <section id="menu" data-nav="dark" className="bg-umber">
      <div className="px-6 pt-24 md:px-10 md:pt-32 lg:px-14">
        <p className="label text-caramel">What we pour</p>
        <h2 className="font-display mt-4 text-[clamp(3rem,7vw,7rem)] leading-[0.88] text-cream">
          The Menu
        </h2>
      </div>

      <div ref={pinRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          data-cursor="drag"
          className="flex w-max flex-col md:flex-row md:h-[100svh] md:items-stretch"
        >
          {menuCategories.map((cat, i) => {
            return (
              <article
                key={cat.id}
                className="flex w-screen flex-col border-t border-cream/10 px-6 py-16 md:h-full md:w-[80vw] md:flex-row md:border-t-0 md:border-l md:px-12 md:py-24 lg:w-[72vw]"
              >
                <div className="md:flex md:w-[46%] md:flex-col md:justify-between md:pr-10">
                  <div>
                    <p className="label text-beige">{cat.kicker}</p>
                    <p className="font-display mt-6 text-[clamp(3.5rem,8vw,8rem)] leading-none text-cream">
                      {cat.label}
                    </p>
                    <h3 className="font-display mt-6 text-3xl italic text-caramel md:text-4xl">
                      {cat.headline}
                    </h3>
                    <p className="mt-4 max-w-sm text-cream/70">{cat.copy}</p>
                  </div>
                  <p className="mt-8 hidden text-[11px] tracking-[0.28em] text-beige uppercase md:block">
                    0{i + 1} / 05
                  </p>
                </div>
                <div className="mt-10 flex flex-1 flex-col gap-8 md:mt-0 md:flex-row">
                  <div className="md:w-1/2">
                    <ImageReveal
                      src={images[cat.image]}
                      alt={`${cat.label} at Ember & Bean`}
                      direction={i % 2 === 0 ? 'center' : 'right'}
                      className="aspect-[3/4] w-full"
                    />
                  </div>
                  <ul className="flex flex-1 flex-col justify-center gap-5 md:pl-4">
                    {cat.items.map((item) => (
                      <li
                        key={item.name}
                        className="border-b border-cream/10 pb-4 last:border-0"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-cream">{item.name}</span>
                          <span className="text-sm text-caramel">{item.price}</span>
                        </div>
                        <p className="mt-1 text-sm text-cream/55">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
