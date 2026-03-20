import { Difficulty } from '@prisma/client';
export declare class CreateLessonDto {
    name: string;
    description?: string;
    courseId: number;
    isPublic?: boolean;
    difficulty?: Difficulty;
    orderIndex?: number;
}
export declare class UpdateLessonDto {
    name?: string;
    description?: string;
    isPublic?: boolean;
    difficulty?: Difficulty;
    orderIndex?: number;
}
