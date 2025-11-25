# Information Architecture: TripTogether
## UX Flow & Content Structure

---

## 1. Site Map

```
TripTogether
│
├── Landing & Onboarding
│   ├── Welcome Page
│   ├── Visual Tour (collaboration features)
│   ├── Create Trip
│   ├── Group Type Selection
│   ├── Trip Scope (Domestic/International)
│   ├── Budget Selection
│   ├── Date Selection
│   ├── Destination Selection
│   └── Invite Members
│
└── Main Application
    ├── Travel Board (Inspiration)
    ├── Activities (Voting & Selection)
    ├── Itinerary Builder
    ├── AI Assistant
    ├── Flights
    ├── Trip Summary
    └── Collaboration Hub (overlay)
        ├── Members & Presence
        ├── Activity Feed
        ├── Comments
        ├── Polls
        └── Tasks
```

---

## 2. User Flows

### 2.1 First-Time User Journey

```
┌─────────────────┐
│  Welcome Page   │ → Value proposition, "Start Planning" CTA
└────────┬────────┘
         ↓
┌─────────────────┐
│  Visual Tour    │ → Showcase collaboration features (3-4 slides)
└────────┬────────┘
         ↓
┌─────────────────┐
│  Create Trip    │ → Enter trip name
└────────┬────────┘
         ↓
┌─────────────────┐
│  Group Type     │ → Friends / Family / Solo
└────────┬────────┘
         ↓
┌─────────────────┐
│  Trip Scope     │ → Domestic / International
└────────┬────────┘
         ↓
┌─────────────────┐
│  Budget Range   │ → Dual slider, AI insights shown
└────────┬────────┘
         ↓
┌─────────────────┐
│  Date Selection │ → Calendar, AI availability suggestions
└────────┬────────┘
         ↓
┌─────────────────┐
│  Destination    │ → Browse cards, select destination
└────────┬────────┘
         ↓
┌─────────────────┐
│  Invite Members │ → Share link, assign roles
└────────┬────────┘
         ↓
┌─────────────────┐
│  Travel Board   │ → Enter main app
└─────────────────┘
```

**Key UX Principles**:
- Linear progression with clear next steps
- Progress indicator at top shows completion
- Can't skip steps (ensures complete trip setup)
- AI insights appear contextually (dates, budget)
- Each step takes 30-60 seconds


### 2.2 Collaborative Planning Flow

```
Member receives invite
         ↓
┌─────────────────┐
│   Join Trip     │ → One-click join via link
└────────┬────────┘
         ↓
┌─────────────────┐
│  Current State  │ → See what's been decided, what's pending
└────────┬────────┘
         ↓
┌─────────────────┐
│  Participate    │ → Vote, comment, add activities
└────────┬────────┘
         ↓
┌─────────────────┐
│  Real-time Sync │ → See others' actions instantly
└─────────────────┘
```

### 2.3 Activity Voting Flow

```
Travel Tinder Page
         ↓
┌─────────────────┐
│  View Card      │ → Hotel/Activity with image, details
└────────┬────────┘
         ↓
    Swipe Decision
    ↙    ↓    ↘
  Skip  Maybe  Love
    ↓    ↓    ↓
┌─────────────────┐
│  Vote Recorded  │ → Animation shows vote
└────────┬────────┘
         ↓
┌─────────────────┐
│  See Consensus  │ → Vote counts update, consensus badge if majority
└────────┬────────┘
         ↓
┌─────────────────┐
│  Next Card      │ → Continue voting
└─────────────────┘
```

### 2.4 Itinerary Building Flow

```
Itinerary Builder Page
         ↓
┌─────────────────┐
│  View Timeline  │ → Day-by-day schedule view
└────────┬────────┘
         ↓
┌─────────────────┐
│  Add Activity   │ → Drag from library or AI suggestions
└────────┬────────┘
         ↓
┌─────────────────┐
│  Place in Time  │ → Drop into time slot
└────────┬────────┘
         ↓
┌─────────────────┐
│  Attribution    │ → Shows "Added by [Member]"
└────────┬────────┘
         ↓
┌─────────────────┐
│  Group Sees     │ → Real-time update to all members
└────────┬────────┘
         ↓
┌─────────────────┐
│  Discuss        │ → Members can comment/vote on activity
└─────────────────┘
```

---

## 3. Page Structure & Content Hierarchy

### 3.1 Welcome Page

