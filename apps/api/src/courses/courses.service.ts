import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; description?: string; isPublic?: boolean; difficulty?: string }, teacherId?: number) {
    const { name, description, isPublic, difficulty } = data;
    return this.prisma.course.create({ 
      data: {
        name,
        description,
        isPublic: isPublic ?? false,
        difficulty: (difficulty as any) || 'BEGINNER',
        teachers: teacherId ? { connect: { id: teacherId } } : undefined,
      }
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: {
        lessons: { select: { id: true, name: true, isPublic: true } },
        teachers: { select: { id: true, username: true, email: true } },
        students: { select: { id: true, username: true, email: true } },
      },
    });
  }

  async findPublicCourses() {
    return this.prisma.course.findMany({
      where: { isPublic: true },
      include: {
        lessons: { 
          select: { id: true, name: true, isPublic: true },
          where: { isPublic: true }
        },
        teachers: { select: { id: true, username: true, email: true } },
      },
    });
  }

  async findMyCourses(role: string, userId: number) {
    const filter =
      role === 'ADMIN'
        ? {}
        : role === 'teacher'
          ? { teachers: { some: { id: userId } } }
          : { students: { some: { id: userId } } };

    return this.prisma.course.findMany({
      where: filter,
      include: {
        lessons: { select: { id: true, name: true } },
        teachers: { select: { id: true, username: true } },
        students: { select: { id: true } },
      },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          include: {
            userProgress: true,
          },
        },
        teachers: { select: { id: true, username: true, email: true } },
        students: { select: { id: true, username: true } },
      },
    });

    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course;
  }

  async findLessonsByCourse(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          include: {
            userProgress: true,
          },
          orderBy: { orderIndex: 'asc' }
        },
      },
    });

    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course.lessons;
  }

  async update(id: number, data: { name?: string; description?: string; isPublic?: boolean; difficulty?: string }) {
    await this.findOne(id);
    return this.prisma.course.update({ 
      where: { id }, 
      data: {
        ...data,
        difficulty: (data.difficulty as any) || undefined
      } 
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.course.delete({ where: { id } });
  }

  async enrollStudent(courseId: number, studentId: number) {
    return this.prisma.course.update({
      where: { id: courseId },
      data: { students: { connect: { id: studentId } } },
    });
  }

  async removeStudent(courseId: number, studentId: number) {
    return this.prisma.course.update({
      where: { id: courseId },
      data: { students: { disconnect: { id: studentId } } },
    });
  }

  async getCatalog() {
    return this.prisma.course.findMany({
      where: { isPublic: true },
      include: {
        lessons: {
          orderBy: { createdAt: 'asc' },
          include: { _count: { select: { exercises: true } } }
        }
      }
    });
  }

  async getMyProgress(userId: number) {
    return this.prisma.userProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: { course: true }
        }
      }
    });
  }
}
