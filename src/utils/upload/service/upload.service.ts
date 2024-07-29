import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class UploadService {

    private readonly s3Client: S3Client
    private AWS_BUCKET_NAME: string;
    private AWS_REGION: String

    private createObjectUrl(folder: String, filename: string) {
        return `https://${this.AWS_BUCKET_NAME}.s3.${this.AWS_REGION}.amazonaws.com/${folder}/${filename}`
    }

    constructor(configService: ConfigService) {
        this.AWS_BUCKET_NAME = configService.getOrThrow('AWS_S3_BUCKET_NAME');
        this.AWS_REGION = configService.getOrThrow('AWS_REGION')
        this.s3Client = new S3Client({
            region: configService.get('AWS_REGION'),
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


    async uploadFile(files: Express.Multer.File[] | Express.Multer.File, folder: string) {
        
        if (!Array.isArray(files)) files = [files];
        const uploadPromises = files.map(file => {
            file = file[0];
            const randomeFileName = `${Date.now()}-${file.originalname}`
            const command = new PutObjectCommand({
                Bucket: this.AWS_BUCKET_NAME,
                Key: `${folder}/${randomeFileName}`,
                Body: file.buffer,
                ContentType: file.mimetype,

            });

            return this.s3Client.send(command).then(_ => this.createObjectUrl(folder, randomeFileName));
        });

        return Promise.all(uploadPromises);

    }

}