import { PrismaService } from '../prisma/prisma.service';
export declare class LessonsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        description?: string;
        courseId: number;
        isPublic?: boolean;
        difficulty?: string;
        orderIndex?: number;
    }): Promise<{
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
    }>;
    findOne(id: number): Promise<{
        challenges: {
            id: number;
            name: string;
            lessonId: number;
            wordIds: number[];
        }[];
        tests: {
            id: number;
            name: string;
            lessonId: number;
            wordIds: number[];
        }[];
        exams: {
            id: number;
            name: string;
            lessonId: number;
            wordIds: number[];
        }[];
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
        course: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            description: string | null;
            isPublic: boolean;
            difficulty: import("@prisma/client").$Enums.Difficulty;
        };
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        orderIndex: number;
        courseId: number;
    }>;
    update(id: number, data: {
        name?: string;
        description?: string;
        isPublic?: boolean;
        difficulty?: string;
        orderIndex?: number;
    }): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        orderIndex: number;
        courseId: number;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        orderIndex: number;
        courseId: number;
    }>;
    findPublicLessons(): Promise<({
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
        course: {
            id: number;
            name: string;
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
    })[]>;
    findByCourse(courseId: number): Promise<({
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
    saveProgress(userId: number, lessonId: number, xpEarned: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
        userId: number;
        status: import("@prisma/client").$Enums.ProgressStatus;
        xpEarned: number;
        completionPercentage: number;
        highestScore: number;
    }>;
    getProgress(userId: number, lessonId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
        userId: number;
        status: import("@prisma/client").$Enums.ProgressStatus;
        xpEarned: number;
        completionPercentage: number;
        highestScore: number;
    }>;
    finishLesson(userId: number, lessonId: number, data: {
        totalScore: number;
        completedCount: number;
        totalExercises: number;
    }): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
        userId: number;
        status: import("@prisma/client").$Enums.ProgressStatus;
        xpEarned: number;
        completionPercentage: number;
        highestScore: number;
    }>;
    createChallenge(data: {
        name: string;
        lessonId: number;
        wordIds?: number[];
    }): Promise<{
        id: number;
        name: string;
        lessonId: number;
        wordIds: number[];
    }>;
    findOneChallenge(id: number): Promise<{
        id: number;
        name: string;
        lessonId: number;
        wordIds: number[];
    }>;
    deleteChallenge(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
    createTest(data: {
        name: string;
        lessonId: number;
        wordIds?: number[];
    }): Promise<{
        id: number;
        name: string;
        lessonId: number;
        wordIds: number[];
    }>;
    findOneTest(id: number): Promise<{
        id: number;
        name: string;
        lessonId: number;
        wordIds: number[];
    }>;
    deleteTest(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
    createExam(data: {
        name: string;
        lessonId: number;
        wordIds?: number[];
    }): Promise<{
        id: number;
        name: string;
        lessonId: number;
        wordIds: number[];
    }>;
    findOneExam(id: number): Promise<{
        id: number;
        name: string;
        lessonId: number;
        wordIds: number[];
    }>;
    deleteExam(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
