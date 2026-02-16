import { Agent } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Robot, PaperPlaneTilt, PushPin } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface AgentCardProps {
  agent: Agent
  isPinned: boolean
  onStartConversation: (agentId: string) => void
  onTogglePin: (agentId: string) => void
}

export function AgentCard({ agent, isPinned, onStartConversation, onTogglePin }: AgentCardProps) {
  const statusColors = {
    available: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col border-border hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="text-4xl">{agent.avatar}</div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${statusColors[agent.status]}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{agent.name}</CardTitle>
                <p className="text-xs text-muted-foreground capitalize">{agent.status}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onTogglePin(agent.id)}
            >
              <PushPin weight={isPinned ? 'fill' : 'regular'} className={isPinned ? 'text-accent' : ''} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <CardDescription className="text-sm">{agent.description}</CardDescription>
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.slice(0, 3).map((capability) => (
              <Badge key={capability} variant="secondary" className="text-xs">
                {capability}
              </Badge>
            ))}
            {agent.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{agent.capabilities.length - 3}
              </Badge>
            )}
          </div>
          <Button
            onClick={() => onStartConversation(agent.id)}
            className="mt-auto w-full"
            disabled={agent.status === 'offline'}
          >
            <PaperPlaneTilt className="mr-2" weight="fill" />
            Start Conversation
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
