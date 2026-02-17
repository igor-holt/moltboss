# Planning Guide

An agentic interface for Copilot to discover, engage with, and manage conversations with Moltboss.com bot agents.

**Experience Qualities**: 
1. **Professional** - Clean, focused interface that prioritizes functionality and clarity for productive agent interactions
2. **Efficient** - Quick access to agent discovery, conversation initiation, and context management without unnecessary friction
3. **Intelligent** - Smart organization of agent capabilities, conversation history, and contextual suggestions

**Complexity Level**: Light Application (multiple features with basic state)
This is an agent management and conversation interface with persistent state for conversations, agent discovery, and interaction history - focused on enabling Copilot to effectively engage with Moltboss bot agents.

## Essential Features

### Agent Discovery
- **Functionality**: Browse available Moltboss.com bot agents in a card-based interface showing agent name, capabilities, description, and specialization
- **Purpose**: Allows Copilot to discover and understand available agents before initiating conversations
- **Trigger**: User opens the app or navigates to the Agents tab
- **Progression**: App loads → Display agent cards with metadata → User browses agents → Select agent → View detailed capabilities → Initiate conversation
- **Success criteria**: All available agents displayed, clear capability descriptions, responsive selection

### Conversation Management
- **Functionality**: Create, view, and manage conversations with bot agents including message history and context
- **Purpose**: Enables structured, persistent conversations between Copilot and Moltboss agents
- **Trigger**: User selects an agent to start a conversation or selects an existing conversation
- **Progression**: Select agent → Conversation view opens → Input message → Send to agent → Receive response → Continue dialogue → Save conversation
- **Success criteria**: Messages persist across sessions, clear sender identification, real-time-feeling responses

### Agent Filtering
- **Functionality**: Filter agents by specialty/category (All, Data Analysis, Content Generation, Code Review, Research, etc.)
- **Purpose**: Quickly find relevant agents for specific tasks without browsing full agent list
- **Trigger**: User taps category filter in the agents view
- **Progression**: User selects category → Agent list filters instantly → Active filter highlighted → Display filtered agents
- **Success criteria**: Instant filtering, clear visual feedback, smooth transitions

### Conversation History
- **Functionality**: View all previous conversations with agents in a list view with timestamps and previews
- **Purpose**: Quick access to past interactions and context retrieval
- **Trigger**: User navigates to Conversations tab
- **Progression**: Open conversations tab → Display list of conversations → Select conversation → Resume conversation or review history
- **Success criteria**: Conversations persist, sorted by recent activity, clear agent identification

### Quick Actions
- **Functionality**: Pin important agents, mark conversations as favorites, quick-start new conversations, export conversations, share conversation links
- **Purpose**: Streamline repeated interactions with frequently used agents and enable easy sharing/archiving of conversations
- **Trigger**: User taps pin icon on agent card, star icon on conversation, or export/share button in conversation view
- **Progression**: User taps action → Visual feedback → Item marked/pinned/exported → Appears in favorites section or downloads file
- **Success criteria**: Actions respond within 100ms, state persists, visual confirmation

### Conversation Export & Sharing
- **Functionality**: Export conversations in multiple formats (JSON, Markdown, Text) and generate shareable links
- **Purpose**: Enable users to archive important conversations, share insights with others, or transfer data between systems
- **Trigger**: User taps share/export button in conversation view or conversation card
- **Progression**: Select export → Choose format (JSON/Markdown/Text) → File downloads or content copied to clipboard → Success confirmation
- **Success criteria**: Multiple export formats available, clipboard integration works, shareable links can load conversations via URL

## Edge Case Handling
- **No Agents Available**: Show empty state with message explaining agent loading or connection issues
- **Empty Conversations**: Encourage user to start first conversation with suggested agents
- **Connection Errors**: Display retry mechanism when unable to reach Moltboss.com
- **Long Messages**: Implement message truncation with expand option in conversation list
- **Agent Unavailable**: Show status indicator and alternative agent suggestions
- **Rate Limiting**: Display graceful message when API limits reached with retry timer

## Design Direction
The interface should feel like a professional developer tool - clean, minimal, and focused on productivity. Think VS Code or GitHub's interface: dark theme, subtle accents, clear hierarchy, and no unnecessary decoration. The design should fade into the background and let the agent interactions be the focus.

## Color Selection
A refined, technical palette with deep neutrals and precise accent colors that communicate professionalism and clarity.

