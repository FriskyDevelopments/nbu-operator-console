import { motion } from 'framer-motion'
import NebuGlyph, { AnimatedNebuGlyph } from './NebuGlyph'
import { Card } from './ui/card'

export default function GlyphShowcase() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-semibold tracking-[0.02em] mb-4 text-foreground uppercase">
          NΞBU System Glyph
        </h2>
        <p className="font-body text-sm text-muted-foreground uppercase tracking-wider">
          Protocol Mark — Three Variants
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
        >
          <Card className="glass-panel p-8 flex flex-col items-center">
            <div className="mb-8 flex items-center justify-center h-32">
              <NebuGlyph variant="base" size={72} />
            </div>
            <div className="text-center space-y-2">
              <p className="font-mono text-xs text-primary uppercase tracking-wider">
                01 — BASE
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Flat, no glow
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/60">
                Default state
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass-panel p-8 flex flex-col items-center">
            <div className="mb-8 flex items-center justify-center h-32">
              <NebuGlyph variant="active" size={72} />
            </div>
            <div className="text-center space-y-2">
              <p className="font-mono text-xs text-foreground uppercase tracking-wider">
                02 — ACTIVE
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Subtle white glow
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/60">
                System active
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-panel p-8 flex flex-col items-center">
            <div className="mb-8 flex items-center justify-center h-32">
              <NebuGlyph variant="signal" size={72} />
            </div>
            <div className="text-center space-y-2">
              <p className="font-mono text-xs text-primary uppercase tracking-wider">
                03 — SIGNAL
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Controlled green glow
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/60">
                Command ready
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-8 mt-16">
        <div className="text-center">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-8">
            Size Demonstrations
          </p>
        </div>

        <Card className="glass-panel p-12">
          <div className="flex items-center justify-around flex-wrap gap-8">
            <div className="flex flex-col items-center gap-4">
              <NebuGlyph variant="base" size={24} />
              <p className="font-mono text-[10px] text-muted-foreground">24px</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <NebuGlyph variant="base" size={32} />
              <p className="font-mono text-[10px] text-muted-foreground">32px</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <NebuGlyph variant="base" size={48} />
              <p className="font-mono text-[10px] text-muted-foreground">48px</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <NebuGlyph variant="base" size={64} />
              <p className="font-mono text-[10px] text-muted-foreground">64px</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <NebuGlyph variant="base" size={96} />
              <p className="font-mono text-[10px] text-muted-foreground">96px</p>
            </div>
          </div>
        </Card>

        <Card className="glass-panel p-12">
          <div className="space-y-6">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider text-center mb-8">
              UI Context Examples
            </p>
            
            <div className="flex items-center gap-4 glass-panel-hover p-4 rounded">
              <AnimatedNebuGlyph size={32} />
              <div>
                <p className="font-body text-sm text-foreground">Session Active</p>
                <p className="font-mono text-xs text-muted-foreground">12 participants</p>
              </div>
            </div>

            <div className="flex items-center gap-4 glass-panel-hover p-4 rounded">
              <NebuGlyph variant="active" size={32} />
              <div>
                <p className="font-body text-sm text-foreground">Command Ready</p>
                <p className="font-mono text-xs text-muted-foreground">Waiting for input</p>
              </div>
            </div>

            <div className="flex items-center gap-4 glass-panel-hover p-4 rounded">
              <NebuGlyph variant="base" size={32} />
              <div>
                <p className="font-body text-sm text-foreground">System Idle</p>
                <p className="font-mono text-xs text-muted-foreground">No active sessions</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-panel p-12">
          <div className="space-y-6">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider text-center mb-8">
              Loading State Animation
            </p>
            
            <div className="flex justify-center">
              <AnimatedNebuGlyph size={64} animate={true} />
            </div>
            
            <p className="font-mono text-xs text-muted-foreground/60 text-center">
              Breathing pulse animation for loading and processing states
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-16 text-center space-y-4">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Design Specifications
        </p>
        <div className="font-mono text-xs text-muted-foreground/60 space-y-1">
          <p>3 horizontal lines • Equal spacing • Equal thickness</p>
          <p>Obsidian background (#05070A) • Signal green (#00FF41)</p>
          <p>Ultra-minimal • Flat geometry • Protocol primitive</p>
        </div>
      </div>
    </div>
  )
}
