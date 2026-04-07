import { motion } from 'framer-motion'
import { ArrowRight, Users } from '@phosphor-icons/react'

interface FlowData {
  label: string
  count: number
  color: string
  percentage: number
}

export default function ParticipantFlow() {
  const flowData: FlowData[] = [
    { label: 'Joined', count: 127, color: 'oklch(0.90 0.27 142)', percentage: 100 },
    { label: 'Admitted', count: 108, color: 'oklch(0.75 0.25 142)', percentage: 85 },
    { label: 'Active', count: 87, color: 'oklch(0.65 0.23 142)', percentage: 68 },
    { label: 'Left', count: 21, color: 'oklch(0.60 0 0)', percentage: 16 },
  ]

  return (
    <div className="glass-panel rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users size={20} className="text-primary" weight="bold" />
        <h3 className="font-display text-lg font-semibold text-foreground uppercase tracking-wide">
          Participant Flow
        </h3>
      </div>

      <div className="space-y-4">
        {flowData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: item.color,
                    border: `1px solid ${item.color}`,
                  }}
                />
                <span className="text-sm text-foreground/90 font-body">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-display font-bold text-foreground">
                  {item.count}
                </span>
                <span className="text-xs font-mono text-muted-foreground tabular-nums min-w-[40px] text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>

            <div className="relative h-2 bg-white/[0.02] rounded-full overflow-hidden border border-white/[0.08]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  backgroundColor: item.color,
                  opacity: 0.4,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
              />
            </div>

            {index < flowData.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowRight size={14} className="text-muted-foreground" weight="bold" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/[0.08]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
              Retention Rate
            </p>
            <p className="text-2xl font-display font-bold text-primary">
              81%
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
              In Waiting Room
            </p>
            <p className="text-2xl font-display font-bold text-accent">
              8
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