```
┌─────────────────────────────────────────────────┐
│  HERO SECTION                                   │
│  - Large headline: "Plan trips together"        │
│  - Subheadline: Value proposition               │
│  - CTA: "Start Planning" (primary button)       │
│  - Background: Rotating destination images      │
└─────────────────────────────────────────────────┘
│  FEATURES SHOWCASE                              │
│  - 3 columns: Collaborate, AI-Powered, Simple  │
│  - Icons + short descriptions                   │
└─────────────────────────────────────────────────┘
│  SOCIAL PROOF                                   │
│  - "Join 10,000+ travelers planning together"  │
└─────────────────────────────────────────────────┘
```

### 3.2 Travel Board (Inspiration)

```
┌─────────────────────────────────────────────────┐
│  HEADER                                         │
│  - Trip name                                    │
│  - Collaboration bar (members, invite)          │
└─────────────────────────────────────────────────┘
│  SIDEBAR (left)                                 │
│  - Navigation menu                              │
└─────────────────────────────────────────────────┘
│  MAIN CONTENT                                   │
│  ┌───────────────────────────────────────────┐ │
│  │  ADD INSPIRATION                          │ │
│  │  - Upload image / Add link                │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │  MASONRY GRID                             │ │
│  │  ┌─────┐ ┌─────┐ ┌─────┐                 │ │
│  │  │ Img │ │ Img │ │ Img │                 │ │
│  │  │ Tag │ │ Tag │ │ Tag │                 │ │
│  │  └─────┘ └─────┘ └─────┘                 │ │
│  │  ┌─────┐ ┌─────┐                         │ │
│  │  │ Img │ │ Img │                         │ │
│  │  └─────┘ └─────┘                         │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Content Elements**:
- Image cards with source badges (Instagram, TikTok, Pinterest)
- Hover: Save/Remove button
- Click: Expand to full view
- Filter by source or category

### 3.3 Travel Tinder (Activity Voting)

```
┌─────────────────────────────────────────────────┐
│  HEADER                                         │
│  - "Vote on Activities"                         │
│  - Collaboration bar                            │
└─────────────────────────────────────────────────┘
│  MAIN CONTENT                                   │
│  ┌───────────────────────────────────────────┐ │
│  │  SWIPE CARD STACK                         │ │
│  │  ┌─────────────────────────────────────┐ │ │
│  │  │  [Large Image]                      │ │ │
│  │  │                                     │ │ │
│  │  │  Activity Name                      │ │ │
│  │  │  ⭐⭐⭐⭐⭐ 4.8 (240 reviews)        │ │ │
│  │  │  💰 $45 | ⏱️ 2 hours               │ │ │
│  │  │                                     │ │ │
│  │  │  Features:                          │ │ │
│  │  │  • Feature 1                        │ │ │
│  │  │  • Feature 2                        │ │ │
│  │  │  • Feature 3                        │ │ │
│  │  │                                     │ │ │
│  │  │  [❌ Skip]  [❤️ Love]  [🤔 Maybe]  │ │ │
│  │  └─────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │  VOTE SUMMARY                             │ │
│  │  Sarah: ❤️  Mike: 🤔  Emma: ❤️           │ │
│  │  Consensus: ❤️ Love (3/4 members voted)  │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Interaction Patterns**:
- Swipe left = Skip
- Swipe right = Love
- Tap middle = Maybe
- Tap card = Expand details
- Vote animation shows real-time reactions


### 3.4 Itinerary Builder

```
┌─────────────────────────────────────────────────┐
│  HEADER                                         │
│  - Trip name & dates                            │
│  - Collaboration bar                            │
└─────────────────────────────────────────────────┘
│  DAY SELECTOR                                   │
│  [Day 1] [Day 2] [Day 3] [Day 4] [Day 5]       │
└─────────────────────────────────────────────────┘
│  MAIN CONTENT (2-column layout)                 │
│  ┌─────────────────┐  ┌────────────────────┐   │
│  │  TIMELINE       │  │  ACTIVITY LIBRARY  │   │
│  │                 │  │                    │   │
│  │  7:00 AM        │  │  Search & Filter   │   │
│  │  ┌───────────┐  │  │  ┌──────────────┐ │   │
│  │  │ Breakfast │  │  │  │ Activity 1   │ │   │
│  │  │ Added by  │  │  │  │ ⭐ 4.5 | $30 │ │   │
│  │  │ Sarah     │  │  │  │ [Add]        │ │   │
│  │  └───────────┘  │  │  └──────────────┘ │   │
│  │                 │  │  ┌──────────────┐ │   │
│  │  9:00 AM        │  │  │ Activity 2   │ │   │
│  │  [+ Add]        │  │  │ ⭐ 4.8 | $45 │ │   │
│  │  (AI suggests)  │  │  │ [Add]        │ │   │
│  │                 │  │  └──────────────┘ │   │
│  │  11:00 AM       │  │  ┌──────────────┐ │   │
│  │  ┌───────────┐  │  │  │ AI Suggests  │ │   │
│  │  │ Museum    │  │  │  │ ✨ Activity 3│ │   │
│  │  │ Added by  │  │  │  │ [Add]        │ │   │
│  │  │ You       │  │  │  └──────────────┘ │   │
│  │  │ 💬 2      │  │  │                    │   │
│  │  └───────────┘  │  │                    │   │
│  │                 │  │                    │   │
│  │  1:00 PM        │  │                    │   │
│  │  [+ Add]        │  │                    │   │
│  └─────────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────┘
│  BUDGET SUMMARY                                 │
│  Total: $1,850 / $2,000 budget                  │
│  [View Breakdown]                               │
└─────────────────────────────────────────────────┘
```

