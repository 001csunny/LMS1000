import { CoursesService } from './courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAll(): Promise<({
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
        students: {
            id: number;
            email: string;
            username: string;
        }[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findMyCourses(user: {
        id: number;
        role: string;
    }, queryRole?: string): Promise<({
        lessons: {
            name: string;
            id: number;
        }[];
        teachers: {
            id: number;
            username: string;
        }[];
        students: {
            id: number;
        }[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        lessons: ({
            challenges: {
                name: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                lessonId: number;
            }[];
            tests: {
                name: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                lessonId: number;
            }[];
            exams: {
                name: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                lessonId: number;
            }[];
        } & {
            name: string;
            description: string | null;
            isPublic: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            courseId: number;
        })[];
        teachers: {
            id: number;
            email: string;
            username: string;
        }[];
        students: {
            id: number;
            username: string;
        }[];
    } & {
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    create(body: {
        name: string;
        description?: string;
        isPublic?: boolean;
    }): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, body: {
        name?: string;
        description?: string;
        isPublic?: boolean;
    }): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    enroll(courseId: number, studentId: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    unenroll(courseId: number, studentId: number): Promise<{
        name: string;
        description: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
