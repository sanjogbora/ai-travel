import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle2, Circle } from 'lucide-react';

interface PollOption {
  id: string;
  text: string;
  votes: string[]; // member names
}

interface PollProps {
  question: string;
  options: PollOption[];
  currentUserName?: string;
  onVote?: (optionId: string) => void;
}

// Mock poll data
const mockPoll = {
  question: "When should we visit the Louvre?",
  options: [
    { id: '1', text: 'Day 2 Morning', votes: ['Sarah', 'Mike', 'Emma'] },
    { id: '2', text: 'Day 2 Afternoon', votes: ['Alex'] },
    { id: '3', text: 'Day 3 Morning', votes: ['Jordan'] },
  ],
};

export function Poll({
  question = mockPoll.question,
  options = mockPoll.options,
  currentUserName = 'You',
  onVote,
}: PollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes.length, 0);
  const allMembers = ['Sarah', 'Mike', 'Emma', 'Alex', 'Jordan'];
  const votedMembers = new Set(options.flatMap(opt => opt.votes));
  const notVoted = allMembers.filter(m => !votedMembers.has(m));

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    onVote?.(optionId);
  };

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const winningOption = options.reduce((max, opt) => 
    opt.votes.length > max.votes.length ? opt : max
  , options[0]);

  const hasWinner = winningOption.votes.length > totalVotes / 2;

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{question}</h3>
        <p className="text-sm text-muted-foreground">
          {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} • {notVoted.length} not voted yet
        </p>
      </div>

      <div className="space-y-3 mb-4">
        {options.map((option) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes.length / totalVotes) * 100) : 0;
          const isSelected = selectedOption === option.id;
          const isWinning = hasWinner && option.id === winningOption.id;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : hasVoted
                  ? 'border-border cursor-not-allowed'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="font-medium">{option.text}</span>
                  {isWinning && (
                    <Badge className="ml-2 bg-green-500/20 text-green-700 border-green-500/30">
                      Winning
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-semibold">
                  {percentage}% ({option.votes.length})
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isWinning ? 'bg-green-500' : 'bg-primary'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Voters */}
              {option.votes.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex -space-x-2">
                    {option.votes.slice(0, 3).map((voter, idx) => (
                      <Avatar key={idx} className="w-6 h-6 border-2 border-background">
                        <AvatarFallback className="text-xs">{getInitials(voter)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {option.votes.slice(0, 2).join(', ')}
                    {option.votes.length > 2 && ` +${option.votes.length - 2} more`}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Not voted yet */}
      {notVoted.length > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">
            Waiting for: {notVoted.join(', ')}
          </p>
        </div>
      )}
    </Card>
  );
}
