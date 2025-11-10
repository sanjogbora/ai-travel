import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, MapPin, Cloud, Sun, Shirt, Download, Share2 } from "lucide-react";
import parisImg from "@assets/generated_images/Paris_sunset_aerial_view_25faf353.png";

export default function TripReport() {
  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${parisImg})` }}
        data-testid="section-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-white mb-4" data-testid="text-trip-title">
            Paris Adventure
          </h1>
          <p className="text-xl text-white/90 mb-8" data-testid="text-trip-subtitle">
            Your complete travel guide
          </p>
          <div className="flex gap-4">
            <Button size="lg" variant="secondary" data-testid="button-download">
              <Download className="mr-2 w-5 h-5" />
              Download PDF
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/30" data-testid="button-share">
              <Share2 className="mr-2 w-5 h-5" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 text-center" data-testid="card-stat-duration">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground" data-testid="text-stat-days">5 Days</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </Card>
          <Card className="p-6 text-center" data-testid="card-stat-cost">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground" data-testid="text-stat-cost">$1,850</div>
            <div className="text-sm text-muted-foreground">Total Cost</div>
          </Card>
          <Card className="p-6 text-center" data-testid="card-stat-activities">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground" data-testid="text-stat-activities">15</div>
            <div className="text-sm text-muted-foreground">Activities</div>
          </Card>
          <Card className="p-6 text-center" data-testid="card-stat-travelers">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground" data-testid="text-stat-travelers">4</div>
            <div className="text-sm text-muted-foreground">Travelers</div>
          </Card>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Daily Itinerary
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((day) => (
              <Card key={day} className="p-6" data-testid={`card-day-${day}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Day {day}</h3>
                    <p className="text-sm text-muted-foreground">Monday, June {day}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-foreground">72°F</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 pb-3 border-b border-border last:border-0">
                    <span className="text-sm font-semibold text-muted-foreground min-w-[60px]">08:00</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Breakfast at Le Café</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">Food</Badge>
                        <Badge variant="secondary" className="text-xs">$25</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pb-3 border-b border-border last:border-0">
                    <span className="text-sm font-semibold text-muted-foreground min-w-[60px]">10:00</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Eiffel Tower Visit</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">Sightseeing</Badge>
                        <Badge variant="secondary" className="text-xs">$30</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-semibold text-muted-foreground min-w-[60px]">13:00</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Lunch at Traditional Bistro</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">Food</Badge>
                        <Badge variant="secondary" className="text-xs">$45</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            What to Pack
          </h2>
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Cloud className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Weather Forecast</h3>
                <p className="text-sm text-muted-foreground">
                  Expect mild temperatures (65-75°F) with occasional rain. Pack layers and a light rain jacket.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shirt className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Outfit Recommendations</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Comfortable walking shoes for city exploration</li>
                  <li>• Smart casual attire for dining experiences</li>
                  <li>• Light jacket or cardigan for evenings</li>
                  <li>• Sunglasses and sunscreen</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Local Tips
          </h2>
          <Card className="p-6">
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Transportation</h3>
                <p>Metro is the most efficient way to get around. Purchase a Paris Visite pass for unlimited travel.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Language</h3>
                <p>Basic French phrases go a long way. Most tourist areas have English speakers.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Safety</h3>
                <p>Watch for pickpockets in tourist areas. Keep valuables secure and be aware of your surroundings.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Authentic Experiences</h3>
                <p>Visit local markets in the morning, try neighborhood bistros away from main attractions, and explore Le Marais district for authentic Parisian life.</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
