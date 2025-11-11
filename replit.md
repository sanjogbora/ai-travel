# AI Travel Planning Platform

## Overview

This is an AI-powered travel planning application that helps users create personalized trip itineraries through an engaging, swipe-based interface. The platform combines elements from Airbnb (visual cards), Pinterest (inspiration boards), Tinder (swipe interactions), and Linear (clean planning interfaces) to create an emotionally engaging travel planning experience.

The application guides users through a multi-step onboarding process to understand their travel preferences (group type, budget, dates, destination), then allows them to discover and select hotels, flights, and activities through an intuitive swipe interface. Users can build customizable itineraries with drag-and-drop functionality, collaborate on plans, and generate comprehensive trip reports.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing instead of React Router

**UI Component Library**
- shadcn/ui with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with a custom design system
- CSS variables for theming support (light/dark modes)
- Custom font configuration: Inter for UI/body text, Red Hat Display for display headings

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and synchronization
- Local storage for persisting onboarding selections (group type, budget, dates, destination)
- React hooks for local component state

**Key Design Patterns**
- Component composition with Radix UI's compound component pattern
- Custom hooks for reusable logic (e.g., `use-mobile`, `use-toast`)
- Path aliases (`@/`, `@shared/`, `@assets/`) for clean imports
- Design system based on spacing primitives (2, 4, 6, 8, 12, 16, 20 units) and responsive breakpoints

**Interactive Features**
- Drag-and-drop itinerary builder using @dnd-kit (core, sortable, utilities)
- Swipe gesture handling for "Tinder-style" card interactions
- Form validation with React Hook Form and Zod resolvers
- Toast notifications for user feedback

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for the REST API
- HTTP server created via Node's `http` module for production deployment
- Custom middleware for request logging, JSON parsing, and raw body capture

**Development Setup**
- Vite middleware mode integration for seamless dev experience with HMR
- TSX for running TypeScript server code in development
- Separate build process using esbuild for production bundling

**API Design**
- RESTful endpoints under `/api` prefix
- Centralized route registration in `server/routes.ts`
- In-memory data storage via `server/storage.ts` (mock data for destinations, hotels, flights, activities)
- Error handling with appropriate HTTP status codes (404, 500)

**Rationale**: Express provides a minimal, flexible foundation for the REST API. The in-memory storage approach enables rapid prototyping without database setup initially, though the schema definitions (Zod) prepare for future database integration.

### Data Layer

**Schema Validation**
- Zod schemas in `shared/schema.ts` for type-safe data validation across client and server
- Shared TypeScript types derived from Zod schemas using `z.infer`

**Data Models**
- `TripScope`: Enum for domestic (within India) vs international travel
- `Destination`: Travel destinations with metadata (name, country, image, popular activities, optional scope for filtering)
- `Hotel`: Accommodation options with ratings, pricing, features, and safety scores
- `Flight`: Flight information with airline, timing, duration, stops, comfort ratings, and optional comfort/cost scores (0-100) for slider-based filtering, plus optional layover details
- `Activity`: Things to do with categories, pricing, description, and optional fields for tags, priority (low/medium/high), booking window (days ahead), and review count
- `ActivityPriority`: Enum for booking urgency (low, medium, high)
- `ReferenceItem`: User-saved inspiration from external sources (Instagram, TikTok, Pinterest, YouTube)
- `Itinerary`: Daily activity schedules with timing and ordering
- `TripPlan`: Complete trip configuration including group type, budget, dates, and itinerary

**Planned Database Integration**
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver)
- Migration setup in `drizzle.config.ts` pointing to `shared/schema.ts`
- Database provisioning ready via `DATABASE_URL` environment variable
- Schema push script: `npm run db:push`

**Rationale**: Starting with in-memory storage allows rapid feature development. Zod schemas serve dual purposes: runtime validation and TypeScript types. Drizzle ORM is configured but not yet actively used, enabling a smooth transition to persistent storage when needed.

### Authentication & Session Management

**Current State**
- Session management infrastructure prepared (connect-pg-simple for PostgreSQL sessions)
- Cookie-based session handling with Express middleware
- API requests use `credentials: "include"` for session cookies

**Design Decision**: Session infrastructure is set up for future authentication implementation, but the current version operates without user accounts to simplify the initial experience.

### Image Asset Management

**Strategy**
- Static image assets stored in `attached_assets/generated_images/`
- Images imported directly in components using Vite's asset handling
- Vite alias `@assets` configured for clean import paths
- Image URLs in data models reference the static asset directory

## External Dependencies

### UI & Styling
- **shadcn/ui & Radix UI**: Comprehensive component library built on accessible primitives (accordion, alert-dialog, avatar, button, calendar, card, checkbox, dialog, dropdown-menu, form, input, label, popover, radio-group, select, slider, tabs, toast, tooltip, etc.)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **class-variance-authority**: Type-safe variant handling for component styles
- **tailwind-merge & clsx**: Utility for merging Tailwind classes without conflicts
- **Google Fonts**: Inter (UI), Playfair Display (headings), DM Sans, Fira Code, Geist Mono

### Data & Forms
- **Zod**: Schema validation library for runtime type checking
- **React Hook Form**: Performant form state management with validation
- **@hookform/resolvers**: Zod integration for React Hook Form
- **date-fns**: Modern date utility library for date manipulation in calendar/date selection

### Interaction & Drag-and-Drop
- **@dnd-kit**: Modern drag-and-drop toolkit for React (core, sortable, utilities)
- **cmdk**: Command palette component for keyboard-driven interactions
- **react-day-picker**: Flexible date picker component used in calendar UI
- **embla-carousel-react**: Carousel/slider functionality

### Icons
- **lucide-react**: Icon library for UI elements
- **react-icons**: Additional icons (SiTiktok, SiPinterest, SiYoutube for social platforms)

### Database & ORM (Configured, Not Active)
- **Drizzle ORM (drizzle-kit)**: TypeScript ORM for SQL databases
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **connect-pg-simple**: PostgreSQL session store for Express

### Build Tools & Development
- **Vite**: Fast build tool and dev server
- **@vitejs/plugin-react**: Official Vite plugin for React with Fast Refresh
- **esbuild**: Fast JavaScript bundler for production server build
- **tsx**: TypeScript execution engine for development
- **TypeScript**: Type safety across the stack
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Backend Dependencies
- **Express**: Web framework for REST API
- **@tanstack/react-query**: Powerful data synchronization for React
- **nanoid**: Unique ID generation

**Design Rationale**: The tech stack prioritizes developer experience (Vite, TypeScript, shadcn/ui), user experience (accessible components, smooth interactions), and future scalability (Drizzle ORM ready for database migration). Dependencies are modern, well-maintained, and focus on performance and type safety.