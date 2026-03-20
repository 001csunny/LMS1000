import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto/vocabulary.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ParseIntPipe } from '@nestjs/common';

@Controller('vocabulary')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createVocabularyDto: CreateVocabularyDto) {
    return this.vocabularyService.create(createVocabularyDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.vocabularyService.findAll();
  }

  @Get('lesson/:lessonId')
  findByLesson(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.vocabularyService.findByLesson(lessonId);
  }

  @Get('search')
  search(@Query('q') query: string, @Query('lessonId') lessonId?: number) {
    return this.vocabularyService.search(query, lessonId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vocabularyService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ) {
    return this.vocabularyService.update(id, updateVocabularyDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vocabularyService.remove(id);
  }
}