**Content Elements**:
- Drag-and-drop activities into time slots
- Member attribution on each activity
- Comment count badge
- AI suggestions with sparkle icon
- Real-time updates when others edit

### 3.5 AI Assistant (Chat)

```
┌─────────────────────────────────────────────────┐
│  HEADER                                         │
│  - "AI Travel Assistant"                        │
│  - [Close] button                               │
└─────────────────────────────────────────────────┘
│  CHAT HISTORY                                   │
│  ┌───────────────────────────────────────────┐ │
│  │  AI: Hi! I can help you plan your trip.  │ │
│  │      What would you like to know?        │ │
│  │                                           │ │
│  │  You: Suggest activities for Day 2       │ │
│  │                                           │ │
│  │  AI: Based on your budget and interests, │ │
│  │      here are 3 activities:              │ │
│  │      1. Beach Yoga ($25)                 │ │
│  │      2. Snorkeling Tour ($60)            │ │
│  │      3. Local Market ($15)               │ │
│  │      [Add to Itinerary] buttons          │ │
│  └───────────────────────────────────────────┘ │
│  QUICK ACTIONS                                  │
│  [Optimize Budget] [Find Deals] [Suggest Times] │
└─────────────────────────────────────────────────┘
│  INPUT                                          │
│  [Type your message...] [Send]                  │
└─────────────────────────────────────────────────┘
```

**Interaction Patterns**:
- Natural language input
- Quick action chips for common tasks
- AI responses include actionable buttons
- Context-aware (knows current page/trip state)

### 3.6 Trip Summary

```
┌─────────────────────────────────────────────────┐
│  HERO SECTION                                   │
│  - Destination image collage                    │
│  - Trip name & dates                            │
│  - Member avatars                               │
└─────────────────────────────────────────────────┘
│  KEY METRICS                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ 5 Days   │ │ $1,850   │ │ 12 Acts  │        │
│  │ Duration │ │ Budget   │ │ Planned  │        │
│  └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
│  ITINERARY OVERVIEW                             │
│  ┌───────────────────────────────────────────┐ │
│  │  Day 1: Arrival & Beach                   │ │
│  │  - 3 activities planned                   │ │
│  │  [Expand]                                 │ │
│  ├───────────────────────────────────────────┤ │
│  │  Day 2: Cultural Exploration              │ │
│  │  - 4 activities planned                   │ │
│  │  [Expand]                                 │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
│  PACKING LIST                                   │
│  ✅ Passport (You)                              │
│  ✅ Sunscreen (Sarah)                           │
│  ⬜ Beach towels (Mike)                         │
│  [View Full List]                               │
└─────────────────────────────────────────────────┘
│  TASKS & REMINDERS                              │
│  ⬜ Book flights (Due: 2 days)                  │
│  ⬜ Reserve hotel (Due: 5 days)                 │
│  [View All Tasks]                               │
└─────────────────────────────────────────────────┘
```

---

## 4. Collaboration Hub (Overlay)

### 4.1 Collaboration Bar (Persistent)

