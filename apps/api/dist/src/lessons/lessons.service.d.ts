import { PrismaService } from '../prisma/prisma.service';
export declare class LessonsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        description?: string;
        courseId: number;
        isPublic?: boolean;
    }): Promise<{
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
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
        orderIndex: number;
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
        courseId: number;
        orderIndex: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
        orderIndex: number;
    }>;
    findPublicLessons(): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
        orderIndex: number;
    }[]>;
    findByCourse(courseId: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
        orderIndex: number;
    }[]>;
    saveProgress(userId: number, lessonId: number, xpEarned: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        lessonId: number;
        status: import("@prisma/client").$Enums.ProgressStatus;
        xpEarned: number;
        completionPercentage: number;
        highestScore: number;
    }>;
    getProgress(userId: number, lessonId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        lessonId: number;
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
        userId: number;
        lessonId: number;
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
