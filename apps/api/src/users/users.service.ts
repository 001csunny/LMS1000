import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        xp: true,
        streak: true,
        speechToken: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateMe(
    userId: number,
    data: { username?: string; email?: string; speechToken?: string },
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        xp: true,
        streak: true,
        speechToken: true,
      },
    });
  }

  async updatePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw new BadRequestException('Incorrect current password');

    const hash = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hash },
    });

    return { message: 'Password updated successfully' };
  }

  async addXp(userId: number, amount: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: amount } },
      select: { id: true, xp: true, streak: true },
    });
  }

  async incrementStreak(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { streak: { increment: 1 } },
      select: { id: true, xp: true, streak: true },
    });
  }

  async getLeaderboard() {
    return this.prisma.user.findMany({
      orderBy: { xp: 'desc' },
      take: 20,
      select: {
        id: true,
        username: true,
        xp: true,
        streak: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        xp: true,
        streak: true,
        createdAt: true,
      },
    });
  }

  async createUser(data: {
    email: string;
    username: string;
    password: string;
    role?: Role;
  }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hash,
        role: data.role || Role.STUDENT,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        xp: true,
        streak: true,
        createdAt: true,
      },
    });

    return user;
  }
}
