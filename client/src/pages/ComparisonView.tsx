import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowRight } from "lucide-react";

interface Itinerary {
  id: string;
  name: string;
  totalCost: number;
  activities: number;
  pros: string[];
  cons: string[];
}

const itineraries: Itinerary[] = [
  {
    id: "1",
    name: "Balanced Explorer",
    totalCost: 450,
    activities: 12,
    pros: ["Good mix of activities", "Stays within budget", "Flexible timing"],
    cons: ["Less adventure activities", "Moderate pace"],
  },
  {
    id: "2",
    name: "Luxury Experience",
    totalCost: 720,
    activities: 10,
    pros: ["Premium experiences", "More relaxation", "Best restaurants"],
    cons: ["Over budget", "Fewer activities"],
  },
  {
    id: "3",
    name: "Adventure Pack",
    totalCost: 380,
    activities: 15,
    pros: ["Maximum activities", "Under budget", "Lots of variety"],
    cons: ["Very busy schedule", "Less downtime"],
  },
];

export default function ComparisonView() {
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    if (selectedItinerary) {
      localStorage.setItem("selectedItineraryId", selectedItinerary);
      setLocation("/trip-report");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground" data-testid="text-heading">
              Compare Itineraries
            </h1>
            <p className="text-sm text-muted-foreground">
              Choose the best fit for your trip
            </p>
          </div>
          <Button
            onClick={handleContinue}
            disabled={!selectedItinerary}
            size="lg"
            data-testid="button-continue"
          >
            View Trip Report
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <Card
              key={itinerary.id}
              className={`p-6 cursor-pointer transition-all hover-elevate ${
                selectedItinerary === itinerary.id
                  ? "ring-2 ring-primary bg-primary/5"
                  : ""
              }`}
              onClick={() => setSelectedItinerary(itinerary.id)}
              data-testid={`card-itinerary-${itinerary.id}`}
            >
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2" data-testid={`text-itinerary-name-${itinerary.id}`}>
                  {itinerary.name}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span data-testid={`text-activity-count-${itinerary.id}`}>{itinerary.activities} activities</span>
                  <span>•</span>
                  <span className="font-semibold text-foreground" data-testid={`text-cost-${itinerary.id}`}>
                    ${itinerary.totalCost}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Pros
                  </h4>
                  <ul className="space-y-2">
                    {itinerary.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <X className="w-4 h-4 text-destructive" />
                    Cons
                  </h4>
                  <ul className="space-y-2">
                    {itinerary.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedItinerary === itinerary.id && (
                <Badge className="w-full mt-6 justify-center">
                  Selected
                </Badge>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Or mix and match activities from different itineraries
          </p>
          <Button variant="outline" data-testid="button-mix-match">
            Customize Your Own
          </Button>
        </div>
      </div>
    </div>
  );
}
