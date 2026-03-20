import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const mockChallenges = [
  { id: 1, name: "การทักทาย (Greetings)", lessonId: 1, wordIds: [1, 2, 3] },
  { id: 2, name: "แนะนำตัว (Introductions)", lessonId: 1, wordIds: [4, 5] },
];
const mockTests = [
  { id: 1, name: "แบบฝึกหัดท้ายบทที่ 1", lessonId: 1, wordIds: [1, 2, 3] },
];
const mockExams = [
  { id: 1, name: "แบบทดสอบวัดระดับ (Level 1)", lessonId: 1, wordIds: [1, 2, 3, 4, 5] },
];

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    courseId: number;
    isPublic?: boolean;
    difficulty?: string;
    orderIndex?: number;
  }) {
    return this.prisma.lesson.create({
      data: {
        name: data.name,
        description: data.description,
        courseId: data.courseId,
        isPublic: data.isPublic || false,
        difficulty: (data.difficulty as any) || 'BEGINNER',
        orderIndex: data.orderIndex || 0,
      },
      include: { course: true },
    });
  }

  async findOne(id: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
        userProgress: true,
      },
    });

    if (!lesson) throw new NotFoundException(`Lesson #${id} not found`);
    
    // Attach mock data for challenges, tests, exams for frontend compatibility
    return {
      ...lesson,
      challenges: mockChallenges.filter(c => c.lessonId === id),
      tests: mockTests.filter(t => t.lessonId === id),
      exams: mockExams.filter(e => e.lessonId === id)
    };
  }

  async update(id: number, data: { name?: string; description?: string; isPublic?: boolean; difficulty?: string; orderIndex?: number }) {
    await this.findOne(id);
    return this.prisma.lesson.update({ 
      where: { id }, 
      data: {
        ...data,
        difficulty: (data.difficulty as any) || undefined
      } 
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.lesson.delete({ where: { id } });
  }

  async findPublicLessons() {
    return this.prisma.lesson.findMany({
      where: { isPublic: true },
      include: {
        course: { select: { id: true, name: true } },
        userProgress: true,
      },
    });
  }

  async findByCourse(courseId: number) {
    return this.prisma.lesson.findMany({
      where: { courseId },
      include: {
        userProgress: true,
      },
    });
  }

  async saveProgress(userId: number, lessonId: number, xpEarned: number) {
    return this.prisma.userProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { 
        status: 'COMPLETED', 
        xpEarned: { increment: xpEarned }
      },
      create: { 
        userId, 
        lessonId, 
        status: 'COMPLETED', 
        xpEarned
      },
    });
  }

  async getProgress(userId: number, lessonId: number) {
    return this.prisma.userProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });
  }

  // Progress: Finalize Lesson Score
  async finishLesson(
    userId: number, 
    lessonId: number, 
    data: { totalScore: number; completedCount: number; totalExercises: number }
  ) {
    const accuracy = data.totalExercises > 0 ? (data.completedCount / data.totalExercises) * 100 : 0;
    
    // Convert total score to XP increment
    const xpEarned = Math.round(data.totalScore);

    return this.prisma.userProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {
        status: 'COMPLETED',
        xpEarned: { increment: xpEarned },
        completionPercentage: accuracy,
        highestScore: data.totalScore
      },
      create: {
        userId,
        lessonId,
        status: 'COMPLETED',
        xpEarned,
        completionPercentage: accuracy,
        highestScore: data.totalScore
      }
    });
  }

  // Challenge functions (for backward compatibility)
  async createChallenge(data: {
    name: string;
    lessonId: number;
    wordIds?: number[];
  }) {
    const newChallenge = {
      id: Date.now(),
      name: data.name,
      lessonId: data.lessonId,
      wordIds: data.wordIds || []
    };
    mockChallenges.push(newChallenge);
    return newChallenge;
  }

  async findOneChallenge(id: number) {
    const challenge = mockChallenges.find(c => c.id === id);
    if (!challenge) throw new NotFoundException(`Challenge #${id} not found`);
    return challenge;
  }

  async deleteChallenge(id: number) {
    const idx = mockChallenges.findIndex(c => c.id === id);
    if (idx !== -1) mockChallenges.splice(idx, 1);
    return { id, deleted: true };
  }

  // Test functions (for backward compatibility)
  async createTest(data: {
    name: string;
    lessonId: number;
    wordIds?: number[];
  }) {
    const newTest = {
      id: Date.now(),
      name: data.name,
      lessonId: data.lessonId,
      wordIds: data.wordIds || []
    };
    mockTests.push(newTest);
    return newTest;
  }

  async findOneTest(id: number) {
    const test = mockTests.find(t => t.id === id);
    if (!test) throw new NotFoundException(`Test #${id} not found`);
    return test;
  }

  async deleteTest(id: number) {
    const idx = mockTests.findIndex(t => t.id === id);
    if (idx !== -1) mockTests.splice(idx, 1);
    return { id, deleted: true };
  }

  // Exam functions (for backward compatibility)
  async createExam(data: {
    name: string;
    lessonId: number;
    wordIds?: number[];
  }) {
    const newExam = {
      id: Date.now(),
      name: data.name,
      lessonId: data.lessonId,
      wordIds: data.wordIds || []
    };
    mockExams.push(newExam);
    return newExam;
  }

  async findOneExam(id: number) {
    const exam = mockExams.find(e => e.id === id);
    if (!exam) throw new NotFoundException(`Exam #${id} not found`);
    return exam;
  }

  async deleteExam(id: number) {
    const idx = mockExams.findIndex(e => e.id === id);
    if (idx !== -1) mockExams.splice(idx, 1);
    return { id, deleted: true };
  }
}
