import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('public/courses')
export class PublicCoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findPublicCourses() {
    return this.coursesService.findPublicCourses();
  }

  @Get(':id')
  findPublicCourse(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }
}
