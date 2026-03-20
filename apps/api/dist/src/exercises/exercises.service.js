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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExercisesService = class ExercisesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
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
                choices: data.choices || [],
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
    async findByLesson(lessonId) {
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
    async findByType(type, lessonId) {
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
    async findOne(id) {
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
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.exercise.update({
            where: { id },
            data: {
                type: data.type || undefined,
                question: data.question,
                answer: data.answer,
                audioUrl: data.audioUrl,
                imageUrl: data.imageUrl,
                hints: data.hints,
                choices: data.choices,
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
    async remove(id) {
        await this.findOne(id);
        return this.prisma.exercise.delete({
            where: { id }
        });
    }
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
    async getNextExercise(currentExerciseId) {
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
    async getExerciseCount(lessonId) {
        return this.prisma.exercise.count({
            where: { lessonId }
        });
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map