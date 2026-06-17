import { useState } from 'react'
import { Terminal } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function CommandInput() {
  const [command, setCommand] = useState('')
  const [suggestions] = useState([
    '/zoom admit all',
    '/zoom lock',
    '/zoom mute @user',
    '/zoom record start',
    '/zoom spotlight @user',
  ])

  const filteredSuggestions = command
    ? suggestions.filter(s => s.toLowerCase().includes(command.toLowerCase()))
    : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      setCommand('')
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-panel rounded-lg p-1.5 flex items-center gap-2">
          <Terminal size={18} className="text-primary ml-2" weight="regular" />
          <Input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="/zoom admit all"
            aria-label="Command input"
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm h-9 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </form>

      {filteredSuggestions.length > 0 && (
        <motion.div
          className="absolute top-full mt-2 w-full glass-panel rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setCommand(suggestion)}
              className="w-full text-left px-4 py-2.5 font-mono text-sm text-foreground/80 hover:bg-white/[0.04] transition-colors border-b border-white/[0.04] last:border-0"
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
