import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from '../utils.js'

gsap.registerPlugin(ScrollTrigger)

const items = ['Healthcare', 'eCommerce', 'SaaS', 'Fintech']

export default function Marquee() {
  const root = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      const loop = gsap.to(track.current, { xPercent: -50, duration: 25, ease: 'none', repeat: -1 })
      // Speeds up with scroll velocity, then eases back to normal
      ScrollTrigger.create({
        onUpdate: (self) => {
          gsap.to(loop, { timeScale: 1 + Math.abs(self.getVelocity()) / 300, duration: 0.2, overwrite: true })
          gsap.to(loop, { timeScale: 1, duration: 1, delay: 0.2 })
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // Content is repeated twice so xPercent: -50 loops seamlessly
  const row = [...items, ...items]
  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="track" ref={track}>
        {row.map((t, i) => (
          <span key={i} className="item">
            <span>{t}</span>
            <i>●</i>
          </span>
        ))}
      </div>
    </div>
  )
}
