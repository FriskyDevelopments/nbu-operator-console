import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Rows, Columns, TrendUp, Minus } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import AnalyticsDashboard from './AnalyticsDashboard'
import SessionBookmarks from './SessionBookmarks'

interface Session {
  id: string
  status: 'ACTIVE' | 'WAITING' | 'LOCKED' | 'ENDED'
  participants: number
  startTime: string
  date: string
  duration: string
  peakParticipants: number
  avgSessionTime: string
  handRaises: number
  recordingTime: string
}

const availableSessions: Session[] = [
  { id: 'ZM-4A7B', status: 'ACTIVE', participants: 87, startTime: '13:45', date: 'Today', duration: '2h 15m', peakParticipants: 89, avgSessionTime: '42m', handRaises: 34, recordingTime: '1h 28m' },
  { id: 'ZM-8C2F', status: 'ACTIVE', participants: 42, startTime: '14:12', date: 'Today', duration: '1h 48m', peakParticipants: 45, avgSessionTime: '38m', handRaises: 18, recordingTime: '1h 12m' },
  { id: 'ZM-1D9E', status: 'WAITING', participants: 12, startTime: '14:30', date: 'Today', duration: '0h 30m', peakParticipants: 15, avgSessionTime: '12m', handRaises: 4, recordingTime: '0h 00m' },
  { id: 'ZM-6F3A', status: 'ENDED', participants: 156, startTime: '12:00', date: 'Yesterday', duration: '3h 45m', peakParticipants: 178, avgSessionTime: '58m', handRaises: 67, recordingTime: '3h 12m' },
  { id: 'ZM-2B5C', status: 'ENDED', participants: 34, startTime: '11:30', date: '2 days ago', duration: '1h 20m', peakParticipants: 38, avgSessionTime: '32m', handRaises: 12, recordingTime: '0h 45m' },
  { id: 'ZM-9E1D', status: 'ENDED', participants: 68, startTime: '13:00', date: '3 days ago', duration: '2h 30m', peakParticipants: 72, avgSessionTime: '45m', handRaises: 28, recordingTime: '2h 05m' },
]

interface SessionComparisonViewProps {
  onClose: () => void
}

type LayoutMode = 'grid' | 'stacked'

export default function SessionComparisonView({ onClose }: SessionComparisonViewProps) {
  const [selectedSessions, setSelectedSessions] = useState<string[]>(['ZM-4A7B', 'ZM-6F3A'])
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid')

  const handleSessionChange = (index: number, sessionId: string) => {
    const newSessions = [...selectedSessions]
    newSessions[index] = sessionId
    setSelectedSessions(newSessions)
  }

  const handleLoadBookmark = (sessionIds: string[]) => {
    setSelectedSessions(sessionIds)
  }

  const addSession = () => {
    if (selectedSessions.length < 4) {
      const nextAvailable = availableSessions.find(
        s => !selectedSessions.includes(s.id)
      )
      if (nextAvailable) {
        setSelectedSessions([...selectedSessions, nextAvailable.id])
      }
    }
  }

  const removeSession = (index: number) => {
    if (selectedSessions.length > 2) {
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

  const getComparisonInsight = (metric: 'participants' | 'peakParticipants' | 'handRaises', sessions: Session[]) => {
    const values = sessions.map(s => {
      switch (metric) {
        case 'participants': return s.participants
        case 'peakParticipants': return s.peakParticipants
        case 'handRaises': return s.handRaises
      }
    })
    const maxValue = Math.max(...values)
    const minValue = Math.min(...values)
    const avgValue = Math.round(values.reduce((a, b) => a + b, 0) / values.length)
    const diff = maxValue - minValue
    const diffPercent = Math.round((diff / minValue) * 100)

    return { maxValue, minValue, avgValue, diff, diffPercent }
  }

  const selectedSessionData = selectedSessions.map(id => getSession(id)).filter(Boolean) as Session[]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto"
    >
      <div className="min-h-screen p-6 md:p-8">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase mb-2">
                Session Comparison
              </h1>
              <p className="font-body text-sm text-muted-foreground">
                Analyze performance across {selectedSessions.length} Zoom sessions
              </p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Tabs value={layoutMode} onValueChange={(value) => setLayoutMode(value as LayoutMode)}>
                <TabsList className="glass-panel h-10">
                  <TabsTrigger value="grid" className="gap-2">
                    <Columns size={14} weight="bold" />
                    <span className="font-mono text-xs uppercase">Grid</span>
                  </TabsTrigger>
                  <TabsTrigger value="stacked" className="gap-2">
                    <Rows size={14} weight="bold" />
                    <span className="font-mono text-xs uppercase">Stacked</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              {selectedSessions.length < 4 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addSession}
                  className="glass-panel hover:glass-panel-hover h-10"
                >
                  <span className="font-mono text-xs uppercase">+ Add Session</span>
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="glass-panel hover:glass-panel-hover h-10 w-10"
              >
                <X size={20} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-panel rounded-lg p-6 mb-8"
          >
            <SessionBookmarks
              currentSessions={selectedSessions}
              onLoadBookmark={handleLoadBookmark}
            />
          </motion.div>

          {selectedSessionData.length >= 2 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-lg p-6 mb-8"
            >
              <h3 className="font-display text-lg font-semibold text-foreground uppercase tracking-wide mb-6">
                Comparative Insights
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['participants', 'peakParticipants', 'handRaises'] as const).map((metric, idx) => {
                  const insight = getComparisonInsight(metric, selectedSessionData)
                  const metricLabels = {
                    participants: 'Total Participants',
                    peakParticipants: 'Peak Concurrent',
                    handRaises: 'Hand Raises'
                  }

                  return (
                    <motion.div
                      key={metric}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      className="glass-panel-hover rounded-md p-4"
                    >
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-3">
                        {metricLabels[metric]}
                      </p>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground font-mono mb-1">High</p>
                          <p className="text-xl font-display font-bold text-primary">{insight.maxValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-mono mb-1">Avg</p>
                          <p className="text-xl font-display font-bold text-foreground">{insight.avgValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-mono mb-1">Low</p>
                          <p className="text-xl font-display font-bold text-foreground/60">{insight.minValue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08]">
                        {insight.diffPercent > 0 ? (
                          <TrendUp size={14} className="text-accent" weight="bold" />
                        ) : (
                          <Minus size={14} className="text-muted-foreground" weight="bold" />
                        )}
                        <span className="text-sm font-mono text-muted-foreground">
                          {insight.diffPercent}% variance
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="glass-panel rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-4 flex-wrap">
              {selectedSessions.map((sessionId, index) => {
                const session = getSession(sessionId)
                if (!session) return null

                return (
                  <div
                    key={`${sessionId}-${index}`}
                    className="flex items-center gap-3 glass-panel rounded-md px-4 py-3 min-w-[280px] flex-1"
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
                                {session.date} · {session.duration} · {session.participants} participants
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
                    
                    {selectedSessions.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSession(index)}
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
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
            transition={{ delay: 0.35 }}
            className={
              layoutMode === 'grid'
                ? 'grid gap-6 ' + (selectedSessions.length === 2 ? 'grid-cols-1 xl:grid-cols-2' :
                                  selectedSessions.length === 3 ? 'grid-cols-1 xl:grid-cols-3' : 
                                  'grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2')
                : 'space-y-12'
            }
          >
            {selectedSessions.map((sessionId, index) => (
              <motion.div
                key={`${sessionId}-${index}-content`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + index * 0.1 }}
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
