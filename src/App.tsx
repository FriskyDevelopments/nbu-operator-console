import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import CommandInput from './components/CommandInput'
import SessionStatus from './components/SessionStatus'
import MemoryLog from './components/MemoryLog'
import GlyphShowcase from './components/GlyphShowcase'
import { AnimatedNebuGlyph } from './components/NebuGlyph'
import NebuGlyph from './components/NebuGlyph'

function App() {
  const [glyphExpanded, setGlyphExpanded] = useState(false)
  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.05 && !glyphExpanded) {
        setGlyphExpanded(true)
      }
    })
    
    return () => unsubscribe()
  }, [scrollYProgress, glyphExpanded])

  return (
    <div className="min-h-screen bg-background font-body">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <AnimatedNebuGlyph size={64} />
            <h1 className="font-display text-8xl font-bold tracking-[0.05em] text-foreground uppercase">
              NΞBU
            </h1>
          </div>
          
          <p className="font-display text-xl tracking-[0.15em] text-foreground/60 uppercase mb-4">
            Command the Session
          </p>
          
          <p className="font-body text-base text-foreground/40 max-w-md mx-auto">
            Operator control system for Zoom hosts, with Telegram and Discord extensions
          </p>
        </motion.div>

        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            animate={{
              scale: glyphExpanded ? 1.8 : 1,
            }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
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
              {[0, 60, 120, 180, 240, 300].map((angle, index) => {
                const radians = (angle * Math.PI) / 180
                const distance = 180
                const x = Math.cos(radians) * distance
                const y = Math.sin(radians) * distance
                
                return (
                  <motion.div
                    key={angle}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{ 
                      x, 
                      y,
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{ 
                      delay: 0.5 + index * 0.08,
                      duration: 0.8,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    <motion.div
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2 + index * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
                        <div className="relative w-2 h-2 bg-primary rounded-full shadow-[0_0_12px_rgba(0,255,65,0.5)]" />
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}

              <svg className="absolute inset-0 w-full h-full">
                {[0, 60, 120, 180, 240, 300].map((angle, index) => {
                  const radians = (angle * Math.PI) / 180
                  const distance = 180
                  const x = Math.cos(radians) * distance
                  const y = Math.sin(radians) * distance
                  
                  return (
                    <motion.line
                      key={`line-${angle}`}
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x}px)`}
                      y2={`calc(50% + ${y}px)`}
                      stroke="oklch(0.90 0.27 142 / 0.2)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.5 + index * 0.08,
                        duration: 0.8,
                        ease: 'easeOut'
                      }}
                    />
                  )
                })}
              </svg>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="absolute bottom-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-body">
            Scroll to explore
          </p>
        </motion.div>
      </section>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-32">
        <GlyphShowcase />
      </section>

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
              02 — EXTEND
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-[0.02em] mb-6 text-foreground uppercase">
              Remote Execution
            </h2>
            <p className="font-body text-base text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Execute Zoom host commands from anywhere. Telegram and Discord become remote terminals for session control and real-time alerts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="w-full max-w-2xl">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-mono">
                Integration Layer
              </p>
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  className="glass-panel rounded-md p-6 text-center hover:bg-white/[0.04] transition-colors cursor-pointer col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-base text-primary font-display font-semibold mb-1">Zoom</p>
                  <p className="text-xs text-muted-foreground font-mono">Primary Control Surface</p>
                </motion.div>
                {['Telegram', 'Discord'].map((platform, idx) => (
                  <motion.div
                    key={platform}
                    className="glass-panel rounded-md p-4 text-center hover:bg-white/[0.04] transition-colors cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <p className="text-sm text-foreground/80 font-body">{platform}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">Extension</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
              03 — COMMAND
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-[0.02em] mb-6 text-foreground uppercase">
              Terminal Interface
            </h2>
            <p className="font-body text-base text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Command-line driven Zoom host actions. Type /zoom admit all, /zoom lock, /zoom record—execute instantly from any integrated platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <CommandInput />
            
            <div className="glass-panel rounded-lg p-6 w-full max-w-2xl">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 font-mono">
                Zoom Host Commands
              </p>
              <div className="space-y-2 font-mono text-sm">
                {[
                  { cmd: '/zoom admit all', desc: 'Admit all from waiting room' },
                  { cmd: '/zoom lock', desc: 'Lock session to current participants' },
                  { cmd: '/zoom mute @user', desc: 'Mute specific participant' },
                  { cmd: '/zoom record start', desc: 'Begin session recording' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-white/[0.04] last:border-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    <span className="text-primary">{item.cmd}</span>
                    <span className="text-muted-foreground text-xs">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
              04 — MONITOR
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-[0.02em] mb-6 text-foreground uppercase">
              Session Telemetry
            </h2>
            <p className="font-body text-base text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Real-time Zoom session monitoring. Waiting room count, active speakers, hand raises, recording status—all at a glance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <SessionStatus />
          </motion.div>
        </div>
      </section>

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
              05 — ARCHIVE
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-[0.02em] mb-6 text-foreground uppercase">
              Session History
            </h2>
            <p className="font-body text-base text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Complete Zoom session logs. Host commands executed, participant flow, recordings captured—every action preserved and searchable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <MemoryLog />
          </motion.div>
        </div>
      </section>

      <footer className="relative py-16 px-8 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2">
            NΞBU
          </p>
          <p className="text-xs text-muted-foreground/60 font-body">
            Operator Control System — v1.0.0
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
