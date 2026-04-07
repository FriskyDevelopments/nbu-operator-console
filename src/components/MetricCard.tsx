import { motion } from 'framer-motion'
import { Icon } from '@phosphor-icons/react'

interface MetricCardProps {
  label: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  sublabel?: string
  icon: Icon
  trend?: number[]
}

export default function MetricCard({ 
  label, 
  value, 
  change, 
  changeType = 'neutral', 
  sublabel, 
  icon: IconComponent,
  trend = []
}: MetricCardProps) {
  const maxValue = Math.max(...trend)
  const normalizedTrend = trend.map(v => (v / maxValue) * 100)

  const changeColors = {
    positive: 'text-primary',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground',
  }

  return (
    <div className="glass-panel rounded-lg p-5 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-2">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-display font-bold text-foreground">
              {value}
            </p>
            {change && (
              <span className={`text-sm font-mono ${changeColors[changeType]}`}>
                {change}
              </span>
            )}
          </div>
          {sublabel && (
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {sublabel}
            </p>
          )}
        </div>
        <div className="glass-panel rounded-md p-2">
          <IconComponent size={18} className="text-primary" weight="bold" />
        </div>
      </div>

      {trend.length > 0 && (
        <div className="relative h-12 flex items-end gap-0.5">
          {normalizedTrend.map((height, index) => (
            <motion.div
              key={index}
              className="flex-1 bg-primary/20 rounded-sm relative overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.02, duration: 0.3, ease: 'easeOut' }}
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
