import { contact, hours } from '../data/menu'
import { navLinks } from './Navbar'
import { useSmoothScroll } from '../context/SmoothScroll'
import type { MouseEvent } from 'react'

export function Footer() {
  const { scrollTo } = useSmoothScroll()
  const year = new Date().getFullYear()

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollTo(href)
  }

  return (
    <footer data-nav="dark" className="bg-espresso px-6 pt-20 pb-10 text-cream md:px-10 lg:px-14">
      <div className="grid gap-14 border-b border-cream/10 pb-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-4xl">
            Ember <span className="italic text-caramel">&</span> Bean
          </p>
          <p className="mt-4 max-w-xs text-cream/60">Slow coffee. Good company.</p>
        </div>
        <nav className="flex flex-col gap-3 md:col-span-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="hover"
              onClick={(e) => go(e, link.href)}
              className="text-[13px] tracking-[0.18em] uppercase text-cream/75 hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 md:col-span-2">
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="text-[13px] tracking-[0.18em] uppercase text-cream/75 hover:text-cream"
          >
            Instagram
          </a>
          <a
            href={contact.facebook}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="text-[13px] tracking-[0.18em] uppercase text-cream/75 hover:text-cream"
          >
            Facebook
          </a>
        </div>
        <div className="md:col-span-2">
          {contact.addressLines.map((line) => (
            <p key={line} className="text-cream/70">
              {line}
            </p>
          ))}
        </div>
        <div className="md:col-span-2">
          {hours.map((row) => (
            <p key={row.day} className="mb-2 text-sm text-cream/70">
              {row.day}
              <br />
              {row.time}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 pt-8 text-sm text-cream/45 md:flex-row">
        <p>© {year} Ember & Bean. All rights reserved.</p>
        <p>Specialty coffee · Portland</p>
      </div>
    </footer>
  )
}
