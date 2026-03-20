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
exports.VocabularyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VocabularyService = class VocabularyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.vocabulary.create({
            data: {
                lessonId: data.lessonId,
                thaiWord: data.thaiWord,
                englishWord: data.englishWord,
                audioUrl: data.audioUrl,
                imageUrl: data.imageUrl,
                difficulty: data.difficulty || undefined,
            },
            include: {
                lesson: {
                    select: { id: true, name: true }
                }
            }
        });
    }
    async findByLesson(lessonId) {
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
    async findOne(id) {
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
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.vocabulary.update({
            where: { id },
            data: {
                thaiWord: data.thaiWord,
                englishWord: data.englishWord,
                audioUrl: data.audioUrl,
                imageUrl: data.imageUrl,
                difficulty: data.difficulty || undefined,
            },
            include: {
                lesson: {
                    select: { id: true, name: true }
                }
            }
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.vocabulary.delete({
            where: { id }
        });
    }
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
    async search(query, lessonId) {
        const where = {
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
};
exports.VocabularyService = VocabularyService;
exports.VocabularyService = VocabularyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VocabularyService);
//# sourceMappingURL=vocabulary.service.js.map