import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateLessonDto, UpdateLessonDto } from './dto/lessons.dto';

@Controller('lessons')
@UseGuards(JwtAuthGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  create(@Body() body: CreateLessonDto) {
    return this.lessonsService.create(body);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }

  // Challenge endpoints
  @Post('challenges')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  createChallenge(
    @Body() body: { name: string; lessonId: number; wordIds?: number[] },
  ) {
    return this.lessonsService.createChallenge(body);
  }

  @Get('challenges/:id')
  findOneChallenge(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOneChallenge(id);
  }

  @Delete('challenges/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  deleteChallenge(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.deleteChallenge(id);
  }

  // Test endpoints
  @Post('tests')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  createTest(
    @Body() body: { name: string; lessonId: number; wordIds?: number[] },
  ) {
    return this.lessonsService.createTest(body);
  }

  @Get('tests/:id')
  findOneTest(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOneTest(id);
  }

  @Delete('tests/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  deleteTest(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.deleteTest(id);
  }

  // Exam endpoints
  @Post('exams')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  createExam(
    @Body() body: { name: string; lessonId: number; wordIds?: number[] },
  ) {
    return this.lessonsService.createExam(body);
  }

  @Get('exams/:id')
  findOneExam(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOneExam(id);
  }

  @Delete('exams/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  deleteExam(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.deleteExam(id);
  }

  // Progress: any authenticated user can save progress
  @Post(':id/progress')
  saveProgress(
    @Param('id', ParseIntPipe) lessonId: number,
    @CurrentUser() user: { id: number },
    @Body('xpEarned') xpEarned: number,
  ) {
    return this.lessonsService.saveProgress(user.id, lessonId, xpEarned ?? 0);
  }

  // Progress: Finalize lesson progress
  @Post(':id/finish')
  finishLesson(
    @Param('id', ParseIntPipe) lessonId: number,
    @CurrentUser() user: { id: number },
    @Body() body: { totalScore: number; completedCount: number; totalExercises: number },
  ) {
    if (typeof body.totalScore !== 'number' || typeof body.completedCount !== 'number' || typeof body.totalExercises !== 'number') {
      return { success: false, message: 'Invalid payload types' };
    }
    return this.lessonsService.finishLesson(user.id, lessonId, body);
  }
}
