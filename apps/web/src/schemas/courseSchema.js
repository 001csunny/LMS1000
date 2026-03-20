import { z } from 'zod';

/**
 * Zod Schema for Course Creation
 * Strictly follows the requirements for Thai language courses
 */
export const courseSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'ชื่อคอร์สต้องมีความยาวอย่างน้อย 5 ตัวอักษร' })
    .max(100, { message: 'ชื่อคอร์สต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
  description: z
    .string()
    .max(1000, { message: 'คำอธิบายต้องมีความยาวไม่เกิน 1000 ตัวอักษร' })
    .optional()
    .or(z.literal('')),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
    errorMap: () => ({ message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' }),
  }).default('BEGINNER'),
});

/**
 * TypeScript Type Definition Example (Derived from Zod)
 * 
 * export type CreateCourseInput = z.infer<typeof courseSchema>;
 */
