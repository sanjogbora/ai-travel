# Application Information Architecture: TripTogether
## Collaborative AI-Powered Travel Planning Platform

---

## Document Purpose

This document defines the complete application information architecture for TripTogether, including:
- Application structure and routing
- Component hierarchy and organization
- Data models and relationships
- State management patterns
- API architecture and endpoints
- Real-time communication layer
- Navigation patterns and user flows

This is a technical IA document that maps how the application is structured, not a user-facing navigation design.

---

## 1. Application Structure Overview

### Technology Stack
```
Frontend: React + TypeScript + Wouter (routing) + TanStack Query (data fetching)
Backend: Express.js + TypeScript
Real-time: WebSocket (ws library)
Data Storage: In-memory (MemStorage) - designed for database migration
Styling: Tailwind CSS + shadcn/ui components
State Management: React Context + TanStack Query cache
```

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Pages      │  │  Components  │  │   Hooks      │          │
│  │  (Routes)    │  │   (UI/Logic) │  │  (State)     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
│                   ┌────────▼────────┐                           │
│                   │  TanStack Query │                           │
│                   │   (Cache Layer) │                           │
│                   └────────┬────────┘                           │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   HTTP/WS API   │
                    └────────┬────────┘
┌────────────────────────────┼──────────────────────────────────┐
│                         SERVER LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Routes     │  │   Storage    │  │  WebSocket   │          │
│  │  (REST API)  │  │  (Data Layer)│  │   Manager    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Routing Architecture

### Route Structure
The application uses Wouter for client-side routing with two main route categories:

#### 2.1 Onboarding Routes (No Sidebar)
```
/                          → Welcome (landing page)
/join                      → JoinTrip (join via invite link)
/home                      → Home (trip creation start)
/onboarding/group          → GroupSelection (friends/family/solo)
/onboarding/budget         → BudgetSelection (budget range)
/onboarding/scope          → TripScopeSelection (domestic/international)
/onboarding/dates          → DateSelection (travel dates)
/onboarding/destination    → DestinationSelection (choose destination)
/onboarding/invite         → InviteMembers (invite collaborators)
```

**Flow**: Linear progression through trip setup
**Layout**: Full-screen, no sidebar, progress stepper at top
**State**: Stored in TripPlan object, persisted to backend

#### 2.2 Main Application Routes (With Sidebar)
```
/reference-board           → ReferenceBoard (inspiration collection)
/travel-tinder             → TravelTinder (swipe activities/hotels)
/itinerary-builder         → ItineraryBuilder (build day-by-day plan)
/flights                   → Flights (flight selection)
/chat-editor               → ChatEditor (AI assistant)
/trip-report               → TripReport (final summary)
/comparison                → ComparisonView (compare itineraries)
```

**Flow**: Non-linear, user can jump between sections
**Layout**: MainLayout wrapper with persistent sidebar + collaboration bar
**State**: Shared trip context, real-time sync via WebSocket

### Route Hierarchy
```
App.tsx
├── QueryClientProvider (TanStack Query)
├── TooltipProvider (UI context)
└── Router (Wouter Switch)
    ├── Onboarding Routes (standalone pages)
    └── Main Routes
        └── MainLayout
            ├── AppSidebar (navigation)
            ├── CollaborationBar (members, activity feed)
            └── Page Content
```

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
App
├── MainLayout (wrapper for main app routes)
│   ├── AppSidebar
│   │   └── SidebarMenu (navigation items)
│   ├── CollaborationBar
│   │   ├── Member Avatars (with presence indicators)
│   │   ├── Invite Button
│   │   └── Activity Feed Toggle
│   └── Page Content (slot)
│
├── Pages (route components)
│   ├── Welcome
│   │   └── VisualTour (onboarding carousel)
│   ├── GroupSelection
│   │   └── ProgressStepper
│   ├── DateSelection
│   │   ├── AICalendarInsight
│   │   └── Calendar Component
│   ├── BudgetSelection
│   │   └── AIBudgetInsight
│   ├── TravelTinder
│   │   ├── SwipeCard (activity/hotel cards)
│   │   ├── VoteReaction (real-time vote animations)
│   │   └── CommentThread
│   ├── ItineraryBuilder
│   │   ├── ItineraryActivityCard
│   │   ├── ActivityFeedSidebar
│   │   └── BudgetSplitting
│   ├── TripReport
│   │   ├── PackingList
│   │   └── Poll
│   └── ...other pages
│
├── Shared Components
│   ├── AILoadingState (AI processing indicator)
│   ├── CollaborationShowcase (demo component)
│   ├── CommentThread (threaded discussions)
│   ├── VoteReaction (vote animations)
│   ├── Poll (voting widget)
│   ├── PackingList (shared packing)
│   └── BudgetSplitting (expense management)
│
└── UI Components (shadcn/ui)
    ├── Button, Card, Dialog, etc.
    └── Sidebar, Tooltip, Toast, etc.
