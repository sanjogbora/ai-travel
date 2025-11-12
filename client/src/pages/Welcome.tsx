import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Sparkles, ThumbsUp, Calendar, Heart, MessageCircle, CheckCircle } from "lucide-react";
import { VisualTour } from "@/components/VisualTour";
import parisImg from "@assets/generated_images/Paris_sunset_aerial_view_25faf353.png";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      // Show tour after a brief delay for better UX
      const timer = setTimeout(() => setShowTour(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTourComplete = () => {
    localStorage.setItem("hasSeenTour", "true");
    setShowTour(false);
  };

  const handleTourSkip = () => {
    localStorage.setItem("hasSeenTour", "true");
    setShowTour(false);
  };

  const handleCreateTrip = () => {
    setLocation("/onboarding/group");
  };

  const handleShowTour = () => {
    setShowTour(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${parisImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
              <Users className="w-9 h-9 text-primary" />
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-bold text-white" data-testid="text-app-title">
              TripTogether
            </h1>
          </div>
          
          <p className="text-3xl md:text-4xl text-white font-semibold mb-3 max-w-4xl text-center" data-testid="text-tagline">
            Plan trips together, powered by AI
          </p>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl text-center" data-testid="text-description">
            Swipe on activities with friends. Vote on what to do. Let AI handle the details.
            Travel planning should be collaborative and fun.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              onClick={handleCreateTrip}
              className="text-lg px-8 py-6 h-auto"
              data-testid="button-create-trip"
            >
              <Sparkles className="mr-2 w-6 h-6" />
              Create a Trip
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation("/join")}
              className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
              data-testid="button-join-trip"
            >
              <Users className="mr-2 w-6 h-6" />
              Join a Trip
            </Button>
          </div>

          <button
            onClick={handleShowTour}
            className="text-white/80 hover:text-white text-sm mb-16 underline underline-offset-4"
            data-testid="button-show-tour"
          >
            Take a quick tour
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
            <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20" data-testid="feature-collaborate">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white" data-testid="text-feature-title-1">
                Plan Together
              </h3>
              <p className="text-white/80 leading-relaxed" data-testid="text-feature-desc-1">
                Invite friends and family. Everyone can swipe on activities, vote on hotels, and build the perfect itinerary together.
              </p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20" data-testid="feature-ai">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white" data-testid="text-feature-title-2">
                AI That Helps
              </h3>
              <p className="text-white/80 leading-relaxed" data-testid="text-feature-desc-2">
                See when everyone's free. Get smart budget recommendations. Find flights that match your comfort preferences.
              </p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20" data-testid="feature-voting">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <ThumbsUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white" data-testid="text-feature-title-3">
                Vote & Decide
              </h3>
              <p className="text-white/80 leading-relaxed" data-testid="text-feature-desc-3">
                Swipe right on activities you love. See what the group wants. Find consensus with real-time voting and comments.
              </p>
            </Card>
          </div>

          <div className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-semibold text-white mb-8 text-center">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mb-3 text-white font-bold">
                  1
                </div>
                <h4 className="text-white font-medium mb-2">Create & Invite</h4>
                <p className="text-white/70 text-sm">Set up your trip and invite your travel crew</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mb-3 text-white font-bold">
                  2
                </div>
                <h4 className="text-white font-medium mb-2">Swipe Together</h4>
                <p className="text-white/70 text-sm">Everyone swipes on activities, hotels, and flights</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mb-3 text-white font-bold">
                  3
                </div>
                <h4 className="text-white font-medium mb-2">See Consensus</h4>
                <p className="text-white/70 text-sm">AI shows what the group loves and suggests plans</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center mb-3 text-white font-bold">
                  4
                </div>
                <h4 className="text-white font-medium mb-2">Book & Go</h4>
                <p className="text-white/70 text-sm">Final itinerary with everything you need to know</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-white/90 text-sm">Real-time voting</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span className="text-white/90 text-sm">Shared comments</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Calendar className="w-4 h-4 text-green-400" />
              <span className="text-white/90 text-sm">AI calendar sync</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-white/90 text-sm">Group consensus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Tour Modal */}
      <VisualTour
        isOpen={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />
    </div>
  );
}
