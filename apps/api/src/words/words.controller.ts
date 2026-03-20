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
import { WordsService } from './words.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('words')
@UseGuards(JwtAuthGuard)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  findAll() {
    return this.wordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  create(@Body() body: { thaiWord: string; englishWord: string; lessonId?: number }) {
    return this.wordsService.create(body);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { thaiWord?: string; englishWord?: string; lessonId?: number },
  ) {
    return this.wordsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.remove(id);
  }
}
