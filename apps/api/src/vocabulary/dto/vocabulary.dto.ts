import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export class CreateVocabularyDto {
  @IsInt()
  lessonId: number;

  @IsString()
  thaiWord: string;

  @IsString()
  englishWord: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;
}

export class UpdateVocabularyDto {
  @IsOptional()
  @IsString()
  thaiWord?: string;

  @IsOptional()
  @IsString()
  englishWord?: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;
}
