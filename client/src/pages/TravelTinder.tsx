import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { SwipeCard } from "@/components/SwipeCard";
import { ArrowRight } from "lucide-react";
import hotelImg from "@assets/generated_images/Luxury_hotel_exterior_cac60dfd.png";
import ryokanImg from "@assets/generated_images/Japanese_ryokan_room_1e3385bc.png";

const hotels = [
  {
    id: "hotel-1",
    name: "Luxury Beach Resort",
    image: hotelImg,
    rating: 4.8,
    reviewCount: 1240,
    price: 320,
    features: ["Free WiFi", "Breakfast", "Pool", "Central Location"],
  },
  {
    id: "hotel-2",
    name: "Traditional Ryokan",
    image: ryokanImg,
    rating: 4.9,
    reviewCount: 856,
    price: 280,
    features: ["Free WiFi", "Hot Springs", "High Safety", "Breakfast"],
  },
];

export default function TravelTinder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  const handleSwipe = (id: string, direction: "left" | "right") => {
    if (direction === "right") {
      setLiked([...liked, id]);
    }
    
    setTimeout(() => {
      if (currentIndex < hotels.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setLocation("/itinerary-builder");
      }
    }, 300);
  };

  const currentHotel = hotels[currentIndex];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground" data-testid="text-heading">
              Choose Your Stay
            </h1>
            <p className="text-sm text-muted-foreground">
              Swipe right to like, left to pass
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" data-testid="text-progress">
              {currentIndex + 1} / {hotels.length}
            </span>
            <Button
              onClick={() => setLocation("/itinerary-builder")}
              variant="outline"
              data-testid="button-skip"
            >
              Skip
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {currentIndex < hotels.length ? (
          <div className="relative h-[600px]">
            <SwipeCard
              key={currentHotel.id}
              {...currentHotel}
              type="hotel"
              onSwipe={handleSwipe}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-complete">All done!</h2>
            <p className="text-muted-foreground mb-6" data-testid="text-liked-count">
              You liked {liked.length} {liked.length === 1 ? "option" : "options"}
            </p>
            <Button onClick={() => setLocation("/itinerary-builder")} size="lg" data-testid="button-continue">
              Build Your Itinerary
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
