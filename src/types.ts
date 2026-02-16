export interface Agent {
  id: string
  name: string
  description: string
  capabilities: string[]
  category: string
  status: 'available' | 'busy' | 'offline'
  avatar: string
}

export interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: number
  agentId?: string
}

export interface Conversation {
  id: string
  agentId: string
  agentName: string
  messages: Message[]
  lastActivity: number
  isPinned: boolean
}
