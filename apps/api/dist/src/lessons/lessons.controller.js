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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const lessons_service_1 = require("./lessons.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let LessonsController = class LessonsController {
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    findOne(id) {
        return this.lessonsService.findOne(id);
    }
    create(body) {
        return this.lessonsService.create(body);
    }
    update(id, body) {
        return this.lessonsService.update(id, body);
    }
    remove(id) {
        return this.lessonsService.remove(id);
    }
    createChallenge(body) {
        return this.lessonsService.createChallenge(body);
    }
    findOneChallenge(id) {
        return this.lessonsService.findOneChallenge(id);
    }
    deleteChallenge(id) {
        return this.lessonsService.deleteChallenge(id);
    }
    createTest(body) {
        return this.lessonsService.createTest(body);
    }
    findOneTest(id) {
        return this.lessonsService.findOneTest(id);
    }
    deleteTest(id) {
        return this.lessonsService.deleteTest(id);
    }
    createExam(body) {
        return this.lessonsService.createExam(body);
    }
    findOneExam(id) {
        return this.lessonsService.findOneExam(id);
    }
    deleteExam(id) {
        return this.lessonsService.deleteExam(id);
    }
    saveProgress(lessonId, user, xpEarned) {
        return this.lessonsService.saveProgress(user.id, lessonId, xpEarned ?? 0);
    }
    finishLesson(lessonId, user, body) {
        if (typeof body.totalScore !== 'number' || typeof body.completedCount !== 'number' || typeof body.totalExercises !== 'number') {
            return { success: false, message: 'Invalid payload types' };
        }
        return this.lessonsService.finishLesson(user.id, lessonId, body);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('challenges'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "createChallenge", null);
__decorate([
    (0, common_1.Get)('challenges/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findOneChallenge", null);
__decorate([
    (0, common_1.Delete)('challenges/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "deleteChallenge", null);
__decorate([
    (0, common_1.Post)('tests'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "createTest", null);
__decorate([
    (0, common_1.Get)('tests/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findOneTest", null);
__decorate([
    (0, common_1.Delete)('tests/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "deleteTest", null);
__decorate([
    (0, common_1.Post)('exams'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "createExam", null);
__decorate([
    (0, common_1.Get)('exams/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findOneExam", null);
__decorate([
    (0, common_1.Delete)('exams/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "deleteExam", null);
__decorate([
    (0, common_1.Post)(':id/progress'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)('xpEarned')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "saveProgress", null);
__decorate([
    (0, common_1.Post)(':id/finish'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "finishLesson", null);
exports.LessonsController = LessonsController = __decorate([
    (0, common_1.Controller)('lessons'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsController);
//# sourceMappingURL=lessons.controller.js.map