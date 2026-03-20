import { LessonsService } from './lessons.service';
import { CreateLessonDto, UpdateLessonDto } from './dto/lessons.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
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
    create(body: CreateLessonDto): Promise<{
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
    update(id: number, body: UpdateLessonDto): Promise<{
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
    createChallenge(body: {
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
    createTest(body: {
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
    createExam(body: {
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
    saveProgress(lessonId: number, user: {
        id: number;
    }, xpEarned: number): Promise<{
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
    finishLesson(lessonId: number, user: {
        id: number;
    }, body: {
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
    }> | {
        success: boolean;
        message: string;
    };
}
