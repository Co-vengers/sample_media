import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const el = useRef(null)

  useEffect(() => {
    const cx = gsap.quickTo(el.current, 'x', { duration: 0.25, ease: 'power3' })
    const cy = gsap.quickTo(el.current, 'y', { duration: 0.25, ease: 'power3' })

    const move = (e) => {
      cx(e.clientX)
      cy(e.clientY)
    }
    // Event delegation: works for every link/button, including ones added later
    const over = (e) => {
      if (e.target.closest('a,button')) gsap.to(el.current, { scale: 3.5, duration: 0.3 })
    }
    const out = (e) => {
      if (e.target.closest('a,button')) gsap.to(el.current, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
    }
  }, [])

  return <div className="cursor" ref={el} />
}
