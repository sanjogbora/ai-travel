import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CollaborationBar, type TripMember } from "@/components/CollaborationBar";
import { ActivityFeedSidebar } from "@/components/ActivityFeedSidebar";
import { PresenceProvider, usePresenceContext } from "@/contexts/PresenceContext";
import { useLocation } from "wouter";

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const { members } = usePresenceContext();

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const handleInviteClick = () => {
    setShowInviteModal(true);
    // TODO: Open invite modal
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <div className="flex items-center border-b bg-background">
            <div className="p-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
            </div>
            <div className="flex-1">
              <CollaborationBar
                tripId="trip-1"
                tripName="Paris Adventure 2024"
                members={members}
                currentUserId="1"
                onInviteClick={handleInviteClick}
                onActivityFeedClick={() => setShowActivityFeed(!showActivityFeed)}
              />
            </div>
          </div>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      
      {/* Activity Feed Sidebar */}
      <ActivityFeedSidebar
        isOpen={showActivityFeed}
        onToggle={() => setShowActivityFeed(!showActivityFeed)}
      />
    </SidebarProvider>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  // Mock initial members - will be replaced with real data from API
  const initialMembers: TripMember[] = [
    {
      id: "1",
      name: "You",
      avatar: undefined,
      isOnline: true,
      currentPage: "Planning",
      role: "organizer",
    },
    {
      id: "2",
      name: "Sarah Chen",
      avatar: undefined,
      isOnline: true,
      currentPage: "Flights",
      role: "co-planner",
    },
    {
      id: "3",
      name: "Mike Johnson",
      avatar: undefined,
      isOnline: false,
      currentPage: undefined,
      role: "co-planner",
    },
    {
      id: "4",
      name: "Emma Wilson",
      avatar: undefined,
      isOnline: true,
      currentPage: "Itinerary",
      role: "viewer",
    },
  ];

  return (
    <PresenceProvider
      tripId="trip-1"
      currentUserId="1"
      currentUserName="You"
      initialMembers={initialMembers}
      enabled={true}
    >
      <MainLayoutContent>{children}</MainLayoutContent>
    </PresenceProvider>
  );
}

function getCurrentPageName(path: string): string {
  if (path.includes("board") || path.includes("reference")) return "Reference Board";
  if (path.includes("travel-tinder")) return "Travel Tinder";
  if (path.includes("itinerary")) return "Itinerary";
  if (path.includes("flights")) return "Flights";
  if (path.includes("trip-report")) return "Trip Report";
  if (path.includes("chat")) return "Chat";
  if (path.includes("comparison")) return "Comparison";
  return "Planning";
}
