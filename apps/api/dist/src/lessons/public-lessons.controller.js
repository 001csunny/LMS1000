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
exports.PublicLessonsController = void 0;
const common_1 = require("@nestjs/common");
const lessons_service_1 = require("./lessons.service");
let PublicLessonsController = class PublicLessonsController {
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    findPublicLessons() {
        return this.lessonsService.findPublicLessons();
    }
    findPublicLesson(id) {
        return this.lessonsService.findOne(id);
    }
};
exports.PublicLessonsController = PublicLessonsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicLessonsController.prototype, "findPublicLessons", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PublicLessonsController.prototype, "findPublicLesson", null);
exports.PublicLessonsController = PublicLessonsController = __decorate([
    (0, common_1.Controller)('public/lessons'),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], PublicLessonsController);
//# sourceMappingURL=public-lessons.controller.js.map