import { useState } from "react";
import { useLocation } from "wouter";
import { ProgressStepper } from "@/components/ProgressStepper";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

const budgetPresets = [
  { label: "Budget-Friendly", min: 500, max: 1500 },
  { label: "Mid-Range", min: 1500, max: 3500 },
  { label: "Luxury", min: 3500, max: 10000 },
];

export default function BudgetSelection() {
  const [budgetRange, setBudgetRange] = useState([1000, 3000]);
  const [, setLocation] = useLocation();

  const handlePreset = (min: number, max: number) => {
    setBudgetRange([min, max]);
  };

  const handleContinue = () => {
    localStorage.setItem("budgetMin", budgetRange[0].toString());
    localStorage.setItem("budgetMax", budgetRange[1].toString());
    setLocation("/onboarding/dates");
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper
        steps={[
          { number: 1, label: "Group", completed: true, current: false },
          { number: 2, label: "Budget", completed: false, current: true },
          { number: 3, label: "Dates", completed: false, current: false },
          { number: 4, label: "Destination", completed: false, current: false },
        ]}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4" data-testid="text-heading">
            What's your budget?
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us find the perfect options for you
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-10 mb-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <DollarSign className="w-8 h-8 text-primary" />
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground" data-testid="text-budget-range">
                ${budgetRange[0].toLocaleString()} - ${budgetRange[1].toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Per person</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
          </div>

          <div className="px-4 mb-8">
            <div data-testid="slider-budget">
              <Slider
                value={budgetRange}
                onValueChange={setBudgetRange}
                min={500}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {budgetPresets.map((preset) => (
              <Badge
                key={preset.label}
                variant="secondary"
                className="px-4 py-2 cursor-pointer hover-elevate text-sm"
                onClick={() => handlePreset(preset.min, preset.max)}
                data-testid={`badge-preset-${preset.label.toLowerCase().replace(/[^a-z]/g, '')}`}
              >
                {preset.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/onboarding/group")}
            data-testid="button-back"
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            data-testid="button-continue"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
