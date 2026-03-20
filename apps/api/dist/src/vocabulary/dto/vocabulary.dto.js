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
exports.UpdateVocabularyDto = exports.CreateVocabularyDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateVocabularyDto {
}
exports.CreateVocabularyDto = CreateVocabularyDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'ไม่ได้ระบุรหัสบทเรียน' }),
    __metadata("design:type", Number)
], CreateVocabularyDto.prototype, "lessonId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'คำอ่านภาษาไทยต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MaxLength)(100, { message: 'คำอ่านภาษาไทยต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "thaiWord", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'คำแปลภาษาอังกฤษต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MaxLength)(100, { message: 'คำแปลภาษาอังกฤษต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "englishWord", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Audio URL must be a string' }),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "audioUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Image URL must be a string' }),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' }),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "difficulty", void 0);
class UpdateVocabularyDto {
}
exports.UpdateVocabularyDto = UpdateVocabularyDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'คำอ่านภาษาไทยต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MaxLength)(100, { message: 'คำอ่านภาษาไทยต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
    __metadata("design:type", String)
], UpdateVocabularyDto.prototype, "thaiWord", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'คำแปลภาษาอังกฤษต้องเป็นตัวอักษร' }),
    (0, class_validator_1.MaxLength)(100, { message: 'คำแปลภาษาอังกฤษต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
    __metadata("design:type", String)
], UpdateVocabularyDto.prototype, "englishWord", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Audio URL must be a string' }),
    __metadata("design:type", String)
], UpdateVocabularyDto.prototype, "audioUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Image URL must be a string' }),
    __metadata("design:type", String)
], UpdateVocabularyDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Difficulty, { message: 'กรุณาเลือกระดับความยากที่ถูกต้อง' }),
    __metadata("design:type", String)
], UpdateVocabularyDto.prototype, "difficulty", void 0);
//# sourceMappingURL=vocabulary.dto.js.map