```
┌─────────────────────────────────────────────────┐
│  COLLABORATION BAR (top of every page)          │
│  ┌─────────────────────────────────────────┐   │
│  │ 👤 👤 👤 👤  [+Invite]  [🔔3]  [💬]    │   │
│  │ You Sarah Mike Emma                      │   │
│  │ 🟢  🟢   ⚫   🟢                         │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**Elements**:
- Member avatars with online status (green dot)
- Hover: Shows current page member is viewing
- Invite button
- Notification badge
- Activity feed toggle

### 4.2 Activity Feed (Slide-out Panel)

```
┌─────────────────────────────────────────────────┐
│  ACTIVITY FEED                          [Close] │
│  ┌───────────────────────────────────────────┐ │
│  │  Filter: [All] [Votes] [Comments] [Edits]│ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │  👤 Sarah voted ❤️ on Beach Yoga         │ │
│  │  2 minutes ago                            │ │
│  ├───────────────────────────────────────────┤ │
│  │  👤 Mike added Museum Tour to Day 2       │ │
│  │  5 minutes ago                            │ │
│  ├───────────────────────────────────────────┤ │
│  │  👤 Emma commented on Snorkeling          │ │
│  │  "This looks amazing!"                    │ │
│  │  10 minutes ago                           │ │
│  ├───────────────────────────────────────────┤ │
│  │  👤 You created a poll                    │ │
│  │  "Best time for dinner?"                  │ │
│  │  15 minutes ago                           │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 4.3 Comments (Modal/Inline)

