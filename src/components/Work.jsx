import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../utils.js'

gsap.registerPlugin(ScrollTrigger)

const cases = [
  { title: 'Pulse – patient app', meta: 'Healthcare · Mobile', bg: 'linear-gradient(135deg,#3d2bff,#ff6b6b)' },
  { title: 'Ledgerly – finance dashboard', meta: 'Fintech · Web', bg: 'linear-gradient(135deg,#00c2a8,#1d3557)' },
  { title: 'Crate – online store', meta: 'eCommerce · Web', bg: 'linear-gradient(135deg,#ffb703,#fb5607)' },
  { title: 'Orbit – project tool', meta: 'SaaS · Web', bg: 'linear-gradient(135deg,#7209b7,#4cc9f0)' },
]

export default function Work() {
  const section = useRef(null)
  const rail = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      // Pinned horizontal scroll
      const scroller = gsap.to(rail.current, {
        x: () => -(rail.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + (rail.current.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      })
      // Parallax inside each card, driven by the horizontal tween
      gsap.utils.toArray('.shot div').forEach((d) => {
        gsap.fromTo(
          d,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: d.parentElement,
              containerAnimation: scroller,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section className="work" id="work" ref={section}>
      <h2>Selected work</h2>
      <div className="rail" ref={rail}>
        {cases.map((c) => (
          <article className="case" key={c.title}>
            <div className="shot">
              <div style={{ background: c.bg }} />
            </div>
            <h3>{c.title}</h3>
            <p>{c.meta}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
