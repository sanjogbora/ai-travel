import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pin, Instagram, Video, ImageIcon, ArrowRight } from "lucide-react";
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
  { id: "1", image: parisImg, source: "instagram" as const, title: "Eiffel Tower sunset views", url: "#" },
  { id: "2", image: templeImg, source: "pinterest" as const, title: "Temple architecture", url: "#" },
  { id: "3", image: foodImg, source: "instagram" as const, title: "Local seafood spots", url: "#" },
  { id: "4", image: adventureImg, source: "tiktok" as const, title: "Adventure activities", url: "#" },
];

export default function ReferenceBoard() {
  const [references, setReferences] = useState(sampleReferences);
  const [, setLocation] = useLocation();

  const handleRemove = (id: string) => {
    setReferences(references.filter(ref => ref.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground" data-testid="text-heading">
              Travel Inspiration Board
            </h1>
            <p className="text-sm text-muted-foreground">
              Collect ideas from across the web
            </p>
          </div>
          <Button
            onClick={() => setLocation("/travel-tinder")}
            size="lg"
            data-testid="button-continue"
          >
            Continue to Selection
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {references.length === 0 ? (
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
            {references.map((ref) => {
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
                      <div className="flex items-center gap-2 text-white mb-1">
                        <SourceIcon className="w-4 h-4" />
                        <span className="text-xs font-medium capitalize" data-testid={`text-source-${ref.id}`}>{ref.source}</span>
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
