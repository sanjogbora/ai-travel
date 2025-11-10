import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, DollarSign, ArrowRight, Plus } from "lucide-react";

interface Activity {
  id: string;
  name: string;
  time: string;
  duration: string;
  category: string;
  price: number;
  isAiSuggested?: boolean;
}

const sampleActivities: Activity[] = [
  { id: "1", name: "Breakfast at Local Café", time: "08:00", duration: "1h", category: "Food", price: 25, isAiSuggested: true },
  { id: "2", name: "Eiffel Tower Visit", time: "10:00", duration: "2h", category: "Sightseeing", price: 30, isAiSuggested: false },
  { id: "3", name: "Lunch at Bistro", time: "13:00", duration: "1.5h", category: "Food", price: 45, isAiSuggested: true },
  { id: "4", name: "Louvre Museum", time: "15:00", duration: "3h", category: "Culture", price: 20, isAiSuggested: false },
  { id: "5", name: "Seine River Cruise", time: "19:00", duration: "2h", category: "Activity", price: 40, isAiSuggested: true },
];

export default function ItineraryBuilder() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activities] = useState(sampleActivities);
  const [, setLocation] = useLocation();

  const totalCost = activities.reduce((sum, act) => sum + act.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground" data-testid="text-heading">
              Build Your Itinerary
            </h1>
            <p className="text-sm text-muted-foreground">
              Drag to rearrange, AI suggests activities
            </p>
          </div>
          <Button
            onClick={() => setLocation("/chat-editor")}
            size="lg"
            data-testid="button-continue"
          >
            Refine with AI
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              onClick={() => setSelectedDay(day)}
              data-testid={`button-day-${day}`}
            >
              Day {day}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {activities.map((activity, index) => (
              <Card
                key={activity.id}
                className={`p-4 hover-elevate ${
                  activity.isAiSuggested ? "border-primary/30 bg-primary/5" : ""
                }`}
                data-testid={`card-activity-${activity.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-center min-w-[60px]">
                    <div className="text-sm font-semibold text-muted-foreground">
                      {activity.time}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {activity.duration}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground" data-testid={`text-activity-name-${activity.id}`}>{activity.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${activity.id}`}>
                            {activity.category}
                          </Badge>
                          {activity.isAiSuggested && (
                            <Badge className="text-xs bg-primary/10 text-primary" data-testid={`badge-ai-${activity.id}`}>
                              AI Suggested
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-foreground" data-testid={`text-price-${activity.id}`}>
                        ${activity.price}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button
              variant="outline"
              className="w-full border-dashed"
              data-testid="button-add-activity"
            >
              <Plus className="mr-2 w-4 h-4" />
              Add Activity
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4" data-testid="text-summary-title">Day Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Activities</span>
                  <span className="font-semibold text-foreground" data-testid="text-activity-count">{activities.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-semibold text-foreground" data-testid="text-total-cost">${totalCost}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground" data-testid="text-duration">11 hours</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Leave buffer time between activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Group nearby locations together</span>
                </li>
                <li className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Book popular spots in advance</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
