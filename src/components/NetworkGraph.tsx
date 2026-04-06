import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import NodeTelemetry from './NodeTelemetry'

interface Node {
  id: string
  x: number
  y: number
  status: 'ACTIVE' | 'WAITING' | 'LOCKED'
  participants: number
  recording: boolean
}

interface NetworkGraphProps {
  expanded: boolean
}

export default function NetworkGraph({ expanded }: NetworkGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const nodes: Node[] = [
    { id: 'central', x: 0, y: 0, status: 'ACTIVE', participants: 12, recording: true },
    { id: 'node-1', x: 180, y: -120, status: 'ACTIVE', participants: 8, recording: true },
    { id: 'node-2', x: 200, y: 80, status: 'WAITING', participants: 3, recording: false },
    { id: 'node-3', x: -180, y: -100, status: 'ACTIVE', participants: 15, recording: true },
    { id: 'node-4', x: -160, y: 120, status: 'LOCKED', participants: 0, recording: false },
    { id: 'node-5', x: 0, y: -180, status: 'ACTIVE', participants: 6, recording: false },
    { id: 'node-6', x: 0, y: 180, status: 'WAITING', participants: 2, recording: false },
  ]

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.90 0.27 142)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.90 0.27 142)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.90 0.27 142)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {expanded && nodes.slice(1).map((node) => (
          <motion.line
            key={node.id}
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${node.x}px)`}
            y2={`calc(50% + ${node.y}px)`}
            stroke="oklch(0.55 0.24 286 / 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-[pulse-glow_3.5s_ease-in-out_infinite]" />
          <div className="relative w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(0,255,65,0.6)]" />
        </div>
      </motion.div>

      {expanded && nodes.slice(1).map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute left-1/2 top-1/2 cursor-pointer"
          style={{
            transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.3 + index * 0.1 
          }}
          onMouseEnter={() => setHoveredNode(node)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative group">
            <div 
              className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
                node.status === 'ACTIVE' 
                  ? 'bg-primary/30 group-hover:bg-primary/50' 
                  : node.status === 'WAITING'
                  ? 'bg-accent/30 group-hover:bg-accent/50'
                  : 'bg-destructive/30 group-hover:bg-destructive/50'
              }`}
            />
            <div 
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                node.status === 'ACTIVE' 
                  ? 'bg-primary shadow-[0_0_12px_rgba(0,255,65,0.4)]' 
                  : node.status === 'WAITING'
                  ? 'bg-accent shadow-[0_0_12px_rgba(124,58,237,0.4)]'
                  : 'bg-destructive shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              } group-hover:scale-110`}
            />
          </div>
        </motion.div>
      ))}

      {hoveredNode && (
        <NodeTelemetry
          node={hoveredNode}
          position={mousePos}
        />
      )}
    </div>
  )
}