```

### 3.2 Component Responsibilities

#### Layout Components
- **MainLayout**: Provides sidebar + collaboration bar wrapper
- **AppSidebar**: Primary navigation menu
- **CollaborationBar**: Persistent member presence + activity feed access

#### Page Components
- **Self-contained route handlers**
- Fetch own data via TanStack Query hooks
- Manage local UI state
- Emit WebSocket events for collaboration

#### Feature Components
- **SwipeCard**: Tinder-style card with voting
- **ItineraryActivityCard**: Draggable activity with member attribution
- **CommentThread**: Threaded comments with real-time updates
- **Poll**: Group decision-making widget
- **PackingList**: Shared packing coordination
- **BudgetSplitting**: Expense assignment and tracking

#### AI Components
- **AICalendarInsight**: Simulated AI date suggestions
- **AIBudgetInsight**: Simulated AI budget analysis
- **AILoadingState**: AI processing animations
- **ChatEditor**: AI assistant interface (page-level)

---

## 4. Data Model Architecture

### 4.1 Core Entities

```typescript
// Primary Trip Entity
TripPlan {
  id, name, createdBy
  groupType: "friends" | "family" | "solo"
  tripScope: "domestic" | "international"
  budgetMin, budgetMax
  startDate, endDate
  destinationId
  selectedHotelId?, selectedFlightId?
  referenceBoard: ReferenceItem[]
  itineraries: Itinerary[]
  selectedItineraryId?
  inviteCode?
  
  // Collaboration fields
  members: TripMember[]
  activityFeed: ActivityFeedItem[]
  polls: Poll[]
  tasks: Task[]
  packingList: PackingItem[]
  expenses: ExpenseItem[]
  versions: TripVersion[]
}

// Travel Content Entities
Destination { id, name, country, image, description, popularActivities, scope }
Hotel { id, name, destinationId, image, rating, reviewCount, price, features, safety, comfort }
Flight { id, airline, from, to, departureTime, arrivalTime, duration, price, stops, comfort, layoverDetails }
Activity { id, name, destinationId, category, image, duration, price, rating, description, tags, priority }

// Itinerary Entities
Itinerary { id, name, destinationId, hotelId, flightId, startDate, endDate, activities, totalCost, pros, cons }
ItineraryActivity { id, activityId, day, startTime, endTime, notes, addedBy?, votes?, commentCount? }

// Collaboration Entities
TripMember { id, tripId, name, email, avatar, role, isOnline, currentPage, joinedAt }
Vote { id, tripId, activityId, memberId, voteType: "love" | "maybe" | "skip", createdAt }
Comment { id, tripId, targetType, targetId, memberId, memberName, memberAvatar, content, createdAt, parentId?, replies? }
Poll { id, tripId, question, options: PollOption[], createdBy, createdAt, expiresAt? }
Task { id, tripId, title, description, assignedTo, createdBy, status, dueDate, completedAt, completedBy, createdAt }
PackingItem { id, tripId, category, name, assignedTo, isPacked, packedBy, packedAt, addedBy, createdAt }
ExpenseItem { id, tripId, name, amount, category, assignedTo, isPaid, paidBy, paidAt, splitAmong, createdAt }

// Activity Feed
ActivityFeedItem { id, tripId, type, memberId, memberName, memberAvatar, action, targetName, timestamp, metadata }
```

### 4.2 Entity Relationships

```
TripPlan (1) ──────────── (many) TripMember
    │
    ├─────────────────── (many) Vote
    ├─────────────────── (many) Comment
    ├─────────────────── (many) Poll
    ├─────────────────── (many) Task
    ├─────────────────── (many) PackingItem
    ├─────────────────── (many) ExpenseItem
    ├─────────────────── (many) ActivityFeedItem
    ├─────────────────── (many) TripVersion
    └─────────────────── (many) Itinerary
                              │
                              └─── (many) ItineraryActivity
                                        │
                                        └─── (1) Activity

Destination (1) ──────── (many) Hotel
Destination (1) ──────── (many) Activity
Destination (1) ──────── (many) Flight (conceptually)

Vote (many) ──────────── (1) Activity
Vote (many) ──────────── (1) TripMember

Comment (many) ──────── (1) TripMember
Comment (many) ──────── (1) Target (Activity | Hotel | Flight | Itinerary)
Comment (1) ────────── (many) Comment (replies)
```

### 4.3 Data Validation

All entities use Zod schemas for runtime validation:
- Defined in `shared/schema.ts`
- Shared between client and server
- Type-safe with TypeScript inference
- Validates API requests/responses

---

## 5. API Architecture

### 5.1 REST API Endpoints

```
GET  /api/destinations              → List all destinations
GET  /api/destinations/:id          → Get destination details
GET  /api/hotels?destinationId=     → List hotels (filtered by destination)
GET  /api/flights?destinationId=    → List flights (filtered by destination)
GET  /api/activities?destinationId= → List activities (filtered by destination)
GET  /api/activities/:id            → Get activity details
GET  /api/itineraries               → List itineraries
GET  /api/itineraries/:id           → Get itinerary details

