import { Menu, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { useSmoothScroll } from '../context/SmoothScroll'
import { gsap } from '../lib/gsap'

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#story', label: 'Story' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#visit', label: 'Visit' },
]

export function Navbar() {
  const { scrollTo, lenis } = useSmoothScroll()
  const [scrolled, setScrolled] = useState(false)
  const [onCream, setOnCream] = useState(false)
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-nav]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setOnCream(visible.target.getAttribute('data-nav') === 'cream')
        }
      },
      { threshold: [0.25, 0.45, 0.6] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) lenis?.stop()
    else lenis?.start()
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [open, lenis])

  useLayoutEffect(() => {
    const overlay = overlayRef.current
    if (!overlay || !open) return

    const links = linkRefs.current.filter(Boolean)
    const ctx = gsap.context(() => {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo(
        links,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' },
      )
    }, overlay)

    return () => ctx.revert()
  }, [open])

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(false)
    document.body.style.overflow = ''
    lenis?.start()
    window.requestAnimationFrame(() => {
      scrollTo(href)
    })
  }

  const creamNav = scrolled && onCream
  const bar = creamNav
    ? 'bg-cream/90 text-espresso shadow-[0_1px_0_rgba(42,23,16,0.08)]'
    : scrolled
      ? 'bg-espresso/80 text-cream'
      : 'bg-transparent text-cream'

  return (
    <>
      <header
        data-nav-root
        className={`pointer-events-none fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${bar} ${
          scrolled ? 'h-[68px] backdrop-blur-md' : 'h-24'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6 md:px-10 lg:px-14">
          <a
            href="#home"
            data-cursor="hover"
            onClick={(e) => go(e, '#home')}
            className="pointer-events-auto font-display text-[1.65rem] tracking-tight"
          >
            Ember <span className="italic text-caramel">&</span> Bean
          </a>

          <nav className="pointer-events-auto hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="hover"
                onClick={(e) => go(e, link.href)}
                className="group relative text-[11px] tracking-[0.28em] uppercase"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button
            type="button"
            data-cursor="hover"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="pointer-events-auto relative z-[80] -mr-2 touch-manipulation p-3 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X strokeWidth={1.4} /> : <Menu strokeWidth={1.4} />}
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[60] flex flex-col justify-end overflow-y-auto bg-espresso px-8 pt-28 pb-[max(4rem,env(safe-area-inset-bottom))] ${
          open ? '' : 'pointer-events-none invisible'
        }`}
        style={{ display: open ? 'flex' : 'none' }}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linkRefs.current[i] = el
              }}
              onClick={(e) => go(e, link.href)}
              className="font-display touch-manipulation py-1 text-5xl leading-[1.05] text-cream sm:text-6xl"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
