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
exports.ExercisesController = void 0;
const common_1 = require("@nestjs/common");
const exercises_service_1 = require("./exercises.service");
const exercises_dto_1 = require("./dto/exercises.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const common_2 = require("@nestjs/common");
let ExercisesController = class ExercisesController {
    constructor(exercisesService) {
        this.exercisesService = exercisesService;
    }
    create(createExerciseDto) {
        return this.exercisesService.create(createExerciseDto);
    }
    findAll() {
        return this.exercisesService.findAll();
    }
    findByLesson(lessonId) {
        return this.exercisesService.findByLesson(lessonId);
    }
    findByType(type, lessonId) {
        return this.exercisesService.findByType(type, lessonId ? parseInt(lessonId) : undefined);
    }
    getNextExercise(currentExerciseId) {
        return this.exercisesService.getNextExercise(currentExerciseId);
    }
    getExerciseCount(lessonId) {
        return this.exercisesService.getExerciseCount(lessonId);
    }
    findOne(id) {
        return this.exercisesService.findOne(id);
    }
    update(id, updateExerciseDto) {
        return this.exercisesService.update(id, updateExerciseDto);
    }
    remove(id) {
        return this.exercisesService.remove(id);
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exercises_dto_1.CreateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('lesson/:lessonId'),
    __param(0, (0, common_1.Param)('lessonId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findByLesson", null);
__decorate([
    (0, common_1.Get)('type'),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findByType", null);
__decorate([
    (0, common_1.Get)('next/:currentExerciseId'),
    __param(0, (0, common_1.Param)('currentExerciseId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "getNextExercise", null);
__decorate([
    (0, common_1.Get)('count/:lessonId'),
    __param(0, (0, common_1.Param)('lessonId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "getExerciseCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, exercises_dto_1.UpdateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "remove", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, common_1.Controller)('exercises'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService])
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map