// Collaboration endpoints
GET  /api/trips/:tripId/members                        → Get trip members
GET  /api/trips/:tripId/votes?activityId=              → Get votes (filtered by activity)
POST /api/trips/:tripId/votes                          → Create vote
GET  /api/trips/:tripId/activities/:activityId/votes   → Get activity votes + summary
GET  /api/trips/:tripId/comments?targetId=             → Get comments (filtered by target)
POST /api/trips/:tripId/comments                       → Create comment
```

### 5.2 API Response Patterns

**Success Response**:
```json
{
  "data": [...],
  "meta": { "count": 10 }
}
```

**Error Response**:
```json
{
  "error": "Error message",
  "status": 404
}
```

### 5.3 Data Fetching Strategy

**TanStack Query** handles all API calls:
- Automatic caching with stale-while-revalidate
- Background refetching
- Optimistic updates
- Query invalidation on mutations

**Example Hook Usage**:
```typescript
const { data: activities } = useQuery({
  queryKey: ['activities', destinationId],
  queryFn: () => fetch(`/api/activities?destinationId=${destinationId}`).then(r => r.json())
});
```

---

## 6. Real-Time Communication Layer

### 6.1 WebSocket Architecture

**Connection**: `/ws` endpoint on HTTP server
**Protocol**: JSON message passing
**Heartbeat**: 30-second ping/pong to detect disconnects

### 6.2 WebSocket Message Types

```typescript
// Client → Server
{
  type: 'join-trip',
  payload: { tripId, userId },
  timestamp: ISO8601
}

{
  type: 'presence-update',
  payload: { currentPage, status },
  timestamp: ISO8601
}

{
  type: 'vote' | 'comment' | 'itinerary-update' | 'poll-vote' | 'task-update',
  payload: { ...eventData },
  timestamp: ISO8601
}

// Server → Client
{
  type: 'connected',
  payload: { clientId },
  timestamp: ISO8601
}

{
  type: 'member-joined' | 'member-left' | 'member-disconnected',
  payload: { userId, clientId },
  timestamp: ISO8601
}

{
  type: 'presence-update',
  payload: { userId, currentPage, status },
  timestamp: ISO8601
}

// Broadcast events (echoed to all trip members)
{
  type: 'vote' | 'comment' | 'itinerary-update' | 'poll-vote' | 'task-update',
  payload: { ...eventData },
  timestamp: ISO8601
}
```

### 6.3 WebSocket Room Management

**Trip Rooms**: Clients join trip-specific rooms
- `tripRooms: Map<tripId, Set<clientId>>`
- Messages broadcast only to room members
- Automatic cleanup on disconnect

**Client Tracking**:
```typescript
Client {
  ws: WebSocket
  id: string (generated)
  tripId?: string
  userId?: string
  isAlive: boolean (heartbeat)
}
```

### 6.4 Client-Side WebSocket Integration

**Hook**: `useWebSocket(tripId, userId)`
- Manages connection lifecycle
- Handles reconnection
- Provides send/subscribe methods

**Context**: `PresenceContext`
- Tracks online members
- Updates member presence
- Provides presence state to components

**Hook**: `usePresence(tripId)`
- Consumes PresenceContext
- Returns online members list
- Provides presence update function

---

## 7. State Management Architecture

### 7.1 State Layers

```
┌─────────────────────────────────────────────────────────┐
│  Component Local State (useState, useReducer)           │
│  - UI state (modals, forms, animations)                 │
│  - Ephemeral state (hover, focus)                       │
└─────────────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────────────┐
│  React Context (PresenceContext)                        │
│  - Real-time presence data                              │
│  - WebSocket connection state                           │
└─────────────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────────────┐
│  TanStack Query Cache                                   │
│  - Server state (destinations, hotels, activities)      │
│  - Trip data (members, votes, comments)                 │
│  - Automatic caching & invalidation                     │
└─────────────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────────────┐
│  Server Storage (MemStorage)                            │
│  - In-memory data store                                 │
│  - Designed for database migration                      │
└─────────────────────────────────────────────────────────┘
```

### 7.2 State Update Patterns

**Optimistic Updates**:
```typescript
// Vote example
const voteMutation = useMutation({
  mutationFn: (vote) => api.createVote(vote),
  onMutate: async (newVote) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['votes', activityId]);
    
    // Snapshot previous value
    const previous = queryClient.getQueryData(['votes', activityId]);
    
    // Optimistically update
    queryClient.setQueryData(['votes', activityId], old => [...old, newVote]);
    
    return { previous };
  },
  onError: (err, newVote, context) => {
    // Rollback on error
    queryClient.setQueryData(['votes', activityId], context.previous);
  },
  onSettled: () => {
    // Refetch after mutation
    queryClient.invalidateQueries(['votes', activityId]);
  }
});
```

**Real-Time Sync**:
```typescript
// WebSocket listener updates query cache
useEffect(() => {
  const unsubscribe = ws.subscribe('vote', (message) => {
    queryClient.setQueryData(['votes', message.payload.activityId], old => {
      return [...old, message.payload];
    });
  });
  
  return unsubscribe;
}, [ws, queryClient]);
```

### 7.3 Custom Hooks

```typescript
// Voting hook
useVoting(tripId, activityId) {
  - Fetches votes via TanStack Query
  - Provides vote mutation
  - Subscribes to real-time vote updates
  - Returns: { votes, voteSummary, vote, isVoting }
}

// Presence hook
usePresence(tripId) {
  - Consumes PresenceContext
  - Returns online members
  - Provides updatePresence function
  - Returns: { onlineMembers, updatePresence }
}

// WebSocket hook
useWebSocket(tripId, userId) {
  - Manages WS connection
  - Handles reconnection
  - Provides send/subscribe methods
  - Returns: { send, subscribe, isConnected }
}
```

---

## 8. Navigation & User Flow Patterns

### 8.1 Onboarding Flow

```
Welcome
  ↓ (Start Planning)
Home
  ↓ (Create Trip)
GroupSelection
  ↓ (Select Group Type)
TripScopeSelection
  ↓ (Domestic/International)
