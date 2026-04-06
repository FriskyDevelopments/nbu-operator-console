import { Database, FileText, VideoCamera } from '@phosphor-icons/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LogEntry {
  id: string
  timestamp: string
  type: 'summary' | 'log' | 'artifact'
  title: string
  content: string
}

export default function MemoryLog() {
  const entries: LogEntry[] = [
    {
      id: 'log-001',
      timestamp: '2024-01-15 14:23:41',
      type: 'summary',
      title: 'Weekly standup session',
      content: 'Zoom session: 45 min, 12 participants, 3 hand raises addressed...',
    },
    {
      id: 'log-002',
      timestamp: '2024-01-15 13:45:12',
      type: 'log',
      title: '/zoom admit all',
      content: 'Admitted 8 participants from waiting room via Telegram command',
    },
    {
      id: 'log-003',
      timestamp: '2024-01-15 12:30:05',
      type: 'artifact',
      title: 'zoom-recording-standup-01.mp4',
      content: 'Recording completed - 1.2GB, 45min duration',
    },
    {
      id: 'log-004',
      timestamp: '2024-01-15 11:15:33',
      type: 'log',
      title: '/zoom lock',
      content: 'Session locked to 24 current participants via Discord command',
    },
  ]

  const filterByType = (type: LogEntry['type']) => entries.filter(e => e.type === type)

  const LogList = ({ items }: { items: LogEntry[] }) => (
    <div className="space-y-2">
      {items.map((entry, index) => (
        <div
          key={entry.id}
          className="glass-panel rounded-md p-4 hover:bg-white/[0.04] transition-colors cursor-pointer group"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {entry.type === 'summary' && (
                <FileText size={14} className="text-primary" weight="regular" />
              )}
              {entry.type === 'log' && (
                <Database size={14} className="text-accent" weight="regular" />
              )}
              {entry.type === 'artifact' && (
                <VideoCamera size={14} className="text-muted-foreground" weight="regular" />
              )}
              <span className="font-mono text-xs text-muted-foreground">
                {entry.timestamp}
              </span>
            </div>
          </div>
          
          <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
            {entry.title}
          </h4>
          
          <p className="text-sm text-foreground/60 line-clamp-1 font-body">
            {entry.content}
          </p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-full max-w-3xl">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="glass-panel mb-4 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white/[0.08] font-body text-xs">
            All
          </TabsTrigger>
          <TabsTrigger value="summaries" className="data-[state=active]:bg-white/[0.08] font-body text-xs">
            Summaries
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-white/[0.08] font-body text-xs">
            Logs
          </TabsTrigger>
          <TabsTrigger value="artifacts" className="data-[state=active]:bg-white/[0.08] font-body text-xs">
            Artifacts
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[400px] pr-4">
          <TabsContent value="all" className="m-0">
            <LogList items={entries} />
          </TabsContent>

          <TabsContent value="summaries" className="m-0">
            <LogList items={filterByType('summary')} />
          </TabsContent>

          <TabsContent value="logs" className="m-0">
            <LogList items={filterByType('log')} />
          </TabsContent>

          <TabsContent value="artifacts" className="m-0">
            <LogList items={filterByType('artifact')} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
