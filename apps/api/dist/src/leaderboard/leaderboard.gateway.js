"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LeaderboardGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
let LeaderboardGateway = LeaderboardGateway_1 = class LeaderboardGateway {
    constructor(usersService) {
        this.usersService = usersService;
        this.logger = new common_1.Logger(LeaderboardGateway_1.name);
    }
    async handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
        const leaderboard = await this.usersService.getLeaderboard();
        client.emit('leaderboard', leaderboard);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    async broadcastLeaderboard() {
        const leaderboard = await this.usersService.getLeaderboard();
        this.server.emit('leaderboard', leaderboard);
    }
    async handleRequest(client) {
        const leaderboard = await this.usersService.getLeaderboard();
        client.emit('leaderboard', leaderboard);
    }
};
exports.LeaderboardGateway = LeaderboardGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], LeaderboardGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('request_leaderboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], LeaderboardGateway.prototype, "handleRequest", null);
exports.LeaderboardGateway = LeaderboardGateway = LeaderboardGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:4173'],
            credentials: true,
        },
        namespace: 'leaderboard',
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], LeaderboardGateway);
//# sourceMappingURL=leaderboard.gateway.js.map