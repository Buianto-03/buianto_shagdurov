import { useEffect, useId, useRef } from 'react'
import { useReducedMotion } from '../../shared/hooks/useReducedMotion'
import { useLoyaltyDemo } from './useLoyaltyDemo'
import { LoyaltyCard } from './LoyaltyCard'
import { LoyaltyLayers } from './LoyaltyLayers'
import { useLayerReveal } from './useLayerReveal'
import styles from './LoyaltyDemo.module.scss'

export function LoyaltyDemo() {
  const { ref, expanded, toggle } = useLayerReveal()
  const id = useId()
  const { stage, running, run } = useLoyaltyDemo()
  const reduced = useReducedMotion()
  const stack = useRef<HTMLDivElement>(null)
  const signal = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const root = stack.current
    const dot = signal.current
    if (!root || !dot || !expanded || reduced || stage === 'idle' || window.matchMedia('(max-width: 720px)').matches) return
    const routes = {
      'deal-completed': ['ui', 'api'],
      'rules-checked': ['business', 'database'],
      'reward-credited': ['database', 'ui'],
    }
    const [from, to] = routes[stage].map((name) => root.querySelector<HTMLElement>(`[data-layer="${name}"]`))
    if (!from || !to) return
    const bounds = root.getBoundingClientRect()
    const point = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect()
      return { x: rect.right - bounds.left - 24, y: rect.bottom - bounds.top - 16 }
    }
    const start = point(from)
    const end = point(to)
    const animation = dot.animate([
      { transform: `translate(${start.x}px, ${start.y}px) scale(.7)`, opacity: 0 },
      { opacity: 1, offset: 0.15 },
      { transform: `translate(${end.x}px, ${end.y}px) scale(1)`, opacity: 0 },
    ], { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
    const stop = () => animation.cancel()
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop() })
    observer.observe(root)
    const onVisibility = () => { if (document.hidden) stop() }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', stop)
    window.addEventListener('scroll', stop, { passive: true })
    return () => { stop(); observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); window.removeEventListener('resize', stop); window.removeEventListener('scroll', stop) }
  }, [stage, expanded, reduced])
  return (
    <figure className={styles.lab} id="plate" aria-labelledby={`${id}-title`}>
      <div className={styles.head}>
        <span id={`${id}-title`}>Domclick / Agent rewards</span>
        <span className={styles.badge}>Demo</span>
      </div>
      <div className={styles.scene} ref={ref}>
        <div className={styles.stack} id={`${id}-layers`} ref={stack}>
          <LoyaltyLayers stage={stage} expanded={expanded} />
          <LoyaltyCard stage={stage} running={running} run={run} />
          <span ref={signal} className={styles.signal} aria-hidden="true" />
        </div>
      </div>
      <figcaption className={styles.foot}>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={`${id}-layers`}
        >
          {expanded ? 'Reassemble' : 'Inspect layers'}{' '}
          <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
        <span>UI / API / Logic / Data</span>
      </figcaption>
      <p className={styles.disclaimer}>
        Illustrative interaction · simplified loyalty workflow
      </p>
    </figure>
  )
}
