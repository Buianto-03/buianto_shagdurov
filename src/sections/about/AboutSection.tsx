import { useEffect, useRef } from 'react'
import { profile } from '../../content/profile'
import styles from './AboutSection.module.scss'

export function AboutSection() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!section.current || typeof IntersectionObserver === 'undefined') return

    const blocks = [...section.current.children]
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.replace(styles.waiting, styles.revealed)
        } else {
          entry.target.classList.remove(styles.revealed)
          entry.target.classList.add(styles.waiting)
        }
      }
    })

    for (const block of blocks) {
      observer.observe(block)
    }

    return () => {
      observer.disconnect()
      for (const block of blocks) {
        block.classList.remove(styles.waiting, styles.revealed)
      }
    }
  }, [])

  return (
    <section ref={section} id="profile" className={styles.about} aria-labelledby="about-title">
      <div className={styles.heading}>
        <h2 id="about-title">
          About <span>me.</span>
        </h2>
        <span>01 / BELGRADE, RS</span>
      </div>
      <div className={styles.bio}>
        <div>
          <h3>
            {profile.firstName}
            <br />
            {profile.lastName}
          </h3>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.languages}>
            {profile.languages.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
        <div className={styles.story}>
          <p className={styles.lead}>{profile.lead}</p>
          {profile.story.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <h3>Experience</h3>
        <div className={styles.experience}>
          {profile.experience.map((item) => (
            <article key={item.company}>
              <h4>{item.company}</h4>
              <p>{item.role}</p>
              <small>{item.period}</small>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <h3>Selected highlights</h3>
        <div className={styles.highlights}>
          {profile.highlights.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <h3>Technology stack</h3>
        <dl className={styles.stack}>
          {profile.technologies.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
