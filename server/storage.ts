import type { 
  Destination, 
  Hotel, 
  Flight, 
  Activity, 
  ReferenceItem,
  Itinerary,
  TripPlan 
} from "@shared/schema";

const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: "/assets/generated_images/Paris_sunset_aerial_view_25faf353.png",
    description: "City of lights and romance",
    popularActivities: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Montmartre"],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "/assets/generated_images/Tokyo_night_cityscape_45904b9b.png",
    description: "Modern meets traditional",
    popularActivities: ["Shibuya Crossing", "Senso-ji Temple", "Harajuku", "Tokyo Skytree"],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "/assets/generated_images/Bali_tropical_beach_dffb0591.png",
    description: "Tropical paradise",
    popularActivities: ["Uluwatu Temple", "Rice Terraces", "Beach Clubs", "Ubud Monkey Forest"],
  },
  {
    id: "iceland",
    name: "Iceland",
    country: "Iceland",
    image: "/assets/generated_images/Iceland_northern_lights_2f2baa8b.png",
    description: "Land of fire and ice",
    popularActivities: ["Northern Lights", "Blue Lagoon", "Golden Circle", "Glacier Hiking"],
  },
  {
    id: "nyc",
    name: "New York",
    country: "USA",
    image: "/assets/generated_images/New_York_City_skyline_b0366017.png",
    description: "The city that never sleeps",
    popularActivities: ["Statue of Liberty", "Central Park", "Times Square", "Empire State Building"],
  },
];

const hotels: Hotel[] = [
  {
    id: "hotel-1",
    name: "Luxury Beach Resort",
    destinationId: "paris",
    image: "/assets/generated_images/Luxury_hotel_exterior_cac60dfd.png",
    rating: 4.8,
    reviewCount: 1240,
    price: 320,
    features: ["Free WiFi", "Breakfast Included", "Pool", "Central Location"],
    safety: 5,
    comfort: 5,
  },
  {
    id: "hotel-2",
    name: "Traditional Ryokan",
    destinationId: "tokyo",
    image: "/assets/generated_images/Japanese_ryokan_room_1e3385bc.png",
    rating: 4.9,
    reviewCount: 856,
    price: 280,
    features: ["Free WiFi", "Hot Springs", "High Safety", "Breakfast Included"],
    safety: 5,
    comfort: 4,
  },
  {
    id: "hotel-3",
    name: "Boutique City Hotel",
    destinationId: "paris",
    image: "/assets/generated_images/Luxury_hotel_exterior_cac60dfd.png",
    rating: 4.6,
    reviewCount: 542,
    price: 250,
    features: ["Free WiFi", "Rooftop Bar", "Gym", "24/7 Reception"],
    safety: 5,
    comfort: 4,
  },
];

const flights: Flight[] = [
  {
    id: "flight-1",
    airline: "Air France",
    from: "New York JFK",
    to: "Paris CDG",
    departureTime: "18:00",
    arrivalTime: "08:00+1",
    duration: "7h",
    price: 650,
    stops: 0,
    comfort: 4,
  },
  {
    id: "flight-2",
    airline: "United Airlines",
    from: "Los Angeles LAX",
    to: "Tokyo NRT",
    departureTime: "11:30",
    arrivalTime: "16:00+1",
    duration: "11h 30m",
    price: 850,
    stops: 0,
    comfort: 4,
  },
  {
    id: "flight-3",
    airline: "Delta",
    from: "New York JFK",
    to: "Paris CDG",
    departureTime: "22:00",
    arrivalTime: "12:00+1",
    duration: "7h",
    price: 480,
    stops: 1,
    comfort: 3,
  },
];

const activities: Activity[] = [
  {
    id: "act-1",
    name: "Breakfast at Le Café",
    destinationId: "paris",
    category: "Food",
    image: "/assets/generated_images/Coastal_seafood_dining_436c7396.png",
    duration: "1h",
    price: 25,
    rating: 4.5,
    description: "Traditional French breakfast at a local café",
  },
  {
    id: "act-2",
    name: "Eiffel Tower Visit",
    destinationId: "paris",
    category: "Sightseeing",
    image: "/assets/generated_images/Paris_sunset_aerial_view_25faf353.png",
    duration: "2h",
    price: 30,
    rating: 4.9,
    description: "Skip-the-line tickets to the iconic Eiffel Tower",
  },
  {
    id: "act-3",
    name: "Lunch at Traditional Bistro",
    destinationId: "paris",
    category: "Food",
    image: "/assets/generated_images/Coastal_seafood_dining_436c7396.png",
    duration: "1.5h",
    price: 45,
    rating: 4.7,
    description: "Authentic French cuisine in a cozy bistro",
  },
  {
    id: "act-4",
    name: "Louvre Museum Tour",
    destinationId: "paris",
    category: "Culture",
    image: "/assets/generated_images/Ancient_temple_sunrise_e496510f.png",
    duration: "3h",
    price: 20,
    rating: 4.8,
    description: "Guided tour of the world's largest art museum",
  },
  {
    id: "act-5",
    name: "Seine River Cruise",
    destinationId: "paris",
    category: "Activity",
    image: "/assets/generated_images/Paris_sunset_aerial_view_25faf353.png",
    duration: "2h",
    price: 40,
    rating: 4.6,
    description: "Romantic evening cruise along the Seine",
  },
  {
    id: "act-6",
    name: "Paragliding Adventure",
    destinationId: "bali",
    category: "Adventure",
    image: "/assets/generated_images/Mountain_paragliding_adventure_7d9c9526.png",
    duration: "3h",
    price: 150,
    rating: 4.9,
    description: "Thrilling paragliding experience with ocean views",
  },
];

