import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: {
        id: number;
    }): Promise<{
        createdAt: Date;
        id: number;
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        speechToken: string;
    }>;
    updateMe(user: {
        id: number;
    }, body: {
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
    updatePassword(user: {
        id: number;
    }, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    addXp(user: {
        id: number;
    }, amount: number): Promise<{
        id: number;
        xp: number;
        streak: number;
    }>;
    incrementStreak(user: {
        id: number;
    }): Promise<{
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
    createUser(body: {
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
