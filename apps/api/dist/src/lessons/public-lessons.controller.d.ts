import { LessonsService } from './lessons.service';
export declare class PublicLessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
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
}
