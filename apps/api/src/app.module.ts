import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { WordsModule } from './words/words.module';
import { S3Module } from './s3/s3.module';
import { SpeechModule } from './speech/speech.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    LessonsModule,
    WordsModule,
    S3Module,
    SpeechModule,
    LeaderboardModule,
    VocabularyModule,
    ExercisesModule,
  ],
})
export class AppModule {}
