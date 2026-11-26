import { useEffect, useRef } from 'react'
import { profile } from '../../content/profile'
import styles from './Footer.module.scss'

export function Footer() {
  const { email, profiles } = profile.contact
  const footer = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.location.hash === '#contact') {
      footer.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
  }, [])

  return (
    <footer id="contact" ref={footer} className={styles.footer}>
      <h2 className={styles.heading}>Get in touch<span>.</span></h2>
      <address className={styles.contact}>
        <a className={styles.email} href={`mailto:${email}`}>
          <span>{email}</span>
          <span className={styles.arrow} aria-hidden="true" />
        </a>
        <nav className={styles.profiles} aria-label="Social profiles">
          {profiles.map(({ label, href }) => (
            <a key={label} href={href}>
              {label} <span className={styles.arrow} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </address>
      <div className={styles.signature}>
        <span>{profile.name} · Product Atlas</span>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  )
}
