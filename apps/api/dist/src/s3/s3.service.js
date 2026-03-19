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
var S3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let S3Service = S3Service_1 = class S3Service {
    constructor() {
        this.logger = new common_1.Logger(S3Service_1.name);
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const region = process.env.AWS_REGION;
        const bucket = process.env.AWS_S3_BUCKET_NAME;
        this.isConfigured = !!(accessKeyId &&
            secretAccessKey &&
            region &&
            bucket);
        if (this.isConfigured) {
            this.s3 = new AWS.S3({ accessKeyId, secretAccessKey, region });
            this.bucket = bucket;
            this.logger.log('AWS S3 service initialized.');
        }
        else {
            this.s3 = null;
            this.bucket = '';
            this.logger.warn('AWS S3 credentials not configured — audio upload features are disabled.');
        }
    }
    async getPresignedUploadUrl(key, contentType = 'audio/webm') {
        if (!this.isConfigured || !this.s3) {
            return null;
        }
        const uploadUrl = await this.s3.getSignedUrlPromise('putObject', {
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
            Expires: 300,
        });
        const publicUrl = `https://${this.bucket}.s3.amazonaws.com/${key}`;
        return { uploadUrl, publicUrl };
    }
    async getPresignedReadUrl(key) {
        if (!this.isConfigured || !this.s3) {
            return null;
        }
        return this.s3.getSignedUrlPromise('getObject', {
            Bucket: this.bucket,
            Key: key,
            Expires: 3600,
        });
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = S3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
//# sourceMappingURL=s3.service.js.map