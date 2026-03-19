import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMe(userId: number): Promise<{
        createdAt: Date;
        id: number;
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        speechToken: string;
    }>;
    updateMe(userId: number, data: {
        username?: string;
        email?: string;
        speechToken?: string;
    }): Promise<{
        id: number;
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        speechToken: string;
    }>;
    updatePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    addXp(userId: number, amount: number): Promise<{
        id: number;
        xp: number;
        streak: number;
    }>;
    incrementStreak(userId: number): Promise<{
        id: number;
        xp: number;
        streak: number;
    }>;
    getLeaderboard(): Promise<{
        id: number;
        username: string;
        xp: number;
        streak: number;
    }[]>;
    findAll(): Promise<{
        createdAt: Date;
        id: number;
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
    }[]>;
    createUser(data: {
        email: string;
        username: string;
        password: string;
        role?: 'ADMIN' | 'USER';
    }): Promise<{
        createdAt: Date;
        id: number;
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
    }>;
}
