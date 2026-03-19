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
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Any authenticated user can list courses
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('mine')
  findMyCourses(
    @CurrentUser() user: { id: number; role: string },
    @Query('role') queryRole?: string,
  ) {
    return this.coursesService.findMyCourses(queryRole ?? user.role, user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  // Only admins can create/update/delete courses
  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  create(@Body() body: { name: string; description?: string; isPublic?: boolean }) {
    return this.coursesService.create(body);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; description?: string; isPublic?: boolean },
  ) {
    return this.coursesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }

  @Post(':id/enroll/:studentId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  enroll(
    @Param('id', ParseIntPipe) courseId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.coursesService.enrollStudent(courseId, studentId);
  }

  @Delete(':id/enroll/:studentId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  unenroll(
    @Param('id', ParseIntPipe) courseId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.coursesService.removeStudent(courseId, studentId);
  }
}
