import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('public/lessons')
export class PublicLessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  findPublicLessons() {
    return this.lessonsService.findPublicLessons();
  }

  @Get(':id')
  findPublicLesson(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }
}
