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
        participants: 16,
        waitingRoom: 0,
        recording: false,
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
      }
    })g:grid-cols-2 gap-6 mb-8">
    
    return () => unsubscribe()
  }, [scrollYProgress, glyphExpanded])
{ duration: 0.6, delay: 0.2 }}
  return (
    <div className="min-h-screen bg-background font-body">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        </div>
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"'
        >ext-xs uppercase tracking-wider`}
          <div className="flex items-center justify-center gap-6 mb-6">
            <AnimatedNebuGlyph size={64} />
            <h1 className="font-display text-8xl font-bold tracking-[0.05em] text-foreground uppercase">
              NΞBU
            </h1>
          </div>d-cols-2 gap-4 mb-6">
          rounded-md p-4">
          <p className="font-display text-xl tracking-[0.15em] text-foreground/60 uppercase mb-4">
            Command the Session="bold" />
          </p> uppercase tracking-wider font-mono">Waiting</p>
          
          <p className="font-body text-base text-foreground/40 max-w-md mx-auto">
            Operator control system for Zoom hosts, with Telegram and Discord extensions
          </p>
        </motion.div>
lassName="flex items-center gap-2 mb-2">
        <motion.divrimary" weight="bold" />
          className="mt-16 relative"er font-mono">Active</p>
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}">42</p>
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            animate={{
              scale: glyphExpanded ? 1.8 : 1,
            }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          >"w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-mono text-sm uppercase tracking-wider h-12"
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: glyphExpanded ? [0.3, 0.6, 0.3] : 0.4,
                scale: glyphExpanded ? [1, 1.15, 1] : 1,
              }}
              transition={{
                opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <div className="w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>

            <motion.div
              animate={{
                rotate: glyphExpanded ? 360 : 0,
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: 'linear',
                delay: glyphExpanded ? 0 : 0 
              }}
            >
              <NebuGlyph variant="signal" size={120} />
            </motion.div>
          </motion.div>

          {glyphExpanded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              {orbitalNodes.map((node, index) => (
                <OrbitalNode
                  key={node.angle}
                  angle={node.angle}
                  index={index}
                  distance={180}
                  telemetry={node.telemetry}
                  onClick={() => setSelectedSession(index)}
                />
              ))}

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {orbitalNodes.map((node, index) => {
                  const radians = (node.angle * Math.PI) / 180
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel-hover rounded-md p-4 space-y-2"
                  >
                      key={`line-${node.angle}`}
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
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}ht text-foreground uppercase">
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-body">
            Scroll to explore
          </p>
        </motion.div>
      </section>
nput
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-32">
        <GlyphShowcase />e={(e) => setCommandInput(e.target.value)}
      </section>
border-white/[0.08] text-foreground font-mono h-14 text-base pl-4 focus:border-primary/50 focus:ring-primary/20"
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-32">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.1em] mb-4">
              01 — HOST
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-[0.02em] mb-6 text-foreground uppercase">
              Zoom Control Layer
            </h2>
            <p className="font-body text-base text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Precision control for Zoom hosts. Manage waiting rooms, admit participants, monitor session state—all from a unified command interface.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="glass-panel rounded-lg p-12 max-w-md">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-[pulse-glow_4s_ease-in-out_infinite]" />
                <div className="relative w-full h-full bg-primary/5 rounded-full border border-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_20px_rgba(0,255,65,0.6)]" />
                </div>
              </div>
              <p className="text-center mt-8 text-sm text-muted-foreground font-mono uppercase tracking-wider">
                System Ready
              </p>
            </div>
          </motion.div>
        </div>
      </section>

            viewport={{ once: true, margin: '-100px' }}        <div className="max-w-6xl w-full">              05 — ANALYZE              Real-Time Analytics              Comprehensive Zoom session metrics and insights. Monitor participant behavior, engagement patterns, and operational efficiency—live telemetry for data-driven host decisions.            className="mb-8 flex justify-center"            <Button              onClick={() => setShowComparison(true)}              className="glass-panel hover:glass-panel-hover border border-white/[0.08] px-6 py-3"            >              <ChartBar size={18} className="mr-2" weight="bold" />              <span className="font-mono text-sm uppercase tracking-wider">Compare Sessions</span>            </Button>          </motion.div>          <motion.div            initial={{ opacity: 0, y: 20 }}            whileInView={{ opacity: 1, y: 0 }}            viewport={{ once: true }}            transition={{ duration: 0.6, delay: 0.3 }}          >            <AnalyticsDashboard sessionId="ZM-4A7B" />          </motion.div>        </div>      </section>      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-32">        <div className="max-w-4xl w-full">
              06 — ARCHIVE              Session History              Complete Zoom session logs. Host commands executed, participant flow, recordings captured—every action preserved and searchable.            className="flex justify-center"            <MemoryLog />          </motion.div>        </div>      </section>      <footer className="relative py-16 px-8 border-t border-white/[0.08]">        <div className="max-w-4xl mx-auto text-center">          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2">            NΞBU          </p>          <p className="text-xs text-muted-foreground/60 font-body">            Operator Control System — v1.0.0          </p>      </footer>    </div>
  )
}

export default App
