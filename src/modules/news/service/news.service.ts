import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { UploadService } from "@utils/upload/service/upload.service";
import { CreateNewsDto } from "../dto/createNews.dto";
import { NEWS_MODEL, News } from "@schemas/news/news.schema";
import { DATABASE_CONNECTION } from "@database/database.constant";
import { CreateNewsImages } from "@/src/interface/news.interface";


@Injectable()
export default class NewsService {

    @Inject() uploadService: UploadService
    @InjectModel(NEWS_MODEL, DATABASE_CONNECTION.OLYMPICS) private readonly newsModel: Model<News>
    async createNews(file: CreateNewsImages, createNewsDto: CreateNewsDto) {

        const isUploaded = await this.uploadService.uploadFile([file.image, file.preview]);

        if (!isUploaded) throw new InternalServerErrorException({
            message: isUploaded.toString(),
            error: "Failed to upload files"
        })

        const news = this.newsModel.create({
            title: createNewsDto.title,
            description: createNewsDto.description,
            preview_image: isUploaded[0],
            image: isUploaded[1],
        })

        if (!news) throw new InternalServerErrorException()
    }
}