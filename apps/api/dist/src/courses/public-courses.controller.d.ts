import { CoursesService } from './courses.service';
export declare class PublicCoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findPublicCourses(): Promise<({
        lessons: {
            id: number;
            name: string;
            isPublic: boolean;
        }[];
        teachers: {
            email: string;
            username: string;
            id: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    })[]>;
    findPublicCourse(id: number): Promise<{
        lessons: ({
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
        })[];
        teachers: {
            email: string;
            username: string;
            id: number;
        }[];
        students: {
            username: string;
            id: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
}
