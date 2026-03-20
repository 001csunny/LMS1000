import { Difficulty } from '@prisma/client';
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