```
┌─────────────────────────────────────────────────┐
│  COMMENTS: Beach Yoga                   [Close] │
│  ┌───────────────────────────────────────────┐ │
│  │  👤 Sarah Chen                            │ │
│  │  "This looks perfect for the morning!"    │ │
│  │  2 hours ago  [Reply]                     │ │
│  │                                           │ │
│  │    👤 You                                 │ │
│  │    "Agreed! Let's book it."              │ │
│  │    1 hour ago                            │ │
│  ├───────────────────────────────────────────┤ │
│  │  👤 Mike Johnson                          │ │
│  │  "Can we do this on Day 3 instead?"      │ │
│  │  30 minutes ago  [Reply]                  │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │  [Write a comment...]            [Send]  │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 4.4 Polls (Inline Widget)

```
┌─────────────────────────────────────────────────┐
│  POLL: Best time for dinner?                    │
│  Created by Sarah • 3/4 members voted           │
│  ┌───────────────────────────────────────────┐ │
│  │  ⚪ 6:00 PM  ████████░░ 60% (Sarah, Mike) │ │
│  │  ⚪ 7:00 PM  ████░░░░░░ 20% (Emma)        │ │
│  │  ⚪ 8:00 PM  ████░░░░░░ 20% (You)         │ │
│  └───────────────────────────────────────────┘ │
│  [Vote] or [Change Vote]                        │
└─────────────────────────────────────────────────┘
```

---

## 5. Navigation Patterns

### 5.1 Primary Navigation (Sidebar)

```
┌─────────────────┐
│  TripTogether   │
├─────────────────┤
│  🗺️ Travel Board │
│  🎯 Activities   │
│  📅 Itinerary    │
│  🤖 AI Assistant │
│  ✈️ Flights      │
│  📊 Summary      │
└─────────────────┘
```

**Behavior**:
- Always visible on main app pages
- Current page highlighted
- Icons + labels for clarity
- Collapsible on mobile

### 5.2 Mobile Navigation (Bottom Bar)

```
┌─────────────────────────────────────────────────┐
│  [🗺️]    [🎯]    [📅]    [✈️]    [📊]          │
│  Board  Activities Itinerary Flights Summary    │
└─────────────────────────────────────────────────┘
```

**Behavior**:
- Fixed at bottom
- 5 primary sections
- Active state highlighted
- Swipe between pages

### 5.3 Contextual Actions

**On Activity Cards**:
- Vote buttons (Love/Maybe/Skip)
- Comment button with count badge
- Share button
- More menu (Report, Save for later)

**On Itinerary Activities**:
- Drag handle (reorder)
- Edit time
- Remove
- Comment
- View details

**On Members**:
- View profile
- Send message
- Assign task
- Change role (organizer only)

---

## 6. Content Organization Principles

### 6.1 Information Hierarchy

**Level 1: Overview**
- Trip summary, key metrics, status
- What needs attention
- Recent activity

**Level 2: Section Views**
- Travel Board: All inspiration
- Activities: All votable items
- Itinerary: Full schedule
- Summary: Complete trip details

**Level 3: Detail Views**
- Individual activity details
- Expanded itinerary day
- Member profiles
- Comment threads

### 6.2 Progressive Disclosure

**Show Immediately**:
- Essential info (name, price, rating)
- Primary actions (vote, add, comment)
- Collaboration indicators (votes, comments)

**Show on Hover/Tap**:
- Additional details
- Secondary actions
- Member attributions

**Show on Expand**:
- Full descriptions
- All reviews
- Complete comment threads
- Detailed breakdowns

### 6.3 Collaborative Context

**Always Visible**:
- Member presence (online/offline)
- Vote counts and consensus
- Comment counts
- Recent activity indicator

**Accessible in 1 Click**:
- Full activity feed
- All comments
- Member list
- Polls and tasks

**Contextual**:
- "Added by" attribution on itinerary items
- Real-time vote reactions
- Typing indicators in comments
- Page location of online members

---

## 7. Key UX Patterns

### 7.1 Voting Pattern

1. User sees item (activity/hotel/flight)
2. Swipe or tap to vote (Love/Maybe/Skip)
3. Animation shows vote recorded
4. Vote count updates in real-time
5. Consensus badge appears if majority agrees
6. Other members see vote notification

### 7.2 Commenting Pattern

1. User taps comment button on any item
2. Modal/panel opens with existing comments
3. User types comment
4. Comment posts with avatar and timestamp
5. Other members receive notification
6. Comments support threading (replies)

### 7.3 Real-Time Collaboration Pattern

1. Member performs action (vote, add, edit)
2. Action broadcasts to all online members
3. UI updates instantly for all
4. Animation shows what changed
5. Activity feed logs the action
6. Offline members see updates on return

### 7.4 AI Assistance Pattern

1. User encounters decision point
2. AI insight appears contextually
3. User can accept, modify, or ignore
4. AI learns from user choices
5. Suggestions improve over time
6. Always optional, never blocking

---

## 8. Responsive Behavior

### 8.1 Desktop (1200px+)

- Sidebar navigation always visible
- Collaboration bar at top
- Activity feed as slide-out panel
- Multi-column layouts (timeline + library)
- Hover states for additional info

### 8.2 Tablet (768px - 1199px)

- Collapsible sidebar
- Collaboration bar condensed
- Single column with tabs
- Touch-optimized targets
- Swipe gestures enabled

### 8.3 Mobile (< 768px)

- Bottom navigation bar
- Hamburger menu for secondary nav
- Full-screen modals
- Swipe-first interactions
- Simplified layouts (single column)
- Floating action buttons

---

## 9. User Mental Model

### How Users Think About the App

**"I'm planning a trip with friends"**
- Not: "I need to access the database"
- But: "I need to see what everyone wants to do"

**"We need to decide where to stay"**
- Not: "Query the hotels table"
- But: "Let's vote on these options"

**"What's the plan for Tuesday?"**
- Not: "Filter itinerary by day 3"
- But: "Show me Tuesday's schedule"

**"Did Sarah see my comment?"**
- Not: "Check comment read status"
- But: "Is Sarah online? What's she looking at?"

### Information Architecture Supports This By:

1. **Natural Language**: Labels match how users think
2. **Visual Hierarchy**: Most important info is most prominent
3. **Contextual Actions**: Actions appear where users expect them
4. **Collaborative Visibility**: Always show who's doing what
5. **Progressive Disclosure**: Don't overwhelm, reveal gradually
6. **Familiar Patterns**: Swipe, drag-drop, chat - all recognizable

---

## 10. Success Metrics

### How We Know the IA Works

**Findability**:
- Users can locate features in < 3 clicks
- Search is rarely needed for core features
- Navigation paths are intuitive

**Efficiency**:
- Common tasks complete quickly
- No backtracking or confusion
- Clear next steps always visible

**Collaboration**:
- Members engage with each other's actions
- Real-time updates are noticed and acted on
- Group decisions reach consensus faster

**Satisfaction**:
- Users describe the flow as "natural"
- Minimal support requests about navigation
- High completion rate for trip planning

---

## Summary

This information architecture organizes TripTogether around the natural flow of collaborative trip planning:

1. **Onboarding**: Linear, guided setup with AI assistance
2. **Inspiration**: Visual, Pinterest-style collection
3. **Decision**: Swipe-based voting with real-time consensus
4. **Planning**: Timeline-based itinerary with drag-and-drop
5. **Collaboration**: Always-visible presence and activity
6. **Assistance**: Contextual AI help throughout

The structure prioritizes:
- **Clarity**: Users always know where they are and what to do next
- **Collaboration**: Group activity is visible and engaging
- **Simplicity**: Complex features revealed progressively
- **Familiarity**: Patterns borrowed from apps users already know

Every page, component, and interaction is designed to support the core user need: planning a trip together should feel fun, not overwhelming.
