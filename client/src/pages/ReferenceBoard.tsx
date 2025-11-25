import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pin, Instagram, Video, ImageIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiTiktok, SiPinterest, SiYoutube } from "react-icons/si";
import parisImg from "@assets/generated_images/Paris_sunset_aerial_view_25faf353.png";
import templeImg from "@assets/generated_images/Ancient_temple_sunrise_e496510f.png";
import foodImg from "@assets/generated_images/Coastal_seafood_dining_436c7396.png";
import adventureImg from "@assets/generated_images/Mountain_paragliding_adventure_7d9c9526.png";

const sourceIcons = {
  instagram: Instagram,
  tiktok: SiTiktok,
  pinterest: SiPinterest,
  youtube: SiYoutube,
};

const sampleReferences = [
  { id: "1", image: parisImg, source: "instagram" as const, title: "Eiffel Tower sunset views", url: "#", inItinerary: true },
  { id: "2", image: templeImg, source: "pinterest" as const, title: "Temple architecture", url: "#", inItinerary: false },
  { id: "3", image: foodImg, source: "instagram" as const, title: "Local seafood spots", url: "#", inItinerary: true },
  { id: "4", image: adventureImg, source: "tiktok" as const, title: "Adventure activities", url: "#", inItinerary: false },
];

export default function ReferenceBoard() {
  const [references, setReferences] = useState(sampleReferences);
  const [, setLocation] = useLocation();
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleRemove = (id: string) => {
    setReferences(references.filter(ref => ref.id !== id));
  };

  const filteredReferences = references.filter(ref => {
    const matchesSource = sourceFilter === "all" || ref.source === sourceFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "in-itinerary" && ref.inItinerary) ||
      (statusFilter === "not-in-itinerary" && !ref.inItinerary);
    return matchesSource && matchesStatus;
  });

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Travel Inspiration Board</h1>
          <p className="text-muted-foreground mb-6">Collect and organize your travel ideas from across the web</p>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Source:</span>
              <Badge
                variant={sourceFilter === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSourceFilter("all")}
              >
                All
              </Badge>
              <Badge
                variant={sourceFilter === "instagram" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSourceFilter("instagram")}
              >
                <Instagram className="w-3 h-3 mr-1" />
                Instagram
              </Badge>
              <Badge
                variant={sourceFilter === "pinterest" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSourceFilter("pinterest")}
              >
                <SiPinterest className="w-3 h-3 mr-1" />
                Pinterest
              </Badge>
              <Badge
                variant={sourceFilter === "tiktok" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSourceFilter("tiktok")}
              >
                <SiTiktok className="w-3 h-3 mr-1" />
                TikTok
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Badge
                variant={statusFilter === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Badge>
              <Badge
                variant={statusFilter === "in-itinerary" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("in-itinerary")}
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                In Itinerary
              </Badge>
              <Badge
                variant={statusFilter === "not-in-itinerary" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("not-in-itinerary")}
              >
                Not Added
              </Badge>
            </div>
          </div>
        </div>

        {filteredReferences.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Your inspiration board is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Start collecting travel ideas from Instagram, TikTok, Pinterest and more
            </p>
            <Button onClick={() => setLocation("/travel-tinder")} data-testid="button-skip">
              Skip to Selection
            </Button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredReferences.map((ref) => {
              const SourceIcon = sourceIcons[ref.source];
              return (
                <Card
                  key={ref.id}
                  className="break-inside-avoid overflow-hidden group relative hover-elevate"
                  data-testid={`card-reference-${ref.id}`}
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={ref.image}
                      alt={ref.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemove(ref.id)}
                      data-testid={`button-remove-${ref.id}`}
                    >
                      <Pin className="w-4 h-4" />
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 text-white">
                          <SourceIcon className="w-4 h-4" />
                          <span className="text-xs font-medium capitalize" data-testid={`text-source-${ref.id}`}>{ref.source}</span>
                        </div>
                        {ref.inItinerary && (
                          <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white text-xs gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            In Itinerary
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-white font-medium line-clamp-2" data-testid={`text-title-${ref.id}`}>
                        {ref.title}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
