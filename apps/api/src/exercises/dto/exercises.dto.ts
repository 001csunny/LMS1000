import { IsString, IsOptional, IsEnum, IsInt, IsArray, MaxLength } from 'class-validator';
import { ExerciseType } from '@prisma/client';

export { ExerciseType };

/**
 * Data Transfer Object for Exercise Creation
 */
export class CreateExerciseDto {
  @IsInt({ message: 'ไม่ได้ระบุรหัสบทเรียน' })
  lessonId: number;

  @IsInt({ message: 'ไม่ได้ระบุรหัสคำศัพท์' })
  vocabularyId: number;

  @IsEnum(ExerciseType, { message: 'กรุณาเลือกประเภทแบบฝึกหัดที่ถูกต้อง' })
  type: ExerciseType;

  @IsString({ message: 'คำถามต้องเป็นตัวอักษร' })
  @MaxLength(500, { message: 'คำถามต้องมีความยาวไม่เกิน 500 ตัวอักษร' })
  question: string;

  @IsString({ message: 'คำตอบต้องเป็นตัวอักษร' })
  @MaxLength(500, { message: 'คำตอบต้องมีความยาวไม่เกิน 500 ตัวอักษร' })
  answer: string;

  @IsOptional()
  @IsString({ message: 'Audio URL must be a string' })
  audioUrl?: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;

  @IsOptional()
  @IsArray({ message: 'Hints must be an array' })
  @IsString({ each: true, message: 'แต่ละคำใบ้ต้องเป็นตัวอักษร' })
  hints?: string[];

  @IsOptional()
  @IsArray({ message: 'Choices must be an array' })
  @IsString({ each: true, message: 'แต่ละตัวเลือกต้องเป็นตัวอักษร' })
  choices?: string[];

  @IsOptional()
  @IsInt({ message: 'ลำดับต้องเป็นตัวเลข' })
  orderIndex?: number;
}

/**
 * Data Transfer Object for Exercise Updates
 */
export class UpdateExerciseDto {
  @IsOptional()
  @IsEnum(ExerciseType, { message: 'กรุณาเลือกประเภทแบบฝึกหัดที่ถูกต้อง' })
  type?: ExerciseType;

  @IsOptional()
  @IsString({ message: 'คำถามต้องเป็นตัวอักษร' })
  @MaxLength(500, { message: 'คำถามต้องมีความยาวไม่เกิน 500 ตัวอักษร' })
  question?: string;

  @IsOptional()
  @IsString({ message: 'คำตอบต้องเป็นตัวอักษร' })
  @MaxLength(500, { message: 'คำตอบต้องมีความยาวไม่เกิน 500 ตัวอักษร' })
  answer?: string;

  @IsOptional()
  @IsString({ message: 'Audio URL must be a string' })
  audioUrl?: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;

  @IsOptional()
  @IsArray({ message: 'Hints must be an array' })
  @IsString({ each: true, message: 'แต่ละคำใบ้ต้องเป็นตัวอักษร' })
  hints?: string[];

  @IsOptional()
  @IsArray({ message: 'Choices must be an array' })
  @IsString({ each: true, message: 'แต่ละตัวเลือกต้องเป็นตัวอักษร' })
  choices?: string[];

  @IsOptional()
  @IsInt({ message: 'ลำดับต้องเป็นตัวเลข' })
  orderIndex?: number;
}
