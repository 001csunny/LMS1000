import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVocabularyDto, UpdateVocabularyDto, Difficulty } from './dto/vocabulary.dto';

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  // Create vocabulary for a lesson
  async create(data: CreateVocabularyDto) {
    return this.prisma.vocabulary.create({
      data: {
        lessonId: data.lessonId,
        thaiWord: data.thaiWord,
        englishWord: data.englishWord,
        audioUrl: data.audioUrl,
        imageUrl: data.imageUrl,
        difficulty: data.difficulty,
      },
      include: {
        lesson: {
          select: { id: true, name: true }
        }
      }
    });
  }

  // Get all vocabularies for a lesson
  async findByLesson(lessonId: number) {
    return this.prisma.vocabulary.findMany({
      where: { lessonId },
      include: {
        exercises: {
          select: { id: true, type: true, question: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  // Get single vocabulary
  async findOne(id: number) {
    const vocabulary = await this.prisma.vocabulary.findUnique({
      where: { id },
      include: {
        lesson: {
          select: { id: true, name: true }
        },
        exercises: {
          include: {
            speechResults: {
              select: { score: true, accuracy: true, passed: true }
            }
          }
        }
      }
    });

    if (!vocabulary) {
      throw new Error('Vocabulary not found');
    }

    return vocabulary;
  }

  // Update vocabulary
  async update(id: number, data: UpdateVocabularyDto) {
    await this.findOne(id);
    
    return this.prisma.vocabulary.update({
      where: { id },
      data: {
        thaiWord: data.thaiWord,
        englishWord: data.englishWord,
        audioUrl: data.audioUrl,
        imageUrl: data.imageUrl,
        difficulty: data.difficulty,
      },
      include: {
        lesson: {
          select: { id: true, name: true }
        }
      }
    });
  }

  // Delete vocabulary
  async remove(id: number) {
    await this.findOne(id);
    
    return this.prisma.vocabulary.delete({
      where: { id }
    });
  }

  // Get all vocabularies (admin only)
  async findAll() {
    return this.prisma.vocabulary.findMany({
      include: {
        lesson: {
          select: { id: true, name: true }
        },
        exercises: {
          select: { id: true, type: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Search vocabularies
  async search(query: string, lessonId?: number) {
    const where: any = {
      OR: [
        { thaiWord: { contains: query, mode: 'insensitive' } },
        { englishWord: { contains: query, mode: 'insensitive' } }
      ]
    };

    if (lessonId) {
      where.AND = [{ lessonId }];
    }

    return this.prisma.vocabulary.findMany({
      where,
      include: {
        lesson: {
          select: { id: true, name: true }
        },
        exercises: {
          select: { id: true, type: true }
        }
      }
    });
  }
}
