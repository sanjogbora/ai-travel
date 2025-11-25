import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Clock, DollarSign, Loader2, Hotel, Wifi, Coffee, Dumbbell, Star } from "lucide-react";
import type { Flight, Hotel as HotelType } from "@shared/schema";

type LayoverPreference = "direct" | "one-stop" | "any";

export default function Flights() {
  const [comfortSlider, setComfortSlider] = useState([50]);
  const [layoverPref, setLayoverPref] = useState<LayoverPreference>("any");

  const { data: flights, isLoading: flightsLoading } = useQuery<Flight[]>({
    queryKey: ["/api/flights"],
  });

  const { data: hotels, isLoading: hotelsLoading } = useQuery<HotelType[]>({
    queryKey: ["/api/hotels"],
  });

  const isLoading = flightsLoading || hotelsLoading;

  const filteredFlights = (flights || [])
    .filter((flight) => {
      if (layoverPref === "direct") return flight.stops === 0;
      if (layoverPref === "one-stop") return flight.stops <= 1;
      return true;
    })
    .map((flight) => {
      const comfortWeight = comfortSlider[0] / 100;
      const costWeight = 1 - comfortWeight;
      
      const comfortValue = flight.comfortScore !== undefined ? flight.comfortScore : (flight.comfort * 25);
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
            Flights & Accommodations
          </h1>
          <p className="text-lg text-muted-foreground">
            Book your travel and stay in one place
          </p>
        </div>

        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="flights" data-testid="tab-flights">
              <Plane className="w-4 h-4 mr-2" />
              Flights
            </TabsTrigger>
            <TabsTrigger value="hotels" data-testid="tab-hotels">
              <Hotel className="w-4 h-4 mr-2" />
              Hotels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flights">
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
                      {flight.layoverDetails && flight.layoverDetails.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {flight.layoverDetails.map(l => `${l.duration} in ${l.airport}`).join(', ')}
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
          </TabsContent>

          <TabsContent value="hotels">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!hotels || hotels.length === 0 ? (
                <Card className="p-12 text-center col-span-full">
                  <p className="text-muted-foreground" data-testid="text-no-hotels">
                    No hotels available. Please try again later.
                  </p>
                </Card>
              ) : (
                hotels.map((hotel) => (
                  <Card key={hotel.id} className="p-6 flex flex-col" data-testid={`card-hotel-${hotel.id}`}>
                    {hotel.image && (
                      <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2" data-testid={`text-hotel-name-${hotel.id}`}>
                        {hotel.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(hotel.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground" data-testid={`text-hotel-rating-${hotel.id}`}>
                          {hotel.rating} ({hotel.reviewCount} reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.features.slice(0, 4).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-bold" data-testid={`text-hotel-price-${hotel.id}`}>
                            ${hotel.price}
                          </div>
                          <p className="text-xs text-muted-foreground">per night</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Safety: {hotel.safety}/5</div>
                          <div className="text-sm font-medium">Comfort: {hotel.comfort}/5</div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      data-testid={`button-select-hotel-${hotel.id}`}
                    >
                      Select Hotel
                    </Button>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
