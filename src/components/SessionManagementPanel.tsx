import { motion } from 'framer-motion'
import { X, Users, UserPlus, LockKey, Record, Microphone, MicrophoneSlash, VideoCamera, Hand, Clock } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface SessionTelemetry {
  sessionId: string
  status: 'ACTIVE' | 'WAITING' | 'LOCKED'
  participants: number
  waitingRoom: number
  recording: boolean
  handRaised: number
  muted: number
}

interface Participant {
  id: string
  name: string
  isMuted: boolean
  isVideoOn: boolean
  handRaised: boolean
  joinedAt: string
}

interface SessionManagementPanelProps {
  telemetry: SessionTelemetry
  onClose: () => void
}

const mockParticipants: Participant[] = [
  { id: '1', name: 'Alex Chen', isMuted: false, isVideoOn: true, handRaised: true, joinedAt: '14:32' },
  { id: '2', name: 'Jordan Smith', isMuted: true, isVideoOn: true, handRaised: false, joinedAt: '14:30' },
  { id: '3', name: 'Sam Rodriguez', isMuted: true, isVideoOn: false, handRaised: false, joinedAt: '14:29' },
  { id: '4', name: 'Morgan Lee', isMuted: false, isVideoOn: true, handRaised: true, joinedAt: '14:35' },
  { id: '5', name: 'Casey Park', isMuted: true, isVideoOn: true, handRaised: false, joinedAt: '14:28' },
]

const mockWaitingRoom: Participant[] = [
  { id: 'w1', name: 'Taylor Kim', isMuted: true, isVideoOn: false, handRaised: false, joinedAt: '14:45' },
  { id: 'w2', name: 'Jamie Wilson', isMuted: true, isVideoOn: true, handRaised: false, joinedAt: '14:46' },
]

export default function SessionManagementPanel({ telemetry, onClose }: SessionManagementPanelProps) {
  const statusColor = {
    ACTIVE: 'oklch(0.90 0.27 142)',
    WAITING: 'oklch(0.85 0.20 85)',
    LOCKED: 'oklch(0.55 0.24 286)',
  }[telemetry.status]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-panel rounded-lg w-full max-w-3xl max-h-[85vh] overflow-hidden border border-white/[0.12] shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full blur-md"
                style={{ backgroundColor: `${statusColor}/30` }}
              />
              <div 
                className="relative w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: statusColor,
                  boxShadow: `0 0 16px ${statusColor}`,
                }}
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground uppercase">
                {telemetry.sessionId}
              </h2>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                Session Control
              </p>
            </div>
            <div 
              className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium"
              style={{
                backgroundColor: `${statusColor}/15`,
                color: statusColor,
                border: `1px solid ${statusColor}/30`,
              }}
            >
              {telemetry.status}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors"
          >
            <X size={20} weight="bold" />
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/[0.08]">
          <div className="glass-panel rounded-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-primary" weight="bold" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Active</p>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{telemetry.participants}</p>
          </div>
          
          {telemetry.waitingRoom > 0 && (
            <div className="glass-panel rounded-md p-4 border border-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-accent" weight="bold" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Waiting</p>
              </div>
              <p className="text-2xl font-display font-bold text-accent">{telemetry.waitingRoom}</p>
            </div>
          )}
          
          <div className="glass-panel rounded-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <MicrophoneSlash size={16} className="text-muted-foreground" weight="bold" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Muted</p>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{telemetry.muted}</p>
          </div>
          
          {telemetry.handRaised > 0 && (
            <div className="glass-panel rounded-md p-4 border border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <Hand size={16} className="text-primary" weight="bold" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Raised</p>
              </div>
              <p className="text-2xl font-display font-bold text-primary">{telemetry.handRaised}</p>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary font-mono text-xs uppercase tracking-wider"
            >
              <UserPlus size={16} weight="bold" className="mr-2" />
              Admit All
            </Button>
            <Button 
              variant="outline"
              className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.08] text-foreground/80 font-mono text-xs uppercase tracking-wider"
            >
              <LockKey size={16} weight="bold" className="mr-2" />
              {telemetry.status === 'LOCKED' ? 'Unlock' : 'Lock Session'}
            </Button>
            <Button 
              variant="outline"
              className={`flex-1 ${
                telemetry.recording
                  ? 'bg-destructive/10 hover:bg-destructive/20 border-destructive/30 text-destructive'
                  : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.08] text-foreground/80'
              } font-mono text-xs uppercase tracking-wider`}
            >
              <Record size={16} weight="fill" className="mr-2" />
              {telemetry.recording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          </div>

          <Separator className="bg-white/[0.08]" />

          {telemetry.waitingRoom > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">
                  Waiting Room ({mockWaitingRoom.length})
                </h3>
              </div>
              <ScrollArea className="h-32">
                <div className="space-y-2 pr-4">
                  {mockWaitingRoom.map((participant) => (
                    <div
                      key={participant.id}
                      className="glass-panel-hover rounded-md p-3 flex items-center justify-between transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                          <p className="text-xs font-mono font-bold text-accent">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-body text-foreground">{participant.name}</p>
                          <p className="text-xs font-mono text-muted-foreground">{participant.joinedAt}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 font-mono text-xs"
                      >
                        Admit
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator className="bg-white/[0.08] my-4" />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">
                Participants ({mockParticipants.length})
              </h3>
            </div>
            <ScrollArea className="h-64">
              <div className="space-y-2 pr-4">
                {mockParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="glass-panel-hover rounded-md p-3 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <p className="text-xs font-mono font-bold text-primary">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-body text-foreground">{participant.name}</p>
                        <p className="text-xs font-mono text-muted-foreground">{participant.joinedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {participant.handRaised && (
                        <div className="px-2 py-1 rounded bg-primary/10 border border-primary/30">
                          <Hand size={14} className="text-primary" weight="fill" />
                        </div>
                      )}
                      <div className={`px-2 py-1 rounded ${
                        participant.isMuted 
                          ? 'bg-white/[0.04] border border-white/[0.08]' 
                          : 'bg-primary/10 border border-primary/30'
                      }`}>
                        {participant.isMuted ? (
                          <MicrophoneSlash size={14} className="text-muted-foreground" weight="fill" />
                        ) : (
                          <Microphone size={14} className="text-primary" weight="fill" />
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded ${
                        participant.isVideoOn 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-white/[0.04] border border-white/[0.08]'
                      }`}>
                        <VideoCamera 
                          size={14} 
                          className={participant.isVideoOn ? 'text-primary' : 'text-muted-foreground'} 
                          weight="fill" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
