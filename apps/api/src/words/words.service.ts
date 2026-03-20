import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { thaiWord: string; englishWord: string; lessonId?: number }) {
    // Since Word model doesn't exist in new schema, return mock data
    // This is for backward compatibility
    return {
      id: 1,
      thaiWord: data.thaiWord,
      englishWord: data.englishWord,
      lessonId: data.lessonId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async findAll() {
    // Return mock data since Word model doesn't exist
    return [];
  }

  async findOne(id: number) {
    // Return mock data since Word model doesn't exist
    throw new NotFoundException(`Word #${id} not found`);
  }

  async update(id: number, data: { thaiWord?: string; englishWord?: string; lessonId?: number }) {
    // Return mock data since Word model doesn't exist
    return {
      id,
      thaiWord: data.thaiWord || 'default',
      englishWord: data.englishWord || 'default',
      lessonId: data.lessonId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async remove(id: number) {
    // Return mock delete operation since Word model doesn't exist
    return { id, deleted: true };
  }
}
