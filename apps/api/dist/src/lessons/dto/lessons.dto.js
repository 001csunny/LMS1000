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
exports.UpdateLessonDto = exports.CreateLessonDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateLessonDto {
    constructor() {
        this.isPublic = false;
        this.difficulty = client_1.Difficulty.BEGINNER;
        this.orderIndex = 0;
    }
}
exports.CreateLessonDto = CreateLessonDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'ชื่อบทเรียนต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MinLength)(5, { message: 'ชื่อบทเรียนต้องมีความยาวอย่างน้อย 5 ตัวอักษร' }),
    (0, class_validator_1.MaxLength)(100, { message: 'ชื่อบทเรียนต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'คำอธิบายต้องเป็นตัวอักษร' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000, { message: 'คำอธิบายต้องมีความยาวไม่เกิน 1000 ตัวอักษร' }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'ไม่ได้ระบุรหัสคอร์สเรียน' }),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLessonDto.prototype, "isPublic", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "orderIndex", void 0);
class UpdateLessonDto {
}
exports.UpdateLessonDto = UpdateLessonDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'ชื่อบทเรียนต้องเป็นตัวอักษร' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(5, { message: 'ชื่อบทเรียนต้องมีความยาวอย่างน้อย 5 ตัวอักษร' }),
    (0, class_validator_1.MaxLength)(100, { message: 'ชื่อบทเรียนต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'คำอธิบายต้องเป็นตัวอักษร' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000, { message: 'คำอธิบายต้องมีความยาวไม่เกิน 1000 ตัวอักษร' }),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateLessonDto.prototype, "isPublic", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLessonDto.prototype, "orderIndex", void 0);
//# sourceMappingURL=lessons.dto.js.map