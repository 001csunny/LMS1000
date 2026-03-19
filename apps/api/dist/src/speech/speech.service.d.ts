export declare class SpeechService {
    private readonly logger;
    private readonly isConfigured;
    private gcpCredentials;
    constructor();
    transcribe(audioBase64: string, sampleRateHertz?: number): Promise<string | null>;
}
