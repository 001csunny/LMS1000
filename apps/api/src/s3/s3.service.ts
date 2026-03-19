import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3: AWS.S3 | null;
  private readonly bucket: string;
  private readonly isConfigured: boolean;

  constructor() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;
    const bucket = process.env.AWS_S3_BUCKET_NAME;

    this.isConfigured = !!(
      accessKeyId &&
      secretAccessKey &&
      region &&
      bucket
    );

    if (this.isConfigured) {
      this.s3 = new AWS.S3({ accessKeyId, secretAccessKey, region });
      this.bucket = bucket;
      this.logger.log('AWS S3 service initialized.');
    } else {
      this.s3 = null;
      this.bucket = '';
      this.logger.warn(
        'AWS S3 credentials not configured — audio upload features are disabled.',
      );
    }
  }

  /**
   * Generate a presigned PUT URL so the frontend can upload audio directly to S3.
   * Returns null if S3 is not configured (graceful no-op).
   */
  async getPresignedUploadUrl(
    key: string,
    contentType = 'audio/webm',
  ): Promise<{ uploadUrl: string; publicUrl: string } | null> {
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

  /**
   * Generate a presigned GET URL for reading a private audio file.
   * Returns null if S3 is not configured.
   */
  async getPresignedReadUrl(key: string): Promise<string | null> {
    if (!this.isConfigured || !this.s3) {
      return null;
    }

    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: 3600,
    });
  }
}
