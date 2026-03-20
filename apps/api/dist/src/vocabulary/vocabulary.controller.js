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
exports.VocabularyController = void 0;
const common_1 = require("@nestjs/common");
const vocabulary_service_1 = require("./vocabulary.service");
const vocabulary_dto_1 = require("./dto/vocabulary.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const common_2 = require("@nestjs/common");
let VocabularyController = class VocabularyController {
    constructor(vocabularyService) {
        this.vocabularyService = vocabularyService;
    }
    create(createVocabularyDto) {
        return this.vocabularyService.create(createVocabularyDto);
    }
    findAll() {
        return this.vocabularyService.findAll();
    }
    findByLesson(lessonId) {
        return this.vocabularyService.findByLesson(lessonId);
    }
    search(query, lessonId) {
        return this.vocabularyService.search(query, lessonId);
    }
    findOne(id) {
        return this.vocabularyService.findOne(id);
    }
    update(id, updateVocabularyDto) {
        return this.vocabularyService.update(id, updateVocabularyDto);
    }
    remove(id) {
        return this.vocabularyService.remove(id);
    }
};
exports.VocabularyController = VocabularyController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vocabulary_dto_1.CreateVocabularyDto]),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('lesson/:lessonId'),
    __param(0, (0, common_1.Param)('lessonId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "findByLesson", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, vocabulary_dto_1.UpdateVocabularyDto]),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "remove", null);
exports.VocabularyController = VocabularyController = __decorate([
    (0, common_1.Controller)('vocabulary'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [vocabulary_service_1.VocabularyService])
], VocabularyController);
//# sourceMappingURL=vocabulary.controller.js.map