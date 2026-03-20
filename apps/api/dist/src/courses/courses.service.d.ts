import { PrismaService } from '../prisma/prisma.service';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        description?: string;
        isPublic?: boolean;
    }): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<({
        lessons: {
            name: string;
            isPublic: boolean;
            id: number;
        }[];
        teachers: {
            id: number;
            email: string;
            username: string;
        }[];
        students: {
            id: number;
            email: string;
            username: string;
        }[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findPublicCourses(): Promise<({
        lessons: {
            name: string;
            isPublic: boolean;
            id: number;
        }[];
        teachers: {
            id: number;
            email: string;
            username: string;
        }[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findMyCourses(role: string, userId: number): Promise<({
        lessons: {
            name: string;
            id: number;
        }[];
        teachers: {
            id: number;
            username: string;
        }[];
        students: {
            id: number;
        }[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, data: {
        name?: string;
        description?: string;
        isPublic?: boolean;
    }): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    enrollStudent(courseId: number, studentId: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    removeStudent(courseId: number, studentId: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    getCatalog(): Promise<({
        lessons: ({
            _count: {
                exercises: number;
            };
        } & {
            name: string;
            description: string | null;
            isPublic: boolean;
            difficulty: import("@prisma/client").$Enums.Difficulty;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            courseId: number;
            orderIndex: number;
        })[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    getMyProgress(userId: number): Promise<({
        lesson: {
            course: {
                name: string;
                description: string | null;
                isPublic: boolean;
                difficulty: import("@prisma/client").$Enums.Difficulty;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
        } & {
            name: string;
            description: string | null;
            isPublic: boolean;
            difficulty: import("@prisma/client").$Enums.Difficulty;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            courseId: number;
            orderIndex: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        lessonId: number;
        status: import("@prisma/client").$Enums.ProgressStatus;
        xpEarned: number;
        completionPercentage: number;
        highestScore: number;
    })[]>;
}
