# Implementation Plan

## Phase 1: Foundation & Enhanced Onboarding

- [x] 1. Enhance Welcome Screen and Add Visual Tour



  - Update Welcome.tsx to include animated value proposition showcase
  - Create VisualTour.tsx component with modal overlay and slides
  - Add tour slides for: Invite Crew, Swipe Together, See Consensus, AI Assists, Build & Book
  - Implement skip and progress dot navigation
  - Store tour completion status in localStorage
  - _Requirements: 1.1, 1.2, 1.5_

- [x] 2. Create Collaboration Bar Component



  - Create CollaborationBar.tsx with member avatars and online status
  - Implement presence indicators (green dots for online members)
  - Add current page display on avatar hover
  - Create invite button with prominent placement
  - Make responsive: collapse to 3 avatars + "+X more" on mobile
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3. Set Up WebSocket Infrastructure



  - Create WebSocket connection utility in lib/websocket.ts
  - Implement connection, reconnection, and error handling
  - Create useWebSocket hook for component integration
  - Add message batching for performance (100ms window)
  - Implement heartbeat mechanism for presence detection
  - _Requirements: 3.2, 5.4_

- [x] 4. Implement Basic Presence System



  - Create usePresence hook to track online status
  - Update presence on page navigation
  - Throttle presence updates to every 30 seconds
  - Store presence data in shared state (Context or Zustand)
  - Display presence in CollaborationBar
  - _Requirements: 3.2, 3.3_

- [x] 5. Update Trip Schema for Collaboration



  - Extend TripPlan schema in shared/schema.ts with members array
  - Add TripMember, Vote, Comment, Poll, Task, PackingItem schemas
  - Create validation schemas with Zod
  - Update database schema if using persistent storage
  - _Requirements: All_

## Phase 2: Voting System & Enhanced Swipe Cards

- [x] 6. Implement Vote Recording System



  - Create API endpoints for recording votes (POST /api/trips/:id/votes)
  - Create API endpoint for fetching vote summaries (GET /api/trips/:id/activities/:activityId/votes)
  - Implement vote aggregation logic
  - Add optimistic updates for instant feedback
  - Store votes in trip state
  - _Requirements: 4.1, 4.5_

- [x] 7. Enhance SwipeCard Component with Vote Counts



  - Add vote count display at top of SwipeCard: "❤️ 3 • ➡️ 1 • 👎 0"
  - Create VoteSummary interface and props
  - Calculate and display consensus badge when majority agrees
  - Add comment count badge
  - Update SwipeCard styling to accommodate new elements
  - _Requirements: 4.2, 4.4_

- [x] 8. Create Vote Reaction Animation Component


  - Create VoteReaction.tsx for floating vote notifications
  - Implement animation: member avatar + vote icon, fades after 2s
  - Position near vote counts on SwipeCard
  - Trigger animation via WebSocket when other members vote
  - _Requirements: 4.3_

- [x] 9. Update TravelTinder Page with Voting



  - Integrate vote recording when user swipes
  - Display vote counts from other members
  - Show real-time vote reactions
  - Update liked state to include vote type (love/maybe/skip)
  - Add consensus indicator for group favorites
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

## Phase 3: Comments & Activity Feed

- [ ] 10. Create Comment System Backend
  - Create API endpoints: POST /api/trips/:id/comments, GET /api/trips/:id/comments
  - Implement comment storage and retrieval
  - Support threaded replies (parentId field)
  - Add real-time comment broadcasting via WebSocket
  - _Requirements: 6.1, 6.2, 6.4_

- [ ] 11. Build CommentThread Component
  - Create CommentThread.tsx with modal/slide-up panel
  - Display comments with avatars, timestamps, and content
  - Implement reply functionality for threaded discussions
  - Add real-time updates when new comments arrive
  - Create comment input with send button
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 12. Add Comment Buttons to Cards
  - Add comment button to SwipeCard component
  - Add comment button to hotel and flight cards
  - Display comment count badge on cards with existing comments
  - Open CommentThread modal on button click
  - _Requirements: 6.1, 6.3_