BudgetSelection
  ↓ (Set Budget Range)
DateSelection
  ↓ (Pick Dates)
DestinationSelection
  ↓ (Choose Destination)
InviteMembers
  ↓ (Invite Collaborators)
ReferenceBoard (first main app page)
```

**State Persistence**: Trip data saved after each step
**Progress Indicator**: ProgressStepper component shows current step
**Navigation**: Linear, can't skip steps

### 8.2 Main App Navigation

```
AppSidebar (persistent)
├── Travel Board (ReferenceBoard)
├── Activities (TravelTinder)
├── Itinerary (ItineraryBuilder)
├── AI Assistant (ChatEditor)
├── Flights (Flights)
└── Summary (TripReport)
```

**Navigation Pattern**: Non-linear, user-driven
**Active State**: Highlighted in sidebar based on current route
**Collaboration Bar**: Persistent across all main routes

### 8.3 Collaboration Flows

**Voting Flow**:
```
TravelTinder → Swipe Card → Vote (love/maybe/skip) → WebSocket Broadcast → VoteReaction Animation → Update Vote Count
```

**Commenting Flow**:
```
Any Item → Comment Button → CommentThread Modal → Add Comment → WebSocket Broadcast → Update Comment Count
```

**Presence Flow**:
```
Join Trip → WebSocket 'join-trip' → Server Adds to Room → Broadcast 'member-joined' → Update CollaborationBar
```

**Itinerary Collaboration**:
```
ItineraryBuilder → Add Activity → Record 'addedBy' → WebSocket Broadcast → ActivityFeed Update → Show Attribution
```

---

## 9. File Structure

### 9.1 Client Structure

```
client/src/
├── main.tsx                    # Entry point
├── App.tsx                     # Root component with routing
├── index.css                   # Global styles
│
├── pages/                      # Route components
│   ├── Welcome.tsx
│   ├── Home.tsx
│   ├── GroupSelection.tsx
│   ├── BudgetSelection.tsx
│   ├── DateSelection.tsx
│   ├── DestinationSelection.tsx
│   ├── InviteMembers.tsx
│   ├── ReferenceBoard.tsx
│   ├── TravelTinder.tsx
│   ├── ItineraryBuilder.tsx
│   ├── ChatEditor.tsx
│   ├── Flights.tsx
│   ├── TripReport.tsx
│   ├── ComparisonView.tsx
│   └── not-found.tsx
│
├── components/                 # Reusable components
│   ├── MainLayout.tsx
│   ├── AppSidebar.tsx
│   ├── CollaborationBar.tsx
│   ├── ProgressStepper.tsx
│   ├── SwipeCard.tsx
│   ├── ItineraryActivityCard.tsx
│   ├── CommentThread.tsx
│   ├── VoteReaction.tsx
│   ├── Poll.tsx
│   ├── PackingList.tsx
│   ├── BudgetSplitting.tsx
│   ├── ActivityFeedSidebar.tsx
│   ├── AICalendarInsight.tsx
│   ├── AIBudgetInsight.tsx
│   ├── AILoadingState.tsx
│   ├── VisualTour.tsx
│   ├── CollaborationShowcase.tsx
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── sidebar.tsx
│       └── ...
│
├── hooks/                      # Custom hooks
│   ├── use-voting.ts
│   ├── use-presence.ts
│   ├── use-websocket.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── contexts/                   # React contexts
│   └── PresenceContext.tsx
│
├── lib/                        # Utilities
│   ├── queryClient.ts          # TanStack Query setup
│   ├── websocket.ts            # WebSocket client
│   └── utils.ts                # Helper functions
│
└── styles/
    └── animations.css          # Custom animations
```

### 9.2 Server Structure

```
server/
├── index.ts                    # Express app setup
├── routes.ts                   # REST API routes
├── storage.ts                  # Data layer (MemStorage)
├── websocket.ts                # WebSocket manager
└── vite.ts                     # Vite dev server integration
```

### 9.3 Shared Structure

```
shared/
└── schema.ts                   # Zod schemas & TypeScript types
```

---

## 10. Key Design Decisions & Rationale

### 10.1 Why Wouter over React Router?
- **Lightweight**: 1.3KB vs 10KB+
- **Simple API**: Minimal learning curve
- **Sufficient**: Meets all routing needs for this app

### 10.2 Why TanStack Query?
- **Server State Management**: Purpose-built for API data
- **Automatic Caching**: Reduces unnecessary requests
- **Optimistic Updates**: Better UX for collaborative features
- **Background Refetching**: Keeps data fresh

### 10.3 Why WebSocket over Polling?
- **Real-Time**: Instant updates for collaboration
- **Efficient**: Lower server load than polling
- **Bidirectional**: Server can push updates
- **Room-Based**: Easy to broadcast to trip members

### 10.4 Why In-Memory Storage?
- **Prototype Phase**: Fast development
- **Database-Ready**: Interface designed for easy migration
- **Type-Safe**: Zod schemas ensure data integrity
- **Testable**: Easy to reset state

### 10.5 Why Context for Presence Only?
- **Specific Use Case**: Presence needs global access
- **Real-Time Nature**: WebSocket updates need to propagate
- **Avoid Prop Drilling**: CollaborationBar needs presence everywhere
- **TanStack Query for Rest**: Server data better in query cache

---

## 11. Scalability Considerations

### 11.1 Database Migration Path

**Current**: MemStorage (in-memory)
**Future**: PostgreSQL/MongoDB

**Migration Steps**:
1. Implement IStorage interface with database client
2. Replace MemStorage with DatabaseStorage
3. Add connection pooling
4. Implement migrations for schema changes
5. Add indexes for query optimization

**No Client Changes Required**: API contracts remain the same

### 11.2 WebSocket Scaling

**Current**: Single server, in-memory rooms
**Future**: Redis pub/sub for multi-server

**Scaling Pattern**:
```
Client → Load Balancer → Server 1 ─┐
                      → Server 2 ─┼→ Redis Pub/Sub → Broadcast to all servers
                      → Server 3 ─┘
