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
                userProgress: true,
            },
        });
        if (!lesson)
            throw new common_1.NotFoundException(`Lesson #${id} not found`);
        return {
            ...lesson,
            challenges: mockChallenges.filter(c => c.lessonId === id),
            tests: mockTests.filter(t => t.lessonId === id),
            exams: mockExams.filter(e => e.lessonId === id)
        };
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
                userProgress: true,
            },
        });
    }
    async findByCourse(courseId) {
        return this.prisma.lesson.findMany({
            where: { courseId },
            include: {
                userProgress: true,
            },
        });
    }
    async saveProgress(userId, lessonId, xpEarned) {
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
    async getProgress(userId, lessonId) {
        return this.prisma.userProgress.findUnique({
            where: { userId_lessonId: { userId, lessonId } },
        });
    }
    async finishLesson(userId, lessonId, data) {
        const accuracy = data.totalExercises > 0 ? (data.completedCount / data.totalExercises) * 100 : 0;
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
    async createChallenge(data) {
        const newChallenge = {
            id: Date.now(),
            name: data.name,
            lessonId: data.lessonId,
            wordIds: data.wordIds || []
        };
        mockChallenges.push(newChallenge);
        return newChallenge;
    }
    async findOneChallenge(id) {
        const challenge = mockChallenges.find(c => c.id === id);
        if (!challenge)
            throw new common_1.NotFoundException(`Challenge #${id} not found`);
        return challenge;
    }
    async deleteChallenge(id) {
        const idx = mockChallenges.findIndex(c => c.id === id);
        if (idx !== -1)
            mockChallenges.splice(idx, 1);
        return { id, deleted: true };
    }
    async createTest(data) {
        const newTest = {
            id: Date.now(),
            name: data.name,
            lessonId: data.lessonId,
            wordIds: data.wordIds || []
        };
        mockTests.push(newTest);
        return newTest;
    }
    async findOneTest(id) {
        const test = mockTests.find(t => t.id === id);
        if (!test)
            throw new common_1.NotFoundException(`Test #${id} not found`);
        return test;
    }
    async deleteTest(id) {
        const idx = mockTests.findIndex(t => t.id === id);
        if (idx !== -1)
            mockTests.splice(idx, 1);
        return { id, deleted: true };
    }
    async createExam(data) {
        const newExam = {
            id: Date.now(),
            name: data.name,
            lessonId: data.lessonId,
            wordIds: data.wordIds || []
        };
        mockExams.push(newExam);
        return newExam;
    }
    async findOneExam(id) {
        const exam = mockExams.find(e => e.id === id);
        if (!exam)
            throw new common_1.NotFoundException(`Exam #${id} not found`);
        return exam;
    }
    async deleteExam(id) {
        const idx = mockExams.findIndex(e => e.id === id);
        if (idx !== -1)
            mockExams.splice(idx, 1);
        return { id, deleted: true };
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map