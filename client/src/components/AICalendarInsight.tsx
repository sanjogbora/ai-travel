import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Calendar, Users, TrendingUp } from 'lucide-react';

interface AICalendarInsightProps {
  selectedDates?: { start: string; end: string };
  memberCount: number;
}

interface DateSuggestion {
  startDate: string;
  endDate: string;
  reason: string;
  availability: 'all' | 'most' | 'some';
}

export function AICalendarInsight({ selectedDates, memberCount }: AICalendarInsightProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [suggestions, setSuggestions] = useState<DateSuggestion[]>([]);

  useEffect(() => {
    // Simulate AI analysis
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      // Mock suggestions based on current date
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      
      setSuggestions([
        {
          startDate: formatDate(nextMonth),
          endDate: formatDate(addDays(nextMonth, 7)),
          reason: 'All members available, best weather forecast',
          availability: 'all',
        },
        {
          startDate: formatDate(addDays(nextMonth, 14)),
          endDate: formatDate(addDays(nextMonth, 21)),
          reason: 'Most members free, lower flight prices',
          availability: 'most',
        },
        {
          startDate: formatDate(addDays(nextMonth, 28)),
          endDate: formatDate(addDays(nextMonth, 35)),
          reason: 'Some availability, peak season activities',
          availability: 'some',
        },
      ]);
      setIsAnalyzing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [memberCount]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'all':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'most':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'some':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'all':
        return `All ${memberCount} members available`;
      case 'most':
        return `${memberCount - 1} of ${memberCount} members available`;
      case 'some':
        return `${Math.floor(memberCount / 2)} of ${memberCount} members available`;
      default:
        return 'Checking availability...';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">AI Calendar Analysis</h3>
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Insight
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {isAnalyzing
              ? 'Analyzing calendars and finding optimal dates...'
              : `Found ${suggestions.length} great date options for your group`}
          </p>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-muted/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">
                    {suggestion.startDate} - {suggestion.endDate}
                  </span>
                </div>
                {index === 0 && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Best Match
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {suggestion.reason}
              </p>
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs border ${getAvailabilityColor(suggestion.availability)}`}>
                <Users className="w-3 h-3" />
                {getAvailabilityText(suggestion.availability)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
