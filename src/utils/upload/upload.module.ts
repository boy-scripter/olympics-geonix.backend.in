import { Module } from "@nestjs/common";
import { UploadService } from "./service/upload.service";
import { ConfigService } from "@nestjs/config";


@Module({
    providers: [UploadService , ConfigService],
    exports: [UploadService]
})

export class UploadModule { }