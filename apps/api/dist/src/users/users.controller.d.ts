import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: {
        id: number;
    }): Promise<{
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        speechToken: string;
        createdAt: Date;
        id: number;
    }>;
    updateMe(user: {
        id: number;
    }, body: {
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
        xp: number;
        streak: number;
        id: number;
    }>;
    incrementStreak(user: {
        id: number;
    }): Promise<{
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
    createUser(body: CreateUserDto): Promise<{
        email: string;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        xp: number;
        streak: number;
        createdAt: Date;
        id: number;
    }>;
}
