import { Controller, Get, Query, Param, Post, Inject, UseInterceptors, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Body } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

import { CreateNewsDto } from "../dto/createNews.dto";
import { IMAGE_LIMIT, IMAGE_TYPES } from "@constant/news.constant"
import { CreateNewsImages } from "@interface/news.interface";
import NewsService from "../service/news.service";

@Controller('/news')
export class NewsController {

    @Inject() private readonly newsService: NewsService;

    @Get()
    AllNews(@Query('size') size: number, @Query('page') page?: number) {
        return "All News";
    }

    @Get('/latest')
    LatestNews(@Query('size') size?: number) {
        return "Latest News";
    }

    @Get('/:id')
    SpecificNews(@Param('id') id: number) {

    }


    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'preview', maxCount: 1 }, { name: 'image', maxCount: 1 }]))
    async CreateNews(
        @UploadedFiles(new ParseFilePipe({
            validators: [
                //  new FileTypeValidator({ fileType: '.(' + IMAGE_TYPES.join('|') + ')' }),
                // new MaxFileSizeValidator({ maxSize: IMAGE_LIMIT , message: "File is too large" }),
            ],
            fileIsRequired: true,
        })) files: CreateNewsImages,
        @Body() body: CreateNewsDto
    ) {
        return this.newsService.createNews(files, body);
    }




}
