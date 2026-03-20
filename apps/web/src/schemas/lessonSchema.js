import { z } from 'zod';

/**
 * Lesson validation schema
 * Adheres to Bright Liquid Glass Morphism and Clean Code principles
 */
export const lessonSchema = z.object({
  name: z.string({
    required_error: 'กรุณากรอกชื่อบทเรียน',
  })
  .min(5, 'ชื่อบทเรียนต้องมีความยาวอย่างน้อย 5 ตัวอักษร')
  .max(100, 'ชื่อบทเรียนต้องมีความยาวไม่เกิน 100 ตัวอักษร'),
  
  description: z.string()
    .max(1000, 'คำอธิบายต้องมีความยาวไม่เกิน 1000 ตัวอักษร')
    .optional()
    .or(z.literal('')),
  
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
    error_map: () => ({ message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' }),
  }).default('BEGINNER'),
  
  isPublic: z.boolean().default(false),
  
  orderIndex: z.number().int().default(0),
});

/**
 * Vocabulary validation schema
 */
export const vocabularySchema = z.object({
  thaiWord: z.string({
    required_error: 'กรุณากรอกคำอ่านภาษาไทย',
  })
  .min(1, 'กรุณากรอกคำอ่านภาษาไทย')
  .max(100, 'คำอ่านภาษาไทยต้องมีความยาวไม่เกิน 100 ตัวอักษร'),
  
  englishWord: z.string({
    required_error: 'กรุณากรอกคำแปลภาษาอังกฤษ',
  })
  .min(1, 'กรุณากรอกคำแปลภาษาอังกฤษ')
  .max(100, 'คำแปลภาษาอังกฤษต้องมีความยาวไม่เกิน 100 ตัวอักษร'),
  
  audioUrl: z.string().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
    error_map: () => ({ message: 'กรุณาเลือกความยากที่ถูกต้อง' }),
  }).optional(),
});

/**
 * Exercise validation schema
 */
export const exerciseSchema = z.object({
  type: z.enum(['TRANSLATION', 'SPEAKING', 'LISTENING', 'READING', 'MATCHING'], {
    error_map: () => ({ message: 'กรุณาเลือกประเภทแบบฝึกหัด' }),
  }),
  
  question: z.string({
    required_error: 'กรุณากรอกคำถาม',
  }).min(1, 'กรุณากรอกคำถาม').max(500, 'คำถามต้องไม่เกิน 500 ตัวอักษร'),
  
  answer: z.string({
    required_error: 'กรุณากรอกคำตอบ',
  }).min(1, 'กรุณากรอกคำตอบ').max(500, 'คำตอบต้องไม่เกิน 500 ตัวอักษร'),
  
  audioUrl: z.string().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  
  hints: z.array(z.string()).optional().default([]),
  choices: z.array(z.string()).optional().default([]),
  
  orderIndex: z.number().int().default(0),
});
