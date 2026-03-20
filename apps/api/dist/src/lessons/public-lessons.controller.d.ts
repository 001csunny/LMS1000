import { LessonsService } from './lessons.service';
export declare class PublicLessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
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
    findPublicLesson(id: number): Promise<{
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
}
