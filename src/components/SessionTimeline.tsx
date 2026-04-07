import { motion } from 'framer-motion'
import { Clock, UserPlus, LockKey, Record, Hand, Microphone } from '@phosphor-icons/react'

interface TimelineEvent {
  time: string
  type: 'join' | 'admit' | 'lock' | 'record' | 'hand' | 'mute'
  description: string
  user?: string
}

export default function SessionTimeline() {
  const events: TimelineEvent[] = [
    { time: '14:52', type: 'hand', description: 'Hand raised', user: 'Sarah Kim' },
    { time: '14:50', type: 'admit', description: 'Admitted from waiting room', user: 'Mike Torres' },
    { time: '14:48', type: 'join', description: 'Joined session', user: 'Alex Chen' },
    { time: '14:45', type: 'mute', description: 'Muted all participants' },
    { time: '14:40', type: 'record', description: 'Recording started' },
    { time: '14:35', type: 'admit', description: 'Admitted 5 from waiting room' },
    { time: '14:32', type: 'join', description: 'Joined session', user: 'Jordan Park' },
    { time: '14:30', type: 'lock', description: 'Session locked' },
  ]

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'join':
        return <UserPlus size={14} weight="bold" className="text-primary" />
      case 'admit':
        return <UserPlus size={14} weight="bold" className="text-primary" />
      case 'lock':
        return <LockKey size={14} weight="bold" className="text-accent" />
      case 'record':
        return <Record size={14} weight="fill" className="text-destructive" />
      case 'hand':
        return <Hand size={14} weight="bold" className="text-primary" />
      case 'mute':
        return <Microphone size={14} weight="bold" className="text-muted-foreground" />
    }
  }

  return (
    <div className="glass-panel rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock size={20} className="text-primary" weight="bold" />
        <h3 className="font-display text-lg font-semibold text-foreground uppercase tracking-wide">
          Session Timeline
        </h3>
      </div>

      <div className="space-y-0 relative">
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/[0.08]" />
        
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="flex gap-4 relative pb-4 last:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <div className="relative flex items-start pt-1">
              <div className="glass-panel rounded-md p-2 relative z-10 border border-white/[0.12]">
                {getEventIcon(event.type)}
              </div>
            </div>

            <div className="flex-1 pt-1.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-foreground/90 font-body">
                  {event.description}
                </p>
                <span className="text-xs font-mono text-muted-foreground tabular-nums">
                  {event.time}
                </span>
              </div>
              {event.user && (
                <p className="text-xs text-muted-foreground font-mono">
                  {event.user}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
