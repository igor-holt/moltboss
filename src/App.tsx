import { useState, useMemo, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Robot, ChatCircle, Star } from '@phosphor-icons/react'
import { AgentCard } from '@/components/AgentCard'
import { ConversationCard } from '@/components/ConversationCard'
import { ConversationView } from '@/components/ConversationView'
import { CategoryFilter } from '@/components/CategoryFilter'
import { agents } from '@/data/agents'
import { Conversation, Message } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [pinnedAgents, setPinnedAgents] = useKV<string[]>('pinned-agents', [])
  const [conversations, setConversations] = useKV<Conversation[]>('conversations', [])
  const [activeTab, setActiveTab] = useState('agents')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeConversation, setActiveConversation] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sharedConversationId = params.get('conversation')
    
    if (sharedConversationId && conversations) {
      const conversation = conversations.find(c => c.id === sharedConversationId)
      if (conversation) {
        setActiveConversation(sharedConversationId)
        setActiveTab('conversations')
        toast.success('Loaded shared conversation')
      } else {
        toast.error('Conversation not found')
      }
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [conversations])

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(agents.map(agent => agent.category)))
    return ['All', ...uniqueCategories.sort()]
  }, [])

  const filteredAgents = useMemo(() => {
    if (selectedCategory === 'All') {
      return agents
    }
    return agents.filter(agent => agent.category === selectedCategory)
  }, [selectedCategory])

  const handleTogglePin = (agentId: string) => {
    setPinnedAgents((current) => {
      const currentPins = current || []
      if (currentPins.includes(agentId)) {
        toast.success('Agent unpinned')
        return currentPins.filter(id => id !== agentId)
      } else {
        toast.success('Agent pinned')
        return [...currentPins, agentId]
      }
    })
  }

  const handleStartConversation = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (!agent) return

    const existingConversation = conversations?.find(c => c.agentId === agentId)
    
    if (existingConversation) {
      setActiveConversation(existingConversation.id)
      setActiveTab('conversations')
      toast.success('Resuming conversation')
    } else {
      const newConversation: Conversation = {
        id: `conv-${Date.now()}`,
        agentId: agent.id,
        agentName: agent.name,
        messages: [
          {
            id: `msg-${Date.now()}`,
            content: `Hello! I'm ${agent.name}. ${agent.description} How can I help you today?`,
            sender: 'agent',
            timestamp: Date.now(),
            agentId: agent.id
          }
        ],
        lastActivity: Date.now(),
        isPinned: false
      }

      setConversations((current) => [...(current || []), newConversation])
      setActiveConversation(newConversation.id)
      setActiveTab('conversations')
      toast.success('Conversation started')
    }
  }

  const handleSendMessage = (conversationId: string, content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: Date.now()
    }

    setConversations((current) => {
      const updatedConversations = (current || []).map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, userMessage],
            lastActivity: Date.now()
          }
        }
        return conv
      })
      return updatedConversations
    })

    setTimeout(() => {
      const agentMessage: Message = {
        id: `msg-${Date.now()}-agent`,
        content: generateAgentResponse(content),
        sender: 'agent',
        timestamp: Date.now()
      }

      setConversations((current) => {
        const updatedConversations = (current || []).map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, agentMessage],
              lastActivity: Date.now()
            }
          }
          return conv
        })
        return updatedConversations
      })
    }, 1000)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    toast.success(`Showing ${category === 'All' ? 'all agents' : category}`)
  }

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversation(conversationId)
  }

  const activeConvData = conversations?.find(c => c.id === activeConversation)

  if (activeConvData) {
    return (
      <div className="h-screen bg-background text-foreground">
        <Toaster position="top-center" />
        <ConversationView
          conversation={activeConvData}
          onSendMessage={handleSendMessage}
          onBack={() => setActiveConversation(null)}
        />
      </div>
    )
  }

  const pinnedAgentsList = agents.filter(agent => pinnedAgents?.includes(agent.id))
  const sortedConversations = [...(conversations || [])].sort((a, b) => b.lastActivity - a.lastActivity)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Toaster position="top-center" />
      
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Robot weight="duotone" className="text-primary" size={32} />
            <span className="font-mono">Moltboss Agent Interface</span>
          </h1>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card/30 backdrop-blur-xl">
          {activeTab === 'agents' && (
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          )}
        </div>
        
        <main className="flex-1 overflow-hidden">
          <TabsContent value="agents" className="h-full m-0">
            <div className="h-full overflow-y-auto pb-24">
              <div className="container max-w-6xl mx-auto px-4 py-6">
                {pinnedAgentsList.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Star weight="fill" className="text-accent" />
                      Pinned Agents
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pinnedAgentsList.map((agent) => (
                        <AgentCard
                          key={agent.id}
                          agent={agent}
                          isPinned={true}
                          onStartConversation={handleStartConversation}
                          onTogglePin={handleTogglePin}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <h2 className="text-lg font-semibold mb-4">
                  {selectedCategory === 'All' ? 'All Agents' : selectedCategory}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="wait">
                    {filteredAgents.map((agent) => (
                      <AgentCard
                        key={agent.id}
                        agent={agent}
                        isPinned={pinnedAgents?.includes(agent.id) || false}
                        onStartConversation={handleStartConversation}
                        onTogglePin={handleTogglePin}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conversations" className="h-full m-0">
            <div className="h-full overflow-y-auto pb-24">
              <div className="container max-w-4xl mx-auto px-4 py-6">
                {sortedConversations.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <ChatCircle size={64} weight="duotone" className="text-muted-foreground mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No conversations yet</h2>
                    <p className="text-muted-foreground mb-6">
                      Start a conversation with an agent to begin
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {sortedConversations.map((conversation) => (
                      <ConversationCard
                        key={conversation.id}
                        conversation={conversation}
                        onClick={handleSelectConversation}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </main>

        <TabsList className="fixed bottom-0 left-0 right-0 h-auto rounded-none border-t border-border bg-background/95 backdrop-blur-xl grid grid-cols-2 p-2">
          <TabsTrigger 
            value="agents"
            className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
          >
            <Robot weight={activeTab === 'agents' ? 'fill' : 'regular'} className="w-6 h-6" />
            <span className="text-xs font-medium">Agents</span>
          </TabsTrigger>
          <TabsTrigger 
            value="conversations"
            className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
          >
            <ChatCircle weight={activeTab === 'conversations' ? 'fill' : 'regular'} className="w-6 h-6" />
            <span className="text-xs font-medium">Conversations</span>
            {conversations && conversations.length > 0 && (
              <span className="absolute top-2 right-1/4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {conversations.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

function generateAgentResponse(userMessage: string): string {
  const responses = [
    "I understand your request. Let me analyze that for you.",
    "That's an interesting question. Based on my capabilities, I can help you with that.",
    "I've processed your input. Here's what I suggest...",
    "Great question! Let me break that down for you.",
    "I can definitely assist with that. Here's my analysis..."
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export default App
