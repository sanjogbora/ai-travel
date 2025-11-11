import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, DollarSign } from "lucide-react";

export default function Flights() {
  const [comfortScore, setComfortScore] = useState([50]);
  const [costScore, setCostScore] = useState([50]);

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
                    value={comfortScore}
                    onValueChange={setComfortScore}
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
                    variant="secondary"
                    className="cursor-pointer hover-elevate"
                    data-testid="badge-layover-direct"
                  >
                    Direct Only
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover-elevate"
                    data-testid="badge-layover-one"
                  >
                    1 Stop OK
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover-elevate"
                    data-testid="badge-layover-any"
                  >
                    Any Stops
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Air India • Direct Flight</h3>
                  <p className="text-sm text-muted-foreground">DEL → PAR</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$650</div>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">08:30 AM - 02:15 PM</p>
                    <p className="text-xs text-muted-foreground">8h 45m</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Boeing 787</p>
                    <p className="text-xs text-muted-foreground">Non-stop</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">Best Match</Badge>
                <Badge variant="secondary">High Comfort</Badge>
              </div>

              <Button className="w-full" data-testid="button-select-flight">
                Select Flight
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Emirates • 1 Stop</h3>
                  <p className="text-sm text-muted-foreground">DEL → DXB → PAR</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$520</div>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">10:00 AM - 06:30 PM</p>
                    <p className="text-xs text-muted-foreground">11h 30m</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Airbus A380</p>
                    <p className="text-xs text-muted-foreground">2h 45m layover in Dubai</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">Budget Friendly</Badge>
                <Badge variant="secondary">Good Value</Badge>
              </div>

              <Button className="w-full" variant="outline" data-testid="button-select-flight-2">
                Select Flight
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
