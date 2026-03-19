import {
  Controller,
  Get,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('audio')
@UseGuards(JwtAuthGuard)
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  /**
   * GET /audio/upload-url?key=words/hello.webm
   * Returns a presigned S3 PUT URL, or 204 No Content when S3 is not configured.
   */
  @Get('upload-url')
  async getUploadUrl(@Query('key') key: string) {
    const result = await this.s3Service.getPresignedUploadUrl(key);
    return result ?? { message: 'S3 not configured — audio upload disabled' };
  }

  /**
   * GET /audio/read-url?key=words/hello.webm
   */
  @Get('read-url')
  async getReadUrl(@Query('key') key: string) {
    const url = await this.s3Service.getPresignedReadUrl(key);
    return url
      ? { url }
      : { message: 'S3 not configured — audio playback disabled' };
  }
}
