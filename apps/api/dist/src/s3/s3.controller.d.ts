import { S3Service } from './s3.service';
export declare class S3Controller {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    getUploadUrl(key: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
    } | {
        message: string;
    }>;
    getReadUrl(key: string): Promise<{
        url: string;
        message?: undefined;
    } | {
        message: string;
        url?: undefined;
    }>;
}
