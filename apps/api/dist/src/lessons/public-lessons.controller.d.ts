import { LessonsService } from './lessons.service';
export declare class PublicLessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
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
    findPublicLesson(id: number): Promise<{
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
}
