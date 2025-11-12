import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserPlus, Users } from "lucide-react";

export interface TripMember {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  currentPage?: string;
  role: "organizer" | "co-planner" | "viewer";
}

interface CollaborationBarProps {
  tripId: string;
  tripName: string;
  members: TripMember[];
  currentUserId: string;
  onInviteClick: () => void;
  onActivityFeedClick?: () => void;
}

export function CollaborationBar({
  tripId,
  tripName,
  members,
  currentUserId,
  onInviteClick,
  onActivityFeedClick,
}: CollaborationBarProps) {
  const [showAllMembers, setShowAllMembers] = useState(false);

  // Show first 3 members on desktop, 2 on mobile
  const visibleMembersCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 3;
  const visibleMembers = members.slice(0, visibleMembersCount);
  const hiddenMembersCount = Math.max(0, members.length - visibleMembersCount);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: TripMember["role"]) => {
    switch (role) {
      case "organizer":
        return "bg-primary/20 text-primary";
      case "co-planner":
        return "bg-blue-500/20 text-blue-600";
      case "viewer":
        return "bg-muted text-muted-foreground";
    }
  };

  const MemberAvatar = ({ member, showTooltip = true }: { member: TripMember; showTooltip?: boolean }) => {
    const avatar = (
      <div className="relative">
        <Avatar className="w-9 h-9 border-2 border-background">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
        </Avatar>
        {member.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        )}
      </div>
    );

    if (!showTooltip) return avatar;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
            {avatar}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-semibold">{member.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
            {member.currentPage && member.isOnline && (
              <p className="text-xs text-muted-foreground mt-1">
                Viewing: {member.currentPage}
              </p>
            )}
            {!member.isOnline && (
              <p className="text-xs text-muted-foreground mt-1">Offline</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          {/* Left: Trip name */}
          <div className="flex items-center gap-3 min-w-0">
            <h2 className="font-semibold text-sm md:text-base truncate" data-testid="trip-name">
              {tripName}
            </h2>
          </div>

          {/* Right: Members and invite button */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Visible member avatars */}
            <div className="flex items-center -space-x-2">
              {visibleMembers.map((member) => (
                <MemberAvatar key={member.id} member={member} />
              ))}
            </div>

            {/* Show more members button (mobile & desktop) */}
            {hiddenMembersCount > 0 && (
              <Sheet open={showAllMembers} onOpenChange={setShowAllMembers}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-2 md:px-3"
                    data-testid="show-more-members"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-xs">+{hiddenMembersCount}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Trip Members ({members.length})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-3">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        data-testid={`member-${member.id}`}
                      >
                        <MemberAvatar member={member} showTooltip={false} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">{member.name}</p>
                            {member.id === currentUserId && (
                              <span className="text-xs text-muted-foreground">(You)</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full capitalize ${getRoleBadgeColor(
                                member.role
                              )}`}
                            >
                              {member.role}
                            </span>
                            {member.isOnline ? (
                              <span className="text-xs text-green-600">Online</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">Offline</span>
                            )}
                          </div>
                          {member.currentPage && member.isOnline && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Viewing: {member.currentPage}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {/* Activity Feed button */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 relative"
              onClick={onActivityFeedClick}
              data-testid="activity-feed-button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                7
              </span>
            </Button>

            {/* Invite button */}
            <Button
              onClick={onInviteClick}
              size="sm"
              className="h-9"
              data-testid="invite-button"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Invite</span>
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
