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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechController = void 0;
const common_1 = require("@nestjs/common");
const speech_service_1 = require("./speech.service");
const speech_evaluation_service_1 = require("./speech-evaluation.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SpeechController = class SpeechController {
    constructor(speechService, speechEvaluationService) {
        this.speechService = speechService;
        this.speechEvaluationService = speechEvaluationService;
    }
    async transcribe(body) {
        const transcript = await this.speechService.transcribe(body.audioBase64, body.sampleRateHertz ?? 48000);
        if (transcript === null) {
            return {
                transcript: null,
                message: 'GCP Speech-to-Text not configured on this server',
            };
        }
        return { transcript };
    }
    async evaluate(body) {
        const buffer = Buffer.from(body.audioBuffer, 'base64');
        return this.speechEvaluationService.evaluateSpeech(body.userId, body.exerciseId, buffer, body.originalText);
    }
};
exports.SpeechController = SpeechController;
__decorate([
    (0, common_1.Post)('transcribe'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SpeechController.prototype, "transcribe", null);
__decorate([
    (0, common_1.Post)('evaluate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SpeechController.prototype, "evaluate", null);
exports.SpeechController = SpeechController = __decorate([
    (0, common_1.Controller)('speech'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [speech_service_1.SpeechService,
        speech_evaluation_service_1.SpeechEvaluationService])
], SpeechController);
//# sourceMappingURL=speech.controller.js.map