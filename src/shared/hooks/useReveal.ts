import { useEffect, useRef, type RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'
import styles from './useReveal.module.scss'

export function useReveal<T extends HTMLElement>(target?: RefObject<T | null>) {
  const ownRef = useRef<T>(null)
  const ref = target ?? ownRef
  const revealed = useRef(false)
  const reduced = useReducedMotion()
  useEffect(() => {
    const element = ref.current
    if (!element || revealed.current) return
    if (reduced || !('IntersectionObserver' in window)) {
      revealed.current = true
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || revealed.current) return
        revealed.current = true
        element.classList.add(styles.enter)
        observer.disconnect()
      },
      { threshold: 0.08 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      element.classList.remove(styles.enter)
    }
  }, [reduced, ref])
  return ref
}
