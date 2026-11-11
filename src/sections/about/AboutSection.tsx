import { profile } from '../../content/profile'
import { useReveal } from '../../shared/hooks/useReveal'
import styles from './AboutSection.module.scss'

export function AboutSection() {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      id="profile"
      className={styles.about}
      aria-labelledby="about-title"
      ref={ref}
    >
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
          <p className={styles.role}>Full-stack JavaScript engineer</p>
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
