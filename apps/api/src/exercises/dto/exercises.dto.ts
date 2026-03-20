import { IsString, IsOptional, IsEnum, IsInt, IsArray } from 'class-validator';

export enum ExerciseType {
  TRANSLATION = 'TRANSLATION',
  SPEAKING = 'SPEAKING',
  LISTENING = 'LISTENING',
  READING = 'READING',
  MATCHING = 'MATCHING'
}

export class CreateExerciseDto {
  @IsInt()
  lessonId: number;

  @IsInt()
  vocabularyId: number;

  @IsEnum(ExerciseType)
  type: ExerciseType;

  @IsString()
  question: string;

  @IsString()
  answer: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hints?: string[];

  @IsOptional()
  @IsInt()
  orderIndex?: number;
}

export class UpdateExerciseDto {
  @IsOptional()
  @IsEnum(ExerciseType)
  type?: ExerciseType;

  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hints?: string[];

  @IsOptional()
  @IsInt()
  orderIndex?: number;
}
