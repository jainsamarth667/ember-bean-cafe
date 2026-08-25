import { Button } from './Button'
import { contact, hours } from '../data/menu'

export function VisitSection() {
  return (
    <section
      id="visit"
      data-nav="cream"
      className="bg-cream px-6 py-28 text-espresso md:px-10 md:py-40 lg:px-14"
    >
      <p className="label text-coffee">Find us</p>
      <h2 className="font-display mt-6 max-w-[12ch] text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.03em]">
        Come by for a cup.
      </h2>
      <p className="mt-8 max-w-xl text-lg text-umber/80">
        Walk-ins welcome. The corner table by the window is usually free after
        ten. If you are coming with a laptop, we keep the back room quieter.
      </p>

      <div className="mt-20 grid gap-12 border-t border-espresso/15 pt-14 md:grid-cols-4">
        <div>
          <p className="label text-coffee">Address</p>
          <address className="mt-4 not-italic text-lg leading-relaxed">
            {contact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
        <div>
          <p className="label text-coffee">Opening hours</p>
          <ul className="mt-4 space-y-2 text-lg">
            {hours.map((row) => (
              <li key={row.day}>
                <span className="block text-umber/60">{row.day}</span>
                {row.time}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-coffee">Phone</p>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
            data-cursor="hover"
            className="mt-4 block text-lg underline-offset-4 hover:underline"
          >
            {contact.phone}
          </a>
          <p className="label mt-10 text-coffee">Email</p>
          <a
            href={`mailto:${contact.email}`}
            data-cursor="hover"
            className="mt-4 block text-lg underline-offset-4 hover:underline"
          >
            {contact.email}
          </a>
        </div>
        <div className="flex items-end">
          <Button href={contact.mapsUrl} variant="dark">
            Get directions
          </Button>
        </div>
      </div>
    </section>
  )
}
