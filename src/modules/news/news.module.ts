import { Module } from "@nestjs/common";
import { NewsController } from "./controllers/news.controller";
import { UploadModule } from "@utils/upload/upload.module";
import NewsService from "./service/news.service";

@Module({
    controllers: [NewsController],
    imports: [UploadModule],
    providers: [NewsService],
})

export class NewsModule { }