```

### 11.3 Caching Strategy

**Current**: TanStack Query client-side cache
**Future**: Add Redis for server-side caching

**Cache Layers**:
1. Client (TanStack Query): 5-minute stale time
2. Server (Redis): 1-hour TTL for read-heavy data
3. Database: Source of truth

### 11.4 File Upload Strategy

**Current**: No file uploads
**Future**: S3/CloudFlare R2 for images

**Implementation**:
- Presigned URLs for direct upload
- Thumbnail generation
- CDN distribution

---

## 12. Security Considerations

### 12.1 Authentication (Not Implemented)

**Future Implementation**:
- JWT tokens for API authentication
- OAuth for social login
- Session management
- Role-based access control (organizer/co-planner/viewer)

### 12.2 Authorization

**Current**: Trust-based (demo)
**Future**: Enforce role permissions

**Permission Matrix**:
```
Action              | Organizer | Co-Planner | Viewer
--------------------|-----------|------------|--------
Create Trip         | ✓         | ✗          | ✗
Invite Members      | ✓         | ✗          | ✗
Vote on Activities  | ✓         | ✓          | ✗
Add Comments        | ✓         | ✓          | ✗
Edit Itinerary      | ✓         | ✓          | ✗
View Trip           | ✓         | ✓          | ✓
```

### 12.3 Data Validation

**Current**: Zod schemas on both client and server
**Best Practice**: Always validate on server, client validation is UX

### 12.4 WebSocket Security

**Current**: Open connection (demo)
**Future**: 
- Authenticate WS connections with JWT
- Validate tripId membership before joining room
- Rate limiting on message frequency

---

## 13. Performance Optimizations

### 13.1 Code Splitting

**Current**: Single bundle
**Future**: Route-based code splitting

```typescript
const TravelTinder = lazy(() => import('./pages/TravelTinder'));
const ItineraryBuilder = lazy(() => import('./pages/ItineraryBuilder'));
```

### 13.2 Image Optimization

**Current**: Static images
**Future**: 
- WebP format with fallbacks
- Responsive images (srcset)
- Lazy loading below fold
- Blur placeholder while loading

### 13.3 Query Optimization

**Current**: Fetch all data
**Future**:
- Pagination for large lists
- Infinite scroll for activities
- Cursor-based pagination for feeds
- GraphQL for flexible queries

### 13.4 Bundle Size

**Current**: ~500KB (uncompressed)
**Optimization Targets**:
- Tree-shake unused UI components
- Replace moment.js with date-fns
- Lazy load heavy components
- Target: <200KB compressed

---

## 14. Testing Strategy

### 14.1 Unit Tests

**Target**: Utility functions, hooks, components
**Framework**: Vitest + React Testing Library

```typescript
// Example: useVoting hook test
test('useVoting returns vote summary', async () => {
  const { result } = renderHook(() => useVoting('trip-1', 'act-1'));
  await waitFor(() => expect(result.current.voteSummary).toBeDefined());
  expect(result.current.voteSummary.love).toBe(2);
});
```

### 14.2 Integration Tests

**Target**: API endpoints, WebSocket flows
**Framework**: Supertest + ws client

```typescript
// Example: Vote API test
test('POST /api/trips/:tripId/votes creates vote', async () => {
  const response = await request(app)
    .post('/api/trips/trip-1/votes')
    .send({ activityId: 'act-1', memberId: 'member-1', voteType: 'love' });
  expect(response.status).toBe(200);
  expect(response.body.voteType).toBe('love');
});
```

### 14.3 E2E Tests

**Target**: Critical user flows
**Framework**: Playwright

```typescript
// Example: Onboarding flow test
test('user can complete onboarding', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Start Planning');
  await page.click('[data-testid="group-friends"]');
  await page.click('text=Next');
  // ... continue through flow
  await expect(page).toHaveURL('/reference-board');
});
```

---

## 15. Deployment Architecture

### 15.1 Current Deployment

**Platform**: Vercel (or similar)
**Build**: Vite production build
**Server**: Express.js on Node.js
**Static Assets**: Served from /dist

### 15.2 Production Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CDN (CloudFlare)                    │
│  - Static assets (JS, CSS, images)                      │
│  - Edge caching                                          │
└─────────────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────────────┐
│                   Load Balancer (AWS ALB)                │
└─────────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼───────┐
│  App Server  │ │ App Server  │ │ App Server  │
│  (Node.js)   │ │ (Node.js)   │ │ (Node.js)   │
└──────┬───────┘ └──────┬──────┘ └──────┬──────┘
       │                │               │
       └────────────────┼───────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼───────┐
│  PostgreSQL  │ │    Redis    │ │     S3      │
│  (Primary)   │ │  (Cache/WS) │ │  (Images)   │
└──────────────┘ └─────────────┘ └─────────────┘
```

