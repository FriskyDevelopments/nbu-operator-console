import { motion } from 'framer-motion'
import { Users, Clock, TrendUp, Lightning, Record, Hand, Microphone, MicrophoneSlash } from '@phosphor-icons/react'
import MetricCard from './MetricCard'
import SessionTimeline from './SessionTimeline'
import ParticipantFlow from './ParticipantFlow'
import LiveActivityGraph from './LiveActivityGraph'

interface AnalyticsDashboardProps {
  sessionId: string
}

export default function AnalyticsDashboard({ sessionId }: AnalyticsDashboardProps) {
  const metrics = [
    {
      label: 'Total Participants',
      value: '127',
      change: '+12',
      changeType: 'positive' as const,
      icon: Users,
      trend: [45, 52, 48, 58, 65, 78, 92, 105, 115, 120, 127],
    },
    {
      label: 'Peak Concurrent',
      value: '89',
      sublabel: 'at 14:32',
      icon: TrendUp,
      trend: [32, 45, 52, 61, 72, 81, 89, 85, 78, 72, 68],
    },
    {
      label: 'Avg Session Time',
      value: '42m',
      change: '+8m',
      changeType: 'positive' as const,
      icon: Clock,
      trend: [28, 30, 32, 35, 38, 40, 41, 42, 42, 42, 42],
    },
    {
      label: 'Hand Raises',
      value: '34',
      sublabel: '12 resolved',
      icon: Hand,
      trend: [2, 5, 8, 12, 15, 18, 22, 26, 30, 32, 34],
    },
    {
      label: 'Waiting Room',
      value: '8',
      change: '+3',
      changeType: 'neutral' as const,
      icon: Clock,
      trend: [0, 2, 3, 5, 4, 6, 5, 7, 8, 8, 8],
    },
    {
      label: 'Recording Time',
      value: '1h 28m',
      sublabel: 'active',
      icon: Record,
      trend: [0, 15, 30, 45, 60, 75, 88, 88, 88, 88, 88],
    },
  ]

  const audioMetrics = {
    muted: 64,
    unmuted: 23,
    total: 87,
  }

  return (
    <div className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground uppercase mb-2">
            Session Analytics
          </h2>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            {sessionId} — Real-time Telemetry
          </p>
        </div>
        <div className="glass-panel rounded-md px-4 py-2 flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-[pulse-glow_3s_ease-in-out_infinite]" />
            <Lightning size={16} className="text-primary relative" weight="bold" />
          </div>
          <span className="text-sm font-mono text-foreground uppercase tracking-wider">Live</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass-panel rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground uppercase tracking-wide">
            Audio States
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MicrophoneSlash size={14} className="text-muted-foreground" weight="bold" />
              <span className="text-sm font-mono text-muted-foreground">{audioMetrics.muted}</span>
            </div>
            <div className="flex items-center gap-2">
              <Microphone size={14} className="text-primary" weight="bold" />
              <span className="text-sm font-mono text-foreground">{audioMetrics.unmuted}</span>
            </div>
          </div>
        </div>
        <div className="relative h-4 bg-white/[0.02] rounded-full overflow-hidden border border-white/[0.08]">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary/30 border-r border-primary/50"
            initial={{ width: 0 }}
            animate={{ width: `${(audioMetrics.unmuted / audioMetrics.total) * 100}%` }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-y-0 bg-white/[0.08]"
            initial={{ left: 0, width: 0 }}
            animate={{ 
              left: `${(audioMetrics.unmuted / audioMetrics.total) * 100}%`,
              width: `${(audioMetrics.muted / audioMetrics.total) * 100}%`
            }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-xs font-mono text-muted-foreground">
            {Math.round((audioMetrics.unmuted / audioMetrics.total) * 100)}% Active Speakers
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {Math.round((audioMetrics.muted / audioMetrics.total) * 100)}% Muted
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <LiveActivityGraph />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <SessionTimeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <ParticipantFlow />
        </motion.div>
      </div>
    </div>
  )
}
