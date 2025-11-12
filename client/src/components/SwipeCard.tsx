import { useState } from "react";
import { Star, Heart, X, Wifi, Coffee, Shield, MapPin, MessageCircle, Trophy, ArrowRight, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { VoteSummary } from "@shared/schema";

interface SwipeCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  type: "hotel" | "flight" | "activity";
  onSwipe: (id: string, direction: "left" | "right") => void;
  
  reviewCount?: number;
  features?: string[];
  
  category?: string;
  duration?: string;
  description?: string;
  
  // Collaboration props
  votes?: VoteSummary;
  comments?: number;
  addedBy?: string;
  showConsensus?: boolean;
  onCommentClick?: () => void;
}

const featureIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  "Breakfast": Coffee,
  "High Safety": Shield,
  "Central Location": MapPin,
};

export function SwipeCard({
  id,
  name,
  image,
  rating,
  price,
  type,
  onSwipe,
  reviewCount,
  features,
  category,
  duration,
  description,
  votes,
  comments,
  addedBy,
  showConsensus = true,
  onCommentClick,
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(offset.x) > 150) {
      onSwipe(id, offset.x > 0 ? "right" : "left");
    }
    
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleSwipeButton = (direction: "left" | "right") => {
    onSwipe(id, direction);
  };

  const rotation = offset.x * 0.05;
  const opacity = 1 - Math.abs(offset.x) / 500;

  return (
    <div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateX(${offset.x}px) translateY(${offset.y}px) rotate(${rotation}deg)`,
        opacity,
        transition: isDragging ? "none" : "all 0.3s ease-out",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      data-testid={`swipe-card-${id}`}
    >
      <div className="bg-card border border-card-border rounded-xl overflow-hidden h-full shadow-xl">
        {/* Vote counts and consensus badge - positioned at top right */}
        {votes && (
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur-sm border border-border shadow-lg">
              <div className="flex items-center gap-1 text-sm">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span className="font-semibold">{votes.love}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1 text-sm">
                <Minus className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-semibold">{votes.maybe}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1 text-sm">
                <X className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-semibold">{votes.skip}</span>
              </div>
            </div>
            
            {comments !== undefined && comments > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCommentClick?.();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur-sm border border-border shadow-lg text-sm hover:bg-primary/10 hover:border-primary transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="font-semibold">{comments}</span>
              </button>
            )}
            
            {showConsensus && votes.consensusType && (
              <Badge className="bg-primary/95 backdrop-blur-sm text-primary-foreground shadow-lg">
                <Trophy className="w-3 h-3 mr-1" />
                Group Favorite!
              </Badge>
            )}
          </div>
        )}

        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-primary/95 backdrop-blur-sm text-primary-foreground shadow-lg text-base px-3 py-1" data-testid={`badge-price-${id}`}>
            ${price}
          </Badge>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground" data-testid={`text-name-${id}`}>{name}</h3>
              {addedBy && (
                <p className="text-xs text-muted-foreground mt-1">
                  Added by {addedBy}
                </p>
              )}
            </div>
            {category && type === "activity" && (
              <Badge variant="secondary" className="shrink-0" data-testid={`badge-category-${id}`}>
                {category}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1" data-testid={`rating-${id}`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            {reviewCount && (
              <span className="text-sm text-muted-foreground" data-testid={`text-reviews-${id}`}>
                ({reviewCount} reviews)
              </span>
            )}
            {duration && type === "activity" && (
              <span className="text-sm text-muted-foreground" data-testid={`text-duration-${id}`}>
                • {duration}
              </span>
            )}
          </div>

          {description && type === "activity" && (
            <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-description-${id}`}>
              {description}
            </p>
          )}

          {features && features.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {features.slice(0, 4).map((feature, idx) => {
                const Icon = featureIcons[feature] || Wifi;
                return (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="w-4 h-4" />
                    <span>{feature}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