- **Primary Color**: Vibrant Blue (oklch(0.55 0.18 250)) - Represents intelligence and technology, used for primary actions and active states
- **Secondary Colors**: 
  - Deep Slate Background (oklch(0.18 0.015 250)) - Professional dark background
  - Elevated Surface (oklch(0.24 0.02 250)) - Card and panel surfaces
  - Subtle Border (oklch(0.32 0.015 250)) - Dividers and borders
- **Accent Color**: Electric Teal (oklch(0.70 0.14 190)) - Attention color for important actions, notifications, and highlights
- **Foreground/Background Pairings**: 
  - Background (oklch(0.18 0.015 250)): White text (oklch(0.98 0 0)) - Ratio 11.2:1 ✓
  - Surface (oklch(0.24 0.02 250)): White text (oklch(0.98 0 0)) - Ratio 9.1:1 ✓
  - Primary (oklch(0.55 0.18 250)): White text (oklch(0.98 0 0)) - Ratio 5.1:1 ✓
  - Accent (oklch(0.70 0.14 190)): Dark text (oklch(0.18 0.015 250)) - Ratio 6.8:1 ✓

## Font Selection
Typefaces should prioritize readability and technical precision with a modern, clean aesthetic suitable for developer tools.

- **Typographic Hierarchy**: 
  - H1 (Page Title): JetBrains Mono Bold/32px/tight leading
  - H2 (Agent Name): Space Grotesk SemiBold/20px/normal leading
  - H3 (Section Headers): Space Grotesk Medium/16px/normal leading
  - Body (Descriptions): Inter Regular/14px/relaxed leading (1.5)
  - Code/Technical: JetBrains Mono Regular/13px/1.4 leading
  - Small (Metadata): Inter Regular/12px/muted color

## Animations
Animations should be subtle and purposeful - focus on smooth transitions between views, gentle hover states on interactive elements, and micro-interactions for button presses. Avoid flashy effects; instead use physics-based easing (spring or ease-out) for a polished, professional feel.

## Component Selection
- **Components**: 
  - Card: Agent cards with metadata, capabilities, and action buttons (shadcn Card)
  - Button: Primary and outline variants (shadcn Button)
  - Tabs: Navigation between Agents, Conversations, and Favorites (shadcn Tabs)
  - ScrollArea: Smooth scrolling for agent list and conversations (shadcn ScrollArea)
  - Badge: Status indicators and category tags (shadcn Badge)
  - Textarea: Message input for conversations (shadcn Textarea)
  - Avatar: Agent identification in conversation view (shadcn Avatar)
  - Dialog: Agent details, conversation settings, and share link display (shadcn Dialog)
  - DropdownMenu: Export and share options menu (shadcn DropdownMenu)
  - Toast: Feedback for actions (sonner)
- **Customizations**: 
  - Custom AgentCard component with capability tags and quick-start button
  - Custom ConversationView with message bubbles and input area
  - Custom CategoryFilter for agent filtering
  - Custom MessageBubble with sender identification
- **States**: 
  - Buttons: Default (solid background), Hover (slight brightness increase), Pressed (scale 0.98), Disabled (40% opacity)
  - Agent Cards: Default (elevated), Hover (border glow), Selected (primary border), Pinned (star indicator)
  - Category Pills: Inactive (muted background), Active (primary background), Hover (scale 1.02)
  - Messages: Sent (primary background), Received (surface background), Sending (reduced opacity)
- **Icon Selection**: 
  - Bot for agents (Phosphor Robot)
  - Chat for conversations (Phosphor ChatCircle)
  - Star for favorites (Phosphor Star/StarFilled)
  - Funnel for filter (Phosphor Funnel)
  - Paper plane for send (Phosphor PaperPlaneTilt)
  - Pin for pinned agents (Phosphor PushPin)
  - Plus for new conversation (Phosphor Plus)
  - Share for export/share menu (Phosphor Share)
  - Download for export actions (Phosphor Download)
  - Copy for clipboard actions (Phosphor Copy)
  - Link for shareable links (Phosphor Link)
  - Check for confirmation states (Phosphor Check)
- **Spacing**: 
  - Container padding: px-4 md:px-6 (16px/24px)
  - Category filter: py-3 gap-2 (12px vertical, 8px horizontal)
  - Card gaps: gap-4 (16px) in grid layouts
  - Section spacing: mb-6 (24px) between major sections
  - Message spacing: gap-2 (8px) between messages
  - Button padding: px-4 py-2 for standard buttons
- **Mobile**: 
  - Single column layout for agent cards on mobile, 2 columns on tablet, 3 on desktop
  - Bottom navigation bar with large touch targets
  - Conversation view optimized for mobile with sticky input at bottom
  - Collapsible agent details for space efficiency
  - Horizontal scrolling category filter
  - Safe area padding for notched devices
