import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import GroupSelection from "@/pages/GroupSelection";
import BudgetSelection from "@/pages/BudgetSelection";
import DateSelection from "@/pages/DateSelection";
import DestinationSelection from "@/pages/DestinationSelection";
import ReferenceBoard from "@/pages/ReferenceBoard";
import TravelTinder from "@/pages/TravelTinder";
import ItineraryBuilder from "@/pages/ItineraryBuilder";
import ChatEditor from "@/pages/ChatEditor";
import ComparisonView from "@/pages/ComparisonView";
import TripReport from "@/pages/TripReport";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/onboarding/group" component={GroupSelection} />
      <Route path="/onboarding/budget" component={BudgetSelection} />
      <Route path="/onboarding/dates" component={DateSelection} />
      <Route path="/onboarding/destination" component={DestinationSelection} />
      <Route path="/reference-board" component={ReferenceBoard} />
      <Route path="/travel-tinder" component={TravelTinder} />
      <Route path="/itinerary-builder" component={ItineraryBuilder} />
      <Route path="/chat-editor" component={ChatEditor} />
      <Route path="/comparison" component={ComparisonView} />
      <Route path="/trip-report" component={TripReport} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
