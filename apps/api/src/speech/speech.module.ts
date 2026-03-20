import { Module } from '@nestjs/common';
import { SpeechService } from './speech.service';
import { SpeechController } from './speech.controller';
import { SpeechEvaluationService } from './speech-evaluation.service';

@Module({
  providers: [SpeechService, SpeechEvaluationService],
  controllers: [SpeechController],
})
export class SpeechModule {}
