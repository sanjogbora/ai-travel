import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';

interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: string;
}

interface Client {
  ws: WebSocket;
  id: string;
  tripId?: string;
  userId?: string;
  isAlive: boolean;
}

class WebSocketManager {
  private wss: WebSocketServer | null = null;
  private clients: Map<string, Client> = new Map();
  private tripRooms: Map<string, Set<string>> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  initialize(server: Server): void {
    this.wss = new WebSocketServer({ 
      server,
      path: '/ws'
    });

    this.wss.on('connection', (ws: WebSocket, req) => {
      const clientId = this.generateClientId();
      const client: Client = {
        ws,
        id: clientId,
        isAlive: true,
      };

      this.clients.set(clientId, client);
      console.log(`[WebSocket] Client connected: ${clientId} (Total: ${this.clients.size})`);

      // Send welcome message
      this.sendToClient(clientId, {
        type: 'connected',
        payload: { clientId },
        timestamp: new Date().toISOString(),
      });

      ws.on('message', (data: Buffer) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString());
          this.handleMessage(clientId, message);
        } catch (error) {
          console.error('[WebSocket] Failed to parse message:', error);
        }
      });

      ws.on('pong', () => {
        const client = this.clients.get(clientId);
        if (client) {
          client.isAlive = true;
        }
      });

      ws.on('close', () => {
        this.handleDisconnect(clientId);
      });

      ws.on('error', (error) => {
        console.error(`[WebSocket] Client error (${clientId}):`, error);
      });
    });

    // Start heartbeat
    this.startHeartbeat();

    console.log('[WebSocket] Server initialized');
  }

  private handleMessage(clientId: string, message: WebSocketMessage): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    switch (message.type) {
      case 'ping':
        // Respond to ping with pong
        this.sendToClient(clientId, {
          type: 'pong',
          payload: {},
          timestamp: new Date().toISOString(),
        });
        break;

      case 'join-trip':
        // Join a trip room
        const { tripId, userId } = message.payload;
        if (tripId && userId) {
          client.tripId = tripId;
          client.userId = userId;
          this.joinTripRoom(clientId, tripId);
          
          // Notify others in the room
          this.broadcastToTrip(tripId, {
            type: 'member-joined',
            payload: { userId, clientId },
            timestamp: new Date().toISOString(),
          }, clientId);
        }
        break;

      case 'leave-trip':
        // Leave a trip room
        if (client.tripId) {
          this.leaveTripRoom(clientId, client.tripId);
          
          // Notify others in the room
          this.broadcastToTrip(client.tripId, {
            type: 'member-left',
            payload: { userId: client.userId, clientId },
            timestamp: new Date().toISOString(),
          }, clientId);
          
          client.tripId = undefined;
          client.userId = undefined;
        }
        break;

      case 'presence-update':
        // Update user presence (current page, etc.)
        if (client.tripId) {
          this.broadcastToTrip(client.tripId, {
            type: 'presence-update',
            payload: {
              userId: client.userId,
              ...message.payload,
            },
            timestamp: new Date().toISOString(),
          }, clientId);
        }
        break;

      case 'vote':
      case 'comment':
      case 'itinerary-update':
      case 'poll-vote':
      case 'task-update':
        // Broadcast to trip room
        if (client.tripId) {
          this.broadcastToTrip(client.tripId, message, clientId);
        }
        break;

      default:
        console.log(`[WebSocket] Unknown message type: ${message.type}`);
    }
  }

  private handleDisconnect(clientId: string): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    // Leave trip room if in one
    if (client.tripId) {
      this.leaveTripRoom(clientId, client.tripId);
      
      // Notify others
      this.broadcastToTrip(client.tripId, {
        type: 'member-disconnected',
        payload: { userId: client.userId, clientId },
        timestamp: new Date().toISOString(),
      }, clientId);
    }

    this.clients.delete(clientId);
    console.log(`[WebSocket] Client disconnected: ${clientId} (Total: ${this.clients.size})`);
  }

  private joinTripRoom(clientId: string, tripId: string): void {
    if (!this.tripRooms.has(tripId)) {
      this.tripRooms.set(tripId, new Set());
    }
    this.tripRooms.get(tripId)!.add(clientId);
    console.log(`[WebSocket] Client ${clientId} joined trip ${tripId}`);
  }

  private leaveTripRoom(clientId: string, tripId: string): void {
    const room = this.tripRooms.get(tripId);
    if (room) {
      room.delete(clientId);
      if (room.size === 0) {
        this.tripRooms.delete(tripId);
      }
      console.log(`[WebSocket] Client ${clientId} left trip ${tripId}`);
    }
  }

  private sendToClient(clientId: string, message: WebSocketMessage): void {
    const client = this.clients.get(clientId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      try {
        client.ws.send(JSON.stringify(message));
      } catch (error) {
        console.error(`[WebSocket] Failed to send to client ${clientId}:`, error);
      }
    }
  }

  private broadcastToTrip(tripId: string, message: WebSocketMessage, excludeClientId?: string): void {
    const room = this.tripRooms.get(tripId);
    if (!room) return;

    room.forEach(clientId => {
      if (clientId !== excludeClientId) {
        this.sendToClient(clientId, message);
      }
    });
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.clients.forEach((client, clientId) => {
        if (!client.isAlive) {
          console.log(`[WebSocket] Terminating inactive client: ${clientId}`);
          client.ws.terminate();
          this.handleDisconnect(clientId);
          return;
        }

        client.isAlive = false;
        client.ws.ping();
      });
    }, 30000); // 30 seconds
  }

  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  shutdown(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    this.clients.forEach((client) => {
      client.ws.close();
    });

    this.clients.clear();
    this.tripRooms.clear();

    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }

    console.log('[WebSocket] Server shutdown');
  }
}

// Singleton instance
export const wsManager = new WebSocketManager();
