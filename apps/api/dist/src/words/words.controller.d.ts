import { WordsService } from './words.service';
export declare class WordsController {
    private readonly wordsService;
    constructor(wordsService: WordsService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<void>;
    create(body: {
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
    update(id: number, body: {
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
