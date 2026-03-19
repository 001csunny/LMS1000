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
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
    }>;
    findOne(id: number): Promise<{
        course: {
            name: string;
            description: string | null;
            isPublic: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        challenges: ({
            words: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                word: string;
                audioUrl: string | null;
            }[];
        } & {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            lessonId: number;
        })[];
        tests: ({
            words: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                word: string;
                audioUrl: string | null;
            }[];
        } & {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            lessonId: number;
        })[];
        exams: ({
            words: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                word: string;
                audioUrl: string | null;
            }[];
        } & {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            lessonId: number;
        })[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
    }>;
    update(id: number, data: {
        name?: string;
        description?: string;
        isPublic?: boolean;
    }): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
    }>;
    findPublicLessons(): Promise<({
        course: {
            name: string;
            id: number;
        };
        challenges: ({
            words: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                word: string;
                audioUrl: string | null;
            }[];
        } & {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            lessonId: number;
        })[];
        tests: ({
            words: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                word: string;
                audioUrl: string | null;
            }[];
        } & {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            lessonId: number;
        })[];
        exams: ({
            words: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                word: string;
                audioUrl: string | null;
            }[];
        } & {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            lessonId: number;
        })[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        courseId: number;
    })[]>;
    createChallenge(data: {
        name: string;
        lessonId: number;
        wordIds?: number[];
    }): Promise<{
        words: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            word: string;
            audioUrl: string | null;
        }[];
    } & {
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
    }>;
    deleteChallenge(id: number): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
    }>;
    createTest(data: {
        name: string;
        lessonId: number;
        wordIds?: number[];
    }): Promise<{
        words: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            word: string;
            audioUrl: string | null;
        }[];
    } & {
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
    }>;
    deleteTest(id: number): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
    }>;
    createExam(data: {
        name: string;
        lessonId: number;
        wordIds?: number[];
    }): Promise<{
        words: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            word: string;
            audioUrl: string | null;
        }[];
    } & {
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
    }>;
    deleteExam(id: number): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
    }>;
    saveProgress(userId: number, lessonId: number, xpEarned: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
        userId: number;
        completed: boolean;
        xpEarned: number;
    }>;
}
