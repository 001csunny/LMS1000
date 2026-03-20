import { IsString, IsOptional, IsBoolean, IsEnum, MinLength, MaxLength } from 'class-validator';
import { Difficulty } from '@prisma/client';

/**
 * Data Transfer Object for Course Creation
 * Strictly enforced by NestJS ValidationPipe
 */
export class CreateCourseDto {
  @IsString({ message: 'Course title must be a string' })
  @MinLength(5, { message: 'ชื่อคอร์สต้องมีความยาวอย่างน้อย 5 ตัวอักษร' })
  @MaxLength(100, { message: 'ชื่อคอร์สต้องมีความยาวไม่เกิน 100 ตัวอักษร' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @MaxLength(1000, { message: 'คำอธิบายต้องมีความยาวไม่เกิน 1000 ตัวอักษร' })
  description?: string;

  @IsEnum(Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' })
  @IsOptional()
  difficulty?: Difficulty = Difficulty.BEGINNER;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean = false;
}
