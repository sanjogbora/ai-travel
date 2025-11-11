import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, DollarSign, ArrowRight, Plus, GripVertical, AlertCircle, Users, Home, Undo } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Activity {
  id: string;
  name: string;
  time: string;
  duration: string;
  category: string;
  price: number;
  isAiSuggested?: boolean;
  socialProof?: string;
  closingTime?: string;
  inTravelBoard?: boolean;
  suggestedTime?: string;
  isRecentChange?: boolean;
}

interface DayItinerary {
  [day: number]: Activity[];
}

const initialItinerary: DayItinerary = {
  1: [
    { id: "1-1", name: "Breakfast at Local Café", time: "08:00", duration: "1h", category: "Food", price: 25, isAiSuggested: true, socialProof: "150+ travelers loved this", inTravelBoard: true },
    { id: "1-2", name: "Eiffel Tower Visit", time: "10:00", duration: "2h", category: "Sightseeing", price: 30, isAiSuggested: false, socialProof: "Popular with families", closingTime: "23:00", inTravelBoard: true },
    { id: "1-3", name: "Lunch at Bistro", time: "13:00", duration: "1.5h", category: "Food", price: 45, isAiSuggested: true, socialProof: "20+ families found this fun" },
    { id: "1-4", name: "Louvre Museum", time: "15:00", duration: "3h", category: "Culture", price: 20, isAiSuggested: false, closingTime: "18:00", suggestedTime: "09:00", socialProof: "Recommended by 300+ travelers" },
    { id: "1-5", name: "Seine River Cruise", time: "19:00", duration: "2h", category: "Activity", price: 40, isAiSuggested: true, socialProof: "Highly rated for couples" },
  ],
  2: [
    { id: "2-1", name: "Croissant & Coffee", time: "08:30", duration: "45m", category: "Food", price: 15, isAiSuggested: true, socialProof: "Local favorite" },
    { id: "2-2", name: "Versailles Palace Tour", time: "10:00", duration: "4h", category: "Culture", price: 50, isAiSuggested: true, closingTime: "18:30", socialProof: "Must-see attraction", inTravelBoard: true },
    { id: "2-3", name: "Garden Picnic", time: "15:00", duration: "2h", category: "Activity", price: 30, isAiSuggested: false, socialProof: "Perfect for families" },
    { id: "2-4", name: "Latin Quarter Dinner", time: "19:00", duration: "2h", category: "Food", price: 60, isAiSuggested: true, socialProof: "50+ foodies recommend" },
  ],
  3: [
    { id: "3-1", name: "Morning Market Visit", time: "09:00", duration: "2h", category: "Shopping", price: 20, isAiSuggested: true, socialProof: "Authentic local experience" },
    { id: "3-2", name: "Sacré-Cœur Basilica", time: "12:00", duration: "1.5h", category: "Culture", price: 0, isAiSuggested: false, closingTime: "22:30", socialProof: "Breathtaking views" },
    { id: "3-3", name: "Montmartre Lunch", time: "14:00", duration: "1.5h", category: "Food", price: 40, isAiSuggested: true, socialProof: "Hidden gem" },
    { id: "3-4", name: "Art Gallery Hop", time: "16:00", duration: "3h", category: "Culture", price: 25, isAiSuggested: false, socialProof: "Art lovers' paradise" },
  ],
  4: [
    { id: "4-1", name: "Tuileries Garden Walk", time: "09:00", duration: "1h", category: "Activity", price: 0, isAiSuggested: true, socialProof: "Peaceful morning activity" },
    { id: "4-2", name: "Musée d'Orsay", time: "11:00", duration: "3h", category: "Culture", price: 16, isAiSuggested: false, closingTime: "18:00", socialProof: "200+ art enthusiasts recommend", inTravelBoard: true },
    { id: "4-3", name: "Saint-Germain Lunch", time: "14:30", duration: "1.5h", category: "Food", price: 45, isAiSuggested: true, socialProof: "Michelin-recommended area" },
    { id: "4-4", name: "Shopping on Champs-Élysées", time: "16:30", duration: "2.5h", category: "Shopping", price: 100, isAiSuggested: false, socialProof: "Iconic shopping experience" },
  ],
  5: [
    { id: "5-1", name: "Breakfast Cruise", time: "08:00", duration: "2h", category: "Activity", price: 55, isAiSuggested: true, socialProof: "Unique experience" },
    { id: "5-2", name: "Notre-Dame Area Tour", time: "11:00", duration: "2h", category: "Sightseeing", price: 15, isAiSuggested: false, socialProof: "Historic landmark" },
    { id: "5-3", name: "Le Marais District", time: "14:00", duration: "3h", category: "Shopping", price: 40, isAiSuggested: true, socialProof: "Trendy neighborhood", inTravelBoard: true },
    { id: "5-4", name: "Farewell Dinner", time: "19:00", duration: "2h", category: "Food", price: 80, isAiSuggested: true, socialProof: "Special occasion favorite" },
  ],
};

