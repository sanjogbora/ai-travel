import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Home, Hotel, MapPin } from "lucide-react";

interface AppNavProps {
  currentPage: "board" | "tinder" | "itinerary";
}

export function AppNav({ currentPage }: AppNavProps) {
  const [, setLocation] = useLocation();

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant={currentPage === "board" ? "default" : "ghost"}
              onClick={() => setLocation("/reference-board")}
              data-testid="nav-board"
              size="sm"
            >
              <Home className="mr-2 w-4 h-4" />
              Travel Board
            </Button>
            <Button
              variant={currentPage === "tinder" ? "default" : "ghost"}
              onClick={() => setLocation("/travel-tinder")}
              data-testid="nav-tinder"
              size="sm"
            >
              <Hotel className="mr-2 w-4 h-4" />
              Hotels
            </Button>
            <Button
              variant={currentPage === "itinerary" ? "default" : "ghost"}
              onClick={() => setLocation("/itinerary-builder")}
              data-testid="nav-itinerary"
              size="sm"
            >
              <MapPin className="mr-2 w-4 h-4" />
              Itinerary
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
