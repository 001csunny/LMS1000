import { IsString, IsOptional, IsEnum, IsInt, MaxLength } from 'class-validator';
import { Difficulty } from '@prisma/client';

/**
 * Data Transfer Object for Vocabulary Creation
 */
export class CreateVocabularyDto {
  @IsInt({ message: 'ไม่ได้ระบุรหัสบทเรียน' })
  lessonId: number;

  @IsString({ message: 'คำอ่านภาษาไทยต้องเป็นตัวอักษร' })
  @MaxLength(100, { message: 'คำอ่านภาษาไทยต้องมีความยาวไม่เกิน 100 ตัวอักษร' })
  thaiWord: string;

  @IsString({ message: 'คำแปลภาษาอังกฤษต้องเป็นตัวอักษร' })
  @MaxLength(100, { message: 'คำแปลภาษาอังกฤษต้องมีความยาวไม่เกิน 100 ตัวอักษร' })
  englishWord: string;

  @IsOptional()
  @IsString({ message: 'Audio URL must be a string' })
  audioUrl?: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;

  @IsOptional()
  @IsEnum(Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' })
  difficulty?: Difficulty;
}

/**
 * Data Transfer Object for Vocabulary Updates
 */
export class UpdateVocabularyDto {
  @IsOptional()
  @IsString({ message: 'คำอ่านภาษาไทยต้องเป็นตัวอักษร' })
  @MaxLength(100, { message: 'คำอ่านภาษาไทยต้องมีความยาวไม่เกิน 100 ตัวอักษร' })
  thaiWord?: string;

  @IsOptional()
  @IsString({ message: 'คำแปลภาษาอังกฤษต้องเป็นตัวอักษร' })
  @MaxLength(100, { message: 'คำแปลภาษาอังกฤษต้องมีความยาวไม่เกิน 100 ตัวอักษร' })
  englishWord?: string;

  @IsOptional()
  @IsString({ message: 'Audio URL must be a string' })
  audioUrl?: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;

  @IsOptional()
  @IsEnum(Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' })
  difficulty?: Difficulty;
}
