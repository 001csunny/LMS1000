import { SpeechService } from './speech.service';
import { SpeechEvaluationService } from './speech-evaluation.service';
export declare class SpeechController {
    private readonly speechService;
    private readonly speechEvaluationService;
    constructor(speechService: SpeechService, speechEvaluationService: SpeechEvaluationService);
    transcribe(body: {
        audioBase64: string;
        sampleRateHertz?: number;
    }): Promise<{
        transcript: any;
        message: string;
    } | {
        transcript: string;
        message?: undefined;
    }>;
    evaluate(body: {
        userId: number;
        exerciseId: number;
        audioBuffer: string;
        originalText: string;
    }): Promise<{
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
}
