import { useRef } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../utils.js'

export default function Cta() {
  const btn = useRef(null)

  const onMove = (e) => {
    if (reduceMotion()) return
    const r = btn.current.getBoundingClientRect()
    gsap.to(btn.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.35,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
      duration: 0.4,
      ease: 'power3',
    })
  }
  const onLeave = () =>
    gsap.to(btn.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,.4)' })

  return (
    <section className="cta" id="contact">
      <div>
        <h2>Have a project in mind?</h2>
        <a
          href="mailto:hello@example.com"
          className="magnet"
          ref={btn}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          Start a conversation
        </a>
      </div>
    </section>
  )
}
