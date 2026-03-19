import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PublicLessonsController } from './public-lessons.controller';

@Module({
  providers: [LessonsService],
  controllers: [LessonsController, PublicLessonsController],
})
export class LessonsModule {}
