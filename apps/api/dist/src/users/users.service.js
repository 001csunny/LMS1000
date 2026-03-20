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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                xp: true,
                streak: true,
                speechToken: true,
                createdAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateMe(userId, data) {
        return this.prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                xp: true,
                streak: true,
                speechToken: true,
            },
        });
    }
    async updatePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid)
            throw new common_1.BadRequestException('Incorrect current password');
        const hash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hash },
        });
        return { message: 'Password updated successfully' };
    }
    async addXp(userId, amount) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { xp: { increment: amount } },
            select: { id: true, xp: true, streak: true },
        });
    }
    async incrementStreak(userId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { streak: { increment: 1 } },
            select: { id: true, xp: true, streak: true },
        });
    }
    async getLeaderboard() {
        return this.prisma.user.findMany({
            orderBy: { xp: 'desc' },
            take: 20,
            select: {
                id: true,
                username: true,
                xp: true,
                streak: true,
            },
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                xp: true,
                streak: true,
                createdAt: true,
            },
        });
    }
    async createUser(data) {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hash = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: hash,
                role: data.role || client_1.Role.STUDENT,
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                xp: true,
                streak: true,
                createdAt: true,
            },
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map