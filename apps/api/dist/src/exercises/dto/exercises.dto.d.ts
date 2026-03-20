export declare enum ExerciseType {
    TRANSLATION = "TRANSLATION",
    SPEAKING = "SPEAKING",
    LISTENING = "LISTENING",
    READING = "READING",
    MATCHING = "MATCHING"
}
export declare class CreateExerciseDto {
    lessonId: number;
    vocabularyId: number;
    type: ExerciseType;
    question: string;
    answer: string;
    audioUrl?: string;
    imageUrl?: string;
    hints?: string[];
    orderIndex?: number;
}
export declare class UpdateExerciseDto {
    type?: ExerciseType;
    question?: string;
    answer?: string;
    audioUrl?: string;
    imageUrl?: string;
    hints?: string[];
    orderIndex?: number;
}
