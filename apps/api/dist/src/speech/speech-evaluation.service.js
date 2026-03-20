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
exports.SpeechEvaluationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const speech_service_1 = require("./speech.service");
let SpeechEvaluationService = class SpeechEvaluationService {
    constructor(prisma, speechService) {
        this.prisma = prisma;
        this.speechService = speechService;
    }
    async evaluateSpeech(userId, exerciseId, audioBuffer, originalText) {
        try {
            const base64Audio = audioBuffer.toString('base64');
            const transcript = await this.speechService.transcribe(base64Audio);
            const normalize = (str) => (str || '').replace(/[\W_]+/g, '').toLowerCase();
            const normTranscript = normalize(transcript ?? '');
            const normOriginal = normalize(originalText ?? '');
            const passed = normTranscript === normOriginal && normTranscript.length > 0;
            const score = passed ? 100 : 0;
            const accuracy = passed ? 1.0 : 0.0;
            const speechResult = await this.prisma.speechResult.create({
                data: {
                    userId,
                    exerciseId,
                    audioUrl: await this.saveAudioFile(audioBuffer),
                    transcript: transcript || 'No speech detected',
                    score,
                    accuracy,
                    passed,
                },
                include: {
                    user: {
                        select: { id: true, username: true }
                    },
                    exercise: {
                        select: { id: true, type: true, question: true }
                    }
                }
            });
            if (passed) {
                await this.updateUserProgress(userId, exerciseId, score);
            }
            return speechResult;
        }
        catch (error) {
            throw new Error(`Speech evaluation failed: ${error.message}`);
        }
    }
    async saveAudioFile(audioBuffer) {
        const filename = `audio_${Date.now()}.wav`;
        return `/uploads/audio/${filename}`;
    }
    async updateUserProgress(userId, exerciseId, score) {
        const exercise = await this.prisma.exercise.findUnique({
            where: { id: exerciseId },
            select: { lessonId: true }
        });
        if (!exercise) {
            throw new Error('Exercise not found');
        }
        const baseXP = 10;
        const bonusXP = score > 90 ? 5 : score > 80 ? 3 : 0;
        const totalXP = baseXP + bonusXP;
        const progress = await this.prisma.userProgress.upsert({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId: exercise.lessonId
                }
            },
            update: {
                status: 'IN_PROGRESS',
                xpEarned: {
                    increment: totalXP
                }
            },
            create: {
                userId,
                lessonId: exercise.lessonId,
                status: 'IN_PROGRESS',
                xpEarned: totalXP,
                completionPercentage: 0
            }
        });
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                xp: {
                    increment: totalXP
                }
            }
        });
        const totalExercises = await this.prisma.exercise.count({
            where: { lessonId: exercise.lessonId }
        });
        if (totalExercises > 0) {
            await this.prisma.userProgress.update({
                where: { id: progress.id },
                data: {
                    status: 'COMPLETED',
                    completionPercentage: 100
                }
            });
        }
        return progress;
    }
    async getUserSpeechResults(userId, limit = 10) {
        return this.prisma.speechResult.findMany({
            where: { userId },
            include: {
                exercise: {
                    select: { id: true, type: true, question: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    }
    async getExerciseSpeechResults(exerciseId) {
        return this.prisma.speechResult.findMany({
            where: { exerciseId },
            include: {
                user: {
                    select: { id: true, username: true }
                }
            },
            orderBy: { score: 'desc' }
        });
    }
    async getUserSpeechStats(userId) {
        const stats = await this.prisma.speechResult.aggregate({
            where: { userId },
            _avg: {
                score: true,
                accuracy: true
            },
            _count: {
                id: true
            },
            _sum: {
                score: true
            }
        });
        const passedCount = await this.prisma.speechResult.count({
            where: {
                userId,
                passed: true
            }
        });
        return {
            totalAttempts: stats._count.id,
            averageScore: stats._avg.score || 0,
            averageAccuracy: stats._avg.accuracy || 0,
            passedCount,
            passRate: stats._count.id > 0 ? passedCount / stats._count.id : 0
        };
    }
};
exports.SpeechEvaluationService = SpeechEvaluationService;
exports.SpeechEvaluationService = SpeechEvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        speech_service_1.SpeechService])
], SpeechEvaluationService);
//# sourceMappingURL=speech-evaluation.service.js.map