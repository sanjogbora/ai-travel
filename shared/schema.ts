import { z } from "zod";

// Travel Planning Schemas

export const groupTypeSchema = z.enum(["friends", "family", "solo"]);
export type GroupType = z.infer<typeof groupTypeSchema>;

export const tripScopeSchema = z.enum(["domestic", "international"]);
export type TripScope = z.infer<typeof tripScopeSchema>;

export const destinationSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  image: z.string(),
  description: z.string(),
  popularActivities: z.array(z.string()),
  scope: tripScopeSchema.optional(),
});
export type Destination = z.infer<typeof destinationSchema>;

export const hotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  destinationId: z.string(),
  image: z.string(),
  rating: z.number().min(1).max(5),
  reviewCount: z.number(),
  price: z.number(),
  features: z.array(z.string()),
  safety: z.number().min(1).max(5),
  comfort: z.number().min(1).max(5),
});
export type Hotel = z.infer<typeof hotelSchema>;

export const layoverSchema = z.object({
  airport: z.string(),
  duration: z.string(),
});

export const flightSchema = z.object({
  id: z.string(),
  airline: z.string(),
  from: z.string(),
  to: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  duration: z.string(),
  price: z.number(),
  stops: z.number(),
  comfort: z.number().min(1).max(5),
  comfortScore: z.number().int().min(0).max(100).optional(),
  costScore: z.number().int().min(0).max(100).optional(),
  layoverDetails: z.array(layoverSchema).optional(),
});
export type Flight = z.infer<typeof flightSchema>;
export type Layover = z.infer<typeof layoverSchema>;

export const activityPrioritySchema = z.enum(["low", "medium", "high"]);

export const activitySchema = z.object({
  id: z.string(),
  name: z.string(),
  destinationId: z.string(),
  category: z.string(),
  image: z.string(),
  duration: z.string(),
  price: z.number(),
  rating: z.number().min(1).max(5),
  description: z.string(),
  reviewCount: z.number().optional(),
  tags: z.array(z.string()).optional(),
  priority: activityPrioritySchema.optional(),
  bookingWindow: z.number().optional(),
});
export type Activity = z.infer<typeof activitySchema>;
export type ActivityPriority = z.infer<typeof activityPrioritySchema>;

export const referenceItemSchema = z.object({
  id: z.string(),
  image: z.string(),
  source: z.enum(["instagram", "tiktok", "pinterest", "youtube"]),
  title: z.string(),
  url: z.string(),
});
export type ReferenceItem = z.infer<typeof referenceItemSchema>;

export const itineraryActivitySchema = z.object({
  id: z.string(),
  activityId: z.string(),
  day: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  notes: z.string().optional(),
});
export type ItineraryActivity = z.infer<typeof itineraryActivitySchema>;

export const itinerarySchema = z.object({
  id: z.string(),
  name: z.string(),
  destinationId: z.string(),
  hotelId: z.string(),
  flightId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  activities: z.array(itineraryActivitySchema),
  totalCost: z.number(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
});
export type Itinerary = z.infer<typeof itinerarySchema>;

export const memberRoleSchema = z.enum(["organizer", "co-planner", "viewer"]);
export type MemberRole = z.infer<typeof memberRoleSchema>;

export const tripMemberSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  avatar: z.string().optional(),
  role: memberRoleSchema,
  isOnline: z.boolean().default(false),
  currentPage: z.string().optional(),
  joinedAt: z.string(),
});
export type TripMember = z.infer<typeof tripMemberSchema>;

export const voteTypeSchema = z.enum(["love", "maybe", "skip"]);
export type VoteType = z.infer<typeof voteTypeSchema>;

export const voteSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  activityId: z.string(),
  memberId: z.string(),
  voteType: voteTypeSchema,
  createdAt: z.string(),
});
export type Vote = z.infer<typeof voteSchema>;

export const commentSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  activityId: z.string(),
  memberId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  parentId: z.string().optional(),
});
export type Comment = z.infer<typeof commentSchema>;

export const tripPlanSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  createdBy: z.string().optional(),
  groupType: groupTypeSchema,
  tripScope: tripScopeSchema.optional(),
  budgetMin: z.number(),
  budgetMax: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  destinationId: z.string(),
  selectedHotelId: z.string().optional(),
  selectedFlightId: z.string().optional(),
  referenceBoard: z.array(referenceItemSchema),
  itineraries: z.array(itinerarySchema),
  selectedItineraryId: z.string().optional(),
  inviteCode: z.string().optional(),
  createdAt: z.string().optional(),
});
export type TripPlan = z.infer<typeof tripPlanSchema>;
