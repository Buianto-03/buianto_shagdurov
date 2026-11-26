import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { useReducedMotion } from '../../shared/hooks/useReducedMotion'
import styles from './EngineeringSection.module.scss'

const aspects = [
  {
    id: 'interfaces',
    title: 'Interfaces',
    points: [
      'Responsive layouts for search, booking and dashboards.',
      'Form validation and client-side state in React.',
      'Faster first loads with SSR, code splitting and lazy loading.',
    ],
  },
  {
    id: 'apis',
    title: 'APIs',
    points: [
      'REST APIs for product features and internal CRM integrations.',
      'Server-side filtering and pagination for large result sets.',
      'Smaller payloads and cached queries for repeat searches.',
    ],
  },
  {
    id: 'business-logic',
    title: 'Business logic',
    points: [
      'Model the agent loyalty workflow.',
      'Design backend modules for the loyalty widget.',
      'Introduce testing standards with Jest, Cypress and TDD.',
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    points: [
      'Design PostgreSQL schemas around product relationships.',
      'Optimize queries for search and filtering.',
      'Aggregate data from multiple sources for operational reports.',
    ],
  },
] as const

function aspectFromHash() {
  return aspects.findIndex(({ id }) => window.location.hash === `#${id}`)
}

function clampProgress(value: number) {
  return Math.max(0, Math.min(value, 1))
}

function Illustration({ aspect }: { aspect: typeof aspects[number]['id'] }) {
  switch (aspect) {
    case 'interfaces':
      return (
        <div className={styles.devices}>
          {['desktop', 'phone'].map((device) => (
            <div key={device} className={styles[device]}>
              <strong>Find a tour</strong>
              <img src="/images/journey.webp" alt="" loading="lazy" />
              <small>Mountain routes</small>
            </div>
          ))}
        </div>
      )
    case 'apis':
      return (
        <div className={styles.exchange}>
          <div><span>Request</span><code>GET /tours?page=2</code></div>
          <div><span>Response</span><code>200 OK<br />{'{ items: […], next: 3 }'}</code></div>
        </div>
      )
    case 'business-logic':
      return (
        <div className={styles.decision}>
          <strong>Eligible deal?</strong>
          <div className={styles.branches}>
            <span><small>Yes</small>Credit reward</span>
            <span><small>No</small>Skip reward</span>
          </div>
        </div>
      )
    case 'databases':
      return (
        <div className={styles.schema}>
          <div><strong>agents</strong><code>id <b>PK</b></code></div>
          <span className={styles.relation}>1 : N</span>
          <div><strong>deals</strong><code>id <b>PK</b></code><code>agent_id <b>FK</b></code></div>
        </div>
      )
  }
}

export function EngineeringSection() {
  const content = useRef<HTMLDivElement>(null)
  const markers = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(() => Math.max(0, aspectFromHash()))
  const [fits, setFits] = useState(true)
  const reducedMotion = useReducedMotion()
  const pinned = fits && !reducedMotion

  useLayoutEffect(() => {
    const panel = content.current
    if (!panel) return
    const measure = () => {
      setFits(panel.offsetHeight + 32 <= window.innerHeight)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(panel)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    const index = aspectFromHash()
    if (index < 0) return
    const target = markers.current!.children[index]
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start', behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const timeline = markers.current
    if (!timeline) return
    const first = timeline.firstElementChild as HTMLElement
    const last = timeline.lastElementChild as HTMLElement
    let frame = 0
    let distance = 0
    let previousIndex = -1

    const update = () => {
      frame = 0
      if (!distance) return
      const progress = clampProgress(-timeline.getBoundingClientRect().top / distance)
      const index = Math.round(progress * (aspects.length - 1))
      if (index === previousIndex) return
      previousIndex = index
      setActive(index)
    }
    function queue() {
      if (!frame && distance > 0) frame = requestAnimationFrame(update)
    }
    function measure() {
      distance = last.offsetTop - first.offsetTop
      queue()
    }
    function selectFromHash() {
      const index = aspectFromHash()
      if (index >= 0) setActive(index)
    }
    if (!pinned) {
      window.addEventListener('hashchange', selectFromHash)
      return () => window.removeEventListener('hashchange', selectFromHash)
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', queue, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', queue)
    }
  }, [pinned])

  return (
    <section className={styles.section} aria-labelledby="engineering-title">
      <div
        className={styles.sequence}
        data-pinned={pinned}
        style={{ '--transitions': aspects.length - 1 } as CSSProperties}
      >
        <div className={styles.markers} ref={markers} aria-hidden="true">
          {aspects.map(({ id }) => <div key={id} id={id} className={styles.marker} />)}
        </div>
        <div className={styles.stage}>
          <div className={styles.content} ref={content}>
            <div className={styles.intro}>
              <h2 id="engineering-title">From interface<br />to <span>data.</span></h2>
              <p>I build the screens people use, the APIs they call, the rules behind each action and the data models that connect them.</p>
              <nav aria-label="Engineering disciplines">
                {aspects.map(({ id, title }, index) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={active === index ? 'location' : undefined}
                    onClick={(event) => {
                      if (!pinned && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) setActive(index)
                    }}
                  >
                    {title}
                  </a>
                ))}
              </nav>
            </div>
            <div className={styles.studies}>
              {aspects.map(({ id, title, points }, index) => (
                <article key={id} className={styles.study} data-active={active === index} inert={active !== index}>
                  <div className={styles.art} aria-hidden="true"><Illustration aspect={id} /></div>
                  <h3>{title}</h3>
                  <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
