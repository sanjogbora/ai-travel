import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/components/MainLayout";
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
import Flights from "@/pages/Flights";

function Router() {
  return (
    <Switch>
      {/* Onboarding routes - no sidebar */}
      <Route path="/" component={Home} />
      <Route path="/onboarding/group" component={GroupSelection} />
      <Route path="/onboarding/budget" component={BudgetSelection} />
      <Route path="/onboarding/dates" component={DateSelection} />
      <Route path="/onboarding/destination" component={DestinationSelection} />
      
      {/* Main app routes - with sidebar */}
      <Route path="/reference-board">
        {() => <MainLayout><ReferenceBoard /></MainLayout>}
      </Route>
      <Route path="/travel-tinder">
        {() => <MainLayout><TravelTinder /></MainLayout>}
      </Route>
      <Route path="/itinerary-builder">
        {() => <MainLayout><ItineraryBuilder /></MainLayout>}
      </Route>
      <Route path="/flights">
        {() => <MainLayout><Flights /></MainLayout>}
      </Route>
      <Route path="/trip-report">
        {() => <MainLayout><TripReport /></MainLayout>}
      </Route>
      <Route path="/chat-editor">
        {() => <MainLayout><ChatEditor /></MainLayout>}
      </Route>
      <Route path="/comparison">
        {() => <MainLayout><ComparisonView /></MainLayout>}
      </Route>
      
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
