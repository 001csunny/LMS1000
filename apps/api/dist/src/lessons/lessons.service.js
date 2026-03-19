"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LessonsService = class LessonsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
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
    async findOne(id) {
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
        if (!lesson)
            throw new common_1.NotFoundException(`Lesson #${id} not found`);
        return lesson;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.lesson.update({ where: { id }, data });
    }
    async remove(id) {
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
    async createChallenge(data) {
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
    async deleteChallenge(id) {
        return this.prisma.challenge.delete({ where: { id } });
    }
    async createTest(data) {
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
    async deleteTest(id) {
        return this.prisma.test.delete({ where: { id } });
    }
    async createExam(data) {
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
    async deleteExam(id) {
        return this.prisma.exam.delete({ where: { id } });
    }
    async saveProgress(userId, lessonId, xpEarned) {
        return this.prisma.progress.upsert({
            where: { userId_lessonId: { userId, lessonId } },
            update: { completed: true, xpEarned: { increment: xpEarned } },
            create: { userId, lessonId, completed: true, xpEarned },
        });
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map