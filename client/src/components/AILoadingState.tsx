import { Sparkles, Brain, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AILoadingStateProps {
  message?: string;
  variant?: 'default' | 'compact' | 'inline';
}

const loadingMessages = [
  'AI analyzing your preferences...',
  'Finding the best deals...',
  'Optimizing your itinerary...',
  'Checking group availability...',
  'Personalizing recommendations...',
  'Crunching travel data...',
];

export function AILoadingState({ 
  message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
  variant = 'default'
}: AILoadingStateProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="relative">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <div className="absolute inset-0 animate-ping">
            <Sparkles className="w-4 h-4 text-primary opacity-30" />
          </div>
        </div>
        <span className="text-sm text-primary font-medium">{message}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <Brain className="w-4 h-4 text-primary animate-pulse" />
          <div className="absolute inset-0 animate-ping">
            <Brain className="w-4 h-4 text-primary opacity-30" />
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{message}</span>
        <Badge variant="secondary" className="text-xs">
          <Sparkles className="w-3 h-3 mr-1" />
          AI
        </Badge>
      </div>
    );
  }

  return (
    <Card className="p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="relative">
          {/* Main icon */}
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          
          {/* Orbiting icons */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <Brain className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-primary/60" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <Zap className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-primary/60" />
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold text-lg mb-2 flex items-center justify-center gap-2">
        <span>{message}</span>
      </h3>
      
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Badge variant="secondary" className="text-xs">
          <Sparkles className="w-3 h-3 mr-1" />
          AI Powered
        </Badge>
        <span>This may take a few moments</span>
      </div>
      
      {/* Loading dots */}
      <div className="flex justify-center gap-1 mt-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </Card>
  );
}

// Skeleton loading for cards
export function AICardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-muted rounded-lg animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-3 bg-muted rounded w-16 animate-pulse" />
            <div className="h-3 bg-muted rounded w-20 animate-pulse" />
          </div>
        </div>
        <div className="w-16 text-right space-y-2">
          <div className="h-6 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded animate-pulse" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center">
        <AILoadingState variant="inline" message="AI optimizing this recommendation..." />
      </div>
    </Card>
  );
}

// Loading overlay
export function AILoadingOverlay({ isVisible, message }: { isVisible: boolean; message?: string }) {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <AILoadingState message={message} />
    </div>
  );
}
