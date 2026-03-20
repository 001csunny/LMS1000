import { IsString, IsOptional, IsBoolean, IsEnum, IsInt, MinLength, MaxLength } from 'class-validator';
import { Difficulty } from '@prisma/client';

/**
 * Data Transfer Object for Lesson Creation
 */
export class CreateLessonDto {
  @IsString({ message: 'ชื่อบทเรียนต้องเป็นตัวอักษร' })
  @MinLength(5, { message: 'ชื่อบทเรียนต้องมีความยาวอย่างน้อย 5 ตัวอักษร' })
  @MaxLength(100, { message: 'ชื่อบทเรียนต้องมีความยาวไม่เกิน 100 ตัวอักษร' })
  name: string;

  @IsString({ message: 'คำอธิบายต้องเป็นตัวอักษร' })
  @IsOptional()
  @MaxLength(1000, { message: 'คำอธิบายต้องมีความยาวไม่เกิน 1000 ตัวอักษร' })
  description?: string;

  @IsInt({ message: 'ไม่ได้ระบุรหัสคอร์สเรียน' })
  courseId: number;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean = false;

  @IsEnum(Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' })
  @IsOptional()
  difficulty?: Difficulty = Difficulty.BEGINNER;

  @IsInt()
  @IsOptional()
  orderIndex?: number = 0;
}

/**
 * Data Transfer Object for Lesson Updates
 */
export class UpdateLessonDto {
  @IsString({ message: 'ชื่อบทเรียนต้องเป็นตัวอักษร' })
  @IsOptional()
  @MinLength(5, { message: 'ชื่อบทเรียนต้องมีความยาวอย่างน้อย 5 ตัวอักษร' })
  @MaxLength(100, { message: 'ชื่อบทเรียนต้องมีความยาวไม่เกิน 100 ตัวอักษร' })
  name?: string;

  @IsString({ message: 'คำอธิบายต้องเป็นตัวอักษร' })
  @IsOptional()
  @MaxLength(1000, { message: 'คำอธิบายต้องมีความยาวไม่เกิน 1000 ตัวอักษร' })
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsEnum(Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' })
  @IsOptional()
  difficulty?: Difficulty;

  @IsInt()
  @IsOptional()
  orderIndex?: number;
}
