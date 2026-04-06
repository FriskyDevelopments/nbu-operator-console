import { useEffect, useState } from 'react'
import { Lightning, Lock, Clock } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface Session {
  id: string
  platform: string
  status: 'ACTIVE' | 'WAITING' | 'LOCKED'
  participants: number
  uptime: string
}

export default function SessionStatus() {
  const [sessions, setSessions] = useState<Session[]>([
    { id: 'session-01', platform: 'Zoom', status: 'ACTIVE', participants: 12, uptime: '00:42:15' },
    { id: 'session-02', platform: 'Discord', status: 'ACTIVE', participants: 8, uptime: '01:15:30' },
    { id: 'session-03', platform: 'Telegram', status: 'WAITING', participants: 3, uptime: '00:00:00' },
    { id: 'session-04', platform: 'Zoom', status: 'LOCKED', participants: 0, uptime: '00:00:00' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSessions(prev =>
        prev.map((session, idx) => {
          if (idx === 1 && session.status === 'ACTIVE') {
            return { ...session, participants: Math.floor(Math.random() * 5) + 6 }
          }
          return session
        })
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: Session['status']) => {
    if (status === 'ACTIVE') return <Lightning size={14} weight="fill" className="text-primary" />
    if (status === 'WAITING') return <Clock size={14} weight="regular" className="text-accent" />
    return <Lock size={14} weight="regular" className="text-destructive" />
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="space-y-2">
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            className="glass-panel rounded-lg p-4 hover:bg-white/[0.04] transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(session.status)}
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    {session.id}
                  </span>
                </div>
                
                <div className="h-4 w-px bg-border" />
                
                <span className="text-sm text-foreground/80 font-body">
                  {session.platform}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground font-mono tabular-nums">
                  {session.participants} users
                </span>
                
                <span className="text-sm text-muted-foreground font-mono tabular-nums">
                  {session.uptime}
                </span>
                
                <Badge
                  variant={
                    session.status === 'ACTIVE'
                      ? 'default'
                      : session.status === 'WAITING'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className={`text-[10px] px-2 py-0.5 min-w-[64px] justify-center ${
                    session.status === 'ACTIVE'
                      ? 'bg-primary/20 text-primary border-primary/30'
                      : session.status === 'WAITING'
                      ? 'bg-accent/20 text-accent border-accent/30'
                      : 'bg-destructive/20 text-destructive border-destructive/30'
                  }`}
                >
                  {session.status}
                </Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
