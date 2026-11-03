import gsap from 'gsap'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Work from './components/Work.jsx'
import Services from './components/Services.jsx'
import Cta from './components/Cta.jsx'

// Plays once the preloader finishes: hero headline rises line by line
const playIntro = () =>
  gsap.to('.line > span', { y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12 })

export default function App() {
  return (
    <>
      <Loader onDone={playIntro} />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Cta />
      </main>
    </>
  )
}
