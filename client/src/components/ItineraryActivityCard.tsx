import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, MessageCircle, Share2, Trash2, GripVertical, Heart } from 'lucide-react';

interface ItineraryActivityCardProps {
  activity: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    price: number;
    image?: string;
  };
  addedBy: {
    name: string;
    avatar?: string;
  };
  votes?: {
    love: number;
    maybe: number;
    skip: number;
  };
  commentCount?: number;
  onComment?: () => void;
  onRemove?: () => void;
  onShare?: () => void;
  isDragging?: boolean;
}

export function ItineraryActivityCard({
  activity,
  addedBy,
  votes,
  commentCount = 0,
  onComment,
  onRemove,
  onShare,
  isDragging = false,
}: ItineraryActivityCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={`p-4 transition-all ${isDragging ? 'opacity-50 rotate-2' : 'hover:shadow-md'}`}>
      <div className="flex gap-3">
        {/* Drag handle */}
        <div className="flex items-center cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Activity image */}
        {activity.image && (
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
            <img
              src={activity.image}
              alt={activity.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Activity details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight mb-1">{activity.name}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activity.startTime} - {activity.endTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>${activity.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Added by */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="w-5 h-5">
              <AvatarImage src={addedBy.avatar} alt={addedBy.name} />
              <AvatarFallback className="text-xs">{getInitials(addedBy.name)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              Added by {addedBy.name}
            </span>
          </div>

          {/* Votes and actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {votes && (
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>{votes.love}</span>
                  </div>
                  {commentCount > 0 && (
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                      <span>{commentCount}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {onComment && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onComment}
                  className="h-8 px-2"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              )}
              {onShare && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onShare}
                  className="h-8 px-2"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
              {onRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                  className="h-8 px-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
