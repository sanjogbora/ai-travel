import { useState } from "react";
import { useLocation } from "wouter";
import { ProgressStepper } from "@/components/ProgressStepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";
import type { TripScope } from "@shared/schema";

const scopeOptions: { type: TripScope; icon: typeof Globe; label: string; description: string }[] = [
  { type: "domestic", icon: MapPin, label: "Within India", description: "Explore destinations within India" },
  { type: "international", icon: Globe, label: "International", description: "Travel abroad to global destinations" },
];

export default function TripScopeSelection() {
  const [selectedScope, setSelectedScope] = useState<TripScope | null>(null);
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    if (selectedScope) {
      localStorage.setItem("tripScope", selectedScope);
      setLocation("/onboarding/dates");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper
        steps={[
          { number: 1, label: "Group", completed: true, current: false },
          { number: 2, label: "Budget", completed: true, current: false },
          { number: 3, label: "Location", completed: false, current: true },
          { number: 4, label: "Dates", completed: false, current: false },
          { number: 5, label: "Destination", completed: false, current: false },
        ]}
      />
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4" data-testid="text-heading">
            Where do you want to go?
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your travel destination scope
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {scopeOptions.map(({ type, icon: Icon, label, description }) => (
            <Card
              key={type}
              className={`p-8 cursor-pointer transition-all hover-elevate ${
                selectedScope === type
                  ? "ring-2 ring-primary bg-primary/5"
                  : ""
              }`}
              onClick={() => setSelectedScope(type)}
              data-testid={`card-scope-${type}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    selectedScope === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/onboarding/budget")}
            data-testid="button-back"
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedScope}
            data-testid="button-continue"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
