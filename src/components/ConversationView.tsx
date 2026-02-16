import { Conversation, Message } from '@/types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PaperPlaneTilt, ArrowLeft } from '@phosphor-icons/react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConversationViewProps {
  conversation: Conversation
  onSendMessage: (conversationId: string, content: string) => void
  onBack: () => void
}

export function ConversationView({ conversation, onSendMessage, onBack }: ConversationViewProps) {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversation.messages])

  const handleSend = async () => {
    if (!message.trim() || isSending) return
    
    setIsSending(true)
    onSendMessage(conversation.id, message)
    setMessage('')
    
    setTimeout(() => {
      setIsSending(false)
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border bg-card/50 backdrop-blur-xl px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
          </Button>
          <div className="text-2xl">{getAgentAvatar(conversation.agentId)}</div>
          <div>
            <h2 className="font-semibold">{conversation.agentName}</h2>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div ref={scrollRef} className="py-4 space-y-4">
          <AnimatePresence>
            {conversation.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-card/50 backdrop-blur-xl p-4">
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[80px] resize-none"
            disabled={isSending}
          />
          <Button 
            onClick={handleSend} 
            disabled={!message.trim() || isSending}
            size="icon"
            className="h-[80px] w-12 shrink-0"
          >
            <PaperPlaneTilt weight="fill" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <p className="text-[10px] mt-1 opacity-60">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  )
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