function SortableActivity({ activity }: { activity: Activity }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isWrongTime = activity.closingTime && activity.suggestedTime;
  const timeInMinutes = parseInt(activity.time.split(':')[0]) * 60 + parseInt(activity.time.split(':')[1]);
  const closingTimeInMinutes = activity.closingTime
    ? parseInt(activity.closingTime.split(':')[0]) * 60 + parseInt(activity.closingTime.split(':')[1])
    : null;

  const willBeClosed = closingTimeInMinutes && timeInMinutes >= closingTimeInMinutes;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-4 hover-elevate ${
        activity.isAiSuggested ? "border-primary/30 bg-primary/5" : ""
      } ${willBeClosed ? "border-destructive/50" : ""} ${
        activity.isRecentChange ? "ring-2 ring-primary animate-pulse" : ""
      }`}
      data-testid={`card-activity-${activity.id}`}
    >
      <div className="flex items-start gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing flex-shrink-0 text-muted-foreground mt-1"
          data-testid={`drag-handle-${activity.id}`}
        >
          <GripVertical className="w-5 h-5" />
        </div>

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
              <h3 className="font-semibold text-foreground" data-testid={`text-activity-name-${activity.id}`}>
                {activity.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${activity.id}`}>
                  {activity.category}
                </Badge>
                {activity.isAiSuggested && (
                  <Badge className="text-xs bg-primary/10 text-primary" data-testid={`badge-ai-${activity.id}`}>
                    AI Suggested
                  </Badge>
                )}
                {activity.inTravelBoard && (
                  <Badge variant="outline" className="text-xs" data-testid={`badge-travel-board-${activity.id}`}>
                    In Travel Board
                  </Badge>
                )}
                {activity.socialProof && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span data-testid={`text-social-proof-${activity.id}`}>{activity.socialProof}</span>
                  </div>
                )}
              </div>
              {willBeClosed && (
                <div className="flex items-center gap-1 mt-2 text-xs text-destructive" data-testid={`warning-${activity.id}`}>
                  <AlertCircle className="w-3 h-3" />
                  <span>
                    Closes at {activity.closingTime}. Recommended time: {activity.suggestedTime}
                  </span>
                </div>
              )}
            </div>
            <div className="text-sm font-semibold text-foreground" data-testid={`text-price-${activity.id}`}>
              ${activity.price}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ItineraryBuilder() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [itinerary, setItinerary] = useState<DayItinerary>(initialItinerary);
  const [previousItinerary, setPreviousItinerary] = useState<DayItinerary | null>(null);
  const [showUndoBanner, setShowUndoBanner] = useState(false);
  const [, setLocation] = useLocation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fromChat = sessionStorage.getItem('fromChatEditor');
    if (fromChat === 'true') {
      sessionStorage.removeItem('fromChatEditor');
      setPreviousItinerary(initialItinerary);
      
      setItinerary((prev) => {
        const updated = { ...prev };
        if (updated[1] && updated[1].length > 2) {
          updated[1] = [
            ...updated[1].slice(0, 3),
            { 
              id: "1-3.5", 
              name: "Café Break", 
              time: "14:30", 
              duration: "30m", 
              category: "Food", 
              price: 12, 
              isAiSuggested: true,
              isRecentChange: true,
              socialProof: "AI recommended for rest"
            },
            ...updated[1].slice(3),
          ];
        }
        return updated;
      });
      
      setShowUndoBanner(true);
      setTimeout(() => {
        setItinerary((prev) => {
          const updated = { ...prev };
          Object.keys(updated).forEach((day) => {
            updated[Number(day)] = updated[Number(day)].map(act => ({ ...act, isRecentChange: false }));
          });
          return updated;
        });
      }, 5000);
    }
  }, []);

  const handleUndo = () => {
    if (previousItinerary) {
      setItinerary(previousItinerary);
      setPreviousItinerary(null);
      setShowUndoBanner(false);
    }
  };

  const currentDayActivities = itinerary[selectedDay] || [];
  const totalCost = currentDayActivities.reduce((sum, act) => sum + act.price, 0);
  
  const totalDuration = currentDayActivities.reduce((sum, act) => {
    const duration = act.duration;
    const hours = duration.includes('h') ? parseFloat(duration) : 0;
    const minutes = duration.includes('m') ? parseFloat(duration.split('h')[1] || duration) / 60 : 0;
    return sum + hours + minutes;
  }, 0);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItinerary((prev) => {
        const oldIndex = currentDayActivities.findIndex((act) => act.id === active.id);
        const newIndex = currentDayActivities.findIndex((act) => act.id === over.id);
        
        const newActivities = arrayMove(currentDayActivities, oldIndex, newIndex);
        
        return {
          ...prev,
          [selectedDay]: newActivities,
        };
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground" data-testid="text-heading">
                Build Your Itinerary
              </h1>
              <p className="text-sm text-muted-foreground">
                Drag to rearrange, AI suggests activities
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setLocation("/reference-board")}
                variant="outline"
                data-testid="button-nav-board"
              >
                <Home className="mr-2 w-4 h-4" />
                Travel Board
              </Button>
              <Button
                onClick={() => setLocation("/travel-tinder")}
                variant="outline"
                data-testid="button-nav-tinder"
              >
                Choose Stay
              </Button>
              <Button
                onClick={() => setLocation("/chat-editor")}
                size="lg"
                data-testid="button-continue"
              >
                Refine with AI
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {showUndoBanner && (
          <Card className="p-4 mb-6 bg-primary/5 border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">AI Changes Applied</p>
                  <p className="text-sm text-muted-foreground">
                    Added "Café Break" to give you time to rest before the museum
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUndo}
                data-testid="button-undo-changes"
              >
                <Undo className="mr-2 w-4 h-4" />
                Undo Changes
              </Button>
            </div>
          </Card>
        )}

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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={currentDayActivities.map(act => act.id)}
                strategy={verticalListSortingStrategy}
              >
                {currentDayActivities.map((activity) => (
                  <SortableActivity key={activity.id} activity={activity} />
                ))}
              </SortableContext>
            </DndContext>
            
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
              <h3 className="font-semibold text-foreground mb-4" data-testid="text-summary-title">Day {selectedDay} Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Activities</span>
                  <span className="font-semibold text-foreground" data-testid="text-activity-count">{currentDayActivities.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-semibold text-foreground" data-testid="text-total-cost">${totalCost}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground" data-testid="text-duration">
                    {Math.floor(totalDuration)}h {Math.round((totalDuration % 1) * 60)}m
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Traveler Insights</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Activities marked with social proof show real traveler feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Red warnings show timing conflicts with closing hours</span>
                </li>
              </ul>
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
