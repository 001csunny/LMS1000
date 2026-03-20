import { Difficulty } from '@prisma/client';
export declare class UpdateCourseDto {
    name?: string;
    description?: string;
    difficulty?: Difficulty;
    isPublic?: boolean;
}
