import { useState } from "react";
import { useLocation } from "wouter";
import { ProgressStepper } from "@/components/ProgressStepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import parisImg from "@assets/generated_images/Paris_sunset_aerial_view_25faf353.png";
import tokyoImg from "@assets/generated_images/Tokyo_night_cityscape_45904b9b.png";
import baliImg from "@assets/generated_images/Bali_tropical_beach_dffb0591.png";
import icelandImg from "@assets/generated_images/Iceland_northern_lights_2f2baa8b.png";
import nycImg from "@assets/generated_images/New_York_City_skyline_b0366017.png";

const destinations = [
  { id: "paris", name: "Paris", country: "France", image: parisImg, description: "City of lights and romance" },
  { id: "tokyo", name: "Tokyo", country: "Japan", image: tokyoImg, description: "Modern meets traditional" },
  { id: "bali", name: "Bali", country: "Indonesia", image: baliImg, description: "Tropical paradise" },
  { id: "iceland", name: "Iceland", country: "Iceland", image: icelandImg, description: "Land of fire and ice" },
  { id: "nyc", name: "New York", country: "USA", image: nycImg, description: "The city that never sleeps" },
];

export default function DestinationSelection() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    if (selectedDestination) {
      localStorage.setItem("destinationId", selectedDestination);
      setLocation("/reference-board");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper
        steps={[
          { number: 1, label: "Group", completed: true, current: false },
          { number: 2, label: "Budget", completed: true, current: false },
          { number: 3, label: "Dates", completed: true, current: false },
          { number: 4, label: "Destination", completed: false, current: true },
        ]}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4" data-testid="text-heading">
            Where to?
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your dream destination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {destinations.map((dest) => (
            <Card
              key={dest.id}
              className={`overflow-hidden cursor-pointer transition-all hover-elevate ${
                selectedDestination === dest.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedDestination(dest.id)}
              data-testid={`card-destination-${dest.id}`}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-medium">{dest.country}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                  <p className="text-sm text-white/90">{dest.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/onboarding/dates")}
            data-testid="button-back"
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedDestination}
            data-testid="button-continue"
          >
            Continue to Planning
          </Button>
        </div>
      </div>
    </div>
  );
}
