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
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findPublicCourse(id: number): Promise<{
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
}
