import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CollaborationShowcase } from '@/components/CollaborationShowcase';
import { Poll } from '@/components/Poll';
import { PackingList } from '@/components/PackingList';
import { BudgetSplitting } from '@/components/BudgetSplitting';
import { ActivityFeedSidebar } from '@/components/ActivityFeedSidebar';
import { CommentThread } from '@/components/CommentThread';
import { AILoadingState, AICardSkeleton } from '@/components/AILoadingState';
import { AICalendarInsight } from '@/components/AICalendarInsight';
import { AIBudgetInsight } from '@/components/AIBudgetInsight';
import { 
  Sparkles, 
  Users, 
  MessageCircle, 
  BarChart3, 
  Package, 
  DollarSign,
  Calendar,
  Lightbulb
} from 'lucide-react';

export default function CollaborationDemo() {
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleVote = (optionId: string) => {
    console.log('Voted for:', optionId);
  };

  const demoSections = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Sparkles,
      component: <CollaborationShowcase />
    },
    {
      id: 'voting',
      label: 'Voting & Polls',
      icon: BarChart3,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Group Decision Making</h2>
            <p className="text-muted-foreground">
              Vote on activities and create polls for group consensus
            </p>
          </div>
          <Poll onVote={handleVote} />
        </div>
      )
    },
    {
      id: 'packing',
      label: 'Packing Lists',
      icon: Package,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Shared Packing Lists</h2>
            <p className="text-muted-foreground">
              Coordinate what to bring and track progress together
            </p>
          </div>
          <PackingList />
        </div>
      )
    },
    {
      id: 'budget',
      label: 'Budget Splitting',
      icon: DollarSign,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Fair Budget Management</h2>
            <p className="text-muted-foreground">
              Track expenses and split costs transparently
            </p>
          </div>
          <BudgetSplitting />
        </div>
      )
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: Lightbulb,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">AI-Powered Recommendations</h2>
            <p className="text-muted-foreground">
              Get smart suggestions based on your group's preferences
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AICalendarInsight />
            <AIBudgetInsight />
          </div>
        </div>
      )
    },
    {
      id: 'loading',
      label: 'Loading States',
      icon: Sparkles,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">AI Loading States</h2>
            <p className="text-muted-foreground">
              Beautiful loading experiences with AI branding
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Default Loading</h3>
              <AILoadingState />
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Compact Loading</h3>
              <AILoadingState variant="compact" message="Processing your request..." />
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Inline Loading</h3>
              <AILoadingState variant="inline" message="Analyzing data..." />
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Card Skeleton</h3>
              <AICardSkeleton />
            </Card>
          </div>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Full Screen Overlay</h3>
            <Button onClick={() => setShowLoading(!showLoading)}>
              Toggle Loading Overlay
            </Button>
            {showLoading && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <AILoadingState message="Creating your perfect itinerary..." />
              </div>
            )}
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Users className="w-8 h-8 text-primary" />
                Collaboration Features Demo
              </h1>
              <p className="text-muted-foreground mt-1">
                Explore all collaborative travel planning features
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComments(true)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Comments
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {demoSections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {demoSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="space-y-6">
              {section.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Activity Feed */}
      <ActivityFeedSidebar 
        isOpen={showActivityFeed} 
        onToggle={() => setShowActivityFeed(!showActivityFeed)} 
      />

      {/* Comments Modal */}
      <CommentThread
        activityName="Demo Feature"
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </div>
  );
}
