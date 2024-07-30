import { Controller, Get, Query, Param, Post, Inject, UseInterceptors, UploadedFiles, ParseFilePipe, ParseIntPipe, FileTypeValidator, MaxFileSizeValidator, Body, UsePipes } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

import { CreateNewsDto } from "../dto/createNews.dto";
import { IMAGE_LIMIT, IMAGE_TYPES } from "@constant/news.constant"
import { CreateNewsImages } from "@interface/news.interface";
import NewsService from "../service/news.service";

@Controller('/news')
export class NewsController {

    @Inject() private readonly newsService: NewsService;

    @Get('specific')
    SpecificNews(@Query('id') id :string) {
       
        return this.newsService.specificNews(id)
    }

    @Get()
  
    AllNews(@Query('size') size: number, @Query('page') page: number) {
        return this.newsService.allNews(size, page)
    }

    @Get('/latest')
    LatestNews(@Query('size', ParseIntPipe) size: number = 9) {
        return this.newsService.latestNews(size)
    }


    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'preview_image', maxCount: 1 }, { name: 'image', maxCount: 1 }]))
    async CreateNews(
        @UploadedFiles(new ParseFilePipe({
            validators: [
                // new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
                // new MaxFileSizeValidator({ maxSize: IMAGE_LIMIT, message: "File is too large" }),
            ],
            fileIsRequired: true,
        })) files: CreateNewsImages,
        @Body() body: CreateNewsDto
    ) {
        return this.newsService.createNews(files, body);
    }




}
