"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SpeechService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechService = void 0;
const common_1 = require("@nestjs/common");
let SpeechService = SpeechService_1 = class SpeechService {
    constructor() {
        this.logger = new common_1.Logger(SpeechService_1.name);
        this.gcpCredentials = null;
        const credentialsJson = process.env.GCP_CREDENTIALS_JSON;
        if (credentialsJson) {
            try {
                this.gcpCredentials = JSON.parse(credentialsJson);
                this.isConfigured = true;
                this.logger.log('GCP Speech-to-Text service initialized.');
            }
            catch {
                this.isConfigured = false;
                this.logger.warn('GCP_CREDENTIALS_JSON is set but could not be parsed — speech features disabled.');
            }
        }
        else {
            this.isConfigured = false;
            this.logger.warn('GCP_CREDENTIALS_JSON not set — speech-to-text features are disabled.');
        }
    }
    async transcribe(audioBase64, sampleRateHertz = 48000) {
        if (!this.isConfigured || !this.gcpCredentials) {
            this.logger.warn('transcribe() called but GCP is not configured.');
            return null;
        }
        const fetch = (await Promise.resolve().then(() => require('node-fetch'))).default;
        const credentials = this.gcpCredentials;
        const { GoogleAuth } = await Promise.resolve().then(() => require('google-auth-library')).catch(() => {
            throw new Error('google-auth-library not installed. Run: pnpm add google-auth-library');
        });
        const auth = new GoogleAuth({
            credentials,
            scopes: 'https://www.googleapis.com/auth/cloud-platform',
        });
        const accessToken = await auth.getAccessToken();
        const body = {
            config: {
                encoding: 'LINEAR16',
                sampleRateHertz,
                languageCode: 'th-TH',
                enableAutomaticPunctuation: true,
            },
            audio: { content: audioBase64 },
        };
        const response = await fetch('https://speech.googleapis.com/v1/speech:recognize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const errorText = await response.text();
            this.logger.error(`GCP STT error: ${errorText}`);
            return null;
        }
        const data = (await response.json());
        const transcript = data?.results
            ?.map((r) => r.alternatives[0]?.transcript)
            .filter(Boolean)
            .join(' ');
        return transcript ?? null;
    }
};
exports.SpeechService = SpeechService;
exports.SpeechService = SpeechService = SpeechService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SpeechService);
//# sourceMappingURL=speech.service.js.map