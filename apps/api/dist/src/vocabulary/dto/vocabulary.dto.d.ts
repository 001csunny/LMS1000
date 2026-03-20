export declare enum Difficulty {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED"
}
export declare class CreateVocabularyDto {
    lessonId: number;
    thaiWord: string;
    englishWord: string;
    audioUrl?: string;
    imageUrl?: string;
    difficulty?: Difficulty;
}
export declare class UpdateVocabularyDto {
    thaiWord?: string;
    englishWord?: string;
    audioUrl?: string;
    imageUrl?: string;
    difficulty?: Difficulty;
}
