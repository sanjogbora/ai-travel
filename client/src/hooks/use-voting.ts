import { useState, useCallback, useEffect } from 'react';
import { useWebSocket } from './use-websocket';
import type { VoteType, VoteSummary } from '@shared/schema';

interface VoteData {
  tripId: string;
  activityId: string;
  memberId: string;
  voteType: VoteType;
}

interface UseVotingOptions {
  tripId: string;
  memberId: string;
  enabled?: boolean;
}

interface VoteUpdate {
  activityId: string;
  memberId: string;
  voteType: VoteType;
  memberName?: string;
}

export function useVoting(options: UseVotingOptions) {
  const { tripId, memberId, enabled = true } = options;
  const { isConnected, send, on } = useWebSocket({ autoConnect: enabled });
  const [voteSummaries, setVoteSummaries] = useState<Map<string, VoteSummary>>(new Map());
  const [userVotes, setUserVotes] = useState<Map<string, VoteType>>(new Map());

  // Record a vote
  const vote = useCallback(async (activityId: string, voteType: VoteType): Promise<void> => {
    if (!enabled) return;

    // Optimistic update
    setUserVotes(prev => new Map(prev).set(activityId, voteType));
    
    // Update vote summary optimistically
    setVoteSummaries(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(activityId) || { love: 0, maybe: 0, skip: 0 };
      const oldVote = userVotes.get(activityId);
      
      // Remove old vote count
      if (oldVote) {
        current[oldVote] = Math.max(0, current[oldVote] - 1);
      }
      
      // Add new vote count
      current[voteType] = current[voteType] + 1;
      current.userVote = voteType;
      
      // Calculate consensus
      const total = current.love + current.maybe + current.skip;
      if (total > 0) {
        const maxVotes = Math.max(current.love, current.maybe, current.skip);
        if (maxVotes > total / 2) {
          if (current.love === maxVotes) current.consensusType = 'love';
          else if (current.maybe === maxVotes) current.consensusType = 'maybe';
          else if (current.skip === maxVotes) current.consensusType = 'skip';
        } else {
          current.consensusType = undefined;
        }
      }
      
      newMap.set(activityId, current);
      return newMap;
    });

    // Demo mode - skip API calls, just use local state
    // The optimistic update above is all we need for the demo
    console.log('[Demo] Vote recorded locally:', { activityId, voteType });
  }, [enabled, tripId, memberId, isConnected, send, userVotes]);

  // Fetch vote summary for an activity (demo mode - return mock data)
  const fetchVoteSummary = useCallback(async (activityId: string): Promise<VoteSummary | null> => {
    // Demo mode - return existing summary or create a new one with mock data
    const existing = voteSummaries.get(activityId);
    if (existing) {
      return existing;
    }
    
    // Create mock summary
    const mockSummary: VoteSummary = {
      love: Math.floor(Math.random() * 3) + 1,
      maybe: Math.floor(Math.random() * 2),
      skip: Math.floor(Math.random() * 2),
    };
    
    setVoteSummaries(prev => new Map(prev).set(activityId, mockSummary));
    return mockSummary;
  }, [voteSummaries]);

  // Get vote summary for an activity
  const getVoteSummary = useCallback((activityId: string): VoteSummary | undefined => {
    return voteSummaries.get(activityId);
  }, [voteSummaries]);

  // Get user's vote for an activity
  const getUserVote = useCallback((activityId: string): VoteType | undefined => {
    return userVotes.get(activityId);
  }, [userVotes]);

  // Subscribe to vote updates from other members
  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = on('vote', (message) => {
      const update: VoteUpdate = message.payload;
      
      // Don't update for own votes (already handled optimistically)
      if (update.memberId === memberId) return;
      
      // Refetch vote summary to get accurate counts
      fetchVoteSummary(update.activityId);
    });

    return unsubscribe;
  }, [enabled, on, memberId, fetchVoteSummary]);

  return {
    vote,
    fetchVoteSummary,
    getVoteSummary,
    getUserVote,
    isConnected,
  };
}
