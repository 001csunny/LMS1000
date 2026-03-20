import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercises.dto';
import { ExerciseType } from './dto/exercises.dto';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  // Create exercise for a lesson
  async create(data: CreateExerciseDto) {
    return this.prisma.exercise.create({
      data: {
        lessonId: data.lessonId,
        vocabularyId: data.vocabularyId,
        type: data.type,
        question: data.question,
        answer: data.answer,
        audioUrl: data.audioUrl,
        imageUrl: data.imageUrl,
        hints: data.hints || [],
        orderIndex: data.orderIndex || 0,
      },
      include: {
        lesson: {
          select: { id: true, name: true }
        },
        vocabulary: {
          select: { id: true, thaiWord: true, englishWord: true }
        }
      }
    });
  }

  // Get all exercises for a lesson
  async findByLesson(lessonId: number) {
    return this.prisma.exercise.findMany({
      where: { lessonId },
      include: {
        vocabulary: {
          select: { id: true, thaiWord: true, englishWord: true, audioUrl: true }
        },
        speechResults: {
          select: { score: true, accuracy: true, passed: true }
        }
      },
      orderBy: { orderIndex: 'asc' }
    });
  }

  // Get exercises by type
  async findByType(type: ExerciseType, lessonId?: number) {
    const where = {
      type,
      ...(lessonId && { lessonId })
    };

    return this.prisma.exercise.findMany({
      where,
      include: {
        lesson: {
          select: { id: true, name: true }
        },
        vocabulary: {
          select: { id: true, thaiWord: true, englishWord: true }
        }
      },
      orderBy: { orderIndex: 'asc' }
    });
  }

  // Get single exercise
  async findOne(id: number) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
      include: {
        lesson: {
          select: { id: true, name: true }
        },
        vocabulary: {
          select: { id: true, thaiWord: true, englishWord: true, audioUrl: true }
        },
        speechResults: {
          include: {
            user: {
              select: { id: true, username: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!exercise) {
      throw new Error('Exercise not found');
    }

    return exercise;
  }

  // Update exercise
  async update(id: number, data: UpdateExerciseDto) {
    await this.findOne(id);
    
    return this.prisma.exercise.update({
      where: { id },
      data: {
        type: data.type,
        question: data.question,
        answer: data.answer,
        audioUrl: data.audioUrl,
        imageUrl: data.imageUrl,
        hints: data.hints,
        orderIndex: data.orderIndex,
      },
      include: {
        lesson: {
          select: { id: true, name: true }
        },
        vocabulary: {
          select: { id: true, thaiWord: true, englishWord: true }
        }
      }
    });
  }

  // Delete exercise
  async remove(id: number) {
    await this.findOne(id);
    
    return this.prisma.exercise.delete({
      where: { id }
    });
  }

  // Get all exercises (admin only)
  async findAll() {
    return this.prisma.exercise.findMany({
      include: {
        lesson: {
          select: { id: true, name: true }
        },
        vocabulary: {
          select: { id: true, thaiWord: true, englishWord: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Get next exercise in lesson
  async getNextExercise(currentExerciseId: number) {
    const currentExercise = await this.prisma.exercise.findUnique({
      where: { id: currentExerciseId },
      select: { lessonId: true, orderIndex: true }
    });

    if (!currentExercise) {
      throw new Error('Current exercise not found');
    }

    return this.prisma.exercise.findFirst({
      where: {
        lessonId: currentExercise.lessonId,
        orderIndex: {
          gt: currentExercise.orderIndex
        }
      },
      include: {
        vocabulary: {
          select: { id: true, thaiWord: true, englishWord: true, audioUrl: true }
        }
      },
      orderBy: { orderIndex: 'asc' }
    });
  }

  // Get exercise count for lesson
  async getExerciseCount(lessonId: number) {
    return this.prisma.exercise.count({
      where: { lessonId }
    });
  }
}
