import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, DollarSign, Plane, Hotel, UtensilsCrossed, Ticket } from 'lucide-react';

interface AIBudgetInsightProps {
  destination: string;
  memberCount: number;
  budgetRange: { min: number; max: number };
}

interface BudgetBreakdown {
  flights: number;
  hotels: number;
  activities: number;
  food: number;
  other: number;
}

export function AIBudgetInsight({ destination, memberCount, budgetRange }: AIBudgetInsightProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [breakdown, setBreakdown] = useState<BudgetBreakdown | null>(null);
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    // Simulate AI analysis
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const avgBudget = (budgetRange.min + budgetRange.max) / 2;
      const perPerson = avgBudget / memberCount;

      // Mock breakdown percentages
      const mockBreakdown: BudgetBreakdown = {
        flights: Math.round(perPerson * 0.35),
        hotels: Math.round(perPerson * 0.30),
        activities: Math.round(perPerson * 0.20),
        food: Math.round(perPerson * 0.10),
        other: Math.round(perPerson * 0.05),
      };

      setBreakdown(mockBreakdown);

      // Generate recommendation
      if (perPerson < 1000) {
        setRecommendation('Budget-friendly trip. Consider hostels and local eateries.');
      } else if (perPerson < 2500) {
        setRecommendation('Mid-range comfort. Good balance of quality and value.');
      } else {
        setRecommendation('Luxury experience. Premium accommodations and dining.');
      }

      setIsAnalyzing(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [destination, memberCount, budgetRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const categories = breakdown
    ? [
        { name: 'Flights', amount: breakdown.flights, icon: Plane, color: 'text-blue-600' },
        { name: 'Hotels', amount: breakdown.hotels, icon: Hotel, color: 'text-purple-600' },
        { name: 'Activities', amount: breakdown.activities, icon: Ticket, color: 'text-green-600' },
        { name: 'Food', amount: breakdown.food, icon: UtensilsCrossed, color: 'text-orange-600' },
        { name: 'Other', amount: breakdown.other, icon: DollarSign, color: 'text-gray-600' },
      ]
    : [];

  const totalPerPerson = breakdown
    ? breakdown.flights + breakdown.hotels + breakdown.activities + breakdown.food + breakdown.other
    : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-green-500/5 to-emerald-500/10 border-green-500/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">AI Budget Analysis</h3>
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Insight
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {isAnalyzing
              ? `Analyzing typical costs for ${destination}...`
              : `Estimated budget breakdown for ${memberCount} ${memberCount === 1 ? 'person' : 'people'}`}
          </p>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="space-y-3">
          <div className="h-24 bg-muted/50 rounded-lg animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Total per person */}
          <div className="p-4 bg-background rounded-lg border border-green-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Per Person</span>
              <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                Recommended
              </Badge>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(totalPerPerson)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{recommendation}</p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const percentage = ((category.amount / totalPerPerson) * 100).toFixed(0);
              
              return (
                <div
                  key={category.name}
                  className="p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${category.color}`} />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="text-lg font-bold">{formatCurrency(category.amount)}</div>
                  <div className="text-xs text-muted-foreground">{percentage}% of budget</div>
                </div>
              );
            })}
          </div>

          {/* Total for group */}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total for {memberCount} {memberCount === 1 ? 'person' : 'people'}</span>
              <span className="font-semibold">{formatCurrency(totalPerPerson * memberCount)}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