const sampleItineraries: Itinerary[] = [
  {
    id: "itin-1",
    name: "Balanced Explorer",
    destinationId: "paris",
    hotelId: "hotel-1",
    flightId: "flight-1",
    startDate: "2024-06-01",
    endDate: "2024-06-05",
    activities: [
      { id: "ia-1", activityId: "act-1", day: 1, startTime: "08:00", endTime: "09:00" },
      { id: "ia-2", activityId: "act-2", day: 1, startTime: "10:00", endTime: "12:00" },
      { id: "ia-3", activityId: "act-3", day: 1, startTime: "13:00", endTime: "14:30" },
      { id: "ia-4", activityId: "act-4", day: 1, startTime: "15:00", endTime: "18:00" },
      { id: "ia-5", activityId: "act-5", day: 1, startTime: "19:00", endTime: "21:00" },
    ],
    totalCost: 1850,
    pros: ["Good mix of activities", "Stays within budget", "Flexible timing"],
    cons: ["Less adventure activities", "Moderate pace"],
  },
  {
    id: "itin-2",
    name: "Luxury Experience",
    destinationId: "paris",
    hotelId: "hotel-2",
    flightId: "flight-1",
    startDate: "2024-06-01",
    endDate: "2024-06-05",
    activities: [
      { id: "ia-6", activityId: "act-1", day: 1, startTime: "09:00", endTime: "10:00" },
      { id: "ia-7", activityId: "act-2", day: 1, startTime: "11:00", endTime: "13:00" },
      { id: "ia-8", activityId: "act-3", day: 1, startTime: "14:00", endTime: "15:30" },
    ],
    totalCost: 2420,
    pros: ["Premium experiences", "More relaxation", "Best restaurants"],
    cons: ["Over budget", "Fewer activities"],
  },
  {
    id: "itin-3",
    name: "Adventure Pack",
    destinationId: "paris",
    hotelId: "hotel-3",
    flightId: "flight-3",
    startDate: "2024-06-01",
    endDate: "2024-06-05",
    activities: [
      { id: "ia-9", activityId: "act-1", day: 1, startTime: "07:30", endTime: "08:30" },
      { id: "ia-10", activityId: "act-2", day: 1, startTime: "09:00", endTime: "11:00" },
      { id: "ia-11", activityId: "act-3", day: 1, startTime: "12:00", endTime: "13:30" },
      { id: "ia-12", activityId: "act-4", day: 1, startTime: "14:00", endTime: "17:00" },
      { id: "ia-13", activityId: "act-5", day: 1, startTime: "18:00", endTime: "20:00" },
    ],
    totalCost: 1580,
    pros: ["Maximum activities", "Under budget", "Lots of variety"],
    cons: ["Very busy schedule", "Less downtime"],
  },
];

export interface IStorage {
  getDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  getHotels(destinationId?: string): Promise<Hotel[]>;
  getFlights(destinationId?: string): Promise<Flight[]>;
  getActivities(destinationId?: string): Promise<Activity[]>;
  getItineraries(): Promise<Itinerary[]>;
  getItinerary(id: string): Promise<Itinerary | undefined>;
  getActivity(id: string): Promise<Activity | undefined>;
}

export class MemStorage implements IStorage {
  constructor() {}

  async getDestinations(): Promise<Destination[]> {
    return destinations;
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return destinations.find(d => d.id === id);
  }

  async getHotels(destinationId?: string): Promise<Hotel[]> {
    if (destinationId) {
      return hotels.filter(h => h.destinationId === destinationId);
    }
    return hotels;
  }

  async getFlights(destinationId?: string): Promise<Flight[]> {
    return flights;
  }

  async getActivities(destinationId?: string): Promise<Activity[]> {
    if (destinationId) {
      return activities.filter(a => a.destinationId === destinationId);
    }
    return activities;
  }

  async getItineraries(): Promise<Itinerary[]> {
    return sampleItineraries;
  }

  async getItinerary(id: string): Promise<Itinerary | undefined> {
    return sampleItineraries.find(i => i.id === id);
  }

  async getActivity(id: string): Promise<Activity | undefined> {
    return activities.find(a => a.id === id);
  }
}

export const storage = new MemStorage();
