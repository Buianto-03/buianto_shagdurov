import type { CSSProperties } from 'react'
import { projects } from '../../content/projects'
import { DataTerrain } from './DataTerrain'
import { useProjectGallery } from './useProjectGallery'
import styles from './ProjectGallery.module.scss'

export function ProjectGallery() {
  const { root, stage, active, manual, select } = useProjectGallery(
    projects.length,
  )
  const current = projects[active]
  const manualStyle = manual
    ? ({
        '--shift': `${-active * 100}%`,
        '--length': `${((active + 1) / projects.length) * 100}%`,
      } as CSSProperties)
    : undefined
  return (
    <div
      id="reel"
      ref={root}
      className={styles.reel}
      data-manual={manual}
      style={manualStyle}
    >
      <div ref={stage} className={styles.stage}>
        <div className={styles.heading}>
          <h2 id="reel-title">Selected projects</h2>
          <span>Work index / 01—03</span>
        </div>
        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.meter}>
              <span>{String(active + 1).padStart(2, '0')}</span>
              <span>/ 03</span>
            </div>
            <div
              className={styles.nav}
              role="group"
              aria-label="Project frames"
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => select(index)}
                  aria-pressed={index === active}
                  aria-controls="project-frames"
                >
                  <span>N.0{index + 1}</span>
                  {project.title}
                </button>
              ))}
            </div>
            <a className={styles.explore} href={`#${current.id}`}>
              Explore this case <span aria-hidden="true">↗</span>
              <span className={styles.srOnly}>: {current.title}</span>
            </a>
          </div>
          <div className={styles.window}>
            <div id="project-frames" className={styles.track}>
              {projects.map((project, index) => (
                <figure
                  key={project.id}
                  className={`${styles.frame} ${index === 0 ? styles.property : ''}`}
                  aria-hidden={index !== active}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      width="1500"
                      height="1000"
                      loading="lazy"
                    />
                  ) : (
                    <DataTerrain />
                  )}
                  <div className={styles.outcome}>
                    <span>{project.title}</span>
                    <strong>{project.outcome.value}</strong>
                    <span>{project.outcome.description}</span>
                  </div>
                  <figcaption>
                    <span>{project.company}</span>
                    <span>{project.domain}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className={styles.trackMeter} aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
