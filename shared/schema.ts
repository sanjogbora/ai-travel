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

export const targetTypeSchema = z.enum(["activity", "hotel", "flight", "itinerary"]);
export type TargetType = z.infer<typeof targetTypeSchema>;

export const commentSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  targetType: targetTypeSchema,
  targetId: z.string(),
  memberId: z.string(),
  memberName: z.string(),
  memberAvatar: z.string().optional(),
  content: z.string(),
  createdAt: z.string(),
  parentId: z.string().optional(),
  replies: z.array(z.lazy(() => commentSchema)).optional(),
});
export type Comment = z.infer<typeof commentSchema>;

export const activityFeedItemTypeSchema = z.enum(["vote", "comment", "itinerary", "task", "member", "poll"]);
export type ActivityFeedItemType = z.infer<typeof activityFeedItemTypeSchema>;

export const activityFeedItemSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  type: activityFeedItemTypeSchema,
  memberId: z.string(),
  memberName: z.string(),
  memberAvatar: z.string().optional(),
  action: z.string(),
  targetName: z.string().optional(),
  timestamp: z.string(),
  metadata: z.record(z.any()).optional(),
});
export type ActivityFeedItem = z.infer<typeof activityFeedItemSchema>;

export const pollOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  votes: z.array(z.string()), // member IDs
});
export type PollOption = z.infer<typeof pollOptionSchema>;

export const pollSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  question: z.string(),
  options: z.array(pollOptionSchema),
  createdBy: z.string(),
  createdAt: z.string(),
  expiresAt: z.string().optional(),
});
export type Poll = z.infer<typeof pollSchema>;

export const taskStatusSchema = z.enum(["pending", "in_progress", "completed"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  assignedTo: z.array(z.string()), // member IDs
  createdBy: z.string(),
  status: taskStatusSchema,
  dueDate: z.string().optional(),
  completedAt: z.string().optional(),
  completedBy: z.string().optional(),
  createdAt: z.string(),
});
export type Task = z.infer<typeof taskSchema>;

export const packingItemCategorySchema = z.enum([
  "clothing",
  "toiletries",
  "electronics",
  "documents",
  "medications",
  "accessories",
  "other"
]);
export type PackingItemCategory = z.infer<typeof packingItemCategorySchema>;

export const packingItemSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  category: packingItemCategorySchema,
  name: z.string(),
  assignedTo: z.string().optional(), // member ID
  isPacked: z.boolean().default(false),
  packedBy: z.string().optional(),
  packedAt: z.string().optional(),
  addedBy: z.string(),
  createdAt: z.string(),
});
export type PackingItem = z.infer<typeof packingItemSchema>;

export const expenseItemSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  name: z.string(),
  amount: z.number(),
  category: z.enum(["flights", "hotels", "activities", "food", "transportation", "other"]),
  assignedTo: z.string().optional(), // member ID who will pay
  isPaid: z.boolean().default(false),
  paidBy: z.string().optional(),
  paidAt: z.string().optional(),
  splitAmong: z.array(z.string()).optional(), // member IDs to split cost
  createdAt: z.string(),
});
export type ExpenseItem = z.infer<typeof expenseItemSchema>;

export const tripVersionSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  snapshot: z.record(z.any()), // Partial trip data
  createdBy: z.string(),
  createdAt: z.string(),
  changeDescription: z.string(),
});
export type TripVersion = z.infer<typeof tripVersionSchema>;

export const voteSummarySchema = z.object({
  love: z.number().default(0),
  maybe: z.number().default(0),
  skip: z.number().default(0),
  userVote: voteTypeSchema.optional(),
  consensusType: voteTypeSchema.optional(),
});
export type VoteSummary = z.infer<typeof voteSummarySchema>;

export const enhancedItineraryActivitySchema = itineraryActivitySchema.extend({
  addedBy: z.string().optional(), // member ID
  votes: voteSummarySchema.optional(),
  commentCount: z.number().default(0),
});
export type EnhancedItineraryActivity = z.infer<typeof enhancedItineraryActivitySchema>;

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
  // Collaboration fields
  members: z.array(tripMemberSchema).optional(),
  activityFeed: z.array(activityFeedItemSchema).optional(),
  polls: z.array(pollSchema).optional(),
  tasks: z.array(taskSchema).optional(),
  packingList: z.array(packingItemSchema).optional(),
  expenses: z.array(expenseItemSchema).optional(),
  versions: z.array(tripVersionSchema).optional(),
});
export type TripPlan = z.infer<typeof tripPlanSchema>;
