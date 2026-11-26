import { projects } from '../../content/projects'
import { BookingDemo } from '../../features/booking-demo/BookingDemo'
import { LoyaltyDemo } from '../../features/loyalty-demo/LoyaltyDemo'
import { ReportCalculator } from '../../features/report-calculator/ReportCalculator'
import { caseTarget, setCaseOpen } from './caseDisclosure'
import { useCaseNavigation } from './useCaseNavigation'
import styles from './CaseStudiesSection.module.scss'

export function CaseStudiesSection() {
  useCaseNavigation()
  return (
    <section id="work" className={styles.section} aria-labelledby="cases-title">
      <div className={styles.heading}>
        <h2 id="cases-title">
          Case <span>notes.</span>
        </h2>
        <span>03 PROJECTS</span>
      </div>
      {projects.map((project, index) => (
        <details key={project.id} id={project.id} className={styles.case}>
          <summary onClick={(event) => {
            event.preventDefault()
            const element = event.currentTarget.parentElement
            if (element instanceof HTMLDetailsElement) setCaseOpen(element, !caseTarget(element))
          }}>
            <span className={styles.number}>0{index + 1}</span>
            <span className={styles.title}>
              {project.title}
              <small>
                {project.company} · {project.domain}
              </small>
            </span>
            <span className={styles.metric}>
              {project.outcome.value}
              <small>{project.outcome.description}</small>
            </span>
            <span className={styles.plus} aria-hidden="true"><span>↗</span><span>−</span></span>
          </summary>
          <div className={styles.detail}>
            <div className={styles.copy}>
              <h3>Context & role</h3>
              <p>{project.summary}</p>
              <h3>What I worked on</h3>
              {project.responsibilities.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <ul aria-label="Technologies and disciplines">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <p className={styles.result}>
                Result{' '}
                <strong>
                  {project.outcome.value} {project.outcome.description}
                </strong>
              </p>
            </div>
            {project.id === 'domclick' ? (
              <LoyaltyDemo />
            ) : project.id === 'tripster' ? (
              <BookingDemo />
            ) : (
              <ReportCalculator />
            )}
          </div>
        </details>
      ))}
    </section>
  )
}
