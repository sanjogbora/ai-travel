import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { VoteType } from '@shared/schema';

interface VoteReactionProps {
  memberName: string;
  memberAvatar?: string;
  voteType: VoteType;
  onComplete: () => void;
}

export function VoteReaction({
  memberName,
  memberAvatar,
  voteType,
  onComplete,
}: VoteReactionProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for exit animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const getVoteIcon = () => {
    switch (voteType) {
      case 'love':
        return <Heart className="w-5 h-5 text-red-500 fill-red-500" />;
      case 'maybe':
        return <ArrowRight className="w-5 h-5 text-blue-500" />;
      case 'skip':
        return <X className="w-5 h-5 text-gray-500" />;
    }
  };

  const getVoteText = () => {
    switch (voteType) {
      case 'love':
        return 'loved this';
      case 'maybe':
        return 'is considering';
      case 'skip':
        return 'skipped this';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/95 backdrop-blur-md border border-border shadow-lg"
          data-testid="vote-reaction"
        >
          <Avatar className="w-6 h-6 border border-border">
            <AvatarImage src={memberAvatar} alt={memberName} />
            <AvatarFallback className="text-xs">{getInitials(memberName)}</AvatarFallback>
          </Avatar>
          
          <span className="text-sm font-medium">{memberName}</span>
          
          <div className="flex items-center gap-1">
            {getVoteIcon()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface VoteReactionsContainerProps {
  reactions: Array<{
    id: string;
    memberName: string;
    memberAvatar?: string;
    voteType: VoteType;
  }>;
  onReactionComplete: (id: string) => void;
}

export function VoteReactionsContainer({
  reactions,
  onReactionComplete,
}: VoteReactionsContainerProps) {
  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {reactions.map((reaction) => (
        <VoteReaction
          key={reaction.id}
          memberName={reaction.memberName}
          memberAvatar={reaction.memberAvatar}
          voteType={reaction.voteType}
          onComplete={() => onReactionComplete(reaction.id)}
        />
      ))}
    </div>
  );
}
