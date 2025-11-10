# Design Guidelines: AI Travel Planning Platform

## Design Approach
**Reference-Based Approach** drawing from:
- **Airbnb**: Card aesthetics, destination imagery, trust-building elements
- **Pinterest**: Grid-based inspiration boards, visual discovery
- **Tinder**: Swipe interactions, quick decision-making UI
- **Linear**: Clean typography and spacing for planning interfaces

**Core Principle**: Create an emotionally engaging, visually rich experience that makes travel planning feel exciting rather than overwhelming.

---

## Typography System

**Font Families** (Google Fonts):
- **Primary**: Inter (400, 500, 600, 700) - UI elements, body text, forms
- **Display**: Playfair Display (600, 700) - Hero headlines, section titles

**Type Scale**:
- Hero Headlines: text-5xl to text-7xl (Playfair Display, font-bold)
- Section Titles: text-3xl to text-4xl (Playfair Display, font-semibold)
- Card Titles: text-xl to text-2xl (Inter, font-semibold)
- Body Text: text-base to text-lg (Inter, font-normal)
- Labels/Metadata: text-sm to text-base (Inter, font-medium)
- Captions: text-xs to text-sm (Inter, font-normal)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20** (e.g., p-4, gap-6, mt-8)

**Container Strategy**:
- Full-width sections with inner `max-w-7xl mx-auto px-6`
- Card grids: `max-w-6xl`
- Timeline views: `max-w-5xl`
- Chat interfaces: `max-w-3xl`

**Responsive Grid System**:
- Mobile: Single column, full-width cards
- Tablet (md:): 2-column grids for cards
- Desktop (lg:): 3-4 column grids where appropriate

---

## Component Library

### Navigation
- **Top Navigation Bar**: Fixed/sticky header with logo left, primary actions right (Start Planning, Profile)
- **Progress Indicator**: Multi-step horizontal stepper for onboarding flow with numbered circles and connecting lines
- **Bottom Tab Bar** (Mobile): Quick access to Reference Board, Itinerary, Travel Tinder, Trip Report

### Cards & Content Blocks

**Swipe Cards** (Travel Tinder):
- Large format cards (aspect ratio 4:3) with full-bleed hero image
- Layered gradient overlay (bottom to top) for text readability
- Card content: Hotel/Activity name (text-2xl), rating stars, price badge, 3-4 key features with icons
- Swipe action buttons: Large circular buttons overlaid on image bottom (Left: X icon, Right: Heart icon) with backdrop-blur-md backgrounds
- Stack of 3 cards visible with slight rotation and scale for depth

**Destination Cards** (Location Selection):
- Image-first cards with 16:9 aspect ratio
- Destination name overlay at bottom with gradient
- Hover: Subtle scale transform (scale-105)

**Reference Board Cards** (Pinterest-style):
- Masonry grid layout (grid with varying heights)
- Image cards with rounded corners (rounded-xl)
- Overlay on hover: Save button (Pin icon) with blur background
- Each card shows source indicator (Instagram, TikTok icons as small badges)

**Activity Timeline Cards**:
- Horizontal cards with left-aligned time (text-sm, font-semibold), icon, activity name, duration
- Drag handle on left edge
- AI-suggested cards have subtle badge/indicator

### Forms & Inputs

**Budget Selector**:
- Dual-range slider with min/max handles
- Visual currency display above slider
- Preset budget buttons below: Budget-Friendly, Mid-Range, Luxury (pill-shaped toggles)

**Date Picker**:
- Calendar grid with large touch targets
- Selected range highlighted with subtle fill
- Quick select options: Weekend, Week, 2 Weeks (pill buttons above calendar)

**Group Selection**:
- Large icon-based cards in horizontal row
- Icons: Friends (group of people), Family (house), Solo (single person)
- Active state: thicker border with subtle shadow

### Interactive Elements

**Chat Interface** (Itinerary Editor):
- Message bubbles: User messages (right-aligned), AI responses (left-aligned)
- AI avatar on left with gradient circle background
- Quick action chips below AI messages: "Add this", "Show alternatives", "Skip"
- Input field: Large textarea with send button, voice input icon

**Itinerary Builder**:
- Vertical timeline with time markers on left (7am, 9am, 11am, etc.)
- Activity cards slot into timeline (drag-and-drop zones)
- Empty slots show "AI Suggestions" with dotted borders
- Day switcher at top: Horizontal scrollable tabs (Day 1, Day 2, etc.)

**Comparison View**:
- Side-by-side itinerary columns (2-3 columns on desktop, swipeable on mobile)
- Header with itinerary name and total cost
- Pros/Cons section with checkmarks and x-marks
- "Mix & Match" toggle switches between columns

### Data Display

**Trip Report**:
- Hero section with destination image collage
- Info cards grid: Duration, Total Cost, Activities Count, Travelers
- Expandable day sections with timeline view
- Weather forecast integration (icon + temperature)
- Packing list with checkboxes
- Local tips cards with custom illustrations

**Hotel/Flight Details**:
- Image gallery carousel at top
- Rating display: Stars + review count
- Feature tags: Free WiFi, Pool, Pet-Friendly (small pills)
- Price breakdown accordion
- Map integration showing location

---

## Images

**Hero Sections**:
- **Homepage**: Large hero (80vh) with rotating destination imagery carousel, gradient overlay bottom-to-top
- **Trip Report**: Destination collage (3-4 images in creative layout), 60vh height

**Card Images**:
- Swipe cards: High-quality hotel/destination photos
- Reference board: User-saved travel content images
- Activity cards: Thumbnail images (square, 80x80px)
- Destination selection: Vibrant location photography

**Icons**: Use Heroicons (outline style for most UI, solid for active states)

---

## Animations

**Minimal Animation Palette**:
- Card swipes: Smooth translate and rotate on drag
- Page transitions: Subtle fade (200ms)
- Hover states: Scale-105 transform (200ms)
- Modal entry: Slide-up from bottom (300ms)
- **NO** scroll-triggered animations, parallax, or continuous motion

---

## Key UX Patterns

**Mobile-First Swipe Mechanics**: Touch-optimized swipe gestures for Travel Tinder with visual feedback
**Progressive Disclosure**: Start simple (who, when, where), reveal complexity gradually
**Visual Feedback**: Always show state changes (selected, loading, saved)
**Collaborative Indicators**: Show when multiple users are viewing/editing (subtle avatars)
**Smart Defaults**: Pre-populate suggestions based on previous selections
**Undo/Redo**: Always available for itinerary changes

---

This design system creates an immersive, image-rich experience that transforms travel planning from a chore into an inspiring journey of discovery.