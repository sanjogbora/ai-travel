import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SwipeCard } from "@/components/SwipeCard";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Activity } from "@shared/schema";

export default function TravelTinder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const handleSwipe = (id: string, direction: "left" | "right") => {
    if (direction === "right") {
      setLiked([...liked, id]);
    }
    
    setTimeout(() => {
      if (activities && currentIndex < activities.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setLocation("/itinerary-builder");
      }
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" data-testid="loader-activities" />
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No activities available</p>
      </div>
    );
  }

  const currentActivity = activities[currentIndex];

  return (
    <div className="bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {currentIndex < activities.length ? (
          <div className="relative h-[650px]">
            <SwipeCard
              key={currentActivity.id}
              id={currentActivity.id}
              name={currentActivity.name}
              image={currentActivity.image}
              rating={currentActivity.rating}
              price={currentActivity.price}
              type="activity"
              category={currentActivity.category}
              duration={currentActivity.duration}
              description={currentActivity.description}
              onSwipe={handleSwipe}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-complete">All done!</h2>
            <p className="text-muted-foreground mb-6" data-testid="text-liked-count">
              You liked {liked.length} {liked.length === 1 ? "activity" : "activities"}
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
