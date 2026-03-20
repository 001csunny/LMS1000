import { PrismaService } from '../prisma/prisma.service';
export declare class WordsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        thaiWord: string;
        englishWord: string;
        lessonId?: number;
    }): Promise<{
        id: number;
        thaiWord: string;
        englishWord: string;
        lessonId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<void>;
    update(id: number, data: {
        thaiWord?: string;
        englishWord?: string;
        lessonId?: number;
    }): Promise<{
        id: number;
        thaiWord: string;
        englishWord: string;
        lessonId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
