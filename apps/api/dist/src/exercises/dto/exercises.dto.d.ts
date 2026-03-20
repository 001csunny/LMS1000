import { ExerciseType } from '@prisma/client';
export { ExerciseType };
export declare class CreateExerciseDto {
    lessonId: number;
    vocabularyId: number;
    type: ExerciseType;
    question: string;
    answer: string;
    audioUrl?: string;
    imageUrl?: string;
    hints?: string[];
    choices?: string[];
    orderIndex?: number;
}
export declare class UpdateExerciseDto {
    type?: ExerciseType;
    question?: string;
    answer?: string;
    audioUrl?: string;
    imageUrl?: string;
    hints?: string[];
    choices?: string[];
    orderIndex?: number;
}
