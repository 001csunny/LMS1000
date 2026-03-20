import { PrismaService } from '../prisma/prisma.service';
import { SpeechService } from './speech.service';
export declare class SpeechEvaluationService {
    private prisma;
    private speechService;
    constructor(prisma: PrismaService, speechService: SpeechService);
    evaluateSpeech(userId: number, exerciseId: number, audioBuffer: Buffer, originalText: string): Promise<{
        user: {
            username: string;
            id: number;
        };
        exercise: {
            id: number;
            type: import("@prisma/client").$Enums.ExerciseType;
            question: string;
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
    }>;
    private saveAudioFile;
    private updateUserProgress;
    getUserSpeechResults(userId: number, limit?: number): Promise<({
        exercise: {
            id: number;
            type: import("@prisma/client").$Enums.ExerciseType;
            question: string;
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
    })[]>;
    getExerciseSpeechResults(exerciseId: number): Promise<({
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
    })[]>;
    getUserSpeechStats(userId: number): Promise<{
        totalAttempts: number;
        averageScore: number;
        averageAccuracy: number;
        passedCount: number;
        passRate: number;
    }>;
}
