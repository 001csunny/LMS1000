import { PrismaService } from '../prisma/prisma.service';
export declare class WordsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        word: string;
        audioUrl?: string;
    }): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        word: string;
        audioUrl: string | null;
    }>;
    findAll(): Promise<({
        challenges: {
            name: string;
            id: number;
        }[];
        tests: {
            name: string;
            id: number;
        }[];
        exams: {
            name: string;
            id: number;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        word: string;
        audioUrl: string | null;
    })[]>;
    findOne(id: number): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        id: number;
        word: string;
        audioUrl: string | null;
    }>;
    update(id: number, data: {
        word?: string;
        audioUrl?: string;
    }): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        word: string;
        audioUrl: string | null;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        word: string;
        audioUrl: string | null;
    }>;
}