- [ ] 13. Create Activity Feed Sidebar Component
  - Create ActivityFeedSidebar.tsx with collapsible sidebar
  - Implement filter buttons: All, Votes, Comments, Itinerary, Tasks
  - Display chronological list of trip actions with avatars
  - Add auto-scroll to newest items
  - Make responsive: floating button + modal on mobile
  - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [ ] 14. Implement Activity Feed Data Flow
  - Create activity feed items when actions occur (votes, comments, itinerary changes)
  - Store activity feed in trip state
  - Broadcast new activities via WebSocket
  - Implement pagination: load last 50 items initially
  - Add infinite scroll for older items
  - _Requirements: 5.1, 5.2, 5.4_

## Phase 4: AI Demo Visuals

- [x] 15. Create AI Calendar Insight Component


  - Create AICalendarInsight.tsx for date selection page
  - Display fake "Analyzing your calendar..." loading animation
  - Show 2-3 suggested date ranges with reasoning
  - Add sparkle icon and "AI Insight" badge
  - Generate realistic suggestions based on member count
  - _Requirements: 2.1_

- [x] 16. Create AI Budget Insight Component



  - Create AIBudgetInsight.tsx for budget selection page
  - Display typical budget ranges for selected destination
  - Show breakdown: flights, hotels, activities, food
  - Update breakdown as user adjusts budget slider
  - Add sparkle icon and "AI Insight" badge
  - _Requirements: 2.2_

- [ ] 17. Add AI Loading States Throughout App
  - Create AILoadingState.tsx component with themed messaging
  - Add to transitions: "AI finding best deals...", "Analyzing preferences..."
  - Display during data fetching with sparkle animations
  - Use in flights, hotels, and activities loading
  - _Requirements: 2.3_

- [x] 18. Integrate AI Insights into Onboarding Flow



  - Add AICalendarInsight to DateSelection.tsx page
  - Add AIBudgetInsight to BudgetSelection.tsx page
  - Add AI badges to destination recommendations
  - Show AI deal-finding indicators on flight options
  - _Requirements: 2.1, 2.2, 2.4, 2.5_

## Phase 5: Collaborative Itinerary Building

- [ ] 19. Create Enhanced Itinerary Activity Card
  - Create or enhance ItineraryActivityCard.tsx component
  - Add "Added by [Member]" label with avatar
  - Display comment count badge
  - Show vote summary if activity was from Travel Tinder
  - Add quick action buttons: Comment, Remove, Share
  - _Requirements: 8.1, 8.2_

- [ ] 20. Implement Itinerary Attribution System
  - Record member ID when activity is added to itinerary
  - Store attribution in itinerary activity data
  - Display attribution in ItineraryActivityCard
  - Show in activity feed when activities are added
  - _Requirements: 8.1, 8.2_

- [ ] 21. Add Real-Time Itinerary Updates
  - Broadcast itinerary changes via WebSocket
  - Implement optimistic updates for drag-and-drop reordering
  - Handle concurrent edit conflicts with conflict resolution
  - Update activity feed when itinerary is modified
  - _Requirements: 8.3, 8.4, 8.5_

- [ ] 22. Update ItineraryBuilder Page
  - Integrate ItineraryActivityCard components
  - Add CollaborationBar at top
  - Show ActivityFeedSidebar
  - Implement drag-and-drop with @dnd-kit
  - Display real-time updates from other members
  - _Requirements: 8.3, 8.4_

## Phase 6: Trip Invitation System

- [ ] 23. Enhance Invite Members Page
  - Move InviteMembers to earlier in onboarding flow (after destination)
  - Add role selection: Organizer, Co-Planner, Viewer
  - Improve invite code generation (cryptographically random)
  - Add email invitation functionality
  - Show invited members with pending status
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 24. Create Join Trip Flow
  - Enhance JoinTrip.tsx page with invite code input
  - Validate invite code on server
  - Add member to trip on successful join
  - Notify organizer when member joins
  - Redirect to trip after joining
  - _Requirements: 7.2, 7.5_

