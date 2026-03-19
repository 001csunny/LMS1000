export declare class S3Service {
    private readonly logger;
    private readonly s3;
    private readonly bucket;
    private readonly isConfigured;
    constructor();
    getPresignedUploadUrl(key: string, contentType?: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
    } | null>;
    getPresignedReadUrl(key: string): Promise<string | null>;
}
