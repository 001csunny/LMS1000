import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SpeechService } from './speech.service';
import { SpeechEvaluationService } from './speech-evaluation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('speech')
@UseGuards(JwtAuthGuard)
export class SpeechController {
  constructor(
    private readonly speechService: SpeechService,
    private readonly speechEvaluationService: SpeechEvaluationService
  ) {}

  /**
   * POST /speech/transcribe
   * Body: { audioBase64: string, sampleRateHertz?: number }
   *
   * The frontend records audio, converts to base64, and sends here.
   * This controller proxies to GCP Speech-to-Text server-side,
   * so GCP credentials never touch the browser.
   */
  @Post('transcribe')
  @HttpCode(HttpStatus.OK)
  async transcribe(
    @Body() body: { audioBase64: string; sampleRateHertz?: number },
  ) {
    const transcript = await this.speechService.transcribe(
      body.audioBase64,
      body.sampleRateHertz ?? 48000,
    );

    if (transcript === null) {
      return {
        transcript: null,
        message: 'GCP Speech-to-Text not configured on this server',
      };
    }

    return { transcript };
  }

  /**
   * POST /speech/evaluate
   * Body: { userId: number, exerciseId: number, audioBuffer: string, originalText: string }
   * 
   * Receives base64 audio and validates it using GCP SpeechService.
   */
  @Post('evaluate')
  @HttpCode(HttpStatus.OK)
  async evaluate(
    @Body() body: { userId: number; exerciseId: number; audioBuffer: string; originalText: string },
  ) {
    const buffer = Buffer.from(body.audioBuffer, 'base64');
    return this.speechEvaluationService.evaluateSpeech(
      body.userId,
      body.exerciseId,
      buffer,
      body.originalText,
    );
  }
}
