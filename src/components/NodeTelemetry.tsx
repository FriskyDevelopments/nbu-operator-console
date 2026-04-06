import { motion } from 'framer-motion'
import { Users, Circle, Database } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

interface Node {
  id: string
  status: 'ACTIVE' | 'WAITING' | 'LOCKED'
  participants: number
  recording: boolean
}

interface NodeTelemetryProps {
  node: Node
  position: { x: number; y: number }
}

export default function NodeTelemetry({ node, position }: NodeTelemetryProps) {
  return (
    <motion.div
      className="absolute pointer-events-none z-50 font-body"
      style={{
        left: position.x + 20,
        top: position.y + 20,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
    >
      <div className="glass-panel rounded-md p-4 min-w-[200px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {node.id}
          </span>
          <Badge 
            variant={
              node.status === 'ACTIVE' 
                ? 'default' 
                : node.status === 'WAITING' 
                ? 'secondary' 
                : 'destructive'
            }
            className={`text-[10px] px-2 py-0.5 ${
              node.status === 'ACTIVE'
                ? 'bg-primary/20 text-primary border-primary/30'
                : node.status === 'WAITING'
                ? 'bg-accent/20 text-accent border-accent/30'
                : 'bg-destructive/20 text-destructive border-destructive/30'
            }`}
          >
            {node.status}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Users size={14} className="text-muted-foreground" weight="regular" />
            <span className="text-foreground/80">{node.participants} participants</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Circle 
              size={14} 
              className={node.recording ? 'text-primary' : 'text-muted-foreground'} 
              weight={node.recording ? 'fill' : 'regular'}
            />
            <span className="text-foreground/80">
              {node.recording ? 'Recording' : 'Not recording'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Database size={14} className="text-muted-foreground" weight="regular" />
            <span className="text-foreground/80 font-mono text-xs">
              {Math.floor(Math.random() * 500 + 100)}ms
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
