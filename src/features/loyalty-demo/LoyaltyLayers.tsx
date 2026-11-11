import styles from './LoyaltyLayers.module.scss'

const layers = [
  { label: 'Data model', tech: 'PostgreSQL', className: 'database' },
  { label: 'Business logic', tech: 'Reward rules', className: 'business' },
  { label: 'Rewards API', tech: 'NestJS', className: 'api' },
]

export function LoyaltyLayers() {
  return (
    <>
      {layers.map((layer) => (
        <div
          key={layer.className}
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
