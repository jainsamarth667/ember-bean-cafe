import { images } from './images'

export type MenuItem = {
  name: string
  description: string
  price: string
}

export type MenuCategory = {
  id: string
  label: string
  kicker: string
  headline: string
  copy: string
  image: keyof typeof images
  items: MenuItem[]
}

export const featuredDrinks = [
  {
    id: '01',
    name: 'Espresso',
    description:
      'A dense, honeyed shot pulled from our house blend — cocoa, dried cherry, and a long sweet finish.',
    price: '$4.50',
    imageKey: 'espresso' as const,
  },
  {
    id: '02',
    name: 'Vanilla Latte',
    description:
      'Silky steamed milk, Madagascar vanilla, and a double espresso. Comfort, with a little gold on top.',
    price: '$6.50',
    imageKey: 'latte' as const,
  },
  {
    id: '03',
    name: 'Cold Brew',
    description:
      'Steeped for sixteen hours. Low acid, dark chocolate notes, and a clean cold sip that lingers.',
    price: '$5.75',
    imageKey: 'coldBrew' as const,
  },
]

export const menuCategories: MenuCategory[] = [
  {
    id: 'coffee',
    label: 'Coffee',
    kicker: '01 — House roast',
    headline: 'Pulled with patience.',
    copy: 'Single origins and a seasonal house blend, roasted for sweetness rather than volume.',
    image: 'menuCoffee',
    items: [
      { name: 'Espresso', description: 'House blend, 18g in / 36g out', price: '$4.50' },
      { name: 'Americano', description: 'Espresso stretched with hot water', price: '$4.75' },
      { name: 'Cappuccino', description: 'Equal parts espresso, milk, and foam', price: '$5.50' },
      { name: 'Flat White', description: 'Velvet microfoam, double ristretto', price: '$5.75' },
      { name: 'Pour Over', description: 'Single origin, V60, served black', price: '$6.25' },
    ],
  },
  {
    id: 'iced',
    label: 'Iced',
    kicker: '02 — Cold bar',
    headline: 'Slow-steeped, served cold.',
    copy: 'Bright, clean, and built for long afternoons. No syrups shouting over the coffee.',
    image: 'menuIced',
    items: [
      { name: 'Cold Brew', description: 'Sixteen-hour steep, served over ice', price: '$5.75' },
      { name: 'Iced Latte', description: 'Espresso, cold milk, long glass', price: '$6.25' },
      { name: 'Espresso Tonic', description: 'Citrus tonic, orange peel, double shot', price: '$6.50' },
      { name: 'Iced Mocha', description: 'Dark cocoa, espresso, cold milk', price: '$6.75' },
      { name: 'Shakerato', description: 'Espresso shaken with ice until foamy', price: '$5.50' },
    ],
  },
  {
    id: 'tea',
    label: 'Tea',
    kicker: '03 — Leaves & steam',
    headline: 'Quiet cups, full flavor.',
    copy: 'Whole-leaf teas and a house chai, steeped to order — never from a dusty bag.',
    image: 'menuTea',
    items: [
      { name: 'Earl Grey', description: 'Bergamot, cornflower, bright and floral', price: '$4.25' },
      { name: 'Jasmine Green', description: 'Pearl tea, steamed gently', price: '$4.50' },
      { name: 'House Chai', description: 'Cardamom, ginger, black tea, steamed milk', price: '$5.50' },
      { name: 'Chamomile', description: 'Honeyed, caffeine-free, evening-ready', price: '$4.25' },
      { name: 'Matcha Latte', description: 'Ceremonial grade, whisked to order', price: '$6.50' },
    ],
  },
  {
    id: 'pastries',
    label: 'Pastries',
    kicker: '04 — From the oven',
    headline: 'Butter, flour, morning light.',
    copy: 'Baked before open. Croissants shatter, cakes stay tender, nothing sits overnight.',
    image: 'menuPastry',
    items: [
      { name: 'Butter Croissant', description: 'Laminated dough, baked dark gold', price: '$4.75' },
      { name: 'Almond Croissant', description: 'Frangipane, toasted almonds, sugar', price: '$5.50' },
      { name: 'Cinnamon Morning Bun', description: 'Orange zest, brown sugar, cardamom', price: '$5.25' },
      { name: 'Olive Oil Cake', description: 'Citrus glaze, rosemary crumb', price: '$6.00' },
      { name: 'Dark Chocolate Cookie', description: 'Sea salt, 70% cacao, still warm', price: '$3.75' },
    ],
  },
  {
    id: 'bites',
    label: 'Bites',
    kicker: '05 — Kitchen',
    headline: 'Simple food, well made.',
    copy: 'A short savory list meant to sit beside a good cup — not compete with it.',
    image: 'menuBites',
    items: [
      { name: 'Avocado Toast', description: 'Sourdough, chili oil, lemon, herbs', price: '$11.00' },
      { name: 'Soft Egg & Greens', description: 'Jammy eggs, dressed leaves, pecorino', price: '$12.50' },
      { name: 'Ham & Gruyère', description: 'Warm focaccia, Dijon, pickled onion', price: '$13.00' },
      { name: 'Seasonal Soup', description: 'Ask the bar — changes with the market', price: '$9.50' },
      { name: 'House Granola Bowl', description: 'Yogurt, honey, fruit of the week', price: '$10.00' },
    ],
  },
]

export const hours = [
  { day: 'Monday — Friday', time: '7:30 AM — 7:00 PM' },
  { day: 'Saturday — Sunday', time: '8:00 AM — 8:00 PM' },
]

export const contact = {
  addressLines: ['18 Ember Lane', 'Willow District', 'Portland, OR 97209'],
  phone: '+1 (503) 555-0186',
  email: 'hello@emberandbean.com',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=18+Ember+Lane+Portland+OR',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
}
