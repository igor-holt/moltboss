import { Conversation } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Download, Share, Copy, Check, Link } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  exportToJSON,
  exportToMarkdown,
  exportToText,
  downloadFile,
  copyToClipboard,
  generateShareableLink,
} from '@/lib/export'

interface ExportShareMenuProps {
  conversation: Conversation
}

export function ExportShareMenu({ conversation }: ExportShareMenuProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleExportJSON = () => {
    const content = exportToJSON(conversation)
    const filename = `conversation-${conversation.agentName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`
    downloadFile(content, filename, 'application/json')
    toast.success('Exported as JSON')
  }

  const handleExportMarkdown = () => {
    const content = exportToMarkdown(conversation)
    const filename = `conversation-${conversation.agentName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.md`
    downloadFile(content, filename, 'text/markdown')
    toast.success('Exported as Markdown')
  }

  const handleExportText = () => {
    const content = exportToText(conversation)
    const filename = `conversation-${conversation.agentName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`
    downloadFile(content, filename, 'text/plain')
    toast.success('Exported as Text')
  }

  const handleCopyAsText = async () => {
    const content = exportToText(conversation)
    await copyToClipboard(content)
    toast.success('Copied to clipboard')
  }

  const handleCopyAsMarkdown = async () => {
    const content = exportToMarkdown(conversation)
    await copyToClipboard(content)
    toast.success('Copied as Markdown')
  }

  const handleGenerateLink = () => {
    setShareDialogOpen(true)
  }

  const handleCopyShareLink = async () => {
    const link = generateShareableLink(conversation.id)
    await copyToClipboard(link)
    setCopied(true)
    toast.success('Link copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Share weight="bold" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleExportJSON}>
            <Download className="mr-2" />
            Export as JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportMarkdown}>
            <Download className="mr-2" />
            Export as Markdown
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportText}>
            <Download className="mr-2" />
            Export as Text
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCopyAsText}>
            <Copy className="mr-2" />
            Copy as Text
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyAsMarkdown}>
            <Copy className="mr-2" />
            Copy as Markdown
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleGenerateLink}>
            <Link className="mr-2" />
            Generate Share Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Conversation</DialogTitle>
            <DialogDescription>
              Share this conversation with a link. Anyone with the link can view the conversation history.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={generateShareableLink(conversation.id)}
                className="flex-1 px-3 py-2 bg-muted rounded-lg text-sm font-mono text-foreground"
              />
              <Button onClick={handleCopyShareLink} size="icon" variant="outline">
                {copied ? <Check weight="bold" className="text-accent" /> : <Copy weight="bold" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: This link will work for anyone who has access to this application.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
