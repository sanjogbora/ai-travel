import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, DollarSign, Loader2 } from "lucide-react";
import type { Flight } from "@shared/schema";

type LayoverPreference = "direct" | "one-stop" | "any";

export default function Flights() {
  const [comfortSlider, setComfortSlider] = useState([50]);
  const [layoverPref, setLayoverPref] = useState<LayoverPreference>("any");

  const { data: flights, isLoading } = useQuery<Flight[]>({
    queryKey: ["/api/flights"],
  });

  const filteredFlights = (flights || [])
    .filter((flight) => {
      if (layoverPref === "direct") return flight.stops === 0;
      if (layoverPref === "one-stop") return flight.stops <= 1;
      return true;
    })
    .map((flight) => {
      const comfortWeight = comfortSlider[0] / 100;
      const costWeight = 1 - comfortWeight;
      
      const comfortValue = flight.comfortScore ?? flight.comfort * 25 ?? 50;
      const priceMax = Math.max(...(flights || []).map(f => f.price), 1000);
      const costValue = ((priceMax - flight.price) / priceMax) * 100;
      
      const score = comfortValue * comfortWeight + costValue * costWeight;
      
      return { ...flight, matchScore: score };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const getBadges = (flight: Flight & { matchScore: number }) => {
    const badges: string[] = [];
    const isTopMatch = filteredFlights[0]?.id === flight.id;
    if (isTopMatch) badges.push("Best Match");
    if (flight.stops === 0) badges.push("Non-stop");
    if ((flight.comfortScore ?? flight.comfort * 25) >= 75) badges.push("High Comfort");
    if (flight.price <= 500) badges.push("Budget Friendly");
    return badges;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" data-testid="loader-flights" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2" data-testid="text-heading">
            Find Your Perfect Flight
          </h1>
          <p className="text-lg text-muted-foreground">
            Contextual recommendations based on your itinerary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 lg:col-span-1">
            <h2 className="font-semibold text-lg mb-4">Your Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Comfort vs Cost
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-muted-foreground">Cost</span>
                  <Slider
                    value={comfortSlider}
                    onValueChange={setComfortSlider}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-1"
                    data-testid="slider-comfort"
                  />
                  <span className="text-xs text-muted-foreground">Comfort</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Slide to prioritize comfort or savings
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Layover Preference
                </label>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={layoverPref === "direct" ? "default" : "secondary"}
                    className="cursor-pointer hover-elevate"
                    onClick={() => setLayoverPref("direct")}
                    data-testid="badge-layover-direct"
                  >
                    Direct Only
                  </Badge>
                  <Badge
                    variant={layoverPref === "one-stop" ? "default" : "secondary"}
                    className="cursor-pointer hover-elevate"
                    onClick={() => setLayoverPref("one-stop")}
                    data-testid="badge-layover-one"
                  >
                    1 Stop OK
                  </Badge>
                  <Badge
                    variant={layoverPref === "any" ? "default" : "secondary"}
                    className="cursor-pointer hover-elevate"
                    onClick={() => setLayoverPref("any")}
                    data-testid="badge-layover-any"
                  >
                    Any Stops
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-4">
            {filteredFlights.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground" data-testid="text-no-flights">
                  No flights match your preferences. Try adjusting your filters.
                </p>
              </Card>
            ) : (
              filteredFlights.map((flight, index) => (
                <Card key={flight.id} className="p-6" data-testid={`card-flight-${flight.id}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg" data-testid={`text-airline-${flight.id}`}>
                        {flight.airline} • {flight.stops === 0 ? "Direct Flight" : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                      </h3>
                      <p className="text-sm text-muted-foreground" data-testid={`text-route-${flight.id}`}>
                        {flight.from} → {flight.to}
                      </p>
                      {flight.layoverDetails && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {flight.layoverDetails}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" data-testid={`text-price-${flight.id}`}>${flight.price}</div>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium" data-testid={`text-time-${flight.id}`}>
                          {flight.departureTime} - {flight.arrivalTime}
                        </p>
                        <p className="text-xs text-muted-foreground">{flight.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Comfort: {flight.comfort}/5
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {getBadges(flight).map((badge) => (
                      <Badge key={badge} variant="secondary" data-testid={`badge-${badge.toLowerCase().replace(/\s+/g, '-')}-${flight.id}`}>
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    variant={index === 0 ? "default" : "outline"}
                    data-testid={`button-select-flight-${flight.id}`}
                  >
                    Select Flight
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