### 15.3 Environment Variables

```bash
# Server
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
AWS_S3_BUCKET=...

# Client (build-time)
VITE_API_URL=https://api.triptogether.com
VITE_WS_URL=wss://api.triptogether.com/ws
```

---

## 16. Monitoring & Observability

### 16.1 Logging

**Client**: 
- Error boundary for React errors
- Sentry for error tracking
- Analytics for user behavior

**Server**:
- Structured logging (Winston/Pino)
- Request/response logging
- WebSocket connection tracking

### 16.2 Metrics

**Application Metrics**:
- API response times
- WebSocket connection count
- Active trip rooms
- Query cache hit rate

**Business Metrics**:
- Trips created per day
- Average collaboration members
- Vote participation rate
- Itinerary completion rate

### 16.3 Alerts

**Critical**:
- Server down
- Database connection lost
- WebSocket server crashed

**Warning**:
- High error rate (>5%)
- Slow API responses (>2s)
- Memory usage >80%

---

## 17. Summary

### Application Architecture Highlights

1. **Modern Stack**: React + TypeScript + Express with real-time WebSocket
2. **Smart State Management**: TanStack Query for server state, Context for real-time presence
3. **Collaboration-First**: WebSocket rooms enable real-time group coordination
4. **Type-Safe**: Zod schemas ensure data integrity across client/server boundary
5. **Scalable Design**: Clean interfaces ready for database and multi-server scaling
6. **Component-Driven**: Reusable components with clear responsibilities
7. **User-Centric Routing**: Onboarding flow guides new users, main app allows exploration

### Key Technical Decisions

- **Wouter**: Lightweight routing sufficient for app needs
- **TanStack Query**: Purpose-built for API data management
- **WebSocket**: Real-time collaboration requires bidirectional communication
- **In-Memory Storage**: Fast prototyping with clear migration path
- **Zod Validation**: Runtime type safety shared between client/server

### Next Steps for Production

1. Implement authentication/authorization
2. Migrate to PostgreSQL database
3. Add Redis for WebSocket scaling
4. Implement file upload to S3
5. Add comprehensive test coverage
6. Set up monitoring and alerting
7. Optimize bundle size and performance
8. Implement proper error handling and recovery

This architecture provides a solid foundation for a collaborative travel planning application with room to scale as the product grows.

**Content Hierarchy**:
```
Discover
├── Travel Board (Pinterest-style)
│   ├── Saved Images & Videos
│   ├── Source Tags (Instagram, TikTok, etc.)
│   └── Add to Board (browser extension/share)
├── Destination Explorer
│   ├── Browse by Region/Theme
│   ├── AI Recommendations
│   └── Popular Activities Preview
└── Group Preferences
    ├── Travel Style Quiz
    ├── Interest Tags
    └── Budget Expectations
```

**Rationale**:
- Inspiration comes before decisions - users need space to dream
- Visual-first approach matches how people discover travel content
- Collaborative board lets everyone contribute ideas
- Preferences inform later AI suggestions

**Navigation Pattern**: Grid/masonry layout for visual browsing

---

### 2.3 Decide (Selection & Consensus)
**Purpose**: Make group decisions on destination, dates, accommodation, and transportation

**Content Hierarchy**:
```
Decide
├── Destination Selection
│   ├── Shortlisted Options (from Discover)
│   ├── Voting Interface (Travel Tinder)
│   ├── Comparison View
│   └── Consensus Indicator
├── Date Selection
│   ├── Calendar with Availability Heatmap
│   ├── Member Availability Overlay
│   ├── AI Suggested Dates
│   └── Duration Options
├── Accommodation
│   ├── Hotel Swipe Cards
│   ├── Vote Summary per Hotel
│   ├── Detailed Comparison
│   └── Comments & Discussion
├── Flights
│   ├── Flight Options (sorted by consensus)
│   ├── Comfort vs Cost Scoring
│   ├── Layover Details
│   └── Group Votes
└── Decision Summary
    ├── What's Locked In
    ├── What's Still Open
    └── Next Decision Needed
```

**Rationale**:
- Groups need structured ways to reach consensus
- Swipe interface makes voting fun and fast
- Comparison views help evaluate trade-offs
- Separating "decide" from "plan" reduces cognitive load

**Navigation Pattern**: Swipeable cards for voting, side-by-side for comparison

---

### 2.4 Plan (Itinerary & Logistics)
**Purpose**: Build detailed day-by-day plans and manage trip logistics

**Content Hierarchy**:
```
Plan
├── Itinerary Builder
│   ├── Day-by-Day Timeline
│   │   ├── Time Slots (drag-and-drop)
│   │   ├── Activity Cards (with "Added by")
│   │   ├── AI Suggestions (dotted placeholders)
│   │   └── Travel Time Indicators
│   ├── Activity Library
│   │   ├── Voted Activities (from Decide)
│   │   ├── AI Recommendations
│   │   └── Search & Filter
│   └── Multi-Itinerary Comparison
│       ├── Version A, B, C
│       ├── Pros/Cons
│       └── Mix & Match Mode
├── Budget Manager
│   ├── Total Cost Breakdown
│   │   ├── Flights, Hotels, Activities
│   │   ├── Food & Transportation Estimates
│   │   └── Buffer/Contingency
│   ├── Expense Assignment
│   │   ├── Who Pays What
│   │   ├── Split Calculations
│   │   └── Payment Status
│   └── Budget Alerts (over/under)
├── Logistics
│   ├── Transportation Between Activities
│   ├── Meal Planning
│   ├── Booking Windows & Deadlines
│   └── Local Tips & Recommendations
└── Version History
    ├── Saved Itinerary Versions
    ├── Change Log (who changed what)
    └── Rollback Option
```

