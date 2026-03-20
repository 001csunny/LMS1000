import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SpeechService } from './speech.service';

@Injectable()
export class SpeechEvaluationService {
  constructor(
    private prisma: PrismaService,
    private speechService: SpeechService
  ) {}

  // Evaluate speech and save result
  async evaluateSpeech(
    userId: number,
    exerciseId: number,
    audioBuffer: Buffer,
    originalText: string
  ) {
    try {
      // Use GCP Speech Service
      const base64Audio = audioBuffer.toString('base64');
      const transcript = await this.speechService.transcribe(base64Audio);

      // Normalize strings ignoring punctuation, spaces, and case
      const normalize = (str: string) => 
        (str || '').replace(/[\W_]+/g, '').toLowerCase();

      const normTranscript = normalize(transcript ?? '');
      const normOriginal = normalize(originalText ?? '');

      // Evaluate condition
      const passed = normTranscript === normOriginal && normTranscript.length > 0;
      const score = passed ? 100 : 0;
      const accuracy = passed ? 1.0 : 0.0;
      
      // Save result to database
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

      // Update user progress and XP if passed
      if (passed) {
        await this.updateUserProgress(userId, exerciseId, score);
      }

      return speechResult;
    } catch (error) {
      throw new Error(`Speech evaluation failed: ${error.message}`);
    }
  }

  // Save audio file (placeholder for S3 or local storage)
  private async saveAudioFile(audioBuffer: Buffer): Promise<string> {
    // In production, save to S3 or cloud storage
    // For now, return a mock URL
    const filename = `audio_${Date.now()}.wav`;
    return `/uploads/audio/${filename}`;
  }

  // Update user progress and XP
  private async updateUserProgress(userId: number, exerciseId: number, score: number) {
    // Get exercise details
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
      select: { lessonId: true }
    });

    if (!exercise) {
      throw new Error('Exercise not found');
    }

    // Calculate XP earned (base XP + bonus for high scores)
    const baseXP = 10;
    const bonusXP = score > 90 ? 5 : score > 80 ? 3 : 0;
    const totalXP = baseXP + bonusXP;

    // Update or create progress record
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

    // Update user's total XP
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: {
          increment: totalXP
        }
      }
    });

    // Check if lesson is completed (all exercises done)
    const totalExercises = await this.prisma.exercise.count({
      where: { lessonId: exercise.lessonId }
    });

    // For now, let's just mark it completed if we have some progress
    // In a real scenario, we'd count distinct completed exercises
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

  // Get speech results for user
  async getUserSpeechResults(userId: number, limit = 10) {
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

  // Get speech results for exercise
  async getExerciseSpeechResults(exerciseId: number) {
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

  // Get user's speech statistics
  async getUserSpeechStats(userId: number) {
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
}
