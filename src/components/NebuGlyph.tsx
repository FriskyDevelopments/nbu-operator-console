import { motion } from 'framer-motion'

type GlyphVariant = 'base' | 'active' | 'signal'

interface NebuGlyphProps {
  variant?: GlyphVariant
  size?: number
  className?: string
}

export default function NebuGlyph({ 
  variant = 'base', 
  size = 48,
  className = '' 
}: NebuGlyphProps) {
  const lineHeight = size * 0.055
  const lineSpacing = size * 0.24
  const lineWidth = size * 0.75
  
  const getLineColor = () => {
    switch (variant) {
      case 'signal':
        return '#00FF41'
      default:
        return '#FFFFFF'
    }
  }

  const getGlowProps = () => {
    switch (variant) {
      case 'active':
        return {
          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))',
        }
      case 'signal':
        return {
          filter: 'drop-shadow(0 0 3px rgba(0, 255, 65, 0.5)) drop-shadow(0 0 6px rgba(0, 255, 65, 0.25))',
        }
      default:
        return {}
    }
  }

  const lineColor = getLineColor()
  const glowProps = getGlowProps()

  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={lineWidth}
        height={size}
        viewBox={`0 0 ${lineWidth} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={glowProps}
      >
        <rect
          x="0"
          y={(size - lineHeight) / 2 - lineSpacing}
          width={lineWidth}
          height={lineHeight}
          fill={lineColor}
          rx={lineHeight * 0.15}
        />
        <rect
          x="0"
          y={(size - lineHeight) / 2}
          width={lineWidth}
          height={lineHeight}
          fill={lineColor}
          rx={lineHeight * 0.15}
        />
        <rect
          x="0"
          y={(size - lineHeight) / 2 + lineSpacing}
          width={lineWidth}
          height={lineHeight}
          fill={lineColor}
          rx={lineHeight * 0.15}
        />
      </svg>
    </div>
  )
}

interface AnimatedNebuGlyphProps extends Omit<NebuGlyphProps, 'variant'> {
  animate?: boolean
}

export function AnimatedNebuGlyph({ 
  animate = true, 
  size = 48,
  className = '' 
}: AnimatedNebuGlyphProps) {
  if (!animate) {
    return <NebuGlyph variant="base" size={size} className={className} />
  }

  return (
    <motion.div
      animate={{
        opacity: [1, 0.6, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <NebuGlyph variant="signal" size={size} className={className} />
    </motion.div>
  )
}
