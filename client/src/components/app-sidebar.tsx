import { Map, Bike, Calendar, FileText, Plane, MessageSquare } from "lucide-react";
import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Travel Board",
    url: "/reference-board",
    icon: Map,
  },
  {
    title: "Activities",
    url: "/travel-tinder",
    icon: Bike,
  },
  {
    title: "Itinerary",
    url: "/itinerary-builder",
    icon: Calendar,
  },
  {
    title: "AI Assistant",
    url: "/chat-editor",
    icon: MessageSquare,
  },
  {
    title: "Flights",
    url: "/flights",
    icon: Plane,
  },
  {
    title: "Summary",
    url: "/trip-report",
    icon: FileText,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Trip Planning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`sidebar-nav-${item.title.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
