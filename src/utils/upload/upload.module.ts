import { Module } from "@nestjs/common";
import { UploadService } from "./service/upload.service";
import { ConfigService } from "@nestjs/config";


@Module({
    providers: [UploadService ],
    exports: [UploadService]
})

export class UploadModule { }