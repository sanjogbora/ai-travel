import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  BarChart3, 
  Package, 
  DollarSign,
  Sparkles,
  CheckCircle,
  Clock,
  Trophy,
  Zap,
  Eye
} from 'lucide-react';

export function CollaborationShowcase() {
  const features = [
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'See who\'s online and what they\'re viewing',
      status: 'active',
      count: '4 members online',
      color: 'text-blue-600 bg-blue-500/10'
    },
    {
      icon: Heart,
      title: 'Group Voting',
      description: 'Vote on activities and see consensus',
      status: 'active',
      count: '23 votes cast',
      color: 'text-red-600 bg-red-500/10'
    },
    {
      icon: MessageCircle,
      title: 'Comments & Discussions',
      description: 'Comment on any activity or hotel',
      status: 'active',
      count: '12 conversations',
      color: 'text-green-600 bg-green-500/10'
    },
    {
      icon: BarChart3,
      title: 'Group Polls',
      description: 'Create polls for group decisions',
      status: 'active',
      count: '3 active polls',
      color: 'text-purple-600 bg-purple-500/10'
    },
    {
      icon: Package,
      title: 'Shared Packing Lists',
      description: 'Coordinate what to bring together',
      status: 'active',
      count: '45 items tracked',
      color: 'text-orange-600 bg-orange-500/10'
    },
    {
      icon: DollarSign,
      title: 'Budget Splitting',
      description: 'Track expenses and split costs fairly',
      status: 'active',
      count: '$3,688 managed',
      color: 'text-emerald-600 bg-emerald-500/10'
    },
    {
      icon: Sparkles,
      title: 'AI Insights',
      description: 'Get smart recommendations for your group',
      status: 'active',
      count: '8 suggestions',
      color: 'text-indigo-600 bg-indigo-500/10'
    },
    {
      icon: Eye,
      title: 'Activity Feed',
      description: 'Stay updated on all group actions',
      status: 'active',
      count: '24 recent updates',
      color: 'text-pink-600 bg-pink-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-medium">Collaborative Travel Planning</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Plan Together, Travel Better</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          All the tools your group needs to plan the perfect trip, working together in real-time
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={feature.title}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {feature.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {feature.status}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {feature.count}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stats bar */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <p className="text-sm text-muted-foreground">Real-time Sync</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">4.9★</div>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">10k+</div>
            <p className="text-sm text-muted-foreground">Trips Planned</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">50%</div>
            <p className="text-sm text-muted-foreground">Time Saved</p>
          </div>
        </div>
      </Card>

      {/* Call to action */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <Sparkles className="w-5 h-5 text-primary" />
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Ready to Plan Your Next Adventure?</h3>
          <p className="text-muted-foreground mb-6">
            Experience the power of collaborative travel planning with AI-powered insights
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Unlimited trips</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Animated feature highlight component
export function FeatureHighlight({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
