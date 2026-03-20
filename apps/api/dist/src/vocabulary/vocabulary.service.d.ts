import { PrismaService } from '../prisma/prisma.service';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto/vocabulary.dto';
export declare class VocabularyService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateVocabularyDto): Promise<{
        lesson: {
            id: number;
            name: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        thaiWord: string;
        englishWord: string;
        audioUrl: string | null;
        imageUrl: string | null;
        lessonId: number;
    }>;
    findByLesson(lessonId: number): Promise<({
        exercises: {
            id: number;
            type: import("@prisma/client").$Enums.ExerciseType;
            question: string;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        thaiWord: string;
        englishWord: string;
        audioUrl: string | null;
        imageUrl: string | null;
        lessonId: number;
    })[]>;
    findOne(id: number): Promise<{
        exercises: ({
            speechResults: {
                score: number;
                accuracy: number;
                passed: boolean;
            }[];
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            orderIndex: number;
            audioUrl: string | null;
            imageUrl: string | null;
            lessonId: number;
            vocabularyId: number;
            type: import("@prisma/client").$Enums.ExerciseType;
            question: string;
            answer: string;
            hints: string[];
            choices: string[];
        })[];
        lesson: {
            id: number;
            name: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        thaiWord: string;
        englishWord: string;
        audioUrl: string | null;
        imageUrl: string | null;
        lessonId: number;
    }>;
    update(id: number, data: UpdateVocabularyDto): Promise<{
        lesson: {
            id: number;
            name: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        thaiWord: string;
        englishWord: string;
        audioUrl: string | null;
        imageUrl: string | null;
        lessonId: number;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        thaiWord: string;
        englishWord: string;
        audioUrl: string | null;
        imageUrl: string | null;
        lessonId: number;
    }>;
    findAll(): Promise<({
        exercises: {
            id: number;
            type: import("@prisma/client").$Enums.ExerciseType;
        }[];
        lesson: {
            id: number;
            name: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        thaiWord: string;
        englishWord: string;
        audioUrl: string | null;
        imageUrl: string | null;
        lessonId: number;
    })[]>;
    search(query: string, lessonId?: number): Promise<({
        exercises: {
            id: number;
            type: import("@prisma/client").$Enums.ExerciseType;
        }[];
        lesson: {
            id: number;
            name: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        difficulty: import("@prisma/client").$Enums.Difficulty;
        thaiWord: string;
        englishWord: string;
        audioUrl: string | null;
        imageUrl: string | null;
        lessonId: number;
    })[]>;
}
