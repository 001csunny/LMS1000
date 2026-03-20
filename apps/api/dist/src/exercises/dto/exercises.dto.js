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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExerciseDto = exports.CreateExerciseDto = exports.ExerciseType = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "ExerciseType", { enumerable: true, get: function () { return client_1.ExerciseType; } });
class CreateExerciseDto {
}
exports.CreateExerciseDto = CreateExerciseDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'ไม่ได้ระบุรหัสบทเรียน' }),
    __metadata("design:type", Number)
], CreateExerciseDto.prototype, "lessonId", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'ไม่ได้ระบุรหัสคำศัพท์' }),
    __metadata("design:type", Number)
], CreateExerciseDto.prototype, "vocabularyId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ExerciseType, { message: 'กรุณาเลือกประเภทแบบฝึกหัดที่ถูกต้อง' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'คำถามต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MaxLength)(500, { message: 'คำถามต้องมีความยาวไม่เกิน 500 ตัวอักษร' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'คำตอบต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MaxLength)(500, { message: 'คำตอบต้องมีความยาวไม่เกิน 500 ตัวอักษร' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Audio URL must be a string' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "audioUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Image URL must be a string' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Hints must be an array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'แต่ละคำใบ้ต้องเป็นตัวอักษร' }),
    __metadata("design:type", Array)
], CreateExerciseDto.prototype, "hints", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Choices must be an array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'แต่ละตัวเลือกต้องเป็นตัวอักษร' }),
    __metadata("design:type", Array)
], CreateExerciseDto.prototype, "choices", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ลำดับต้องเป็นตัวเลข' }),
    __metadata("design:type", Number)
], CreateExerciseDto.prototype, "orderIndex", void 0);
class UpdateExerciseDto {
}
exports.UpdateExerciseDto = UpdateExerciseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ExerciseType, { message: 'กรุณาเลือกประเภทแบบฝึกหัดที่ถูกต้อง' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'คำถามต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MaxLength)(500, { message: 'คำถามต้องมีความยาวไม่เกิน 500 ตัวอักษร' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'คำตอบต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MaxLength)(500, { message: 'คำตอบต้องมีความยาวไม่เกิน 500 ตัวอักษร' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Audio URL must be a string' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "audioUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Image URL must be a string' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Hints must be an array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'แต่ละคำใบ้ต้องเป็นตัวอักษร' }),
    __metadata("design:type", Array)
], UpdateExerciseDto.prototype, "hints", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Choices must be an array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'แต่ละตัวเลือกต้องเป็นตัวอักษร' }),
    __metadata("design:type", Array)
], UpdateExerciseDto.prototype, "choices", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'ลำดับต้องเป็นตัวเลข' }),
    __metadata("design:type", Number)
], UpdateExerciseDto.prototype, "orderIndex", void 0);
//# sourceMappingURL=exercises.dto.js.map