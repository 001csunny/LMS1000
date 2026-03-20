import { Difficulty } from '@prisma/client';
export declare class CreateCourseDto {
    name: string;
    description?: string;
    difficulty?: Difficulty;
    isPublic?: boolean;
}
