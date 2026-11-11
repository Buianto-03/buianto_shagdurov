import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../shared/hooks/useReducedMotion'
import { useMediaQuery } from '../../shared/hooks/useMediaQuery'

const clamp = (value: number) => Math.min(1, Math.max(0, value))

export function useProjectGallery(count: number) {
  const root = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const shortViewport = useMediaQuery('(max-height: 500px)')
  const manual = reduced || shortViewport

  useEffect(() => {
    const element = root.current
    const sticky = stage.current
    if (!element || !sticky || manual) return
    let frame = 0
    const update = () => {
      frame = 0
      const bounds = element.getBoundingClientRect()
      const travel = Math.max(1, bounds.height - sticky.offsetHeight)
      const position = clamp(-bounds.top / travel) * (count - 1)
      const index = Math.round(position)
      const fraction = clamp(((position % 1) - 0.12) / 0.76)
      const eased = fraction * fraction * (3 - 2 * fraction)
      element.style.setProperty(
        '--shift',
        `${-100 * (Math.floor(position) + eased)}%`,
      )
      element.style.setProperty(
        '--length',
        `${((1 + position) / count) * 100}%`,
      )
      setActive(index)
    }
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    queue()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    const observer = new ResizeObserver(queue)
    observer.observe(sticky)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [count, manual])

  function select(index: number) {
    if (manual) {
      setActive(index)
      return
    }
    const element = root.current
    const sticky = stage.current
    if (!element || !sticky) return
    const travel = Math.max(0, element.offsetHeight - sticky.offsetHeight)
    const top =
      window.scrollY +
      element.getBoundingClientRect().top +
      (travel * index) / (count - 1)
    window.scrollTo({ top, behavior: 'smooth' })
  }
  return { root, stage, active, manual, select }
}
