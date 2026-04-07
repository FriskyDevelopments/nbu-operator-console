import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CaretDown, Check, ArrowsLeftRight } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import AnalyticsDashboard from './AnalyticsDashboard'

interface Session {
  id: string
  status: 'ACTIVE' | 'WAITING' | 'LOCKED' | 'ENDED'
  participants: number
  startTime: string
}

const availableSessions: Session[] = [
  { id: 'ZM-4A7B', status: 'ACTIVE', participants: 87, startTime: '13:45' },
  { id: 'ZM-8C2F', status: 'ACTIVE', participants: 42, startTime: '14:12' },
  { id: 'ZM-1D9E', status: 'WAITING', participants: 12, startTime: '14:30' },
  { id: 'ZM-6F3A', status: 'ACTIVE', participants: 156, startTime: '12:00' },
  { id: 'ZM-2B5C', status: 'ENDED', participants: 34, startTime: '11:30' },
  { id: 'ZM-9E1D', status: 'ACTIVE', participants: 68, startTime: '13:00' },
]

interface SessionComparisonViewProps {
  onClose: () => void
}

export default function SessionComparisonView({ onClose }: SessionComparisonViewProps) {
  const [selectedSessions, setSelectedSessions] = useState<string[]>(['ZM-4A7B', 'ZM-8C2F'])
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'stacked'>('side-by-side')

  const handleSessionChange = (index: number, sessionId: string) => {
    const newSessions = [...selectedSessions]
    newSessions[index] = sessionId
    setSelectedSessions(newSessions)
  }

  const addSession = () => {
    if (selectedSessions.length < 4) {
      const nextAvailable = availableSessions.find(
        s => !selectedSessions.includes(s.id) && s.status === 'ACTIVE'
      )
      if (nextAvailable) {
        setSelectedSessions([...selectedSessions, nextAvailable.id])
      }
    }
  }

  const removeSession = (index: number) => {
    if (selectedSessions.length > 1) {
      setSelectedSessions(selectedSessions.filter((_, i) => i !== index))
    }
  }

  const getSession = (id: string) => availableSessions.find(s => s.id === id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-primary'
      case 'WAITING': return 'text-accent'
      case 'LOCKED': return 'text-destructive'
      case 'ENDED': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto"
    >
      <div className="min-h-screen p-8">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground uppercase mb-2">
                Session Comparison
              </h1>
              <p className="font-body text-sm text-muted-foreground">
                Compare multiple Zoom session analytics side-by-side
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setComparisonMode(comparisonMode === 'side-by-side' ? 'stacked' : 'side-by-side')}
                className="glass-panel hover:glass-panel-hover"
              >
                <ArrowsLeftRight size={16} className="mr-2" />
                <span className="font-mono text-xs uppercase">
                  {comparisonMode === 'side-by-side' ? 'Side by Side' : 'Stacked'}
                </span>
              </Button>
              
              {selectedSessions.length < 4 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addSession}
                  className="glass-panel hover:glass-panel-hover"
                >
                  <span className="font-mono text-xs uppercase">+ Add Session</span>
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="glass-panel hover:glass-panel-hover"
              >
                <X size={20} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-4 flex-wrap">
              {selectedSessions.map((sessionId, index) => {
                const session = getSession(sessionId)
                if (!session) return null

                return (
                  <div
                    key={`${sessionId}-${index}`}
                    className="flex items-center gap-3 glass-panel rounded-md px-4 py-3 min-w-[280px]"
                  >
                    <div className="flex-1">
                      <Select
                        value={sessionId}
                        onValueChange={(value) => handleSessionChange(index, value)}
                      >
                        <SelectTrigger className="h-auto border-0 p-0 focus:ring-0 bg-transparent">
                          <SelectValue>
                            <div className="text-left">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-sm font-semibold text-foreground">
                                  {session.id}
                                </span>
                                <span className={`text-xs font-mono uppercase ${getStatusColor(session.status)}`}>
                                  {session.status}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground font-mono">
                                {session.participants} participants · Started {session.startTime}
                              </div>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-white/[0.08]">
                          {availableSessions
                            .filter(s => !selectedSessions.includes(s.id) || s.id === sessionId)
                            .map((s) => (
                              <SelectItem 
                                key={s.id} 
                                value={s.id}
                                className="font-mono focus:bg-white/[0.04]"
                              >
                                <div className="flex items-center justify-between gap-4 min-w-[240px]">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold">{s.id}</span>
                                    <span className={`text-xs uppercase ${getStatusColor(s.status)}`}>
                                      {s.status}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {s.participants} ppl
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedSessions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSession(index)}
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X size={14} />
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={
              comparisonMode === 'side-by-side'
                ? 'grid gap-6 ' + (selectedSessions.length === 1 ? 'grid-cols-1' : 
                                  selectedSessions.length === 2 ? 'grid-cols-2' :
                                  selectedSessions.length === 3 ? 'grid-cols-3' : 
                                  'grid-cols-2 xl:grid-cols-2')
                : 'space-y-12'
            }
          >
            {selectedSessions.map((sessionId, index) => (
              <motion.div
                key={`${sessionId}-${index}-content`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-panel rounded-lg p-6 border border-white/[0.08]"
              >
                <AnalyticsDashboard sessionId={sessionId} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
