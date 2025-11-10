import { useState } from "react";
import { Star, Heart, X, Wifi, Coffee, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SwipeCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  features: string[];
  type: "hotel" | "flight" | "activity";
  onSwipe: (id: string, direction: "left" | "right") => void;
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
  reviewCount,
  price,
  features,
  type,
  onSwipe,
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(offset.x) > 150) {
      onSwipe(id, offset.x > 0 ? "right" : "left");
    }
    
    setOffset({ x: 0, y: 0 });
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
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      data-testid={`swipe-card-${id}`}
    >
      <div className="bg-card border border-card-border rounded-xl overflow-hidden h-full shadow-xl">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground" data-testid={`badge-price-${id}`}>
            ${price}
          </Badge>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`text-name-${id}`}>{name}</h3>
          
          <div className="flex items-center gap-2 mb-4">
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
            <span className="text-sm text-muted-foreground" data-testid={`text-reviews-${id}`}>
              ({reviewCount} reviews)
            </span>
          </div>

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
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-6">
          <Button
            size="icon"
            variant="destructive"
            className="w-16 h-16 rounded-full shadow-lg"
            onClick={() => handleSwipeButton("left")}
            data-testid="button-swipe-left"
          >
            <X className="w-8 h-8" />
          </Button>
          <Button
            size="icon"
            className="w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            onClick={() => handleSwipeButton("right")}
            data-testid="button-swipe-right"
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