- [ ] 25. Implement Role-Based Permissions
  - Create permission checking utility functions
  - Enforce permissions on API endpoints
  - Disable UI elements based on user role
  - Show appropriate error messages for permission denied
  - Add role badges to member avatars
  - _Requirements: 7.3_

## Phase 7: Advanced Collaboration Features

- [ ] 26. Create Polling System
  - Create Poll.tsx component with options and vote counts
  - Implement API endpoints: POST /api/trips/:id/polls, POST /api/trips/:id/polls/:pollId/vote
  - Display poll results in real-time as members vote
  - Show which members have voted
  - Highlight winning option when majority reached
  - Add polls to activity feed
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 27. Build Task Assignment System
  - Create TaskList.tsx component with task display and filtering
  - Implement API endpoints: POST /api/trips/:id/tasks, PATCH /api/trips/:id/tasks/:taskId
  - Allow organizers to create and assign tasks
  - Send notifications when tasks are assigned
  - Display task status: pending, in progress, completed
  - Update activity feed when tasks are completed
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 28. Create Shared Packing List
  - Create PackingList.tsx component with categorized items
  - Implement API endpoints: POST /api/trips/:id/packing, PATCH /api/trips/:id/packing/:itemId
  - Allow members to add items and claim responsibility
  - Display checkboxes for marking items as packed
  - Categorize items: Clothing, Toiletries, Electronics, Documents
  - Add export/print functionality
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 29. Implement Budget Transparency and Splitting
  - Create BudgetBreakdown.tsx component
  - Display total trip cost with itemized breakdown
  - Show who is assigned to pay for each expense
  - Calculate and display split cost per member
  - Allow organizers to assign payment responsibilities
  - Track paid versus unpaid items
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 30. Add External Sharing Capabilities
  - Create ShareButton component for activities, hotels, flights
  - Generate rich preview cards with image and details
  - Implement share via link copy, email, messaging apps
  - Create shareable public links that work for non-members
  - Display item details on shared link access without login
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

## Phase 8: Version History & Advanced Features

- [ ] 31. Implement Version History System
  - Create automatic itinerary snapshots after significant changes
  - Store versions with timestamps and member attribution
  - Create VersionHistory.tsx component to display previous versions
  - Allow organizers to preview previous itinerary versions
  - Implement rollback function to restore previous versions
  - Notify all members when rollback occurs
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 32. Create Availability Heatmap
  - Create AvailabilityHeatmap.tsx component for date selection
  - Display color-coded availability overlay on calendar
  - Allow members to manually mark their availability
  - Highlight date ranges where all members are available
  - Suggest alternative date ranges for conflicts
  - Integrate with DateSelection.tsx page
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

## Phase 9: Mobile Responsiveness & Polish

- [ ] 33. Optimize Collaboration Bar for Mobile
  - Implement collapse to 3 avatars + "+X more" on mobile
  - Create expandable member list modal
  - Make sticky at top with scroll behavior
  - Test touch interactions and tap targets
  - _Requirements: 3.1, 3.4_

- [ ] 34. Optimize Activity Feed for Mobile
  - Hide sidebar by default on mobile
  - Create floating action button with unread badge
  - Implement slide-up modal from bottom
  - Add swipe-down to dismiss gesture
  - _Requirements: 5.1, 5.3_

- [ ] 35. Optimize Swipe Cards for Mobile
  - Make cards full-screen on mobile devices
  - Ensure vote counts always visible at top
  - Add comment button to bottom bar
  - Implement haptic feedback on swipe
  - Test touch gestures and drag performance
  - _Requirements: 4.2_

