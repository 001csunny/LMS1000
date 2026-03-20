import { PrismaService } from '../prisma/prisma.service';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        description?: string;
        isPublic?: boolean;
        difficulty?: string;
    }, teacherId?: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    findAll(): Promise<({
        lessons: {
            id: number;
            name: string;
            isPublic: boolean;
        }[];
        teachers: {
            email: string;
            username: string;
            id: number;
        }[];
        students: {
            email: string;
            username: string;
            id: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    })[]>;
    findPublicCourses(): Promise<({
        lessons: {
            id: number;
            name: string;
            isPublic: boolean;
        }[];
        teachers: {
            email: string;
            username: string;
            id: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    })[]>;
    findMyCourses(role: string, userId: number): Promise<({
        lessons: {
            id: number;
            name: string;
        }[];
        teachers: {
            username: string;
            id: number;
        }[];
        students: {
            id: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    })[]>;
    findOne(id: number): Promise<{
        lessons: ({
            userProgress: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                lessonId: number;
                userId: number;
                status: import("@prisma/client").$Enums.ProgressStatus;
                xpEarned: number;
                completionPercentage: number;
                highestScore: number;
            }[];
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            description: string | null;
            isPublic: boolean;
            difficulty: import("@prisma/client").$Enums.Difficulty;
            orderIndex: number;
            courseId: number;
        })[];
        teachers: {
            email: string;
            username: string;
            id: number;
        }[];
        students: {
            username: string;
            id: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    findLessonsByCourse(id: number): Promise<({
        userProgress: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            lessonId: number;
            userId: number;
            status: import("@prisma/client").$Enums.ProgressStatus;
            xpEarned: number;
            completionPercentage: number;
            highestScore: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        orderIndex: number;
        courseId: number;
    })[]>;
    update(id: number, data: {
        name?: string;
        description?: string;
        isPublic?: boolean;
        difficulty?: string;
    }): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    enrollStudent(courseId: number, studentId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    removeStudent(courseId: number, studentId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    getCatalog(): Promise<({
        lessons: ({
            _count: {
                exercises: number;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            description: string | null;
            isPublic: boolean;
            difficulty: import("@prisma/client").$Enums.Difficulty;
            orderIndex: number;
            courseId: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    })[]>;
    getMyProgress(userId: number): Promise<({
        lesson: {
            course: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string;
                description: string | null;
                isPublic: boolean;
                difficulty: import("@prisma/client").$Enums.Difficulty;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            description: string | null;
            isPublic: boolean;
            difficulty: import("@prisma/client").$Enums.Difficulty;
            orderIndex: number;
            courseId: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
        userId: number;
        status: import("@prisma/client").$Enums.ProgressStatus;
        xpEarned: number;
        completionPercentage: number;
        highestScore: number;
    })[]>;
}
