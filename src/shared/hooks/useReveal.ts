import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const revealed = useRef(false)
  const reduced = useReducedMotion()
  useEffect(() => {
    const element = ref.current
    if (!element || revealed.current) return
    if (reduced || !('IntersectionObserver' in window)) {
      revealed.current = true
      return
    }
    let animation: Animation | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        revealed.current = true
        animation = element.animate(
          [
            { opacity: 0.55, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 450, easing: 'ease-out' },
        )
        observer.disconnect()
      },
      { threshold: 0.08 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      animation?.cancel()
    }
  }, [reduced])
  return ref
}
