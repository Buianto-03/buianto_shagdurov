import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../shared/hooks/useReducedMotion'

export function useLayerReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const shown = useRef(0)
  const manual = useRef<{ value: number; scroll: number } | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    let frame = 0
    const update = () => {
      frame = 0
      if (
        !reduced &&
        manual.current &&
        Math.abs(window.scrollY - manual.current.scroll) > 40
      )
        manual.current = null
      const bounds = element.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight * 0.6 - bounds.top) /
            Math.min(230, bounds.height * 0.5),
        ),
      )
      const split = manual.current?.value ?? (reduced ? 0 : progress)
      shown.current = split
      element.style.setProperty('--split', String(split))
      setExpanded(split >= 0.5)
    }
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    queue()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [reduced])

  function toggle() {
    const split = shown.current >= 0.5 ? 0 : 1
    manual.current = { value: split, scroll: window.scrollY }
    shown.current = split
    ref.current?.style.setProperty('--split', String(split))
    setExpanded(split === 1)
  }
  return { ref, expanded, toggle }
}