**Rationale**:
- Planning is the most complex stage - needs dedicated workspace
- Timeline view matches how people think about daily schedules
- Budget visibility prevents surprises
- Version history provides safety net for experimentation

**Navigation Pattern**: Tabbed workspace (Itinerary | Budget | Logistics)

---

### 2.5 Prepare (Pre-Departure)
**Purpose**: Handle final tasks before departure

**Content Hierarchy**:
```
Prepare
├── Task Checklist
│   ├── Assigned Tasks (by member)
│   ├── Status (pending/in progress/done)
│   ├── Due Dates
│   └── Add Custom Tasks
├── Packing List
│   ├── Categorized Items
│   │   ├── Clothing, Toiletries, Electronics, etc.
│   │   └── Shared Items (who's bringing)
│   ├── Claimed by Member
│   ├── Packed Status
│   └── AI Suggestions (based on destination/weather)
├── Documents & Confirmations
│   ├── Flight Confirmations
│   ├── Hotel Reservations
│   ├── Activity Bookings
│   ├── Travel Insurance
│   └── Emergency Contacts
├── Final Details
│   ├── Weather Forecast
│   ├── Local Currency & Exchange
│   ├── Transportation to Airport
│   └── Meeting Point & Time
└── Countdown Timer
```

**Rationale**:
- Separates "planning what to do" from "getting ready to go"
- Checklist format reduces pre-trip anxiety
- Shared packing prevents duplication
- Countdown creates excitement

**Navigation Pattern**: Checklist with expandable sections

---

## 3. Secondary Navigation: Collaboration Hub

### Persistent Sidebar/Overlay
**Purpose**: Access collaboration features without leaving current context

**Content Hierarchy**:
```
Collaboration Hub (accessible from all sections)
├── Members
│   ├── Online Presence Indicators
│   ├── Current Page Location
│   ├── Role Badges (Organizer/Co-Planner/Viewer)
│   └── Invite New Members
├── Activity Feed
│   ├── Real-Time Updates
│   ├── Filter by Type (votes/comments/changes)
│   ├── Member Actions
│   └── Timestamps
├── Comments & Discussions
│   ├── Threaded Conversations
│   ├── Attached to Specific Items
│   ├── @Mentions
│   └── Unread Indicators
├── Polls
│   ├── Active Polls
│   ├── Voting Interface
│   ├── Results (real-time)
│   └── Create New Poll
└── Notifications
    ├── Action Required
    ├── Mentions & Replies
    ├── Decision Updates
    └── Mark as Read
```

**Rationale**:
- Collaboration is cross-cutting - needed everywhere
- Sidebar keeps it accessible without cluttering main content
- Real-time updates maintain group cohesion
- Contextual comments attach to specific items

**Navigation Pattern**: Slide-out panel or persistent right sidebar

---

## 4. Tertiary Navigation: AI Assistant

### Floating Access Point
**Purpose**: Get help, suggestions, and insights contextually

**Content Hierarchy**:
```
AI Assistant (floating button + chat interface)
├── Contextual Suggestions
│   ├── Based on Current Page
│   ├── Based on Group Preferences
│   └── Based on Incomplete Items
├── Chat Interface
│   ├── Natural Language Queries
│   ├── Quick Action Chips
│   └── Conversation History
├── Inline Insights
│   ├── Budget Analysis (on Budget page)
│   ├── Calendar Optimization (on Date page)
│   ├── Activity Recommendations (on Itinerary)
│   └── Deal Alerts (on Flights/Hotels)
└── AI Badges
    ├── "AI Suggested" Tags
    ├── Sparkle Icons
    └── Confidence Indicators
```

**Rationale**:
- AI should feel like a helpful team member, not a separate tool
- Contextual awareness makes suggestions more relevant
- Inline insights reduce need to switch contexts
- Chat provides fallback for complex questions

**Navigation Pattern**: Floating action button (bottom-right) + modal/sidebar

---

## 5. Content Type Cross-Reference

### How Features Map to Journey Stages

| Feature | Primary Location | Also Accessible From |
|---------|-----------------|---------------------|
| Destinations | Discover, Decide | Overview (if selected) |
| Hotels | Decide | Plan (in itinerary context) |
| Flights | Decide | Plan (in itinerary context) |
| Activities | Discover, Decide | Plan (activity library) |
| Itinerary | Plan | Overview (summary) |
| Budget | Plan | Overview (summary), Decide (cost context) |
| Voting | Decide | Collaboration Hub |
| Comments | Collaboration Hub | Inline on all items |
| Tasks | Prepare | Collaboration Hub, Overview |
| Packing | Prepare | - |
| Members | Collaboration Hub | Overview (avatars) |
| Activity Feed | Collaboration Hub | Overview (recent items) |
| Polls | Collaboration Hub | - |
| AI Assistant | Everywhere | - |

---

## 6. Mobile Adaptations

