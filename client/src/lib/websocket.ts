type WebSocketMessage = {
  type: string;
  payload: any;
  timestamp: string;
};

type MessageHandler = (message: WebSocketMessage) => void;
type ConnectionHandler = () => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private messageHandlers: Map<string, Set<MessageHandler>> = new Map();
  private connectionHandlers: Set<ConnectionHandler> = new Set();
  private disconnectionHandlers: Set<ConnectionHandler> = new Set();
  private messageQueue: WebSocketMessage[] = [];
  private isConnecting = false;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private heartbeatTimeout: NodeJS.Timeout | null = null;
  private batchTimeout: NodeJS.Timeout | null = null;
  private batchedMessages: WebSocketMessage[] = [];
  private readonly BATCH_WINDOW = 100; // 100ms batching window
  private readonly HEARTBEAT_INTERVAL = 30000; // 30 seconds

  constructor(url: string) {
    this.url = url;
  }

  connect(): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return Promise.resolve();
    }

    this.isConnecting = true;

    return new Promise((resolve, reject) => {
      try {
        // Use wss:// for production, ws:// for development
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}${this.url}`;
        
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log('[WebSocket] Connected');
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
          
          // Send queued messages
          this.flushMessageQueue();
          
          // Start heartbeat
          this.startHeartbeat();
          
          // Notify connection handlers
          this.connectionHandlers.forEach(handler => handler());
          
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('[WebSocket] Failed to parse message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[WebSocket] Error:', error);
          this.isConnecting = false;
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[WebSocket] Disconnected');
          this.isConnecting = false;
          this.stopHeartbeat();
          
          // Notify disconnection handlers
          this.disconnectionHandlers.forEach(handler => handler());
          
          // Attempt to reconnect
          this.attemptReconnect();
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  private attemptReconnect(): void {
    // DEMO MODE: Disable reconnection attempts
    console.log('[WebSocket] Demo mode - reconnection disabled');
    return;
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ type: 'ping', payload: {}, timestamp: new Date().toISOString() });
        
        // Set timeout to detect if server doesn't respond
        this.heartbeatTimeout = setTimeout(() => {
          console.warn('[WebSocket] Heartbeat timeout, closing connection');
          this.ws?.close();
        }, 5000);
      }
    }, this.HEARTBEAT_INTERVAL);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout);
      this.heartbeatTimeout = null;
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    // Handle pong response
    if (message.type === 'pong' && this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout);
      this.heartbeatTimeout = null;
      return;
    }

    // Get handlers for this message type
    const handlers = this.messageHandlers.get(message.type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error(`[WebSocket] Error in message handler for type ${message.type}:`, error);
        }
      });
    }

    // Also notify wildcard handlers
    const wildcardHandlers = this.messageHandlers.get('*');
    if (wildcardHandlers) {
      wildcardHandlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error('[WebSocket] Error in wildcard handler:', error);
        }
      });
    }
  }

  send(message: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      // Add to batch
      this.batchedMessages.push(message);
      
      // Clear existing timeout
      if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
      }
      
      // Set new timeout to flush batch
      this.batchTimeout = setTimeout(() => {
        this.flushBatch();
      }, this.BATCH_WINDOW);
    } else {
      // Queue message for later
      this.messageQueue.push(message);
      
      // Try to connect if not connected
      if (!this.isConnecting && this.ws?.readyState !== WebSocket.CONNECTING) {
        this.connect().catch(error => {
          console.error('[WebSocket] Failed to connect for sending message:', error);
        });
      }
    }
  }

  private flushBatch(): void {
    if (this.batchedMessages.length === 0) return;
    
    if (this.ws?.readyState === WebSocket.OPEN) {
      // Send all batched messages
      this.batchedMessages.forEach(message => {
        try {
          this.ws!.send(JSON.stringify(message));
        } catch (error) {
          console.error('[WebSocket] Failed to send message:', error);
          this.messageQueue.push(message);
        }
      });
      
      this.batchedMessages = [];
    }
    
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }
  }

  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.send(message);
      }
    }
  }

  on(type: string, handler: MessageHandler): () => void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)!.add(handler);
    
    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(type);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.messageHandlers.delete(type);
        }
      }
    };
  }

  onConnect(handler: ConnectionHandler): () => void {
    this.connectionHandlers.add(handler);
    
    // If already connected, call handler immediately
    if (this.ws?.readyState === WebSocket.OPEN) {
      handler();
    }
    
    return () => {
      this.connectionHandlers.delete(handler);
    };
  }

  onDisconnect(handler: ConnectionHandler): () => void {
    this.disconnectionHandlers.add(handler);
    
    return () => {
      this.disconnectionHandlers.delete(handler);
    };
  }

  disconnect(): void {
    this.stopHeartbeat();
    
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.messageHandlers.clear();
    this.connectionHandlers.clear();
    this.disconnectionHandlers.clear();
    this.messageQueue = [];
    this.batchedMessages = [];
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  getQueuedMessageCount(): number {
    return this.messageQueue.length;
  }
}

// Singleton instance
let wsClient: WebSocketClient | null = null;

export function getWebSocketClient(url: string = '/ws'): WebSocketClient {
  if (!wsClient) {
    wsClient = new WebSocketClient(url);
  }
  return wsClient;
}

export function disconnectWebSocket(): void {
  if (wsClient) {
    wsClient.disconnect();
    wsClient = null;
  }
}

export type { WebSocketMessage, MessageHandler, ConnectionHandler };
