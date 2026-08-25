import { images } from '../data/images'

const items = [
  { src: images.gallery1, label: 'Morning pour', className: 'md:col-span-4 md:row-span-2 aspect-[3/4]' },
  { src: images.gallery2, label: 'The machine', className: 'md:col-span-5 aspect-[16/10]' },
  { src: images.gallery3, label: 'A table for two', className: 'md:col-span-3 aspect-[4/5]' },
  { src: images.gallery4, label: 'House roast', className: 'md:col-span-3 aspect-[4/5]' },
  { src: images.gallery5, label: 'Green cherries', className: 'md:col-span-4 aspect-[16/11]' },
  { src: images.gallery6, label: 'Latte, quietly', className: 'md:col-span-5 aspect-[4/5] md:row-span-2' },
  { src: images.gallery7, label: 'Slow pour', className: 'md:col-span-4 aspect-[16/10]' },
  { src: images.gallery8, label: 'The room', className: 'md:col-span-3 aspect-[4/5]' },
]

export function GallerySection() {
  return (
    <section
      id="gallery"
      data-nav="dark"
      className="bg-espresso px-6 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.88] text-cream">
          In the room
        </h2>
        <p className="max-w-xs text-cream/65">
          Light, steam, and the small rituals that make a café feel like a
          second kitchen.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        {items.map((item) => (
          <figure
            key={item.label}
            data-cursor="view"
            className={`group relative overflow-hidden ${item.className}`}
          >
            <img
              src={item.src}
              alt={item.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-espresso/0 transition-colors duration-700 group-hover:bg-espresso/40" />
            <figcaption className="label absolute bottom-6 left-6 translate-y-3 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
