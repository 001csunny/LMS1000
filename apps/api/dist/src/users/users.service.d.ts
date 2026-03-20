import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMe(userId: number): Promise<{
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        speechToken: string;
        createdAt: Date;
        id: number;
    }>;
    updateMe(userId: number, data: {
        username?: string;
        email?: string;
        speechToken?: string;
    }): Promise<{
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        speechToken: string;
        id: number;
    }>;
    updatePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    addXp(userId: number, amount: number): Promise<{
        xp: number;
        streak: number;
        id: number;
    }>;
    incrementStreak(userId: number): Promise<{
        xp: number;
        streak: number;
        id: number;
    }>;
    getLeaderboard(): Promise<{
        username: string;
        xp: number;
        streak: number;
        id: number;
    }[]>;
    findAll(): Promise<{
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        createdAt: Date;
        id: number;
    }[]>;
    createUser(data: {
        email: string;
        username: string;
        password: string;
        role?: Role;
    }): Promise<{
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        createdAt: Date;
        id: number;
    }>;
}
