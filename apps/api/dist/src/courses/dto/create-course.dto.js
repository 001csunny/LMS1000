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
exports.CreateCourseDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateCourseDto {
    constructor() {
        this.difficulty = client_1.Difficulty.BEGINNER;
        this.isPublic = false;
    }
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Course title must be a string' }),
    (0, class_validator_1.MinLength)(5, { message: 'ชื่อคอร์สต้องมีความยาวอย่างน้อย 5 ตัวอักษร' }),
    (0, class_validator_1.MaxLength)(100, { message: 'ชื่อคอร์สต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000, { message: 'คำอธิบายต้องมีความยาวไม่เกิน 1000 ตัวอักษร' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isPublic", void 0);
//# sourceMappingURL=create-course.dto.js.map