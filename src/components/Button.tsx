import { ArrowRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useSmoothScroll } from '../context/SmoothScroll'

type Props = {
  href: string
  children: string
  variant?: 'solid' | 'outline' | 'dark'
  className?: string
}

export function Button({ href, children, variant = 'outline', className = '' }: Props) {
  const { scrollTo } = useSmoothScroll()
  const isHash = href.startsWith('#')
  const isExternal = href.startsWith('http')

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isHash) return
    e.preventDefault()
    scrollTo(href)
  }

  const styles = {
    solid:
      'border-cream bg-cream text-espresso hover:bg-transparent hover:text-cream',
    outline:
      'border-cream/70 text-cream hover:bg-cream hover:text-espresso',
    dark: 'border-espresso bg-espresso text-cream hover:bg-transparent hover:text-espresso',
  }[variant]

  return (
    <a
      href={href}
      onClick={onClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      data-cursor="hover"
      className={`group inline-flex items-center gap-3 overflow-hidden border px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase transition-colors duration-500 ${styles} ${className}`}
    >
      <span className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-0.5">
        {children}
      </span>
      <ArrowRight
        size={14}
        strokeWidth={1.6}
        className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1.5"
      />
    </a>
  )
}
