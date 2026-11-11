import { useEffect, useRef } from 'react'
import styles from './DataTerrain.module.scss'

export function DataTerrain() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    function draw() {
      if (!canvas) return
      const { width: w, height: h } = canvas.getBoundingClientRect()
      if (!w || !h) return
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * scale)
      canvas.height = Math.round(h * scale)
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(scale, scale)
      const sky = ctx.createLinearGradient(0, 0, w * 0.8, h)
      sky.addColorStop(0, '#0d1722')
      sky.addColorStop(0.52, '#193442')
      sky.addColorStop(1, '#140f1b')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, h)
      for (let row = 0; row < 100; row++) {
        const t = row / 99
        ctx.beginPath()
        for (let col = 0; col <= 210; col++) {
          const x = col / 210
          const dx = x - 0.63 - 0.16 * Math.sin(t * 5.7)
          const ridge =
            Math.exp(-dx * dx * 15) * (0.48 + 0.5 * Math.sin(t * 3.05))
          const ripple =
            Math.sin(x * 23 + t * 7) * Math.cos(t * 10 + x * 6) * 0.065 +
            Math.sin(x * 43 + t * 3) * 0.024
          const y = h * (0.47 + t * 0.67 - ridge * 0.51 - ripple)
          if (!col) ctx.moveTo(0, y)
          else ctx.lineTo(x * w, y)
        }
        ctx.strokeStyle = `hsl(${25 + t * 16} 78% ${45 + Math.sin(t * Math.PI) * 30}%)`
        ctx.lineWidth = Math.max(0.65, w / 1250)
        ctx.stroke()
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        ctx.fillStyle = '#102531'
        ctx.fill()
      }
    }
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    draw()
    return () => observer.disconnect()
  }, [])
  return (
    <canvas
      ref={ref}
      className={styles.canvas}
      role="img"
      aria-label="Illustrated wave field representing industrial data"
    />
  )
}
