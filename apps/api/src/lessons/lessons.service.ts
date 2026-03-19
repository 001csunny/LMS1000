import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    courseId: number;
    isPublic?: boolean;
  }) {
    return this.prisma.lesson.create({
      data: {
        name: data.name,
        description: data.description,
        courseId: data.courseId,
        isPublic: data.isPublic || false,
      },
      include: { course: true },
    });
  }

  async findOne(id: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
        challenges: {
          include: { words: true },
        },
        tests: {
          include: { words: true },
        },
        exams: {
          include: { words: true },
        },
      },
    });

    if (!lesson) throw new NotFoundException(`Lesson #${id} not found`);
    return lesson;
  }

  async update(id: number, data: { name?: string; description?: string; isPublic?: boolean }) {
    await this.findOne(id);
    return this.prisma.lesson.update({ where: { id }, data });
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
        challenges: {
          include: { words: true },
        },
        tests: {
          include: { words: true },
        },
        exams: {
          include: { words: true },
        },
      },
    });
  }

  // Challenges
  async createChallenge(data: {
    name: string;
    lessonId: number;
    wordIds?: number[];
  }) {
    return this.prisma.challenge.create({
      data: {
        name: data.name,
        lessonId: data.lessonId,
        words: data.wordIds
          ? { connect: data.wordIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { words: true },
    });
  }

  async deleteChallenge(id: number) {
    return this.prisma.challenge.delete({ where: { id } });
  }

  // Tests
  async createTest(data: {
    name: string;
    lessonId: number;
    wordIds?: number[];
  }) {
    return this.prisma.test.create({
      data: {
        name: data.name,
        lessonId: data.lessonId,
        words: data.wordIds
          ? { connect: data.wordIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { words: true },
    });
  }

  async deleteTest(id: number) {
    return this.prisma.test.delete({ where: { id } });
  }

  // Exams
  async createExam(data: {
    name: string;
    lessonId: number;
    wordIds?: number[];
  }) {
    return this.prisma.exam.create({
      data: {
        name: data.name,
        lessonId: data.lessonId,
        words: data.wordIds
          ? { connect: data.wordIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { words: true },
    });
  }

  async deleteExam(id: number) {
    return this.prisma.exam.delete({ where: { id } });
  }

  // Progress
  async saveProgress(userId: number, lessonId: number, xpEarned: number) {
    return this.prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { completed: true, xpEarned: { increment: xpEarned } },
      create: { userId, lessonId, completed: true, xpEarned },
    });
  }
}
