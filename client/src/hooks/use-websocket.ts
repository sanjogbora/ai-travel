import { useEffect, useRef, useState, useCallback } from 'react';
import { getWebSocketClient, type WebSocketMessage, type MessageHandler } from '@/lib/websocket';

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  send: (type: string, payload: any) => void;
  on: (type: string, handler: MessageHandler) => () => void;
  connect: () => Promise<void>;
  disconnect: () => void;
  queuedMessages: number;
}

export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const {
    url = '/ws',
    autoConnect = false, // Disabled for demo - using mock data
    onConnect,
    onDisconnect,
    onError,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [queuedMessages, setQueuedMessages] = useState(0);
  const wsClient = useRef(getWebSocketClient(url));
  const unsubscribers = useRef<(() => void)[]>([]);

  const connect = useCallback(async () => {
    try {
      await wsClient.current.connect();
      setIsConnected(true);
    } catch (error) {
      console.error('[useWebSocket] Connection error:', error);
      if (onError) {
        onError(error as Error);
      }
    }
  }, [onError]);

  const disconnect = useCallback(() => {
    wsClient.current.disconnect();
    setIsConnected(false);
  }, []);

  const send = useCallback((type: string, payload: any) => {
    const message: WebSocketMessage = {
      type,
      payload,
      timestamp: new Date().toISOString(),
    };
    wsClient.current.send(message);
    
    // Update queued message count
    setQueuedMessages(wsClient.current.getQueuedMessageCount());
  }, []);

  const on = useCallback((type: string, handler: MessageHandler) => {
    return wsClient.current.on(type, handler);
  }, []);

  useEffect(() => {
    // Set up connection handlers
    const unsubConnect = wsClient.current.onConnect(() => {
      setIsConnected(true);
      setQueuedMessages(0);
      if (onConnect) {
        onConnect();
      }
    });

    const unsubDisconnect = wsClient.current.onDisconnect(() => {
      setIsConnected(false);
      if (onDisconnect) {
        onDisconnect();
      }
    });

    unsubscribers.current.push(unsubConnect, unsubDisconnect);

    // Auto-connect if enabled
    if (autoConnect && !wsClient.current.isConnected()) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      unsubscribers.current.forEach(unsub => unsub());
      unsubscribers.current = [];
    };
  }, [autoConnect, connect, onConnect, onDisconnect]);

  return {
    isConnected,
    send,
    on,
    connect,
    disconnect,
    queuedMessages,
  };
}