### Bottom Navigation Bar (Primary)
```
┌─────────────────────────────────────────────────┐
│  Overview  |  Discover  |  Decide  |  Plan  |  Prepare  │
└─────────────────────────────────────────────────┘
```

### Hamburger Menu (Secondary)
- Collaboration Hub
- AI Assistant
- Settings
- Help

### Swipe Gestures
- Swipe between days in itinerary
- Swipe cards in Travel Tinder
- Swipe to reveal comments/votes on items

**Rationale**:
- Bottom nav keeps primary navigation thumb-accessible
- Swipe gestures feel natural on mobile
- Hamburger menu reduces clutter for less-frequent features

---

## 7. Search & Wayfinding

### Global Search
**Accessible from**: Header search bar (all pages)

**Search Scope**:
- Activities (by name, category, tags)
- Hotels (by name, features)
- Flights (by airline, time)
- Comments (by content, author)
- Tasks (by title, assignee)
- Packing items (by name, category)

**Results Grouped By**:
1. Current section first
2. Then by content type
3. Then by relevance

### Breadcrumbs
```
TripTogether > Bali Adventure > Plan > Itinerary > Day 3
```

### Progress Indicators
- Visual progress bar showing completion of each stage
- Percentage complete for overall trip planning
- Badges for completed milestones

**Rationale**:
- Users should never feel lost
- Search provides escape hatch when navigation fails
- Progress indicators motivate completion

---

## 8. Information Hierarchy Principles

### 1. **Overview Before Detail**
Every section starts with a summary view before diving into specifics.

Example: Itinerary shows week overview → day view → activity details

### 2. **Collaborative Context Always Visible**
Member presence, votes, and comments are never more than one click away.

### 3. **AI Insights Are Additive, Not Intrusive**
AI suggestions appear as options, not interruptions. Users can ignore them.

### 4. **Progressive Disclosure**
Complexity is revealed gradually. New users see simplified views; power users can access advanced features.

### 5. **Consistent Patterns**
- Cards for browsable items (hotels, activities)
- Lists for actionable items (tasks, packing)
- Timelines for sequential items (itinerary, activity feed)
- Grids for visual items (travel board, destinations)

---

## 9. User Flows Through IA

### First-Time User Flow
```
Welcome Screen
  ↓
Visual Tour (shows collaboration features)
  ↓
Create Trip (basic info)
  ↓
Invite Members
  ↓
Overview Dashboard
  ↓
Discover (gather inspiration)
  ↓
Decide (vote on options)
  ↓
Plan (build itinerary)
  ↓
Prepare (final tasks)
```

### Returning User Flow
```
Overview Dashboard
  ↓
Check "What Needs Attention"
  ↓
Jump to relevant section
  ↓
Complete task/vote/comment
  ↓
Return to Overview or continue to next section
```

### Collaborative User Flow
```
Receive Notification (email/push)
  ↓
Click link to specific item
  ↓
View item with context (votes, comments)
  ↓
Take action (vote, comment, edit)
  ↓
See real-time update in Activity Feed
  ↓
Continue browsing or exit
```

---

## 10. Rationale Summary

### Why This Structure Works

1. **Matches Mental Models**: Users think in stages, not features
2. **Reduces Cognitive Load**: Each section has a clear purpose
3. **Supports Collaboration**: Hub model keeps team connected
4. **Scales with Complexity**: Simple trips use fewer sections; complex trips use all
5. **Mobile-Friendly**: Journey stages map well to bottom nav
6. **AI-Enhanced**: Assistant is contextual, not a separate destination
7. **Flexible Navigation**: Multiple paths to same content (journey vs. content type)
8. **Clear Progress**: Users always know where they are and what's next

### What Makes It Different from Current Implementation

**Current**: Feature-based navigation (Travel Board, Activities, Itinerary, Flights, Summary)
- Pros: Direct access to content types
- Cons: No clear workflow, hard to know what to do next

**Proposed**: Journey-based navigation with content types as secondary access
- Pros: Guides users through process, clear next steps, better for first-time users
- Cons: Requires more upfront explanation, may feel prescriptive to power users

**Solution**: Hybrid approach
- Primary nav: Journey stages (for guidance)
- Quick access: Content type filters within each stage
- Search: Direct access for power users who know what they want

---

## 11. Implementation Considerations

### Phase 1: Core Structure
- Implement journey-based primary navigation
- Create Overview dashboard
- Reorganize existing pages into new structure

### Phase 2: Collaboration Hub
- Build persistent sidebar/panel
- Consolidate collaboration features
- Add real-time updates

### Phase 3: AI Integration
- Add floating AI assistant
- Implement contextual insights
- Create inline suggestion system

### Phase 4: Mobile Optimization
- Adapt navigation for mobile
- Implement swipe gestures
- Optimize for touch targets

### Phase 5: Search & Wayfinding
- Build global search
- Add breadcrumbs and progress indicators
- Implement keyboard shortcuts

---

## Conclusion

This information architecture transforms TripTogether from a collection of features into a guided journey. By organizing around user mental models and trip planning stages, it makes the app intuitive for new users while remaining powerful for experienced planners. The dual navigation paradigm (journey + content type) and persistent collaboration hub ensure users can always find what they need, whether they're following the guided path or jumping directly to specific content.

The structure is designed to grow with the user: simple for quick weekend trips, comprehensive for complex international adventures, and always collaborative at its core.
