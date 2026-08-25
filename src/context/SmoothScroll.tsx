import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

type ScrollApi = {
  lenis: Lenis | null
  scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void
}

const ScrollContext = createContext<ScrollApi>({
  lenis: null,
  scrollTo: (target) => {
    if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  },
})

export function useSmoothScroll() {
  return useContext(ScrollContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    instance.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(ticker)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const api = useMemo<ScrollApi>(
    () => ({
      lenis,
      scrollTo: (target, options) => {
        if (lenis) {
          lenis.start()
          lenis.scrollTo(target, { offset: options?.offset ?? 0, duration: 1.35 })
          return
        }
        if (typeof target === 'string') {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
        } else {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      },
    }),
    [lenis],
  )

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}
