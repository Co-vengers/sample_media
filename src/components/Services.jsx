import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../utils.js'

gsap.registerPlugin(ScrollTrigger)

const headline = 'We turn complex ideas into simple interfaces that feel obvious.'

const services = [
  { name: 'Product strategy', note: 'Research, workshops, roadmaps' },
  { name: 'UX and UI design', note: 'Flows, prototypes, visual design' },
  { name: 'Design systems', note: 'Components, tokens, documentation' },
  { name: 'Front-end build', note: 'Production-ready, animated' },
]

export default function Services() {
  const title = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      // Words fill in as you scroll
      gsap.to('.words span', {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: title.current, start: 'top 80%', end: 'bottom 40%', scrub: true },
      })
    }, title)
    return () => ctx.revert()
  }, [])

  return (
    <section className="services" id="services">
      <h2 className="words" ref={title}>
        {headline.split(' ').map((w, i) => (
          <span key={i}>{w} </span>
        ))}
      </h2>
      <div className="list">
        {services.map((s) => (
          <a className="row" href="#" key={s.name}>
            <span>{s.name}</span>
            <small>{s.note}</small>
          </a>
        ))}
      </div>
    </section>
  )
}
