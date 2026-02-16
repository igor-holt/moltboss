# Planning Guide

A mobile-first social discovery feed where users can swipe through curated content cards with rich media, reactions, and quick actions.

**Experience Qualities**: 
1. **Fluid** - Interactions should feel smooth and responsive with gesture-based navigation that mimics native mobile apps
2. **Engaging** - Content should be visually striking with high contrast and bold typography that commands attention
3. **Intuitive** - Core actions accessible through familiar swipe gestures and prominent tap targets

**Complexity Level**: Light Application (multiple features with basic state)
This is a content browsing application with gesture interactions, persistent state for liked items, and simple navigation - perfect for demonstrating mobile-first design patterns without overwhelming complexity.

## Essential Features

### Content Card Swiping
- **Functionality**: Users can swipe through a vertical feed of content cards, each displaying an image, title, description, and action buttons
- **Purpose**: Provides an engaging, mobile-native way to browse content that feels natural on touchscreens
- **Trigger**: User scrolls or swipes vertically on the main feed
- **Progression**: App loads → User sees first card → Swipe up/down to browse → Card animates out → Next card animates in → Repeat
- **Success criteria**: Smooth 60fps animations, responsive touch gestures, cards load without visual jank

### Quick Actions
- **Functionality**: Heart/like button and share button on each card for instant engagement
- **Purpose**: Allows users to save favorite items and share content without interrupting browsing flow
- **Trigger**: User taps heart icon or share icon on a card
- **Progression**: User taps heart → Icon animates with scale/color change → Item saved to favorites → Toast confirms action
- **Success criteria**: Action feedback within 100ms, persistent state across sessions, visual confirmation

### Favorites Collection
- **Functionality**: Dedicated view showing all hearted/liked items in a grid layout
- **Purpose**: Lets users revisit content they enjoyed without scrolling through the entire feed again
- **Trigger**: User taps favorites icon in navigation
- **Progression**: User taps favorites → View transitions to grid layout → Shows all liked items → Tap card to view details → Back to favorites
- **Success criteria**: Items persist across sessions, grid is responsive, empty state guides users

### Pull to Refresh
- **Functionality**: Users can pull down on the feed to load new content
- **Purpose**: Provides a familiar mobile pattern for refreshing content and discovering new items
- **Trigger**: User drags down from top of feed
- **Progression**: User drags down → Visual indicator appears → Release past threshold → Loading animation → New content appears → Feed resets to top
- **Success criteria**: Smooth animation, clear loading state, instant feedback

### Category Filtering
- **Functionality**: Horizontal scrollable filter bar showing category chips (All, Art, Photography, Design, Music) that filters content in the feed
- **Purpose**: Allows users to discover specific types of content without scrolling through irrelevant items
- **Trigger**: User taps a category chip in the filter bar below the header
- **Progression**: User taps category → Feed instantly updates to show only matching content → Selected chip highlights with primary color → Toast confirms filter applied
- **Success criteria**: Instant filtering response, clear visual feedback on active category, smooth scroll in filter bar

## Edge Case Handling
- **Empty Favorites**: Show an encouraging empty state with an icon and message guiding users to heart items from the feed
- **Empty Category**: When a filtered category has no items, show "No content in this category" message
- **Network Errors**: Display a friendly error message with a retry button when content fails to load
- **Rapid Interactions**: Debounce like/share actions to prevent duplicate saves or spam
- **End of Feed**: Show a "You're all caught up!" message when user reaches the last item
- **Offline Mode**: Show cached favorites even when offline, with indicator that new content requires connection

## Design Direction
The design should feel energetic, youthful, and modern - like a social app that's meant to be browsed casually but with visual polish that rewards attention to detail. Bold colors, generous spacing, and fluid animations create a sense of premium quality while maintaining approachability.

## Color Selection
A vibrant, high-energy palette with deep purples and electric accents that pop on mobile screens.

- **Primary Color**: Deep Purple (oklch(0.45 0.15 285)) - Represents creativity and modern tech, serves as the main brand color for primary actions and accents
- **Secondary Colors**: 
  - Midnight Background (oklch(0.15 0.02 280)) - Dark, slightly warm background that makes content cards pop
  - Card Surface (oklch(0.22 0.03 285)) - Elevated surface color for content cards
