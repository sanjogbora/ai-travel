import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePresence } from '@/hooks/use-presence';
import type { TripMember } from '@/components/CollaborationBar';

interface PresenceContextValue {
  members: TripMember[];
  updateMember: (memberId: string, updates: Partial<TripMember>) => void;
  isConnected: boolean;
}

const PresenceContext = createContext<PresenceContextValue | null>(null);

interface PresenceProviderProps {
  children: ReactNode;
  tripId: string;
  currentUserId: string;
  currentUserName: string;
  initialMembers: TripMember[];
  enabled?: boolean;
}

export function PresenceProvider({
  children,
  tripId,
  currentUserId,
  currentUserName,
  initialMembers,
  enabled = false, // DEMO MODE: Disabled by default
}: PresenceProviderProps) {
  const [members, setMembers] = useState<TripMember[]>(initialMembers);

  const {
    onPresenceUpdate,
    onMemberJoined,
    onMemberLeft,
    onMemberDisconnected,
    isConnected,
  } = usePresence({
    tripId,
    userId: currentUserId,
    userName: currentUserName,
    enabled: false, // DEMO MODE: Always disabled
  });

  // Update member in state
  const updateMember = (memberId: string, updates: Partial<TripMember>) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, ...updates } : member
      )
    );
  };

  // Handle presence updates from other members
  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = onPresenceUpdate((update) => {
      updateMember(update.userId, {
        isOnline: update.isOnline,
        currentPage: update.currentPage,
      });
    });

    return unsubscribe;
  }, [enabled, onPresenceUpdate]);

  // Handle member joined
  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = onMemberJoined((data) => {
      updateMember(data.userId, {
        isOnline: true,
      });
    });

    return unsubscribe;
  }, [enabled, onMemberJoined]);

  // Handle member left
  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = onMemberLeft((data) => {
      updateMember(data.userId, {
        isOnline: false,
        currentPage: undefined,
      });
    });

    return unsubscribe;
  }, [enabled, onMemberLeft]);

  // Handle member disconnected
  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = onMemberDisconnected((data) => {
      updateMember(data.userId, {
        isOnline: false,
        currentPage: undefined,
      });
    });

    return unsubscribe;
  }, [enabled, onMemberDisconnected]);

  return (
    <PresenceContext.Provider value={{ members, updateMember, isConnected }}>
      {children}
    </PresenceContext.Provider>
  );
}

export function usePresenceContext() {
  const context = useContext(PresenceContext);
  if (!context) {
    throw new Error('usePresenceContext must be used within PresenceProvider');
  }
  return context;
}
