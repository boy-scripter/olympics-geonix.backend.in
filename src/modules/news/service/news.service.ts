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


        const news = await new this.newsModel({
            title: createNewsDto.title,
            description: createNewsDto.description,
            sub_heading: createNewsDto.sub_heading,
        }).save()


        const isUploaded = await this.uploadService.uploadFile([file.image, file.preview_image], 'news/' + news._id);

        if (!isUploaded) throw new InternalServerErrorException({
            message: 'Failed to upload files',
            error: "File upload returned false or null"
        })

        news.preview_image = isUploaded[0]
        news.image = isUploaded[1]
        const isSaved = await news.save()
        
        if (!isSaved) {
            await this.newsModel.deleteOne(news._id)
            throw new InternalServerErrorException()
        }

        return {
            message: 'News created successfully',
            statusCode: 200
        }

    }

    async specificNews(id: string) {
        return await this.newsModel.findById(id)
    }

    async latestNews(size: number = 5) {
        return await this.newsModel.find().sort({ createdAt: -1 }).limit(size).exec();
    }

    async allNews(size: number = 5, page: number = 1,) {
        const skip = (page - 1) * size;

        return await this.newsModel.find().sort({ createdAt: -1 }).limit(size).skip(skip).exec();
    }


}