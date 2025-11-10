import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plane, Sparkles, Map, Calendar } from "lucide-react";
import parisImg from "@assets/generated_images/Paris_sunset_aerial_view_25faf353.png";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${parisImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-3 mb-8">
            <Plane className="w-12 h-12 text-white" />
            <h1 className="font-serif text-7xl md:text-8xl font-bold text-white" data-testid="text-app-title">
              TravelAI
            </h1>
          </div>
          
          <p className="text-2xl md:text-3xl text-white/90 mb-4 max-w-3xl" data-testid="text-tagline">
            Your AI-powered travel planning companion
          </p>
          
          <p className="text-lg text-white/80 mb-12 max-w-2xl" data-testid="text-description">
            Swipe through hotels, build perfect itineraries, and let AI help you plan the trip of a lifetime
          </p>

          <Button
            size="lg"
            onClick={() => setLocation("/onboarding/group")}
            className="text-lg"
            data-testid="button-start"
          >
            <Sparkles className="mr-2 w-6 h-6" />
            Start Planning
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl">
            <div className="flex flex-col items-center text-white" data-testid="feature-tinder">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                <Map className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2" data-testid="text-feature-title-1">Tinder for Travel</h3>
              <p className="text-sm text-white/80" data-testid="text-feature-desc-1">
                Swipe through hotels, flights, and activities
              </p>
            </div>
            
            <div className="flex flex-col items-center text-white" data-testid="feature-ai">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2" data-testid="text-feature-title-2">AI Assistant</h3>
              <p className="text-sm text-white/80" data-testid="text-feature-desc-2">
                Chat to refine your perfect itinerary
              </p>
            </div>
            
            <div className="flex flex-col items-center text-white" data-testid="feature-reports">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2" data-testid="text-feature-title-3">Complete Reports</h3>
              <p className="text-sm text-white/80" data-testid="text-feature-desc-3">
                Get detailed trip guides with local tips
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
