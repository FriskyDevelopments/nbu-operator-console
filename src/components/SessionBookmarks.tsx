import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, BookmarkSimple, Plus, X, Pencil, Check } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { useKV } from '@github/spark/hooks'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { toast } from 'sonner'

export interface SessionBookmark {
  id: string
  name: string
  sessionIds: string[]
  createdAt: number
  lastUsed: number
}

interface SessionBookmarksProps {
  currentSessions: string[]
  onLoadBookmark: (sessionIds: string[]) => void
}

export default function SessionBookmarks({ currentSessions, onLoadBookmark }: SessionBookmarksProps) {
  const [bookmarks, setBookmarks, deleteBookmarks] = useKV<SessionBookmark[]>('session-bookmarks', [])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newBookmarkName, setNewBookmarkName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const handleSaveBookmark = () => {
    if (!newBookmarkName.trim()) {
      toast.error('Please enter a bookmark name')
      return
    }

    if (currentSessions.length < 2) {
      toast.error('Select at least 2 sessions to bookmark')
      return
    }

    const newBookmark: SessionBookmark = {
      id: `bm-${Date.now()}`,
      name: newBookmarkName.trim(),
      sessionIds: currentSessions,
      createdAt: Date.now(),
      lastUsed: Date.now(),
    }

    setBookmarks((current) => [newBookmark, ...(current || [])])
    setNewBookmarkName('')
    setIsDialogOpen(false)
    toast.success(`Bookmark "${newBookmark.name}" saved`)
  }

  const handleLoadBookmark = (bookmark: SessionBookmark) => {
    setBookmarks((current) =>
      (current || []).map((b) =>
        b.id === bookmark.id ? { ...b, lastUsed: Date.now() } : b
      )
    )
    onLoadBookmark(bookmark.sessionIds)
    toast.success(`Loaded "${bookmark.name}"`)
  }

  const handleDeleteBookmark = (id: string, name: string) => {
    setBookmarks((current) => (current || []).filter((b) => b.id !== id))
    toast.success(`Deleted "${name}"`)
  }

  const handleStartEdit = (bookmark: SessionBookmark) => {
    setEditingId(bookmark.id)
    setEditName(bookmark.name)
  }

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) {
      toast.error('Bookmark name cannot be empty')
      return
    }

    setBookmarks((current) =>
      (current || []).map((b) =>
        b.id === id ? { ...b, name: editName.trim() } : b
      )
    )
    setEditingId(null)
    setEditName('')
    toast.success('Bookmark renamed')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditName('')
  }

  const sortedBookmarks = [...(bookmarks || [])].sort((a, b) => b.lastUsed - a.lastUsed)

  const canSaveCurrentSelection = currentSessions.length >= 2

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookmarkSimple size={18} weight="bold" className="text-primary" />
          <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">
            Bookmarks
          </h3>
          <Badge variant="secondary" className="font-mono text-[10px]">
            {bookmarks?.length || 0}
          </Badge>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={!canSaveCurrentSelection}
              className="glass-panel hover:glass-panel-hover h-9 px-3"
            >
              <Bookmark size={14} weight="bold" className="mr-2" />
              <span className="font-mono text-xs uppercase">Save</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/[0.08]">
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-bold uppercase tracking-wide">
                Save Bookmark
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground mb-2 block">
                  Bookmark Name
                </label>
                <Input
                  id="bookmark-name"
                  value={newBookmarkName}
                  onChange={(e) => setNewBookmarkName(e.target.value)}
                  placeholder="e.g. Weekly Team Comparison"
                  className="bg-background border-white/[0.08] h-12 font-body"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSaveBookmark()
                    }
                  }}
                />
              </div>
              <div className="glass-panel-hover rounded-md p-4">
                <p className="text-xs font-mono uppercase text-muted-foreground mb-2">
                  Sessions to bookmark
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentSessions.map((id) => (
                    <Badge key={id} variant="outline" className="font-mono text-xs">
                      {id}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSaveBookmark}
                  className="flex-1 bg-primary/30 hover:bg-primary/40 border-primary/30 text-primary font-mono text-sm uppercase"
                >
                  <Check size={16} weight="bold" className="mr-2" />
                  Save Bookmark
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsDialogOpen(false)}
                  className="glass-panel hover:glass-panel-hover"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence mode="popLayout">
        {sortedBookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel-hover rounded-md p-6 text-center"
          >
            <BookmarkSimple size={32} className="text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground font-body mb-1">
              No bookmarks yet
            </p>
            <p className="text-xs text-muted-foreground/70 font-body">
              Save session combinations to quickly access them later
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {sortedBookmarks.map((bookmark, index) => (
              <motion.div
                key={bookmark.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-panel hover:glass-panel-hover p-4 cursor-pointer transition-all group">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex-1 min-w-0"
                      onClick={() => handleLoadBookmark(bookmark)}
                    >
                      {editingId === bookmark.id ? (
                        <div className="flex items-center gap-2 mb-2">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-8 text-sm bg-background/50 border-white/[0.16]"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEdit(bookmark.id)
                              } else if (e.key === 'Escape') {
                                handleCancelEdit()
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSaveEdit(bookmark.id)
                            }}
                          >
                            <Check size={14} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCancelEdit()
                            }}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-body text-sm font-medium text-foreground truncate">
                            {bookmark.name}
                          </h4>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {bookmark.sessionIds.map((id) => (
                          <Badge
                            key={id}
                            variant="outline"
                            className="font-mono text-[10px] bg-background/30"
                          >
                            {id}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        Last used: {new Date(bookmark.lastUsed).toLocaleDateString()} at{' '}
                        {new Date(bookmark.lastUsed).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:bg-white/[0.08] flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStartEdit(bookmark)
                        }}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteBookmark(bookmark.id, bookmark.name)
                        }}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
