import { Conversation } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { ChatCircle, PushPin } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ConversationCardProps {
  conversation: Conversation
  onClick: (conversationId: string) => void
}

export function ConversationCard({ conversation, onClick }: ConversationCardProps) {
  const lastMessage = conversation.messages[conversation.messages.length - 1]
  const timeAgo = getTimeAgo(conversation.lastActivity)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card 
        className="cursor-pointer border-border hover:border-primary/50 transition-colors"
        onClick={() => onClick(conversation.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">{getAgentAvatar(conversation.agentId)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-medium truncate">{conversation.agentName}</h3>
                <div className="flex items-center gap-2 shrink-0">
                  {conversation.isPinned && (
                    <PushPin weight="fill" className="w-4 h-4 text-accent" />
                  )}
                  <span className="text-xs text-muted-foreground">{timeAgo}</span>
                </div>
              </div>
              {lastMessage && (
                <p className="text-sm text-muted-foreground truncate">
                  {lastMessage.sender === 'user' ? 'You: ' : ''}
                  {lastMessage.content}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function getAgentAvatar(agentId: string): string {
  const avatars: Record<string, string> = {
    'agent-1': '📊',
    'agent-2': '✍️',
    'agent-3': '🔍',
    'agent-4': '📚',
    'agent-5': '🎨',
    'agent-6': '⚙️',
    'agent-7': '🔗',
    'agent-8': '🤖'
  }
  return avatars[agentId] || '🤖'
}
