import type { LoyaltyStage } from './types'
import styles from './LoyaltyLayers.module.scss'

const layers = [
  { label: 'Data model', tech: 'PostgreSQL', className: 'database' },
  { label: 'Business logic', tech: 'Reward rules', className: 'business' },
  { label: 'Rewards API', tech: 'NestJS', className: 'api' },
]

export function LoyaltyLayers({ stage, expanded }: { stage: LoyaltyStage; expanded: boolean }) {
  return (
    <>
      {layers.map((layer) => (
        <div
          key={layer.className}
          data-layer={layer.className}
          data-active={expanded && ((stage === 'deal-completed' && layer.className === 'api') || (stage === 'rules-checked' && (layer.className === 'business' || layer.className === 'database'))) ? '' : undefined}
          className={`${styles.layer} ${styles[layer.className]}`}
        >
          <div>
            <span>{layer.label}</span>
            <strong>{layer.tech}</strong>
          </div>
        </div>
      ))}
    </>
  )
}