- **Accent Color**: Electric Cyan (oklch(0.75 0.15 195)) - Eye-catching highlight for CTAs, active states, and important UI elements like the heart animation
- **Foreground/Background Pairings**: 
  - Background (oklch(0.15 0.02 280)): White text (oklch(0.98 0 0)) - Ratio 12.8:1 ✓
  - Card (oklch(0.22 0.03 285)): White text (oklch(0.98 0 0)) - Ratio 10.5:1 ✓
  - Primary (oklch(0.45 0.15 285)): White text (oklch(0.98 0 0)) - Ratio 4.9:1 ✓
  - Accent (oklch(0.75 0.15 195)): Dark text (oklch(0.15 0.02 280)) - Ratio 7.2:1 ✓

## Font Selection
Typography should be bold and contemporary with excellent readability on small screens, combining geometric precision with organic warmth.

- **Typographic Hierarchy**: 
  - H1 (Card Title): Space Grotesk Bold/24px/tight leading (-0.02em letter spacing)
  - H2 (Section Headers): Space Grotesk SemiBold/18px/normal leading
  - Body (Card Description): Inter Regular/15px/relaxed leading (1.6)
  - Small (Metadata): Inter Medium/13px/normal leading/muted color

## Animations
Animations should reinforce the mobile-native feel with spring physics and gesture-based interactions - the heart animation should be a satisfying micro-interaction with scale and color changes, card transitions should feel fluid with momentum-based scrolling, and the pull-to-refresh should have elastic resistance that builds anticipation.

## Component Selection
- **Components**: 
  - Card: Content container with image, title, description, and action buttons (custom with elevated shadow and rounded corners)
  - Button: Primary and ghost variants for navigation and actions (shadcn Button with custom styling)
  - Tabs: Bottom navigation for switching between Feed and Favorites (shadcn Tabs with mobile-optimized touch targets)
  - ScrollArea: Smooth scrolling container for content feed and horizontal category filter (shadcn ScrollArea)
  - Badge: Status indicators and tags on content cards (shadcn Badge)
  - Toast: Feedback for actions like liking and sharing (sonner)
- **Customizations**: 
  - Custom CardStack component for swipeable content cards with gesture handlers
  - Custom HeartButton with animated SVG that scales and changes color on interaction
  - Custom PullToRefresh wrapper with elastic physics
  - Custom CategoryFilter with horizontal scrolling pill buttons
- **States**: 
  - Buttons: Default (gradient background), Pressed (scale 0.95 + darker), Disabled (50% opacity)
  - Category Pills: Inactive (secondary background), Active (primary background + shadow), Pressed (scale 0.95)
  - Cards: Default (elevated), Hover/Press (scale 1.02), Swiping (transform follows gesture)
  - Heart: Unliked (outline), Liked (filled + scale pulse), Animating (spring bounce)
- **Icon Selection**: 
  - Heart for likes (Phosphor Heart/HeartFilled)
  - Share for sharing (Phosphor ShareFat)
  - Grid for favorites (Phosphor SquaresFour)
  - Feed for home (Phosphor Sparkle)
  - Arrow for navigation (Phosphor ArrowLeft)
- **Spacing**: 
  - Container padding: px-4 (16px) for main content
  - Category filter: py-3 (12px vertical), gap-2 (8px between chips)
  - Card gaps: gap-4 (16px) between cards in feed
  - Section spacing: mb-6 (24px) between major sections
  - Button padding: px-6 py-3 for primary CTAs (24px/12px)
  - Grid gaps: gap-3 (12px) for favorites grid
- **Mobile**: 
  - Single column layout throughout
  - Horizontal scrolling category filter with pill buttons below header
  - Bottom navigation bar (sticky) with large touch targets (min 44px)
  - Cards occupy 90% viewport width with side margins for swipe affordance
  - Favorites grid uses 2 columns on mobile, 3 on larger devices
  - Pull-to-refresh gesture enabled only on feed view
  - Safe area padding for notched devices
  - Horizontal scroll disabled on main feed to prevent conflicts with swipe gestures