- [ ] 36. Optimize Comments for Mobile
  - Create full-screen comment modal on mobile
  - Implement keyboard-aware scrolling
  - Add quick reply buttons
  - Test input focus and keyboard behavior
  - _Requirements: 6.1, 6.2_

## Phase 10: Accessibility & Testing

- [ ] 37. Add Screen Reader Support
  - Add ARIA labels to all interactive elements
  - Announce new activity feed items to screen readers
  - Describe vote counts and consensus badges
  - Provide text alternatives for all icons
  - Test with NVDA/JAWS screen readers
  - _Requirements: All_

- [ ] 38. Implement Keyboard Navigation
  - Add tab navigation through collaboration bar members
  - Implement arrow key navigation in activity feed
  - Add Enter key to open comments and modals
  - Implement Escape key to close modals
  - Test full keyboard-only navigation flow
  - _Requirements: All_

- [ ] 39. Ensure Color Contrast and Accessibility
  - Verify vote count badges meet WCAG AA standards
  - Ensure high contrast for presence indicators
  - Don't rely solely on color for consensus (add icons + text)
  - Test with color blindness simulators
  - _Requirements: All_

- [ ] 40. Implement Motion Preferences
  - Respect prefers-reduced-motion setting
  - Disable vote reaction animations if requested
  - Provide static alternatives to loading animations
  - Test with reduced motion enabled
  - _Requirements: All_

## Phase 11: Performance Optimization

- [ ] 41. Optimize WebSocket Performance
  - Implement message batching for high-activity periods
  - Prioritize critical updates (votes, comments) over presence
  - Add connection pooling for multiple trips
  - Monitor and log WebSocket performance metrics
  - _Requirements: 3.2, 4.3, 5.4_

- [ ] 42. Implement Caching Strategy
  - Cache member profiles in localStorage
  - Cache vote counts with 5-minute refresh
  - Cache last 100 activity feed items
  - Implement cache invalidation on trip change
  - _Requirements: All_

- [ ] 43. Add Optimistic UI Updates
  - Update local state immediately for all user actions
  - Show loading indicators only if server response > 500ms
  - Implement rollback on error with user notification
  - Test optimistic updates for votes, comments, itinerary changes
  - _Requirements: 4.1, 6.2, 8.4_

- [ ] 44. Optimize Activity Feed Performance
  - Implement virtual scrolling for large feeds
  - Add pagination with infinite scroll
  - Lazy load images in activity feed items
  - Debounce filter changes
  - _Requirements: 5.1, 5.3_

## Phase 12: Security & Final Polish

- [ ] 45. Implement Invite Code Security
  - Generate cryptographically random invite codes
  - Set expiration (30 days default, configurable)
  - Allow organizers to revoke codes
  - Rate limit join attempts (5 per hour per IP)
  - _Requirements: 7.1, 7.2_

- [ ] 46. Add Role-Based Access Control
  - Enforce permissions on all API endpoints
  - Validate user role on every action
  - Create audit log for organizer actions
  - Prevent privilege escalation attempts
  - _Requirements: 7.3, 15.1_

- [ ] 47. Secure Real-Time Communications
  - Authenticate WebSocket connections with tokens
  - Validate message origin and format
  - Sanitize all user-generated content
  - Rate limit message frequency per user
  - _Requirements: All WebSocket features_

- [ ] 48. Final Testing and Bug Fixes
  - Test all collaboration features end-to-end
  - Verify real-time updates work across multiple browsers
  - Test concurrent editing scenarios
  - Fix any remaining bugs and edge cases
  - Perform load testing with multiple simultaneous users
  - _Requirements: All_

## Notes

- Tasks marked with * are optional and can be skipped for MVP
- Each task should be completed and tested before moving to the next
- Real-time features require WebSocket infrastructure (Phase 1, Task 3) to be completed first
- Mobile optimization (Phase 9) can be done in parallel with other phases
- Accessibility (Phase 10) should be considered throughout development, not just at the end
