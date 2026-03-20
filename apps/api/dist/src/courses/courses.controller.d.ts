import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAll(): Promise<({
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
        students: {
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
    findMyCourses(user: {
        id: number;
        role: string;
    }, queryRole?: string): Promise<({
        lessons: {
            id: number;
            name: string;
        }[];
        teachers: {
            username: string;
            id: number;
        }[];
        students: {
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
    getCatalog(): Promise<({
        lessons: ({
            _count: {
                exercises: number;
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
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    })[]>;
    getMyProgress(user: {
        id: number;
    }): Promise<({
        lesson: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        lessonId: number;
        userId: number;
        status: import("@prisma/client").$Enums.ProgressStatus;
        xpEarned: number;
        completionPercentage: number;
        highestScore: number;
    })[]>;
    findOne(id: number): Promise<{
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
    findLessons(id: number): Promise<({
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
    })[]>;
    create(body: CreateCourseDto, user: {
        id: number;
    }): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    update(id: number, body: UpdateCourseDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    enroll(courseId: number, studentId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
    unenroll(courseId: number, studentId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        description: string | null;
        isPublic: boolean;
        difficulty: import("@prisma/client").$Enums.Difficulty;
    }>;
}
