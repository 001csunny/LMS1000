import { SpeechService } from './speech.service';
export declare class SpeechController {
    private readonly speechService;
    constructor(speechService: SpeechService);
    transcribe(body: {
        audioBase64: string;
        sampleRateHertz?: number;
    }): Promise<{
        transcript: any;
        message: string;
    } | {
        transcript: string;
        message?: undefined;
    }>;
}
