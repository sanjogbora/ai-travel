import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Heart, TrendingUp, Sparkles, Calendar, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TourSlide {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

interface VisualTourProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const tourSlides: TourSlide[] = [
  {
    title: "Invite Your Crew",
    description: "Start by inviting friends and family to plan together. Everyone gets a voice in the trip.",
    icon: Users,
    features: [
      "Share a simple invite code",
      "See who's online in real-time",
      "Assign roles: organizer, co-planner, or viewer"
    ]
  },
  {
    title: "Swipe Together",
    description: "Everyone swipes on activities, hotels, and flights. It's like Tinder, but for travel planning.",
    icon: Heart,
    features: [
      "Love it, maybe, or skip - simple voting",
      "See what others are choosing",
      "Real-time reactions when friends vote"
    ]
  },
  {
    title: "See Consensus",
    description: "Watch as group favorites emerge. Our activity feed keeps everyone in the loop.",
    icon: TrendingUp,
    features: [
      "Group favorite badges on popular choices",
      "Live activity feed of all changes",
      "Comment on any activity or hotel"
    ]
  },
  {
    title: "AI Assists",
    description: "Let AI help with the heavy lifting. Get smart suggestions based on your group's preferences.",
    icon: Sparkles,
    features: [
      "Calendar analysis finds when everyone's free",
      "Budget breakdowns for your destination",
      "Flight deals and recommendations"
    ]
  },
  {
    title: "Build & Book",
    description: "Collaborate on the final itinerary. Assign tasks, split costs, and create a shared packing list.",
    icon: Calendar,
    features: [
      "Drag-and-drop itinerary builder",
      "Task assignments for the group",
      "Shared packing list and budget tracking"
    ]
  }
];

export function VisualTour({ isOpen, onComplete, onSkip }: VisualTourProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentSlide < tourSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = tourSlides[currentSlide];
  const Icon = slide.icon;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onSkip()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onSkip}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            data-testid="tour-close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Slide content */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-primary" />
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="tour-title">
                {slide.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8 max-w-xl" data-testid="tour-description">
                {slide.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8 w-full max-w-md">
                {slide.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-left p-3 rounded-lg bg-muted/50"
                    data-testid={`tour-feature-${index}`}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Progress dots */}
              <div className="flex gap-2 mb-8">
                {tourSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    data-testid={`tour-dot-${index}`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3 w-full max-w-md">
                {currentSlide > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1"
                    data-testid="tour-previous"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1"
                  data-testid="tour-next"
                >
                  {currentSlide === tourSlides.length - 1 ? "Get Started" : "Next"}
                </Button>
              </div>

              {/* Skip button */}
              {currentSlide < tourSlides.length - 1 && (
                <button
                  onClick={onSkip}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="tour-skip"
                >
                  Skip tour
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
