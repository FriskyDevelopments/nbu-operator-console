import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NodeTelemetry {
  sessionId: string
  status: 'ACTIVE' | 'WAITING' | 'LOCKED'
  participants: number
  waitingRoom: number
  recording: boolean
  handRaised: number
  muted: number
}

interface OrbitalNodeProps {
  angle: number
  index: number
  distance: number
  telemetry: NodeTelemetry
}

export function OrbitalNode({ angle, index, distance, telemetry }: OrbitalNodeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const radians = (angle * Math.PI) / 180
  const x = Math.cos(radians) * distance
  const y = Math.sin(radians) * distance

  const statusColor = {
    ACTIVE: 'oklch(0.90 0.27 142)',
    WAITING: 'oklch(0.85 0.20 85)',
    LOCKED: 'oklch(0.55 0.24 286)',
  }[telemetry.status]

  return (
    <motion.div
      className="absolute pointer-events-auto"
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          opacity: isHovered ? 1 : [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: isHovered ? 0.2 : 2 + index * 0.3,
          repeat: isHovered ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div 
          className="relative cursor-pointer"
          animate={{
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div 
            className="absolute inset-0 rounded-full blur-md transition-colors duration-300" 
            style={{ 
              backgroundColor: isHovered ? `${statusColor}/40` : `${statusColor}/20`,
            }}
          />
          <motion.div 
            className="relative w-2 h-2 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: statusColor,
              boxShadow: isHovered 
                ? `0 0 20px ${statusColor}, 0 0 40px ${statusColor}`
                : `0 0 12px ${statusColor}`,
            }}
            animate={{
              boxShadow: telemetry.recording 
                ? [`0 0 12px ${statusColor}`, `0 0 24px ${statusColor}`, `0 0 12px ${statusColor}`]
                : undefined,
            }}
            transition={{
              duration: 1.5,
              repeat: telemetry.recording ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute z-50"
            style={{
              left: x > 0 ? '16px' : 'auto',
              right: x <= 0 ? '16px' : 'auto',
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: '220px',
            }}
            initial={{ opacity: 0, scale: 0.9, x: x > 0 ? -8 : 8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: x > 0 ? -8 : 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="glass-panel rounded-md p-4 backdrop-blur-xl border border-white/[0.12]">
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-xs text-foreground/80 uppercase tracking-wider">
                  {telemetry.sessionId}
                </p>
                <div 
                  className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-medium"
                  style={{
                    backgroundColor: `${statusColor}/20`,
                    color: statusColor,
                    border: `1px solid ${statusColor}/40`,
                  }}
                >
                  {telemetry.status}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-body">Participants</span>
                  <span className="text-foreground font-mono font-medium">{telemetry.participants}</span>
                </div>
                
                {telemetry.waitingRoom > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-body">Waiting Room</span>
                    <span className="text-accent font-mono font-medium">{telemetry.waitingRoom}</span>
                  </div>
                )}
                
                {telemetry.handRaised > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-body">Hand Raised</span>
                    <span className="text-primary font-mono font-medium">{telemetry.handRaised}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-body">Muted</span>
                  <span className="text-foreground/60 font-mono">{telemetry.muted}/{telemetry.participants}</span>
                </div>
                
                {telemetry.recording && (
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.08]">
                    <span className="text-muted-foreground font-body">Recording</span>
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'oklch(0.55 0.22 29)' }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
