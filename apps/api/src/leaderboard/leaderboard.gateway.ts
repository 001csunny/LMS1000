import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/users.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true,
  },
  namespace: 'leaderboard',
})
export class LeaderboardGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(LeaderboardGateway.name);

  constructor(private readonly usersService: UsersService) {}

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    // Send current leaderboard to the newly connected client
    const leaderboard = await this.usersService.getLeaderboard();
    client.emit('leaderboard', leaderboard);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Broadcast updated leaderboard to all connected clients.
   * Called externally (e.g., after XP update) to push real-time data.
   */
  async broadcastLeaderboard() {
    const leaderboard = await this.usersService.getLeaderboard();
    this.server.emit('leaderboard', leaderboard);
  }

  @SubscribeMessage('request_leaderboard')
  async handleRequest(client: Socket) {
    const leaderboard = await this.usersService.getLeaderboard();
    client.emit('leaderboard', leaderboard);
  }
}
