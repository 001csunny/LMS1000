import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; description?: string; isPublic?: boolean }) {
    return this.prisma.course.create({ 
      data: {
        name: data.name,
        description: data.description,
        isPublic: data.isPublic || false,
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
            challenges: true,
            tests: true,
            exams: true,
          },
        },
        teachers: { select: { id: true, username: true, email: true } },
        students: { select: { id: true, username: true } },
      },
    });

    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course;
  }

  async update(id: number, data: { name?: string; description?: string; isPublic?: boolean }) {
    await this.findOne(id);
    return this.prisma.course.update({ where: { id }, data });
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
}
