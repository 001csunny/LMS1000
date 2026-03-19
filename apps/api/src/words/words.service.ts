import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { word: string; audioUrl?: string }) {
    return this.prisma.word.create({ data });
  }

  async findAll() {
    return this.prisma.word.findMany({
      include: {
        challenges: { select: { id: true, name: true } },
        tests: { select: { id: true, name: true } },
        exams: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: number) {
    const word = await this.prisma.word.findUnique({
      where: { id },
      include: {
        challenges: true,
        tests: true,
        exams: true,
      },
    });

    if (!word) throw new NotFoundException(`Word #${id} not found`);
    return word;
  }

  async update(id: number, data: { word?: string; audioUrl?: string }) {
    await this.findOne(id);
    return this.prisma.word.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.word.delete({ where: { id } });
  }
}
