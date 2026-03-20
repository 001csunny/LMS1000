import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercises.dto';
import { ExerciseType } from './dto/exercises.dto';
export declare class ExercisesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateExerciseDto): Promise<{
        lesson: {
            id: number;
            name: string;
        };
        vocabulary: {
            id: number;
            thaiWord: string;
            englishWord: string;
        };
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
    }>;
    findByLesson(lessonId: number): Promise<({
        speechResults: {
            score: number;
            accuracy: number;
            passed: boolean;
        }[];
        vocabulary: {
            id: number;
            thaiWord: string;
            englishWord: string;
            audioUrl: string;
        };
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
    })[]>;
    findByType(type: ExerciseType, lessonId?: number): Promise<({
        lesson: {
            id: number;
            name: string;
        };
        vocabulary: {
            id: number;
            thaiWord: string;
            englishWord: string;
        };
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
    })[]>;
    findOne(id: number): Promise<{
        speechResults: ({
            user: {
                username: string;
                id: number;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            audioUrl: string;
            userId: number;
            transcript: string;
            score: number;
            accuracy: number;
            passed: boolean;
            exerciseId: number;
        })[];
        lesson: {
            id: number;
            name: string;
        };
        vocabulary: {
            id: number;
            thaiWord: string;
            englishWord: string;
            audioUrl: string;
        };
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
    }>;
    update(id: number, data: UpdateExerciseDto): Promise<{
        lesson: {
            id: number;
            name: string;
        };
        vocabulary: {
            id: number;
            thaiWord: string;
            englishWord: string;
        };
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
    }>;
    remove(id: number): Promise<{
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
    }>;
    findAll(): Promise<({
        lesson: {
            id: number;
            name: string;
        };
        vocabulary: {
            id: number;
            thaiWord: string;
            englishWord: string;
        };
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
    })[]>;
    getNextExercise(currentExerciseId: number): Promise<{
        vocabulary: {
            id: number;
            thaiWord: string;
            englishWord: string;
            audioUrl: string;
        };
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
    }>;
    getExerciseCount(lessonId: number): Promise<number>;
}
