import { ArrowUpRight } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { featuredDrinks } from '../data/menu'
import { images } from '../data/images'
import { ImageReveal } from './ImageReveal'
import { gsap } from '../lib/gsap'
import { useSmoothScroll } from '../context/SmoothScroll'

function Product({
  item,
  image,
  className,
  direction,
  large,
}: {
  item: (typeof featuredDrinks)[number]
  image: string
  className?: string
  direction: 'left' | 'right' | 'bottom' | 'center'
  large?: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const { scrollTo } = useSmoothScroll()

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return
    const img = card.querySelector('img')
    const title = card.querySelector('[data-product-title]')
    const arrow = card.querySelector('[data-product-arrow]')
    const overlay = card.querySelector('[data-product-overlay]')
    if (!img || !title || !arrow || !overlay) return

    const enter = () => {
      gsap.to(img, { scale: 1.05, x: 8, duration: 0.9, ease: 'power2.out' })
      gsap.to(title, { y: -8, duration: 0.55, ease: 'power2.out' })
      gsap.to(arrow, { x: 8, duration: 0.55, ease: 'power2.out' })
      gsap.to(overlay, { opacity: 0.35, duration: 0.6, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to(img, { scale: 1, x: 0, duration: 0.9, ease: 'power2.out' })
      gsap.to(title, { y: 0, duration: 0.55, ease: 'power2.out' })
      gsap.to(arrow, { x: 0, duration: 0.55, ease: 'power2.out' })
      gsap.to(overlay, { opacity: 0.18, duration: 0.6, ease: 'power2.out' })
    }

    card.addEventListener('mouseenter', enter)
    card.addEventListener('mouseleave', leave)
    return () => {
      card.removeEventListener('mouseenter', enter)
      card.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <a
      ref={cardRef}
      href="#menu"
      data-cursor="view"
      onClick={(e) => {
        e.preventDefault()
        scrollTo('#menu')
      }}
      className={`group relative block h-full overflow-hidden ${className ?? ''}`}
    >
      <ImageReveal
        src={image}
        alt={`${item.name} served at Ember & Bean`}
        direction={direction}
        className="h-full min-h-[320px] md:min-h-0"
        imgClassName="origin-center"
      />
      <div
        data-product-overlay
        className="absolute inset-0 bg-espresso/40 opacity-[0.18]"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <p className="label mb-3 text-beige">{item.id}</p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3
              data-product-title
              className={`font-display leading-none text-cream ${
                large ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'
              }`}
            >
              {item.name}
            </h3>
            <p className="mt-3 max-w-sm text-sm text-cream/75 md:text-[15px]">
              {item.description}
            </p>
          </div>
          <p className="font-display text-2xl text-caramel">{item.price}</p>
        </div>
        <span className="label mt-6 inline-flex items-center gap-2 text-cream">
          Discover
          <ArrowUpRight data-product-arrow size={16} />
        </span>
      </div>
    </a>
  )
}

export function CoffeeSection() {
  const [espresso, latte, coldBrew] = featuredDrinks

  return (
    <section data-nav="dark" className="bg-espresso px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="label text-caramel">Signature cups</p>
          <h2 className="font-display mt-4 text-[clamp(3rem,7vw,7rem)] leading-[0.9] text-cream">
            Three drinks
            <br />
            we stand by.
          </h2>
        </div>
        <p className="max-w-sm text-cream/70">
          A short list, roasted in small lots. If we cannot taste the origin
          through the milk, we do not put it on the bar.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2 md:h-[min(88vh,920px)] md:min-h-[640px] md:gap-5">
        <Product
          item={espresso}
          image={images[espresso.imageKey]}
          direction="left"
          large
          className="md:col-span-7 md:row-span-2"
        />
        <Product
          item={latte}
          image={images[latte.imageKey]}
          direction="right"
          className="md:col-span-5"
        />
        <Product
          item={coldBrew}
          image={images[coldBrew.imageKey]}
          direction="bottom"
          className="md:col-span-5"
        />
      </div>
    </section>
  )
}
