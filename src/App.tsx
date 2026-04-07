import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedNebuGlyph } from './components/NebuGlyph'
import { Button } from './components/ui/button'
import { 
  UserPlus, 
  LockKey, 
  Record, 
  Users, 
  Clock, 
  CheckCircle,
  Terminal
} from '@phosphor-icons/react'
import { Badge } from './components/ui/badge'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'
import { Separator } from './components/ui/separator'

function App() {
  const [isLocked, setIsLocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [commandInput, setCommandInput] = useState('')
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
    setActivityLog([
      { 
        command: '/zoom admit all', 
        result: '✓ 12 participants admitted', 
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

  return (
    <div className="min-h-screen bg-background font-body px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-6">
            <AnimatedNebuGlyph size={64} />
            <h1 className="font-display text-8xl font-bold tracking-[0.05em] text-foreground uppercase">
              NΞBU
            </h1>
          </div>
          
          <p className="font-display text-xl tracking-[0.15em] text-foreground/60 uppercase mb-4">
            Command the Session
          </p>
          
          <p className="font-body text-base text-foreground/40 max-w-2xl mx-auto">
            Operator control system for Zoom hosts, with Telegram and Discord extensions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground uppercase">
                  Session Control
                </h2>
                <Badge 
                  variant="outline"
                  className={`${
                    isLocked 
                      ? 'bg-accent/15 text-accent border-accent/30' 
                      : 'bg-primary/15 text-primary border-primary/30'
                  } font-mono text-xs uppercase tracking-wider`}
                >
                  {isLocked ? 'LOCKED' : 'ACTIVE'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-panel rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-accent" weight="bold" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Waiting</p>
                  </div>
                  <p className="text-3xl font-display font-bold text-accent">8</p>
                </div>
                
                <div className="glass-panel rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-primary" weight="bold" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Active</p>
                  </div>
                  <p className="text-3xl font-display font-bold text-primary">42</p>
                </div>
              </div>

              <Separator className="bg-white/[0.08] mb-6" />

              <div className="space-y-3">
                <Button 
                  onClick={handleAdmitAll}
                  className="w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-mono text-sm uppercase tracking-wider h-12"
                >
                  <UserPlus size={20} weight="bold" className="mr-2" />
                  Admit All
                </Button>

                <Button 
                  onClick={handleLockToggle}
                  variant="outline"
                  className={`w-full ${
                    isLocked
                      ? 'bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent'
                      : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.08] text-foreground/80'
                  } font-mono text-sm uppercase tracking-wider h-12`}
                >
                  <LockKey size={20} weight="bold" className="mr-2" />
                  {isLocked ? 'Unlock Session' : 'Lock Session'}
                </Button>

                <Button 
                  onClick={handleRecordToggle}
                  variant="outline"
                  className={`w-full ${
                    isRecording
                      ? 'bg-destructive/10 hover:bg-destructive/20 border-destructive/30 text-destructive'
                      : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.08] text-foreground/80'
                  } font-mono text-sm uppercase tracking-wider h-12`}
                >
                  <Record size={20} weight={isRecording ? 'fill' : 'bold'} className="mr-2" />
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle size={20} className="text-primary" weight="bold" />
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground uppercase">
                  Activity Feed
                </h2>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {activityLog.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel-hover rounded-md p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-primary font-mono">
                        {entry.command}
                      </code>
                      <span className="text-xs text-muted-foreground font-mono">
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
        >
          <Card className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={20} className="text-primary" weight="bold" />
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground uppercase">
                Command Interface
              </h2>
            </div>

            <form onSubmit={handleCommand} className="space-y-4">
              <div className="relative">
                <Input
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="/zoom admit all"
                  className="w-full bg-white/[0.02] border-white/[0.08] text-foreground font-mono h-14 text-base pl-4 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <div className="glass-panel rounded-md p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-mono">
                  Available Commands
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs">
                  {[
                    { cmd: '/zoom admit all', desc: 'Admit all from waiting room' },
                    { cmd: '/zoom lock', desc: 'Lock session to current participants' },
                    { cmd: '/zoom mute @user', desc: 'Mute specific participant' },
                    { cmd: '/zoom record start', desc: 'Begin session recording' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-white/[0.04] last:border-0"
                    >
                      <span className="text-primary">{item.cmd}</span>
                      <span className="text-muted-foreground text-[10px]">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </Card>
        </motion.div>

        <footer className="mt-16 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2">
            NΞBU
          </p>
          <p className="text-xs text-muted-foreground/60 font-body">
            Operator Control System — v1.0.0
          </p>
        </footer>
      </motion.div>
    </div>
  )
}

export default App
