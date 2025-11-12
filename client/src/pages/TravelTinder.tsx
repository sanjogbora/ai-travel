import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SwipeCard } from "@/components/SwipeCard";
import { VoteReactionsContainer } from "@/components/VoteReaction";
import { CommentThread } from "@/components/CommentThread";
import { useVoting } from "@/hooks/use-voting";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Activity, VoteType } from "@shared/schema";

interface VoteReaction {
  id: string;
  memberName: string;
  memberAvatar?: string;
  voteType: VoteType;
}

export default function TravelTinder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [reactions, setReactions] = useState<VoteReaction[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [, setLocation] = useLocation();

  // Mock trip and member data - will be replaced with real context
  const tripId = "trip-1";
  const memberId = "1";

  const { vote, fetchVoteSummary, getVoteSummary } = useVoting({
    tripId,
    memberId,
    enabled: true,
  });

  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  // Fetch vote summaries for current activity
  useEffect(() => {
    if (activities && currentIndex < activities.length) {
      const currentActivity = activities[currentIndex];
      fetchVoteSummary(currentActivity.id);
    }
  }, [currentIndex, activities, fetchVoteSummary]);

  const handleSwipe = async (id: string, direction: "left" | "right") => {
    // Determine vote type based on swipe direction
    const voteType: VoteType = direction === "right" ? "love" : "skip";
    
    // Record the vote
    await vote(id, voteType);
    
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

  const handleReactionComplete = (reactionId: string) => {
    setReactions(prev => prev.filter(r => r.id !== reactionId));
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
      <VoteReactionsContainer
        reactions={reactions}
        onReactionComplete={handleReactionComplete}
      />
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        {currentIndex < activities.length ? (
          <div className="flex items-center justify-center gap-8">
            {/* Skip Button - Left Side */}
            <Button
              size="icon"
              variant="outline"
              className="w-20 h-20 rounded-full shadow-xl border-2 hover:scale-110 hover:border-red-500 hover:bg-red-50 transition-all"
              onClick={() => handleSwipe(currentActivity.id, "left")}
              data-testid="button-swipe-left-external"
            >
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>

            {/* Card Container */}
            <div className="relative w-full max-w-md h-[650px]">
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
                votes={getVoteSummary(currentActivity.id)}
                comments={3}
                onSwipe={handleSwipe}
                onCommentClick={() => setShowComments(true)}
              />
            </div>

            {/* Like Button - Right Side */}
            <Button
              size="icon"
              className="w-20 h-20 rounded-full shadow-xl bg-primary hover:bg-primary/90 hover:scale-110 transition-all"
              onClick={() => handleSwipe(currentActivity.id, "right")}
              data-testid="button-swipe-right-external"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </Button>
            
            <CommentThread
              activityName={currentActivity.name}
              isOpen={showComments}
              onClose={() => setShowComments(false)}
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
