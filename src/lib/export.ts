import { Conversation } from '@/types'

export function exportToJSON(conversation: Conversation): string {
  return JSON.stringify(conversation, null, 2)
}

export function exportToMarkdown(conversation: Conversation): string {
  const lines = [
    `# Conversation with ${conversation.agentName}`,
    '',
    `**Date**: ${new Date(conversation.lastActivity).toLocaleString()}`,
    `**Total Messages**: ${conversation.messages.length}`,
    '',
    '---',
    ''
  ]

  conversation.messages.forEach((message) => {
    const sender = message.sender === 'user' ? 'You' : conversation.agentName
    const timestamp = new Date(message.timestamp).toLocaleString()
    
    lines.push(`### ${sender} - ${timestamp}`)
    lines.push('')
    lines.push(message.content)
    lines.push('')
  })

  return lines.join('\n')
}

export function exportToText(conversation: Conversation): string {
  const lines = [
    `Conversation with ${conversation.agentName}`,
    `Date: ${new Date(conversation.lastActivity).toLocaleString()}`,
    `Total Messages: ${conversation.messages.length}`,
    '',
    '=' .repeat(60),
    ''
  ]

  conversation.messages.forEach((message, index) => {
    const sender = message.sender === 'user' ? 'You' : conversation.agentName
    const timestamp = new Date(message.timestamp).toLocaleString()
    
    if (index > 0) lines.push('')
    lines.push(`[${sender}] ${timestamp}`)
    lines.push(message.content)
    lines.push('-'.repeat(60))
  })

  return lines.join('\n')
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function generateShareableLink(conversationId: string): string {
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}?conversation=${conversationId}`
}
