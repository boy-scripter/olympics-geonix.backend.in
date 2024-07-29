import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class UploadService {

    private readonly s3Client: S3Client
    private AWS_BUCKET_NAME: string;


    constructor(configService: ConfigService) {
        this.AWS_BUCKET_NAME = configService.getOrThrow('AWS_S3_BUCKET_NAME');
        this.s3Client = new S3Client({
            region: this.AWS_BUCKET_NAME,
            credentials: {
                accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }


    async createFolder(Key: string) {
        const command = new PutObjectCommand({ Bucket: this.AWS_BUCKET_NAME, Key });
        return this.s3Client.send(command);
    }


    async uploadFile(files: Express.Multer.File[] | Express.Multer.File , folder : string) {

        if (!Array.isArray(files)) files = [files];
        const uploadPromises = files.map(file => {
            const command = new PutObjectCommand({
                Bucket: this.AWS_BUCKET_NAME,
                Key: `${Date.now()}-${file.originalname}`, 
                Body: file.buffer, 
                ContentType: file.mimetype,
            });

            return this.s3Client.send(command);
        });

        return Promise.all(uploadPromises);

    }

}