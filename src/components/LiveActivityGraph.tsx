import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChartLine } from '@phosphor-icons/react'

interface DataPoint {
  time: string
  participants: number
  handRaises: number
  waitingRoom: number
}

export default function LiveActivityGraph() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { time: '14:00', participants: 32, handRaises: 2, waitingRoom: 0 },
    { time: '14:05', participants: 45, handRaises: 5, waitingRoom: 2 },
    { time: '14:10', participants: 52, handRaises: 3, waitingRoom: 1 },
    { time: '14:15', participants: 61, handRaises: 8, waitingRoom: 3 },
    { time: '14:20', participants: 72, handRaises: 4, waitingRoom: 2 },
    { time: '14:25', participants: 81, handRaises: 6, waitingRoom: 4 },
    { time: '14:30', participants: 89, handRaises: 12, waitingRoom: 5 },
    { time: '14:35', participants: 85, handRaises: 7, waitingRoom: 3 },
    { time: '14:40', participants: 78, handRaises: 3, waitingRoom: 1 },
    { time: '14:45', participants: 72, handRaises: 5, waitingRoom: 2 },
    { time: '14:50', participants: 68, handRaises: 2, waitingRoom: 1 },
  ])

  const maxParticipants = Math.max(...dataPoints.map(d => d.participants))
  const graphHeight = 180

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newData = [...prev.slice(1)]
        const lastPoint = prev[prev.length - 1]
        const newParticipants = Math.max(20, Math.min(100, lastPoint.participants + Math.floor(Math.random() * 11) - 5))
        const hours = Math.floor(newData.length * 5 / 60) + 14
        const minutes = (newData.length * 5) % 60
        newData.push({
          time: `${hours}:${minutes.toString().padStart(2, '0')}`,
          participants: newParticipants,
          handRaises: Math.floor(Math.random() * 10),
          waitingRoom: Math.floor(Math.random() * 6),
        })
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-panel rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ChartLine size={20} className="text-primary" weight="bold" />
          <h3 className="font-display text-lg font-semibold text-foreground uppercase tracking-wide">
            Participant Activity
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary/30 border border-primary/50" />
            <span className="text-xs font-mono text-muted-foreground">Participants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-accent/30 border border-accent/50" />
            <span className="text-xs font-mono text-muted-foreground">Hand Raises</span>
          </div>
        </div>
      </div>

      <div className="relative" style={{ height: graphHeight }}>
        <svg className="w-full h-full" viewBox={`0 0 ${dataPoints.length * 60} ${graphHeight}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="participantsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.90 0.27 142)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="oklch(0.90 0.27 142)" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="handRaisesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.24 286)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="oklch(0.55 0.24 286)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <motion.path
            d={`M 0,${graphHeight} ${dataPoints.map((d, i) => 
              `L ${i * 60 + 30},${graphHeight - (d.participants / maxParticipants) * (graphHeight - 20)}`
            ).join(' ')} L ${(dataPoints.length - 1) * 60 + 30},${graphHeight} Z`}
            fill="url(#participantsGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          <motion.path
            d={`M ${dataPoints.map((d, i) => 
              `${i * 60 + 30},${graphHeight - (d.participants / maxParticipants) * (graphHeight - 20)}`
            ).join(' L ')}`}
            fill="none"
            stroke="oklch(0.90 0.27 142)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          <motion.path
            d={`M ${dataPoints.map((d, i) => 
              `${i * 60 + 30},${graphHeight - (d.handRaises / 15) * (graphHeight - 20)}`
            ).join(' L ')}`}
            fill="none"
            stroke="oklch(0.55 0.24 286)"
            strokeWidth="2"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          />

          {dataPoints.map((d, i) => (
            <motion.circle
              key={i}
              cx={i * 60 + 30}
              cy={graphHeight - (d.participants / maxParticipants) * (graphHeight - 20)}
              r="3"
              fill="oklch(0.90 0.27 142)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
            />
          ))}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
          {dataPoints.filter((_, i) => i % 2 === 0).map((d, i) => (
            <span key={i} className="text-[10px] font-mono text-muted-foreground">
              {d.time}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Current
          </p>
          <p className="text-2xl font-display font-bold text-foreground">
            {dataPoints[dataPoints.length - 1].participants}
          </p>
        </div>
        <div className="text-center border-l border-r border-white/[0.08]">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Peak
          </p>
          <p className="text-2xl font-display font-bold text-foreground">
            {maxParticipants}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Avg
          </p>
          <p className="text-2xl font-display font-bold text-foreground">
            {Math.round(dataPoints.reduce((sum, d) => sum + d.participants, 0) / dataPoints.length)}
          </p>
        </div>
      </div>
    </div>
  )
}
