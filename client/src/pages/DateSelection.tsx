import { useState } from "react";
import { useLocation } from "wouter";
import { ProgressStepper } from "@/components/ProgressStepper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";

const quickSelects = [
  { label: "Weekend", days: 3 },
  { label: "Week", days: 7 },
  { label: "2 Weeks", days: 14 },
];

export default function DateSelection() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [, setLocation] = useLocation();

  const handleQuickSelect = (days: number) => {
    const from = new Date();
    const to = addDays(from, days - 1);
    setDateRange({ from, to });
  };

  const handleContinue = () => {
    if (dateRange?.from && dateRange?.to) {
      localStorage.setItem("startDate", format(dateRange.from, "yyyy-MM-dd"));
      localStorage.setItem("endDate", format(dateRange.to, "yyyy-MM-dd"));
      setLocation("/onboarding/destination");
    }
  };

  const handleBack = () => {
    setLocation("/onboarding/scope");
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper
        steps={[
          { number: 1, label: "Group", completed: true, current: false },
          { number: 2, label: "Budget", completed: true, current: false },
          { number: 3, label: "Location", completed: true, current: false },
          { number: 4, label: "Dates", completed: false, current: true },
          { number: 5, label: "Destination", completed: false, current: false },
        ]}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4" data-testid="text-heading">
            When are you going?
          </h1>
          <p className="text-lg text-muted-foreground">
            Select your travel dates
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-8 mb-8">
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {quickSelects.map((option) => (
              <Badge
                key={option.label}
                variant="secondary"
                className="px-4 py-2 cursor-pointer hover-elevate text-sm"
                onClick={() => handleQuickSelect(option.days)}
                data-testid={`badge-quick-${option.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {option.label}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-center" data-testid="calendar-date-range">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="rounded-md"
            />
          </div>

          {dateRange?.from && dateRange?.to && (
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-foreground" data-testid="text-selected-dates">
                {format(dateRange.from, "MMMM d, yyyy")} → {format(dateRange.to, "MMMM d, yyyy")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={handleBack}
            data-testid="button-back"
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!dateRange?.from || !dateRange?.to}
            data-testid="button-continue"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
