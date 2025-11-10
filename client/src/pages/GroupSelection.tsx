import { Users, Home, User } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { ProgressStepper } from "@/components/ProgressStepper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GroupType } from "@shared/schema";

const groupOptions: { type: GroupType; icon: typeof Users; label: string; description: string }[] = [
  { type: "friends", icon: Users, label: "Friends", description: "Traveling with your crew" },
  { type: "family", icon: Home, label: "Family", description: "Quality time together" },
  { type: "solo", icon: User, label: "Solo", description: "Your personal adventure" },
];

export default function GroupSelection() {
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    if (selectedGroup) {
      localStorage.setItem("groupType", selectedGroup);
      setLocation("/onboarding/budget");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper
        steps={[
          { number: 1, label: "Group", completed: false, current: true },
          { number: 2, label: "Budget", completed: false, current: false },
          { number: 3, label: "Dates", completed: false, current: false },
          { number: 4, label: "Destination", completed: false, current: false },
        ]}
      />
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4" data-testid="text-heading">
            Who's traveling?
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us who's joining this adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {groupOptions.map(({ type, icon: Icon, label, description }) => (
            <Card
              key={type}
              className={`p-8 cursor-pointer transition-all hover-elevate ${
                selectedGroup === type
                  ? "ring-2 ring-primary bg-primary/5"
                  : ""
              }`}
              onClick={() => setSelectedGroup(type)}
              data-testid={`card-group-${type}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    selectedGroup === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{label}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedGroup}
            data-testid="button-continue"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
