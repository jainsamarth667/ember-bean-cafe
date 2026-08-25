import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useIsDesktop } from '../hooks/useMediaQuery'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!isDesktop) {
      document.body.classList.remove('has-custom-cursor')
      return
    }

    document.body.classList.add('has-custom-cursor')
    const cursor = cursorRef.current
    const label = labelRef.current
    if (!cursor || !label) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.18
      pos.y += (mouse.y - pos.y) * 0.18
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }

    gsap.ticker.add(tick)
    window.addEventListener('mousemove', onMove)

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const mode = el.dataset.cursor || 'hover'
      cursor.dataset.mode = mode
      if (mode === 'view' || mode === 'drag') {
        label.textContent = mode === 'drag' ? 'DRAG' : 'VIEW'
      } else {
        label.textContent = ''
      }
    }

    const onLeave = () => {
      cursor.dataset.mode = 'default'
      label.textContent = ''
    }

    const bind = () => {
      document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    bind()
    const observer = new MutationObserver(bind)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      document.body.classList.remove('has-custom-cursor')
      document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden
      data-mode="default"
      className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
      style={{ transform: 'translate3d(-100px,-100px,0)' }}
    >
      <div className="cursor-dot relative -translate-x-1/2 -translate-y-1/2">
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center text-[9px] tracking-[0.28em] text-espresso opacity-0 transition-opacity duration-300"
        />
      </div>
      <style>{`
        .cursor-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: #f2e8d8;
          transition: width 0.4s cubic-bezier(0.76, 0, 0.24, 1),
            height 0.4s cubic-bezier(0.76, 0, 0.24, 1),
            background 0.4s ease;
        }
        [data-mode='hover'] .cursor-dot {
          width: 44px;
          height: 44px;
          background: #f2e8d8;
        }
        [data-mode='view'] .cursor-dot,
        [data-mode='drag'] .cursor-dot {
          width: 72px;
          height: 72px;
          background: #f2e8d8;
        }
        [data-mode='view'] span,
        [data-mode='drag'] span {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
