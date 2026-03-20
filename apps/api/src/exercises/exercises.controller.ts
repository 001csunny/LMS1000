import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto, UpdateExerciseDto, ExerciseType } from './dto/exercises.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ParseIntPipe } from '@nestjs/common';

@Controller('exercises')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get('lesson/:lessonId')
  findByLesson(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.exercisesService.findByLesson(lessonId);
  }

  @Get('type')
  findByType(@Query('type') type: ExerciseType, @Query('lessonId') lessonId?: string) {
    return this.exercisesService.findByType(type, lessonId ? parseInt(lessonId) : undefined);
  }

  @Get('next/:currentExerciseId')
  getNextExercise(@Param('currentExerciseId', ParseIntPipe) currentExerciseId: number) {
    return this.exercisesService.getNextExercise(currentExerciseId);
  }

  @Get('count/:lessonId')
  getExerciseCount(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.exercisesService.getExerciseCount(lessonId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.remove(id);
  }
}
