import { CoursesService } from './courses.service';
export declare class PublicCoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findPublicCourses(): Promise<({
        lessons: {
            name: string;
            isPublic: boolean;
            id: number;
        }[];
        teachers: {
            id: number;
            email: string;
            username: string;
        }[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findPublicCourse(id: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
