import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './components/ui/button'
import {
  UserPlus,
  LockKey,
  Record,
  Terminal,
  Users,
  Clock,
  ChartLine,
  ArrowsLeftRight,
  Globe
} from '@phosphor-icons/react'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'
import { Separator } from './components/ui/separator'
import { Badge } from './components/ui/badge'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import SessionComparisonView from './components/SessionComparisonView'
import InfraDashboard from './components/InfraDashboard'
import { AuthGate, UserMenu } from './components/AuthGate'

type View = 'control' | 'analytics' | 'comparison' | 'infra'

function App() {
  const [currentView, setCurrentView] = useState<View>('control')

  useEffect(() => {
    if (window.location.pathname === '/admin/infra') {
      setCurrentView('infra')
    }
  }, [])
  const [isLocked, setIsLocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [commandInput, setCommandInput] = useState('')
  const [waitingRoomCount, setWaitingRoomCount] = useState(3)
  const [activeParticipants, setActiveParticipants] = useState(12)
  const [activityLog, setActivityLog] = useState([
    { command: '/zoom admit all', result: '✓ 12 participants admitted', timestamp: '14:32:15' },
    { command: '/zoom lock', result: '✓ session locked', timestamp: '14:35:22' },
  ])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commandInput.trim()) return
    
    setActivityLog([
      { 
        command: commandInput, 
        result: '✓ command executed', 
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) 
      },
      ...activityLog,
    ])
    setCommandInput('')
  }

  const handleAdmitAll = () => {
    const admitted = waitingRoomCount
    setWaitingRoomCount(0)
    setActiveParticipants(activeParticipants + admitted)
    setActivityLog([
      { 
        command: '/zoom admit all', 
        result: `✓ ${admitted} participants admitted`, 
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) 
      },
      ...activityLog,
    ])
  }

  const handleLockToggle = () => {
    const newState = !isLocked
    setIsLocked(newState)
    setActivityLog([
      { 
        command: newState ? '/zoom lock' : '/zoom unlock', 
        result: newState ? '✓ session locked' : '✓ session unlocked', 
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) 
      },
      ...activityLog,
    ])
  }

  const handleRecordToggle = () => {
    const newState = !isRecording
    setIsRecording(newState)
    setActivityLog([
      { 
        command: newState ? '/zoom record start' : '/zoom record stop', 
        result: newState ? '✓ recording started' : '✓ recording stopped', 
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) 
      },
      ...activityLog,
    ])
  }

  const sessionState = isLocked ? 'LOCKED' : 'ACTIVE'
  const sessionStateVariant = isLocked ? 'destructive' : 'default'

  if (currentView === 'comparison') {
    return (
      <AnimatePresence>
        <SessionComparisonView onClose={() => setCurrentView('analytics')} />
      </AnimatePresence>
    )
  }

  if (currentView === 'analytics') {
    return (
      <div className="min-h-screen bg-background font-body">
        <div className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground uppercase">
              NΞBU
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('control')}
                className="glass-panel hover:glass-panel-hover"
              >
                <Terminal size={16} className="mr-2" />
                <span className="font-mono text-xs uppercase">Control</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('comparison')}
                className="glass-panel hover:glass-panel-hover"
              >
                <ArrowsLeftRight size={16} className="mr-2" />
                <span className="font-mono text-xs uppercase">Compare</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('infra')}
                className="glass-panel hover:glass-panel-hover"
              >
                <Globe size={16} className="mr-2" />
                <span className="font-mono text-xs uppercase">Infra</span>
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
        
        <div className="pt-20 px-4 md:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <AnalyticsDashboard sessionId="ZM-4A7B" />
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'infra') {
    return (
      <div className="min-h-screen bg-background font-body">
        <div className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground uppercase">
              NΞBU
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('control')}
                className="glass-panel hover:glass-panel-hover"
              >
                <Terminal size={16} className="mr-2" />
                <span className="font-mono text-xs uppercase">Control</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('analytics')}
                className="glass-panel hover:glass-panel-hover"
              >
                <ChartLine size={16} className="mr-2" />
                <span className="font-mono text-xs uppercase">Analytics</span>
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
        
        <div className="pt-24 px-4 md:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <InfraDashboard />
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header with user menu */}
      <div className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground uppercase">
            NEBU
          </h1>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView('analytics')}
              className="glass-panel hover:glass-panel-hover"
            >
              <ChartLine size={16} className="mr-2" />
              <span className="font-mono text-xs uppercase">Analytics</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView('infra')}
              className="glass-panel hover:glass-panel-hover"
            >
              <Globe size={16} className="mr-2" />
              <span className="font-mono text-xs uppercase">Infra</span>
            </Button>
            <UserMenu />
          </div>
        </div>
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-12 pt-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 z-10"
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-[0.05em] text-foreground uppercase mb-6">
            NEBU
          </h1>

          <p className="font-display text-xl md:text-2xl font-semibold tracking-wide text-foreground/80 mb-4 uppercase">
            Command the Session
          </p>

          <p className="font-body text-sm md:text-base text-foreground/40 max-w-2xl mx-auto">
            Operator control system for Zoom hosts, with Telegram and Telegram-based remote actions for now.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6 w-full max-w-5xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-panel p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-mono uppercase tracking-wider text-foreground">
                  Control Panel
                </h2>
                <Badge variant={sessionStateVariant} className="font-mono text-xs">
                  {sessionState}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-panel-hover rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="text-xs font-mono uppercase text-muted-foreground">Waiting Room</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-foreground">
                    {waitingRoomCount}
                  </p>
                </div>

                <div className="glass-panel-hover rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span className="text-xs font-mono uppercase text-muted-foreground">Active</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-foreground">
                    {activeParticipants}
                  </p>
                </div>
              </div>

              <Separator className="mb-6" />
              
              <div className="space-y-3">
                <Button 
                  onClick={handleAdmitAll}
                  disabled={waitingRoomCount === 0}
                  className="w-full bg-primary/30 hover:bg-primary/40 border-primary/30 text-primary font-mono text-sm uppercase tracking-wider h-12 disabled:opacity-30"
                >
                  <UserPlus size={20} weight="bold" className="mr-2" />
                  Admit All
                </Button>
                <Button 
                  onClick={handleLockToggle}
                  variant={isLocked ? "destructive" : "secondary"}
                  className="w-full font-mono text-sm uppercase tracking-wider h-12"
                >
                  <LockKey size={20} weight="bold" className="mr-2" />
                  {isLocked ? 'Unlock' : 'Lock'} Session
                </Button>
                <Button 
                  onClick={handleRecordToggle}
                  variant={isRecording ? "destructive" : "secondary"}
                  className="w-full font-mono text-sm uppercase tracking-wider h-12"
                >
                  <Record size={20} weight="bold" className="mr-2" />
                  {isRecording ? 'Stop' : 'Start'} Recording
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-panel p-6 h-full">
              <h2 className="text-sm font-mono uppercase tracking-wider text-foreground mb-4">
                Activity Feed
              </h2>
              <div className="space-y-3 max-h-[340px] overflow-y-auto">
                {activityLog.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel-hover rounded-md p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm text-primary font-mono truncate">
                        {entry.command}
                      </code>
                      <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                        {entry.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 font-body">
                      {entry.result}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-5xl z-10"
        >
          <Card className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <Terminal size={20} weight="bold" className="text-primary" />
              <h2 className="text-sm font-mono uppercase tracking-wider text-foreground">
                Command Interface
              </h2>
            </div>
            
            <Separator className="mb-4" />
            
            <form onSubmit={handleCommand} className="flex flex-col sm:flex-row gap-3">
              <Input
                aria-label="Command input"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="/zoom admit all"
                className="flex-1 bg-background border-white/[0.08] text-foreground font-mono h-14 text-base pl-4 focus:border-primary/50 focus:ring-primary/20"
              />
              <Button 
                type="submit"
                className="bg-primary/30 hover:bg-primary/40 border-primary/30 text-primary font-mono text-sm uppercase tracking-wider h-14 px-8"
              >
                Execute
              </Button>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-5xl z-10 flex justify-center gap-4"
        >
          <Button
            onClick={() => setCurrentView('analytics')}
            className="bg-primary/30 hover:bg-primary/40 border-primary/30 text-primary font-mono text-sm uppercase tracking-wider h-12 px-8"
          >
            <ChartLine size={20} weight="bold" className="mr-2" />
            View Analytics
          </Button>
          <Button
            onClick={() => setCurrentView('comparison')}
            variant="secondary"
            className="font-mono text-sm uppercase tracking-wider h-12 px-8"
          >
            <ArrowsLeftRight size={20} weight="bold" className="mr-2" />
            Compare Sessions
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

function AppWithAuth() {
  return (
    <AuthGate>
      <App />
    </AuthGate>
  );
}

export default AppWithAuth