import { useEffect, useRef, useCallback } from 'react';
import { useWebSocket } from './use-websocket';
import { useLocation } from 'wouter';

interface PresenceOptions {
  tripId: string;
  userId: string;
  userName: string;
  enabled?: boolean;
}

interface PresenceUpdate {
  userId: string;
  currentPage?: string;
  isOnline: boolean;
  lastSeen?: string;
}

export function usePresence(options: PresenceOptions) {
  const { tripId, userId, userName, enabled = true } = options;
  const [location] = useLocation();
  const { isConnected, send, on } = useWebSocket({ autoConnect: enabled });
  const lastUpdateRef = useRef<number>(0);
  const updateThrottleMs = 30000; // 30 seconds

  // Get current page name from location
  const getCurrentPage = useCallback((path: string): string => {
    if (path.includes('board') || path.includes('reference')) return 'Reference Board';
    if (path.includes('travel-tinder')) return 'Travel Tinder';
    if (path.includes('itinerary')) return 'Itinerary';
    if (path.includes('flights')) return 'Flights';
    if (path.includes('trip-report')) return 'Trip Report';
    if (path.includes('chat')) return 'Chat';
    if (path.includes('comparison')) return 'Comparison';
    return 'Planning';
  }, []);

  // Send presence update
  const updatePresence = useCallback((currentPage?: string) => {
    if (!enabled || !isConnected) return;

    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    // Throttle updates to every 30 seconds unless page changed
    if (timeSinceLastUpdate < updateThrottleMs && currentPage === undefined) {
      return;
    }

    lastUpdateRef.current = now;

    send('presence-update', {
      userId,
      userName,
      currentPage: currentPage || getCurrentPage(location),
      isOnline: true,
      lastSeen: new Date().toISOString(),
    });
  }, [enabled, isConnected, send, userId, userName, location, getCurrentPage, updateThrottleMs]);

  // Join trip room on connect
  useEffect(() => {
    if (!enabled || !isConnected) return;

    // Join the trip room
    send('join-trip', {
      tripId,
      userId,
      userName,
    });

    // Send initial presence
    updatePresence();

    // Set up periodic presence updates
    const interval = setInterval(() => {
      updatePresence();
    }, updateThrottleMs);

    return () => {
      clearInterval(interval);
      
      // Leave trip room on disconnect
      send('leave-trip', {
        tripId,
        userId,
      });
    };
  }, [enabled, isConnected, tripId, userId, userName, send, updatePresence, updateThrottleMs]);

  // Update presence when page changes
  useEffect(() => {
    if (!enabled || !isConnected) return;

    const currentPage = getCurrentPage(location);
    updatePresence(currentPage);
  }, [location, enabled, isConnected, updatePresence, getCurrentPage]);

  // Subscribe to presence updates from others
  const onPresenceUpdate = useCallback((handler: (update: PresenceUpdate) => void) => {
    const unsubscribe = on('presence-update', (message) => {
      handler(message.payload as PresenceUpdate);
    });

    return unsubscribe;
  }, [on]);

  // Subscribe to member joined events
  const onMemberJoined = useCallback((handler: (data: { userId: string; clientId: string }) => void) => {
    const unsubscribe = on('member-joined', (message) => {
      handler(message.payload);
    });

    return unsubscribe;
  }, [on]);

  // Subscribe to member left events
  const onMemberLeft = useCallback((handler: (data: { userId: string; clientId: string }) => void) => {
    const unsubscribe = on('member-left', (message) => {
      handler(message.payload);
    });

    return unsubscribe;
  }, [on]);

  // Subscribe to member disconnected events
  const onMemberDisconnected = useCallback((handler: (data: { userId: string; clientId: string }) => void) => {
    const unsubscribe = on('member-disconnected', (message) => {
      handler(message.payload);
    });

    return unsubscribe;
  }, [on]);

  return {
    updatePresence,
    onPresenceUpdate,
    onMemberJoined,
    onMemberLeft,
    onMemberDisconnected,
    isConnected,
  };
}
