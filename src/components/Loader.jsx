import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reduceMotion } from '../utils.js'

export default function Loader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (reduceMotion()) {
      setGone(true)
      onDone()
      return
    }
    const n = { v: 0 }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            setGone(true)
            onDone()
          },
        })
        .to(n, {
          v: 100,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = Math.round(n.v)
          },
        })
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '+=0.15')
    }, root)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null
  return (
    <div className="loader" ref={root} aria-hidden="true">
      <span>Loading studio</span>
      <b ref={count}>0</b>
    </div>
  )
}
