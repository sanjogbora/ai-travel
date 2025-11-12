import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Heart, MessageCircle, Calendar, CheckCircle, UserPlus, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedItem {
  id: string;
  type: 'vote' | 'comment' | 'itinerary' | 'task' | 'member';
  memberName: string;
  memberAvatar?: string;
  action: string;
  targetName?: string;
  timestamp: string;
}

// Mock activity feed data for demo
const mockActivities: ActivityFeedItem[] = [
  {
    id: '1',
    type: 'vote',
    memberName: 'Sarah Chen',
    action: 'loved',
    targetName: 'Eiffel Tower Tour',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'comment',
    memberName: 'Mike Johnson',
    action: 'commented on',
    targetName: 'Louvre Museum',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'itinerary',
    memberName: 'Emma Wilson',
    action: 'added',
    targetName: 'Seine River Cruise',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'vote',
    memberName: 'Alex Martinez',
    action: 'loved',
    targetName: 'Montmartre Walking Tour',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'member',
    memberName: 'Jordan Lee',
    action: 'joined the trip',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    type: 'comment',
    memberName: 'Sarah Chen',
    action: 'commented on',
    targetName: 'Hotel Le Marais',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    type: 'itinerary',
    memberName: 'Mike Johnson',
    action: 'removed',
    targetName: 'Arc de Triomphe Visit',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
];

interface ActivityFeedSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ActivityFeedSidebar({ isOpen, onToggle }: ActivityFeedSidebarProps) {
  const [filter, setFilter] = useState<string>('all');
  const [activities] = useState<ActivityFeedItem[]>(mockActivities);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'vote':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'itinerary':
        return <Calendar className="w-4 h-4 text-green-500" />;
      case 'task':
        return <CheckCircle className="w-4 h-4 text-purple-500" />;
      case 'member':
        return <UserPlus className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter);

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'vote', label: 'Votes' },
    { value: 'comment', label: 'Comments' },
    { value: 'itinerary', label: 'Itinerary' },
  ];

  return (
    <>
      {/* Sidebar - no floating button, controlled externally */}
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Activity Feed
            </SheetTitle>
          </SheetHeader>

          {/* Filters */}
          <div className="flex gap-2 mt-6 mb-4 overflow-x-auto pb-2">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f.value)}
                className="shrink-0"
              >
                {f.label}
              </Button>
            ))}
          </div>

          {/* Activity list */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No activities in this category</p>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  data-testid={`activity-${activity.id}`}
                >
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage src={activity.memberAvatar} alt={activity.memberName} />
                    <AvatarFallback className="text-xs">
                      {getInitials(activity.memberName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.memberName}</span>
                          {' '}
                          <span className="text-muted-foreground">{activity.action}</span>
                          {activity.targetName && (
                            <>
                              {' '}
                              <span className="font-medium">{activity.targetName}</span>
                            </>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
