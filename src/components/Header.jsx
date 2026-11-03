import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const overlay = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    gsap.to(overlay.current, {
      clipPath: open
        ? 'circle(150% at calc(100% - 60px) 30px)'
        : 'circle(0% at calc(100% - 60px) 30px)',
      duration: 0.9,
      ease: 'expo.inOut',
    })
    gsap.to('.overlay a span', open
      ? { y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08, delay: 0.35 }
      : { y: '110%', duration: 0.3 })
  }, [open])

  return (
    <>
      <header>
        <a href="#" className="logo">northwind</a>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="overlay"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <nav className={`overlay${open ? ' open' : ''}`} id="overlay" ref={overlay} aria-label="Main">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            <span>{l.label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
