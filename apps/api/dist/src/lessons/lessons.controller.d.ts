import { LessonsService } from './lessons.service';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
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
    create(body: {
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
    update(id: number, body: {
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
    createChallenge(body: {
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
    createTest(body: {
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
    createExam(body: {
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
    saveProgress(lessonId: number, user: {
        id: number;
    }, xpEarned: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
        userId: number;
        completed: boolean;
        xpEarned: number;
    }>;
}
