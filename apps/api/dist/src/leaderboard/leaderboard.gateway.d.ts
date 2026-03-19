import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/users.service';
export declare class LeaderboardGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly usersService;
    server: Server;
    private readonly logger;
    constructor(usersService: UsersService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    broadcastLeaderboard(): Promise<void>;
    handleRequest(client: Socket): Promise<void>;
}
