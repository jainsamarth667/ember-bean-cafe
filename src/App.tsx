import { CoffeeSection } from './components/CoffeeSection'
import { CustomCursor } from './components/CustomCursor'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { GallerySection } from './components/GallerySection'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { MenuSection } from './components/MenuSection'
import { Navbar } from './components/Navbar'
import { ParallaxSection } from './components/ParallaxSection'
import { StorySection } from './components/StorySection'
import { VisitSection } from './components/VisitSection'
import { SmoothScroll } from './context/SmoothScroll'

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <CoffeeSection />
        <MenuSection />
        <StorySection />
        <ParallaxSection />
        <GallerySection />
        <VisitSection />
        <FinalCta />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
