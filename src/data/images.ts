const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

export const images = {
  hero: u('photo-1442512595331-e89e73853f31', 2000),
  espresso: u('photo-1511920170033-f8396924c348', 1400),
  latte: u('photo-1572442388796-11668a67e53d', 1200),
  coldBrew: u('photo-1461023058943-07fcbe16d735', 1200),
  menuCoffee: u('photo-1495474472287-4d71bcdd2085', 1400),
  menuIced: u('photo-1517701604599-bb29b565090c', 1400),
  menuTea: u('photo-1556679343-c7306c1976bc', 1400),
  menuPastry: u('photo-1555507036-ab1f4038808a', 1400),
  menuBites: u('photo-1482049016687-2d3ff1b126ba', 1400),
  story: '/images/story.webp',
  parallax: u('photo-1453614512568-7af50c87e309', 2000),
  gallery1: u('photo-1509042239860-f550ce710b93', 900),
  gallery2: u('photo-1514432324607-a09d9b4aefdd', 900),
  gallery3: '/images/gallery-table.webp',
  gallery4: u('photo-1497935586351-b67a49e012bf', 900),
  gallery5: u('photo-1447933601403-0c6688de566e', 900),
  gallery6: u('photo-1511081692771-859b1a6e107e', 900),
  gallery7: u('photo-1495474472287-4d71bcdd2085', 900),
  gallery8: u('photo-1501339848181-14688f5f69f4', 900),
  cta: u('photo-1493857671505-72967e2e2760', 2000),
} as const
